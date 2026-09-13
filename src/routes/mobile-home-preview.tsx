import { createFileRoute } from "@tanstack/react-router";
import MobileHomePreviewPage from "@/pages/MobileHomePreviewPage";
import miniAsset from "@/assets/biologic-mini-new.jpg.asset.json";

export const Route = createFileRoute("/mobile-home-preview")({
  head: () => ({
    meta: [
      { title: "Homepage Review — EnviroBiotics" },
      {
        name: "description",
        content: "Review the mobile-first EnviroBiotics homepage concept for automatic probiotic room care.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "googlebot", content: "noindex, nofollow" },
      { property: "og:title", content: "Homepage Review — EnviroBiotics" },
      {
        property: "og:description",
        content: "A private review of the mobile-first EnviroBiotics homepage concept.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://envirobiotics.com/mobile-home-preview" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/mobile-home-preview" },
      { rel: "preload", as: "image", href: miniAsset.url, fetchPriority: "high" },
    ],
  }),
  component: MobileHomePreviewPage,
});