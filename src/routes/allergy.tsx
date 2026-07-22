import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AllergyLandingPage";

export const Route = createFileRoute("/allergy")({
  head: () => ({
    meta: [
      { title: "Clean the Whole Room. Not Just the Air. | EnviroBiotics" },
      {
        name: "description",
        content:
          "Environmental probiotics that continuously reduce dust, dander, pollen, and mold on every surface and in the air. 30-day money-back guarantee.",
      },
      { property: "og:title", content: "Clean the Whole Room. Not Just the Air. | EnviroBiotics" },
      {
        property: "og:description",
        content:
          "Air purifiers only clean the air. EnviroBiotics treats every surface and object in the room too — bedding, sofas, floors, and more.",
      },
      { property: "og:url", content: "https://envirobiotics.com/allergy" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/allergy" },
      {
        rel: "preload",
        as: "image",
        href: "/__l5e/assets-v1/6c262e2f-f458-4ebc-8289-d5d6fe9c9f32/allergy-hero.avif",
        fetchpriority: "high",
      },
    ],
  }),
  component: Page,
});
