import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/BobbyParrishLandingPage";

export const Route = createFileRoute("/bobby")({
  head: () => ({
    meta: [
      { title: "Bobby Parrish × EnviroBiotics | Probiotic Air & Surface Care" },
      {
        name: "description",
        content:
          "Bobby Parrish's favorite holistic purifier. Probiotic protection for every surface, 24/7. Chemical-free, safe for pets and kids.",
      },
      { property: "og:title", content: "Bobby Parrish × EnviroBiotics" },
      {
        property: "og:description",
        content:
          "Bobby Parrish's favorite holistic purifier. Probiotic protection for every surface, 24/7.",
      },
      { property: "og:url", content: "https://envirobiotics.com/bobby" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/bobby" }],
  }),
  component: Page,
});
