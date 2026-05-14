import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CaseStudiesPage";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies | EnviroBiotics" },
      { name: "description", content: "Real-world deployments of probiotic air and surface care." },
      { property: "og:title", content: "Case Studies | EnviroBiotics" },
      { property: "og:description", content: "Real-world deployments of probiotic air and surface care." },
      { property: "og:url", content: "https://envirobiotics.com/case-studies" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Case Studies | EnviroBiotics" },
      { name: "twitter:description", content: "Real-world deployments of probiotic air and surface care." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/case-studies" },
    ],
  }),
  component: Page,
});
