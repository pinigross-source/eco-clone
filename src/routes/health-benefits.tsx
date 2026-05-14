import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/HealthBenefitsPage";

export const Route = createFileRoute("/health-benefits")({
  head: () => ({
    meta: [
      { title: "Health Benefits of Probiotic Environmental Care" },
      { name: "description", content: "Reported outcomes from probiotic air and surface care in homes and clinical settings." },
      { property: "og:title", content: "Health Benefits of Probiotic Environmental Care" },
      { property: "og:description", content: "Reported outcomes from probiotic air and surface care in homes and clinical settings." },
      { property: "og:url", content: "https://envirobiotics.com/health-benefits" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Health Benefits of Probiotic Environmental Care" },
      { name: "twitter:description", content: "Reported outcomes from probiotic air and surface care in homes and clinical settings." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/health-benefits" },
    ],
  }),
  component: Page,
});
