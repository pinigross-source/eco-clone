# Mobile-only homepage hero update

## Goal
Apply the uploaded 4:3 lifestyle-video format to the live homepage at `/` on mobile only. Keep the current tablet and desktop hero, all following homepage sections, commerce links, and site-wide behavior unchanged.

## What will change
- Add a dedicated mobile hero directly below the existing site header, active only below the mobile breakpoint.
- Use the uploaded mother, daughter, dog, and BioLogic Mini poster as the immediate hero image, with the uploaded silent WebM/MP4 loop fading in only after it can play.
- Use the exact supplied mobile copy and order: `BEYOND AIR FILTRATION`, `You take probiotics. Your home doesn’t.`, supporting text, offer panel, full-width `Choose my room kit` action, and centered `How it works ↓` link.
- Link the primary action to the existing product-selection section and the secondary action to the existing how-it-works section, preserving current tracking and Shopify attribution behavior.
- Keep the current tablet/desktop hero markup and appearance intact.

## Performance and accessibility
- Host all four uploaded media files through the project asset system.
- Reserve a fixed 4:3 media area to prevent layout movement; preload the mobile poster only for mobile while retaining the existing desktop poster preload for larger screens.
- Do not request video files for reduced-motion users, data-saver users, or 2G/slow-2G connections; retain the complete poster experience when autoplay is blocked on iOS.
- Keep the video silent, decorative, control-free, and hidden from assistive technology; retain visible keyboard focus and at least 44px touch targets.

## Technical details
- Add a focused mobile hero component and scoped mobile-only styles rather than replacing the desktop hero.
- Prevent the existing desktop background video from downloading on mobile while preserving its current desktop sources and poster.
- Track the mobile primary action as `homepage_cta_click` with `placement: "hero"`; do not add experiment-assignment or purchase events.
- Update the homepage image preload declarations with non-overlapping mobile and tablet/desktop media conditions.

## Verification
- Validate types and the automatic build result.
- Browser-check the homepage at 320, 360, 390, and 430px for overflow, readable copy, full-width controls, stable poster-to-video transition, and correct anchor navigation.
- Check reduced-motion and a simulated slow/data-saving connection to confirm that only the poster loads.
- Compare tablet and desktop screenshots against the current hero to confirm they remain unchanged.
- Verify the current review route and all sections below the homepage hero are unaffected.
