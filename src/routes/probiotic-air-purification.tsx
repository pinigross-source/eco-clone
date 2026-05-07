import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ProbioticAirPurificationPage";

export const Route = createFileRoute("/probiotic-air-purification")({
  component: Page,
});
