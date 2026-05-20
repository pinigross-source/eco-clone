import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ParentsLandingPage";

export const Route = createFileRoute("/parents")({
  head: () => ({
    meta: [
      {
        title: "Probiotic Air & Surface Care for Families | EnviroBiotics",
      },
      {
        name: "description",
        content:
          "Cleaner air and safer surfaces for nurseries, playrooms, and bedrooms. Chemical-free, safe for kids and pets. Save 10% with code PARENTS.",
      },
      {
        property: "og:title",
        content: "Probiotic Air & Surface Care for Families | EnviroBiotics",
      },
      {
        property: "og:description",
        content:
          "Probiotic protection for the air and every surface your kids touch, cribs, toys, bedding. Safe for kids & pets.",
      },
      { property: "og:url", content: "https://envirobiotics.com/parents" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/parents" }],
  }),
  component: Page,
});
