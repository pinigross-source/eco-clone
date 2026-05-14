import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/FdaGrasStatusPage";

export const Route = createFileRoute("/fda-gras-status")({
  component: Page,
});
