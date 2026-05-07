import { Button } from "@/components/ui/button";
import { CreditCard, ArrowDown } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

export function SubscriberBanner() {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3">
      <div className="flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-primary" />
        <h2 className="font-display font-semibold text-lg">Subscribers</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Subscriptions are managed in a separate portal.
      </p>
      <Button
        variant="hero"
        className="w-full"
        onClick={() => {
          trackEvent("click_manage_subscription_from_login");
          window.location.href = "/manage-subscription";
        }}
      >
        Manage my subscription
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        Not a subscriber?{" "}
        <a href="#signin-form" className="text-primary hover:underline font-medium">
          Sign in below
          <ArrowDown className="inline w-3 h-3 ml-0.5" />
        </a>
      </p>
    </div>
  );
}
