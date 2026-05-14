import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/PetDanderPage";

export const Route = createFileRoute("/pet-dander")({
  component: Page,
});
