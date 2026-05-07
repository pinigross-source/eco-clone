// Cart button that links to the Shopify cart on shop.envirobiotics.com.
// Replaces the previous in-app Stripe cart drawer now that all commerce
// lives on Shopify.
import { ShoppingCart } from "lucide-react";
import { shopifyCart } from "@/lib/shopify";
import { cn } from "@/lib/utils";

export function StripeCartDrawer({ className }: { className?: string } = {}) {
  return (
    <a
      href={shopifyCart()}
      aria-label="Open cart on Shopify"
      title="Cart"
      className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center bg-muted/50 hover:bg-muted transition-colors hover:scale-105 active:scale-95",
        className
      )}
    >
      <ShoppingCart className="w-5 h-5 text-foreground/80" />
    </a>
  );
}

export default StripeCartDrawer;
