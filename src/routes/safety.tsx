import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/SafetyPage";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "EnviroBiotics Safety, Testing & GRAS Strain Data" },
      { name: "description", content: "Independent lab testing, GRAS strain selection, and safety data for occupied indoor spaces." },
      { property: "og:title", content: "EnviroBiotics Safety, Testing & GRAS Strain Data" },
      { property: "og:description", content: "Independent lab testing, GRAS strain selection, and safety data for occupied indoor spaces." },
      { property: "og:url", content: "https://envirobiotics.com/safety" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "EnviroBiotics Safety, Testing & GRAS Strain Data" },
      { name: "twitter:description", content: "Independent lab testing, GRAS strain selection, and safety data for occupied indoor spaces." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/safety" },
    ],
  }),
  component: Page,
});
