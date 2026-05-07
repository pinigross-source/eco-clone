import { supabase } from "@/integrations/supabase/client";
import { getAffiliateRef } from "@/hooks/useAffiliateTracking";

/**
 * Wrapper around `supabase.functions.invoke('create-checkout', ...)`
 * that automatically injects the affiliate referral code from localStorage.
 */
export async function invokeCheckout(body: Record<string, unknown>) {
  const affiliateRef = getAffiliateRef();
  const sourcePath = window.location.pathname;
  return supabase.functions.invoke("create-checkout", {
    body: {
      ...body,
      ...(affiliateRef ? { affiliateRef } : {}),
      ...(sourcePath ? { sourcePath } : {}),
    },
  });
}
