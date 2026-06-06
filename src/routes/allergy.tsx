import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AllergyLandingPage";

export const Route = createFileRoute("/allergy")({
  head: () => ({
    meta: [
      { title: "Surface Allergen Control for Your Home | EnviroBiotics" },
      {
        name: "description",
        content:
          "Air purifiers only catch airborne particles. Most household allergens settle into your mattress, carpet, and couch — out of the filter's reach. EnviroBiotics works on those surfaces. Meet Biotica.",
      },
      { property: "og:title", content: "Surface Allergen Control for Your Home | EnviroBiotics" },
      {
        property: "og:description",
        content:
          "Air purifiers only catch airborne particles. Most household allergens live in the mattress, carpet, and couch. EnviroBiotics reaches what your filter can't.",
      },
      { property: "og:url", content: "https://envirobiotics.com/allergy" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/allergy" }],
  }),
  component: Page,
});
