import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AboutPage";

export const Route = createFileRoute("/about")({
  component: Page,
});
