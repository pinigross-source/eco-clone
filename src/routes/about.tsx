import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About EnviroBiotics  Our Mission & Team" },
      { name: "description", content: "Learn about EnviroBiotics  formerly BetterAir  the world's first probiotic air purification brand. Founded in Israel, now bringing beneficial probiotics to homes worldwide." },
      { property: "og:title", content: "About EnviroBiotics  Our Mission & Team" },
      { property: "og:description", content: "Learn about EnviroBiotics  formerly BetterAir  the world's first probiotic air purification brand. Founded in Israel, now bringing beneficial probiotics to homes worldwide." },
      { property: "og:url", content: "https://envirobiotics.com/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "About EnviroBiotics  Our Mission & Team" },
      { name: "twitter:description", content: "Learn about EnviroBiotics  formerly BetterAir  the world's first probiotic air purification brand. Founded in Israel, now bringing beneficial probiotics to homes worldwide." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/about" },
    ],
  }),
  component: Page,
});
