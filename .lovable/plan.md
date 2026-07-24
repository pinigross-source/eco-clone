## Goal
Host the MSDS PDF at a stable, hard-to-guess URL that opens when someone clicks the link, but is not indexed by search engines and not visible/discoverable to regular site visitors.

## Approach
1. **Upload the PDF to Lovable CDN** using `lovable-assets`. The resulting URL looks like `/__l5e/assets-v1/{uuid}/msds.pdf` — the UUID makes it effectively unguessable, and this path is served outside the app's route tree (no page renders it in nav/sitemap).
2. **Block indexing** via `public/robots.txt`:
   - Add `Disallow: /__l5e/` so crawlers that respect robots skip the CDN asset path.
3. **Do NOT add the link anywhere in the site UI** (no nav, no footer, no sitemap.xml entry). The URL is share-only — you send it to whoever needs it.
4. **Provide the final URL back to you** after upload so you can share it directly.

## What you get
- A permanent link like `https://envirobiotics.com/__l5e/assets-v1/xxxxxxxx-xxxx/msds.pdf`
- Opens the PDF in-browser on click
- Not linked from any page, not in sitemap, disallowed in robots.txt
- Anyone with the exact URL can view it (this is standard "unlisted" behavior — it's not password-protected)

## Notes / limits
- "Unlisted" ≠ private. If someone shares the URL publicly (e.g. posts it on a forum), it becomes reachable to anyone who finds that post. If you need true access control (login, email gate), that's a different setup — say the word and I'll switch approaches.
- Robots.txt is a directive, not enforcement — reputable search engines honor it; scrapers may ignore it. Combined with the unguessable UUID path, real-world exposure is very low.

## What I need from you
Upload the MSDS PDF in your next message. Once you send it, I will:
1. Upload it to the CDN
2. Update `public/robots.txt` to disallow `/__l5e/`
3. Reply with the final shareable link
