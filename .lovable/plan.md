# Home Page Design-Review Fixes (Top 4)

Scope: `src/components/HeroSection.tsx`, `src/components/ProblemSection.tsx`, and a new tagline band on the home page (`src/pages/Index.tsx`). No business logic changes — copy + layout only.

## 1. Rewrite hero headline + force line breaks (Must Fix #1)

File: `src/components/HeroSection.tsx` (lines 122–127)

- Replace the abstract triplet "Every surface. / Every space. / Always clean." with concrete-noun copy:
  - "The dust."
  - "The mold."
  - "The smell that won't leave."
- Force each clause onto its own line at every breakpoint by giving each clause its own `<span className="block">` and removing the `sm:inline` toggles. This guarantees the triplet rhythm holds on tablet (where it currently wraps as "Every surface. Every / space. / Always clean.").
- Keep current font sizing, color tokens, and text-shadow.

## 2. Surface the 30-day trial above the fold (Must Fix #2)

File: `src/components/HeroSection.tsx` (just under the CTA row, ~line 166)

- Add a small reassurance line directly under the two hero buttons:
  - "30-day trial · No commitment · Free returns"
- Style: small caps or `text-xs/sm font-medium`, same `primary-foreground` color with a subtle text-shadow so it stays legible on the video background. Left-aligned, matching the headline column.
- Keep the deeper `GuaranteeSection` intact — this is a top-of-page signal, not a replacement.

## 3. Delete the early two-card comparison (Must Fix #3)

File: `src/components/ProblemSection.tsx`

- Remove the two-card comparison block (lines 33–73: "Air Purifiers" card vs "EnviroBiotics" card).
- Keep the section header ("Other solutions stop at the air. Ours goes further.") and the "high-touch surfaces" 4-image grid below it. Adjust the top margin on the surfaces grid (currently `mt-20 lg:mt-28`) so spacing reads correctly without the cards above it.
- The three-card `ComparisonSection` and the "A living system" explainer in `HowItWorksSection` continue to carry the argument.

## 4. Promote the tagline as its own band (Top 4 #4)

The line "No chemicals · No ozone · Just beneficial biology" does not currently exist on the page. Add it as a slim full-width band.

- New lightweight component `src/components/TaglineBand.tsx`:
  - Single centered line: "No chemicals · No ozone · Just beneficial biology."
  - Display font, large but not headline-scale (`text-2xl sm:text-3xl lg:text-4xl`), tight tracking, `text-foreground` on `bg-card` (or inverted on `bg-foreground` / `text-primary-foreground` — TBD during build, matching adjacent sections).
  - Vertical padding `py-14 sm:py-20`, no other chrome.
- Mount in `src/pages/Index.tsx` between `HeroSection` and `ShiftSection` so it acts as a value-prop bridge from the hero into the argument.

## Out of scope

- Should Fix and Could Improve items from the review (not included in the message).
- Hero video content, FAQ states, carousel transitions, reduced-motion behavior.
- Any backend / data / link changes.

## Verification

- After edits, view the home page at desktop (1329px), tablet (~820px), and mobile (~390px) and confirm: headline triplet holds at all three breakpoints, trial line is visible without scrolling, only one comparison block remains in the upper half of the page, tagline band reads clearly above `ShiftSection`.
