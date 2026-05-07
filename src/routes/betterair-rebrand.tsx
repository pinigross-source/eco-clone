import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/BetterAirRebrandPage";

export const Route = createFileRoute("/betterair-rebrand")({
  component: Page,
});
