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
  "ba-2080": "biotica-800",
  "betterair-2080": "biotica-800",
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
    // NOTE: intentionally NOT decorated here. Ad-attribution params are only
    // known on the client, so decorating during render produces a different
    // href than the server-rendered HTML (React hydration error #418).
    // The delegated click/auxclick handler in __root.tsx decorates the anchor
    // at click time instead, which is both SSR-safe and always up to date.
    return u.toString();
  } catch {
    return url;
  }
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
 * Always applies the stored ad-attribution / affiliate decoration, and routes
 * through a real anchor click so Google's cross-domain linker can append its
 * short-lived `_gl` parameter (the linker only decorates anchors on click, it
 * never touches `window.location` assignments). Falls back to a plain
 * navigation when no tag is present or the click did not navigate.
 *
 * `_gl` is produced by Google at click time and is never stored by us.
 */
export function navigateToShopify(
  url: string,
  options: { replace?: boolean } = {},
): void {
  if (typeof window === "undefined") return;
  const target = decorateShopUrl(url);

  const go = () => {
    if (options.replace) window.location.replace(target);
    else window.location.href = target;
  };

  const hasTag = typeof (window as unknown as { gtag?: unknown }).gtag === "function";
  if (!hasTag || typeof document === "undefined") {
    go();
    return;
  }

  try {
    const a = document.createElement("a");
    a.href = target;
    a.rel = "noopener";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    // If the synthetic click did not navigate, fall back (href may have been
    // decorated with _gl by the linker in the meantime, so re-read it).
    window.setTimeout(() => {
      const decorated = a.href;
      a.remove();
      if (options.replace) window.location.replace(decorated);
      else window.location.href = decorated;
    }, 600);
  } catch {
    go();
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
