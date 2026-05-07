import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/GlossaryPage";

export const Route = createFileRoute("/glossary")({
  component: Page,
});
