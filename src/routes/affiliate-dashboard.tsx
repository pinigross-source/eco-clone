import { createFileRoute } from "@tanstack/react-router";

// The affiliate program (applications, links, commissions, payouts) is run by
// GoAffPro on the Shopify store. This site only forwards affiliates there.
const AFFILIATE_PORTAL_URL = "https://shop.envirobiotics.com/pages/affiliate-signup";

export const Route = createFileRoute("/affiliate-dashboard")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      window.location.replace(AFFILIATE_PORTAL_URL);
    }
  },
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <a href={AFFILIATE_PORTAL_URL} className="text-primary underline">
        Opening your affiliate portal…
      </a>
    </div>
  ),
});
