import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/DormLandingPage";

export const Route = createFileRoute("/dorm")({
  head: () => ({
    meta: [
      { title: "EnviroBiotics for Dorm Rooms" },
      { name: "description", content: "Probiotic air and surface care designed for shared living spaces and dorm rooms." },
      { property: "og:title", content: "EnviroBiotics for Dorm Rooms" },
      { property: "og:description", content: "Probiotic air and surface care designed for shared living spaces and dorm rooms." },
      { property: "og:url", content: "https://envirobiotics.com/dorm" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "EnviroBiotics for Dorm Rooms" },
      { name: "twitter:description", content: "Probiotic air and surface care designed for shared living spaces and dorm rooms." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/dorm" },
    ],
  }),
  component: Page,
});
