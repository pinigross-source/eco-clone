import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AffiliateDashboardPage";

export const Route = createFileRoute("/affiliate-dashboard")({
  component: Page,
});
