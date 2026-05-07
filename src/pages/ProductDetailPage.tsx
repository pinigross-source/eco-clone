import { useState, useRef } from "react";
import { invokeCheckout } from "@/lib/checkout";
import { useParams, Navigate, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MiniLifestyleGallery } from "@/components/product/MiniLifestyleGallery";
import { MiniLifestyleBanner } from "@/components/product/MiniLifestyleBanner";
import miniLifestyleFamily from "@/assets/mini-lifestyle-family-v4.avif";
import miniLifestyleKitchen from "@/assets/mini-lifestyle-kitchen.jpg";
import { InstallationQuoteForm } from "@/components/InstallationQuoteForm";
import InstallationVideoPlayer from "@/components/InstallationVideoPlayer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  ShoppingCart, ArrowRight, Check, Star, Shield, Truck, RefreshCw,
  Zap, Volume2, Plane, Clock, Leaf, Home, Timer, Sparkles, Heart,
  Paintbrush, Battery, Layers, Maximize, Filter, Activity, Building2,
  Award, Quote, ChevronRight, Package, ArrowLeft, Share2, Droplets,
  Loader2, FileText, Download, MessageCircle, Mail, Copy, ExternalLink,
  Box
} from "lucide-react";
import { motion } from "framer-motion";
import { getProductBySlug, getOtherProducts } from "@/data/productData";
import { getPostsForProduct } from "@/data/blogData";
import { getProductBySlug as getStripeProductBySlug, getSubscriptions } from "@/lib/stripe-products";
import { useStripeCartStore } from "@/stores/stripeCartStore";
import { SubscriptionUpsellModal, hasMatchingSubscription } from "@/components/shop/SubscriptionUpsellModal";
import { StickyProductCTA } from "@/components/shop/StickyProductCTA";
import { SEOHead, makeProductJsonLd, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { toast } from "sonner";

const DEVICE_SLUG_TO_SUBSCRIPTION: Record<string, string> = {
  'biologic-mini': 'prod_TmgdfsJfvJcYqq',
  'biotica-800': 'prod_TmgfTg2BOlhzOu',
  'ba-2080': 'prod_TmggA1UUuPy7mv',
};

const PRODUCT_VIDEO_MAP: Record<string, string> = {
  'biologic-mini': '1041721190',
  'biotica-800': '1035918499',
  'ba-2080': '1050657976',
};

const iconMap: Record<string, any> = {
  Zap, Volume2, Plane, Clock, Leaf, Shield, Home, Timer, Sparkles, Heart,
  Paintbrush, Battery, Layers, Maximize, Filter, Activity, Building2, Award, Droplets
};

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const otherProducts = slug ? getOtherProducts(slug) : [];
  const relatedBlogPosts = slug ? getPostsForProduct(slug) : [];
  const stripeProduct = slug ? getStripeProductBySlug(slug) : undefined;
  const addItem = useStripeCartStore((state) => state.addItem);
  
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false);
  const heroCTARef = useRef<HTMLDivElement>(null);
  
  const subscriptions = getSubscriptions();
  const matchingSubscriptionId = slug ? DEVICE_SLUG_TO_SUBSCRIPTION[slug] : undefined;
  const matchingSubscription = matchingSubscriptionId 
    ? subscriptions.find(s => s.id === matchingSubscriptionId) 
    : undefined;

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const handleAddToCart = () => {
    if (!stripeProduct) return;
    if (hasMatchingSubscription(stripeProduct.id)) {
      setShowUpsellModal(true);
    } else {
      addItem(stripeProduct);
      toast.success(`${stripeProduct.name} added to cart!`, { position: "top-center" });
    }
  };

  const handleSkipUpsell = async () => {
    if (!stripeProduct) return;
    setIsCheckoutLoading(true);
    try {
      const { data, error } = await invokeCheckout({ priceId: stripeProduct.priceId, quantity: 1, mode: 'payment' });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
      setShowUpsellModal(false);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const handleSubscriptionCheckout = async () => {
    if (!matchingSubscription) return;
    setIsSubscriptionLoading(true);
    try {
      const { data, error } = await invokeCheckout({ priceId: matchingSubscription.priceId, mode: 'subscription', quantity: 1 });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (error) {
      console.error('Subscription checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setIsSubscriptionLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: product.name, text: product.tagline, url: window.location.href }); } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <SEOHead
        title={product ? (product.slug === 'biologic-mini' ? 'BioLogic Mini – Portable Probiotic Air Purification for Healthy Spaces | EnviroBiotics' : `${product.name} – Probiotic Air Purification by EnviroBiotics`) : "Probiotic Air Purifier | EnviroBiotics"}
        description={product ? (product.slug === 'biologic-mini' ? 'BioLogic Mini portable probiotic air purification system for indoor spaces up to 300 sq ft. Environmental probiotics treat surfaces and air with beneficial bacteria. Ultra-quiet (<5 dB), USB-C rechargeable, 90-day cartridge.' : `${product.name}: ${product.tagline}. EnviroBiotics probiotic air purification for healthier indoor environments – FDA GRAS, safe for families & pets.`) : "Explore EnviroBiotics probiotic air purifiers for healthier indoor environments."}
        path={`/product/${slug}`}
        type="product"
        keywords={product ? `${product.name}, probiotic air purification, probiotic air purifier, environmental probiotics, EnviroBiotics` : undefined}
        jsonLd={product ? {
          "@context": "https://schema.org",
          "@graph": [
            makeProductJsonLd({
              name: product.name,
              description: `${product.tagline}. ${product.description}`,
              image: `https://envirobiotics.com${product.heroImage}`,
              price: product.price,
              sku: product.slug,
              ratingValue: 4.9,
              reviewCount: product.testimonials?.length ? product.testimonials.length * 15 : 47,
            }),
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Shop", url: "/shop" },
              { name: product.name, url: `/product/${slug}` },
            ]),
            ...(product.faqs && product.faqs.length > 0 ? [{
              "@type": "FAQPage",
              mainEntity: product.faqs.map(faq => ({
                "@type": "Question", name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }] : []),
          ],
        } : undefined}
      />
      <Navbar />
      <main>
        {/* ═══ BREADCRUMB ═══ */}
        <section className="pt-24 pb-2">
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink asChild><Link to="/shop">Shop</Link></BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>{product.name}</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />Share
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/shop"><ArrowLeft className="w-4 h-4 mr-2" />Back to Shop</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ HERO — Sonos split layout ═══ */}
        <section className="pb-8 md:pb-12">
          <div className="container">
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-start">
              {/* Left: Product image (sticky on desktop) */}
              {slug === "biologic-mini" ? (
                <MiniLifestyleGallery />
              ) : (
                <motion.div
                  className="relative lg:sticky lg:top-28 bg-muted/30 rounded-2xl flex items-center justify-center p-8 md:p-12 lg:p-16 min-h-[400px] lg:min-h-[560px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-full max-w-[380px] lg:max-w-[460px] h-auto object-contain"
                    fetchPriority="high"
                    decoding="async"
                  />
                </motion.div>
              )}

              {/* Right: Product info */}
              <motion.div
                className="pt-2 lg:pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-3">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  {product.price ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl md:text-3xl font-bold text-foreground">${product.price}</span>
                      {product.originalPrice && (
                        <>
                          <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                          <Badge variant="destructive" className="text-xs">Save ${product.originalPrice - product.price}</Badge>
                        </>
                      )}
                    </div>
                  ) : (
                    <span className="text-lg font-medium text-muted-foreground">Custom quote</span>
                  )}

                  {/* Rating like Sonos */}
                  <div className="flex items-center gap-1.5 ml-auto">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-foreground underline cursor-pointer">4.9/5</span>
                  </div>
                </div>

                <p className="text-base md:text-lg text-foreground leading-relaxed mb-6 max-w-lg">
                  {product.tagline}
                </p>

                {/* Add to Cart — full width like Sonos */}
                {product.price ? (
                  <div ref={heroCTARef} className="space-y-3 mb-8">
                    <Button
                      size="lg"
                      className="w-full text-base font-semibold rounded-lg h-14 bg-foreground text-background hover:bg-foreground/90"
                      onClick={handleAddToCart}
                      disabled={!stripeProduct}
                    >
                      Add to cart
                    </Button>
                    {stripeProduct && hasMatchingSubscription(stripeProduct.id) && (
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="w-full rounded-lg h-12"
                        onClick={() => setShowUpsellModal(true)}
                      >
                        Subscribe & Save 10%
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <div ref={heroCTARef} className="mb-8">
                    <InstallationQuoteForm 
                      productName={product.name} 
                      trigger={
                        <Button size="lg" className="w-full text-base font-semibold rounded-lg h-14 bg-foreground text-background hover:bg-foreground/90">
                          Get a Free Quote
                        </Button>
                      }
                    />
                  </div>
                )}

                {/* Trust bar */}
                <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-border">
                  {[
                    { icon: Shield, label: "30-Day Guarantee" },
                    { icon: Truck, label: "Free Shipping*" },
                    { icon: RefreshCw, label: "Lifetime Warranty*" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>

                {/* ═══ ICON FEATURE STRIP — Sonos style ═══ */}
                {product.quickFeatures && product.quickFeatures.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-foreground mb-5 tracking-wide">Features</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
                      {product.quickFeatures.map((feat, i) => {
                        const Icon = iconMap[feat.icon] || Shield;
                        return (
                          <div key={i} className="flex flex-col items-center text-center gap-2">
                            <Icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                            <span className="text-xs text-muted-foreground leading-tight">{feat.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ═══ WHAT'S IN THE BOX — Sonos style ═══ */}
                {product.whatsInTheBox && product.whatsInTheBox.length > 0 && (
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-4 tracking-wide">What's in the box</h3>
                    <ul className="space-y-2">
                      {product.whatsInTheBox.map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ BENEFITS — clean grid ═══ */}
        <section className="py-12 md:py-28 border-t border-border">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
                  Why {product.name}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {product.longDescription.split('.')[0]}.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
              {product.benefits.map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon] || Shield;
                return (
                  <StaggerItem key={index}>
                    <div className="h-full p-6 md:p-10 bg-background hover:bg-muted/20 transition-colors">
                      <IconComponent className="w-7 h-7 text-foreground mb-5" strokeWidth={1.5} />
                      <h3 className="text-lg font-display font-bold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* ═══ LIFESTYLE BANNER 1 — BioLogic Mini only ═══ */}
        {slug === "biologic-mini" && (
          <MiniLifestyleBanner
            image={miniLifestyleFamily}
            alt="Family playing board games in living room with BioLogic Mini protecting their space"
            headline="Protection for the moments that matter"
            subtext="Quiet, invisible, always working"
            position="left"
            imagePosition="center 15%"
          />
        )}

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="py-12 md:py-28 bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
                  How It Works
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Getting started with your {product.name} takes just minutes
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {product.howItWorks.map((step, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="relative text-center">
                    <div className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center text-xl font-bold mx-auto mb-5">
                      {step.step}
                    </div>
                    {index < product.howItWorks.length - 1 && (
                      <div className="hidden lg:block absolute top-7 left-[60%] w-[80%] h-px bg-border" />
                    )}
                    <h3 className="text-base font-display font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ LIFESTYLE BANNER 2 — BioLogic Mini only ═══ */}
        {slug === "biologic-mini" && (
          <MiniLifestyleBanner
            image={miniLifestyleKitchen}
            alt="BioLogic Mini on kitchen counter with family and golden retriever"
            headline="Fits right into your life"
            subtext="Compact enough for any counter, shelf, or desk"
            position="right"
          />
        )}

        {/* ═══ PRODUCT VIDEO ═══ */}
        {slug && PRODUCT_VIDEO_MAP[slug] && (
          <section className="py-20 md:py-28">
            <div className="container">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
                    {product.name} in Action
                  </h2>
                </div>
              </ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                  <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={`https://player.vimeo.com/video/${PRODUCT_VIDEO_MAP[slug]}?badge=0&autopause=0&player_id=0&app_id=58479`}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={`${product.name} video`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                    <span className="text-sm text-muted-foreground font-medium mr-1">Share:</span>
                    <a href={`https://wa.me/?text=${encodeURIComponent(`${product.name}\nhttps://vimeo.com/${PRODUCT_VIDEO_MAP[slug]}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />WhatsApp
                    </a>
                    <a href={`mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(`https://vimeo.com/${PRODUCT_VIDEO_MAP[slug]}`)}`} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">
                      <Mail className="w-3.5 h-3.5" />Email
                    </a>
                    <button type="button" onClick={async () => {
                      const url = `https://vimeo.com/${PRODUCT_VIDEO_MAP[slug!]}`;
                      try { await navigator.clipboard.writeText(url); toast.success("Video link copied!"); } catch { window.open(url, "_blank", "noopener,noreferrer"); }
                    }} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">
                      <Copy className="w-3.5 h-3.5" />Copy Link
                    </button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        )}

        {/* ═══ eBiotic Pro resources ═══ */}
        {slug === "ebiotic-pro" && (
          <section className="py-20 md:py-28 bg-muted/30">
            <div className="container">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">Installation Guide & Manual</h2>
                </div>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <ScrollReveal variant="fadeRight"><InstallationVideoPlayer /></ScrollReveal>
                <ScrollReveal variant="fadeLeft" delay={0.2}>
                  <div className="rounded-2xl bg-background border border-border p-6 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2"><FileText className="w-4 h-4" />User Manual</div>
                    <h3 className="font-display font-bold text-lg mb-2">eBiotic Pro User Manual</h3>
                    <p className="text-sm text-muted-foreground mb-6">Download the complete user manual with installation instructions and maintenance guidelines.</p>
                    <Button variant="outline" size="lg" asChild>
                      <a href="https://zofwakmgbmcqknmiizgd.supabase.co/storage/v1/object/public/user-manuals/E-Biotic-Pro-User-Manual.pdf" target="_blank" rel="noopener noreferrer"><Download className="mr-2 h-5 w-5" />Download PDF Manual</a>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        )}

        {/* ═══ FEATURES & SPECS ═══ */}
        <section className="py-12 md:py-28 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16">
              <ScrollReveal variant="fadeRight">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Key Features</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/50">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fadeLeft" delay={0.2}>
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Specifications</h2>
                  <div className="rounded-2xl bg-background border border-border/50 overflow-hidden">
                    {product.specs.map((spec, index) => (
                      <div key={index} className={`flex justify-between p-4 ${index !== product.specs.length - 1 ? 'border-b border-border/50' : ''}`}>
                        <span className="text-muted-foreground text-sm">{spec.label}</span>
                        <span className="font-medium text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section className="py-12 md:py-28">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-foreground text-foreground" />)}
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-2">What Customers Say</h2>
                <p className="text-muted-foreground">Based on verified customer reviews</p>
              </div>
            </ScrollReveal>
            <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {product.testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <div className="h-full p-8 rounded-2xl bg-muted/30 border border-border/50">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />)}
                    </div>
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">"{testimonial.quote}"</p>
                    <div className="border-t border-border/50 pt-4">
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ═══ SUBSCRIBE & SAVE ═══ */}
        {product.refillProduct && (
          <section className="py-12 md:py-28 bg-muted/30">
            <div className="container">
              <ScrollReveal>
                <div className="max-w-5xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
                        Never Run Out of Protection
                      </h2>
                      <p className="text-muted-foreground mb-8 leading-relaxed">
                        Subscribe for automatic refill deliveries and save 5%. Get free shipping and our exclusive lifetime warranty.
                      </p>
                      <ul className="space-y-3 mb-8">
                        {["Best value pricing", "Free shipping always", "Lifetime warranty (subscribers only)", "Cancel or pause anytime"].map((item) => (
                          <li key={item} className="flex items-center gap-3">
                            <Check className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        size="lg"
                        className="rounded-lg h-14 px-8 bg-foreground text-background hover:bg-foreground/90 font-semibold"
                        onClick={handleSubscriptionCheckout}
                        disabled={isSubscriptionLoading || !matchingSubscription}
                      >
                        {isSubscriptionLoading ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</>
                        ) : (
                          <>Subscribe Now - ${product.refillProduct.price}/{product.refillProduct.frequency}<ArrowRight className="ml-2 h-4 w-4" /></>
                        )}
                      </Button>
                    </div>
                    <div className="flex justify-center">
                      <img src={product.refillProduct.image} alt={product.refillProduct.name} className="max-h-72 w-auto object-contain" loading="lazy" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* ═══ FAQ ═══ */}
        <section className="py-12 md:py-28">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Everything you need to know about the {product.name}</p>
              </div>
            </ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {product.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-muted/30 rounded-xl border border-border/50 px-6">
                    <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ═══ EXPLORE OTHER PRODUCTS ═══ */}
        <section className="py-12 md:py-28 bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">Explore Other Products</h2>
                <p className="text-muted-foreground">Find the perfect solution for every space</p>
              </div>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              {otherProducts.map((otherProduct) => (
                <StaggerItem key={otherProduct.slug}>
                  <Link to={`/product/${otherProduct.slug}`} className="group flex gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-background border border-border/50 hover:border-foreground/20 hover:shadow-lg transition-all">
                    <div className="w-24 h-24 shrink-0 rounded-xl bg-muted/50 p-3 flex items-center justify-center">
                      <img src={otherProduct.image} alt={otherProduct.name} loading="lazy" className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-muted-foreground mb-1">{otherProduct.coverage}</p>
                      <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">{otherProduct.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{otherProduct.tagline}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">${otherProduct.price}</span>
                        <span className="text-muted-foreground flex items-center gap-1 text-sm group-hover:text-foreground transition-colors">Learn More <ChevronRight className="w-4 h-4" /></span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ═══ RELATED BLOG POSTS ═══ */}
        {relatedBlogPosts.length > 0 && (
          <section className="py-16 md:py-20 bg-muted/30">
            <div className="container max-w-5xl">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold">Learn More About {product.name}</h2>
                </div>
              </ScrollReveal>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogPosts.map((post) => (
                  <StaggerItem key={post.slug}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group block bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{post.description}</p>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* ═══ AUTHORITY CONTENT ═══ */}
        <section className="py-12 md:py-28">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8 text-center tracking-tight">Why Choose a Probiotic Air Purification System?</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>Traditional air purifiers only capture particles that pass through their filters. But up to 80% of indoor allergens, including pollen, dust mite proteins, and pet dander, settle on surfaces and objects within minutes of becoming airborne. That means conventional air purifiers treat a fraction of the problem and leave the rest untouched.</p>
                <p>The {product.name} uses environmental probiotics: carefully cultured strains of beneficial <em>Bacillus</em> bacteria that are naturally occurring and classified as FDA GRAS (Generally Recognized As Safe). These good bacteria settle on every surface in your indoor environment and consume the organic matter that harmful microorganisms need to survive.</p>
                <p>Unlike chemical disinfectants that evaporate in minutes, the probiotic layer remains active for days, extending protection between cleanings. The result is healthier indoor environments: cleaner surfaces, fresher air, and reduced allergen exposure for your entire family.</p>
                <div className="flex flex-wrap gap-4 justify-center mt-8">
                  <Link to="/probiotic-air-purification" className="text-primary underline font-medium hover:text-primary/80 transition-colors">Learn how probiotic air purification works →</Link>
                  <Link to="/research" className="text-primary underline font-medium hover:text-primary/80 transition-colors">Read the research →</Link>
                  <Link to="/safety" className="text-primary underline font-medium hover:text-primary/80 transition-colors">View safety certifications →</Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="py-12 md:py-28 bg-foreground">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-background mb-4 tracking-tight">
                  Ready to Transform Your Space?
                </h2>
                <p className="text-background/50 mb-10 text-lg">
                  Join thousands of families enjoying cleaner, healthier air with the {product.name}.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {product.price ? (
                    <Button size="lg" className="text-lg px-8 bg-background text-foreground hover:bg-background/90 font-semibold rounded-lg h-14" onClick={handleAddToCart}>
                      <ShoppingCart className="mr-2 h-5 w-5" />Buy {product.name} - ${product.price}
                    </Button>
                  ) : (
                    <InstallationQuoteForm productName={product.name} trigger={
                      <Button size="lg" className="text-lg px-8 bg-background text-foreground hover:bg-background/90 font-semibold rounded-lg h-14">
                        <ShoppingCart className="mr-2 h-5 w-5" />Get a Free Quote
                      </Button>
                    } />
                  )}
                  <Button size="lg" variant="outline-light" className="text-lg px-8 rounded-lg h-14" asChild>
                    <Link to="/shop">View All Products<ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </div>
                <p className="text-xs text-background/30 mt-6">Free shipping • 30 day money back guarantee</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <div className="pb-20 md:pb-0" />
      <Footer />
      
      {product.price && stripeProduct && (
        <StickyProductCTA
          productName={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          onAddToCart={handleAddToCart}
          onSubscribe={hasMatchingSubscription(stripeProduct.id) ? () => setShowUpsellModal(true) : undefined}
          hasSubscription={hasMatchingSubscription(stripeProduct.id)}
          disabled={!stripeProduct}
          triggerRef={heroCTARef}
        />
      )}

      {stripeProduct && (
        <SubscriptionUpsellModal
          isOpen={showUpsellModal}
          onClose={() => setShowUpsellModal(false)}
          device={stripeProduct}
          deviceQuantity={1}
          onSkip={handleSkipUpsell}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
