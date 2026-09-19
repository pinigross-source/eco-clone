import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * GA4 for the marketing site.
 *
 * The tag itself is loaded ONCE from an inline snippet in the document head
 * (see src/routes/__root.tsx) so it is initialised before the app mounts and is
 * never re-initialised on route changes. That snippet sets:
 *   cookie_domain: ".envirobiotics.com"  -> _ga is shared with the Shopify store
 *   cookie_flags:  "SameSite=None;Secure"
 *   send_page_view: false                -> SPA page views are sent from here
 *   linker: { domains: [...], accept_incoming: true }
 *
 * The measurement ID is the SAME stream used by shop.envirobiotics.com, so a
 * visitor crossing to the store continues the same GA4 session and keeps the
 * original source/medium.
 *
 * This component only fires the manual page_view on the initial load and on
 * every client-side route change.
 */
export const GA_MEASUREMENT_ID = "G-E86NY68N0Y";

export const GA_HOSTS = ["envirobiotics.com", "www.envirobiotics.com"];

export const GA_COOKIE_DOMAIN = ".envirobiotics.com";

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
  gtag?: (...args: unknown[]) => void;
};

/** The inline head snippet, kept here so the config lives in one file. */
export const GA_HEAD_SNIPPET = `(function(){
  var ID = ${JSON.stringify(GA_MEASUREMENT_ID)};
  var HOSTS = ${JSON.stringify(GA_HOSTS)};
  var EXCLUDED = ${JSON.stringify(GA_EXCLUDED_PATHS)};
  var h = window.location.hostname;
  if (HOSTS.indexOf(h) === -1) return;
  for (var i = 0; i < EXCLUDED.length; i++) {
    var p = EXCLUDED[i];
    if (window.location.pathname === p || window.location.pathname.indexOf(p + "/") === 0) return;
  }
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  var LINKER = { domains: ${JSON.stringify(GA_LINKER_DOMAINS)}, accept_incoming: true };
  window.gtag('set', 'linker', LINKER);
  window.gtag('js', new Date());
  window.gtag('config', ID, {
    cookie_domain: ${JSON.stringify(GA_COOKIE_DOMAIN)},
    cookie_flags: 'SameSite=None;Secure',
    send_page_view: false,
    linker: LINKER
  });
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);
})();`;

function sendPageView() {
  const w = window as GtagWindow;
  if (typeof w.gtag !== "function") return;
  if (!isGaHost(window.location.hostname)) return;
  if (isGaExcludedPath(window.location.pathname)) return;
  w.gtag("event", "page_view", {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  });
}

export function GoogleAnalytics() {
  const href = useRouterState({
    select: (s) => s.location.pathname + s.location.searchStr,
  });
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (lastSent.current === href) return;
    lastSent.current = href;
    // Let the route's head() update document.title before reporting.
    const t = window.setTimeout(sendPageView, 0);
    return () => window.clearTimeout(t);
  }, [href]);

  return null;
}
