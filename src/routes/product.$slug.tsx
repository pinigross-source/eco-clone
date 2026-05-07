import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ProductDetailPage";

export const Route = createFileRoute("/product/$slug")({
  component: Page,
});
