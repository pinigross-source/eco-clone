import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/HVACPage";

export const Route = createFileRoute("/hvac")({
  component: Page,
});
