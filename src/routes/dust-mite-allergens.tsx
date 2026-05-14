import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/DustMiteAllergensPage";

export const Route = createFileRoute("/dust-mite-allergens")({
  head: () => ({
    meta: [
      { title: "Dust Mite Allergens Explained | EnviroBiotics" },
      { name: "description", content: "How dust mites build up indoors and what reduces their allergen load." },
      { property: "og:title", content: "Dust Mite Allergens Explained | EnviroBiotics" },
      { property: "og:description", content: "How dust mites build up indoors and what reduces their allergen load." },
      { property: "og:url", content: "https://envirobiotics.com/dust-mite-allergens" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Dust Mite Allergens Explained | EnviroBiotics" },
      { name: "twitter:description", content: "How dust mites build up indoors and what reduces their allergen load." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/dust-mite-allergens" },
    ],
  }),
  component: Page,
});
