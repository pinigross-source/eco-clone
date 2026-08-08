import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/BeyondBleachPage";

const title = "Beyond Bleach: Continuous Indoor Microbiome Care | EnviroBiotics";
const description =
  "Cleaning is a moment in time. See how EnviroBiotics works continuously between cleanings with environmental probiotics that support indoor microbial balance.";

export const Route = createFileRoute("/beyond-bleach")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://envirobiotics.com/beyond-bleach" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/beyond-bleach" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: Page,
});
