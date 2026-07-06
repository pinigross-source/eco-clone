import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ActiveFamiliesLandingPage";

export const Route = createFileRoute("/active-families")({
  head: () => ({
    meta: [
      { title: "A Layer of Wellness for Active Families | EnviroBiotics" },
      {
        name: "description",
        content:
          "For families who eat well, move often, and want a home that keeps up. EnviroBiotics quietly balances the surfaces you live on, without sprays or filters.",
      },
      { property: "og:title", content: "A Layer of Wellness for Active Families | EnviroBiotics" },
      {
        property: "og:description",
        content:
          "For families who eat well, move often, and want a home that keeps up. EnviroBiotics quietly balances the surfaces you live on.",
      },
      { property: "og:url", content: "https://envirobiotics.com/active-families" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/active-families" }],
  }),
  component: Page,
});
