import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/FAQPage";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | EnviroBiotics" },
      { name: "description", content: "Frequently asked questions about EnviroBiotics probiotic air purifiers  how they work, safety, coverage, and the difference from HEPA and UV purifiers." },
      { property: "og:title", content: "Frequently Asked Questions | EnviroBiotics" },
      { property: "og:description", content: "Frequently asked questions about EnviroBiotics probiotic air purifiers  how they work, safety, coverage, and the difference from HEPA and UV purifiers." },
      { property: "og:url", content: "https://envirobiotics.com/faq" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Frequently Asked Questions | EnviroBiotics" },
      { name: "twitter:description", content: "Frequently asked questions about EnviroBiotics probiotic air purifiers  how they work, safety, coverage, and the difference from HEPA and UV purifiers." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/faq" },
    ],
  }),
  component: Page,
});
