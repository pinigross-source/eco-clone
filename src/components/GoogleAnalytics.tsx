import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * GA4 for the marketing site.
 *
 * The measurement ID is the SAME stream already used by the Shopify store
 * (Google & YouTube app), so sessions stitch across envirobiotics.com and
 * shop.envirobiotics.com. We never create a second Shopify GA4 property and
 * never send ecommerce/purchase events from here.
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

export function isGaHost(hostname: string): boolean {
  return GA_HOSTS.includes(hostname);
}

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __ebGaReady?: boolean;
};

function gtag(...args: unknown[]) {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(args);
}

function initGa() {
  const w = window as GtagWindow;
  if (w.__ebGaReady) return true;
  if (!isGaHost(window.location.hostname)) return false;

  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== "function") w.gtag = gtag;

  // NOTE: no consent defaults are written here. If a consent tool is added it
  // owns gtag('consent', ...) and any denial it sets is respected as-is.

  w.gtag("js", new Date());
  // Cross-domain linking must be configured before/with the tag config.
  w.gtag("set", "linker", {
    domains: GA_LINKER_DOMAINS,
    accept_incoming: true,
  });
  w.gtag("config", GA_MEASUREMENT_ID, {
    // We send page_view manually (initial + each SPA navigation), so the
    // automatic initial and history-based pageviews are both disabled.
    send_page_view: false,
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const hash = useRouterState({ select: (s) => s.location.hash });
  const lastPath = useRef<string | null>(null);
  const lastLocation = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!initGa()) return;

    // Hash-only changes (in-page anchors) are not page navigations.
    const key = `${pathname}${search ?? ""}`;
    if (lastPath.current === key) return;

    const previous = lastLocation.current;
    lastPath.current = key;
    lastLocation.current = window.location.href;

    // Let the route's head() apply so document.title is correct.
    const id = window.setTimeout(() => {
      (window as GtagWindow).gtag?.("event", "page_view", {
        page_location: window.location.href,
        page_title: document.title,
        page_referrer: previous || document.referrer || undefined,
        send_to: GA_MEASUREMENT_ID,
      });
    }, 0);
    return () => window.clearTimeout(id);
    // hash intentionally excluded from the dependency list
  }, [pathname, search, hash]);

  return null;
}
