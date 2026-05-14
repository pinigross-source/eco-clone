import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CompareUVCPage";

export const Route = createFileRoute("/compare/uvc")({
  head: () => ({
    meta: [
      { title: "EnviroBiotics vs. UVC Sterilization" },
      { name: "description", content: "How probiotic surface care compares to UVC sterilization." },
      { property: "og:title", content: "EnviroBiotics vs. UVC Sterilization" },
      { property: "og:description", content: "How probiotic surface care compares to UVC sterilization." },
      { property: "og:url", content: "https://envirobiotics.com/compare/uvc" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "EnviroBiotics vs. UVC Sterilization" },
      { name: "twitter:description", content: "How probiotic surface care compares to UVC sterilization." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/compare/uvc" },
    ],
  }),
  component: Page,
});
