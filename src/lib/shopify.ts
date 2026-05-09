// Central Shopify integration helper.
// All commerce (cart, checkout, accounts, orders) lives on the Shopify store.
// This Lovable site is the marketing/content front-end and links out for any
// purchase action.

export const SHOPIFY_BASE =
  (import.meta.env.VITE_SHOPIFY_URL as string | undefined) ??
  "https://shop.envirobiotics.com";

// Internal product slug → Shopify product handle.
export const PRODUCT_HANDLE_MAP: Record<string, string> = {
  "biologic-mini": "biologic-mini",
  "biotica-800": "biotica-800",
  "ba-2080": "ba-2080",
  "betterair-2080": "ba-2080",
  "ebiotic-pro": "e-biotic-pro",
};

function withUtm(url: string, campaign?: string): string {
  try {
    const u = new URL(url);
    if (!u.searchParams.has("utm_source")) {
      u.searchParams.set("utm_source", "envirobiotics");
      u.searchParams.set("utm_medium", "site");
      if (campaign) u.searchParams.set("utm_campaign", campaign);
    }
    return u.toString();
  } catch {
    return url;
  }
}

/** Build a Shopify URL from a path (e.g. "/products/biotica-800"). */
export function shopifyUrl(path: string = "/", campaign?: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return withUtm(SHOPIFY_BASE + clean, campaign);
}

/** All-products collection. */
export function shopifyAllProducts(campaign = "shop"): string {
  return shopifyUrl("/collections/all", campaign);
}

/** Cart page on Shopify. */
export function shopifyCart(campaign = "cart"): string {
  return shopifyUrl("/cart", campaign);
}

/** Customer account on Shopify. */
export function shopifyAccount(campaign = "account"): string {
  return shopifyUrl("/account", campaign);
}

/** Map an internal /product/:slug path to Shopify. */
export function shopifyProductUrl(slug: string, campaign = "product"): string {
  const handle = PRODUCT_HANDLE_MAP[slug] ?? slug;
  return shopifyUrl(`/products/${handle}`, campaign);
}

/**
 * Resolve any internal commerce path to a Shopify URL, or null if the path
 * is not commerce-related and should stay on the Lovable site.
 */
export function resolveShopifyUrl(to: string): string | null {
  const [pathOnly] = to.split(/[?#]/);

  if (pathOnly === "/shop" || pathOnly.startsWith("/shop/")) {
    return shopifyAllProducts("nav-shop");
  }
  if (pathOnly === "/cart") return shopifyCart();
  if (pathOnly === "/checkout") return shopifyUrl("/checkout", "checkout");
  if (pathOnly === "/account" || pathOnly.startsWith("/account/")) {
    return shopifyAccount();
  }
  if (pathOnly === "/order-history" || pathOnly === "/orders") {
    return shopifyUrl("/account/orders", "orders");
  }
  if (pathOnly === "/subscribe" || pathOnly === "/subscription") {
    return shopifyUrl("/collections/subscribe-save", "subscribe");
  }
  if (pathOnly === "/pro-subscription") {
    return shopifyUrl("/collections/pro-subscriptions", "pro-subscribe");
  }
  if (pathOnly === "/manage-subscription") {
    return shopifyAccount("manage-subscription");
  }
  const productMatch = pathOnly.match(/^\/product\/([^/]+)$/);
  if (productMatch) return shopifyProductUrl(productMatch[1]);

  return null;
}

/** Client-side redirect helper for route components that should hand off to Shopify. */
export function redirectToShopify(path: string, campaign?: string): void {
  if (typeof window !== "undefined") {
    window.location.replace(shopifyUrl(path, campaign));
  }
}
