import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/HealthBenefitsPage";

export const Route = createFileRoute("/health-benefits")({
  component: Page,
});
