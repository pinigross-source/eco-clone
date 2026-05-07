import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/SitemapPage";

export const Route = createFileRoute("/sitemap")({
  component: Page,
});
