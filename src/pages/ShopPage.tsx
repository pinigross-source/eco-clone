import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SEOHead, makeProductJsonLd, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { useLocation } from "@tanstack/react-router";
import { Link } from "@/lib/link";
import { useSearchParams } from "@/lib/router-compat";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { lazy, Suspense } from "react";
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const ProductComparisonTable = lazy(() => import("@/components/ProductComparisonTable").then(m => ({ default: m.ProductComparisonTable })));
const ProductFinderQuiz = lazy(() => import("@/components/ProductFinderQuiz").then(m => ({ default: m.ProductFinderQuiz })));
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shield, Truck, RefreshCw, Check, ArrowRight, LayoutGrid, HelpCircle, ShoppingCart, Gift, Package, Zap, Clock, Loader2, SearchX } from "lucide-react";
import { StripeProductCard } from "@/components/shop/StripeProductCard";
import {
  ShopFilterSidebar,
  MobileFilterTrigger,
  AppliedFilterChips,
  type ShopFilterState,
  type CategoryFilter,
  type PriceRange,
} from "@/components/shop/ShopFilters";

import { getDevices, getRefills, getSubscriptions, getBundles, getProductById, STRIPE_PRODUCTS, StripeProduct } from "@/lib/stripe-products";
import { RelatedTopics } from "@/components/RelatedTopics";
import { useStripeCartStore } from "@/stores/stripeCartStore";
import { invokeCheckout } from "@/lib/checkout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEntitlement } from "@/hooks/useEntitlement";

// ── Price range helper ──────────────────────────────
function matchesPriceRange(priceCents: number, range: PriceRange): boolean {
  const dollars = priceCents / 100;
  switch (range) {
    case "under100": return dollars < 100;
    case "100to300": return dollars >= 100 && dollars <= 300;
    case "300to1000": return dollars > 300 && dollars <= 1000;
    case "over1000": return dollars > 1000;
  }
}

function productsMatchPriceFilter(products: StripeProduct[], priceRanges: Set<PriceRange>): StripeProduct[] {
  if (priceRanges.size === 0) return products;
  return products.filter(p => Array.from(priceRanges).some(r => matchesPriceRange(p.price, r)));
}

