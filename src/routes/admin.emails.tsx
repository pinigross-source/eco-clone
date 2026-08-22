import { createFileRoute, redirect } from "@tanstack/react-router";
import Page from "@/pages/EmailLogPage";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/emails")({
  head: () => ({
    meta: [
      { title: "Email Delivery Log | EnviroBiotics Admin" },
      {
        name: "description",
        content:
          "Admin-only view of every email sent by the EnviroBiotics site, including provider responses and delivery failures.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Email Delivery Log | EnviroBiotics Admin" },
      {
        property: "og:description",
        content: "Admin-only email delivery monitoring for the EnviroBiotics website.",
      },
    ],
  }),
  beforeLoad: async ({ location }) => {
    if (typeof window === "undefined") return;
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      throw redirect({ to: "/auth", search: { redirect: location.href } as never });
    }
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (!isAdmin) {
      throw redirect({ to: "/" });
    }
  },
  component: Page,
});
