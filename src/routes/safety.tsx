import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/SafetyPage";

export const Route = createFileRoute("/safety")({
  component: Page,
});
