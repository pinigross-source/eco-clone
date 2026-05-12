
# Prepare the site for launch — without going live

Goal: do all the codebase prep work for the audit so production can be flipped on later with a single env-var change. **Until that flag flips, the test site behaves exactly as it does today** — same banner, same `noindex`, same `/dev-tools`, same `Enviro_test` social previews.

This plan covers only the gating + production-ready defaults. Per-page SEO copy, the real branded OG image, sitemap/robots/canonical, perf, a11y, and analytics are separate audit passes that come after this foundation lands.

## The mechanism: one env flag

New file `src/lib/env.ts`:
```ts
export const isTestEnv =
  import.meta.env.VITE_IS_TEST_ENV !== "false";
```

Default = `true` (test mode). Production-only behavior is opt-in by setting `VITE_IS_TEST_ENV=false` in the production environment. This guarantees nothing changes for you today.

## What gets gated

### 1. `noindex` meta tags (audit 2.1)
In `src/routes/__root.tsx` `head()`, only emit `robots: noindex,nofollow,…` and `googlebot: noindex,nofollow` when `isTestEnv` is true. When false, emit `robots: index, follow`.

### 2. Test environment banner (audit 3.1)
In `RootComponent`, render `<TestEnvironmentBanner />` only when `isTestEnv`.

### 3. `/dev-tools` route (audit 3.2)
In `src/routes/dev-tools.tsx`, throw `notFound()` when `!isTestEnv` so production returns the branded 404 page.

### 4. Title / description / author / OG / Twitter (audit 3.3 – 3.7)
Two parallel sets of root-level metadata in `__root.tsx`:
- **Test (default today):** keeps current `Enviro_test`, "Eco Clone replicates…", `author: Lovable`, `twitter:site: @Lovable`, current R2 preview OG image. Nothing visible changes.
- **Production (when flag is false):**
  - title: `EnviroBiotics — Probiotic air purification`
  - description: real product-level copy (placeholder I'll write, easy to edit later)
  - author: `EnviroBiotics`
  - `twitter:site`: removed (no active handle confirmed yet — safer than wrong)
  - `og:image` / `twitter:image`: `/og-default.jpg` placeholder path. The real 1200×630 branded asset is a separate task; until it's uploaded, production would 404 on this image. We'll ship a temporary committed `public/og-default.jpg` (a simple branded fallback I'll generate) so production never has a broken share preview.

### 5. "Edit with Lovable" badge (audit 3.8)
This is a publish-settings flag, not code. **I will not flip it as part of this prep** — the test site keeps the badge today and you said don't go live. When you're ready to launch I'll call `set_badge_visibility(hide_badge: true)` then. Noted here so it's not forgotten.

## Files touched

```text
src/lib/env.ts              (new)
src/routes/__root.tsx       (conditional meta + conditional banner)
src/routes/dev-tools.tsx    (notFound when !isTestEnv)
public/og-default.jpg       (new — temporary branded fallback)
```

## Out of scope for this prep

- Per-page unique titles & descriptions (audit 4.1, 4.2)
- Final designed 1200×630 OG image
- robots.txt, sitemap.xml, canonical tags (2.2 – 2.4)
- All other audit sections

## How you verify nothing changed

After I implement, the preview at `/` should look identical:
- Yellow "Test environment" banner still at top
- `/dev-tools` still loads
- `view-source:` still shows `noindex, nofollow…`
- Tab title still `Enviro_test`

When you're ready to launch, you (or I) set `VITE_IS_TEST_ENV=false` on the production environment and republish — no further code changes needed for any of the 8 items above.

Approve and I'll implement.
