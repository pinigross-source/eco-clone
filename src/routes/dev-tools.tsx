import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/DevToolsPage";

export const Route = createFileRoute("/dev-tools")({
  component: Page,
});
