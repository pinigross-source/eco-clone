import { useEffect } from "react";

/**
 * GA4 for the marketing site.
 *
 * The measurement ID is the SAME stream already used by the Shopify store
 * (Google & YouTube app), so sessions stitch across envirobiotics.com and
 * shop.envirobiotics.com. We never create a second Shopify GA4 property and
 * never send ecommerce/purchase events from here.
 *
 * Page views: we use Google's recommended setup — the automatic initial
 * page_view from `config`, plus GA4 enhanced measurement's native History API
 * tracking for client-side route changes. There is NO manual page_view firing
 * here on purpose: manual events plus enhanced measurement history events
 * double-count, and `send_page_view: false` does not turn the history events
 * off.
 *
 * REQUIRES (unverified from here — needs GA4 Admin access):
 *   Admin → Data streams → this web stream → Enhanced measurement →
 *   "Page changes based on browser history events" must be ENABLED,
 *   otherwise client-side route changes are not counted at all.
 *
 * Loading is gated to the production hostnames only (see GA_HOSTS): localhost,
 * lovable.app previews and the editor never send hits.
 */
export const GA_MEASUREMENT_ID = "G-E86NY68N0Y";

export const GA_HOSTS = ["envirobiotics.com", "www.envirobiotics.com"];

export const GA_LINKER_DOMAINS = [
  "envirobiotics.com",
  "www.envirobiotics.com",
  "shop.envirobiotics.com",
];

/** Review-only routes that must never be measured in the production property. */
export const GA_EXCLUDED_PATHS = ["/mobile-home-preview"];

export function isGaHost(hostname: string): boolean {
  return GA_HOSTS.includes(hostname);
}

export function isGaExcludedPath(pathname: string): boolean {
  return GA_EXCLUDED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

type GtagWindow = Window & {
  dataLayer?: IArguments[];
  gtag?: (...args: unknown[]) => void;
  __ebGaReady?: boolean;
};

function initGa() {
  const w = window as GtagWindow;
  if (w.__ebGaReady) return true;
  if (!isGaHost(window.location.hostname)) return false;
  // The review route is deliberately not measured. Because enhanced
  // measurement owns history events once the tag is loaded, the only reliable
  // exclusion is to not load the tag at all on that entry page.
  if (isGaExcludedPath(window.location.pathname)) return false;

  w.dataLayer = w.dataLayer || [];
  // Google's canonical wrapper: it must push the raw `arguments` object.
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    (w.dataLayer as IArguments[]).push(arguments);
  }
  if (typeof w.gtag !== "function") w.gtag = gtag as unknown as GtagWindow["gtag"];

  // NOTE: no consent defaults are written here. If a consent tool is added it
  // owns gtag('consent', ...) and any denial it sets is respected as-is.

  // Cross-domain linking is set before js/config, per Google's docs.
  w.gtag!("set", "linker", {
    domains: GA_LINKER_DOMAINS,
    accept_incoming: true,
  });
  w.gtag!("js", new Date());
  w.gtag!("config", GA_MEASUREMENT_ID, {
    cookie_domain: "envirobiotics.com",
    linker: { domains: GA_LINKER_DOMAINS, accept_incoming: true },
  });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);

  w.__ebGaReady = true;
  return true;
}

export function GoogleAnalytics() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    initGa();
  }, []);

  return null;
}
