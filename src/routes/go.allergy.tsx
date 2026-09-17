import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AllergyLandingPage";

export const Route = createFileRoute("/go/allergy")({
  head: () => ({
    meta: [
      { title: "Clean the Whole Room. Not Just the Air. | EnviroBiotics" },
      {
        name: "description",
        content:
          "Environmental probiotics that continuously reduce dust, dander, pollen, and mold on every surface and in the air. 30-day home trial.",
      },
      { name: "robots", content: "noindex,follow" },
      { property: "og:title", content: "Clean the Whole Room. Not Just the Air. | EnviroBiotics" },
      {
        property: "og:description",
        content:
          "Air purifiers only clean the air. EnviroBiotics treats every surface and object in the room too.",
      },
      { property: "og:url", content: "https://envirobiotics.com/allergy" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/allergy" }],
  }),
  component: () => <Page offer="meta15" />,
});
