// Visitor attribution captured on the first page load of the session.
// Stored in sessionStorage and re-applied to outbound shop links at click time
// (never during render, which would break SSR hydration).

const STORAGE_KEY = "eb_session_attribution";

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_id",
  "utm_content",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "ttclid",
  "msclkid",
] as const;

export type AttributionParams = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;

/** Save the visitor's original params once per session (first page load wins). */
export function captureSessionAttribution(): AttributionParams {
  if (typeof window === "undefined") return {};
  try {
    const existing = window.sessionStorage.getItem(STORAGE_KEY);
    if (existing) return JSON.parse(existing) as AttributionParams;

    const search = new URLSearchParams(window.location.search);
    const captured: AttributionParams = {};
    for (const key of ATTRIBUTION_KEYS) {
      const value = search.get(key);
      if (value) captured[key] = value;
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
    return captured;
  } catch {
    return {};
  }
}

export function readSessionAttribution(): AttributionParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AttributionParams) : {};
  } catch {
    return {};
  }
}

/**
 * Append the visitor's original attribution params to an outbound shop URL and
 * stamp utm_content with the page name. Click-time only.
 */
export function withVisitorAttribution(url: string, pageName?: string): string {
  if (typeof window === "undefined") return url;
  try {
    const parsed = new URL(url, window.location.href);
    const stored = readSessionAttribution();
    for (const key of ATTRIBUTION_KEYS) {
      const value = stored[key];
      if (value && !parsed.searchParams.has(key)) parsed.searchParams.set(key, value);
    }
    if (pageName) parsed.searchParams.set("utm_content", pageName);
    return parsed.toString();
  } catch {
    return url;
  }
}
