import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bobby")({
  loader: () => {
    throw redirect({ to: "/" });
  },
});
