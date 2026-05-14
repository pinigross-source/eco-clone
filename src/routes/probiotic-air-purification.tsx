import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ProbioticAirPurificationPage";

export const Route = createFileRoute("/probiotic-air-purification")({
  head: () => ({
    meta: [
      { title: "What Is Probiotic Air Purification? | EnviroBiotics" },
      { name: "description", content: "How probiotic air purification differs from HEPA, UVC, and chemical disinfection." },
      { property: "og:title", content: "What Is Probiotic Air Purification? | EnviroBiotics" },
      { property: "og:description", content: "How probiotic air purification differs from HEPA, UVC, and chemical disinfection." },
      { property: "og:url", content: "https://envirobiotics.com/probiotic-air-purification" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "What Is Probiotic Air Purification? | EnviroBiotics" },
      { name: "twitter:description", content: "How probiotic air purification differs from HEPA, UVC, and chemical disinfection." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/probiotic-air-purification" },
    ],
  }),
  component: Page,
});
