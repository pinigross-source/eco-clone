// Host rules for the move of the marketing site to Shopify.
// envirobiotics.com / www -> Shopify storefront (after DNS moves)
// app.envirobiotics.com   -> this app (ad landing pages, admin, APIs, webhooks)
// Pure helpers, safe on server and browser.

export const APP_HOST = "app.envirobiotics.com";
export const APP_ORIGIN = `https://${APP_HOST}`;

export const CORS_ALLOWED_ORIGINS = [
  "https://envirobiotics.com",
  "https://www.envirobiotics.com",
  "https://shop.envirobiotics.com",
  "https://app.envirobiotics.com",
];

export function isAppHost(hostname: string | null | undefined): boolean {
  return (hostname ?? "").toLowerCase().split(":")[0] === APP_HOST;
}

export function isCorsAllowedOrigin(origin: string | null | undefined): boolean {
  return !!origin && CORS_ALLOWED_ORIGINS.includes(origin);
}

export function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export const NOINDEX_META = '<meta name="robots" content="noindex,nofollow">';

/** Insert the noindex meta right after <head ...>. */
export function injectNoindexMeta(html: string): string {
  if (html.includes('content="noindex,nofollow"')) return html;
  return html.replace(/<head(\s[^>]*)?>/i, (m) => `${m}${NOINDEX_META}`);
}

export const APP_ROBOTS_TXT = "User-agent: *\nDisallow: /\n";

// The store (and every customer-facing page) lives at the Shopify root domain.
export const STORE_ORIGIN = "https://envirobiotics.com";

// Paths this app still serves itself. Everything else belongs to the store.
const KEPT_PREFIXES = ["/go/", "/lp/", "/admin/", "/aff/", "/prosub/", "/api/"];
const KEPT_EXACT = new Set([
  "/beyond-bleach", "/admin", "/link-check", "/staff-login", "/prosub",
  "/affiliate-signup", "/affiliate-dashboard", "/robots.txt", "/sitemap.xml",
]);

export function isAppKeptPath(pathname: string): boolean {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (KEPT_EXACT.has(p)) return true;
  if (KEPT_PREFIXES.some((pre) => pathname.startsWith(pre))) return true;
  return false;
}

/** Static files and dev tooling are never redirected. */
export function isAssetPath(pathname: string): boolean {
  return /\.[a-z0-9]{1,8}$/i.test(pathname) || /^\/(assets|_build|_serverFn|@|src|node_modules|__)/.test(pathname);
}

/** Store URL for a customer path: same path, same query string. */
export function storeUrlFor(pathname: string, search = ""): string {
  return `${STORE_ORIGIN}${pathname || "/"}${search}`;
}

/** Where a request to this app should be 301'd, or null to serve it here. */
export function customerRedirectTarget(pathname: string, search = ""): string | null {
  if (isAppKeptPath(pathname) || isAssetPath(pathname)) return null;
  return storeUrlFor(pathname, search);
}
