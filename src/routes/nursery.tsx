import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/NurseryLandingPage";

export const Route = createFileRoute("/nursery")({
  head: () => ({
    meta: [
      { title: "EnviroBiotics for the Nursery" },
      { name: "description", content: "Gentle probiotic care for nurseries and children's rooms  safe around babies and pets." },
      { property: "og:title", content: "EnviroBiotics for the Nursery" },
      { property: "og:description", content: "Gentle probiotic care for nurseries and children's rooms  safe around babies and pets." },
      { property: "og:url", content: "https://envirobiotics.com/nursery" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "EnviroBiotics for the Nursery" },
      { name: "twitter:description", content: "Gentle probiotic care for nurseries and children's rooms  safe around babies and pets." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/nursery" },
    ],
  }),
  component: Page,
});
