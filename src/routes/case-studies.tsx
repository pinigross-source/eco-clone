import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CaseStudiesPage";

export const Route = createFileRoute("/case-studies")({
  component: Page,
});
