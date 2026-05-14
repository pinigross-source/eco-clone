import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/IndoorMicrobiomePage";

export const Route = createFileRoute("/indoor-microbiome")({
  head: () => ({
    meta: [
      { title: "The Indoor Microbiome | EnviroBiotics Education" },
      { name: "description", content: "Why indoor microbial diversity matters for the health of your home." },
      { property: "og:title", content: "The Indoor Microbiome | EnviroBiotics Education" },
      { property: "og:description", content: "Why indoor microbial diversity matters for the health of your home." },
      { property: "og:url", content: "https://envirobiotics.com/indoor-microbiome" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "The Indoor Microbiome | EnviroBiotics Education" },
      { name: "twitter:description", content: "Why indoor microbial diversity matters for the health of your home." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/indoor-microbiome" },
    ],
  }),
  component: Page,
});
