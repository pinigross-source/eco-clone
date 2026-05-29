The homepage was migrated last turn and already mirrors the reference (hero, certifications bar, "Where the problem actually lives" comparison, "Places filters can't reach" 4-card grid, "A living system / 24/7" with Release-Settle-Keep working steps, Safety-first, testimonials, FAQ, footer). This plan only addresses the visual gaps still visible vs. the screenshot.

## Gaps to close

1. **Hero stat strip** — target shows `4.8★  VERIFIED REVIEWS | EPA REGISTERED | FDA GRAS | SAFE FOR KIDS & PETS` directly under the CTAs; verify spacing/typography matches and the orange star uses the brand orange.

2. **"Where the problem actually lives" cards** — confirm the EnviroBiotics column is visually emphasized (warm tinted background, `Surfaces + air` / `Continuous` highlighted in orange) exactly like the screenshot. Tighten card padding and the small `COVERAGE / DURATION` row to match.

3. **"Places filters can't reach" grid** — match the 4-card photo grid: Soft Surfaces 62%, Pet Dander 24/7, Whole-Home 100%, Bacteria & Odor 48h. Confirm the small bookmark icon in the top-right of each card and the two-line caption beneath each stat.

4. **"A living system" block** — target uses a quieter left visual (small testimonial-style card "EnviroBiotics delivers a uniformly dispersed bacteria into a baby's crib" with a tiny "ALWAYS ON" pill). Re-tune the current baby-image card to that lighter, captioned look and keep the soft green dot + dispersion ring.

5. **Safety-first / Proof-forward** — confirm the section renders the small certification mini-card (UPK Org Salud + FDA GRAS badges) on the right at the size shown, over the warm wood background strip.

6. **"What people notice" testimonials** — match the reference: one featured 5-star quote in a pill card centered at top, then a 3-column row of shorter quotes below. Trim current layout if it differs.

7. **FAQ + Final CTA** — keep on the page (footer Q&A link points to `#faq`). Visually tone down the giant "Questions? Answered." headline to match the lighter, smaller treatment in the reference.

8. **Footer** — already matches structurally; verify column order and the bottom legal row.

## Technical notes

- All work is presentation-only in `src/components/{HeroSection,ProblemSection,HowItWorksSection,SafetyStrip,TestimonialsSection,FAQSection,FinalCTASection}.tsx` and tokens in `src/styles.css`.
- No new routes, no data/auth changes, no new dependencies.
- Keep the `DeferredSection` lazy-loading wrappers in `src/pages/Index.tsx` untouched.
- After edits, re-screenshot the full page in the browser and compare side-by-side with the reference before finishing.
