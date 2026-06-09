# Two-Phase Plan: Errors, then CTAs

## Phase 1 — Fix Runtime Errors

### 1a. `window.webkit.messageHandlers` undefined
Likely a tracking/analytics call (Clarity, Reddit pixel, or a native bridge) that assumes an iOS WebView. Guard all access behind a feature check:
```ts
if (typeof window !== 'undefined' && window.webkit?.messageHandlers?.<name>) { ... }
```
Audit `src/lib/reddit-pixel.ts`, `src/lib/fb-pixel.ts`, `src/lib/tracking.ts`, and any Clarity snippet for unguarded `window.webkit` usage.

### 1b. ResizeObserver loop warning
Benign, but noisy. Two fixes:
- Wrap the inner work of any custom ResizeObserver callback in `requestAnimationFrame(...)` to defer layout reads.
- Silence the specific warning in `src/main` boot via a global handler so it stops poisoning the error overlay/Clarity.
Likely sources: the sticky CTA `IntersectionObserver` neighborhood, Framer Motion `AnimatePresence`, or shadcn components using `react-resize-detector`.

### 1c. React hydration mismatch (homepage, Firefox)
Audit `src/pages/HomePage.tsx`, `HeroSection`, and `MicroscopicWorldSection` for:
- `Date.now()` / `Math.random()` / `new Date()` rendered directly in JSX
- `useIsMobile()` or `window`/`navigator` reads during render (not in effects)
- `localStorage`-driven conditional markup pre-effect
Wrap browser-only branches in a `useEffect`+`useState(false→true)` mount gate, or use `<ClientOnly>` for the offending island.

### 1d. /allergy and /pets page errors
Read `src/pages/AllergyLandingPage.tsx` and `src/pages/PetsLandingPage.tsx` plus their route files, capture the actual stack via `read_runtime_errors`, and fix the root cause (likely the same webkit/hydration patterns above).

**Verification:** load `/`, `/allergy`, `/pets` in preview (desktop + mobile viewport), check console clean.

---

## Phase 2 — Drive Engagement to Conversion CTAs

Scope: presentational/UX changes only (no business logic). Targets are the primary CTAs on home, `/allergy`, `/pets`, and product pages.

### 2a. Visibility & placement
- Add a persistent sticky mobile CTA on homepage and landing pages (re-use `StickyMobileCTA` / `StickyProductCTA` patterns already in repo).
- Move the primary "Shop / Find my solution" CTA above the fold in `HeroSection` with stronger contrast.
- Add a secondary in-content CTA after `TestimonialsSection` ("Join 5000+ homes — Shop now").

### 2b. Copy & hierarchy
- Replace generic verbs ("Learn more", "Explore") on primary CTAs with outcome-led copy ("Get cleaner air", "Start risk-free", "See my solution").
- Demote secondary links to text/ghost variants so the primary CTA stands alone visually.

### 2c. Micro-conversion nudges
- Add a small trust line under each primary CTA: "30-day guarantee · Free shipping · 5000+ homes".
- Add subtle motion (pulse/scale-on-view) only on the hero CTA, respecting `prefers-reduced-motion`.

### 2d. Friction reduction
- Ensure `FindMySolutionQuiz` entry point is visible from hero on mobile.
- Make the navbar Shop button a filled button (not a text link) on mobile.

### 2e. Measurement
- Fire `trackEvent('cta_click', { location, label })` via existing `src/lib/tracking.ts` on every primary CTA so Clarity/GTM can segment.
- Add `data-cta="<id>"` attributes so Clarity heatmaps can group clicks.

**Verification:** browser preview at mobile + desktop viewports; confirm CTAs visible above fold, sticky bar appears after scroll, no console errors.

---

## Technical Notes
- No schema/auth changes.
- No new dependencies.
- Files likely touched: `src/lib/reddit-pixel.ts`, `src/lib/tracking.ts`, `src/components/HeroSection.tsx`, `src/components/StickyMobileCTA.tsx`, `src/components/Navbar.tsx`, `src/components/FinalCTASection.tsx`, `src/pages/HomePage.tsx`, `src/pages/AllergyLandingPage.tsx`, `src/pages/PetsLandingPage.tsx`, `src/routes/__root.tsx` (ResizeObserver silencer).

## Suggested Order
1. Pull real stacks via `read_runtime_errors` for `/allergy`, `/pets`, homepage.
2. Patch webkit/hydration/ResizeObserver (Phase 1).
3. Verify clean console.
4. Ship CTA changes (Phase 2) in one pass.
5. Verify in preview, then publish.
