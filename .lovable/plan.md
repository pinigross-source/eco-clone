# Audit: making app.envirobiotics.com staff-only plus ad landing pages

Audit only. No code was changed. Items marked "unverified" need a check before anyone acts on them.

## Key findings first
- **Staff sign-in is broken by design today.** `/admin` (src/routes/admin.tsx) and `/link-check` send signed-out users to `/auth`, but `/auth` (src/routes/auth.tsx) now immediately redirects to the Shopify customer account. Staff can only get into admin if they already have a session.
- **Every Shopify link in the app points to `https://shop.envirobiotics.com`** (src/lib/shopify.ts line 8, `shopifyAccount()` line 108), not `https://envirobiotics.com`. If the store is now on the root domain, every buy, account and checkout link needs to change origin, or shop. needs to keep redirecting to it.
- Tidio chat loads on **every** page, including /go, /lp and /beyond-bleach (src/routes/__root.tsx line 326).
- `/go/pets` (the pets landing page) has an email form that saves customer emails and sends a customer email.

## 1. Customer sign-in and account

| Route / file | What it does now | Can non-staff open it? |
|---|---|---|
| /auth (routes/auth.tsx) | Redirects to the Shopify account page | Yes (redirect only) |
| /account, /orders, /order-history, /subscription, /subscribe, /manage-subscription, /pro-subscription, /cart, /checkout, /shop | Redirect to Shopify (shop.) | Yes (redirect only) |
| /affiliate-signup, /affiliate-dashboard | Redirect to GoAffPro | Yes (redirect only) |
| /aff/$id, /prosub, /prosub/aff/$id | Redirect to affiliate URLs on shop. | Yes |
| src/pages/AuthPage.tsx, AccountPage.tsx, AffiliateSignupPage.tsx, AffiliateDashboardPage.tsx, components/account/ChangePasswordSection.tsx | Old sign-in/account/affiliate screens with sign-in code. No route uses them anymore (only AuthPage still imports ClaimAccountModal) | No (unused code) |
| components/auth/ClaimAccountModal.tsx | Password reset through `send-password-reset` with a stale lovable.app address | No (only via unused AuthPage) |
| components/Navbar.tsx line 290 | "Account" link to /account (then Shopify) | Yes, wherever the menu shows |
| hooks/useEntitlement.ts | Calls `check-entitlement` for signed-in users | Only with a session |
| /payment-success | Old payment confirmation page | Yes, shows a page |

## 2. Forms and widgets that collect customer data

| Form | Saves to / sends to | Where it appears |
|---|---|---|
| Pets email offer (PetsLandingPage.tsx l.193) | /api/public/pets-offer, then emails the customer | **/go/pets**, /pets |
| Tidio chat (components/TidioChat.tsx) | Tidio | **Every page incl. /go, /lp, /beyond-bleach** |
| ContactFormDialog | `contact_inquiries` table + `send-contact-email` function | /contact, /research, /case-studies/$slug, /hvac |
| Support form (SupportPage.tsx l.168) | `send-contact-email` function | /support |
| HVAC page form (HVACPage.tsx l.183) | `contact_inquiries` + `send-contact-email` | /hvac |
| InstallationQuoteForm | /api/public/installation-quote | /hvac |
| BusinessQuoteForm | /api/public/installation-quote (business) | /business |
| Spa quote (SpaWellnessPage.tsx l.142) | /api/public/installation-quote | /spa-wellness |
| Refill request (routes/ebiotic-pro-refill.tsx) | /api/public/refill-request, emails staff | /ebiotic-pro-refill |
| Product registration (routes/product-registration.tsx) | `product_registrations` table, newsletter opt-in | /product-registration |
| Coming-soon signup | /api/public/coming-soon, emails contact@ | Caller not found in pages (unverified) |
| Attribution beacon | /api/public/track-visit | Every page (tracking, not a form) |
| Upsell analytics, Reddit tracking | `upsell_analytics`, `reddit-capi` | Shop flows (tracking) |
| Exit-intent / newsletter popups | None found | n/a |

