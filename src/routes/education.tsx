import { createFileRoute, redirect } from "@tanstack/react-router";
import Page from "@/pages/EducationPage";

export const Route = createFileRoute("/education")({
  validateSearch: (search: Record<string, unknown>) => ({
    preview: search.preview === "1" || search.preview === 1 ? "1" : undefined,
  }),
  beforeLoad: ({ search }) => {
    if (search.preview !== "1") {
      throw redirect({ to: "/" });
    }
  },
  component: Page,
});
