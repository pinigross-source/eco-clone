import { useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { resolveWpRedirect } from "@/lib/wpRedirects";

/**
 * Handles legacy WordPress URL patterns and redirects them to the new routes.
 * This acts as a client-side catch for old URLs that may still be indexed by Google.
 * For proper 301 redirects, configure these in Cloudflare Bulk Redirects.
 */

export const WordPressRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Legacy redirects must keep the visitor's campaign query string intact.
    const target = resolveWpRedirect(location.pathname);
    if (target) {
      if (/^https?:\/\//i.test(target)) {
        if (typeof window !== "undefined") window.location.replace(target);
        return;
      }
      navigate({
        to: target as never,
        search: ((prev: Record<string, unknown>) => prev) as never,
        replace: true,
      });
      return;
    }

    // Handle ?p=123 WordPress numeric post IDs → send to homepage
    const params = new URLSearchParams(location.search);
    if (params.has("p") || params.has("page_id")) {
      // Drop only the legacy WordPress ids; keep campaign parameters.
      navigate({
        to: "/",
        search: (prev: Record<string, unknown>) => {
          const next = { ...(prev ?? {}) };
          delete next.p;
          delete next.page_id;
          return next;
        },
        replace: true,
      });
    }
  }, [location.pathname, location.search, navigate]);

  return null;
};
