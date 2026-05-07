import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ProductRegistrationPage";

export const Route = createFileRoute("/product-registration")({
  component: Page,
});
