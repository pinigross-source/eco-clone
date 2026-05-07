import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CompareChemicalFreshenersPage";

export const Route = createFileRoute("/compare/chemical-fresheners")({
  component: Page,
});
