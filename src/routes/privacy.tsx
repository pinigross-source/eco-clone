import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/PrivacyPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | EnviroBiotics" },
      { name: "description", content: "How EnviroBiotics collects, uses, and protects your information." },
      { property: "og:title", content: "Privacy Policy | EnviroBiotics" },
      { property: "og:description", content: "How EnviroBiotics collects, uses, and protects your information." },
      { property: "og:url", content: "https://envirobiotics.com/privacy" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Privacy Policy | EnviroBiotics" },
      { name: "twitter:description", content: "How EnviroBiotics collects, uses, and protects your information." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/privacy" },
    ],
  }),
  component: Page,
});
