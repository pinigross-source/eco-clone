// Lightweight homepage event tracking
// Fires CustomEvents on window for any analytics layer to pick up

export function trackEvent(name: string, data?: Record<string, unknown>) {
  try {
    window.dispatchEvent(new CustomEvent('eb_track', { detail: { name, ...data } }));
    // Also push to dataLayer if GTM is present
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({ event: name, ...data });
    }
    // Forward to GA4 when gtag.js is loaded (production domains only)
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', name, data ?? {});
    }
  } catch {
    // silent
  }
}
