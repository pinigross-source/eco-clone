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
