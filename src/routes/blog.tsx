import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/BlogPage";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | EnviroBiotics" },
      { name: "description", content: "Articles, updates, and deep dives on probiotic environmental care." },
      { property: "og:title", content: "Blog | EnviroBiotics" },
      { property: "og:description", content: "Articles, updates, and deep dives on probiotic environmental care." },
      { property: "og:url", content: "https://envirobiotics.com/blog" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Blog | EnviroBiotics" },
      { name: "twitter:description", content: "Articles, updates, and deep dives on probiotic environmental care." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/blog" },
    ],
  }),
  component: Page,
});
