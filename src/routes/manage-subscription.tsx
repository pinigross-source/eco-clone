import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ManageSubscriptionPage";

export const Route = createFileRoute("/manage-subscription")({
  component: Page,
});
