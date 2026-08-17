import type { SupabaseClient } from "@supabase/supabase-js";

const CLICK_IDS = ["fbclid", "gclid", "gbraid", "wbraid", "ttclid", "msclkid"];

function paramsFrom(url: string | null | undefined): URLSearchParams {
  if (!url) return new URLSearchParams();
  try {
    return new URL(url, "https://shop.envirobiotics.com").searchParams;
  } catch {
    return new URLSearchParams();
  }
}

function inferSource(
  referringSite: string | null,
  clickIdType: string | null,
): string | null {
  if (clickIdType === "fbclid") return "facebook";
  if (clickIdType === "gclid" || clickIdType === "gbraid" || clickIdType === "wbraid")
    return "google";
  if (clickIdType === "ttclid") return "tiktok";
  if (clickIdType === "msclkid") return "bing";
  if (!referringSite) return null;
  try {
    const host = new URL(referringSite).hostname.replace(/^www\./, "");
    if (/facebook|instagram|fb\.me/.test(host)) return "facebook";
    if (/google/.test(host)) return "google";
    if (/bing/.test(host)) return "bing";
    if (/tiktok/.test(host)) return "tiktok";
    return host;
  } catch {
    return null;
  }
}

export function mapOrder(order: Record<string, unknown>) {
  const landingSite = (order["landing_site"] as string) ?? null;
  const referringSite = (order["referring_site"] as string) ?? null;
  const params = paramsFrom(landingSite);

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
        title: String(li["title"] ?? ""),
        quantity: Number(li["quantity"] ?? 0),
        price: String(li["price"] ?? ""),
        sku: String(li["sku"] ?? ""),
      }))
    : [];

  return {
    shopify_order_id: String(order["id"] ?? ""),
    order_number: order["name"] ? String(order["name"]) : null,
    email: (order["email"] as string) ?? null,
    total_price: order["total_price"] ? Number(order["total_price"]) : null,
    currency: (order["currency"] as string) ?? null,
    line_items: lineItems,
    landing_site: landingSite ?? referringSite,
    landing_page: get("lp_page") ?? (landingSite ? landingSite.split("?")[0] : null),
    lp_section: get("lp_section"),
    utm_source: get("utm_source") ?? inferSource(referringSite, clickIdType),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_content: get("utm_content"),
    utm_term: get("utm_term"),
    click_id: clickId,
    click_id_type: clickIdType,
    ordered_at: (order["created_at"] as string) ?? null,
  };
}

/** Pull recent orders straight from the Shopify Admin API and store them. */
export async function syncShopifyOrders(days: number) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ACCESS_TOKEN;
  if (!domain || !token) {
    throw new Error("Shopify store credentials are not configured.");
  }

  const since = new Date(Date.now() - days * 864e5).toISOString();
  const base = `https://${domain.replace(/^https?:\/\//, "")}/admin/api/2025-07/orders.json`;
  let url: string | null =
    `${base}?status=any&limit=250&created_at_min=${encodeURIComponent(since)}`;

  const rows: ReturnType<typeof mapOrder>[] = [];
  let pages = 0;

  while (url && pages < 10) {
    const res: Response = await fetch(url, {
      headers: { "X-Shopify-Access-Token": token, "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error(`Shopify API error ${res.status}`);
    }
    const json = (await res.json()) as { orders?: Record<string, unknown>[] };
    for (const o of json.orders ?? []) rows.push(mapOrder(o));

    const link = res.headers.get("link") ?? "";
    const next = /<([^>]+)>;\s*rel="next"/.exec(link);
    url = next ? next[1] : null;
    pages++;
  }

  if (rows.length) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const client = supabaseAdmin as unknown as SupabaseClient;
    const { error } = await client
      .from("attribution_orders")
      .upsert(rows, { onConflict: "shopify_order_id" });
    if (error) throw new Error(error.message);
  }

  return { synced: rows.length };
}
