import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AffiliateSignupPage";

export const Route = createFileRoute("/affiliate-signup")({
  component: Page,
});
