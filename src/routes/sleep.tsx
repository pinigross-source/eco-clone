import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/SleepLandingPage";

export const Route = createFileRoute("/sleep")({
  head: () => ({
    meta: [
      {
        title: "Probiotic Air & Surface Care for Better Sleep | EnviroBiotics",
      },
      {
        name: "description",
        content:
          "A fresher bedroom for deeper rest. Whisper-quiet, no blue lights, chemical-free. Cleaner air and bedding while you sleep. Save 10% with code SLEEP.",
      },
      {
        property: "og:title",
        content: "Probiotic Air & Surface Care for Better Sleep | EnviroBiotics",
      },
      {
        property: "og:description",
        content:
          "Probiotic protection for the air, pillows, bedding, and every surface you sleep against. Whisper-quiet, no blue lights.",
      },
      { property: "og:url", content: "https://envirobiotics.com/sleep" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/sleep" }],
  }),
  component: Page,
});
