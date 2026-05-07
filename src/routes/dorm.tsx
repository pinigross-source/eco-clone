import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/DormLandingPage";

export const Route = createFileRoute("/dorm")({
  component: Page,
});
