import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ResearchPage";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research and Studies | EnviroBiotics" },
      { name: "description", content: "Peer-reviewed studies and references behind probiotic environmental care." },
      { property: "og:title", content: "Research and Studies | EnviroBiotics" },
      { property: "og:description", content: "Peer-reviewed studies and references behind probiotic environmental care." },
      { property: "og:url", content: "https://envirobiotics.com/research" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Research and Studies | EnviroBiotics" },
      { name: "twitter:description", content: "Peer-reviewed studies and references behind probiotic environmental care." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/research" },
    ],
  }),
  component: Page,
});
