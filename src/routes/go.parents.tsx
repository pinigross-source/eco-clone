import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ParentsLandingPage";

export const Route = createFileRoute("/go/parents")({
  head: () => ({
    meta: [
      { title: "Nursery Surface & Air Care for Babies | EnviroBiotics" },
      {
        name: "description",
        content:
          "Air purifiers only clean the air. EnviroBiotics keeps the surfaces your baby lives on cleaner: crib, playmat, floor. Meet The Mini.",
      },
      { name: "robots", content: "noindex,follow" },
      { property: "og:title", content: "Nursery Surface & Air Care for Babies | EnviroBiotics" },
      {
        property: "og:description",
        content:
          "Air purifiers only clean the air. EnviroBiotics keeps the surfaces your baby lives on cleaner. Meet The Mini.",
      },
      { property: "og:url", content: "https://envirobiotics.com/parents" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/parents" }],
  }),
  component: () => <Page offer="meta15" />,
});
