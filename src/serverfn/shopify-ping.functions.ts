import { createServerFn } from "@tanstack/react-start";

/**
 * Pings the Shopify Storefront API and returns the shop name + currency.
 * Used by /dev-tools to confirm the SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_TOKEN
 * are wired up correctly.
 */
export const pingShopify = createServerFn({ method: "GET" }).handler(async () => {
  const rawDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!rawDomain || !token) {
    return { ok: false as const, error: "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_TOKEN" };
  }
  // Normalize: strip protocol, trailing slash, paths, whitespace
  const domain = rawDomain.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "").replace(/\/$/, "");
  if (!domain.endsWith(".myshopify.com")) {
    return { ok: false as const, error: `Domain "${domain}" must be the *.myshopify.com domain (find it in Shopify Admin → Settings → Domains).` };
  }
  const url = `https://${domain}/api/2024-10/graphql.json`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({
        query: `{ shop { name primaryDomain { url } paymentSettings { currencyCode } } }`,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false as const, error: `HTTP ${res.status}: ${body.slice(0, 200)}` };
    }
    const json = (await res.json()) as {
      data?: { shop: { name: string; primaryDomain: { url: string }; paymentSettings: { currencyCode: string } } };
      errors?: Array<{ message: string }>;
    };
    if (json.errors?.length) {
      return { ok: false as const, error: json.errors.map((e) => e.message).join("; ") };
    }
    if (!json.data?.shop) return { ok: false as const, error: "No shop data returned" };
    return {
      ok: true as const,
      shop: json.data.shop.name,
      url: json.data.shop.primaryDomain.url,
      currency: json.data.shop.paymentSettings.currencyCode,
      domain,
    };
  } catch (err) {
    return { ok: false as const, error: err instanceof Error ? err.message : String(err) };
  }
});
