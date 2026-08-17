import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const syncShopifyOrdersFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { days?: number }) => ({
    days: Math.min(Math.max(Number(data?.days ?? 90), 1), 365),
  }))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error || !isAdmin) {
      throw new Response("Forbidden", { status: 403 });
    }
    const { syncShopifyOrders } = await import("./attributionSync.server");
    return syncShopifyOrders(data.days);
  });
