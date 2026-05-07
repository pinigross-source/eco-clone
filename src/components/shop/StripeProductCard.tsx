import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ShoppingCart, RefreshCw, Sparkles, Zap, Info, Eye, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { invokeCheckout } from "@/lib/checkout";
import { toast } from "sonner";
import { StripeProduct } from "@/lib/stripe-products";
import { useStripeCartStore } from "@/stores/stripeCartStore";
import { SubscriptionUpsellModal, hasMatchingSubscription } from "./SubscriptionUpsellModal";
import { ProductQuickViewModal } from "./ProductQuickViewModal";

// Map Stripe product IDs to product detail page slugs
const productSlugMap: Record<string, string> = {
  'biologic-mini': 'biologic-mini',
  'biotica-800': 'biotica-800',
  'ba-2080': 'ba-2080',
  'ebiotic-pro': 'ebiotic-pro',
  'ebpf-18': 'ebpf-18',
};

// Direct Stripe product ID overrides (bundles, refills, subscriptions)
const stripeIdSlugMap: Record<string, string> = {
  'prod_Tmi66XLp4qu3Mt': 'biologic-mini', // Family Pack - 4 BioLogic Minis
  'prod_TyKRoNcZv7uuko': 'biotica-800',   // Home Complete Bundle
  'prod_TmgdfsJfvJcYqq': 'biologic-mini', // BioLogic Mini Twin-Pack Subscription
  'prod_TmgfTg2BOlhzOu': 'biotica-800',   // Biotica 800-NV Twin-Pack Subscription
  'prod_TmibBh98qsq6qX': 'ebpf-18',       // EBPF Probiotic Solution
};

const getProductSlug = (productId: string): string | null => {
  // Direct Stripe ID match first
  if (stripeIdSlugMap[productId]) return stripeIdSlugMap[productId];
  // Check direct match
  if (productSlugMap[productId]) return productSlugMap[productId];
  // Check if ID contains known slugs
  for (const [key, slug] of Object.entries(productSlugMap)) {
    if (productId.toLowerCase().includes(key)) return slug;
  }
  return null;
};

interface StripeProductCardProps {
  product: StripeProduct;
  variant?: 'default' | 'featured' | 'compact';
}

