import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CompetitiveExclusionPage";

export const Route = createFileRoute("/competitive-exclusion")({
  component: Page,
});
