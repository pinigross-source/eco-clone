import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// Resend delivery webhook. Configure in Resend with this endpoint URL and a
// signing secret stored as RESEND_WEBHOOK_SECRET. Resend signs with Svix.

const EventSchema = z.object({
  type: z.string().min(1).max(100),
  created_at: z.string().max(64).optional(),
  data: z
    .object({
      email_id: z.string().max(200).optional(),
      to: z.union([z.string(), z.array(z.string())]).optional(),
      subject: z.string().max(500).optional(),
      bounce: z.record(z.unknown()).optional(),
    })
    .passthrough(),
});

// Maps Resend event types to the status recorded in email_send_log.
const STATUS_BY_EVENT: Record<string, string> = {
  "email.delivered": "delivered",
  "email.bounced": "bounced",
  "email.complained": "complained",
  "email.delivery_delayed": "delayed",
};

function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

function base64ToBytes(value: string) {
  const bin = atob(value);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function verifySvixSignature(
  secret: string,
  headers: Headers,
  body: string,
): Promise<boolean> {
  const id = headers.get("svix-id") ?? headers.get("webhook-id");
  const timestamp = headers.get("svix-timestamp") ?? headers.get("webhook-timestamp");
  const signatureHeader = headers.get("svix-signature") ?? headers.get("webhook-signature");
  if (!id || !timestamp || !signatureHeader) return false;

  // Reject replays older than 5 minutes.
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 300) return false;

  const rawSecret = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  let keyBytes: Uint8Array<ArrayBuffer>;
  try {
    keyBytes = base64ToBytes(rawSecret);
  } catch {
    keyBytes = new TextEncoder().encode(rawSecret) as Uint8Array<ArrayBuffer>;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${id}.${timestamp}.${body}`)),
  );

  for (const part of signatureHeader.split(" ")) {
    const [version, value] = part.split(",");
    if (version !== "v1" || !value) continue;
    try {
      if (timingSafeEqual(mac, base64ToBytes(value))) return true;
    } catch {
      /* ignore malformed signature part */
    }
  }
  return false;
}

export const Route = createFileRoute("/api/public/resend-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["RESEND_WEBHOOK_SECRET"];
        if (!secret) {
          console.error("RESEND_WEBHOOK_SECRET is not configured");
          return new Response("Webhook not configured", { status: 503 });
        }

        const body = await request.text();
        if (!(await verifySvixSignature(secret, request.headers, body))) {
          return new Response("Invalid signature", { status: 401 });
        }

        const parsed = EventSchema.safeParse(JSON.parse(body || "null"));
        if (!parsed.success) return new Response("Invalid payload", { status: 400 });

        const event = parsed.data;
        const status = STATUS_BY_EVENT[event.type];
        const emailId = event.data.email_id;
        if (!status || !emailId) return Response.json({ ok: true, ignored: event.type });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const db = supabaseAdmin as any;

        const { data: existing, error: lookupError } = await db
          .from("email_send_log")
          .select("message_id, template_name, recipient_email, metadata")
          .eq("metadata->>provider_message_id", emailId)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (lookupError) {
          console.error("email_send_log lookup failed", lookupError.message);
          return new Response("Lookup failed", { status: 500 });
        }

        const toField = event.data.to;
        const recipient =
          existing?.recipient_email ??
          (Array.isArray(toField) ? toField[0] : toField) ??
          "unknown";

        const { error: insertError } = await db.from("email_send_log").insert({
          message_id: existing?.message_id ?? emailId,
          template_name: existing?.template_name ?? "unknown",
          recipient_email: recipient,
          status,
          error_message:
            status === "bounced" || status === "complained" ? `Resend event: ${event.type}` : null,
          provider_response: event,
          metadata: {
            ...(existing?.metadata ?? {}),
            provider_message_id: emailId,
            webhook_event: event.type,
            webhook_received_at: new Date().toISOString(),
          },
        });

        if (insertError) {
          console.error("email_send_log webhook insert failed", insertError.message);
          return new Response("Insert failed", { status: 500 });
        }

        return Response.json({ ok: true, status });
      },
    },
  },
});
