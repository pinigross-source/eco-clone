/**
 * Legacy in-site affiliate links (/aff/:id) → new GoAffPro links on the
 * Shopify store. Edit this table to map old affiliate IDs to their new URLs.
 * Any ID not listed here redirects to the shop homepage.
 */
export const AFFILIATE_REDIRECT_MAP: Record<string, string> = {
  "8": "https://shop.envirobiotics.com/?ref=victorc",
  "9": "https://shop.envirobiotics.com/collections/prosub?ref=BLAKEENGEL",
  "14": "https://shop.envirobiotics.com/discount/MICHAELBISCOTTO?ref=MICHAELBISCOTTO",
  "16": "https://shop.envirobiotics.com/collections/prosub?ref=TIBORKLEIN",
  "21": "https://shop.envirobiotics.com/collections/prosub?ref=JASONTOREY",
};

export const AFFILIATE_FALLBACK_URL = "https://shop.envirobiotics.com/";

export function resolveAffiliateRedirect(id: string | undefined): string {
  if (id && AFFILIATE_REDIRECT_MAP[id]) return AFFILIATE_REDIRECT_MAP[id];
  return AFFILIATE_FALLBACK_URL;
}
