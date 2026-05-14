import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/ProbioticVsChemicalPage";

export const Route = createFileRoute("/probiotic-vs-chemical")({
  component: Page,
});
