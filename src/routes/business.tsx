import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/BusinessPage";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "For Hotels, Offices, Gyms & Clinics | EnviroBiotics" },
      { name: "description", content: "Probiotic environmental care for hotels, healthcare, schools and offices. HVAC-connected coverage of surfaces, objects, air and ducts, 24/7. Free facility quote." },
      { property: "og:title", content: "For Hotels, Offices, Gyms & Clinics | EnviroBiotics" },
      { property: "og:description", content: "Whole-building probiotic air and surface solutions. Book a free facility assessment." },
      { property: "og:url", content: "https://envirobiotics.com/business" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://cdn.shopify.com/s/files/1/0785/0826/1628/files/ebh-business-lobby.jpg?v=1791650520&width=2000" },
      { name: "twitter:image", content: "https://cdn.shopify.com/s/files/1/0785/0826/1628/files/ebh-business-lobby.jpg?v=1791650520&width=2000" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "For Hotels, Offices, Gyms & Clinics | EnviroBiotics" },
      { name: "twitter:description", content: "Whole-building probiotic air and surface solutions. Book a free facility assessment." },
    ],
    links: [{ rel: "canonical", href: "https://envirobiotics.com/business" }],
  }),
  component: Page,
});
