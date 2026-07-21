import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/WellnessLandingPage";

export const Route = createFileRoute("/wellness")({
  head: () => ({
    meta: [
      { title: "Environmental Wellness for Your Home | EnviroBiotics" },
      {
        name: "description",
        content:
          "Your wellness routine shouldn't end at your skin. EnviroBiotics is the missing environmental layer — continuous probiotic support for your main living area and bedroom.",
      },
      { property: "og:title", content: "Environmental Wellness for Your Home | EnviroBiotics" },
      {
        property: "og:description",
        content:
          "The missing environmental layer of a complete wellness routine. Setup in ~60 seconds. 30-day guarantee.",
      },
      { property: "og:url", content: "https://envirobiotics.com/wellness" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/wellness" }],
  }),
  component: Page,
});
