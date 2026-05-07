import { useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

/**
 * Handles legacy WordPress URL patterns and redirects them to the new routes.
 * This acts as a client-side catch for old URLs that may still be indexed by Google.
 * For proper 301 redirects, configure these in Cloudflare Bulk Redirects.
 */

const REDIRECT_MAP: Record<string, string> = {
  // ── WordPress Blog Posts ──
  "/how-envirobiotics-helps-reclaim-surfaces": "/blog",
  "/clean-and-safe-keeping-surfaces-germ-free-without-harsh-chemicals": "/blog",
  "/why-indoor-spaces-need-probiotics-a-new-approach-to-air-purification": "/blog",
  "/how-indoor-allergens-trigger-allergies-and-asthma": "/blog",
  "/tackling-the-candida-auris-threat-with-innovative-enviro-biotics-technology": "/blog/candida-auris-threat",
  "/the-surprising-link-between-indoor-living-and-chronic-disease-and-what-we-can-do-about-it": "/blog/indoor-living-chronic-disease",
  "/5-tips-for-healthier-happier-home-with-envirobiotics": "/blog/5-tips-healthier-home",

  // ── WordPress Product Pages ──
  "/ba2080-advanced-purification": "/product/betterair-2080",
  "/biotica-800": "/product/biotica-800",
  "/biotica800_lp": "/product/biotica-800",
  "/biologic-mini-portable-purification-healthy-spaces": "/product/biologic-mini",
  "/biologic-probiotic-room-purifier-by-betterair": "/shop",

  // ── Product Refills & Accessories → Shop ──
  "/biologic-mini-refill-twin-refill-subscription": "/shop",
  "/e-biotic-refill-subscription-250ml-6m": "/shop",
  "/biodify-cartridge-2-pack": "/shop",
  "/bapf-18": "/shop",
  "/pet-spray": "/shop",
  "/enviro-boost-150-ml": "/shop",
  "/twin-pack-of-2-refills-for-the-biologic": "/shop",
  "/ba-2080-1-mini": "/shop",
  "/biotica-800-nv-twin-pack-refill-subscription": "/shop",
  "/ba-2080-refill-year-pack-subscription": "/shop",
  "/bapf-18-fogger-250ml-probiotic-refill": "/shop",
  "/combo-2mini_1biotica800": "/shop",
  "/biotica-800-refill-cartridge-deep-cleansing": "/shop",
  "/biotica-800-refill-nv": "/shop",
  "/ba-1000-refill": "/shop",
  "/ba-1000-pro-refill": "/shop",
  "/ba-2080-certified-hepa-filter": "/shop",
  "/ba-2080-refill": "/shop",
  "/biologic-refill": "/shop",
  "/biologic-mini-refill": "/shop",

  // ── WordPress Product Categories ──
  "/home-sme": "/solutions/room",
  "/refills": "/shop",
  "/travel": "/shop",
  "/pets": "/shop",
  "/biologic": "/shop",
  "/fogger": "/shop",
  "/ba2080": "/product/betterair-2080",
  "/biologic-mini": "/product/biologic-mini",
  "/test": "/shop",
  "/pro_sub": "/shop",
  "/combo": "/shop",
  "/uncategorized": "/blog",

  // ── WordPress Page Slugs ──
  "/how-it-works-2": "/how-it-works",
  "/how-it-works-3": "/how-it-works",
  "/our-technology": "/how-it-works",
  "/technology": "/how-it-works",
  "/products": "/shop",
  "/store": "/shop",
  "/all-products": "/shop",
  "/contact": "/support",
  "/contact-us": "/support",
  "/faq": "/#faq",
  "/faqs": "/#faq",
  "/about-us": "/about",
  "/our-story": "/about",
  "/hvac-solutions": "/hvac",
  "/commercial": "/hvac",
  "/commercial-solutions": "/hvac",
  "/room-solutions": "/solutions/room",
  "/home-solutions": "/solutions/room",
  "/residential": "/solutions/room",
  "/subscribe": "/subscribe",
  "/subscription": "/subscribe",
  "/my-account": "/account",
  "/privacy-policy": "/privacy",
  "/terms-and-conditions": "/terms",
  "/terms-of-service": "/terms",
  "/research-studies": "/research",
  "/blog-2": "/blog",
  "/news": "/blog",
  "/articles": "/blog",
  "/videos-2": "/videos",
  "/media": "/videos",
  "/register-product": "/register",
  "/product-registration": "/register",
  "/warranty": "/register",
  "/safety-certifications": "/safety",
  "/certifications": "/safety",
  "/affiliate-account": "/affiliate/join",
  "/affiliate-registration": "/affiliate/join",
  "/affiliate-reset-password": "/auth",
  "/affiliate/join": "/affiliate/signup",
  "/resources": "/education",

  // ── Old WP pages still being crawled (404 batch Apr 2026) ──
  "/biotica-800-1-mini": "/shop",
  "/biotica800": "/product/biotica-800",
  "/biotica800/": "/product/biotica-800",
  "/biologic-mini_bobby": "/product/biologic-mini",
  "/biologic-mini-limited-time-offer-1": "/product/biologic-mini",
  "/shop-3": "/shop",
  "/product-support": "/support",
  "/ba-2080-3-mini": "/shop",
  "/research-case-studies": "/research",
  "/video": "/videos",
  "/pet": "/shop",
  "/refund_returns": "/warranty-policy",
  "/elementor-7846": "/",
  "/biologic-mini_lto": "/product/biologic-mini",
  "/support-2": "/support",
  "/biologic-mini_bobby_parrish": "/product/biologic-mini",
  "/biologic-": "/product/biologic-mini",
  "/biotica-800_bobby": "/product/biotica-800",
  "/biologic-mini-probiotic-room-purifier": "/product/biologic-mini",
  "/how-indoor-": "/blog",
  "/supporting-immune-health": "/benefits",
  "/product-registration-form": "/register",
  "/wholesale-login": "/auth",
  "/home-test-1": "/",
  "/e-biotic-refill-subscription-500ml-1m": "/shop",
  "/why-indoor-": "/blog",
  "/how-it-": "/how-it-works",
  "/how-": "/how-it-works",
  "/e-biotic-refill-subscription-250ml-5m": "/shop",
  "/2080-certified-hepa-purifier-by-betterair": "/product/betterair-2080",
  "/e-biotic-pro": "/product/ebiotic-pro",
  "/biologic-mini-twin-pack-refill-subscription": "/shop",
  "/asthma-and-": "/benefits#asthma-prevention",
  "/ebioticpro": "/product/ebiotic-pro",
  "/customer-care": "/support",
  "/shop-envirobiotics-probiotic-purifiers": "/shop",
  "/a-new-path-to-suppress-covid-19-on-surfaces": "/blog",
  "/hepa": "/shop",

  // ── WordPress PDF/media redirects ──
  "/wp-content/uploads/2024/12/Biotica800-User-Manual.pdf": "/manuals/Biotica800-User-Manual.pdf",
  "/wp-content/uploads/2024/12/User-Guide-mini-0923-4.pdf": "/manuals/BioLogicMini-UM.pdf",

  // ── WordPress Health-Benefit Pages → unified page ──
  "/alleviating-allergies": "/benefits#alleviating-allergies",
  "/odor-elimination": "/benefits#odor-elimination",
  "/mold-5": "/benefits#mold-prevention",
  "/reducing-dust-accumulation": "/benefits#reducing-dust",
  "/enhancing-overall-health": "/benefits#enhancing-health",
  "/asthma-and-allergies-prevention": "/benefits#asthma-prevention",
  "/health-benefits": "/benefits",
};

// WordPress category/tag/date patterns
const PATTERN_REDIRECTS: Array<{ pattern: RegExp; target: string }> = [
  { pattern: /^\/product-category\/.*/i, target: "/shop" },
  { pattern: /^\/product-tag\/.*/i, target: "/shop" },
  { pattern: /^\/product_cat\/.*/i, target: "/shop" },
  { pattern: /^\/category\/.*/i, target: "/blog" },
  { pattern: /^\/tag\/.*/i, target: "/blog" },
  { pattern: /^\/\d{4}\/\d{2}\/(.+)\/?$/i, target: "/blog" }, // /2024/01/post-slug → /blog
  { pattern: /^\/wc-api\/.*/i, target: "/shop" }, // old WooCommerce API endpoints
  { pattern: /^\/wp-content\/.*/i, target: "/" }, // old media files
  { pattern: /^\/wp-admin\/.*/i, target: "/" },
  { pattern: /^\/wp-login\.php/i, target: "/" },
  { pattern: /^\/wp-json\/.*/i, target: "/" },
  { pattern: /^\/feed\/?$/i, target: "/blog" },
  { pattern: /^\/shop\/.*$/i, target: "/shop" },
  { pattern: /^\/product\/(.+)$/i, target: "/product/$1" },
  { pattern: /^\/(.+)\/aff\/(\d+)\/?$/i, target: "/aff/$2?dest=/$1" }, // legacy SliceWP: /prosub/aff/16/ → /aff/16?dest=/prosub
];

export const WordPressRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, "") || "/"; // normalize trailing slash

    // Check exact matches first
    if (REDIRECT_MAP[path]) {
      navigate({ to: REDIRECT_MAP[path] as never, replace: true });
      return;
    }

    // Check lowercase version
    const lowerPath = path.toLowerCase();
    if (REDIRECT_MAP[lowerPath]) {
      navigate({ to: REDIRECT_MAP[lowerPath] as never, replace: true });
      return;
    }

    // Check pattern-based redirects
    for (const { pattern, target } of PATTERN_REDIRECTS) {
      const match = path.match(pattern);
      if (match) {
        let resolvedTarget = target;
        if (match[1]) {
          resolvedTarget = resolvedTarget.replace("$1", match[1]);
        }
        if (match[2]) {
          resolvedTarget = resolvedTarget.replace("$2", match[2]);
        }
        navigate({ to: resolvedTarget as never, replace: true });
        return;
      }
    }

    // Handle ?p=123 WordPress numeric post IDs → send to homepage
    const params = new URLSearchParams(location.search);
    if (params.has("p") || params.has("page_id")) {
      navigate({ to: "/", replace: true });
      return;
    }
  }, [location.pathname, location.search, navigate]);

  return null;
};
