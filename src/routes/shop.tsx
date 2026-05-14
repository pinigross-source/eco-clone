import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyAllProducts } from "@/lib/shopify";

function ShopRedirect() {
  useEffect(() => {
    window.location.replace(shopifyAllProducts());
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">Redirecting to shop…</p>
    </div>
  );
}

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop EnviroBiotics Probiotic Products" },
      { name: "description", content: "Browse EnviroBiotics probiotic air and surface products and subscriptions." },
      { property: "og:title", content: "Shop EnviroBiotics Probiotic Products" },
      { property: "og:description", content: "Browse EnviroBiotics probiotic air and surface products and subscriptions." },
      { property: "og:url", content: "https://envirobiotics.com/shop" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Shop EnviroBiotics Probiotic Products" },
      { name: "twitter:description", content: "Browse EnviroBiotics probiotic air and surface products and subscriptions." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/shop" },
    ],
  }),
  component: ShopRedirect,
});
