import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useStripeCartStore } from "@/stores/stripeCartStore";
import { Loader2, Phone } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { getAffiliateRef } from "@/hooks/useAffiliateTracking";

interface PayPalCheckoutButtonProps {
  phone: string;
}

export const PayPalCheckoutButton = ({ phone }: PayPalCheckoutButtonProps) => {
  const [clientId, setClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { items, clearCart } = useStripeCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("paypal-checkout", {
          body: { action: "get-client-id" },
        });
        if (error) throw error;
        setClientId(data.clientId);
      } catch (err) {
        console.error("Failed to load PayPal config:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClientId();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-3">
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!clientId) return null;

  const cartItems = items
    .filter((i) => i.product.category !== "subscription")
    .map((i) => ({
      productId: i.product.id,
      quantity: i.quantity,
    }));

  if (cartItems.length === 0) return null;

  const isPhoneValid = phone.replace(/\D/g, "").length >= 7;

  return (
    <div className="space-y-2">
      {!isPhoneValid && (
        <p className="text-xs text-muted-foreground text-center">
          Please enter your phone number above to checkout with PayPal
        </p>
      )}
      <PayPalScriptProvider options={{ clientId, currency: "USD", intent: "capture" }}>
        <PayPalButtons
          style={{ layout: "horizontal", color: "blue", shape: "rect", height: 45, tagline: false }}
          disabled={cartItems.length === 0 || !isPhoneValid}
          createOrder={async () => {
            const { data, error } = await supabase.functions.invoke("paypal-checkout", {
              body: { action: "create", items: cartItems },
            });
            if (error || !data?.id) {
              toast.error("Failed to create PayPal order");
              throw new Error("PayPal order creation failed");
            }
            return data.id;
          }}
          onApprove={async (data) => {
            try {
              const { data: { user } } = await supabase.auth.getUser();
              const affiliateRef = getAffiliateRef();

              const { data: captureData, error } = await supabase.functions.invoke("paypal-checkout", {
                body: { 
                  action: "capture", 
                  orderId: data.orderID,
                  items: cartItems,
                  userId: user?.id || null,
                  phone: phone.trim(),
                  ...(affiliateRef ? { affiliateRef } : {}),
                },
              });
              if (error) throw error;
              if (captureData?.status === "COMPLETED") {
                toast.success("Payment successful!");
                clearCart();
                navigate({ to: `/payment-success?provider=paypal&paypal_order_id=${captureData.id}` });
              } else {
                toast.error("Payment was not completed. Please try again.");
              }
            } catch (err) {
              console.error("PayPal capture error:", err);
              toast.error("Payment failed. Please try again.");
            }
          }}
          onError={(err) => {
            console.error("PayPal error:", err);
            toast.error("PayPal encountered an error. Please try again.");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};
