/**
 * Single source of truth for "is this a test/staging environment?"
 *
 * Defaults to TRUE so the test site keeps its banner, noindex meta,
 * /dev-tools route, and Lovable-flavored social previews unless we
 * explicitly opt out by setting VITE_IS_TEST_ENV=false in production.
 */
export const isTestEnv =
  import.meta.env.VITE_IS_TEST_ENV !== "false";
