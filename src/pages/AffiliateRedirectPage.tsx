import { useEffect } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useSearchParams } from "@/lib/router-compat";
import { supabase } from "@/integrations/supabase/client";

/**
 * Handles /aff/:id/ URLs — looks up the affiliate by numeric ID,
 * then redirects to /?ref=CODE to trigger the tracking system.
 */
const AffiliateRedirectPage = ({ defaultDest }: { defaultDest?: string }) => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const dest = searchParams.get("dest") || defaultDest || "/";
    const lookup = async () => {
      if (!id) {
        navigate(dest, { replace: true });
        return;
      }

      const num = parseInt(id, 10);
      if (isNaN(num)) {
        navigate(dest, { replace: true });
        return;
      }

      const { data } = await supabase
        .from("affiliates")
        .select("referral_code")
        .eq("affiliate_number", num)
        .eq("status", "active")
        .limit(1);

      const code = data?.[0]?.referral_code;
      if (code) {
        navigate({ to: `${dest}?ref=${code}`, replace: true });
      } else {
        navigate(dest, { replace: true });
      }
    };

    lookup();
  }, [id, navigate, searchParams]);

  return null;
};

export default AffiliateRedirectPage;
