## Scope
Top-to-bottom rebuild of the homepage per spec, plus a product rename + URL redirect. Frontend/content only — no schema or auth changes.

## 1. Global terminology pass
- Search/replace across homepage components: "good bacteria" / generic "bacteria" (when referring to our product) → **"beneficial probiotic"**.
- First occurrence on the page gets the inline definition: *"The same type of helpful microbe found in yogurt, soil, and the human gut."*
- Replace any remaining "kills" → "reduces". Audit for absolute safety/cure language and soften.

## 2. Hero (`HeroSection.tsx`)
- Remove the "What allergens do to your home" eyebrow.
- Keep sparkle/ParticleField interaction.
- Headline + one value-claim paragraph + 2 CTAs only.
- Primary CTA → **"Build my home protection"** (anchors to `#products`).
- Secondary CTA → **"Watch how it works"** (anchors to `#video`).
- Trust strip reorder: **Safe for kids & pets** (bold) · EPA registered · FDA GRAS · 4.8★ reviews.
- Add a prominent FDA symbol next to / inline with the trust strip.

## 3. Remove the "Trusted by leading certifications" bar
- Delete `<CertificationsBar />` usage from `Index.tsx`. (Component file kept but unused.)

## 4. New Products section (replaces ProblemSection / quiz / Solutions Finder)
- Headline: *"Your indoor air. Your indoor surfaces. They affect more than you think."*
- Sub: *"Three devices for three kinds of spaces. Pick the one that fits yours."*
- Symptom line: *"Headaches. Fatigue. Sleep that doesn't feel restful."*
- Three cards (no prices), each with size/use line + "See details" linking to `/product/<slug>`:
  - **BioLogic Mini** — One room. Up to 300 sq ft. Bedroom, office, nursery.
  - **Biotica 800** — Larger living areas. 300 to 800 sq ft. Living room, family room, open kitchen.
  - **E-Biotic Home & Small Office** — Whole space. 800+ sq ft. Apartments, small offices, multi-room coverage.
- New component `ProductsTriadSection.tsx`. Delete usage of `FindMySolutionQuiz` from homepage.

## 5. Comparison section (`ComparisonSection.tsx`, re-added to homepage)
- Remove "The Difference" eyebrow.
- Card copy updated per spec (Air Purifiers / Sprays / EnviroBiotics 24/7 line).
- Coverage line below: *"Everything: Surfaces. Objects. Air."*

## 6. Video section (`#video`)
- New `BeardedManVideoSection.tsx` with Vimeo embed (1114657157 placeholder; note left in code that the stitched cut with 1:10–1:32 of the second source is a manual edit task).
- Anchor card under the video is about **Products in general**, not BA-2080.

## 7. "Where it Reaches" (replaces "Where it Settles" in `HowItWorksSection` / equivalent)
- New header: *"EnviroBiotics reaches and treats where no other product does — soft and delicate surfaces, pet dander, HVAC ducts, sensitive objects."*
- Replace right-hand photo with a soft-toys + PC-keyboard image (generated).
- Add lines: *"Soft objects hold odor-generating bacteria that linger for long durations."* and *"Air circulates between shared spaces easily."*

## 8. "Always on" device block
- Remove the "Always On" sticker; delete "HOW IT WORKS" + "ALWAYS WORKING" labels.
- Layout: BioLogic Mini product photo + sleeping-baby image + single line *"An active, quiet device that protects us 24/7, even when we sleep."*

## 9. Diversification imagery (new section)
- New `DiversificationGallery.tsx`: large rolling gallery (or compact collage) of office, classroom, transit, gym imagery. Generated assets.

## 10. Safety & Certifications (`SafetyStrip.tsx`)
- Header → *"Safe for kids and pets. EPA registered. FDA GRAS."*
- MADE SAFE + Allergy UK badges:
  - Replace placeholder with official-style artwork files (I'll generate clean badge SVG placeholders that preserve the ® symbol on MADE SAFE and a visible certification period on Allergy UK — note that final swap to the certifier-provided artwork is a manual asset drop).
  - Claim copy: *"EnviroBiotics probiotic formula is certified by MADE SAFE and Allergy UK."*
  - Each badge wraps in `<a target="_blank" rel="noopener">` to the certifier profile URLs (placeholder hrefs documented for user to confirm).

## 11. Endorsed globally (`TestimonialsSection.tsx` or new band)
- Add Brooklyn Nets + Care Partners logos (generated text-mark placeholders).
- Mix institutional logos with verified-buyer quote cards.

## 12. FAQ
- Replace question set in `FAQSection.tsx` with the live envirobiotics.com Q&A list (I will scrape via `fetch_website` to get the current list).
- Inject FAQPage JSON-LD via the route `head()` in `src/routes/index.tsx`.

## 13. Closing + Final CTA (`FinalCTASection.tsx`)
- Closing line above CTA: *"Everywhere you live. Everything you touch. Now actively protected."*
- CTA label: **"Build my home protection"**.
- Under CTA: tight 3-icon trio — 30-day trial / Free returns / Backed by warranty.
- Remove the old large hero-shaped 30-day block.

## 14. Product rename + URL change
- Display name everywhere: **E-Biotic Home & Small Office**.
- Slug: `e-biotic-home-and-small-office`. Update `productData.ts` and any hard-coded refs.
- 301 redirect from `/product/e-biotic-home` → `/product/e-biotic-home-and-small-office`. Implemented as a new route `src/routes/product.e-biotic-home.tsx` that returns a permanent redirect (TanStack `redirect({ to, statusCode: 301 })` in `beforeLoad`).
- Meta title on the product page: *"E-Biotic Home and Small Office"*.

## Files to create
- `src/components/ProductsTriadSection.tsx`
- `src/components/BeardedManVideoSection.tsx`
- `src/components/DiversificationGallery.tsx`
- `src/assets/where-it-reaches-soft-toys-keyboard.avif` (generated)
- `src/assets/diversification-office.avif`, `…-classroom.avif`, `…-transit.avif`, `…-gym.avif` (generated)
- `src/assets/badge-made-safe.svg`, `src/assets/badge-allergy-uk.svg` (placeholder official-style)
- `src/assets/baby-sleeping.avif` (if missing) and `src/assets/biologic-mini-device.avif`
- `src/routes/product.e-biotic-home.tsx` (301 redirect)

## Files to edit
- `src/pages/Index.tsx` (section order, remove CertificationsBar, add new sections, anchors `#products` / `#video`)
- `src/components/HeroSection.tsx`
- `src/components/ComparisonSection.tsx`
- `src/components/HowItWorksSection.tsx` (Where it Reaches + Always-on block)
- `src/components/SafetyStrip.tsx`
- `src/components/TestimonialsSection.tsx`
- `src/components/FAQSection.tsx`
- `src/components/FinalCTASection.tsx`
- `src/components/Footer.tsx` (Q&A link already pointed at `#faq` — keep)
- `src/data/productData.ts` (rename + slug)
- `src/routes/index.tsx` (FAQPage JSON-LD)
- Any page/component referencing the old "E-Biotic Home" name or `/e-biotic-home` slug.

## Out of scope / manual follow-ups (will flag to user after build)
- Final stitched video cut (Vimeo 1114657157 + 1:10–1:32 of second source) — embed scaffolded with a TODO.
- Replacing generated MADE SAFE / Allergy UK badges with the certifier's official artwork files.
- Confirming the exact certifier-profile URLs the badges should link to.
- Brooklyn Nets / Care Partners official logo files (I'll use clean text-mark placeholders until provided).

## Verification
After edits, take a full-page screenshot and walk top → bottom against the spec checklist. Fix any drift before handing back.