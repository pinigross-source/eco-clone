## Goal

Rebuild `/allergy` into a single-scroll, mobile-first Meta-ad landing page for allergy/asthma sufferers, structured around the "whole room, not just the air" differentiator, with prices anchored on-page and "Buy Once" as the primary CTA.

## Scope

Rewrite `src/pages/AllergyLandingPage.tsx` end-to-end. Keep the existing route (`src/routes/allergy.tsx`) and its SEO head; update meta title/description to the new positioning. No new routes, no backend, no new dependencies.

## Compliance rule (hard)

Environmental claims only ("reduces allergens on surfaces and in the air"). No medical claims. Footer disclaimer verbatim: *"Results vary by space and conditions. Not intended to diagnose, treat, cure, or prevent any disease."*

## Design system

- Palette: cream `#F7F4EE` bg, ink `#1B2A2A` text, sage/teal `#2E8B7F` primary accent, soft muted-green secondary. Add these as CSS variables in `src/styles.css` under `@theme` (`--color-cream`, `--color-ink`, `--color-sage`, `--color-sage-soft`) so utilities like `bg-cream`, `text-ink`, `bg-sage` work — no hardcoded hex in components.
- Type: Inter (already loaded). Large confident headlines, generous mobile body (≥17px).
- Rounded corners, soft shadows, `Reveal`-style scroll fades (reuse existing `Reveal` component), respect `prefers-reduced-motion`.
- Fully mobile-first; USD prices everywhere.

## Section order (single scrolling page)

1. **Hero** — Headline "Clean the whole room. Not just the air." Sub "Environmental probiotics that continuously reduce allergens on every surface and in the air — between cleanings." Primary CTA "Shop EnviroBiotics →" (→ Bundle), secondary "See how it works" (scrolls to comparison). Trust chips: EPA Registered · FDA GRAS · AllergyUK · 30-day money-back. Bright sunlit interior placeholder image (reuse `heroImg`).
2. **Problem / message match** — "If your allergies flare up indoors, your air purifier isn't enough." Short paragraph naming dust, dander, pollen, mold settling on bedding, sofas, floors.
3. **The differentiator (core)** — "Air purifiers filter air. EnviroBiotics treats the whole room." Two-column visual: purifier (air only) vs EnviroBiotics (air + every surface + object). Bullet list of what it reaches: mattresses, bedding, sofas, rugs, floors, curtains, air.
4. **How it works** — 3 steps: Plug in → Probiotic mist disperses → Continuously reduces allergens on surfaces and in the air.
5. **Proof / certifications** — Row of logos: EPA Registered, FDA GRAS, AllergyUK, PTPA Winner, MADE SAFE®, ISO 9001:2015, Instituto de Salud Pública, Società Italiana di Medicina Ambientale. Two or three empty-structure review cards (first name + city + short line). **No fabricated review text or star ratings** — cards render as structural placeholders per site policy.
6. **Pricing / choose your device** — Three cards, USD price up front, "Buy Once" primary button, small secondary "or Subscribe & Save on refills" text link (goes to same product page):
   - BioLogic Mini — **$98** · "Best for a single room, up to 300 sq ft."
   - Biotica — **$299** · "Best for whole-home coverage."
   - Home Bundle — **$395** ~~$495~~ **Save $100** · "2 BioLogic Minis + 1 Biotica — whole home plus two rooms." Badge: "Most popular · Best value".
   Buy Once buttons visually dominant; subscription is a small text link only.
7. **Guarantee** — "Try it in your home for 30 days, risk-free." Free shipping, easy returns. Placed directly under pricing.
8. **FAQ (accordion)** — How is this different from an air purifier? · Do I have to subscribe? · Is it safe around kids and pets? · Any chemicals or fragrances? · How soon will I notice a difference? · What's the return policy? All answers environmental, non-medical.
9. **Final CTA** — "Clean the whole room — not just the air." Button "Shop EnviroBiotics →" → Bundle. Reassurance line: 30-day money-back · free shipping · easy returns.
10. **Footer** — Reuse existing `Footer`. Add compliance disclaimer line above/below footer content on this page only.

## Shop links / CTA behavior

Use existing `shopifyProductUrl` helper. Every CTA fires `trackEvent` with the section name (hero, differentiator, pricing_mini, pricing_biotica, pricing_bundle, final_cta) so analytics can attribute clicks. Bundle CTAs point to `home-complete-bundle` with `?discount=ALLERGY` (existing `BUNDLE_URL`). BioLogic Mini and Biotica point to their product pages; "Buy Once" opens the product page (existing behavior — Shopify handles one-time vs subscription selection there).

## Files changed

- `src/pages/AllergyLandingPage.tsx` — full rewrite following the sections above.
- `src/styles.css` — add the 4 `--color-*` tokens under `@theme`.
- `src/routes/allergy.tsx` — update `title` and `description` meta to match the new headline ("Clean the whole room. Not just the air. | EnviroBiotics").

## Out of scope

- No changes to Navbar, Footer, product data, Shopify integration, or other routes.
- No new images uploaded; reuse `heroImg` and existing cert asset pointers.
- No reviews content generated — review cards stay as empty structural placeholders.
