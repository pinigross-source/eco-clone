import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/PetsLandingPage";

export const Route = createFileRoute("/go/pets")({
  head: () => ({
    meta: [
      { title: "Probiotic Air & Surface Care for Pet Homes | EnviroBiotics" },
      {
        name: "description",
        content:
          "Tackle pet dander and odors on beds, sofas, and floors with pet-safe, non-toxic probiotic care. 30-day home trial.",
      },
      { name: "robots", content: "noindex,follow" },
      { property: "og:title", content: "Probiotic Air & Surface Care for Pet Homes | EnviroBiotics" },
      {
        property: "og:description",
        content:
          "Probiotic protection for the air, pet beds, sofas, and every surface your animals touch. Safe for cats, dogs & family.",
      },
      { property: "og:url", content: "https://envirobiotics.com/pets" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/pets" }],
  }),
  component: () => <Page offer="meta15" />,
});
