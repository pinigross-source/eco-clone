import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface StickyProductCTAProps {
  productName: string;
    price: number;
  originalPrice?: number;
  onAddToCart: () => void;
  onSubscribe?: () => void;
  hasSubscription?: boolean;
  disabled?: boolean;
  /** Ref to the element that, once scrolled past, triggers the sticky bar */
  triggerRef: React.RefObject<HTMLElement>;
}

export const StickyProductCTA = ({
  productName,
  price,
  originalPrice,
  onAddToCart,
  onSubscribe,
  hasSubscription = false,
  disabled = false,
  triggerRef,
}: StickyProductCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the trigger element is NOT visible
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [triggerRef]);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-50 overflow-hidden bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom"
        >
          <div className="mx-auto w-full max-w-full px-3 py-3 sm:px-4">
            <div className="flex items-center justify-between gap-2 overflow-hidden">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{productName}</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">${price}</span>
                  {originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {hasSubscription && onSubscribe && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onSubscribe}
                    className="h-9 px-3 text-xs"
                  >
                    <span className="hidden xs:inline">Subscribe</span>
                    <span className="xs:hidden">Sub</span>
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                )}
                <Button
                  variant="hero"
                  size="sm"
                  onClick={onAddToCart}
                  disabled={disabled}
                  className="h-9 px-3 sm:px-4"
                >
                  <ShoppingCart className="mr-1.5 h-4 w-4" />
                  <span className="hidden xs:inline">Add to Cart</span>
                  <span className="xs:hidden">Add</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
