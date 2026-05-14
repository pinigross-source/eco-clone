import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/HygieneHypothesisPage";

export const Route = createFileRoute("/hygiene-hypothesis")({
  head: () => ({
    meta: [
      { title: "The Hygiene Hypothesis Explained | EnviroBiotics" },
      { name: "description", content: "Modern research on early-life microbial exposure, immunity, and the indoor environment." },
      { property: "og:title", content: "The Hygiene Hypothesis Explained | EnviroBiotics" },
      { property: "og:description", content: "Modern research on early-life microbial exposure, immunity, and the indoor environment." },
      { property: "og:url", content: "https://envirobiotics.com/hygiene-hypothesis" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "The Hygiene Hypothesis Explained | EnviroBiotics" },
      { name: "twitter:description", content: "Modern research on early-life microbial exposure, immunity, and the indoor environment." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/hygiene-hypothesis" },
    ],
  }),
  component: Page,
});
