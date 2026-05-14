import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/PetDanderPage";

export const Route = createFileRoute("/pet-dander")({
  head: () => ({
    meta: [
      { title: "Reducing Pet Dander Indoors | EnviroBiotics" },
      { name: "description", content: "Strategies for reducing pet dander allergens with probiotic surface and air care." },
      { property: "og:title", content: "Reducing Pet Dander Indoors | EnviroBiotics" },
      { property: "og:description", content: "Strategies for reducing pet dander allergens with probiotic surface and air care." },
      { property: "og:url", content: "https://envirobiotics.com/pet-dander" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Reducing Pet Dander Indoors | EnviroBiotics" },
      { name: "twitter:description", content: "Strategies for reducing pet dander allergens with probiotic surface and air care." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/pet-dander" },
    ],
  }),
  component: Page,
});
