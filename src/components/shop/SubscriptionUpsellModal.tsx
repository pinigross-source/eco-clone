import { useState, useEffect } from "react";
import { invokeCheckout } from "@/lib/checkout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, RefreshCw, Shield, Truck, Sparkles, Zap, ArrowRight } from "lucide-react";
import { StripeProduct, getSubscriptions } from "@/lib/stripe-products";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { trackUpsellEvent } from "@/lib/upsell-analytics";

// Mapping from device product IDs to their matching subscription product IDs
const DEVICE_TO_SUBSCRIPTION: Record<string, string> = {
  'prod_TkrCDIiOr0kg1A': 'prod_TmgdfsJfvJcYqq', // BioLogic Mini -> BioLogic Mini Twin-Pack Subscription
  'prod_TkrChlELVBMIa6': 'prod_TmgfTg2BOlhzOu', // Biotica 800 -> Biotica 800-NV Twin-Pack Subscription
  'prod_TkrCTgomiCEl0g': 'prod_TmggA1UUuPy7mv', // BA2080 -> BA-2080 Refill Subscription
};

interface SubscriptionUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  device: StripeProduct;
  deviceQuantity: number;
  onSkip: () => void;
}

export const SubscriptionUpsellModal = ({
  isOpen,
  onClose,
  device,
  deviceQuantity,
  onSkip,
}: SubscriptionUpsellModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSkipLoading, setIsSkipLoading] = useState(false);
  const [hasTrackedImpression, setHasTrackedImpression] = useState(false);
  
  const subscriptions = getSubscriptions();
  const matchingSubscriptionId = DEVICE_TO_SUBSCRIPTION[device.id];
  const matchingSubscription = subscriptions.find(s => s.id === matchingSubscriptionId);

  // Track impression when modal opens
  useEffect(() => {
    if (isOpen && matchingSubscription && !hasTrackedImpression) {
      trackUpsellEvent({
        eventType: 'impression',
        deviceProductId: device.id,
        deviceName: device.name,
        subscriptionProductId: matchingSubscription.id,
        subscriptionName: matchingSubscription.name,
        deviceQuantity,
        devicePrice: device.price,
        subscriptionPrice: matchingSubscription.price,
      });
      setHasTrackedImpression(true);
    }
  }, [isOpen, matchingSubscription, hasTrackedImpression, device, deviceQuantity]);

  // Reset tracking when modal closes
  useEffect(() => {
    if (!isOpen) {
      setHasTrackedImpression(false);
    }
  }, [isOpen]);

  if (!matchingSubscription) {
    return null;
  }

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  const subscriptionSavings = matchingSubscription.originalPrice 
    ? matchingSubscription.originalPrice - matchingSubscription.price 
    : 0;
  
  // Calculate 10% device discount
  const deviceDiscount = Math.round(device.price * 0.10);
  const discountedDevicePrice = device.price - deviceDiscount;
  const totalDeviceSavings = deviceDiscount * deviceQuantity;

  const handleAddSubscriptionAndCheckout = async () => {
    setIsLoading(true);
    
    // Track accepted event
    trackUpsellEvent({
      eventType: 'accepted',
      deviceProductId: device.id,
      deviceName: device.name,
      subscriptionProductId: matchingSubscription.id,
      subscriptionName: matchingSubscription.name,
      deviceQuantity,
      devicePrice: device.price,
      subscriptionPrice: matchingSubscription.price,
    });
    
    try {
      // Create checkout with both the device and subscription
      // Pass bundleDiscount flag to apply 10% off device
      const { data, error } = await invokeCheckout({
          lineItems: [
            { priceId: device.priceId, quantity: deviceQuantity },
            { priceId: matchingSubscription.priceId, quantity: 1, mode: 'subscription' },
          ],
          mode: 'payment',
          bundleDiscount: true,
        });

      if (error) throw error;
      if (data?.url) {
        toast.success("Proceeding to checkout with subscription savings!", {
          position: "top-center",
        });
        window.location.href = data.url;
      }
      onClose();
    } catch (error) {
      console.error('Checkout error:', error);
      // Fallback: just checkout the subscription
      try {
        const { data, error: subError } = await invokeCheckout({
            priceId: matchingSubscription.priceId,
            mode: 'subscription',
            quantity: 1,
          });

        if (subError) throw subError;
        if (data?.url) {
          toast.success("Starting subscription checkout...", {
            description: "Complete this, then purchase your device separately.",
            position: "top-center",
          });
          window.location.href = data.url;
        }
        onClose();
      } catch (fallbackError) {
        console.error('Fallback checkout error:', fallbackError);
        toast.error('Failed to start checkout. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Track skipped event
    trackUpsellEvent({
      eventType: 'skipped',
      deviceProductId: device.id,
      deviceName: device.name,
      subscriptionProductId: matchingSubscription.id,
      subscriptionName: matchingSubscription.name,
      deviceQuantity,
      devicePrice: device.price,
      subscriptionPrice: matchingSubscription.price,
    });
    
    setIsSkipLoading(true);
    onSkip();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl w-[calc(100vw-1rem)] max-h-[calc(100dvh-1rem)] overflow-hidden p-2 sm:p-6 md:p-8">
        {/* MOBILE COMPACT LAYOUT (< 640px) */}
        <div className="sm:hidden flex flex-col gap-2">
          {/* Compact header */}
          <div className="text-center space-y-1 pt-1">
            <Badge className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground border-0 px-2 py-1 text-[11px] font-medium">
              <Gift className="w-3 h-3 mr-1" />
              Bundle Offer - Save 10%
            </Badge>
            <h3 className="text-base font-bold leading-tight">
              Get 10% Off Your {device.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Add subscription for <span className="font-semibold text-primary">10% off</span> + lifetime warranty
            </p>
          </div>

          {/* Compact device card */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <img src={device.image} alt={device.name} className="w-10 h-10 object-contain bg-white rounded-md p-1" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs truncate">{deviceQuantity > 1 ? `${deviceQuantity}x ` : ''}{device.name}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground line-through">{formatPrice(device.price * deviceQuantity)}</span>
                <span className="text-sm font-bold text-primary">{formatPrice(discountedDevicePrice * deviceQuantity)}</span>
                <Badge className="bg-primary/10 text-primary border-primary/30 text-[10px] px-1 py-0">-10%</Badge>
              </div>
            </div>
          </div>

          {/* Compact subscription card */}
          <div className="relative border border-primary rounded-lg p-2 bg-gradient-to-br from-primary/5 to-primary/10">
            <Badge className="absolute -top-2 left-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">
              <Sparkles className="w-2.5 h-2.5 mr-0.5" />Add-on
            </Badge>
            <div className="flex items-center gap-2 pt-1">
              <img src={matchingSubscription.image} alt={matchingSubscription.name} className="w-10 h-10 object-contain bg-white rounded-md p-1" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs truncate">{matchingSubscription.name}</h4>
                <div className="flex items-center gap-1.5">
                  {matchingSubscription.originalPrice && (
                    <span className="text-[11px] text-muted-foreground line-through">{formatPrice(matchingSubscription.originalPrice)}</span>
                  )}
                  <span className="text-sm font-bold text-primary">{formatPrice(matchingSubscription.price)}<span className="text-[10px] font-normal text-muted-foreground">/6mo</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact inline benefits */}
          <div className="flex justify-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-primary" />10% Off</span>
            <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-primary" />Lifetime Warranty</span>
            <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-primary" />Free Ship</span>
          </div>

          {/* Compact actions */}
          <div className="space-y-1.5">
            <Button
              onClick={handleAddSubscriptionAndCheckout}
              disabled={isLoading || isSkipLoading}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground text-xs py-2.5 h-auto"
            >
              {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <RefreshCw className="w-3.5 h-3.5 mr-1" />}
              Add Subscription & Save 10%
            </Button>
            <Button
              onClick={handleSkip}
              disabled={isLoading || isSkipLoading}
              variant="outline"
              className="w-full text-xs py-2 h-auto"
            >
              {isSkipLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Zap className="w-3.5 h-3.5 mr-1" />}
              No thanks, pay full price
            </Button>
          </div>
        </div>

        {/* DESKTOP LAYOUT (≥ 640px) - Compact to fit without scrolling */}
        <div className="hidden sm:flex sm:flex-col sm:gap-3">
          {/* Compact header */}
          <div className="text-center space-y-1">
            <Badge className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground border-0 px-3 py-1 text-sm font-medium">
              <Gift className="w-4 h-4 mr-1.5" />
              Bundle Offer - Save 10%
            </Badge>
            <DialogTitle className="text-xl font-bold leading-tight">
              Get 10% Off Your {device.name}
            </DialogTitle>
            <DialogDescription className="text-sm">
              Add a subscription for <span className="font-semibold text-primary">10% off</span> + lifetime warranty!
            </DialogDescription>
          </div>

          {/* Two-column cards layout */}
          <div className="grid grid-cols-2 gap-3">
            {/* Device card */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <img src={device.image} alt={device.name} className="w-14 h-14 object-contain bg-white rounded-lg p-1.5 shadow-sm" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-muted-foreground font-medium">Your device</p>
                <h4 className="font-bold text-sm truncate">{deviceQuantity > 1 ? `${deviceQuantity}x ` : ''}{device.name}</h4>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-muted-foreground line-through">{formatPrice(device.price * deviceQuantity)}</span>
                  <span className="text-base font-bold text-primary">{formatPrice(discountedDevicePrice * deviceQuantity)}</span>
                  <Badge className="bg-primary/10 text-primary border-primary/30 text-[10px] px-1.5 py-0">-10%</Badge>
                </div>
              </div>
            </div>

            {/* Subscription card */}
            <div className="relative border border-primary rounded-lg p-3 bg-gradient-to-br from-primary/5 to-primary/10">
              <Badge className="absolute -top-2 left-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
                <Sparkles className="w-3 h-3 mr-1" />Add-on
              </Badge>
              <div className="flex items-center gap-3 pt-1">
                <img src={matchingSubscription.image} alt={matchingSubscription.name} className="w-14 h-14 object-contain bg-white rounded-lg p-1.5 shadow-sm" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{matchingSubscription.name}</h4>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {matchingSubscription.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">{formatPrice(matchingSubscription.originalPrice)}</span>
                    )}
                    <span className="text-base font-bold text-primary">{formatPrice(matchingSubscription.price)}<span className="text-[11px] font-normal text-muted-foreground">/6mo</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inline benefits row */}
          <div className="flex justify-center gap-6 py-1">
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold text-primary">10% Off</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold">Lifetime Warranty</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold">Free Shipping</span>
            </div>
          </div>

          {/* Compact actions */}
          <div className="space-y-2">
            <Button
              onClick={handleAddSubscriptionAndCheckout}
              disabled={isLoading || isSkipLoading}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-md text-base py-5 h-auto"
              size="lg"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Yes! Add Subscription & Save 10%
            </Button>
            <Button
              onClick={handleSkip}
              disabled={isLoading || isSkipLoading}
              variant="outline"
              className="w-full text-sm py-3 h-auto"
            >
              {isSkipLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
              No thanks, pay full price
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            Cancel anytime. No commitment required.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to check if a device has a matching subscription
export const hasMatchingSubscription = (deviceId: string): boolean => {
  return deviceId in DEVICE_TO_SUBSCRIPTION;
};
