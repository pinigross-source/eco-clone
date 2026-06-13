import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/MoldAndAllergensPage";

export const Route = createFileRoute("/mold-and-allergens")({
  head: () => ({
    meta: [
      { title: "Mold and Allergens Indoors | EnviroBiotics" },
      { name: "description", content: "How mold, dust mites, and pet dander interact in indoor air  and how to reduce them." },
      { property: "og:title", content: "Mold and Allergens Indoors | EnviroBiotics" },
      { property: "og:description", content: "How mold, dust mites, and pet dander interact in indoor air  and how to reduce them." },
      { property: "og:url", content: "https://envirobiotics.com/mold-and-allergens" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Mold and Allergens Indoors | EnviroBiotics" },
      { name: "twitter:description", content: "How mold, dust mites, and pet dander interact in indoor air  and how to reduce them." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/mold-and-allergens" },
    ],
  }),
  component: Page,
});
