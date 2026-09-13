import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyAccount, navigateToShopify } from "@/lib/shopify";

function AuthRedirect() {
  useEffect(() => {
    navigateToShopify(shopifyAccount("auth"), { replace: true });
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">Redirecting to sign in…</p>
    </div>
  );
}

export const Route = createFileRoute("/auth")({
  component: AuthRedirect,
});
