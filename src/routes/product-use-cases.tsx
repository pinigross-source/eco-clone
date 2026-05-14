import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ProductUseCasesPage";

export const Route = createFileRoute("/product-use-cases")({
  head: () => ({
    meta: [
      { title: "Product Use Cases | EnviroBiotics" },
      { name: "description", content: "Where and how customers use EnviroBiotics probiotic products." },
      { property: "og:title", content: "Product Use Cases | EnviroBiotics" },
      { property: "og:description", content: "Where and how customers use EnviroBiotics probiotic products." },
      { property: "og:url", content: "https://envirobiotics.com/product-use-cases" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Product Use Cases | EnviroBiotics" },
      { name: "twitter:description", content: "Where and how customers use EnviroBiotics probiotic products." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/product-use-cases" },
    ],
  }),
  component: Page,
});
