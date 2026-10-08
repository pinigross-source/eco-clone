import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { resolveAffiliateRedirect } from "@/lib/affiliateRedirects";

/**
 * Handles legacy /aff/:id links from the old in-site affiliate program.
 * The program now lives in GoAffPro on the Shopify store, so each old ID
 * redirects immediately (client-side replace) to its mapped GoAffPro URL.
 * Unknown IDs go to the shop homepage — never a 404.
 * The mapping table lives in src/lib/affiliateRedirects.ts.
 */
const AffiliateRedirectPage = () => {
  const params = useParams({ strict: false }) as { id?: string };

  useEffect(() => {
    window.location.replace(resolveAffiliateRedirect(params.id));
  }, [params.id]);

  return null;
};

export default AffiliateRedirectPage;
