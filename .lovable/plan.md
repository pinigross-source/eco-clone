## New `/parents` landing page

A high-converting, parents-of-young-kids landing page that mirrors the Levoit Sprout structure but leads with what only EnviroBiotics can claim: **probiotics that work on every surface, 24/7 — not just air that passes through a filter.** Hero offer is the **Biologic Mini**, with a **10% PARENTS** discount code.

### Route & files

- New route: `src/routes/parents.tsx` → `/parents` with full `head()` meta (title, description, og:title/description/image, canonical).
- New page: `src/pages/ParentsLandingPage.tsx` — built from a copy of the Bobby page scaffolding so styling, Reveal animations, ProductCard, FAQ accordion, and tracking stay consistent.
- Reuse existing imagery from `src/assets/` (nursery, family, lifestyle, product shots). No new asset generation in v1 — call out any image swaps you want after review.
- Promo: `withDiscount(url, "PARENTS")` helper, badge + sticky reminders use `PARENTS`.

### Page structure (same 10 sections, parents-tuned copy)

1. **Hero** — full-bleed parent + child lifestyle image, headline "The air your kids breathe. Protected 24/7." Sub: probiotic protection that keeps working on every surface, not just air a filter sees. Primary CTA "Shop Biologic Mini — 10% off". Trust strip: EPA · FDA GRAS · MADE SAFE · Safe for kids & pets.
2. **Stats strip** — 4 numbers framed for parents (e.g. 24/7 surface coverage · 99% reduction on tested pathogens · 0 harsh chemicals · 30-day guarantee). Numbers will be pulled from existing copy on the site; placeholders flagged for your sign-off before publish.
3. **The problem** — "HEPA filters move air. Sprays mask odors. Neither touches the crib rail, the playmat, the stuffed animals." Three-icon comparison: filter / spray / probiotic.
4. **How it works** — 3-step explainer tied to a nursery scene: 1) Mist disperses friendly probiotics, 2) They colonize surfaces kids actually touch, 3) They keep competing with allergens & odor-causing microbes around the clock. Anchor id `#how-it-works`.
5. **Products** — Biologic Mini highlighted as the parent pick, Biotica 800 and Home Complete Bundle as upsells. Each card uses the 10% PARENTS code link.
6. **Why parents choose EnviroBiotics (the "edge" section)** — replaces Bobby endorsement. Four pillars with icons: Safe for kids & pets, Chemical-free & MADE SAFE certified, Works 24/7 on surfaces, Backed by FDA GRAS probiotic strains. This is the conversion-defining block.
7. **Testimonials** — empty review structure with "No reviews yet" placeholders (per reviews policy). Wired so real reviews can drop in later.
8. **Feature icons** — 6 small tiles: nursery-safe, fragrance-free, pet-safe, quiet operation, low maintenance, ships free.
9. **FAQ** — 6 parent-specific questions (Is it safe around newborns? Will it trigger allergies? Does it replace my HEPA? Safe with pets? How often do I refill? When will I notice a difference?).
10. **Final CTA** — "Give them air you can trust." Big button → Biologic Mini with `?discount=PARENTS`, secondary link to bundle, 30-day guarantee reassurance.

### Conversion levers layered throughout

- Sticky "10% off with code **PARENTS**" reminder near every CTA (matches Bobby page treatment).
- All CTAs use `trackEvent` with `parents_` prefix so we can measure this page separately.
- Guarantee + free shipping + safety certifications repeated in hero, product card, and final CTA.
- Mobile-first hero crop tuned to keep the child + parent face in frame; desktop gradient brightens the right side so the product/CTA breathes.

### SEO

- Title: "Probiotic Air & Surface Care for Families | EnviroBiotics"
- Description: "Cleaner air and safer surfaces for nurseries, playrooms, and bedrooms. Chemical-free, safe for kids and pets. Save 10% with code PARENTS."
- Canonical: `https://envirobiotics.com/parents`
- og:image: hero lifestyle image (absolute URL).

### What I am NOT doing in this turn

- Not touching `/bobby` — it stays live as-is.
- Not generating new photography. If any section needs a custom shot (e.g. nursery hero), flag after first review and I'll generate.
- Not wiring real reviews — empty structure only, per policy.
- No backend changes; this is pure presentation reusing the existing Shopify product links.

### Open items to confirm before publish

- Stats numbers in section 2 — I'll seed from existing site copy; please verify before publish.
- Whether you want the hero to use an existing photo (e.g. `bobby-ambient.jpg` family scene) or a parent-specific shot generated fresh.
