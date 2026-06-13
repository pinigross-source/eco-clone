import { useEffect } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useSearchParams } from "@/lib/router-compat";
import { supabase } from "@/integrations/supabase/client";

/**
 * Handles /aff/:id/ URLs  looks up the affiliate by numeric ID,
 * then redirects to /?ref=CODE to trigger the tracking system.
 */
const AffiliateRedirectPage = ({ defaultDest }: { defaultDest?: string }) => {
  const params = useParams({ strict: false }) as { id?: string };
  const id = params.id;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const dest = searchParams.get("dest") || defaultDest || "/";
    const lookup = async () => {
      if (!id) {
        navigate({ to: dest, replace: true } as any);
        return;
      }

      const num = parseInt(id, 10);
      if (isNaN(num)) {
        navigate({ to: dest, replace: true } as any);
        return;
      }

      const { data } = await (supabase as any)
        .from("affiliates")
        .select("referral_code")
        .eq("affiliate_number", num)
        .eq("status", "active")
        .limit(1);

      const code = data?.[0]?.referral_code;
      if (code) {
        navigate({ to: `${dest}?ref=${code}`, replace: true } as any);
      } else {
        navigate({ to: dest, replace: true } as any);
      }
    };

    lookup();
  }, [id, navigate, searchParams]);

  return null;
};

export default AffiliateRedirectPage;
