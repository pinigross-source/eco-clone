import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyUrl } from "@/lib/shopify";

function CheckoutRedirect() {
  useEffect(() => {
    window.location.replace(shopifyUrl("/checkout", "checkout"));
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
