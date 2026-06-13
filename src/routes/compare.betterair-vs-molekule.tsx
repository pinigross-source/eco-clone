import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CompareMolekulePage";

export const Route = createFileRoute("/compare/betterair-vs-molekule")({
  head: () => ({
    meta: [
      { title: "EnviroBiotics vs Molekule  Probiotic vs PECO Comparison" },
      { name: "description", content: "EnviroBiotics vs Molekule: compare probiotic purification vs PECO technology. See which air purifier approach fits your home. Side-by-side comparison." },
      { property: "og:title", content: "EnviroBiotics vs Molekule  Probiotic vs PECO Comparison" },
      { property: "og:description", content: "EnviroBiotics vs Molekule: compare probiotic purification vs PECO technology. See which air purifier approach fits your home. Side-by-side comparison." },
      { property: "og:url", content: "https://envirobiotics.com/compare/betterair-vs-molekule" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "EnviroBiotics vs Molekule  Probiotic vs PECO Comparison" },
      { name: "twitter:description", content: "EnviroBiotics vs Molekule: compare probiotic purification vs PECO technology. See which air purifier approach fits your home. Side-by-side comparison." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/compare/betterair-vs-molekule" },
    ],
  }),
  component: Page,
});
