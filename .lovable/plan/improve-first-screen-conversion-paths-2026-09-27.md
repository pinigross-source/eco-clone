# Improve first-screen conversion paths

## Changes
- Add a tracked BioLogic Mini purchase button, secondary finder action, video text link, trust line, and Parents-campaign sub-headline to the homepage hero.
- Add a tracked BioLogic Mini purchase button and verified-buyer rating line to the pets hero.
- Put BioLogic Mini before Biotica 800 in the wellness hero and product comparison.
- Correct the four nursery purchase details, removing the unused quantity selector and routing purchases through the existing decorated shop-link flow.
- Standardize the mobile sticky purchase bar on `/`, `/pets`, `/parents`, `/wellness`, `/allergy`, and `/dorm`, controlled by whether each hero’s primary shop button is visible.
- Leave blogs, policies, `/go/*`, existing analytics scripts, and existing shop-link decoration unchanged.

## Technical details
- Reuse `TrackedShopLink` with `useOffer().shopUrl("biologic-mini")`; its click handler calls `withVisitorAttribution(...)`, preserving campaign IDs, `lp_page`, and cross-domain linking.
- Use an `IntersectionObserver` tied to each hero primary link instead of fixed scroll distances.
- Keep all changes within the existing page and shared conversion components.

## Verification
- Check all six routes at 375px: hero ordering, personalized homepage copy, sticky appearance/disappearance, and decorated shop destinations.
- Confirm unchanged tracking scripts and a clean preview build.
