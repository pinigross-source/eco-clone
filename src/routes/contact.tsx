import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ContactPage";

export const Route = createFileRoute("/contact")({
  component: Page,
});
