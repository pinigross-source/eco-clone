import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/WarrantyPolicyPage";

export const Route = createFileRoute("/warranty-policy")({
  component: Page,
});
