import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/HygieneHypothesisPage";

export const Route = createFileRoute("/hygiene-hypothesis")({
  component: Page,
});
