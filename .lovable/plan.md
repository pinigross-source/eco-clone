# Plan: Close Remaining SEO Gaps

D-02 resolved (Option A — current `/compare/*` routes are correct, canonicals already self-referential, no code change). Remaining work:

## 1. D-05 — Real 301 for `/product/betterair-2080/`

Today `src/lib/shopify.ts` silently rewrites `betterair-2080 → ba-2080` at fetch time, so both URLs render the same product. Search engines see duplicates.

**Action:**
- In `src/routes/product.$slug.tsx`, add a `beforeLoad` that throws `redirect({ to: "/product/$slug", params: { slug: "ba-2080" }, statusCode: 301 })` when `params.slug === "betterair-2080"`.
- Grep the codebase for `betterair-2080` in internal links and update them to `ba-2080`.

## 2. D-11 — Convert remaining blog images to AVIF

Three hero images are AVIF; the rest are `.jpg`.

**Action:**
- List all `.jpg` in `src/assets/blog/`.
- Convert each to AVIF via `nix run nixpkgs#imagemagick -- convert ... .avif` (quality ~50).
- Update the matching imports in `src/data/blogData.ts`.
- Delete the old `.jpg` files.

## 3. D-10 — Author bios + Person schema

No `/author/...` routes exist; blog Article JSON-LD references author name as a string only.

**Action:**
- Create `src/data/authorsData.ts` with `{ slug, name, bio, photo, credentials, social[] }` for every author named in `blogData.ts`.
- Create dynamic route `src/routes/author.$slug.tsx`:
  - Loader resolves author by slug (404 if missing).
  - Head emits `Person` JSON-LD (name, url, image, jobTitle, sameAs) + canonical + og tags.
  - Component renders bio, photo, credentials, and a list of that author's posts.
- Update `src/pages/BlogPostPage.tsx`:
  - Show a visible byline linking to `/author/{slug}`.
  - Upgrade Article JSON-LD `author` from string to a `Person` object with `@id: "https://envirobiotics.com/author/{slug}#person"`.
- Add `/author/{slug}` entries to `src/routes/sitemap[.]xml.tsx` ENTRIES list.

## Order

1. D-05 (smallest, isolated).
2. D-11 (mechanical batch).
3. D-10 (largest — new data file, new route, blog page edit, sitemap edit).

## Out of scope

- D-04 disavow (not code).
- D-12/D-13 caching headers (hosting-level, Lovable handles).

Ready to implement on approval.