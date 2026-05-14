import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/HVACApplicationsPage";

export const Route = createFileRoute("/hvac-applications")({
  head: () => ({
    meta: [
      { title: "HVAC Applications for Probiotic Air Care" },
      { name: "description", content: "Commercial and residential HVAC applications for probiotic environmental care." },
      { property: "og:title", content: "HVAC Applications for Probiotic Air Care" },
      { property: "og:description", content: "Commercial and residential HVAC applications for probiotic environmental care." },
      { property: "og:url", content: "https://envirobiotics.com/hvac-applications" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "HVAC Applications for Probiotic Air Care" },
      { name: "twitter:description", content: "Commercial and residential HVAC applications for probiotic environmental care." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/hvac-applications" },
    ],
  }),
  component: Page,
});
