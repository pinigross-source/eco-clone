# Add Google "Preferred Source" Button to Content Pages

## Goal
Implement Google's official "Add as a Preferred Source" button so readers can add envirobiotics.com as a preferred source in Google, supporting Top Stories surfacing and AI Overview visibility.

## What we'll build
1. Load Google's official `publisher.js` script globally in the site `<head>` (async).
2. Create a small reusable React component that renders the Google-styled button plus a no-JS fallback deeplink.
3. Place the button on high-trust content pages:
   - **Primary:** Blog post template (`/blog/$slug`) — after the article body, near the share/CTA area.
   - **Secondary:** Research & Science page (`/research`) — after the main research CTA.
   - **Secondary:** Education article template (e.g. `/indoor-microbiome`, `/competitive-exclusion`) — after the FAQ/related guides, before the product CTA.

## Why these pages
Blog posts have the highest-intent readers (people who finished an article) and one template change covers all posts. Research and education pages reinforce E-E-A-T and "source of expertise" positioning, which aligns with AEO goals. Product/checkout pages are intentionally excluded.

## Technical approach
- Add the script tag via TanStack route `head().scripts` in `src/routes/__root.tsx` so it is present on every page.
- Component: `src/components/GooglePreferredSourceButton.tsx`
  - Renders `<div google-add-preferred-source-btn data-theme="light" data-lang="en"></div>`
  - Includes a no-JS fallback link to `https://www.google.com/preferences/source?q=envirobiotics.com`
  - Styled as a contained card so it fits the existing content sections without clashing.
- Insert the component in:
  - `src/pages/BlogPostPage.tsx` — after the in-article CTA, before Related Posts.
  - `src/pages/ResearchPage.tsx` — after the "Need More Information?" CTA, before the contextual product CTA.
  - `src/components/EducationArticle.tsx` — after the FAQ/related guides, before the product CTA.

## Verification
- Confirm the button placeholder renders on a blog post, research page, and one education article.
- Check browser console for CSP or script-load errors (no CSP is currently configured, so no changes needed there).
- Ensure the script is loaded with `async` and does not block rendering.

## Out of scope
- Product/checkout pages.
- Adding a Content Security Policy (not currently in place; if one is added later it will need `news.google.com`, `www.gstatic.com`, and `fonts.gstatic.com`).
