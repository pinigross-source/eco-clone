import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AeroLandingPage";

export const Route = createFileRoute("/aero")({
  head: () => ({
    meta: [
      {
        title: "EnviroBiotics Aero: Effortless, Probiotic Clean Air | EnviroBiotics",
      },
      {
        name: "description",
        content:
          "A beautifully engineered probiotic system for the modern home. Effortless wellness for the air, bedding, sofas, and every surface. Save 10% with code AERO.",
      },
      {
        property: "og:title",
        content: "EnviroBiotics Aero: Effortless, Probiotic Clean Air | EnviroBiotics",
      },
      {
        property: "og:description",
        content:
          "Design-led, whisper-quiet probiotic protection for the modern home. Save 10% with code AERO.",
      },
      { property: "og:url", content: "https://envirobiotics.com/aero" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/aero" }],
  }),
  component: Page,
});
