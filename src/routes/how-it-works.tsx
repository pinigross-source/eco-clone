import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/HowItWorksPage";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How EnviroBiotics Works — Probiotic Purification" },
      { name: "description", content: "How probiotic purification settles on surfaces and circulates through the air to keep indoor environments balanced." },
      { property: "og:title", content: "How EnviroBiotics Works — Probiotic Purification" },
      { property: "og:description", content: "How probiotic purification settles on surfaces and circulates through the air to keep indoor environments balanced." },
      { property: "og:url", content: "https://envirobiotics.com/how-it-works" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "How EnviroBiotics Works — Probiotic Purification" },
      { name: "twitter:description", content: "How probiotic purification settles on surfaces and circulates through the air to keep indoor environments balanced." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/how-it-works" },
    ],
  }),
  component: Page,
});
