import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/EducationPage";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education Center | The Science of a Healthier Home" },
      { name: "description", content: "Guides on probiotic purification, the indoor microbiome, and modern hygiene science." },
      { property: "og:title", content: "Education Center | The Science of a Healthier Home" },
      { property: "og:description", content: "Guides on probiotic purification, the indoor microbiome, and modern hygiene science." },
      { property: "og:url", content: "https://envirobiotics.com/education" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Education Center | The Science of a Healthier Home" },
      { name: "twitter:description", content: "Guides on probiotic purification, the indoor microbiome, and modern hygiene science." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/education" },
    ],
  }),
  component: Page,
});
