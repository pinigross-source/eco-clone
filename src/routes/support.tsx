import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/SupportPage";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support | EnviroBiotics" },
      { name: "description", content: "Help articles, contact options, and product support for EnviroBiotics." },
      { property: "og:title", content: "Support | EnviroBiotics" },
      { property: "og:description", content: "Help articles, contact options, and product support for EnviroBiotics." },
      { property: "og:url", content: "https://envirobiotics.com/support" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Support | EnviroBiotics" },
      { name: "twitter:description", content: "Help articles, contact options, and product support for EnviroBiotics." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/support" },
    ],
  }),
  component: Page,
});
