import { createFileRoute } from "@tanstack/react-router";

/**
 * Shopify `orders/create` webhook.
 * Configure in Shopify Admin → Settings → Notifications → Webhooks:
 *   URL: https://envirobiotics.com/api/public/shopify-order
 *   Format: JSON
 * Then store the webhook signing secret as SHOPIFY_WEBHOOK_SECRET.
 */

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hmacBase64(secret: string, body: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(body),
  );
  let binary = "";
  const bytes = new Uint8Array(sig);
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

const CLICK_IDS = ["fbclid", "gclid", "gbraid", "wbraid", "ttclid", "msclkid"];

function paramsFrom(url: string | null | undefined): URLSearchParams {
  if (!url) return new URLSearchParams();
  try {
    return new URL(url, "https://shop.envirobiotics.com").searchParams;
  } catch {
    return new URLSearchParams();
  }
}

export const Route = createFileRoute("/api/public/shopify-order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
        if (!secret) {
          return Response.json({ error: "Not configured" }, { status: 500 });
        }
        const body = await request.text();
        const signature = request.headers.get("x-shopify-hmac-sha256") ?? "";
        const expected = await hmacBase64(secret, body);
        if (!signature || !timingSafeEqual(signature, expected)) {
          return new Response("Invalid signature", { status: 401 });
        }

        let order: Record<string, unknown>;
        try {
          order = JSON.parse(body);
        } catch {
          return new Response("Bad payload", { status: 400 });
        }

        const landingSite = (order["landing_site"] as string) ?? null;
        const referringSite = (order["referring_site"] as string) ?? null;
        const params = paramsFrom(landingSite);

        // note_attributes can also carry attribution if the theme forwards it
        const notes = Array.isArray(order["note_attributes"])
          ? (order["note_attributes"] as Array<{ name: string; value: string }>)
          : [];
        const noteVal = (name: string) =>
          notes.find((n) => n?.name === name)?.value ?? null;

        const get = (k: string) => params.get(k) ?? noteVal(k);

        let clickId: string | null = null;
        let clickIdType: string | null = null;
        for (const k of CLICK_IDS) {
          const v = get(k);
          if (v) {
            clickId = v;
            clickIdType = k;
            break;
          }
        }

        const lineItems = Array.isArray(order["line_items"])
          ? (order["line_items"] as Array<Record<string, unknown>>).map((li) => ({
              title: li["title"],
              quantity: li["quantity"],
              price: li["price"],
              sku: li["sku"],
            }))
          : [];

        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );
        const { error } = await supabaseAdmin.from("attribution_orders").upsert(
          {
            shopify_order_id: String(order["id"] ?? ""),
            order_number: order["name"] ? String(order["name"]) : null,
            email: (order["email"] as string) ?? null,
            total_price: order["total_price"]
              ? Number(order["total_price"])
              : null,
            currency: (order["currency"] as string) ?? null,
            line_items: lineItems,
            landing_site: landingSite ?? referringSite,
            landing_page: get("lp_page"),
            lp_section: get("lp_section"),
            utm_source: get("utm_source") ?? (clickIdType === "fbclid" ? "facebook" : null),
            utm_medium: get("utm_medium"),
            utm_campaign: get("utm_campaign"),
            utm_content: get("utm_content"),
            utm_term: get("utm_term"),
            click_id: clickId,
            click_id_type: clickIdType,
            ordered_at: (order["created_at"] as string) ?? null,
          },
          { onConflict: "shopify_order_id" },
        );

        if (error) {
          console.error("[shopify-order]", error.message);
          return Response.json({ error: "Insert failed" }, { status: 500 });
        }
        return Response.json({ ok: true });
      },
    },
  },
});
