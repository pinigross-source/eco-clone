import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/HomePage";
import desktopHeroAsset from "@/assets/home-hero-static-desktop-2.avif.asset.json";
import mobileHeroAsset from "@/assets/home-hero-mobile-3.avif.asset.json";

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
      { rel: "preload", as: "image", href: mobileHeroAsset.url, type: "image/avif", media: "(max-width: 767px)", fetchPriority: "high" },
      { rel: "preload", as: "image", href: desktopHeroAsset.url, type: "image/avif", media: "(min-width: 768px)", fetchPriority: "high" },
    ],
  }),
  component: Index,
});
