import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/SubscriptionPage";

export const Route = createFileRoute("/subscription")({
  component: Page,
});
