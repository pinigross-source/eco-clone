import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/PetsLandingPage";

export const Route = createFileRoute("/pets")({
  head: () => ({
    meta: [
      {
        title: "Probiotic Air & Surface Care for Pet Homes | EnviroBiotics",
      },
      {
        name: "description",
        content:
          "Tackle pet dander, odors, and microbes on beds, sofas, and floors. Chemical-free, safe for cats, dogs, and the whole family. Save 10% with code PETS.",
      },
      {
        property: "og:title",
        content: "Probiotic Air & Surface Care for Pet Homes | EnviroBiotics",
      },
      {
        property: "og:description",
        content:
          "Probiotic protection for the air, pet beds, sofas, and every surface your animals touch. Safe for cats, dogs & family.",
      },
      { property: "og:url", content: "https://envirobiotics.com/pets" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/pets" }],
  }),
  component: Page,
});
