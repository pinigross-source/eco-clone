import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AdminDashboardPage";

export const Route = createFileRoute("/admin")({
  component: Page,
});
