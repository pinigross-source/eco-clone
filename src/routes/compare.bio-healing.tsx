import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CompareBioHealingPage";

export const Route = createFileRoute("/compare/bio-healing")({
  component: Page,
});
