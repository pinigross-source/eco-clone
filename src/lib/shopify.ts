// Central Shopify integration helper.
// All commerce (cart, checkout, accounts, orders) lives on the Shopify store.
// This Lovable site is the marketing/content front-end and links out for any
// purchase action.

export const SHOPIFY_BASE =
  (import.meta.env.VITE_SHOPIFY_URL as string | undefined) ??
  "https://shop.envirobiotics.com";


export type ShopOfferId = "guarantee" | "meta15";
export const META15_DISCOUNT_CODE = "META15";

/**
 * The single source of truth for every outbound shop.envirobiotics.com URL.
 * guarantee -> https://shop.envirobiotics.com{productPath}
 * meta15    -> https://shop.envirobiotics.com/discount/META15?redirect={encoded productPath}
 *
 * No hard-coded utm_source / utm_medium / utm_campaign here: the visitor's own
 * campaign params (saved in sessionStorage on the first page load of the
 * session) plus utm_content={pageName} are appended at click time, because
 * decorating during render would break SSR hydration.
 */
export function buildShopUrl(
  productPath: string = "/",
  offer: ShopOfferId = "guarantee",
  _pageName?: string,
): string {
  const clean = productPath.startsWith("/") ? productPath : `/${productPath}`;
  if (offer === "meta15") {
    return `${SHOPIFY_BASE}/discount/${META15_DISCOUNT_CODE}?redirect=${encodeURIComponent(clean)}`;
  }
  return `${SHOPIFY_BASE}${clean}`;
}

// Internal product slug → Shopify product handle.
export const PRODUCT_HANDLE_MAP: Record<string, string> = {
  "biologic-mini": "biologic-mini",
  "biotica-800": "biotica-800",
  "ba-2080": "biotica-800",
  "betterair-2080": "biotica-800",
  "ebiotic-pro": "e-biotic-pro",
};

/**
 * Shop URLs carry no hard-coded utm_source/utm_medium. The visitor's own
 * utm_*, fbclid, gclid and ttclid parameters (captured on first page load)
 * are appended at click time, together with utm_content for the page name.
 * Decorating during render would break hydration, so it never happens here.
 * `campaign` is kept in the signature for call-site readability only.
 */
function withUtm(url: string, _campaign?: string): string {
  return url;
}

/**
 * Apply stored ad attribution (set by the pass-through script in the app shell).
 * Only for imperative navigations (window.location.href = ...). Never call this
 * during render — it would break hydration.
 */
export function decorateShopUrl(url: string): string {
  if (typeof window === "undefined") return url;
  const fn = (window as unknown as { ebDecorateUrl?: (u: string) => string })
    .ebDecorateUrl;
  return typeof fn === "function" ? fn(url) : url;
}


/**
 * Imperative navigation to the Shopify store.
 *
 * Exactly one navigation: the URL is decorated with stored ad-attribution /
 * affiliate params and then handed to location.replace/assign.
 *
 * Cross-domain identity between envirobiotics.com and shop.envirobiotics.com
 * relies on the shared parent GA cookie domain (cookie_domain
 * "envirobiotics.com"), not on a `_gl` parameter. Google's linker decorates
 * ordinary anchors on click; we do not claim it decorates these imperative
 * navigations. Any `_gl` already present on the incoming URL is passed through
 * untouched and never stored.
 */
export function navigateToShopify(
  url: string,
  options: { replace?: boolean } = {},
): void {
  if (typeof window === "undefined") return;
  const target = decorateShopUrl(url);
  if (options.replace) window.location.replace(target);
  else window.location.assign(target);
}


/** Build a Shopify URL from a path (e.g. "/products/biotica-800"). */
export function shopifyUrl(path: string = "/", campaign?: string): string {
  return withUtm(buildShopUrl(path), campaign);
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
 * Shopify's native discount link: /discount/CODE?redirect=/some-path
 * Shopify stores the code in the customer's session and then redirects, so the
 * discount survives all the way to checkout with no theme JS required.
 *
 * NOTE: never build product URLs with a `?discount=CODE` query param  that form
 * is NOT native to Shopify and silently does nothing unless the theme has custom JS.
 */
export function shopifyDiscountUrl(
  code: string,
  redirectPath: string = "/",
  campaign?: string,
): string {
  const clean = redirectPath.startsWith("/") ? redirectPath : `/${redirectPath}`;
  const url = new URL(`${SHOPIFY_BASE}/discount/${encodeURIComponent(code)}`);
  url.searchParams.set("redirect", clean);
  return withUtm(url.toString(), campaign);
}

/** Discount link that lands on a product page, resolving the internal slug. */
export function shopifyProductDiscountUrl(
  slug: string,
  code: string,
  campaign = "product",
): string {
  const handle = PRODUCT_HANDLE_MAP[slug] ?? slug;
  return shopifyDiscountUrl(code, `/products/${handle}`, campaign);
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
    navigateToShopify(shopifyUrl(path, campaign), { replace: true });
  }
}
