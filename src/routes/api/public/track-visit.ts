import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const s = (max = 500) => z.string().max(max).optional().nullable();

const Schema = z.object({
  visitor_id: z.string().min(1).max(100),
  session_id: s(100),
  landing_page: z.string().min(1).max(500),
  referrer: s(1000),
  utm_source: s(200),
  utm_medium: s(200),
  utm_campaign: s(300),
  utm_content: s(300),
  utm_term: s(300),
  ad_id: s(100),
  adset_id: s(100),
  click_id: s(500),
  click_id_type: s(50),
});

export const Route = createFileRoute("/api/public/track-visit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const parsed = Schema.safeParse(await request.json());
          if (!parsed.success) {
            return Response.json({ error: "Invalid input" }, { status: 400 });
          }
          const { supabaseAdmin } = await import(
            "@/integrations/supabase/client.server"
          );
          const { error } = await supabaseAdmin
            .from("attribution_visits")
            .insert({
              ...parsed.data,
              user_agent: (request.headers.get("user-agent") ?? "").slice(0, 400),
            });
          if (error) {
            console.error("[track-visit]", error.message);
            return Response.json({ error: "Insert failed" }, { status: 500 });
          }
          return Response.json({ ok: true });
        } catch {
          return Response.json({ error: "Bad request" }, { status: 400 });
        }
      },
    },
  },
});
