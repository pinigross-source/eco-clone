# Clone EnviroBiotics into this project (no Shopify)

## Goal
Recreate the EnviroBiotics site (https://enviro-clean.lovable.app) inside this fresh project, faithful in look, content, and functionality, with no Shopify integration.

Note: I checked the source — it doesn't actually use Shopify. Payments/cart there are Stripe-based. So "no Shopify" is already true; I'll just confirm nothing Shopify-flavored sneaks in.

## Stack reality check
- **Source project**: Vite + React Router DOM + shadcn, pages in `src/pages/`, Supabase integration, ~52 page files, ~40 shared components.
- **This project**: TanStack Start (file-based routing in `src/routes/`), no Supabase yet.

Because of the routing/SSR difference, this is a **port**, not a file copy. Every page becomes a TanStack route file; `<Link>` / `useNavigate` / `useParams` get swapped to `@tanstack/react-router` equivalents; each route gets its own `head()` for SEO.

## Scope (what gets cloned)

### Public marketing pages (port 1:1)
Home, About, How It Works, HVAC, HVAC Applications, Health Benefits, Mold & Allergens, Safety, Probiotic Air Purification, Competitive Exclusion, Solutions, Room Solutions, Product Use Cases, Education, Research, Proof & Trust, Case Studies (+ detail), Blog (+ post), FAQ, Glossary, Videos, Contact, Support, Warranty, Privacy, Terms, Sitemap, 404, plus comparison pages (Bio Healing, Chemical Fresheners, HEPA, UVC), landing pages (Dorm, Nursery, Better Air Rebrand), and the Find My Solution / Product Finder quizzes.

### Shop / commerce pages
Shop, Product Detail, Subscription, Pro Subscription, Payment Success, Manage Subscription, Order History, Product Registration. Cart/checkout via Stripe (the source's existing flow). **No Shopify.**

### Account & auth
Auth (sign in/up), Account, Affiliate Signup, Affiliate Dashboard, Affiliate Redirect, Admin Dashboard.

### Shared UI
Navbar, Footer, Hero, all section components, FAQ, comparison table, quizzes, sticky mobile CTA, scroll-to-top, SEO head helper, accessibility toggle, contact form dialog, etc.

### Assets
Copy `src/assets/` (images, etc.) and any `public/` brand assets from the source.

### Backend
Enable Lovable Cloud and recreate the Supabase schema the source uses (products, orders, subscriptions, affiliates, blog posts, profiles + roles, etc.). Port edge functions used for Stripe checkout, subscription management, affiliate tracking, email, etc.

## Explicitly excluded
- Anything Shopify (none exists in source anyway).
- The `public/temp-visits.csv` analytics dump.

## Approach / order of work
1. Enable Lovable Cloud; pull schema + edge functions list from source and recreate.
2. Copy `src/assets/` and `src/data/` from source.
3. Port shared components (`Navbar`, `Footer`, hero, sections, UI primitives) — fix imports to `@tanstack/react-router`.
4. Port pages in batches as TanStack route files under `src/routes/` (flat dot-naming, e.g. `case-studies.$slug.tsx`, `blog.$slug.tsx`, `compare.hepa.tsx`, `aff.$id.tsx`). Each route gets its own `head()` with title/description/og.
5. Wire Stripe checkout + webhooks under `src/routes/api/`.
6. Replace placeholder `src/routes/index.tsx` with the real homepage.
7. QA pass: navigation, SEO tags, auth flows, checkout in test mode.

## Technical notes
- Routing: `BrowserRouter` → TanStack file routes; `useNavigate` → `useNavigate()` from `@tanstack/react-router`; `useParams` → `Route.useParams()`; `<Link to>` syntax mostly compatible but dynamic segments use `params={{ }}`.
- SEO: source uses a `<SEOHead>` component; in TanStack we use route `head()` instead — port titles/descriptions/og per page.
- Supabase: source imports from `@/integrations/supabase/client`. After enabling Cloud, this project's generated client replaces it.
- Stripe: edge functions ported as TanStack server routes under `src/routes/api/` (webhooks under `/api/public/` with signature verification).

## Heads-up on size
This is a large port (~50 pages + backend). It will run over many turns. I'll work in batches and check in after each major batch (shared components → marketing pages → shop → auth/account → backend wiring) so you can review progressively.
