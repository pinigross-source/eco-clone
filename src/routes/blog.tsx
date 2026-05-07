import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/BlogPage";

export const Route = createFileRoute("/blog")({
  component: Page,
});
