import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CaseStudyDetailPage";

export const Route = createFileRoute("/case-studies/$slug")({
  component: Page,
});
