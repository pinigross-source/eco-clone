import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/TermsPage";

export const Route = createFileRoute("/terms")({
  component: Page,
});
