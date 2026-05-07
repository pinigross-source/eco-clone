// Reddit Pixel helper, safe to call even if rdt isn't loaded
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    rdt?: (...args: unknown[]) => void;
  }
}

export function trackRedditEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  // Client-side pixel
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', eventName, params);
  }

  // Server-side CAPI (fire-and-forget)
  trackRedditCAPI(eventName, params).catch(() => {});
}

async function trackRedditCAPI(
  eventName: string,
  params?: Record<string, unknown>
) {
  try {
    const payload: Record<string, unknown> = {
      event_type: eventName,
      event_at: new Date().toISOString(),
      user_agent: navigator.userAgent,
      ...params,
    };

    // Pass Reddit click ID if stored
    const rdtCid = getRedditClickId();
    if (rdtCid) payload.click_id = rdtCid;

    await supabase.functions.invoke('reddit-capi', {
      body: payload,
    });
  } catch (e) {
    console.warn('[Reddit CAPI] Failed to send event:', e);
  }
}

/** Capture rdt_cid from URL params on landing and store in sessionStorage */
export function captureRedditClickId() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const cid = params.get('rdt_cid');
  if (cid) {
    sessionStorage.setItem('rdt_cid', cid);
  }
}

function getRedditClickId(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('rdt_cid');
}
