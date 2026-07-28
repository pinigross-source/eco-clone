## Goal

92% of last-week conversions came from mobile. Reduce dead clicks, quick backs, and CTA friction on the three top converting pages: `/support`, `/allergy`, `/hvac`. Frontend / presentation only — no business logic changes.

## Diagnostic pass (first)

Before editing, verify the actual dead-click and quick-back hot spots so fixes hit the real culprits, not guesses:

1. Load each page in Playwright at 390×844 (mobile) and 768×1024 (tablet).
2. Capture: full-height screenshots, DOM audit of every element with `onClick` / `role="button"` / `<a>` — flag any with tap target < 44×44 px, missing `href`, `cursor: default`, or `pointer-events: none`.
3. Capture console + network errors on `/allergy` (3 JS errors reported) and record HVAC LCP / total blocking time.
4. Save findings to `/tmp/browser/mobile-audit/report.md` and drive the rest of the plan from it.

## Fixes by page

### /support (SupportPage.tsx)
- Primary hero CTA `Contact Support` currently only scrolls to `#contact-form` via hash href — on mobile the sticky header can eat the anchor. Add scroll-margin-top to `#contact-form` and confirm smooth scroll works from the hero button.
- Support option cards: the whole card should be tappable on mobile (currently only the small outline button is). Wrap card in a link OR enlarge the button to full-width on `sm:` and below.
- PDF/Video rows: the small 40×40 Share icon buttons sit next to a large link — likely dead-click source when thumbs hit the icon area expecting the main action. Increase share button hit area to 44×44 with spacing, or hide share on mobile behind a "…" menu.
- Video modal close button: verify 44px tap target.

### /allergy (AllergyLandingPage.tsx)
- Fix the 3 JS errors surfaced in the diagnostic pass (root cause first; likely a missing asset / undefined handler based on the Script-error report earlier).
- Above-the-fold: ensure a single, high-contrast primary CTA is visible without scrolling on 390px width. Quick-backs at 11 suggest users bounce before finding the CTA.
- Sticky bottom CTA: confirm `StickyMobileCTA` isn't hidden behind the page's own CTAs (avg scroll depth only 41% — users don't reach the footer CTA). Consider showing the sticky CTA earlier (scrollY > 200 instead of 400) on this landing page.
- Reviews section swipe: verify tap targets on carousel dots/arrows are ≥44px.

### /hvac (HVACPage.tsx)
- **Performance (4.77s load):**
  - Add `loading="lazy"` + `decoding="async"` to every non-hero image.
  - Preload the hero image via `head().links` in `src/routes/hvac.tsx` (currently only has canonical).
  - Convert large PNG/JPG hero to AVIF if not already.
  - Defer any below-the-fold heavy sections with `DeferredSection` (pattern used on `HomePage.tsx`).
- **Dead clicks (10):** audit any `<div onClick>` and convert to `<button>` / `<Link>`; ensure the primary "Request installation quote" CTA is a real submit-driving button, not a wrapper.
- Quote form: verify mobile input types (`type="tel"`, `inputMode="numeric"` on zip, `autoComplete` hints) so the mobile keyboard is correct.

### Cross-page mobile CTA polish
- Enforce min 44×44 tap targets on all primary buttons (Tailwind `min-h-11`).
- Ensure sticky CTAs never overlap page CTAs (add `pb-24 md:pb-0` where missing).
- Standardize primary button style so the mobile conversion button reads the same on all three pages.

## Verification

After edits, re-run the Playwright audit at mobile + tablet:
- Screenshots of the hero + primary CTA on each page.
- Confirm 0 console errors on `/allergy`.
- Confirm HVAC hero image is preloaded (network waterfall) and LCP < 2.5s in a local Lighthouse-style check.
- Confirm every primary CTA has `getBoundingClientRect()` ≥ 44px in both dimensions.

## Out of scope

- No backend, tracking, or pricing changes.
- No copy rewrites beyond CTA label clarity where a dead-click points to ambiguous wording.
- No new pages or routes.
