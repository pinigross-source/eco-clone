import { createFileRoute, notFound } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";
import { resolveWpRedirect } from "@/lib/wpRedirects";

export const Route = createFileRoute("/$")({
  beforeLoad: ({ location }) => {
    const target = resolveWpRedirect(location.pathname);
    if (target) {
      if (/^https?:\/\//i.test(target)) {
        throw redirect({ href: target, replace: true, statusCode: 301 });
      }
      throw redirect({ to: target as never, replace: true, statusCode: 301 });
    }
    throw notFound();
  },
  component: () => null,
});
