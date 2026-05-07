import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/RoomSolutionsPage";

export const Route = createFileRoute("/solutions/room")({
  component: Page,
});
