import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/VideosPage";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos and Demos | EnviroBiotics" },
      { name: "description", content: "Demonstrations, explainers, and customer stories from EnviroBiotics." },
      { property: "og:title", content: "Videos and Demos | EnviroBiotics" },
      { property: "og:description", content: "Demonstrations, explainers, and customer stories from EnviroBiotics." },
      { property: "og:url", content: "https://envirobiotics.com/videos" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Videos and Demos | EnviroBiotics" },
      { name: "twitter:description", content: "Demonstrations, explainers, and customer stories from EnviroBiotics." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/videos" },
    ],
  }),
  component: Page,
});
