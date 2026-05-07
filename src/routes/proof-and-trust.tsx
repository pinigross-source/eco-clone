import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ProofAndTrustPage";

export const Route = createFileRoute("/proof-and-trust")({
  component: Page,
});
