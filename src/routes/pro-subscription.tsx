import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ProSubPage";

export const Route = createFileRoute("/pro-subscription")({
  component: Page,
});
