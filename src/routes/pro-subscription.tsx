import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyUrl, navigateToShopify } from "@/lib/shopify";

function ProSubRedirect() {
  useEffect(() => {
    navigateToShopify(shopifyUrl("/collections/pro-subscriptions", "pro-subscribe"), { replace: true });
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">Redirecting to subscriptions…</p>
    </div>
  );
}

export const Route = createFileRoute("/pro-subscription")({
  component: ProSubRedirect,
});
