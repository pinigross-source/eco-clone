import { shopifyAllProducts, shopifyCart, shopifyUrl } from "@/lib/shopify";

/**
 * Legacy checkout entry point. All commerce now lives on Shopify, so
 * instead of creating a Stripe Checkout session this helper returns a
 * URL that hands the shopper off to the Shopify store. The previous
 * call sites already do `window.location.href = data.url`, so they keep
 * working — they just navigate to Shopify instead of Stripe.
 */
export async function invokeCheckout(body: Record<string, unknown> = {}) {
  // Best-effort: if the call site passed a known mode, send the shopper
  // somewhere sensible on Shopify; otherwise default to the cart.
  const mode = (body?.mode as string | undefined) ?? "payment";
  const url =
    mode === "subscription"
      ? shopifyUrl("/collections/subscriptions", "checkout-sub")
      : body && (body.lineItems || body.priceId)
      ? shopifyAllProducts("checkout")
      : shopifyCart("checkout");

  return { data: { url }, error: null as null };
}
