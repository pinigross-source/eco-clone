import { useEffect } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useSearchParams } from "@/lib/router-compat";
import { setAffiliateRef } from "@/hooks/useAffiliateTracking";

/**
 * Handles /aff/:code links.
 *
 * The affiliate program itself lives in GoAffPro on the Shopify store — this
 * site never resolves or stores affiliate accounts. We simply persist the
 * referral code and continue to the requested marketing page; every outbound
 * Shopify link is then decorated with ?ref=CODE so GoAffPro attributes the sale.
 */
const AffiliateRedirectPage = ({ defaultDest }: { defaultDest?: string }) => {
  const params = useParams({ strict: false }) as { id?: string };
  const code = params.id;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const dest = searchParams.get("dest") || defaultDest || "/";
    if (code) setAffiliateRef({ code, type: "link" });
    navigate({ to: dest, replace: true } as any);
  }, [code, navigate, searchParams, defaultDest]);

  return null;
};

export default AffiliateRedirectPage;
