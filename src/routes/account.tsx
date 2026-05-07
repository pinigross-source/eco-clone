import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyAccount } from "@/lib/shopify";

function AccountRedirect() {
  useEffect(() => {
    window.location.replace(shopifyAccount("account"));
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
