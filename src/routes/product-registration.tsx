import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyUrl } from "@/lib/shopify";

function RegRedirect() {
  useEffect(() => {
    window.location.replace(shopifyUrl("/pages/product-registration", "register"));
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">Redirecting…</p>
    </div>
  );
}

export const Route = createFileRoute("/product-registration")({
  component: RegRedirect,
});
