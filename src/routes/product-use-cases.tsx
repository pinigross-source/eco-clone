import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ProductUseCasesPage";

export const Route = createFileRoute("/product-use-cases")({
  component: Page,
});
