import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/GlossaryPage";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Glossary of Terms | EnviroBiotics" },
      { name: "description", content: "Microbiology, indoor air quality, and probiotic care terminology explained." },
      { property: "og:title", content: "Glossary of Terms | EnviroBiotics" },
      { property: "og:description", content: "Microbiology, indoor air quality, and probiotic care terminology explained." },
      { property: "og:url", content: "https://envirobiotics.com/glossary" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Glossary of Terms | EnviroBiotics" },
      { name: "twitter:description", content: "Microbiology, indoor air quality, and probiotic care terminology explained." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/glossary" },
    ],
  }),
  component: Page,
});
