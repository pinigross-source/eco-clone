import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CompareHEPAPage";

export const Route = createFileRoute("/compare/hepa")({
  head: () => ({
    meta: [
      { title: "EnviroBiotics vs. HEPA Filtration" },
      { name: "description", content: "How probiotic surface care compares to HEPA air filtration." },
      { property: "og:title", content: "EnviroBiotics vs. HEPA Filtration" },
      { property: "og:description", content: "How probiotic surface care compares to HEPA air filtration." },
      { property: "og:url", content: "https://envirobiotics.com/compare/hepa" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "EnviroBiotics vs. HEPA Filtration" },
      { name: "twitter:description", content: "How probiotic surface care compares to HEPA air filtration." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/compare/hepa" },
    ],
  }),
  component: Page,
});
