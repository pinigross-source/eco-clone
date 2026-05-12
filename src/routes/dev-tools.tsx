import { createFileRoute, notFound } from "@tanstack/react-router";
import Page from "@/pages/DevToolsPage";
import { isTestEnv } from "@/lib/env";

export const Route = createFileRoute("/dev-tools")({
  beforeLoad: () => {
    if (!isTestEnv) throw notFound();
  },
  component: Page,
});
