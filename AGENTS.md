# Architecture rules

- The how-it-works explainer uses page-scoped visual tokens, a poster-first viewport-gated video component and a browser-safe product/FAQ data module; this isolates the presentation, supports reduced motion and keeps display rules testable without modifying shared commerce or tracking.

- Business facility quotes share a browser-safe Zod schema and use the installation-quote endpoint's business branch with anonymous insert-only RLS access; this keeps validation aligned without privileged public writes or altering existing installation requests.
- Business-only visual overrides live under the business-page scope; this preserves other pages when changing facility presentation.
- Shared venue logos accept optional heading and closing-text controls with unchanged defaults; this allows reuse without redesigning the homepage.
- Host-specific rules (CORS for /api/public/*, noindex on the app subdomain, per-host robots.txt) live in src/lib/hosts.ts and are applied in the src/server.ts wrapper; this keeps one app working on both the root domain and the app subdomain during the Shopify move.
