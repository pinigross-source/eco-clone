// Floating cart button: links to the Shopify cart.
import { ShoppingCart } from "lucide-react";
import { shopifyCart } from "@/lib/shopify";

export function FloatingCartButton() {
  return (
    <a
      href={shopifyCart("floating")}
      aria-label="Open cart on Shopify"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
    >
      <ShoppingCart className="w-6 h-6" />
    </a>
  );
}

export default FloatingCartButton;
