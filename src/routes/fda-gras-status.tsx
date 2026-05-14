import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/FdaGrasStatusPage";

export const Route = createFileRoute("/fda-gras-status")({
  head: () => ({
    meta: [
      { title: "Understanding FDA GRAS Status | EnviroBiotics" },
      { name: "description", content: "What FDA GRAS status means for probiotic products and how EnviroBiotics applies it to strain selection." },
      { property: "og:title", content: "Understanding FDA GRAS Status | EnviroBiotics" },
      { property: "og:description", content: "What FDA GRAS status means for probiotic products and how EnviroBiotics applies it to strain selection." },
      { property: "og:url", content: "https://envirobiotics.com/fda-gras-status" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Understanding FDA GRAS Status | EnviroBiotics" },
      { name: "twitter:description", content: "What FDA GRAS status means for probiotic products and how EnviroBiotics applies it to strain selection." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/fda-gras-status" },
    ],
  }),
  component: Page,
});