export const StripeProductCard = ({ product, variant = 'default' }: StripeProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const addItem = useStripeCartStore(state => state.addItem);

  const isDevice = product.category === 'device';
  const hasUpsell = isDevice && hasMatchingSubscription(product.id);
  const productSlug = getProductSlug(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success("Added to cart", {
      description: `${quantity > 1 ? `${quantity}x ` : ''}${product.name}`,
      position: "top-center",
    });
    setQuantity(1);
    // Auto-open cart drawer so the user sees clear next step
    useStripeCartStore.getState().setCartOpen(true);
  };

  const handleUpsellClose = () => {
    setShowUpsellModal(false);
    setQuantity(1);
  };

  // E-Biotic Pro product IDs — excluded from bundle discount
  const EBIOTIC_PRODUCT_IDS = [
    'prod_TyevTJlN928IJl', // E-Biotic Pro 250ML
    'prod_TyevV5dGqeusYr', // E-Biotic Pro 500ML
    'prod_TyewfcWpXpXmeW', // E-Biotic Pro 1L
  ];

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const cartState = useStripeCartStore.getState();
      const cartItems = cartState.items;
      const discountCode = cartState.discountCode;

      // Build line items: subscription first, then any cart items as one-time payments
      const lineItems = [
        { priceId: product.priceId, quantity, mode: 'subscription' },
        ...cartItems.map(item => ({
          priceId: item.product.priceId,
          quantity: item.quantity,
          mode: 'payment',
        })),
      ];

      // Exclude bundle discount if the subscription itself is E-Biotic Pro,
      // or if any cart item is an E-Biotic Pro product
      const isEbioticSubscription = EBIOTIC_PRODUCT_IDS.includes(product.id);
      const cartHasEbiotic = cartItems.some(item => EBIOTIC_PRODUCT_IDS.includes(item.product.id));
      const applyBundleDiscount = cartItems.length > 0 && !isEbioticSubscription && !cartHasEbiotic;

      const { data, error } = await invokeCheckout({
          lineItems,
          mode: 'subscription',
          bundleDiscount: applyBundleDiscount,
          discountCode: discountCode || undefined,
        });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = async () => {
    // Show upsell modal for devices with matching subscriptions
    if (hasUpsell) {
      setShowUpsellModal(true);
      return;
    }
    
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
      toast.error('Checkout is taking too long. Please try again.');
    }, 15000);
    try {
      const { data, error } = await invokeCheckout({
          priceId: product.priceId,
          mode: 'payment',
          quantity: quantity,
        });

      clearTimeout(timeout);
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error('Checkout failed — no redirect URL received. Please try again.');
      }
    } catch (error) {
      clearTimeout(timeout);
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipUpsell = async () => {
    setShowUpsellModal(false);
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
      toast.error('Checkout is taking too long. Please try again.');
    }, 15000);
    try {
      const { data, error } = await invokeCheckout({
          priceId: product.priceId,
          mode: 'payment',
          quantity: quantity,
        });

      clearTimeout(timeout);
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error('Checkout failed — no redirect URL received. Please try again.');
      }
    } catch (error) {
      clearTimeout(timeout);
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
      setQuantity(1);
    }
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const isSubscription = product.category === 'subscription';

  if (variant === 'compact') {
    return (
      <>
        {showQuickView && (
          <ProductQuickViewModal
            isOpen={showQuickView}
            onClose={() => setShowQuickView(false)}
            product={product}
            productSlug={productSlug}
          />
        )}
        <Card className={`group overflow-hidden h-full relative transition-all duration-300 ${productSlug ? 'hover:shadow-lg cursor-pointer' : ''}`}>
          {productSlug && (
            <Link
              to={`/product/${productSlug}`}
              className="absolute inset-0 z-0"
              aria-label={`View ${product.name}`}
            />
          )}
          {/* Quick View Button Overlay */}
          {productSlug && (
            <button
              onClick={() => setShowQuickView(true)}
              className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-background/90 border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-muted cursor-pointer"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
          {productSlug ? (
            <Link to={`/product/${productSlug}`} className="block relative z-[1]">
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 border-b border-border/50 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 84vw, (max-width: 1024px) 40vw, 25vw"
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300 will-change-transform mix-blend-multiply"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    imageRendering: 'crisp-edges',
                  }}
                />
              </div>
              <div className="p-3 md:p-4 text-center">
                {isSubscription && (
                  <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Subscribe & Save
                  </Badge>
                )}
                <h3 className="font-semibold text-xs md:text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </div>
            </Link>
          ) : (
            <>
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 border-b border-border/50 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 84vw, (max-width: 1024px) 40vw, 25vw"
                  className="w-full h-full object-contain mix-blend-multiply"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    imageRendering: 'crisp-edges',
                  }}
                />
              </div>
              <div className="p-3 md:p-4 text-center">
                {isSubscription && (
                  <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Subscribe & Save
                  </Badge>
                )}
                <h3 className="font-semibold text-xs md:text-sm line-clamp-2">
                  {product.name}
                </h3>
              </div>
            </>
          )}
          <CardContent className="p-3 md:p-4 pt-0 space-y-2 md:space-y-3 text-center relative z-10">
            <div className="flex items-center justify-center gap-2">
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="font-bold text-primary">
                {formatPrice(product.price)}
                {isSubscription && <span className="text-xs text-muted-foreground">/6mo</span>}
              </span>
            </div>
            {!isSubscription && product.shippingCost !== undefined && (
              <p className="text-xs text-muted-foreground">
                <Truck className="w-3 h-3 inline mr-1" />
                {product.shippingCost === 0 ? 'Free shipping' : `+ ${formatPrice(product.shippingCost)} shipping`}
              </p>
            )}
            
            {!isSubscription && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center">
                  <div className="flex items-center h-9 border border-border rounded-md overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <span className="text-lg leading-none">−</span>
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val > 0) setQuantity(val);
                      }}
                      className="w-10 h-full text-center text-sm font-medium border-x border-border bg-background focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    size="sm"
                    className="w-full whitespace-nowrap"
                  >
                    <ShoppingCart className="w-3 h-3 mr-1 flex-shrink-0" />
                    Add
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    disabled={isLoading}
                    size="sm"
                    className="w-full whitespace-nowrap bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-3 h-3 mr-1 flex-shrink-0" />
                        Buy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {isSubscription && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center">
                  <div className="flex items-center h-9 border border-border rounded-md overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <span className="text-lg leading-none">−</span>
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val > 0) setQuantity(val);
                      }}
                      className="w-10 h-full text-center text-sm font-medium border-x border-border bg-background focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    size="sm"
                    className="w-full whitespace-nowrap"
                  >
                    <ShoppingCart className="w-3 h-3 mr-1 flex-shrink-0" />
                    Add
                  </Button>
                  <Button
                    onClick={handleSubscribe}
                    disabled={isLoading}
                    size="sm"
                    className="w-full whitespace-nowrap bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                    aria-disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <>Subscribe</>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </>
    );
  }

  if (variant === 'featured') {
    return (
      <>
        {showQuickView && (
          <ProductQuickViewModal
            isOpen={showQuickView}
            onClose={() => setShowQuickView(false)}
            product={product}
            productSlug={productSlug}
          />
        )}
        <div
          className="group relative rounded-2xl md:rounded-3xl bg-card overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-2xl"
        >
          <div className="flex flex-col md:grid md:grid-cols-2 gap-0">
            <div className="relative aspect-[4/3] md:aspect-auto bg-gradient-to-br from-background via-background to-muted/30 p-6 md:p-8 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-border/50">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]" />
              {productSlug ? (
                <Link to={`/product/${productSlug}`} className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 90vw, 50vw"
                    className="relative max-h-[200px] md:max-h-[300px] w-auto object-contain group-hover:scale-[1.03] transition-transform duration-700 will-change-transform mix-blend-multiply"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                      imageRendering: 'crisp-edges',
                    }}
                  />
                </Link>
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 90vw, 50vw"
                  className="relative max-h-[200px] md:max-h-[300px] w-auto object-contain group-hover:scale-[1.03] transition-transform duration-700 will-change-transform mix-blend-multiply"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    imageRendering: 'crisp-edges',
                  }}
                />
              )}
            </div>

            <div className="p-5 md:p-8 flex flex-col justify-center min-w-0 text-center md:text-left">
              {productSlug ? (
                <Link to={`/product/${productSlug}`} className="hover:text-primary transition-colors">
                  <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3">
                    {product.name}
                  </h3>
                </Link>
              ) : (
                <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3">
                  {product.name}
                </h3>
              )}
              <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                {product.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                </div>
                {!isSubscription && product.shippingCost !== undefined && (
                  <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
                    <Truck className="w-4 h-4" />
                    {product.shippingCost === 0 ? 'Free shipping' : `+ ${formatPrice(product.shippingCost)} shipping`}
                  </p>
                )}

                <div className="flex flex-col gap-3">
                  {!isSubscription && (
                    <div className="flex items-center justify-center md:justify-start">
                      <div className="flex items-center h-11 border border-border rounded-md overflow-hidden bg-background">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-11 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <span className="text-xl leading-none">−</span>
                        </button>
                        <input
                          type="text"
                          value={quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val > 0) setQuantity(val);
                          }}
                          className="w-12 h-full text-center font-medium border-x border-border bg-background focus:outline-none"
                        />
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-11 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <span className="text-xl leading-none">+</span>
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-3 justify-center md:justify-start">
                    <Button
                      onClick={handleAddToCart}
                      variant="outline"
                      size="lg"
                      className="w-full md:w-auto px-6"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={handleBuyNow}
                      disabled={isLoading}
                      size="lg"
                      className="w-full md:w-auto px-8 py-6 text-base font-semibold bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Buy Now
                        </>
                      )}
                    </Button>
                    {productSlug && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="ghost"
                          size="lg"
                          onClick={() => setShowQuickView(true)}
                          className="w-full sm:w-auto text-muted-foreground hover:text-foreground"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Quick View
                        </Button>
                        <Button
                          variant="ghost"
                          size="lg"
                          asChild
                          className="w-full sm:w-auto text-primary hover:text-primary-hover"
                        >
                          <Link to={`/product/${productSlug}`}>
                            <Info className="w-4 h-4 mr-2" />
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {hasUpsell && showUpsellModal && (
          <SubscriptionUpsellModal
            isOpen={showUpsellModal}
            onClose={handleUpsellClose}
            device={product}
            deviceQuantity={quantity}
            onSkip={handleSkipUpsell}
          />
        )}
      </>
    );
  }

  // Default variant
  return (
    <>
      {showQuickView && (
        <ProductQuickViewModal
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
          product={product}
          productSlug={productSlug}
        />
      )}
      <Card className={`group overflow-hidden h-full flex flex-col relative transition-all duration-300 ${productSlug ? 'hover:shadow-xl cursor-pointer' : ''}`}>
        {productSlug && (
          <Link
            to={`/product/${productSlug}`}
            className="absolute inset-0 z-0"
            aria-label={`View ${product.name}`}
          />
        )}
        {isSubscription && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-primary text-primary-foreground">
              <Sparkles className="w-3 h-3 mr-1" />
              Subscribe
            </Badge>
          </div>
        )}
        {/* Quick View Button Overlay for non-subscription products */}
        {!isSubscription && productSlug && (
          <button
            onClick={() => setShowQuickView(true)}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-muted cursor-pointer"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        {/* Clickable area: image + title + description */}
        {productSlug ? (
          <Link to={`/product/${productSlug}`} className="block relative z-[1]">
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 p-6 flex items-center justify-center border-b border-border/50">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 84vw, (max-width: 1024px) 40vw, 25vw"
                className="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300 will-change-transform mix-blend-multiply"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  imageRendering: 'crisp-edges',
                }}
              />
            </div>
            <div className="px-6 pt-6 pb-1 text-center">
              <h3 className="font-display font-bold text-xl md:text-2xl mb-1 leading-tight group-hover:text-primary transition-colors" style={{ color: '#1F2A24' }}>{product.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </Link>
        ) : (
          <>
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 p-6 flex items-center justify-center border-b border-border/50">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 84vw, (max-width: 1024px) 40vw, 25vw"
                className="max-h-full max-w-full object-contain mix-blend-multiply"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  imageRendering: 'crisp-edges',
                }}
              />
            </div>
            <div className="px-6 pt-6 pb-1 text-center">
              <h3 className="font-display font-bold text-xl md:text-2xl mb-1 leading-tight" style={{ color: '#1F2A24' }}>{product.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </>
        )}

        <CardContent className="p-6 pt-3 flex flex-col flex-1 text-center relative z-10">
          <div className="mb-3"></div>

          {/* Price row */}
          <div className="flex items-baseline justify-center gap-2 mb-5">
            {product.originalPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-2xl font-extrabold text-primary">
              {formatPrice(product.price)}
              {isSubscription && <span className="text-sm text-muted-foreground font-normal ml-1">/6mo</span>}
            </span>
            {!isSubscription && product.shippingCost !== undefined && (
              <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                <Truck className="w-3 h-3 flex-shrink-0" />
                {product.shippingCost === 0 ? 'Free shipping' : `+ ${formatPrice(product.shippingCost)} shipping`}
              </span>
            )}
          </div>

          <div className="mt-auto space-y-2.5">
            {/* Quantity selector */}
            <div className="flex items-center justify-center">
              <div className="flex items-center h-9 border border-border rounded-full overflow-hidden bg-muted/40">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <span className="text-lg leading-none select-none">−</span>
                </button>
                <span className="w-10 text-center text-sm font-semibold select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <span className="text-lg leading-none select-none">+</span>
                </button>
              </div>
            </div>

            {isSubscription ? (
              <>
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="w-full rounded-full border-primary text-primary hover:bg-primary/5 font-semibold"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  className="w-full rounded-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Subscribe Now
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="w-full rounded-full border-primary text-primary hover:bg-primary/5 font-semibold"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={isLoading}
                  className="w-full rounded-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Buy Now
                    </>
                  )}
                </Button>
              </>
            )}
            {!isSubscription && productSlug && (
              <Button
                onClick={() => setShowQuickView(true)}
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground hover:text-foreground"
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {hasUpsell && showUpsellModal && (
        <SubscriptionUpsellModal
          isOpen={showUpsellModal}
          onClose={handleUpsellClose}
          device={product}
          deviceQuantity={quantity}
          onSkip={handleSkipUpsell}
        />
      )}
    </>
  );
};
