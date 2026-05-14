import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/HVACPage";

export const Route = createFileRoute("/hvac")({
  head: () => ({
    meta: [
      { title: "Whole-Home Probiotic HVAC Delivery | EnviroBiotics" },
      { name: "description", content: "Deliver beneficial probiotics through your HVAC system for whole-home microbial balance." },
      { property: "og:title", content: "Whole-Home Probiotic HVAC Delivery | EnviroBiotics" },
      { property: "og:description", content: "Deliver beneficial probiotics through your HVAC system for whole-home microbial balance." },
      { property: "og:url", content: "https://envirobiotics.com/hvac" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Whole-Home Probiotic HVAC Delivery | EnviroBiotics" },
      { name: "twitter:description", content: "Deliver beneficial probiotics through your HVAC system for whole-home microbial balance." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/hvac" },
    ],
  }),
  component: Page,
});
