import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { resolveTier, getTierFeatures, isSubscriber, type SubscriptionTier, type TierFeatures } from '@/lib/subscription-tiers';

export interface EntitlementState {
  loading: boolean;
  subscribed: boolean;
  tier: SubscriptionTier;
  features: TierFeatures;
  subscriptionStatus: string;
  subscriptionEnd: string | null;
  stripeSubscriptionId: string | null;
  stripeProductId: string | null;
  refresh: () => Promise<void>;
}

export function useEntitlement(): EntitlementState {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    subscribed: boolean;
    subscription_status: string;
    subscription_end: string | null;
    stripe_subscription_id: string | null;
    stripe_product_id: string | null;
    woo_subscriptions: Array<{ id: string; product_name: string; current_period_end: string | null }>;
  } | null>(null);

  const fetchEntitlement = useCallback(async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        setData(null);
        setLoading(false);
        return;
      }

      const { data: result, error } = await supabase.functions.invoke('check-entitlement');
      if (error) {
        console.error('Entitlement check failed:', error);
        setData(null);
      } else {
        setData(result);
      }
    } catch (err) {
      console.error('Entitlement check error:', err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntitlement();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchEntitlement();
      } else {
        setData(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchEntitlement]);

  const hasWooSub = (data?.woo_subscriptions?.length ?? 0) > 0;
  const tier = data?.subscribed
    ? resolveTier(data.stripe_product_id, hasWooSub)
    : 'none';
  const features = getTierFeatures(tier);

  return {
    loading,
    subscribed: data?.subscribed ?? false,
    tier,
    features,
    subscriptionStatus: data?.subscription_status ?? 'none',
    subscriptionEnd: data?.subscription_end ?? null,
    stripeSubscriptionId: data?.stripe_subscription_id ?? null,
    stripeProductId: data?.stripe_product_id ?? null,
    refresh: fetchEntitlement,
  };
}
