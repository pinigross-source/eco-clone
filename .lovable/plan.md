
## Goal

Rewrite `src/pages/AllergyLandingPage.tsx` end-to-end (copy + structure + CTA hierarchy) without changing the visual language: same bedroom hero image, same off-white/cream palette (`#F5F3EE` / `#FBF9F4`), same `Instrument Serif` italic accents, same display font, same rounded-3xl cards, same `Reveal` scroll animation. No new dependencies, no design overhaul.

A/B hero variants (`?v=b`, `?v=c`) will be removed — the brief locks in one hero. Everything else stays additive or in-place.

## Final section order (top → bottom)

1. **Hero** — locked headline + new subhead + new primary CTA + secondary CTA
2. **Proof row** (new, directly under hero) — 4 compliance-safe trust badges
3. **Problem** — "You did everything right" rewritten + CTA
4. **Air + Surfaces** ("Clean air is only half the room") — body copy + 3-step Place / Activate / Cover cards + tagline
5. **Comparison table** — new headline, new 5-row two-column table, CTA below
6. **Proof section** (new, moved BEFORE products) — headline + 4 proof cards
7. **Certifications grid** — kept, with short caption under each logo explaining what it means
8. **Offer clarity** (new) — "Choose your whole-room coverage system" intro before product cards
9. **Product cards** — relabeled as "Bedroom Coverage Kit" (Mini) and "Large Room Coverage Kit" (Biotica 800), each showing Best for / Coverage / What's included / Refill duration / Price / Guarantee / Shipping; new CTAs "Protect My Bedroom" and "Cover My Larger Room". Bundle card kept as a tertiary option.
10. **Testimonial** — kept as-is (already compliance-safe)
11. **FAQ** — replaced with the 6 prescribed Q&As
12. **Final CTA** — new headline/subhead/CTA/secondary line

Sections removed to tighten the funnel: "The science / gut probiotics" section, "Built for the allergy-aware home" 4-icon block, the dark allergy-badge testimonial block (its quote will be merged into the kept light testimonial section).

## CTA map

| Section | Label | Destination |
|---|---|---|
| Hero primary | Treat the Whole Room | `#offer` (scrolls to product chooser) |
| Hero secondary | See How It Works | `#how-it-works` |
| Problem | Stop Treating Half the Room | `#offer` |
| Comparison | Choose My Coverage | `#offer` |
| Mini product | Protect My Bedroom | existing `MINI_URL` |
| Biotica product | Cover My Larger Room | existing `BIOTICA_URL` |
| Final | Start Whole-Room Coverage | `#offer` |

All CTAs keep existing `trackEvent(...)` calls; new ones get descriptive event names (`click_allergy_hero_primary`, `click_allergy_problem_cta`, etc.).

## Compliance copy rules applied throughout

- No "kills", "prevents", "cures", "eliminates allergens", "stops illness".
- Use "helps treat", "helps cover", "supports cleaner indoor environments", "designed to disperse", "settle on surfaces", "when used as directed".
- Update FAQ #5 and proof cards accordingly. Existing "FDA GRAS / safe for kids and pets" cert caption stays (factual, not a health claim).

## Placeholders

Where exact numbers aren't already on the page, use bracketed placeholders so the team can fill in:
- Refill duration on each product card: `[Add refill duration]`
- Guarantee specifics beyond the existing "30-day money-back": `[Add guarantee details]`
- Shipping beyond the existing "Free shipping": `[Add shipping details]`

Coverage (300 sq ft / 800 sq ft) and prices ($98 / $299) are already on the page and will be kept.

## Technical notes (developer-only)

- Single file edit: `src/pages/AllergyLandingPage.tsx`. No route, schema, or component changes.
- Update the route's `head()` meta in `src/routes/allergy.tsx` description to match the new positioning ("Air purifiers only treat the air. EnviroBiotics helps cover the surfaces your purifier cannot reach…") — current meta is close but slightly off-message.
- Remove unused imports after section deletions (`Sparkles`, `Leaf`, `VolumeX`, `ShieldCheck`, `beddingImg`, `allergyBadge` if its section is removed). Keep `Check`, `ArrowRight`.
- Add `id="how-it-works"` and `id="offer"` anchors. Keep existing `id="products"` for backwards compatibility.
- Hero A/B variant code (`HERO_VARIANTS`, `angle` memo) removed.
- All existing Shopify cart URLs (`MINI_URL`, `BIOTICA_URL`, `BUNDLE_URL`) and `trackEvent` plumbing preserved.

## Out of scope

- No new images generated; reuses existing hero, product, and cert assets.
- No global nav, footer, or shared-component edits.
- No new backend, tracking, or analytics wiring beyond renamed event labels.
