# Same-day consumer CRO upgrade

## Direction
Use the existing EnviroBiotics editorial system with a tighter, mobile-first conversion rhythm. Keep each audience visually distinct, but apply Allergy’s strongest pattern across the funnel: specific problem, plain-English differentiator, early product decision, compact proof, then education and FAQ.

## Shared conversion system
- Add a compact trust strip using only the currently verified EPA Registered, FDA GRAS, AllergyUK, MADE SAFE, and PTPA assets appropriate to each page.
- Add a reusable product decision block driven by the existing product catalog for BioLogic Mini and Biotica 800. It will show verified coverage, installation, current base price, best-use context, and a real Shopify destination.
- Add a reusable tracked Shopify link that preserves existing discount URLs, attribution, affiliate parameters, and UTMs through the current click-time decorator.
- Add a configurable mobile sticky shop action, then suppress the global sticky bar on pages that provide their own, preventing duplicates.
- Standardize outbound tracking as `click_to_shop` with `route`, `placement`, `product`, and `destination`; placement values will be `hero_primary`, `early_product`, `mid_page`, `sticky_mobile`, and `final_cta`.

## Route changes

### Homepage `/`
- Keep the current mobile and desktop hero media, but sharpen the copy around probiotic purification for air, surfaces, and objects.
- Make “Find My System” the dominant action and keep the video action subordinate.
- Move the two-product decision section directly after the hero.
- Convert its oversized certification tiles into the compact trust strip.
- Tighten later proof and testimonial spacing without changing navigation, footer, or SEO intent.
- Preserve the current mobile video framing. Replace the unfinished dual-video handoff with a stable single-video loop so the visible device does not jump.

### Parents `/parents`
- Preserve the nursery campaign visual and message match.
- Place an early BioLogic Mini decision block immediately after the hero with verified $98 base price, up to 300 sq ft coverage, rechargeable placement, and the existing META15 Shopify link.
- Move longer problem, comparison, and science content below that decision.
- Remove repeated product choices and duplicated proof so the page is materially shorter.
- Keep one page-specific sticky Mini action and make guarantee or subscription wording only as specific as the existing verified source supports.

### Pets `/pets`
- Preserve the current problem-led hero and focused campaign header.
- Move the recommended Biotica 800 decision directly below compact trust proof, while retaining Mini and bundle choices in the later comparison.
- Keep the FAQ and page-specific sticky action, shorten repeated education, and compress proof/testimonials.
- Preserve the current META15 Shopify destinations.

### Allergy `/allergy`
- Keep the hero, hierarchy, and FAQ as the control pattern.
- Add consistent tracked Shopify handoffs and compact the certification area.
- Tighten duplicate “how it works” explanation and mobile spacing without changing the specific allergy positioning.
- Keep the existing verified product choices and META15 destinations.

### Wellness `/wellness`
- Replace the abstract, long-form structure with a shorter use-case page modeled on Allergy.
- Lead with a concrete fresher-home promise and the air-only versus air, surfaces, and objects distinction.
- Put Biotica 800 early as the recommended shared-room device, with BioLogic Mini as the small-room alternative.
- Bring proof and product choice forward, use one concise comparison, retain a focused FAQ, and remove repetitive abstract sections.
- Preserve the existing WELLNESS discount/cart destinations and route-specific metadata intent.

## Reliability and performance
- Fix the confirmed hydration risk on `/parents`: query-based hero variation currently differs between server render and first browser render. Render the default variant first, then apply the query variant after hydration.
- Keep hero images eager with reserved dimensions; lazy-load and dimension below-fold imagery.
- Remove oversized proof blocks and avoid deferred fixed-height gaps on scoped pages.
- Respect reduced motion and maintain at least 44px touch targets and 16px body copy.

## Verification
- Run the TypeScript check, project build, and relevant existing verification scripts.
- Test all five routes at 375px and desktop with Playwright.
- Verify one H1, no horizontal overflow, no duplicate sticky actions, working hero/product/final actions, real destinations, route-specific metadata, and clean console/runtime output.
- Confirm Shopify links retain campaign parameters before click and accept the existing click-time attribution decoration.

## Scope limits
- No changes to `/spa-wellness`, `/business`, support pages, Shopify configuration, publishing, or visibility.
- This project can verify marketing-site links and parameters, but cannot validate purchase events or attribution behavior inside Shopify, GA4, or Meta.
