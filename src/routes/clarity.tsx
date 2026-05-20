import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ClarityLandingPage";

export const Route = createFileRoute("/clarity")({
  head: () => ({
    meta: [
      {
        title: "Season of Clarity: Probiotic Allergy & Air Relief | EnviroBiotics",
      },
      {
        name: "description",
        content:
          "Breathe easier through allergy season. Probiotic protection on the air, bedding, sofas, and every surface where pollen and dander settle. Save 10% with code CLARITY.",
      },
      {
        property: "og:title",
        content: "Season of Clarity: Probiotic Allergy & Air Relief | EnviroBiotics",
      },
      {
        property: "og:description",
        content:
          "Probiotic protection for the air, bedding, sofas, and every surface allergens land on. Save 10% with code CLARITY.",
      },
      { property: "og:url", content: "https://envirobiotics.com/clarity" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/clarity" }],
  }),
  component: Page,
});
