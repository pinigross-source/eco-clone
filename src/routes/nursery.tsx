import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/NurseryLandingPage";

export const Route = createFileRoute("/nursery")({
  component: Page,
});
