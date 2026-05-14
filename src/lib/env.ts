/**
 * Single source of truth for "is this a test/staging environment?"
 *
 * Production hosts (envirobiotics.com) are NEVER test, so search engines
 * can index them. Lovable preview/sandbox hosts and explicit
 * VITE_IS_TEST_ENV="true" are treated as test (noindex, banner, etc.).
 */
const PROD_HOSTS = new Set([
  "envirobiotics.com",
  "www.envirobiotics.com",
]);

function detectIsTestEnv(): boolean {
  const explicit = import.meta.env.VITE_IS_TEST_ENV;
  if (explicit === "true") return true;
  if (explicit === "false") return false;

  if (typeof window !== "undefined" && window.location?.hostname) {
    return !PROD_HOSTS.has(window.location.hostname);
  }
  // SSR / build-time fallback: assume production (safer for SEO).
  return false;
}

export const isTestEnv = detectIsTestEnv();
