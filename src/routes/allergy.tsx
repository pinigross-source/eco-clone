import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AllergyLandingPage";

export const Route = createFileRoute("/allergy")({
  head: () => ({
    meta: [
      { title: "Whole-Room Coverage for Your Home | EnviroBiotics" },
      {
        name: "description",
        content:
          "Air purifiers only treat the air. EnviroBiotics helps cover the surfaces your purifier cannot reach — mattresses, bedding, furniture, carpets, and other indoor surfaces.",
      },
      { property: "og:title", content: "Whole-Room Coverage for Your Home | EnviroBiotics" },
      {
        property: "og:description",
        content:
          "Air purifiers only treat the air. EnviroBiotics helps cover the surfaces your purifier cannot reach — mattresses, bedding, furniture, carpets, and other indoor surfaces.",
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
