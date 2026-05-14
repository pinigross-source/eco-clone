import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EnviroBiotics — Probiotic Air & Surface Care" },
      { name: "description", content: "Probiotic air and surface support that releases beneficial microbes for a fresher home between cleanings. Safe for families and pets." },
      { property: "og:title", content: "EnviroBiotics — Probiotic Air & Surface Care" },
      { property: "og:description", content: "Probiotic air and surface support that releases beneficial microbes for a fresher home between cleanings. Safe for families and pets." },
      { property: "og:url", content: "https://envirobiotics.com/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "EnviroBiotics — Probiotic Air & Surface Care" },
      { name: "twitter:description", content: "Probiotic air and surface support that releases beneficial microbes for a fresher home between cleanings. Safe for families and pets." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/" },
      { rel: "preload", as: "image", href: "/hero-vimeo-poster.jpg", fetchpriority: "high" },
    ],
  }),
  component: Index,
});
