import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyAllProducts } from "@/lib/shopify";

function ShopRedirect() {
  useEffect(() => {
    window.location.replace(shopifyAllProducts());
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">Redirecting to shop…</p>
    </div>
  );
}

export const Route = createFileRoute("/shop")({
  component: ShopRedirect,
});
