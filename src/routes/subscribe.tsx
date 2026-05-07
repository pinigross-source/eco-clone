import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { shopifyUrl } from "@/lib/shopify";

function SubscribeRedirect() {
  useEffect(() => {
    window.location.replace(shopifyUrl("/collections/subscribe-save", "subscribe"));
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">Redirecting to subscriptions…</p>
    </div>
  );
}

export const Route = createFileRoute("/subscribe")({
  component: SubscribeRedirect,
});
