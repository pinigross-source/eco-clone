import { createFileRoute } from "@tanstack/react-router";
import AuthorPage from "@/pages/AuthorPage";

export const Route = createFileRoute("/author/$slug")({
  component: AuthorPage,
});
