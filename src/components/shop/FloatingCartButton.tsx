import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useStripeCartStore } from "@/stores/stripeCartStore";
import { useState } from "react";
import { invokeCheckout } from "@/lib/checkout";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Minus, Plus, Trash2, Loader2, Tag, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";


export const FloatingCartButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discountInput, setDiscountInput] = useState("");
  const { 
    items, 
    isLoading, 
    discountCode,
    updateQuantity, 
    removeItem,
    clearCart,
    setLoading,
    setDiscountCode,
    getTotalItems,
    getEstimatedSubtotal,
    getEstimatedShipping,
  } = useStripeCartStore();
  
  const totalItems = getTotalItems();
  const estimatedSubtotal = getEstimatedSubtotal();
  const estimatedShipping = getEstimatedShipping();

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

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

      if (isMixed) {
        // Mixed cart: use subscription mode with tagged line items
        mode = 'subscription';
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

  // Don't render if cart is empty
  if (totalItems === 0) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="lg:hidden fixed bottom-[120px] right-4 z-50 h-14 w-14 rounded-full shadow-lg shadow-primary/25"
          aria-label={`Shopping cart with ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
        >
          <ShoppingCart className="h-6 w-6" />
          <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground" aria-hidden="true">
            {totalItems}
          </Badge>
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-xl">Shopping Cart</SheetTitle>
          <SheetDescription className="text-base">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
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
              {/* Scrollable items area */}
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="w-20 h-20 bg-background rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base truncate">{item.product.name}</p>
                        <p className="text-base text-muted-foreground">
                          {formatPrice(item.product.price)}
                          {item.product.category === 'subscription' && '/6mo'}
                        </p>
                        <p className="font-bold text-primary text-base mt-1">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeItem(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                        {item.product.category !== 'subscription' && (
                          <div className="flex items-center gap-1.5">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.product.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center text-base font-medium" aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Fixed checkout section */}
              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background">
                {/* Discount Code Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    Discount Code
                  </label>
                  {discountCode ? (
                    <div className="flex items-center gap-2 p-2.5 bg-primary/10 rounded-lg border border-primary/20">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="flex-1 font-semibold text-base text-primary">{discountCode}</span>
                       <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setDiscountCode('')}
                        aria-label="Remove discount code"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={discountInput}
                        onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                        className="flex-1 text-base"
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (discountInput.trim()) {
                            const code = discountInput.trim();
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
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-semibold">Est. Total</span>
                    <p className="text-xs text-muted-foreground">Final amount at checkout</p>
                  </div>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(estimatedSubtotal + estimatedShipping)}
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full text-base" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Checkout</>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
