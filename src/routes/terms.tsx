import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/TermsPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | EnviroBiotics" },
      { name: "description", content: "The terms governing your use of the EnviroBiotics website and services." },
      { property: "og:title", content: "Terms of Service | EnviroBiotics" },
      { property: "og:description", content: "The terms governing your use of the EnviroBiotics website and services." },
      { property: "og:url", content: "https://envirobiotics.com/terms" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Terms of Service | EnviroBiotics" },
      { name: "twitter:description", content: "The terms governing your use of the EnviroBiotics website and services." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/terms" },
    ],
  }),
  component: Page,
});
