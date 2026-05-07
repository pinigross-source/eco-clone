import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/VideosPage";

export const Route = createFileRoute("/videos")({
  component: Page,
});
