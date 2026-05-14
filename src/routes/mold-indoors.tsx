import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/MoldIndoorsPage";

export const Route = createFileRoute("/mold-indoors")({
  component: Page,
});
