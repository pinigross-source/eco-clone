import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/PrivacyPage";

export const Route = createFileRoute("/privacy")({
  component: Page,
});
