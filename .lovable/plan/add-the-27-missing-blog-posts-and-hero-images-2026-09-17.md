# Add the 27 missing blog posts and hero images

## Content import
- Add all 27 supplied articles to the existing EnviroBiotics blog, keeping their provided slugs, titles, descriptions, categories, authors, dates, reading times, keywords, quick answers, key takeaways, FAQs, and related-reading links.
- Preserve the current blog index and article-page visual design rather than creating a second blog system.
- List the new posts in scheduled publish-date order while retaining every existing post.

## Article presentation
- Extend the current article renderer only where the supplied posts require it: numbered and bulleted lists, comparison tables, headings, links, emphasis, quotes, and in-article calls to action.
- Use the authored quick answers, key takeaways, FAQs, and related posts instead of guessing them from paragraph text.
- Make wide tables usable on phones without changing the surrounding page design.

## Hero images
- Generate one unique 1200×630 hero image for each missing article, using its exact prompt and alt text from the uploaded package.
- Use a consistent bright, calm editorial style across the set, with the specified mix of lifestyle photography and clean illustrations.
- Keep every image free of text, logos, brand names, watermarks, and visible product labels as requested.
- Optimize and connect all 27 images to their matching posts, then inspect the full set for subject accuracy, artifacts, and cropping.

## Search and sharing details
- Use each article's supplied title and description for its page metadata.
- Add the article's real publication date to its structured information and preserve FAQ structured information.
- Keep each article self-canonical and allow the existing sitemap generator to include all 27 new URLs automatically.
- Preserve internal links and validate every article, product, and related-reading destination.

## Supplied editorial fixes
- Retire the existing BA-2080 review in favor of the new Biotica 800 review, including a permanent redirect and removal from listings and the sitemap.
- Correct the existing E-Biotic Pro links and replace the outdated Lowe's availability claim with the supplied certified-dealer wording.
- Keep the product naming and verified facts from the reviewed package, including “BioLogic Mini Gen 2” and Nighttime Mode references.

## Validation
- Check all 27 article pages plus the blog index at desktop and mobile sizes.
- Verify headings, tables, links, images, alt text, FAQs, related posts, metadata, structured information, sitemap inclusion, and the retired-post redirect.
- Confirm the preview builds cleanly. Keep all changes unpublished.

## Technical details
- Extend the existing `BlogPost` model and renderer rather than adding runtime markdown parsing.
- Convert the supplied markdown and frontmatter into typed article records during implementation.
- Store generated image assets through the project's existing asset flow and reference them from the article data.
