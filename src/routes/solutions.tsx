import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/SolutionsPage";

export const Route = createFileRoute("/solutions")({
  component: Page,
});
