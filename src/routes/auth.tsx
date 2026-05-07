import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyAccount } from "@/lib/shopify";

function AuthRedirect() {
  useEffect(() => {
    window.location.replace(shopifyAccount("auth"));
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
