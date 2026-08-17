# Fix discount links: use Shopify's native /discount/CODE form

You're right. Every landing page currently builds buy links as a product URL with a
`discount=CODE` query parameter, which only works if the Shopify theme has custom JS
that reads it. Nothing in this repo puts that JS on the store, so `/pets`, `/wellness`,
`/sleep`, `/clarity`, `/active-families`, `/parents`, `/bobby` and `/allergy` are all
using the same non-native form. `/allergy` additionally has a malformed URL (two `?`),
but swapping `?` for `&` would only fix the syntax, not the mechanism.

## Step 1: verify on the live store (before changing anything)

Open the current `/pets` Buy link in an incognito window, add to cart, go to checkout,
and check whether PETS is applied. I can run this check headlessly against
shop.envirobiotics.com and report exactly what the checkout shows. That tells us
definitively whether the theme has the query-param JS.

## Step 2: convert every buy link to the path form

Regardless of the Step 1 result, the path form is the documented, always-correct one,
so the fix is the same either way:

```
https://shop.envirobiotics.com/discount/PETS?redirect=/products/biotica-800
```

Shopify stores the discount in the customer's session and then redirects to the product
page, so it survives to checkout with no theme code.

For the cart-permalink CTAs (the bundle "add to cart" links) the redirect target becomes
the cart permalink instead:

```
/discount/FAMILY?redirect=/cart/48644373184764:1
```

## Technical detail

- Add two helpers to `src/lib/shopify.ts`:
  - `shopifyDiscountUrl(code, redirectPath, campaign?)` — builds
    `${SHOPIFY_BASE}/discount/${code}?redirect=${encoded path}` and keeps the existing
    UTM + ad-attribution decoration (`withUtm` / `decorateShopUrl`) applied to the
    outer URL so Meta/Google click IDs still pass through.
  - `shopifyProductDiscountUrl(slug, code, campaign?)` — same, resolving the slug
    through the existing `PRODUCT_HANDLE_MAP`.
- Replace the local `withDiscount` definitions in each landing page with these helpers:
  `PetsLandingPage`, `WellnessLandingPage`, `SleepLandingPage`, `ClarityLandingPage`,
  `ActiveFamiliesLandingPage`, `BobbyParrishLandingPage`, `ParentsLandingPage`, and
  `AllergyLandingPage` (which also loses its double-`?` bug in the process).
- No visual or copy changes; the on-page "use code X at checkout" text stays as a fallback.

## Verification

Re-run the incognito checkout test against one converted link per code (PETS, ALLERGY,
FAMILY, WELLNESS) and confirm the discount lands on the checkout total.
