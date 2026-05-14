import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CompetitiveExclusionPage";

export const Route = createFileRoute("/competitive-exclusion")({
  head: () => ({
    meta: [
      { title: "The Science of Competitive Exclusion | EnviroBiotics" },
      { name: "description", content: "How beneficial microbes outcompete unwanted ones for space, nutrients, and binding sites." },
      { property: "og:title", content: "The Science of Competitive Exclusion | EnviroBiotics" },
      { property: "og:description", content: "How beneficial microbes outcompete unwanted ones for space, nutrients, and binding sites." },
      { property: "og:url", content: "https://envirobiotics.com/competitive-exclusion" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "The Science of Competitive Exclusion | EnviroBiotics" },
      { name: "twitter:description", content: "How beneficial microbes outcompete unwanted ones for space, nutrients, and binding sites." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/competitive-exclusion" },
    ],
  }),
  component: Page,
});
