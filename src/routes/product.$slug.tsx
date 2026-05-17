import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyProductUrl } from "@/lib/shopify";

// Legacy slugs that should 301 to their canonical product URL.
const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  "betterair-2080": "ba-2080",
};

function ProductRedirect() {
  const { slug } = Route.useParams();
  useEffect(() => {
    window.location.replace(shopifyProductUrl(slug));
  }, [slug]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">Redirecting to product…</p>
    </div>
  );
}

export const Route = createFileRoute("/product/$slug")({
  beforeLoad: ({ params }) => {
    const target = LEGACY_SLUG_REDIRECTS[params.slug];
    if (target) {
      throw redirect({
        to: "/product/$slug",
        params: { slug: target },
        statusCode: 301,
      });
    }
  },
  component: ProductRedirect,
});
