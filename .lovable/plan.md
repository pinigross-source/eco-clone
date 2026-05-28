## Goal

Replace this project's `/` (home) page with the exact homepage from the **EnviroBiotics** project (ID `6239b83b…`), matching the uploaded screenshot: hero → certifications bar → "Where the problem actually lives" → "The places filters can't reach" → stats tiles → "A living system. Working while you do." → Safety strip → Testimonials → FAQ → Footer.

The source project uses the same component file names as this one for many sections, but the **contents are a different version**. Port the source versions wholesale so the page looks identical to the screenshot, without touching any other route (`/bobby`, `/parents`, etc. stay as-is).

## Sections / order to match the screenshot

1. `HeroSection` — "Allergens cause more than allergies." (woman + dog lifestyle image, dark CTA + secondary)
2. `CertificationsBar` — EPA / AllergyUK / ISO / MADE SAFE / Eco Cert badges row
3. `ProblemSection` — "Where the problem actually lives." 3-card comparison (Air filters / Cleaning sprays / EnviroBiotics)
4. `HowItWorksSection` — "The places filters can't reach." 4 image tiles (Soft Surfaces / Pet Dander / Whole-Home / Bacteria & Odor) + Release / Settle / Keep working steps + "A living system. Working while you do." block with 24/7
5. `SafetyStrip` — "Safety-first. Proof-forward." with EPA + FDA GRAS badges
6. `TestimonialsSection` — "What people notice." 4 review cards
7. `FAQSection` + `FinalCTASection`
8. `Footer`

Skipping `FindMySolutionQuiz`, `PersonaTilesSection`, `BlogTeaserSection` since they aren't in the screenshot.

## Files to overwrite (port from source project verbatim)

- `src/pages/Index.tsx` — new section order, swap `react-router-dom`'s `useLocation` for TanStack's, drop the section import names that aren't in the screenshot.
- `src/components/HeroSection.tsx`
- `src/components/ProblemSection.tsx`
- `src/components/HowItWorksSection.tsx`
- `src/components/SafetyStrip.tsx`
- `src/components/SafetySection.tsx` (only if still referenced)
- `src/components/TestimonialsSection.tsx`
- `src/components/FAQSection.tsx`
- `src/components/FinalCTASection.tsx`
- `src/components/Footer.tsx`
- `src/components/Navbar.tsx` (so the header matches the screenshot)
- `src/components/SEOHead.tsx` (only the named exports used by the new Index)
- `src/index.css` / `src/styles.css` — port any new CSS tokens, keyframes (`heroAuraRing`, hero-green palette, `impact-dark-section`, etc.) and utility classes that the ported components rely on. Merge into the existing `src/styles.css` instead of overwriting it.

## New files to create

- `src/components/CertificationsBar.tsx` (doesn't exist here yet)
- Any sub-component under `src/components/hero/`, `src/components/product/`, or `src/data/` that the ported components import and that this project doesn't already have. I'll diff the dependency tree before copying so we don't miss one and break the build.

## Assets

- Copy every image referenced by the ported components from the source project's `src/assets/` into this project's `src/assets/` (hero lifestyle image, the 4 tile images, badge SVGs, etc.). I'll batch these with `cross_project--copy_project_asset` after enumerating imports.

## Stack adaptations (mechanical)

- `react-router-dom` → `@tanstack/react-router`: replace `useLocation`, `Link`, `useNavigate` imports in the ported files. The project already wraps `Link` in `src/lib/link.tsx`; use that where possible.
- Remove any `<BrowserRouter>` / `<Route>` references — routing stays file-based.
- Leave `SEOHead` rendering through TanStack Start's head system. If the source `SEOHead` uses `react-helmet`, swap to the existing pattern used elsewhere in this project (`<head>` config inside the route file). The route file `src/routes/index.tsx` already sets canonical/og; I'll update its `head()` to the new title/description: "Reduce Dust Mites, Pet Dander & Mold Spores | EnviroBiotics".
- Keep `DeferredSection` + `Suspense` lazy-loading pattern (already in both projects).

## What I am NOT changing

- `/bobby`, `/parents`, `/nursery`, `/dorm`, `/pets`, `/sleep`, and every other route stays untouched.
- No backend, Supabase, Shopify, or auth changes.
- No new dependencies expected; if a ported component pulls in something like `lottie-react` that isn't installed yet, I'll add it as the only new dep.
- Not porting the source's `App.tsx`, `main.tsx`, `tailwind.config`, or `index.html` from the handoff doc — this project's TanStack Start shell stays as-is.

## Verification before declaring done

1. Build passes (TS + Vite).
2. `/` matches the uploaded screenshot section-by-section at desktop and mobile.
3. `/bobby` and at least one other landing page still render correctly (no regressions from shared component edits — the shared edits target homepage components only, but I'll spot-check).
