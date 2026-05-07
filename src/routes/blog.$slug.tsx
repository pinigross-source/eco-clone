import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/BlogPostPage";

export const Route = createFileRoute("/blog/$slug")({
  component: Page,
});
