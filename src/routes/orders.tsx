import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyUrl } from "@/lib/shopify";

function OrdersRedirect() {
  useEffect(() => {
    window.location.replace(shopifyUrl("/account/orders", "orders"));
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">Redirecting to your orders…</p>
    </div>
  );
}

export const Route = createFileRoute("/orders")({
  component: OrdersRedirect,
});
