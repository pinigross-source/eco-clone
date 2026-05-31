import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyProductUrl } from "@/lib/shopify";

// Legacy slugs that should 301 to their canonical product URL.
const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  "betterair-2080": "ba-2080",
  "e-biotic-home": "e-biotic-home-and-small-office",
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
  head: ({ params }) => {
    const isBA2080 = params.slug === "ba-2080";
    return {
      meta: [
        { title: isBA2080 ? "BA-2080 Probiotic Air Purification System | EnviroBiotics" : "Product | EnviroBiotics" },
        { name: "description", content: isBA2080 ? "BA-2080 Advanced Probiotic Air Purification System — covers up to 800 sq ft. Uses EnviroBiotics® environmental probiotics to rebalance your indoor microbiome." : "Shop EnviroBiotics probiotic air and surface purifiers. Safe for families and pets." },
        { property: "og:title", content: isBA2080 ? "BA-2080 Probiotic Air Purification System | EnviroBiotics" : "Product | EnviroBiotics" },
        { property: "og:description", content: isBA2080 ? "BA-2080 Advanced Probiotic Air Purification System — covers up to 800 sq ft. Uses EnviroBiotics® environmental probiotics to rebalance your indoor microbiome." : "Shop EnviroBiotics probiotic air and surface purifiers. Safe for families and pets." },
        { property: "og:url", content: `https://envirobiotics.com/product/${params.slug}` },
        { property: "og:type", content: "product" },
        { name: "twitter:title", content: isBA2080 ? "BA-2080 Probiotic Air Purification System | EnviroBiotics" : "Product | EnviroBiotics" },
        { name: "twitter:description", content: isBA2080 ? "BA-2080 Advanced Probiotic Air Purification System — covers up to 800 sq ft. Uses EnviroBiotics® environmental probiotics to rebalance your indoor microbiome." : "Shop EnviroBiotics probiotic air and surface purifiers. Safe for families and pets." },
      ],
      links: [
        { rel: "canonical", href: `https://envirobiotics.com/product/${params.slug}` },
      ],
    };
  },
  component: ProductRedirect,
});
