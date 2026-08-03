import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/BusinessPage";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "For Hotels, Offices, Gyms & Clinics | EnviroBiotics" },
      { name: "description", content: "Probiotic environmental care for hotels, healthcare, schools, and offices. Continuous HVAC-connected coverage of surfaces, objects, and air." },
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
