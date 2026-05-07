import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StripeProduct, FREE_SHIPPING_THRESHOLD } from '@/lib/stripe-products';
import { trackFBEvent } from '@/lib/fb-pixel';
import { trackRedditEvent } from '@/lib/reddit-pixel';

export interface StripeCartItem {
  product: StripeProduct;
  quantity: number;
}

interface StripeCartStore {
  items: StripeCartItem[];
  isLoading: boolean;
  discountCode: string;
  isCartOpen: boolean;
  
  // Actions
  addItem: (product: StripeProduct, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setLoading: (loading: boolean) => void;
  setDiscountCode: (code: string) => void;
  setCartOpen: (open: boolean) => void;
  getTotalItems: () => number;
  getEstimatedSubtotal: () => number;
  getEstimatedShipping: () => number;
  getEstimatedTotal: () => number;
  isFreeShipping: () => boolean;
}

export const useStripeCartStore = create<StripeCartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      discountCode: '',
      isCartOpen: false,

      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(i => i.product.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, { product, quantity }] });
        }

        trackFBEvent('AddToCart', {
          content_name: product.name,
          content_ids: [product.id],
          content_type: 'product',
          value: product.price * quantity,
          currency: 'USD',
        });

        trackRedditEvent('AddToCart', {
          value: product.price * quantity,
          currency: 'USD',
          itemCount: quantity,
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.product.id !== productId)
        });
      },

      clearCart: () => {
        set({ items: [], discountCode: '' });
      },

      setLoading: (isLoading) => set({ isLoading }),

      setDiscountCode: (discountCode) => set({ discountCode }),

      setCartOpen: (isCartOpen) => set({ isCartOpen }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      // These are ESTIMATES only. Stripe decides the real amounts at checkout
      getEstimatedSubtotal: () => {
        return get().items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      },

      getEstimatedShipping: () => {
        const subtotal = get().getEstimatedSubtotal();
        if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
        return get().items.reduce((sum, item) => sum + ((item.product.shippingCost || 0) * item.quantity), 0);
      },

      getEstimatedTotal: () => {
        return get().getEstimatedSubtotal() + get().getEstimatedShipping();
      },

      isFreeShipping: () => {
        return get().getEstimatedSubtotal() >= FREE_SHIPPING_THRESHOLD;
      },
    }),
    {
      name: 'stripe-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, discountCode: state.discountCode }),
    }
  )
);
