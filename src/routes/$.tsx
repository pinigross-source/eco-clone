import { createFileRoute, redirect } from "@tanstack/react-router";
import { resolveWpRedirect } from "@/lib/wpRedirects";
import { isAppKeptPath, storeUrlFor } from "@/lib/hosts";

// Unknown paths: keep in-app legacy rewrites (e.g. /prosub/aff/N -> /aff/N),
// otherwise hand the visitor to the same path on the Shopify store.
export const Route = createFileRoute("/$")({
  beforeLoad: ({ location }) => {
    const target = resolveWpRedirect(location.pathname);
    if (target && !/^https?:\/\//i.test(target) && isAppKeptPath(target)) {
      throw redirect({ to: target as never, replace: true, statusCode: 301 });
    }
    throw redirect({ href: storeUrlFor(location.pathname, location.searchStr ?? ""), replace: true, statusCode: 301 });
  },
  component: () => null,
});
