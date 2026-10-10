import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/HowItWorksPage";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How EnviroBiotics Works | Natural Probiotics for Odor, Mold and Allergens" },
      { name: "description", content: "Why the smell comes back, and how natural probiotics settle on sofas, rugs and pet beds and keep working on odor, mold and allergens every day." },
      { property: "og:title", content: "How EnviroBiotics Works | Natural Probiotics for Odor, Mold and Allergens" },
      { property: "og:description", content: "Why the smell comes back, and how natural probiotics settle on sofas, rugs and pet beds and keep working on odor, mold and allergens every day." },
      { property: "og:url", content: "https://envirobiotics.com/how-it-works" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "How EnviroBiotics Works | Natural Probiotics for Odor, Mold and Allergens" },
      { name: "twitter:description", content: "Why the smell comes back, and how natural probiotics settle on sofas, rugs and pet beds and keep working on odor, mold and allergens every day." },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://cdn.shopify.com/s/files/1/0785/0826/1628/files/ebh-mini-studio.png?v=1791647578&width=1200&format=jpg" },
      { name: "twitter:image", content: "https://cdn.shopify.com/s/files/1/0785/0826/1628/files/ebh-mini-studio.png?v=1791647578&width=1200&format=jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/how-it-works" },
    ],
  }),
  component: Page,
});
