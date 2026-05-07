import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AffiliateRedirectPage";

export const Route = createFileRoute("/aff/$id")({
  component: Page,
});
