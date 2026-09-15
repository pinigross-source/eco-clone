import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/meta-ads-sync")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const auth = request.headers.get("authorization");
        const expected = process.env.META_SYNC_SECRET;
        if (!expected || auth !== `Bearer ${expected}`) {
          return new Response("Unauthorized", { status: 401 });
        }

        try {
          const { syncMetaAdsInsights } = await import("@/lib/metaAds.server");
          const result = await syncMetaAdsInsights(30);
          return Response.json({ ok: true, ...result });
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          console.error("[meta-ads-sync]", message);
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
