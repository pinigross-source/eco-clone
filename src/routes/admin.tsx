import { createFileRoute, redirect } from "@tanstack/react-router";
import Page from "@/pages/AdminDashboardPage";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    if (typeof window === "undefined") return;
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      throw redirect({
        to: "/auth",
        search: { redirect: location.href } as never,
      });
    }
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    const { data: isManager } = await supabase.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "store_manager",
    });
    if (!isAdmin && !isManager) {
      throw redirect({ to: "/" });
    }
  },
  component: Page,
});
