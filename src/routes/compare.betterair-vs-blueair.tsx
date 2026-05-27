import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CompareBlueairPage";

export const Route = createFileRoute("/compare/betterair-vs-blueair")({
  head: () => ({
    meta: [
      { title: "EnviroBiotics vs Blueair — Probiotic vs HEPASilent Comparison" },
      { name: "description", content: "EnviroBiotics vs Blueair: probiotic microbiome rebalancing vs HEPASilent filtration. Which air purifier is right for allergies and air quality?" },
      { property: "og:title", content: "EnviroBiotics vs Blueair — Probiotic vs HEPASilent Comparison" },
      { property: "og:description", content: "EnviroBiotics vs Blueair: probiotic microbiome rebalancing vs HEPASilent filtration. Which air purifier is right for allergies and air quality?" },
      { property: "og:url", content: "https://envirobiotics.com/compare/betterair-vs-blueair" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "EnviroBiotics vs Blueair — Probiotic vs HEPASilent Comparison" },
      { name: "twitter:description", content: "EnviroBiotics vs Blueair: probiotic microbiome rebalancing vs HEPASilent filtration. Which air purifier is right for allergies and air quality?" },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/compare/betterair-vs-blueair" },
    ],
  }),
  component: Page,
});
