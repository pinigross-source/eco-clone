// Subscription tier definitions mapped to Stripe product IDs
// Each subscription product maps to a named tier with feature flags

export type SubscriptionTier = 'mini_subscriber' | 'biotica_subscriber' | 'ba2080_subscriber' | 'ebiotic_pro_subscriber' | 'woo_subscriber' | 'none';

export interface TierFeatures {
  lifetimeWarranty: boolean;
  prioritySupport: boolean;
  subscriberDiscount: boolean;
  exclusiveContent: boolean;
  discountPercent: number; // subscriber discount percentage
  label: string; // display label for the tier
}

// Map Stripe product IDs to tier names
const PRODUCT_TIER_MAP: Record<string, SubscriptionTier> = {
  'prod_TmgdfsJfvJcYqq': 'mini_subscriber',      // BioLogic Mini Twin-Pack Subscription
  'prod_TmgfTg2BOlhzOu': 'biotica_subscriber',    // Biotica 800-NV Twin-Pack Subscription
  'prod_TmggA1UUuPy7mv': 'ba2080_subscriber',      // BA-2080 Refill Subscription
  'prod_TyevTJlN928IJl': 'ebiotic_pro_subscriber', // E-Biotic Pro 250ML Subscription
  'prod_TyevV5dGqeusYr': 'ebiotic_pro_subscriber', // E-Biotic Pro 500ML Subscription
  'prod_TyewfcWpXpXmeW': 'ebiotic_pro_subscriber', // E-Biotic Pro 1L Subscription
};

// Feature flags per tier
const TIER_FEATURES: Record<SubscriptionTier, TierFeatures> = {
  none: {
    lifetimeWarranty: false,
    prioritySupport: false,
    subscriberDiscount: false,
    exclusiveContent: false,
    discountPercent: 0,
    label: 'No Subscription',
  },
  mini_subscriber: {
    lifetimeWarranty: true,
    prioritySupport: true,
    subscriberDiscount: true,
    exclusiveContent: true,
    discountPercent: 5,
    label: 'BioLogic Mini Subscriber',
  },
  biotica_subscriber: {
    lifetimeWarranty: true,
    prioritySupport: true,
    subscriberDiscount: true,
    exclusiveContent: true,
    discountPercent: 5,
    label: 'Biotica 800 Subscriber',
  },
  ba2080_subscriber: {
    lifetimeWarranty: true,
    prioritySupport: true,
    subscriberDiscount: true,
    exclusiveContent: true,
    discountPercent: 5,
    label: 'BA-2080 Subscriber',
  },
  ebiotic_pro_subscriber: {
    lifetimeWarranty: true,
    prioritySupport: true,
    subscriberDiscount: true,
    exclusiveContent: true,
    discountPercent: 5,
    label: 'E-Biotic Pro Subscriber',
  },
  woo_subscriber: {
    lifetimeWarranty: true,
    prioritySupport: true,
    subscriberDiscount: true,
    exclusiveContent: true,
    discountPercent: 5,
    label: 'Legacy Subscriber',
  },
};

export function resolveTier(stripeProductId: string | null | undefined, hasWooSub: boolean): SubscriptionTier {
  if (stripeProductId && PRODUCT_TIER_MAP[stripeProductId]) {
    return PRODUCT_TIER_MAP[stripeProductId];
  }
  if (hasWooSub) return 'woo_subscriber';
  return 'none';
}

export function getTierFeatures(tier: SubscriptionTier): TierFeatures {
  return TIER_FEATURES[tier];
}

export function isSubscriber(tier: SubscriptionTier): boolean {
  return tier !== 'none';
}
