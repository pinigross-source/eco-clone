import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About EnviroBiotics — Our Mission & Team" },
      { name: "description", content: "Meet the team behind EnviroBiotics and learn how probiotic environmental care became our mission." },
      { property: "og:title", content: "About EnviroBiotics — Our Mission & Team" },
      { property: "og:description", content: "Meet the team behind EnviroBiotics and learn how probiotic environmental care became our mission." },
      { property: "og:url", content: "https://envirobiotics.com/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "About EnviroBiotics — Our Mission & Team" },
      { name: "twitter:description", content: "Meet the team behind EnviroBiotics and learn how probiotic environmental care became our mission." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/about" },
    ],
  }),
  component: Page,
});
