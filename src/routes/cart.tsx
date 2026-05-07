import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyCart } from "@/lib/shopify";

function CartRedirect() {
  useEffect(() => {
    window.location.replace(shopifyCart());
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">Redirecting to your cart…</p>
    </div>
  );
}

export const Route = createFileRoute("/cart")({
  component: CartRedirect,
});
