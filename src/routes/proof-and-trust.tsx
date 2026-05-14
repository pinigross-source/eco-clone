import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ProofAndTrustPage";

export const Route = createFileRoute("/proof-and-trust")({
  head: () => ({
    meta: [
      { title: "Proof and Trust | EnviroBiotics" },
      { name: "description", content: "Testing data, certifications, and third-party validation of EnviroBiotics products." },
      { property: "og:title", content: "Proof and Trust | EnviroBiotics" },
      { property: "og:description", content: "Testing data, certifications, and third-party validation of EnviroBiotics products." },
      { property: "og:url", content: "https://envirobiotics.com/proof-and-trust" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Proof and Trust | EnviroBiotics" },
      { name: "twitter:description", content: "Testing data, certifications, and third-party validation of EnviroBiotics products." },
    ],
    links: [
      { rel: "canonical", href: "https://envirobiotics.com/proof-and-trust" },
    ],
  }),
  component: Page,
});
