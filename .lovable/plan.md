Replace the hero image for the "EnviroBiotics BA-2080 Review: 6 Months of Real-World Testing" blog post with the uploaded AVIF.

Steps:
1. Copy `user-uploads://AiStudio_40402.avif` → `src/assets/blog/ba-2080-review-6-months.avif`.
2. Delete the old `src/assets/blog/ba-2080-review-6-months.jpg`.
3. In `src/data/blogData.ts`, update the import for the `ba-2080-review-6-months` post to point at the new `.avif` file (same variable name, just new extension).

No other posts, components, or OG metadata change. AVIF is supported by Vite and all modern browsers used by the site.