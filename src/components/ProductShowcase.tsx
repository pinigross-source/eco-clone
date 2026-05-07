import { useState, useEffect, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "@/lib/link";

import biotica800 from "@/assets/biotica800-hero.avif";
import biologicMini from "@/assets/biologic-mini-nobg-new.avif";
import ebioticPro from "@/assets/ebiotic-pro.avif";
import betterairUnit from "@/assets/betterair-unit.avif";

const products = [
  {
    id: 1,
    name: "BioLogic Mini",
    slug: "biologic-mini",
    tagline: "Single room",
    coverage: "300 sq ft",
    description: "Compact and rechargeable. Perfect for travel, offices, or any small space.",
    image: biologicMini,
  },
  {
    id: 2,
    name: "Biotica 800",
    slug: "biotica-800",
    tagline: "Best for Most Spaces",
    coverage: "800 sq ft",
    description: "Full-room coverage with continuous surface protection for large living spaces.",
    image: biotica800,
  },
  {
    id: 3,
    name: "BA 2080",
    slug: "ba-2080",
    tagline: "Hybrid Technology",
    coverage: "2,600 sq ft",
    description: "Probiotic and advanced HEPA combined for ultimate purification in large spaces.",
    image: betterairUnit,
  },
  {
    id: 4,
    name: "E-Biotic Pro",
    slug: "ebiotic-pro",
    tagline: "For larger spaces",
    coverage: "25,000 sq ft",
    description: "Commercial-strength HVAC-connected protection for buildings and facilities.",
    image: ebioticPro,
  },
];

const ContactFormDialog = lazy(() => import("@/components/ContactFormDialog").then(m => ({ default: m.ContactFormDialog })));

export const ProductShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  const activeProduct = products[activeIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goPrev = () => { setIsAutoPlaying(false); setActiveIndex((p) => (p - 1 + products.length) % products.length); };
  const goNext = () => { setIsAutoPlaying(false); setActiveIndex((p) => (p + 1) % products.length); };
  const goTo = (i: number) => { setIsAutoPlaying(false); setActiveIndex(i); };

  return (
    <section className="py-28 sm:py-36 lg:py-44 bg-background">
      <div className="container max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-6">
              Find Your Device
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold leading-[1.06] tracking-[-0.03em] text-foreground max-w-3xl mx-auto">
              Choose your level.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              From single rooms to entire buildings, pick the right fit for your space.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Product image */}
          <ScrollReveal variant="fadeLeft">
            <div className="relative flex items-center justify-center py-8">
              <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/8 via-transparent to-accent/8 blur-2xl" />

              <div className="relative z-10 bg-card rounded-2xl p-8 border border-border/40">
                <img
                  key={activeProduct.id}
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  width="320"
                  height="320"
                  loading="lazy"
                  decoding="async"
                  className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto drop-shadow-lg animate-fade-in"
                />
              </div>

              <button onClick={goPrev} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 border border-border/50 flex items-center justify-center hover:bg-card transition-all z-20" aria-label="Previous product">
                <ChevronLeft className="h-5 w-5 text-muted-foreground" />
              </button>
              <button onClick={goNext} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 border border-border/50 flex items-center justify-center hover:bg-card transition-all z-20" aria-label="Next product">
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal variant="fadeRight">
            <div className="flex flex-col gap-5 text-center lg:text-left">
              {/* Dots */}
              <div className="flex items-center justify-center lg:justify-start gap-2">
                {products.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                    }`}
                    aria-label={`View ${products[i].name}`}
                  />
                ))}
              </div>

              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{activeProduct.tagline}</p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
                  {activeProduct.name}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground/60 font-medium">{activeProduct.coverage} coverage</p>

              <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0 min-h-[3rem]">
                {activeProduct.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
                {activeProduct.name === "E-Biotic Pro" ? (
                  <Button variant="hero" size="lg" className="group" onClick={() => setContactOpen(true)}>
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button variant="hero" size="lg" className="group" asChild>
                    <Link to={`/product/${activeProduct.slug}`}>
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                )}
                <Button variant="outline" size="lg" asChild>
                  <a href="#match">Need help choosing?</a>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground/50 pt-2">
                30-day trial · Free shipping on bundles · 1 year warranty
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Suspense fallback={null}>
        <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
      </Suspense>
    </section>
  );
};