// ── BundleCard ──────────────────────────────────────
const BundleCard = ({ product }: { product: StripeProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  return (
    <div className="relative bg-card rounded-2xl border border-border shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      {product.originalPrice && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
            Save ${((product.originalPrice - product.price) / 100).toFixed(0)}!
          </div>
        </div>
      )}
      <div className="aspect-[4/3] bg-gradient-to-br from-background via-background to-muted/30 p-8 flex items-center justify-center border-b border-border/50">
        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply" style={{ imageRendering: 'crisp-edges' }} />
      </div>
      <div className="p-6 flex flex-col flex-1 text-center">
        <h3 className="font-display font-bold text-xl md:text-2xl mb-1 leading-tight text-black">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">{product.description}</p>
        <div className="flex items-baseline justify-center gap-2 mb-5">
          {product.originalPrice && <span className="text-base text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>}
          <span className="text-2xl font-extrabold text-black">{formatPrice(product.price)}</span>
        </div>
        <div className="space-y-2.5 mt-auto">
          <div className="flex items-center justify-center">
            <div className="flex items-center h-9 border border-border rounded-full overflow-hidden bg-muted/40">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"><span className="text-lg leading-none select-none">−</span></button>
              <span className="w-10 text-center text-sm font-semibold select-none">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-full flex items-center justify-center hover:bg-muted active:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"><span className="text-lg leading-none select-none">+</span></button>
            </div>
          </div>
          <Button onClick={() => { useStripeCartStore.getState().addItem(product, quantity); toast.success("Added to cart", { description: `${quantity > 1 ? `${quantity}x ` : ''}${product.name}`, position: "top-center" }); setQuantity(1); }} variant="outline" className="w-full rounded-full border-black text-black hover:bg-black/5 font-semibold">
            <ShoppingCart className="w-4 h-4 mr-2" />Add to Cart
          </Button>
          <Button onClick={async () => { setIsLoading(true); try { const { data } = await invokeCheckout({ priceId: product.priceId, mode: 'payment', quantity }); if (data?.url) window.location.href = data.url; } catch { toast.error('Failed to start checkout.'); } finally { setIsLoading(false); } }} disabled={isLoading} className="w-full rounded-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Zap className="w-4 h-4 mr-2" />Buy Now</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

// ── ShopPage ────────────────────────────────────────
const ShopPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const recoveryAttempted = useRef(false);
  const devices = getDevices();
  const refills = getRefills();
  const subscriptions = getSubscriptions().filter(p => !p.name.startsWith('E-Biotic Pro'));
  const bundles = getBundles();
  const { subscribed, features, tier } = useEntitlement();

  // ── Filter state ──
  const [filters, setFilters] = useState<ShopFilterState>({
    categories: new Set(),
    priceRanges: new Set(),
  });
  const [isFiltering, setIsFiltering] = useState(false);

  const triggerFilterTransition = useCallback(() => {
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 250);
  }, []);

  const toggleCategory = useCallback((c: CategoryFilter) => {
    triggerFilterTransition();
    setFilters(prev => {
      const next = new Set(prev.categories);
      next.has(c) ? next.delete(c) : next.add(c);
      return { ...prev, categories: next };
    });
  }, [triggerFilterTransition]);

  const togglePriceRange = useCallback((p: PriceRange) => {
    triggerFilterTransition();
    setFilters(prev => {
      const next = new Set(prev.priceRanges);
      next.has(p) ? next.delete(p) : next.add(p);
      return { ...prev, priceRanges: next };
    });
  }, [triggerFilterTransition]);

  const clearFilters = useCallback(() => {
    triggerFilterTransition();
    setFilters({ categories: new Set(), priceRanges: new Set() });
  }, [triggerFilterTransition]);

  const removeCategory = useCallback((c: CategoryFilter) => {
    triggerFilterTransition();
    setFilters(prev => {
      const next = new Set(prev.categories);
      next.delete(c);
      return { ...prev, categories: next };
    });
  }, [triggerFilterTransition]);

  const removePriceRange = useCallback((p: PriceRange) => {
    triggerFilterTransition();
    setFilters(prev => {
      const next = new Set(prev.priceRanges);
      next.delete(p);
      return { ...prev, priceRanges: next };
    });
  }, [triggerFilterTransition]);

  // ── Derived visible data ──
  const noCategories = filters.categories.size === 0;
  const showDevices = noCategories || filters.categories.has("devices");
  const showBundles = noCategories || filters.categories.has("bundles");
  const showSubscriptions = noCategories || filters.categories.has("subscriptions");
  const showRefills = noCategories || filters.categories.has("refills");

  const filteredDevices = useMemo(() => showDevices ? productsMatchPriceFilter(devices, filters.priceRanges) : [], [showDevices, devices, filters.priceRanges]);
  const filteredBundles = useMemo(() => showBundles ? productsMatchPriceFilter(bundles, filters.priceRanges) : [], [showBundles, bundles, filters.priceRanges]);
  const filteredSubscriptions = useMemo(() => showSubscriptions ? productsMatchPriceFilter(subscriptions, filters.priceRanges) : [], [showSubscriptions, subscriptions, filters.priceRanges]);
  const filteredRefills = useMemo(() => showRefills ? productsMatchPriceFilter(refills, filters.priceRanges) : [], [showRefills, refills, filters.priceRanges]);

  const totalVisible = filteredDevices.length + filteredBundles.length + filteredSubscriptions.length + filteredRefills.length;

  const categoryCounts = useMemo(() => ({
    devices: productsMatchPriceFilter(devices, filters.priceRanges).length,
    bundles: productsMatchPriceFilter(bundles, filters.priceRanges).length,
    subscriptions: productsMatchPriceFilter(subscriptions, filters.priceRanges).length,
    refills: productsMatchPriceFilter(refills, filters.priceRanges).length,
  }), [devices, bundles, subscriptions, refills, filters.priceRanges]);

  const hasActiveFilters = filters.categories.size > 0 || filters.priceRanges.size > 0;

  const filterProps = {
    filters,
    onToggleCategory: toggleCategory,
    onTogglePriceRange: togglePriceRange,
    onClear: clearFilters,
    onRemoveCategory: removeCategory,
    onRemovePriceRange: removePriceRange,
    totalResults: totalVisible,
    categoryCounts,
  };

  // ── Existing effects ──
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const token = searchParams.get('recover');
    if (!token || recoveryAttempted.current) return;
    recoveryAttempted.current = true;
    const recoverCart = async () => {
      try {
        const { data: result, error } = await supabase.functions.invoke('recover-cart', { body: { token } });
        if (error) { toast.error('Could not recover your cart.'); return; }
        if (result?.error) { result.error.includes('already been recovered') ? toast.info('This cart has already been recovered.') : toast.error(result.error); return; }
        const cartItems = result.cart_items as Array<{ productId: string; name: string; price: number; quantity: number }>;
        if (!cartItems || cartItems.length === 0) { toast.info('Your recovered cart was empty.'); return; }
        const store = useStripeCartStore.getState();
        store.clearCart();
        let restoredCount = 0;
        for (const item of cartItems) { const product = getProductById(item.productId); if (product) { store.addItem(product, item.quantity); restoredCount++; } }
        if (result.discount_code) store.setDiscountCode(result.discount_code);
        if (restoredCount > 0) { toast.success(`Welcome back! ${restoredCount} item${restoredCount !== 1 ? 's' : ''} restored to your cart.`, { duration: 5000 }); setTimeout(() => useStripeCartStore.getState().setCartOpen(true), 500); }
        else toast.info('Some items in your cart are no longer available.');
      } catch (err) { console.error('[Cart Recovery] Error:', err); toast.error('Something went wrong recovering your cart.'); }
      finally { searchParams.delete('recover'); setSearchParams(searchParams, { replace: true }); }
    };
    recoverCart();
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Shop Biotica 800, BioLogic Mini & More Probiotic Air Purifiers"
        description="Buy the Biotica 800, BioLogic Mini, and other EnviroBiotics probiotic air purifiers. Better air for your home – FDA GRAS certified, free shipping on subscriptions."
        path="/shop"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Shop", url: "/shop" },
            ]),
            {
              "@type": "ItemList",
              name: "EnviroBiotics Probiotic Air Purifiers",
              description: "Full lineup of probiotic air and surface purifiers for home, office, and commercial use.",
              itemListElement: [
                { "@type": "ListItem", position: 1, item: { ...makeProductJsonLd({ name: "BioLogic Mini", description: "Portable probiotic air purifier for personal spaces up to 300 sq ft.", image: "https://envirobiotics.com/assets/biologic-mini.png", price: 98, sku: "biologic-mini", ratingValue: 4.9, reviewCount: 127 }), url: "https://envirobiotics.com/product/biologic-mini" } },
                { "@type": "ListItem", position: 2, item: { ...makeProductJsonLd({ name: "Biotica 800", description: "Whole-room probiotic purifier for spaces up to 800 sq ft.", image: "https://envirobiotics.com/assets/biotica-800.png", price: 299, sku: "biotica-800", ratingValue: 4.9, reviewCount: 203 }), url: "https://envirobiotics.com/product/biotica-800" } },
                { "@type": "ListItem", position: 3, item: { ...makeProductJsonLd({ name: "BA 2080", description: "Hybrid probiotic + HEPA air purifier for large spaces up to 2,600 sq ft.", image: "https://envirobiotics.com/assets/ba2080.png", price: 995, sku: "ba-2080", ratingValue: 4.9, reviewCount: 89 }), url: "https://envirobiotics.com/product/ba-2080" } },
              ],
            },
          ],
        }}
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 gradient-mesh" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />
          <div className="container relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <p className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/20 mb-8 pointer-events-none select-none">
                <ShoppingCart className="w-4 h-4 text-black" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">Shop EnviroBiotics</span>
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 text-black">
                <span>Probiotic</span> Protection<br />for <span style={{ color: '#ff8036' }}>Every Space</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">Revolutionary technology that doesn't just clean - it transforms your indoor environment with beneficial probiotics.</p>
              <div className="flex flex-col items-center gap-3">
                <div
                  className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground pointer-events-none select-none"
                  aria-label="Shop benefits"
                >
                  {[{ icon: Shield, label: "30-Day Guarantee" }, { icon: Truck, label: "Free Shipping*" }, { icon: RefreshCw, label: "Lifetime Warranty*" }].map(({ icon: Icon, label }) => (
                    <p key={label} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-black" aria-hidden="true" />
                      <span>{label}</span>
                    </p>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground text-center">*Lifetime warranty requires an active refill subscription. <Link to="/subscribe" className="text-black hover:underline pointer-events-auto">Learn more</Link> • Free shipping for refill subscribers or orders $200+</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Finder Quiz */}
        <section id="find-my-solution" className="py-12 sm:py-16 lg:py-28 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 sm:px-6">
            <ScrollReveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-foreground">Find Your Best Match</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="max-w-3xl mx-auto"><ProductFinderQuiz /></div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* Filter bar (mobile trigger) + Applied chips    */}
        {/* ═══════════════════════════════════════════════ */}
        <div className="sticky top-[64px] z-30 bg-background/95 backdrop-blur-md border-b border-border/50 py-2.5 lg:hidden">
          <div className="container flex items-center gap-3">
            <MobileFilterTrigger {...filterProps} />
            <a
              href="#compare-section"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-border text-black bg-muted/40 hover:bg-muted/60 transition-colors whitespace-nowrap"
            >
              <LayoutGrid className="w-3 h-3" />
              Compare
            </a>
            <span className="text-xs text-muted-foreground font-medium ml-auto whitespace-nowrap">
              {totalVisible} {totalVisible === 1 ? "result" : "results"}
            </span>
          </div>
          {hasActiveFilters && (
            <div className="container">
              <AppliedFilterChips {...filterProps} />
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* Main content: sidebar + product sections       */}
        {/* ═══════════════════════════════════════════════ */}
        <div className="container">
          <div className="flex gap-8 py-8 lg:py-12">
            {/* Desktop sidebar */}
            <ShopFilterSidebar {...filterProps} />

            {/* Product sections column */}
            <div className={`flex-1 min-w-0 transition-opacity duration-250 ${isFiltering ? 'opacity-40' : 'opacity-100'}`}>

              {/* Desktop applied chips */}
              {hasActiveFilters && (
                <div className="hidden lg:block mb-6">
                  <AppliedFilterChips {...filterProps} />
                </div>
              )}

              {/* 0 results */}
              {totalVisible === 0 && (
                <div className="text-center py-20 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
                    <SearchX className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">No products found</h3>
                  <p className="text-muted-foreground text-sm mb-6">No products match the selected filters. Try removing a filter or clearing all.</p>
                  <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
                </div>
              )}

              {/* Bundles */}
              {filteredBundles.length > 0 && (
                <section id="bundles-section" className="mb-16 relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-2xl" />
                  <div className="relative z-10 p-6 md:p-10">
                    <div className="text-center mb-10">
                      <p className="inline-flex items-center gap-2 text-sm font-bold text-black mb-4 pointer-events-none select-none tracking-wide uppercase">
                        <Gift className="w-4 h-4" aria-hidden="true" /> Limited Time Bundles <Package className="w-4 h-4" aria-hidden="true" />
                      </p>
                      <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Save Big with <span className="text-black">Bundle Deals</span></h2>
                      <p className="text-muted-foreground max-w-2xl mx-auto">Get complete home protection at special bundle prices.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      {filteredBundles.map(product => <BundleCard key={product.id} product={product} />)}
                    </div>
                  </div>
                </section>
              )}

              {/* Devices */}
              {filteredDevices.length > 0 && (
                <section id="products-section" className="mb-16">
                  <div className="text-center mb-10">
                    <p className="inline-flex items-center gap-1.5 text-sm font-bold text-black mb-4 pointer-events-none select-none tracking-wide uppercase"><Sparkles className="w-3.5 h-3.5" aria-hidden="true" />Best Sellers</p>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Our Systems</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Choose the right probiotic purifier for your space and lifestyle</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {filteredDevices.map(product => <StripeProductCard key={product.id} product={product} />)}
                  </div>
                </section>
              )}

              {/* Subscriptions */}
              {filteredSubscriptions.length > 0 && (
                <section id="subscriptions-section" className="mb-16 rounded-2xl bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5 p-6 md:p-10">
                  <div className="text-center mb-10">
                    <p className="inline-flex items-center gap-1.5 text-sm font-bold text-black mb-4 pointer-events-none select-none tracking-wide uppercase"><Sparkles className="w-3.5 h-3.5" aria-hidden="true" />Subscribe & Save</p>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Refill Subscriptions</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Never run out of protection. Free delivery on every order + lifetime warranty.</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-8 mb-10 p-5 rounded-2xl bg-card border border-primary/20">
                    {[{ icon: Shield, title: "Lifetime Warranty", sub: "For subscribers only" }, { icon: Clock, title: "Never Run Out", sub: "Automatic deliveries" }, { icon: Truck, title: "Free Shipping", sub: "On all subscription orders" }].map(({ icon: Icon, title, sub }) => (
                      <div key={title} className="flex items-center gap-3 pointer-events-none select-none">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"><Icon className="w-5 h-5 text-black" aria-hidden="true" /></div>
                        <div><div className="font-semibold text-sm">{title}</div><div className="text-xs text-muted-foreground">{sub}</div></div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {filteredSubscriptions.map(product => <StripeProductCard key={product.id} product={product} />)}
                  </div>
                  <div className="text-center mt-8">
                    <Button variant="outline" size="lg" asChild><Link to="/subscribe">Learn More About Subscriptions<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                  </div>
                </section>
              )}

              {/* Compare */}
              <section id="compare-section" className="mb-16">
                <div className="text-center mb-12">
                  <p className="inline-flex items-center gap-1.5 text-sm font-bold text-black mb-4 pointer-events-none select-none tracking-wide uppercase"><LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />Side-by-Side Comparison</p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Compare All Models</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">Find the perfect probiotic purifier for your space with our detailed comparison</p>
                </div>
                <ProductComparisonTable />
              </section>

              {/* Refills */}
              {filteredRefills.length > 0 && (
                <section id="refills-section" className="mb-16">
                  <div className="text-center mb-12">
                    <p className="inline-flex items-center gap-1.5 text-sm font-bold text-black mb-4 pointer-events-none select-none tracking-wide uppercase"><RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />Keep Your System Running</p>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Refills & Accessories</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">One-time purchase refill cartridges for your probiotic systems</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {filteredRefills.map(product => <StripeProductCard key={product.id} product={product} />)}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section — Sonos style: bright, minimal, generous space */}
        <section className="section-padding relative overflow-hidden bg-[#f5f5f3]">
          <div className="container relative z-10">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight text-black">
                  Questions About Our Products?
                </h2>
                <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-xl mx-auto">
                  Our team is here to help you find the perfect solution for your space.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/support">Contact Support<ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="rounded-full border-black text-black hover:bg-black hover:text-white"
                  >
                    <a href="tel:8336923883">(833) 692 3883</a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="container max-w-4xl px-4 pb-16">
          <RelatedTopics currentPath="/shop" />
        </section>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
};

export default ShopPage;
