// Facebook Pixel helper, safe to call even if fbq isn't loaded
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackFBEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}
