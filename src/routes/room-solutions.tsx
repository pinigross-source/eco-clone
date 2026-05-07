import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/RoomSolutionsPage";

export const Route = createFileRoute("/room-solutions")({
  component: Page,
});
