import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/EducationPage";

export const Route = createFileRoute("/education")({
  component: Page,
});
