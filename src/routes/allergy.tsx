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
    links: [{ rel: "canonical", href: "https://envirobiotics.com/allergy" }],
  }),
  component: Page,
});
