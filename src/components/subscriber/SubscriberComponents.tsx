import { Badge } from "@/components/ui/badge";
import { Shield, Crown, Lock } from "lucide-react";
import { type TierFeatures, type SubscriptionTier } from "@/lib/subscription-tiers";
import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

interface SubscriberBadgeProps {
  tier: SubscriptionTier;
  features: TierFeatures;
  className?: string;
}

export function SubscriberBadge({ tier, features, className }: SubscriberBadgeProps) {
  if (tier === 'none') return null;

  return (
    <Badge className={`bg-primary/10 text-primary border-primary/20 ${className ?? ''}`}>
      <Crown className="w-3 h-3 mr-1" />
      {features.label}
    </Badge>
  );
}

interface SubscriberGateProps {
  subscribed: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

export function SubscriberGate({ subscribed, children, fallback }: SubscriberGateProps) {
  if (subscribed) return <>{children}</>;

  return (
    <>
      {fallback ?? (
        <div className="relative rounded-xl border border-border bg-muted/30 p-6 text-center">
          <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Subscribers Only</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Subscribe to unlock this feature, plus lifetime warranty, free shipping &amp; more.
          </p>
          <Link
            to="/subscribe"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Shield className="w-4 h-4" />
            View Plans
          </Link>
        </div>
      )}
    </>
  );
}

interface WarrantyBadgeProps {
  subscribed: boolean;
  className?: string;
}

export function WarrantyBadge({ subscribed, className }: WarrantyBadgeProps) {
  if (!subscribed) return null;

  return (
    <div className={`flex items-center gap-2 text-sm ${className ?? ''}`}>
      <Shield className="w-4 h-4 text-primary" />
      <span className="text-primary font-medium">Lifetime Warranty Active</span>
    </div>
  );
}

interface PrioritySupportBadgeProps {
  subscribed: boolean;
  className?: string;
}

export function PrioritySupportBadge({ subscribed, className }: PrioritySupportBadgeProps) {
  if (!subscribed) return null;

  return (
    <Badge className={`bg-amber-500/10 text-amber-600 border-amber-500/20 ${className ?? ''}`}>
      <Crown className="w-3 h-3 mr-1" />
      Priority Support
    </Badge>
  );
}
