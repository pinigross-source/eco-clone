## Goal

Make every card and listed guide on `/education` link to a real, content-complete page. Remove all "Coming soon" states. Replace the dark "Choose your path" section background with a light treatment to match the rest of the page.

## Route mapping

Existing routes reused as-is:

| Card | Route |
|---|---|
| What Is Probiotic Air Purification? | `/probiotic-air-purification` |
| How to Reduce Mold and Allergens Naturally | `/mold-and-allergens` |
| How EnviroBiotics Works | `/how-it-works` |
| The Science of Competitive Exclusion | `/competitive-exclusion` |
| Product Testing and Safety | `/safety` |

New route files to create under `src/routes/`:

| Card | New route |
|---|---|
| What Is the Indoor Microbiome? | `/indoor-microbiome` |
| The Hygiene Hypothesis Explained | `/hygiene-hypothesis` |
| Dust Mite Allergens | `/dust-mite-allergens` |
| Mold Indoors | `/mold-indoors` |
| Pet Dander | `/pet-dander` |
| Understanding FDA GRAS Status | `/fda-gras-status` |
| Probiotic vs. Chemical Disinfection | `/probiotic-vs-chemical` |

## New page template

All new pages share one component shell (`src/components/EducationArticle.tsx`) with:

- `Navbar` + `Footer`
- `SEOHead` with route-specific title/description and `BreadcrumbJsonLd` (Home → Education Center → Article)
- Hero (eyebrow "Education Center · {category}", H1, lede)
- Body sections (intro, key concepts, "Why it matters at home", "How EnviroBiotics helps", short FAQ)
- `RelatedTopics` block at the bottom
- `ContentProductCTA` closer
- All on `bg-background` with light section alternation (`bg-background` / `bg-muted/40`) — no dark backgrounds

Content for each new page will be written from the source doc material already on the Education page (microbiome, hygiene hypothesis, dust mites Der p1/Der f1, mold sources, Fel d1/Can f1, GRAS framework, chemical vs probiotic comparison) — expanded into 600-900 words per page with the same voice and citations style as the existing guides.

## Education page changes (`src/pages/EducationPage.tsx`)

1. Remove the `comingSoon` prop entirely from `GuideCard` and from every card invocation. Update each card's `to` to its mapped route above.
2. Convert the "Choose your path" section from `bg-foreground text-background` to a light treatment: `bg-muted/40` background with `border` cards on `bg-card`, primary-tinted icon chips, foreground text. Keep the same layout and copy.
3. In each "path" object, change `guides: string[]` → `guides: { label, to }[]` so every bullet is a `<Link>` to its mapped route. Render bullets as inline links with hover underline + arrow.
4. Keep all other sections, hero, allergens table, FAQ, and bottom CTA unchanged.

## Out of scope

- No changes to `Footer`, `Navbar`, or `RelatedTopics`.
- No content changes to existing routes (`/probiotic-air-purification`, `/how-it-works`, `/mold-and-allergens`, `/competitive-exclusion`, `/safety`) — only linked to.
- No removal of the `?preview=1` access gate (still relevant until launch).
