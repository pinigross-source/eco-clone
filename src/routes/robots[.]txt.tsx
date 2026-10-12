import { createFileRoute } from "@tanstack/react-router";
import { APP_ROBOTS_TXT, isAppHost } from "@/lib/hosts";

// Served per host: app.envirobiotics.com is fully disallowed; the root domain
// keeps the existing rules unchanged.
const ROOT_ROBOTS_TXT = `User-agent: *
Allow: /

Disallow: /admin
Disallow: /account
Disallow: /auth
Disallow: /checkout
Disallow: /cart
Disallow: /payment-success
Disallow: /order-history
Disallow: /orders
Disallow: /manage-subscription
Disallow: /pro-subscription
Disallow: /affiliate-dashboard
Disallow: /affiliate-signup
Disallow: /aff/
Disallow: /dev-tools
Disallow: /link-check
Disallow: /embed
Disallow: /product-registration
Disallow: /__l5e/

Sitemap: https://envirobiotics.com/sitemap.xml
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const host = new URL(request.url).hostname;
        const body = isAppHost(host) ? APP_ROBOTS_TXT : ROOT_ROBOTS_TXT;
        return new Response(body, {
          headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
        });
      },
    },
  },
});
