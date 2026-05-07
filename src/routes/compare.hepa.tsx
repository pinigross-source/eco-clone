import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CompareHEPAPage";

export const Route = createFileRoute("/compare/hepa")({
  component: Page,
});
