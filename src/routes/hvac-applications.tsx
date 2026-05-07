import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/HVACApplicationsPage";

export const Route = createFileRoute("/hvac-applications")({
  component: Page,
});
