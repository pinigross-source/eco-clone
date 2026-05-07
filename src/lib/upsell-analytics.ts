import { supabase } from "@/integrations/supabase/client";

export type UpsellEventType = 'impression' | 'accepted' | 'skipped';

interface UpsellEvent {
  eventType: UpsellEventType;
  deviceProductId: string;
  deviceName: string;
  subscriptionProductId?: string;
  subscriptionName?: string;
  deviceQuantity: number;
  devicePrice: number;
  subscriptionPrice?: number;
}

// Generate a session ID for anonymous tracking
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('upsell_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('upsell_session_id', sessionId);
  }
  return sessionId;
};

export const trackUpsellEvent = async (event: UpsellEvent): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('upsell_analytics')
      .insert({
        event_type: event.eventType,
        device_product_id: event.deviceProductId,
        device_name: event.deviceName,
        subscription_product_id: event.subscriptionProductId || null,
        subscription_name: event.subscriptionName || null,
        device_quantity: event.deviceQuantity,
        device_price: event.devicePrice,
        subscription_price: event.subscriptionPrice || null,
        user_id: user?.id || null,
        session_id: getSessionId(),
      });

    if (error) {
      console.error('Failed to track upsell event:', error);
    }
  } catch (err) {
    // Silent fail - don't break the user experience for analytics
    console.error('Error tracking upsell event:', err);
  }
};

// Analytics query helpers for admin dashboard
export interface UpsellMetrics {
  totalImpressions: number;
  totalAccepted: number;
  totalSkipped: number;
  conversionRate: number;
  acceptedRevenue: number;
}

export const getUpsellMetrics = async (startDate?: Date, endDate?: Date): Promise<UpsellMetrics | null> => {
  try {
    let query = supabase
      .from('upsell_analytics')
      .select('event_type, subscription_price');

    if (startDate) {
      query = query.gte('created_at', startDate.toISOString());
    }
    if (endDate) {
      query = query.lte('created_at', endDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Failed to fetch upsell metrics:', error);
      return null;
    }

    const impressions = data?.filter(e => e.event_type === 'impression').length || 0;
    const accepted = data?.filter(e => e.event_type === 'accepted').length || 0;
    const skipped = data?.filter(e => e.event_type === 'skipped').length || 0;
    const acceptedEvents = data?.filter(e => e.event_type === 'accepted') || [];
    const revenue = acceptedEvents.reduce((sum, e) => sum + (e.subscription_price || 0), 0);

    return {
      totalImpressions: impressions,
      totalAccepted: accepted,
      totalSkipped: skipped,
      conversionRate: impressions > 0 ? (accepted / impressions) * 100 : 0,
      acceptedRevenue: revenue,
    };
  } catch (err) {
    console.error('Error fetching upsell metrics:', err);
    return null;
  }
};
