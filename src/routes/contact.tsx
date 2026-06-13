import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact EnviroBiotics  Sales & Support" },
      { name: "description", content: "Get in touch with EnviroBiotics for product questions, support, or wholesale inquiries." },
      { property: "og:title", content: "Contact EnviroBiotics  Sales & Support" },
      { property: "og:description", content: "Get in touch with EnviroBiotics for product questions, support, or wholesale inquiries." },
      { property: "og:url", content: "https://envirobiotics.com/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Contact EnviroBiotics  Sales & Support" },
      { name: "twitter:description", content: "Get in touch with EnviroBiotics for product questions, support, or wholesale inquiries." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/contact" },
    ],
  }),
  component: Page,
});
