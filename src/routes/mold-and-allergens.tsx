import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/MoldAndAllergensPage";

export const Route = createFileRoute("/mold-and-allergens")({
  component: Page,
});
