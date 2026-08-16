# Review of the SEO / AEO / GEO task list

I verified each claim against the live site before writing this. Summary: the agency is broadly right, but two of their diagnoses are wrong in a way that changes the work.

## What I confirmed

**3.1 Broken /compare/* pages - real, and I found the exact cause.**
All four pages return HTTP 200 with a ~22 KB shell, no H1, no content. It is not a failing data fetch as the doc assumes. The server render crashes on a one-character bug: each page reads the FAQ list from the wrong position in its schema array (`@graph[1]` is the Article node; the FAQ node is at `[2]`), so `.mainEntity.map` throws and the whole page render aborts. Same bug in all four files. It is a small fix, not a "Medium" effort item.

**3.2 Server-rendered content - half right.**
The doc says body text and headings are client-rendered. That is only true on the four broken comparison pages. Healthy pages (`/`, `/faq`, `/glossary`, `/research`) already return their H1 and full body copy in raw HTML. This site is server-rendered.

The JSON-LD point is correct: zero `application/ld+json` blocks in the initial HTML anywhere. Cause is that schema is injected by a `useEffect` in the shared SEO component. This is fixable properly (no crawler user-agent pre-rendering workaround needed) by emitting schema through the route head instead.

**4.1 Title separators - confirmed.** The About and Contact titles literally contain a double space where a dash was stripped. `/dorm`, `/nursery`, `/health-benefits` have no brand suffix.

**9.3 Sitemap** lists `/shop`, which redirects. Confirmed.

## Where I disagree or want a decision

- **Legal pages to noindex (7):** leave them `index, follow`. No crawl-budget problem on a site this size, and noindexing warranty/privacy can weaken trust signals.
- **Stripping UTMs from internal store links (9.3):** we deliberately added attribution pass-through to the Shopify store so we can measure which landing page drives a sale. Removing it blinds that reporting. Better fix is to keep the parameters and exclude the internal source in analytics.
- **Pricing "$98" vs schema "$400" (9.3):** this is not a bug to fix in code until we confirm which is correct. Needs your call.
- **Named blog authors (8):** the doc asks your opinion. This is a content/legal decision - a named author on health-adjacent content raises the claim-liability bar. Recommend a single reviewed byline (one named person, with a bio page) rather than per-post authors.
- **Everything in Section 9 (store)** is on Shopify, not this site. Product titles, merged Product schema, image alt text, `/collections/all` - none of it can be shipped from here. That work goes to whoever manages the Shopify theme.

## Proposed work, in order

### Phase 1 - Critical (do now)
1. Fix the FAQ index bug in the four comparison pages so they render again; verify each returns a single H1 and full comparison content in raw HTML.
2. Add a render-safety guard so a schema/data shape mistake degrades one section instead of blanking the page.
3. Move JSON-LD into server-rendered HTML site-wide: emit schema via the route head instead of the client-side effect, so every page ships its schema in the initial response.
4. Retire the standalone `/faq` page (see below). FAQ content stays as sections on the individual pages.

### Phase 2 - Schema enrichment
5. `FAQPage` on `/safety`; `DefinedTermSet` on `/glossary`; `Article` markup on `/case-studies` and `/research`.
6. `FAQPage` / `DefinedTerm` across the education cluster pages.

### Phase 3 - Metadata pass
7. Standardise titles to `Primary Keyword | EnviroBiotics`; fix the About and Contact double-space separators; add brand suffix to `/dorm`, `/nursery`, `/health-benefits`.
8. Trim the About description to ~155 chars; expand `/dust-mite-allergens` and `/pet-dander` descriptions toward ~150.
9. Repoint the sitemap `/shop` entry to the store collection URL.

### Phase 4 - Content (larger, separate pass)
10. Lead each education page with a self-contained 40-60 word extractable answer, add primary-source citations, and tighten internal linking into `/how-it-works` and product pages.

## Retiring the /faq page
The page is being pulled to be rewritten later, so it should stop existing as a URL rather than sit live in a weak state.
- Delete the `/faq` route and its page component.
- Remove the `/faq` entry from the sitemap and from `llms.txt`.
- Remove the FAQ link from the search suggestions and from the related-topics link lists that point to it.
- Send `/faq` and `/faqs` to a permanent redirect. There is already a legacy rule mapping both to the homepage FAQ anchor, which the live route was overriding; deleting the route makes that rule take effect, so no new redirect is needed.
- No FAQ schema work on this URL. The per-page FAQ sections keep their own markup.

## Technical notes
- Comparison pages: the FAQ block reads `jsonLd["@graph"][1]`; the FAQPage node sits at index `[2]`. Fix by referencing the node by `@type` rather than by array position, so reordering the graph cannot break the page again.
- SSR schema: schema currently goes through `SEOHead`'s `useEffect`. It should be emitted from each route's `head()` so it is in the HTML stream. `/compare/*` pages additionally render an inline schema script that never shipped because the render crashed first.
- No crawler user-agent pre-rendering is needed; the framework already server-renders.
- `/faq` removal touches `src/routes/faq.tsx`, `src/pages/FAQPage.tsx`, the sitemap route, `public/llms.txt`, `RelatedTopics`, and `NavbarSearch`. `wpRedirects` already covers the redirect.


## Out of scope here
Shopify store changes (Section 9.1, 9.2, store `robots.txt`) and Search Console domain association.
