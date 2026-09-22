import { getRequest } from "@tanstack/react-start/server";
import { isProductionHostname } from "@/lib/env";

export function resolveShowNewBlogsServer(): boolean {
  try {
    const host = getRequest()?.headers.get("host") ?? "";
    // Unknown/localhost hosts (dev, prerender) are treated as preview.
    return !isProductionHostname(host);
  } catch {
    // If the request is unavailable, err on the side of hiding on production.
    return false;
  }
}
