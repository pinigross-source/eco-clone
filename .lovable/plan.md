# Shopify Connectivity Plan

## Strategy: Hosted Shopify (Recommended)

Keep Lovable as the **marketing/content front-end** (home, about, how it works, research, blog, support, etc.) and let **Shopify own all commerce** (product pages, cart, checkout, account, orders) on `shop.enviriobiotics.com`.

This is already the direction we've been heading — every `/shop` and `/product/*` link redirects to Shopify. We just formalize it across the whole experience.

```text
enviriobiotics.com           shop.enviriobiotics.com
┌───────────────────┐        ┌────────────────────────┐
│ Lovable (content) │ ─────▶ │ Shopify (commerce)     │
│  Home / About     │  link  │  Products / Cart       │
│  How It Works     │ ─────▶ │  Checkout / Account    │
│  Research / Blog  │        │  Order history         │
└───────────────────┘        └────────────────────────┘
```

Pros: zero PCI scope, Shopify handles inventory/tax/shipping/payments/fraud, fastest to ship, no API keys needed.
Cons: users leave the Lovable domain when they shop (mitigated by shared subdomain + matching design).

## What I'll Implement

### 1. Centralize the Shopify URL
- Add `VITE_SHOPIFY_URL` (default `https://shop.enviriobiotics.com`) and a single helper `shopifyUrl(path?)` in `src/lib/shopify.ts`.
- Refactor `src/lib/link.tsx` to use it. One place to change the domain ever again.

### 2. Audit & redirect every commerce touchpoint
Sweep the codebase for any remaining internal `/shop`, `/product/*`, `/cart`, `/checkout`, `/account/orders` references and route them to Shopify:
- Product handles map: `mini → /products/biotica-mini`, `800 → /products/biotica-800`, `2080 → /products/biotica-2080` (confirm exact handles with you before shipping).
- Buttons: "Shop", "Buy now", "Add to cart", "Subscribe", "Reorder", "View cart".
- Nav, footer, hero CTAs, product cards, comparison tables, pricing tables, modals (`ClaimAccountModal`, `NeedHelpSection`), HowItWorks CTA, ProductDetailPage CTAs.

### 3. Remove dead commerce code from Lovable
Pages that now exist only on Shopify can be deleted or turned into redirect routes:
- `src/pages/ShopPage.tsx`, `ProductDetailPage.tsx`, `ProductRegistrationPage.tsx`, `SubscriptionPage.tsx`, `ProSubPage.tsx`, any cart/checkout pages.
- Replace each with a TanStack route that does `window.location.replace(shopifyUrl(...))` so old links still work.

### 4. Live product data on marketing pages (optional but valuable)
For dynamic price/availability on Lovable pages without rebuilding the store, use **Shopify Storefront API** (public, read-only token, safe in browser):
- Fetch product title/price/image/availability for the 3 biotica products and render on home + comparison pages.
- Requires: a Storefront API access token from your Shopify admin (Apps → Develop apps → Storefront API access). Stored as `VITE_SHOPIFY_STOREFRONT_TOKEN` + `VITE_SHOPIFY_DOMAIN` (e.g. `enviriobiotics.myshopify.com`).
- If you'd rather keep it simple, skip this and hardcode prices.

### 5. Shared design / cross-domain UX
- Mirror the Lovable header/footer inside the Shopify theme so the visual handoff is seamless (this is a Shopify theme edit, not a Lovable change — I'll give you the HTML/CSS to paste).
- Ensure `shop.enviriobiotics.com` DNS CNAME is pointed at Shopify (you do this in your domain registrar + Shopify admin).
- Open Shopify links in the same tab (current behavior) so back-button returns to the marketing site.

### 6. Analytics & attribution
- Add UTM params on outbound links (`?utm_source=enviro&utm_medium=site&utm_campaign=<location>`) so Shopify analytics shows where buyers came from.

## What I will NOT build on Lovable
Cart, checkout, payment, customer accounts, order history, inventory, discounts, shipping rates, tax, refunds. All Shopify.

## Things I need from you before/while building
1. **Confirm exact Shopify product handles** for biotica mini, 800, 2080 (look in Shopify admin → Products → URL slug).
2. **Confirm `shop.enviriobiotics.com` is live** and routing to your Shopify store.
3. **Decide on step 4** (live prices via Storefront API) — yes or skip.
4. If yes to step 4, generate a **Storefront API access token** in Shopify and share it (it's public-safe).

## Deliverables
- `src/lib/shopify.ts` helper + env-var driven base URL
- Refactored `src/lib/link.tsx` and all CTAs site-wide
- Removed/redirected obsolete shop pages
- (Optional) Storefront API hook + live product cards
- A short doc on how to update the Shopify URL and product handle map

Approve and I'll build it.