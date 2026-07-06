## Goal

Rebuild `/` so its section order, headings, and body copy match the uploaded mockup PNG, using the exact text from `homepage-text.md`. You'll drop in the hero GIF and section images afterward — the plan reserves slots and keeps current images as placeholders until then.

## New section order on `/`

1. **Hero** — "Your Health. **Your Choice.**" + subhead + body + CTAs (Choose Your System / Learn More). Right side reserved for the hero GIF (placeholder = current hero image until you upload the GIF).
2. **Nature Statement band** — one-line H2 + italic accent.
3. **Trusted Places** — intro line, logo strip, closing H3.
4. **Find the system that suits your space** — 30-day risk-free intro + BioLogic Mini (Up to 300 sq ft) and Biotica 800 (300–800 sq ft) cards + certification badges row.
5. **The Science of Balance** — italic subhead, body, "Let Nature Back Indoors" H3, Choose Your System + Watch how it works CTAs, lifestyle image on the right.
6. **Add a layer of wellness** — 4 alternating image/card rows: Parents/Nursery, Pets, Active Families, Allergy/Bedroom. Each row: eyebrow, tag, H3, italic subhead, body, "What you get" paired block, primary + LEARN MORE CTAs.
7. **Testimonials** — "Protecting thousands of families." featured PTPA quote + 4-card carousel.
8. **Footer** (unchanged).

Everything not in the mockup is removed from `/`: the "Ready for cleaner surfaces, naturally?" mid-band, the "When you thrive, our planet does too" mission section, and `FinalCTASection`. Those components stay in the repo for reuse on other routes.

## Copy source

All headings, subheads, body, alts, and CTA labels/URLs come verbatim from `user-uploads://homepage-text.md`. Stripe price IDs for the two products stay as listed. Certifications row: EPA Registered, FDA GRAS, AllergyUK, PTPA Winner, MADE SAFE®.

## Image / GIF handling

- **Hero GIF**: hero right column gets a dedicated slot component; until you upload the GIF, the existing `hero-desktop-family.avif` stays in that slot. When you send the file I'll swap the src via Lovable Assets.
- **Section images**: for the Science of Balance section and the 4 audience rows, I keep the current photos already in `src/assets/` (nursery, pets, parents, allergy) so layout is complete. When you send replacements I'll swap them.
- No new binary uploads happen in this plan.

## Technical changes

- `src/components/HeroSection.tsx` — rewrite copy + restructure to a two-column layout (text left, media slot right) so the GIF has an obvious home.
- `src/components/MicroscopicWorldSection.tsx` — replaced by a minimal "Nature Statement" band matching the copy exactly (renamed to `NatureStatementSection.tsx`; old file removed).
- `src/components/SizedToYourSpaceSection.tsx` — copy pass: intro paragraph, product sublines, and the certifications badge row updated to the 5 listed certs.
- `src/components/TrustedPlacesSection.tsx` — intro/closing copy verified against md; adjust wording if it drifts.
- **New** `src/components/ScienceOfBalanceSection.tsx` — section 5.
- **New** `src/components/AddLayerOfWellnessSection.tsx` — section 6, wraps 4 alternating rows (image left/right alternating), each row using shared `WellnessRow` subcomponent.
- `src/components/TestimonialsSection.tsx` — verify featured quote + 4 carousel quotes match the md; update where they differ.
- `src/pages/HomePage.tsx` — new import list + new render order; drop the mid-band, mission section, and `FinalCTASection`.
- `src/routes/index.tsx` — leave the SEO head as-is (title/description in md already match).

## Out of scope

- No changes to other routes, product data files, or shop links other than the ones referenced in the homepage.
- No new dependencies.
- Actual GIF and photo swaps happen after you upload them.
