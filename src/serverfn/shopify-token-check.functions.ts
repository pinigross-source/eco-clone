import { createServerFn } from "@tanstack/react-start";

/**
 * Inspects SHOPIFY_STOREFRONT_TOKEN format WITHOUT calling Shopify.
 * Storefront tokens are 32-char lowercase hex strings.
 * Admin tokens start with "shpat_" and will NOT work with the Storefront API.
 */
export const inspectShopifyToken = createServerFn({ method: "GET" }).handler(async () => {
  const raw = process.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!raw) {
    return { ok: false as const, error: "SHOPIFY_STOREFRONT_TOKEN is not set." };
  }
  const token = raw.trim();
  const length = token.length;
  const preview = `${token.slice(0, 4)}…${token.slice(-4)} (length ${length})`;

  if (token.startsWith("shpat_")) {
    return {
      ok: false as const,
      preview,
      error:
        "This is an Admin API token (starts with 'shpat_'). Storefront API needs the separate 'Storefront API access token' from the same app's API credentials page.",
    };
  }
  if (token.startsWith("shpss_")) {
    return {
      ok: false as const,
      preview,
      error: "This looks like a shared-secret, not a Storefront access token.",
    };
  }
  if (token.startsWith("shpca_") || token.startsWith("shppa_")) {
    return {
      ok: false as const,
      preview,
      error: "This is a custom/private app token, not a Storefront access token.",
    };
  }
  if (!/^[a-f0-9]{32}$/i.test(token)) {
    return {
      ok: false as const,
      preview,
      error: `Token format looks wrong. Expected a 32-character hex string. Got ${length} chars.`,
    };
  }
  return {
    ok: true as const,
    preview,
    message: "Token format looks like a valid Storefront API access token (32-char hex).",
  };
});
