import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/WellnessCROPage";

export const Route = createFileRoute("/go/wellness")({
  head: () => ({
    meta: [
      { title: "Environmental Wellness for Your Home | EnviroBiotics" },
      {
        name: "description",
        content:
          "The missing environmental layer of a complete wellness routine. Continuous probiotic support for your main living area and bedroom.",
      },
      { name: "robots", content: "noindex,follow" },
      { property: "og:title", content: "Environmental Wellness for Your Home | EnviroBiotics" },
      {
        property: "og:description",
        content:
          "The missing environmental layer of a complete wellness routine. Setup in about 60 seconds. 30-day home trial.",
      },
      { property: "og:url", content: "https://envirobiotics.com/wellness" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/wellness" }],
  }),
  component: () => <Page offer="meta15" />,
});
