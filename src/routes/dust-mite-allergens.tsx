import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/DustMiteAllergensPage";

export const Route = createFileRoute("/dust-mite-allergens")({
  component: Page,
});
