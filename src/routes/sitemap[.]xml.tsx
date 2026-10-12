import { createFileRoute } from "@tanstack/react-router";

// The app is staff/ad-only and noindexed; the store owns the sitemap.
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => new Response("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex, nofollow" } }),
    },
  },
});
