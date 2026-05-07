import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyProductUrl } from "@/lib/shopify";

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
  component: ProductRedirect,
});
