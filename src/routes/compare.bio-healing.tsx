import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CompareBioHealingPage";

export const Route = createFileRoute("/compare/bio-healing")({
  head: () => ({
    meta: [
      { title: "EnviroBiotics vs. Bio-Healing" },
      { name: "description", content: "How EnviroBiotics differs from other bio-healing approaches." },
      { property: "og:title", content: "EnviroBiotics vs. Bio-Healing" },
      { property: "og:description", content: "How EnviroBiotics differs from other bio-healing approaches." },
      { property: "og:url", content: "https://envirobiotics.com/compare/bio-healing" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "EnviroBiotics vs. Bio-Healing" },
      { name: "twitter:description", content: "How EnviroBiotics differs from other bio-healing approaches." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/compare/bio-healing" },
    ],
  }),
  component: Page,
});
