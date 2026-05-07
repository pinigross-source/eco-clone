import { useState, useEffect, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Check, Star, ArrowRight, Baby, Wind, Sparkles, Clock, RefreshCw, Heart, Volume2, Lock, X, Droplets, Fan, Zap, ChevronDown, Package, AlertTriangle, Gift, Loader2, ShoppingCart, Truck } from "lucide-react";
import { SubscriptionUpsellModal, hasMatchingSubscription } from "@/components/shop/SubscriptionUpsellModal";
import { SEOHead } from "@/components/SEOHead";
import { useStripeCartStore } from "@/stores/stripeCartStore";
import { supabase } from "@/integrations/supabase/client";
import { invokeCheckout } from "@/lib/checkout";
import { toast } from "sonner";
import biologicMiniImg from "@/assets/shop/biologic-mini.png";
import nurseryLifestyle1 from "@/assets/mother-child-moment.avif";
import nurseryLifestyle2 from "@/assets/nursery-lifestyle-2.avif";
import ptpaAward from "@/assets/ptpa-award.png";
import madeSafeLogo from "@/assets/made-safe-logo.png";
import stripeLogo from "@/assets/stripe-logo.svg";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const StripeCartDrawer = lazy(() => import("@/components/shop/StripeCartDrawer").then(m => ({ default: m.StripeCartDrawer })));

const BIOLOGIC_MINI_PRICE_ID = "price_1SnLU1G13Yn1allNVof7RjMj";
const BIOLOGIC_MINI_PRODUCT = {
  id: "prod_TkrCDIiOr0kg1A",
  name: "BioLogic Mini",
  priceId: BIOLOGIC_MINI_PRICE_ID,
  price: 9800,
  image: biologicMiniImg,
};

const CARE_PLAN = {
  id: "prod_TmgdfsJfvJcYqq",
  name: "Nursery Care Plan",
  priceId: "price_1Sp7GOG13Yn1allN2veSDeBn",
  price: 3610,
  originalPrice: 3800,
};

const NurseryLandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const addItem = useStripeCartStore((s) => s.addItem);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBuyNow = () => {
    // Always show the upsell modal (same as shop behavior)
    setShowUpsellModal(true);
  };

  const handleSkipUpsell = async () => {
    setShowUpsellModal(false);
    setIsLoading(true);
    try {
      const { data, error } = await invokeCheckout({
          priceId: BIOLOGIC_MINI_PRICE_ID,
          mode: "payment",
          quantity,
        });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: BIOLOGIC_MINI_PRODUCT.id,
      name: BIOLOGIC_MINI_PRODUCT.name,
      description: "Cordless probiotic air and surface purifier",
      priceId: BIOLOGIC_MINI_PRODUCT.priceId,
      price: BIOLOGIC_MINI_PRODUCT.price,
      image: BIOLOGIC_MINI_PRODUCT.image,
      category: "device" as const,
      shippingCost: 895,
    }, quantity);
    toast.success("BioLogic Mini added to cart", {
      description: `${quantity > 1 ? `${quantity}x ` : ''}BioLogic Mini`,
      position: "top-center",
    });
    setQuantity(1);
  };

  const scrollToCTA = () => {
    document.getElementById("nursery-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  return (
    <>
      <SEOHead
        title="BioLogic Mini for Nurseries | EnviroBiotics"
        description="Support a fresher nursery environment between cleanings. Try the BioLogic Mini risk-free for 30 days."
        path="/nursery"
      />

      <div className="min-h-screen bg-background text-foreground">

        {/* ═══════════════════════ TRUST BAR ═══════════════════════ */}
        <div className="w-full py-2.5 px-4 text-center text-xs sm:text-sm font-medium tracking-wide" style={{ backgroundColor: '#3D2B1F', color: '#ffffff' }}>
          Safe for babies &amp; kids
        </div>

        {/* ═══════════════════════ 1. HERO — Identity Hook ═══════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-soft/60 via-primary-soft/20 to-background">
          {/* Decorative background elements */}
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-primary-soft/10 rounded-full blur-3xl" />
          
          <div className="container max-w-4xl mx-auto px-5 pt-16 pb-12 md:pt-24 md:pb-18 text-center relative">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-text rounded-full px-5 py-2 text-sm font-semibold mb-6 shadow-sm shadow-primary/5">
              <Baby className="w-4 h-4" />
              Nursery mistake most parents don't realize
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-5 tracking-tight">
              You baby&#8209;proofed everything.
              <br />
              <span className="text-primary-text bg-gradient-to-r from-primary-text to-primary bg-clip-text">But the nursery still smells a little… off.</span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-2 font-medium">
              And no matter how much you clean… it keeps coming back.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl mx-auto mb-2">
              On the crib. On the rug. On the surfaces your baby touches every day.
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80 max-w-lg mx-auto">
              Air purifiers treat the air. Contamination settles on surfaces, and stays there between cleanings.
            </p>

            <div className="mt-4 mb-8">
              <Button
                onClick={scrollToCTA}
                variant="hero"
                size="xl"
                className="rounded-full text-base md:text-lg px-12 py-6 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-shadow duration-300"
              >
                Try It Risk&#8209;Free For 30 Days
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 text-sm text-foreground font-medium pointer-events-none select-none">
              <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" aria-hidden="true" /> 30 Day Risk&#8209;Free Trial</p>
              <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" aria-hidden="true" /> Free Shipping Today</p>
              <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" aria-hidden="true" /> Lifetime Warranty With Care Plan</p>
              <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" aria-hidden="true" /> Trusted by parents (PTPA 5/5)</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ 2. RELATABLE PAIN — Agitate ═══════════════════════ */}
        <section className="py-10 md:py-14 bg-background">
           <div className="container max-w-2xl mx-auto px-5 sm:max-w-3xl">
             <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
               Sound familiar?
             </h2>

             <div className="space-y-3">
              <PainQuote icon={<Sparkles className="w-5 h-5" />}>
                "We clean <strong className="text-foreground font-semibold">constantly</strong>. But by the next morning… it just doesn't feel fresh."
              </PainQuote>
              <PainQuote icon={<Droplets className="w-5 h-5" />}>
                "There's this musty smell that comes back no matter what we do."
              </PainQuote>
              <PainQuote icon={<Fan className="w-5 h-5" />}>
                "It gets worse when the AC kicks on."
              </PainQuote>
              <PainQuote icon={<Zap className="w-5 h-5" />}>
                "We bought an air purifier. It helps the air. But the room still feels off."
              </PainQuote>
            </div>

            <div className="text-center mt-8">
              <p className="text-foreground font-semibold text-lg">You're not imagining it.</p>
              <p className="text-foreground font-semibold text-lg">And you're not doing anything wrong.</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ 3. MICRO TESTIMONIAL — Early Social Proof ═══════════════════════ */}
        <section className="py-8 md:py-10 bg-muted/30">
          <div className="container max-w-xl mx-auto px-5 text-center">
            <div className="flex items-center justify-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="text-base md:text-lg italic text-foreground leading-relaxed mb-2">
              "I didn't realize how much better the room could feel until we added this."
            </blockquote>
            <p className="text-sm text-muted-foreground">Sarah, mom of 2</p>
          </div>
        </section>

        {/* ═══════════════════════ LIFESTYLE VISUAL ACCENT ═══════════════════════ */}
        <div className="relative bg-background py-6 md:py-10 overflow-hidden">
          <div className="container max-w-3xl mx-auto px-5 flex justify-center">
            <div className="relative group">
              {/* Decorative glow ring */}
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-primary-soft/30 to-transparent rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              {/* Organic diamond-rounded shape via clip-path */}
              <div
                className="relative w-72 h-80 sm:w-80 sm:h-[22rem] md:w-96 md:h-[26rem] overflow-hidden shadow-2xl shadow-primary/10"
                style={{
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                }}
              >
                <img
                  src={nurseryLifestyle1}
                  alt="Calm nursery environment with BioLogic Mini"
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
              </div>
              {/* Small floating accent dot */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary/30 blur-sm" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-primary-soft/40 blur-md" />
            </div>
          </div>
        </div>

        <section className="py-10 md:py-14 bg-background">
          <div className="container max-w-2xl mx-auto px-5 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Here's what's actually happening
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg mx-auto">
              Between cleanings, your nursery is quietly changing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { icon: Wind, title: "Air Moves", desc: "HVAC circulates particles into the nursery each cycle." },
                { icon: Sparkles, title: "Particles Settle", desc: "They land on the crib, rug, and changing table." },
                { icon: Baby, title: "Surface Absence", desc: "Air purifiers can't address what's already settled on surfaces." },
                { icon: RefreshCw, title: "HVAC Re-Distributes", desc: "Every cycle re-spreads what's on surfaces back into the air." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center gap-2.5 bg-card border border-border/50 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{title}</span>
                  <span className="text-xs text-muted-foreground leading-relaxed">{desc}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl px-5 py-3.5 text-center" style={{ backgroundColor: '#3A6B4A' }}>
              <p className="text-sm md:text-base font-semibold text-white">
                That's why cleaning never seems to "last."
              </p>
            </div>

            <div className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed space-y-1">
              <p>Filtration helps. But nurseries are more than air.</p>
              <p>The spaces between cleanings are where things build up.</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ 5. PRODUCT INTRO — The Solution ═══════════════════════ */}
        <section className="py-10 md:py-14 bg-muted/30">
          <div className="container max-w-3xl mx-auto px-5">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Big product image */}
              <div className="w-full md:w-1/2 flex justify-center group/product">
                <div className="relative cursor-pointer">
                  {/* Pulsing glow backdrop */}
                  <div className="absolute -inset-8 bg-gradient-to-br from-primary/25 via-primary-soft/35 to-primary/15 rounded-full blur-3xl scale-90 opacity-60 group-hover/product:scale-125 group-hover/product:opacity-100 transition-all duration-700 ease-out animate-[pulse_3s_ease-in-out_infinite]" />
                  {/* Expanding ring 1 */}
                  <div className="absolute -inset-12 border-2 border-primary/20 rounded-full scale-85 opacity-0 group-hover/product:scale-110 group-hover/product:opacity-100 transition-all duration-700 ease-out" />
                  {/* Expanding ring 2 (delayed) */}
                  <div className="absolute -inset-16 border border-primary/10 rounded-full scale-85 opacity-0 group-hover/product:scale-110 group-hover/product:opacity-80 transition-all duration-1000 ease-out delay-100" />
                  {/* Sparkle dots */}
                  <div className="absolute -top-4 -right-2 w-3 h-3 rounded-full bg-primary/50 opacity-0 group-hover/product:opacity-100 group-hover/product:-translate-y-2 group-hover/product:translate-x-2 transition-all duration-500 blur-[1px]" />
                  <div className="absolute top-1/4 -left-4 w-2 h-2 rounded-full bg-primary-soft/60 opacity-0 group-hover/product:opacity-100 group-hover/product:-translate-x-3 transition-all duration-600 delay-150 blur-[1px]" />
                  <div className="absolute -bottom-2 right-1/4 w-2.5 h-2.5 rounded-full bg-primary/40 opacity-0 group-hover/product:opacity-100 group-hover/product:translate-y-3 transition-all duration-500 delay-200 blur-[1px]" />
                  <img
                    src={biologicMiniImg}
                    alt="BioLogic Mini nursery device"
                    className="relative w-80 sm:w-96 md:w-[32rem] lg:w-[38rem] h-auto drop-shadow-2xl group-hover/product:drop-shadow-[0_35px_60px_rgba(0,0,0,0.2)] group-hover/product:-translate-y-4 group-hover/product:scale-[1.05] transition-all duration-500 ease-out"
                    width="352"
                    height="352"
                    loading="lazy"
                    style={{ imageRendering: 'crisp-edges' as any }}
                  />
                  {/* Stronger reflection */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-gradient-to-r from-transparent via-primary/15 to-transparent rounded-full blur-lg opacity-40 group-hover/product:opacity-100 group-hover/product:w-full transition-all duration-500" />
                </div>
              </div>
              {/* Copy */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <p className="text-sm font-medium text-primary uppercase tracking-wide mb-1.5">
                  Meet BioLogic Mini
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold mb-1.5">
                  The missing step in your nursery setup
                </h2>
                <p className="text-base text-muted-foreground mb-4">
                  Because filtration alone isn't enough.
                </p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5">
                  BioLogic Mini works continuously and quietly in the background, supporting a fresher nursery environment between cleanings.
                </p>
                <ul className="space-y-2.5 mb-5 inline-block text-left">
                  {[
                    { icon: Baby, text: "Designed for nurseries up to 300 sq ft" },
                    { icon: Volume2, text: "Whisper quiet, day and night" },
                    { icon: Sparkles, text: "Plug and play, no setup headaches" },
                    { icon: Clock, text: "Works continuously between cleanings" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-foreground text-sm">{text}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">
                  No sprays. No harsh chemicals. No complicated routine.
                </p>
                <p className="text-sm text-foreground font-medium mt-1.5">
                  Just consistent support in the room that matters most.
                </p>
              </div>
            </div>
          </div>
        </section>




        {/* ═══════════════════════ 6.5. SAFETY BAND — Full-width green ═══════════════════════ */}
        <section className="py-10 md:py-14" style={{ backgroundColor: '#3A6B4A' }}>
          <div className="container max-w-3xl mx-auto px-5 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Built for the room where it matters most
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 pointer-events-none select-none">
              {["No harsh chemicals", "Ozone-free", "Safe for infants & pets", "Third-party tested", "Automatic gentle mode"].map((badge) => (
                <p key={badge} className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  {badge}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ 7. SAFETY — Overcome #1 Objection ═══════════════════════ */}
        <section className="py-10 md:py-14 bg-muted/30">
          <div className="container max-w-2xl mx-auto px-5">
            <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Safety & proper placement</h2>
              </div>
              <ul className="space-y-3">
                {[
                  "No harsh chemicals: bio-based probiotic solution, fragrance-free",
                  "Place above crib height and maintain a safe distance from the crib/changing area",
                  "Automatic mode for continuous gentle operation; Spray mode for a 30‑second boost",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm md:text-base text-foreground">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ 8. 30-DAY RISK-FREE — Risk Reversal Before CTA ═══════════════════════ */}
        <section className="py-10 md:py-14 bg-primary-soft/40 overflow-hidden">
          <div className="container max-w-4xl mx-auto px-5">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Lifestyle image 2 — organic blob shape */}
              <div className="w-full md:w-2/5 flex justify-center">
                <div
                  className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl shadow-primary/10 border-4 border-background/80 ring-2 ring-primary/10"
                >
                  <img
                    src={nurseryLifestyle2}
                    alt="Parent and baby in a fresh nursery"
                    className="w-full h-full object-cover scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              {/* Copy */}
              <div className="w-full md:w-3/5 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground mb-5 shadow-lg shadow-primary/20">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Use It In Your Nursery For 30 Days
                  <br />
                  <span className="text-primary-text">Love it, or send it back.</span>
                </h2>
                <div className="space-y-0.5 mb-6">
                  <p className="text-sm md:text-base text-muted-foreground">
                    Try it in your own space. If it's not right for your nursery, return it within 30 days.
                  </p>
                  <p className="text-sm md:text-base text-foreground font-medium">
                    No stress. No complicated process.
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    If it doesn't make a <strong className="text-foreground font-semibold">noticeable difference</strong>, send it back.
                  </p>
                </div>
                <Button onClick={scrollToCTA} variant="hero" size="lg" className="rounded-full px-8">
                  Try It Risk&#8209;Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ 9. CTA — Shop-Style Product Card ═══════════════════════ */}
        <section id="nursery-cta" className="py-10 md:py-14 bg-muted/30">
          <div className="container max-w-lg mx-auto px-5">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Protect Your Nursery</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                Simple, transparent pricing
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                Includes your 30-day risk-free trial.
              </p>
            </div>

            {/* Single Product Card — matching shop style */}
            <div className="group rounded-2xl bg-card overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 border-b border-border/50 flex items-center justify-center p-8">
                <img
                  src={biologicMiniImg}
                  alt="BioLogic Mini"
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300 will-change-transform mix-blend-multiply"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    imageRendering: 'crisp-edges',
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="p-5 md:p-6 space-y-4 text-center">
                <h3 className="font-display font-bold text-xl md:text-2xl" style={{ color: 'hsl(153, 64%, 25%)' }}>
                  BioLogic Mini
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cordless probiotic air & surface purifier for your nursery
                </p>

                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(BIOLOGIC_MINI_PRODUCT.price)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Truck className="w-4 h-4" />
                  + {formatPrice(895)} shipping
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center h-11 border border-border rounded-md overflow-hidden bg-background">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
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
                      className="w-12 h-full text-center text-sm font-medium border-x border-border bg-background focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-11 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="w-full rounded-full font-semibold"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1.5" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    disabled={isLoading}
                    className="w-full rounded-full font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-1.5" />
                        Buy Now
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 bg-muted/60 border border-border/40 rounded-full px-5 py-2.5 shadow-sm">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Secure checkout powered by</span>
                <img src={stripeLogo} alt="Stripe" className="h-9 w-auto" style={{ imageRendering: 'crisp-edges' }} />
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pointer-events-none select-none">
                <p className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary" aria-hidden="true" /> Free shipping over $200</p>
                <p className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary" aria-hidden="true" /> 30 day guarantee</p>
                <p className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary" aria-hidden="true" /> Cancel anytime</p>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Upsell Modal — same as shop */}
        <SubscriptionUpsellModal
          isOpen={showUpsellModal}
          onClose={() => setShowUpsellModal(false)}
          device={{
            id: BIOLOGIC_MINI_PRODUCT.id,
            name: BIOLOGIC_MINI_PRODUCT.name,
            description: "Cordless probiotic air & surface purifier",
            priceId: BIOLOGIC_MINI_PRODUCT.priceId,
            price: BIOLOGIC_MINI_PRODUCT.price,
            image: BIOLOGIC_MINI_PRODUCT.image,
            category: "device" as const,
            shippingCost: 895,
          }}
          deviceQuantity={quantity}
          onSkip={handleSkipUpsell}
        />

        {/* ═══════════════════════ 10. SOCIAL PROOF — Reinforce After Price ═══════════════════════ */}
        <section className="py-10 md:py-14 bg-muted/30">
          <div className="container max-w-2xl mx-auto px-5 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4.5 h-4.5 fill-primary text-primary" />
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Rated 5/5 by parents
            </h2>
            <p className="text-sm font-medium text-foreground mb-1">
              Parent Tested Parent Approved (PTPA)
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-5">
              Used around real babies. In real homes.
            </p>

            <div className="flex items-center justify-center gap-6 opacity-70">
              <img src={ptpaAward} alt="PTPA Award" className="h-12 w-auto" loading="lazy" />
              <img src={madeSafeLogo} alt="Made Safe certified" className="h-9 w-auto" loading="lazy" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════ 11. WHAT'S IN THE BOX — Post-CTA Detail ═══════════════════════ */}
        <section className="py-10 md:py-14 bg-background">
          <div className="container max-w-3xl mx-auto px-5">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border/50 rounded-2xl p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">What's in the box</h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "BioLogic Mini device",
                    "45 ml probiotic refill (~90 days typical)",
                    "USB‑C cable (charger not included)",
                    "Quick Start Guide",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border/50 rounded-2xl p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Baby className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Why for a nursery</h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Babies spend long hours in a small room",
                    "Soft surfaces (rugs, curtains, mattresses) accumulate allergens",
                    "Ultra‑quiet operation",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ 12. EMOTIONAL CLOSE ═══════════════════════ */}
        <section className="py-10 md:py-14 bg-background">
          <div className="container max-w-2xl mx-auto px-5 text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
              You protected everything else.
              <br />
              <span className="text-primary-text">Protect the nursery environment, too.</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-1">
              Your nursery deserves consistency.
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-6">
              There just wasn't a solution for this, until now.
            </p>
            <Button onClick={scrollToCTA} variant="hero" size="xl" className="rounded-full px-10 text-base md:text-lg">
              Protect My Nursery Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-sm text-foreground font-medium pointer-events-none select-none">
              <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" aria-hidden="true" /> 30 Day Risk&#8209;Free Trial</p>
              <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" aria-hidden="true" /> Free Shipping</p>
              <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" aria-hidden="true" /> Lifetime Warranty With Care Plan</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ STICKY MOBILE CTA ═══════════════════════ */}
        {showSticky && (
          <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg md:hidden">
            <Button onClick={scrollToCTA} variant="hero" className="w-full rounded-full">
              Protect My Nursery
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-1">30 Day Risk&#8209;Free Trial</p>
          </div>
        )}

        <Suspense fallback={null}>
          <StripeCartDrawer />
        </Suspense>
      </div>
    </>
  );
};



function PainQuote({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 items-start bg-muted/40 rounded-2xl p-5 border border-border/60">
      <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <p className="italic text-base md:text-lg text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

export default NurseryLandingPage;