On /lp/* and /beyond-bleach, no form was found other than Tidio. On /go/*, only /go/pets has the email form.

## 3. Old marketing pages still served by this app
None of these redirect. Each one shows the full old page on app.envirobiotics.com (with noindex):

/, /about, /active-families, /allergy, /betterair-rebrand, /blog, /blog/$slug, /bobby, /business, /case-studies(/$slug), /clarity, /compare/* (6), /competitive-exclusion, /contact, /dorm, /dust-mite-allergens, /ebiotic-pro-refill, /education, /embed, /fda-gras-status, /glossary, /health-benefits, /how-it-works, /hvac, /hvac-applications, /hygiene-hypothesis, /indoor-microbiome, /mobile-home-preview, /mold-and-allergens, /mold-indoors, /nursery, /parents, /payment-success, /pet-dander, /pets, /privacy, /probiotic-air-purification, /probiotic-vs-chemical, /product/$slug, /product-registration, /product-use-cases, /proof-and-trust, /research, /safety, /sleep, /solutions, /solutions/room, /spa-wellness, /support, /terms, /videos, /warranty-policy, /wellness, plus /dev-tools.

Unknown paths: the catch-all (routes/$.tsx) applies old WordPress redirects, otherwise shows a 404 page. sitemap.xml still lists marketing pages.

## 4. Emails sent to customers

| Email | Sent by | Links point to |
|---|---|---|
| Pets 15% offer | api/public/pets-offer.ts l.40 | `https://envirobiotics.com/go/pets` (this now lands on Shopify, where /go/pets likely does not exist: broken) |
| Contact confirmation (if any) | `send-contact-email` function | Source not in the project (unverified) |
| Password reset / signup | `send-password-reset`, `custom-signup`, auth emails | Old lovable.app address / auth Site URL |
| Shipping notification | `send-shipping-notification` (staff-triggered from admin) | Source not in the project (unverified) |
| Refill, coming-soon, quotes | api routes | Go to staff only |

## 5. Links that send customers to app pages instead of Shopify

| Where | Link |
|---|---|
| Navbar.tsx l.290 | /account |
| Footer.tsx l.198, 228 | /contact |
| Footer.tsx l.202 | /support |
| Admin AffiliateManagementSection.tsx | app.envirobiotics.com/aff/{n} (staff copy links) |
| Many marketing pages | /business#quote, /how-it-works, /research, /product/$slug, /hvac, etc. (internal links) |
| src/lib/shopify.ts | All Shopify links use shop.envirobiotics.com |

## 6. Public endpoints that accept data from browsers

| Endpoint | Used by | Notes |
|---|---|---|
| /api/public/pets-offer | /go/pets form | Saves email, sends customer email |
| /api/public/installation-quote | Business, spa, HVAC quotes | Saves to contact_inquiries, emails staff |
| /api/public/refill-request | Refill page | Emails staff |
| /api/public/coming-soon | Unknown caller | Emails staff |
| /api/public/track-visit | Attribution beacon | Keep (ad tracking) |
| Direct table writes from the browser | contact_inquiries, product_registrations, upsell_analytics | Allowed by database rules for anonymous visitors |

Webhooks/cron to keep: shopify-order, resend-webhook, meta-ads-sync.

## Recommended minimal change list (not implemented)
1. **Fix staff sign-in first:** give staff a simple sign-in page (e.g. /staff-login) and point /admin and /link-check at it instead of /auth.
2. **Switch the Shopify origin** in src/lib/shopify.ts to `https://envirobiotics.com` (or confirm shop. keeps redirecting).
3. **Redirect every old marketing page** (section 3) to the matching envirobiotics.com page, through one mapping table, with the store homepage as the fallback. Remove /dev-tools, /embed, /mobile-home-preview and /payment-success.
4. **Remove customer forms:** contact, support, quotes, refill, product registration, the /go/pets email form (or move it to a Shopify form), and remove Tidio from this app.
5. **Close the matching endpoints and database rules:** remove pets-offer, installation-quote, refill-request and coming-soon; remove anonymous insert access on contact_inquiries and product_registrations. Keep track-visit and the webhooks.
6. **Fix the pets offer email link** (or retire the email).
7. **Delete unused account code:** AuthPage, AccountPage, ClaimAccountModal, ChangePasswordSection, affiliate pages, useEntitlement. Keep the /aff and /prosub redirects until affiliates have new links. Remove the menu/footer links to /account, /contact and /support on ad pages.
8. **Simplify sitemap.xml** (or remove it) since the app is noindexed.
9. Outside the code: turn off customer signups in the sign-in settings, and point Tidio, Resend templates and the auth Site URL at the right addresses.
