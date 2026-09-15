import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/SpaWellnessPage";

const TITLE = "Environmental Wellness for Spas & Wellness Centers | EnviroBiotics";
const DESCRIPTION =
  "Probiotic environmental purification for spas, wellness centers, and resorts. Continuous support across air, surfaces, and objects between cleaning cycles.";

export const Route = createFileRoute("/spa-wellness")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://envirobiotics.com/spa-wellness" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/spa-wellness" }],
  }),
  component: Page,
});
