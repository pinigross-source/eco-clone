# Mobile homepage review route

## Goal
Create an isolated, polished `/mobile-home-preview` experience for review without changing `/`, publishing, or altering commerce settings.

## What will be built
- Add a dedicated review route with unique metadata, `noindex,nofollow`, and a self-referencing canonical.
- Build an isolated mobile-first page using the existing EnviroBiotics logo and original Mini/Biotica product photography.
- Create a compact header and opening screen that shows the product, required copy, price, and both actions quickly on mobile.
- Add the requested mechanism, two-kit selection, environmental-probiotics explanation, refill guidance, accessible FAQ, final action, support link, and footer.
- Add an on-demand Vimeo dialog that loads only after interaction.
- Add a mobile sticky action that appears after the opening action leaves view and hides near product/final actions or while the dialog is open.
- Keep Tidio collapsed and move it away from the sticky action only on this preview route.
- Track only `homepage_cta_click`, `kit_select`, and `demo_open`, marked as preview interactions.

## Technical details
- New route file and dedicated page/component files; route-specific styling will be scoped under a preview-page class.
- Use direct same-tab Shopify product links so the existing global attribution decorator remains authoritative.
- Centralize the reviewed price snapshot with its review date and a production-sync TODO.
- Use static product images with explicit dimensions, no mobile autoplay video, no delayed text reveal, and reduced-motion support.
- Preserve the current homepage and shared site behavior.

## Verification
- Validate types and the automatic build result.
- Browser-check metadata, anchors, FAQ, modal open/close and keyboard focus, sticky behavior, exact product links, and image rendering.
- Check 320, 360, 390, and 430px mobile widths plus tablet and desktop for overflow and cropping.
- Confirm the main CTA is visible in a 390×844 opening viewport and `/` remains unchanged.
