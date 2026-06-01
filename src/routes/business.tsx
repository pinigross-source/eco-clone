import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/BusinessPage";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "For Hotels, Offices, Gyms & Clinics | EnviroBiotics" },
      { name: "description", content: "Whole-building probiotic air and surface solutions for hospitality, commercial, fitness, and clinical facilities. Book a free facility assessment." },
      { property: "og:title", content: "For Hotels, Offices, Gyms & Clinics | EnviroBiotics" },
      { property: "og:description", content: "Whole-building probiotic air and surface solutions. Book a free facility assessment." },
      { property: "og:url", content: "https://envirobiotics.com/business" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "For Hotels, Offices, Gyms & Clinics | EnviroBiotics" },
      { name: "twitter:description", content: "Whole-building probiotic air and surface solutions. Book a free facility assessment." },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/business" }],
  }),
  component: Page,
});
