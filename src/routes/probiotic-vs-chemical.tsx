import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ProbioticVsChemicalPage";

export const Route = createFileRoute("/probiotic-vs-chemical")({
  head: () => ({
    meta: [
      { title: "Probiotic vs. Chemical Disinfection | EnviroBiotics" },
      { name: "description", content: "How probiotic surface care compares with chemical disinfectants — what each does and where each fits." },
      { property: "og:title", content: "Probiotic vs. Chemical Disinfection | EnviroBiotics" },
      { property: "og:description", content: "How probiotic surface care compares with chemical disinfectants — what each does and where each fits." },
      { property: "og:url", content: "https://envirobiotics.com/probiotic-vs-chemical" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Probiotic vs. Chemical Disinfection | EnviroBiotics" },
      { name: "twitter:description", content: "How probiotic surface care compares with chemical disinfectants — what each does and where each fits." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/probiotic-vs-chemical" },
    ],
  }),
  component: Page,
});
