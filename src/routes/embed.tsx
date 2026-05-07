import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/Embed";

export const Route = createFileRoute("/embed")({
  component: Page,
});
