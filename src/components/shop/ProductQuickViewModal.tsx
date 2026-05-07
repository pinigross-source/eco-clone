import { Link } from "@/lib/link";
import { invokeCheckout } from "@/lib/checkout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StripeProduct } from "@/lib/stripe-products";
import { products as productData } from "@/data/productData";
import { ShoppingCart, Zap, ArrowRight, Check, MapPin, Clock, Shield } from "lucide-react";
import { useStripeCartStore } from "@/stores/stripeCartStore";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProductQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: StripeProduct;
  productSlug: string | null;
}

export const ProductQuickViewModal = ({ 
  isOpen, 
  onClose, 
  product,
  productSlug 
}: ProductQuickViewModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const addItem = useStripeCartStore(state => state.addItem);

  // Get detailed product data from productData.ts
  const detailedProduct = productSlug 
    ? productData.find(p => p.slug === productSlug) 
    : null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success("Added to cart", {
      description: `${quantity > 1 ? `${quantity}x ` : ''}${product.name}`,
      position: "top-center",
    });
    setQuantity(1);
    onClose();
  };

  const handleBuyNow = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await invokeCheckout({
          priceId: product.priceId,
          mode: 'payment',
          quantity: quantity,
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
      onClose();
    }
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative bg-gradient-to-br from-background via-background to-muted/30 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-border/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]" />
            <img
              src={product.image}
              alt={product.name}
              className="relative max-h-[250px] w-auto object-contain mix-blend-multiply"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                imageRendering: 'crisp-edges',
              }}
            />
          </div>

          {/* Product Details */}
          <div className="p-6 space-y-4">
            <DialogHeader className="text-left space-y-2">
              <DialogTitle className="font-display text-2xl font-bold">
                {product.name}
              </DialogTitle>
              {detailedProduct?.tagline && (
                <p className="text-sm text-muted-foreground">
                  {detailedProduct.tagline}
                </p>
              )}
            </DialogHeader>

            {/* Price */}
            <div className="flex items-center gap-3">
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Save {formatPrice(product.originalPrice - product.price)}
                </Badge>
              )}
            </div>

            <Separator />

            {/* Key Info */}
            {detailedProduct && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">Coverage:</span>
                  <span className="text-muted-foreground">{detailedProduct.coverage}</span>
                </div>
                {detailedProduct.specs.find(s => s.label === "Cartridge Life") && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">Cartridge Life:</span>
                    <span className="text-muted-foreground">
                      {detailedProduct.specs.find(s => s.label === "Cartridge Life")?.value}
                    </span>
                  </div>
                )}
                {detailedProduct.specs.find(s => s.label === "Warranty") && (
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="font-medium">Warranty:</span>
                    <span className="text-muted-foreground">
                      {detailedProduct.specs.find(s => s.label === "Warranty")?.value}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Ideal For */}
            {detailedProduct?.idealFor && (
              <div className="space-y-2">
                <span className="text-sm font-medium">Ideal For:</span>
                <div className="flex flex-wrap gap-2">
                  {detailedProduct.idealFor.slice(0, 4).map((use, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {use}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            {detailedProduct?.features && (
              <div className="space-y-2">
                <span className="text-sm font-medium">Key Features:</span>
                <ul className="grid grid-cols-1 gap-1">
                  {detailedProduct.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center h-10 border border-border rounded-md overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
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
                  className="w-12 h-full text-center font-medium border-x border-border bg-background focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <span className="text-lg leading-none">+</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={isLoading}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
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
              </div>
              
              {productSlug && (
                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="w-full text-primary hover:text-primary-hover"
                  onClick={onClose}
                >
                  <Link to={`/product/${productSlug}`}>
                    View Full Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
