import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/WarrantyPolicyPage";

export const Route = createFileRoute("/warranty-policy")({
  head: () => ({
    meta: [
      { title: "Warranty Policy | EnviroBiotics" },
      { name: "description", content: "EnviroBiotics product warranty terms and coverage." },
      { property: "og:title", content: "Warranty Policy | EnviroBiotics" },
      { property: "og:description", content: "EnviroBiotics product warranty terms and coverage." },
      { property: "og:url", content: "https://envirobiotics.com/warranty-policy" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Warranty Policy | EnviroBiotics" },
      { name: "twitter:description", content: "EnviroBiotics product warranty terms and coverage." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/warranty-policy" },
    ],
  }),
  component: Page,
});
