import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CompareChemicalFreshenersPage";

export const Route = createFileRoute("/compare/chemical-fresheners")({
  head: () => ({
    meta: [
      { title: "EnviroBiotics vs. Chemical Air Fresheners" },
      { name: "description", content: "Why probiotic balance is a healthier alternative to chemical fragrance." },
      { property: "og:title", content: "EnviroBiotics vs. Chemical Air Fresheners" },
      { property: "og:description", content: "Why probiotic balance is a healthier alternative to chemical fragrance." },
      { property: "og:url", content: "https://envirobiotics.com/compare/chemical-fresheners" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "EnviroBiotics vs. Chemical Air Fresheners" },
      { name: "twitter:description", content: "Why probiotic balance is a healthier alternative to chemical fragrance." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/compare/chemical-fresheners" },
    ],
  }),
  component: Page,
});
