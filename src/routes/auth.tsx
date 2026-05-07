import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AuthPage";

export const Route = createFileRoute("/auth")({
  component: Page,
});
