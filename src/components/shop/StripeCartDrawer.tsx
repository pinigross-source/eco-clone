import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, Loader2, Tag, X, Truck, CreditCard, Gift, Phone } from "lucide-react";
import { useStripeCartStore } from "@/stores/stripeCartStore";
import { supabase } from "@/integrations/supabase/client";
import { invokeCheckout } from "@/lib/checkout";
import { toast } from "sonner";

import { PayPalCheckoutButton } from "./PayPalCheckoutButton";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/stripe-products";


// E-Biotic Pro product IDs — excluded from bundle discount
const EBIOTIC_PRODUCT_IDS = [
  'prod_TyevTJlN928IJl',
  'prod_TyevV5dGqeusYr',
  'prod_TyewfcWpXpXmeW',
];

// Eligible device product IDs for bundle discount
const BUNDLE_ELIGIBLE_DEVICE_IDS = [
  'prod_TkrCDIiOr0kg1A', // BioLogic Mini
  'prod_TxSs8Sq49Z9hWD', // Biotica 800
  'prod_TkrCTgomiCEl0g', // BA-2080
];

export const StripeCartDrawer = () => {
  const [discountInput, setDiscountInput] = useState("");
  const [paypalPhone, setPaypalPhone] = useState("");
  const { 
    items, 
    isLoading,
    discountCode,
    isCartOpen: isOpen,
    updateQuantity, 
    removeItem,
    clearCart,
    setLoading,
    setDiscountCode,
    setCartOpen: setIsOpen,
    getTotalItems,
    getEstimatedSubtotal,
    getEstimatedShipping,
    getEstimatedTotal,
    isFreeShipping,
  } = useStripeCartStore();
  
  const totalItems = getTotalItems();
  const estimatedSubtotal = getEstimatedSubtotal();
  const estimatedShipping = getEstimatedShipping();
  const estimatedTotal = getEstimatedTotal();
  const freeShipping = isFreeShipping();
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - estimatedSubtotal;

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  // Detect bundle deal: subscription + eligible device in cart
  const subscriptionItems = items.filter(i => i.product.category === 'subscription');
  const oneTimeItems = items.filter(i => i.product.category !== 'subscription');
  const hasSubscription = subscriptionItems.length > 0;
  const hasOneTime = oneTimeItems.length > 0;
  const isMixedCart = hasSubscription && hasOneTime;

  // Bundle discount applies when: mixed cart, no E-Biotic products, and at least one eligible device
  const hasEbiotic = items.some(i => EBIOTIC_PRODUCT_IDS.includes(i.product.id));
  const hasEligibleDevice = oneTimeItems.some(i => BUNDLE_ELIGIBLE_DEVICE_IDS.includes(i.product.id));
  const isBundleDeal = isMixedCart && !hasEbiotic && hasEligibleDevice;

  // Calculate bundle savings for display
  const bundleSavings = isBundleDeal
    ? oneTimeItems.reduce((sum, item) => {
        if (BUNDLE_ELIGIBLE_DEVICE_IDS.includes(item.product.id)) {
          return sum + Math.round(item.product.price * 0.10) * item.quantity;
        }
        return sum;
      }, 0)
    : 0;

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
      toast.error('Checkout is taking too long. Please try again.');
    }, 15000);
    try {
      const subscriptionItems = items.filter(i => i.product.category === 'subscription');
      const oneTimeItems = items.filter(i => i.product.category !== 'subscription');
      const isMixed = subscriptionItems.length > 0 && oneTimeItems.length > 0;

      let mode: string;
      let lineItemsPayload: Array<{ priceId: string; quantity: number; mode?: string }>;
      let applyBundleDiscount = false;

      if (isMixed) {
        mode = 'subscription';
        const hasEbiotic = items.some(i => EBIOTIC_PRODUCT_IDS.includes(i.product.id));
        const hasEligible = oneTimeItems.some(i => BUNDLE_ELIGIBLE_DEVICE_IDS.includes(i.product.id));
        applyBundleDiscount = !hasEbiotic && hasEligible;

        lineItemsPayload = [
          ...subscriptionItems.map(item => ({
            priceId: item.product.priceId,
            quantity: item.quantity,
            mode: 'subscription' as const,
          })),
          ...oneTimeItems.map(item => ({
            priceId: item.product.priceId,
            quantity: item.quantity,
            mode: 'payment' as const,
          })),
        ];
      } else {
        mode = subscriptionItems.length > 0 ? 'subscription' : 'payment';
        const itemsToCheckout = subscriptionItems.length > 0 ? subscriptionItems : oneTimeItems;
        lineItemsPayload = itemsToCheckout.map(item => ({
          priceId: item.product.priceId,
          quantity: item.quantity,
          ...(subscriptionItems.length > 0 ? { mode: 'subscription' } : {}),
        }));
      }

      const { data, error } = await invokeCheckout({
          lineItems: lineItemsPayload,
          mode,
          discountCode: discountCode || undefined,
          bundleDiscount: applyBundleDiscount,
        });

      clearTimeout(timeout);
      if (error) throw error;
      if (data?.url) {
        clearCart();
        setIsOpen(false);
        window.location.href = data.url;
      } else {
        toast.error('Checkout failed — no redirect URL received. Please try again.');
      }
    } catch (error) {
      clearTimeout(timeout);
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-11 w-11 rounded-full border-border/70 bg-background/80 shadow-sm hover:bg-background" aria-label={totalItems > 0 ? `Shopping cart with ${totalItems} item${totalItems !== 1 ? 's' : ''}` : 'Shopping cart'}>
          <ShoppingCart className="h-5 w-5 text-foreground/80" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground" aria-hidden="true">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
       <SheetContent className="w-full sm:max-w-lg flex flex-col h-full p-0">
        <SheetHeader className="flex-shrink-0 px-5 pt-5 pb-3">
          <SheetTitle className="text-lg font-bold">Shopping Cart</SheetTitle>
          <SheetDescription className="text-sm">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center px-5">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Bundle Deal Banner */}
              {isBundleDeal && (
                <div className="mx-5 mb-3 p-3 bg-primary/10 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-2 text-sm font-bold text-primary">
                    <Gift className="w-4 h-4 flex-shrink-0" />
                    Bundle Deal! 10% off device + Free shipping
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 pl-6">
                    Save {formatPrice(bundleSavings)} by bundling with a subscription
                  </p>
                </div>
              )}

              {/* Scrollable items area */}
              <div className="flex-1 overflow-y-auto px-5 min-h-0">
                <div className="space-y-3">
                  {items.map((item) => {
                    const isEligibleForBundleDiscount = isBundleDeal && BUNDLE_ELIGIBLE_DEVICE_IDS.includes(item.product.id);
                    const displayPrice = isEligibleForBundleDiscount
                      ? Math.round(item.product.price * 0.90)
                      : item.product.price;

                    return (
                    <div key={item.product.id} className="flex gap-3 p-3 bg-muted/30 rounded-xl border border-border/40">
                      {/* Larger product image */}
                      <div className="w-[72px] h-[72px] bg-background rounded-lg overflow-hidden flex-shrink-0 border border-border/30">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-sm leading-tight line-clamp-2">{item.product.name}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 flex-shrink-0 -mt-0.5 -mr-1"
                            onClick={() => removeItem(item.product.id)}
                            aria-label={`Remove ${item.product.name} from cart`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>

                        <div className="text-sm text-muted-foreground mt-0.5">
                          {isEligibleForBundleDiscount ? (
                            <span className="flex items-center gap-1.5 flex-wrap">
                              <span className="line-through text-sm">{formatPrice(item.product.price)}</span>
                              <span className="text-primary font-bold">{formatPrice(displayPrice)}</span>
                              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-1.5 py-0">
                                -10%
                              </Badge>
                            </span>
                          ) : (
                            <span>
                              {formatPrice(item.product.price)}
                              {item.product.category === 'subscription' && <span className="text-sm">/6mo</span>}
                            </span>
                          )}
                        </div>

                        {item.product.category !== 'subscription' && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            <Truck className="w-3 h-3 inline mr-0.5 -mt-px" />
                            {isBundleDeal ? (
                              <span className="text-primary font-medium">Free shipping</span>
                            ) : item.product.shippingCost === 0 ? 'Free shipping' : `+ ${formatPrice(item.product.shippingCost || 0)} shipping`}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-1.5">
                          <div className="flex items-center h-8 border border-border rounded-lg overflow-hidden bg-background">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-full flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
                              aria-label={`Decrease quantity of ${item.product.name}`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold border-x border-border">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-full flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-bold text-primary text-base">
                            {formatPrice(displayPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Fixed checkout section — compact & punchy */}
              <div className="flex-shrink-0 px-5 pb-5 pt-3 border-t border-border/60 bg-background space-y-3">
                {/* Discount Code Input - always shown (SD40/SD50/SD10 allowed on subscriptions) */}
                {(
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Discount Code
                  </label>
                  {discountCode ? (
                    <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg border border-primary/20">
                      <Tag className="w-3.5 h-3.5 text-primary" />
                      <span className="flex-1 font-semibold text-sm text-primary">{discountCode}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setDiscountCode('')}
                        aria-label="Remove discount code"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter code"
                          value={discountInput}
                          onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                          className="flex-1 text-sm h-9"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9"
                          onClick={() => {
                            if (discountInput.trim()) {
                              const code = discountInput.trim().toUpperCase();
                              const SUBSCRIPTION_ALLOWED_CODES = ['SD40', 'SD50', 'SD10'];
                              const hasNonSubItems = items.some(i => i.product.category !== 'subscription');
                              if (!hasNonSubItems && !SUBSCRIPTION_ALLOWED_CODES.includes(code)) {
                                toast.error('Discount codes do not apply to subscription products.');
                                return;
                              }
                              setDiscountCode(code);
                              
                              setDiscountInput('');
                              toast.success('Discount code applied!');
                            }
                          }}
                          disabled={!discountInput.trim()}
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Most discount codes do not apply to subscription products.</p>
                    </div>
                  )}
                </div>
                )}

                {/* Free shipping progress */}
                {totalItems > 0 && !isBundleDeal && !freeShipping && amountToFreeShipping > 0 && !items.every(i => i.product.category === 'subscription') && (
                  <div className="p-2 bg-primary/5 rounded-lg border border-primary/10 text-xs text-center">
                    <Truck className="w-3.5 h-3.5 inline mr-1 text-primary" />
                    Add <span className="font-bold text-primary">{formatPrice(amountToFreeShipping)}</span> more for <span className="font-bold text-primary">FREE shipping!</span>
                  </div>
                )}
                {totalItems > 0 && (freeShipping || isBundleDeal) && !items.every(i => i.product.category === 'subscription') && (
                  <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20 text-xs text-center text-green-700 dark:text-green-400 font-semibold">
                    <Truck className="w-3.5 h-3.5 inline mr-1" />
                    🎉 FREE shipping!
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Est. Subtotal</span>
                    <span>
                      {isBundleDeal ? (
                        <>
                          <span className="line-through text-muted-foreground text-xs mr-1">{formatPrice(estimatedSubtotal)}</span>
                          <span className="text-primary font-bold">{formatPrice(estimatedSubtotal - bundleSavings)}</span>
                        </>
                      ) : formatPrice(estimatedSubtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Est. Shipping</span>
                    <span className={(freeShipping || isBundleDeal) ? 'text-green-600 font-semibold' : ''}>
                      {(freeShipping || isBundleDeal) ? 'FREE' : estimatedShipping === 0 ? 'FREE' : formatPrice(estimatedShipping)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground italic">Tax calculated at checkout</p>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-2 border-t border-border/60">
                  <div>
                    <span className="text-lg font-bold">Est. Total</span>
                    <p className="text-xs text-muted-foreground leading-tight">Final amount at checkout</p>
                  </div>
                  <span className="text-2xl font-extrabold text-primary">
                    {formatPrice(isBundleDeal ? (estimatedSubtotal - bundleSavings) : estimatedTotal)}
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full rounded-full bg-primary hover:bg-primary-hover text-primary-foreground text-base font-bold py-6 shadow-lg hover:shadow-xl transition-all duration-300 tracking-wide" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Checkout with Card
                    </>
                  )}
                </Button>

                {/* PayPal - only for non-subscription items */}
                {!items.some(i => i.product.category === 'subscription') && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-[11px] text-muted-foreground">or</span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="space-y-2 mb-2">
                      <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        Phone Number (required for PayPal)
                      </label>
                      <Input
                        type="tel"
                        placeholder="(201) 555-0123"
                        value={paypalPhone}
                        onChange={(e) => setPaypalPhone(e.target.value)}
                        className="text-base"
                      />
                    </div>
                    <PayPalCheckoutButton phone={paypalPhone} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
