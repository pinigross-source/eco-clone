import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/OrderHistoryPage";

export const Route = createFileRoute("/order-history")({
  component: Page,
});
