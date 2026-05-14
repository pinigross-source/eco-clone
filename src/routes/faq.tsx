import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/FAQPage";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | EnviroBiotics" },
      { name: "description", content: "Answers to the most common questions about EnviroBiotics products, safety, and use." },
      { property: "og:title", content: "Frequently Asked Questions | EnviroBiotics" },
      { property: "og:description", content: "Answers to the most common questions about EnviroBiotics products, safety, and use." },
      { property: "og:url", content: "https://envirobiotics.com/faq" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Frequently Asked Questions | EnviroBiotics" },
      { name: "twitter:description", content: "Answers to the most common questions about EnviroBiotics products, safety, and use." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/faq" },
    ],
  }),
  component: Page,
});
