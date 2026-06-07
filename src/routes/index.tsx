import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EnviroBiotics Probiotic Air & Surface Care" },
      { name: "description", content: "EnviroBiotics probiotic air and surface purifiers use beneficial bacteria to outcompete mold, allergens, and bacteria naturally. Formerly BetterAir. Shop now." },
      { property: "og:title", content: "EnviroBiotics Probiotic Air & Surface Care" },
      { property: "og:description", content: "EnviroBiotics probiotic air and surface purifiers use beneficial bacteria to outcompete mold, allergens, and bacteria naturally. Formerly BetterAir. Shop now." },
      { property: "og:url", content: "https://envirobiotics.com/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "EnviroBiotics Probiotic Air & Surface Care" },
      { name: "twitter:description", content: "EnviroBiotics probiotic air and surface purifiers use beneficial bacteria to outcompete mold, allergens, and bacteria naturally. Formerly BetterAir. Shop now." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/" },
      { rel: "preload", as: "image", href: "/hero-vimeo-poster.jpg", fetchpriority: "high" },
    ],
  }),
  component: Index,
});
