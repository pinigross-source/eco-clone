import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyAccount, navigateToShopify } from "@/lib/shopify";

function AccountRedirect() {
  useEffect(() => {
    navigateToShopify(shopifyAccount("account"), { replace: true });
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">Redirecting to your account…</p>
    </div>
  );
}

export const Route = createFileRoute("/account")({
  component: AccountRedirect,
});
