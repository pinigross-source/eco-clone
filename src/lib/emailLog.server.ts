// Server-only helper: sends an email through the Resend connector gateway and
// records the attempt (plus the provider's raw response) in public.email_send_log.
//
// Every send writes two rows sharing the same message_id:
//   1. status "pending"  — recorded before the provider call
//   2. status "sent" | "failed" — recorded with the provider status + body
// Dashboards must deduplicate by message_id (latest row wins).

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend/emails";

export interface SendEmailInput {
  templateName: string;
  to: string[];
  from: string;
  subject: string;
  html: string;
  replyTo?: string;
  metadata?: Record<string, unknown>;
}

export interface SendEmailResult {
  ok: boolean;
  messageId: string;
  providerStatus?: number;
  providerMessageId?: string;
  error?: string;
}

async function log(row: Record<string, unknown>) {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabaseAdmin as any).from("email_send_log").insert(row);
    if (error) console.error("email_send_log insert failed", error.message);
  } catch (err) {
    console.error("email_send_log insert threw", err);
  }
}

export async function sendLoggedEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const messageId = `${input.templateName}-${crypto.randomUUID()}`;
  const recipient = input.to[0] ?? "";
  const base = {
    message_id: messageId,
    template_name: input.templateName,
    recipient_email: recipient,
    metadata: { ...(input.metadata ?? {}), subject: input.subject, to: input.to },
  };

  const lovableApiKey = process.env.LOVABLE_API_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!lovableApiKey || !resendApiKey) {
    await log({ ...base, status: "failed", error_message: "Email service not configured" });
    return { ok: false, messageId, error: "Email service not configured" };
  }

  await log({ ...base, status: "pending" });

  let res: Response;
  try {
    res = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableApiKey}`,
        "X-Connection-Api-Key": resendApiKey,
      },
      body: JSON.stringify({
        from: input.from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await log({ ...base, status: "failed", error_message: `Network error: ${message}` });
    return { ok: false, messageId, error: message };
  }

  const text = await res.text();
  let parsed: unknown = text;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    /* keep raw text */
  }

  if (!res.ok) {
    console.error(`Resend gateway error [${res.status}] ${text}`);
    await log({
      ...base,
      status: "failed",
      error_message: `Provider ${res.status}: ${text.slice(0, 1000)}`,
      provider_status_code: res.status,
      provider_response: parsed,
    });
    return { ok: false, messageId, providerStatus: res.status, error: text };
  }

  const providerMessageId =
    parsed && typeof parsed === "object" && "id" in parsed
      ? String((parsed as { id: unknown }).id)
      : undefined;

  await log({
    ...base,
    status: "sent",
    provider_status_code: res.status,
    provider_response: parsed,
    metadata: { ...base.metadata, provider_message_id: providerMessageId },
  });

  return { ok: true, messageId, providerStatus: res.status, providerMessageId };
}
