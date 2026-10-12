import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

const CLICK_IDS = ["fbclid", "gclid", "gbraid", "wbraid", "ttclid", "msclkid"];
const VISITOR_KEY = "eb_visitor_id";
const SESSION_KEY = "eb_session_id";
const SENT_KEY = "eb_visit_sent";

function id() {
  try {
    return crypto.randomUUID();
  } catch {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
}

function stable(key: string, store: Storage) {
  let v = store.getItem(key);
  if (!v) {
    v = id();
    store.setItem(key, v);
  }
  return v;
}

/**
 * Records a landing-page visit with its ad attribution so purchases that later
 * happen on Shopify can be tied back to the campaign and landing page.
 * Only fires once per session, on the first (entry) page.
 */
export function AttributionBeacon() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SENT_KEY)) return;
      const p = new URLSearchParams(window.location.search);

      let click_id: string | null = null;
      let click_id_type: string | null = null;
      for (const k of CLICK_IDS) {
        const v = p.get(k);
        if (v) {
          click_id = v;
          click_id_type = k;
          break;
        }
      }

      const utm_source =
        p.get("utm_source") ??
        (click_id_type === "fbclid"
          ? "facebook"
          : click_id_type
            ? "google"
            : null);

      // Skip pure organic/direct noise: only log when there is real attribution
      if (!utm_source && !document.referrer) return;

      sessionStorage.setItem(SENT_KEY, "1");

      const payload = {
        visitor_id: stable(VISITOR_KEY, localStorage),
        session_id: stable(SESSION_KEY, sessionStorage),
        landing_page: window.location.pathname,
        referrer: document.referrer || null,
        utm_source,
        utm_medium: p.get("utm_medium"),
        utm_campaign: p.get("utm_campaign"),
        utm_content: p.get("utm_content"),
        utm_term: p.get("utm_term"),
        ad_id: p.get("ad_id") ?? p.get("utm_ad_id"),
        adset_id: p.get("adset_id") ?? p.get("utm_adset_id"),
        click_id,
        click_id_type,
      };

      const body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/public/track-visit",
          new Blob([body], { type: "application/json" }),
        );
      } else {
        void fetch("/api/public/track-visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        });
      }
    } catch {
      // never break the page for analytics
    }
  }, [location.pathname]);

  return null;
}
