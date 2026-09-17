import { createFileRoute } from "@tanstack/react-router";
import { buildShopUrl } from "@/lib/shopify";

const AFFILIATE_URL = buildShopUrl("/pages/affiliate-signup");

export const Route = createFileRoute("/affiliate-signup")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      window.location.replace(AFFILIATE_URL);
    }
  },
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <a href={AFFILIATE_URL} className="text-primary underline">
        Redirecting to affiliate signup…
      </a>
    </div>
  ),
});
