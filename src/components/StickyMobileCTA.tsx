import { useState, useEffect } from "react";
import { ShoppingBag, ShoppingCart, Star, ArrowRight } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { Link } from "@/lib/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/tracking";

export const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMobile) return null;

  // Don't show on product detail pages (they have their own StickyProductCTA)
  if (location.pathname.startsWith("/product/")) return null;
  // Don't show on checkout/auth/admin pages
  if (["/auth", "/account", "/admin", "/payment-success", "/order-history", "/manage-subscription"].some(p => location.pathname.startsWith(p))) return null;

  const isHomePage = location.pathname === "/";
  const isShopPage = location.pathname === "/shop";

  return (
    <>
      <div className="md:hidden h-[72px]" aria-hidden="true" />
      {isVisible && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-md border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] safe-area-bottom"
        >
          {/* Social proof line */}
          <div className="flex items-center justify-center gap-1.5 py-1 bg-white/5 border-b border-white/10">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-xs text-white/70 font-medium">
              4.9/5 · Trusted by 25,000+ families
            </span>
          </div>

          <div className="px-4 py-2.5">
            {isHomePage ? (
              /* Homepage: Shop from $98 */
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  onClick={() => trackEvent("sticky_cta_shop")}
                >
                  <Link to="/shop" className="flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Shop Devices from $98
                  </Link>
                </Button>
              </div>
            ) : isShopPage ? (
              /* Shop page: direct shop CTA */
              <div className="flex gap-2">
                <Button
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    trackEvent("sticky_cta_scroll_products");
                    const el = document.getElementById("best-sellers");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-1.5" />
                  View Best Sellers
                </Button>
              </div>
            ) : (
              /* All other pages: generic shop CTA */
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  onClick={() => trackEvent("sticky_cta_shop_other")}
                >
                  <Link to="/shop" className="flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Shop Devices from $98
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StickyMobileCTA;
