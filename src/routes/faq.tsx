import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/FAQPage";

export const Route = createFileRoute("/faq")({
  component: Page,
});
