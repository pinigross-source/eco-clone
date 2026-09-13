import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyUrl, navigateToShopify } from "@/lib/shopify";

function CheckoutRedirect() {
  useEffect(() => {
    navigateToShopify(shopifyUrl("/checkout", "checkout"), { replace: true });
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">Redirecting to checkout…</p>
    </div>
  );
}

export const Route = createFileRoute("/checkout")({
  component: CheckoutRedirect,
});
