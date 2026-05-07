import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CompareUVCPage";

export const Route = createFileRoute("/compare/uvc")({
  component: Page,
});
