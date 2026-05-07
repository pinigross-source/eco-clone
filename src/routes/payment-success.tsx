import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/PaymentSuccessPage";

export const Route = createFileRoute("/payment-success")({
  component: Page,
});
