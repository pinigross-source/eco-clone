// Decides whether the newest (not-yet-launched) blog posts are visible.
// On preview/staging hosts they show; on envirobiotics.com they stay hidden
// until the launch is approved. Works in isomorphic loaders: on the server it
// reads the real request host, on the client it uses the current hostname.
import { isTestEnv, isProductionHostname } from "@/lib/env";

export async function resolveShowNewBlogs(): Promise<boolean> {
  if (typeof window !== "undefined") return isTestEnv;
  try {
    const { getRequest } = await import("@tanstack/react-start/server");
    const host = getRequest()?.headers.get("host") ?? "";
    // Unknown/localhost hosts (dev, prerender) are treated as preview.
    return !isProductionHostname(host);
  } catch {
    // If the request is unavailable, err on the side of hiding on production.
    return false;
  }
}
