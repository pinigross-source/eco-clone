import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ResearchPage";

export const Route = createFileRoute("/research")({
  component: Page,
});
