import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/IndoorMicrobiomePage";

export const Route = createFileRoute("/indoor-microbiome")({
  component: Page,
});
