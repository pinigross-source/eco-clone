import { useEffect, useRef, useCallback } from 'react';
import { useStripeCartStore } from '@/stores/stripeCartStore';
import { supabase } from '@/integrations/supabase/client';

const SAVE_DEBOUNCE_MS = 5000;
const CART_SAVE_KEY = 'abandoned-cart-id';

export const useCartAbandonment = () => {
  const { items, getEstimatedSubtotal } = useStripeCartStore();
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>('');

  const saveCartToDb = useCallback(async (email?: string) => {
    if (items.length === 0) return;

    const cartFingerprint = JSON.stringify(items.map(i => ({ id: i.product.id, qty: i.quantity })));
    if (cartFingerprint === lastSavedRef.current) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userEmail = email || user?.email;
      if (!userEmail) return; // Can't save without email

      const cartItems = items.map(i => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
        priceId: i.product.priceId,
      }));

      const existingCartId = localStorage.getItem(CART_SAVE_KEY);
      const totalCents = getEstimatedSubtotal();

      if (existingCartId) {
        // Update existing abandoned cart
        const { error } = await supabase.from('abandoned_carts' as any).update({
          cart_items: cartItems,
          cart_total: totalCents,
          abandoned_at: new Date().toISOString(),
          emails_sent: 0,
          last_email_sent_at: null,
          recovered: false,
        } as any).eq('id', existingCartId);

        if (!error) {
          lastSavedRef.current = cartFingerprint;
          return;
        }
      }

      // Insert new abandoned cart
      const { data, error } = await supabase.from('abandoned_carts' as any).insert({
        user_id: user?.id || null,
        email: userEmail,
        cart_items: cartItems,
        cart_total: totalCents,
      } as any).select('id').single();

      if (!error && data) {
        localStorage.setItem(CART_SAVE_KEY, (data as any).id);
        lastSavedRef.current = cartFingerprint;
      }
    } catch (err) {
      console.error('[Cart Abandonment] Save error:', err);
    }
  }, [items, getEstimatedSubtotal]);

  // Mark cart as recovered when checkout completes (cart cleared)
  useEffect(() => {
    if (items.length === 0) {
      const cartId = localStorage.getItem(CART_SAVE_KEY);
      if (cartId) {
        supabase.from('abandoned_carts' as any)
          .update({ recovered: true, recovered_at: new Date().toISOString() } as any)
          .eq('id', cartId)
          .then(() => {
            localStorage.removeItem(CART_SAVE_KEY);
            lastSavedRef.current = '';
          });
      }
      return;
    }

    // Debounce save for logged-in users
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveCartToDb();
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [items, saveCartToDb]);

  // Public method for guest email capture
  const saveGuestCart = useCallback((email: string) => {
    saveCartToDb(email);
  }, [saveCartToDb]);

  return { saveGuestCart };
};
