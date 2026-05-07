import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StripeProductCard } from "@/components/shop/StripeProductCard";
import { getSubscriptions, getDevices, getRefills } from "@/lib/stripe-products";
import { Truck, ShieldCheck, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStripeCartStore } from "@/stores/stripeCartStore";
import { toast } from "sonner";

export default function ProSubPage() {
  const subscriptions = getSubscriptions();
  const devices = getDevices();
  const refills = getRefills();
  const [couponInput, setCouponInput] = useState("");
  const discountCode = useStripeCartStore((state) => state.discountCode);
  const setDiscountCode = useStripeCartStore((state) => state.setDiscountCode);

  // Add noindex meta tag on mount, remove on unmount
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    document.title = "Pro Refills | EnviroBiotics";
    return () => { document.head.removeChild(meta); };
  }, []);


  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase().replace(/\s+/g, "");
    const ALLOWED_PROSUB_CODES = ["SD40", "SD50", "SD10", "SD20"];

    if (!code) return;
    if (!ALLOWED_PROSUB_CODES.includes(code)) {
      toast.error("Invalid coupon code.");
      return;
    }

    setDiscountCode(code);
    setCouponInput("");
    toast.success(`${code} applied. It will be used at checkout.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12"
        style={{ background: "linear-gradient(180deg, hsl(30 80% 92%) 0%, hsl(204 39% 32%) 40%, hsl(204 39% 26%) 100%)" }}
      >
        <div className="container px-4 sm:px-6 text-center">
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl mb-6 text-white uppercase tracking-wide">
            Our Pro Refills
          </h1>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-6 text-white uppercase">
            Refills Subscription Plans
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-3xl mx-auto mb-10">
            Keep your home purified and ecologically balanced with our Refill Subscription Plan.
            Subscribers are guaranteed to never have their Probiotic Purification System run dry
            and enjoy an interruption free, seamless experience every time you receive your refills
            plus these additional benefits:
          </p>

          {/* Benefit icons */}
          <div className="flex flex-col sm:flex-row items-start justify-center gap-10 sm:gap-20">
            <div className="flex flex-col items-center gap-3 w-[200px]">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <span className="text-white font-semibold text-sm sm:text-base text-center">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-3 w-[200px]">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <span className="text-white font-semibold text-sm sm:text-base text-center">
                Lifetime Warranty on your device as long as you are enrolled in the subscription plan.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 sm:py-20">
        <div className="container px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl mx-auto rounded-xl border border-border bg-card p-4 sm:p-5">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-primary" />
              ProSub Coupon Code
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                className="sm:flex-1"
              />
              <Button onClick={handleApplyCoupon} disabled={!couponInput.trim()}>
                Apply Coupon
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Active on eligible ProSub subscription products only. Bundle discounts cannot be stacked.
            </p>
            {discountCode && (
              <p className="text-xs font-medium text-primary mt-1">Applied code: {discountCode}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {subscriptions.map((product) => (
              <StripeProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        className="py-16 sm:py-20 bg-muted/30"
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1200px" }}
      >
        <div className="container px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-center mb-10 uppercase">
            Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {devices.map((product) => (
              <StripeProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Refills */}
      <section
        className="py-16 sm:py-20"
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1200px" }}
      >
        <div className="container px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-center mb-10 uppercase">
            Refills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {refills.map((product) => (
              <StripeProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
