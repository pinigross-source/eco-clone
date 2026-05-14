import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/MoldIndoorsPage";

export const Route = createFileRoute("/mold-indoors")({
  head: () => ({
    meta: [
      { title: "Mold Indoors: Causes, Risks, Remediation | EnviroBiotics" },
      { name: "description", content: "What causes indoor mold, why it matters for health, and how probiotic care helps reduce it." },
      { property: "og:title", content: "Mold Indoors: Causes, Risks, Remediation | EnviroBiotics" },
      { property: "og:description", content: "What causes indoor mold, why it matters for health, and how probiotic care helps reduce it." },
      { property: "og:url", content: "https://envirobiotics.com/mold-indoors" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Mold Indoors: Causes, Risks, Remediation | EnviroBiotics" },
      { name: "twitter:description", content: "What causes indoor mold, why it matters for health, and how probiotic care helps reduce it." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/mold-indoors" },
    ],
  }),
  component: Page,
});
