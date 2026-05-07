import { useState, useMemo } from "react";
import { Link } from "@/lib/link";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/productData";
import { motion } from "framer-motion";
import {
  Home,
  Filter,
  Check,
  ArrowRight,
  Star,
  X,
  AlertTriangle,
  Droplets,
  Bug,
  Wind,
  PawPrint,
  Baby,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  Leaf,
  Clock,
  Zap,
  Sofa,
  CookingPot,
  BedDouble,
  Building2,
} from "lucide-react";

import familyCleanHomeImg from "@/assets/family-clean-home.avif";
import roomHiddenProblemsImg from "@/assets/room-hidden-problems.avif";
import familyPetImg from "@/assets/family-pet-living-room.jpg";
import roomHeroBg from "@/assets/room-solutions-hero-bg.avif";

/* ─── Problem Sources ─── */
const problemSources = [
  {
    icon: Droplets,
    title: "Mold & Moisture",
    description:
      "Bathrooms, basements, and kitchens trap moisture that feeds mold growth on walls, grout, and hidden cavities. Mold releases spores that trigger respiratory issues and persistent musty odors.",
    locations: "Bathrooms, basements, windowsills",
  },
  {
    icon: Bug,
    title: "Dust Mites & Allergens",
    description:
      "Mattresses, upholstered furniture, and carpets harbor millions of dust mites. Their waste particles become airborne, triggering sneezing, congestion, and asthma symptoms.",
    locations: "Bedrooms, living rooms, offices",
  },
  {
    icon: Wind,
    title: "Odors & VOCs",
    description:
      "Cooking, cleaning products, pet areas, and off-gassing furniture release volatile compounds and persistent odors that linger in enclosed spaces and recirculate through the home.",
    locations: "Kitchens, laundry rooms, garages",
  },
  {
    icon: PawPrint,
    title: "Pet Dander & Bacteria",
    description:
      "Pets shed dander, fur, and track bacteria across every surface. These contaminants settle on furniture, bedding, and floors, creating ongoing allergy triggers for sensitive individuals.",
    locations: "Everywhere pets roam",
  },
  {
    icon: AlertTriangle,
    title: "Surface Pathogens",
    description:
      "High-touch surfaces like door handles, light switches, remotes, and countertops accumulate harmful microbes throughout the day, recontaminating within hours of cleaning.",
    locations: "Every high-touch surface",
  },
  {
    icon: Baby,
    title: "Nursery & Children's Spaces",
    description:
      "Cribs, play mats, toys, and changing tables are breeding grounds for bacteria. Children's developing immune systems make them especially vulnerable to indoor contaminants.",
    locations: "Nurseries, playrooms, schools",
  },
];

/* ─── Where problems hide ─── */
const roomHotspots = [
  { icon: BedDouble, label: "Bedrooms", detail: "Dust mites in pillows, mattresses & sheets" },
  { icon: Sofa, label: "Living Rooms", detail: "Pet dander, upholstery allergens & remote controls" },
  { icon: CookingPot, label: "Kitchens", detail: "Grease, moisture, food bacteria & odors" },
  { icon: Droplets, label: "Bathrooms", detail: "Mold, mildew & damp towel bacteria" },
  { icon: Building2, label: "Home Offices", detail: "Keyboard microbes, stale air & dust" },
  { icon: Baby, label: "Nurseries", detail: "Crib surfaces, toys & changing tables" },
];

/* ─── Traditional vs EnviroBiotics ─── */
const comparison = [
  {
    category: "Approach",
    traditional: "Kill everything temporarily",
    envirobiotics: "Outcompete harmful microbes naturally",
  },
  {
    category: "Target",
    traditional: "Air only",
    envirobiotics: "Air AND surfaces, treating the source",
  },
  {
    category: "Duration",
    traditional: "Minutes to hours of effect",
    envirobiotics: "Continuous 24/7 protection",
  },
  {
    category: "Chemicals",
    traditional: "Harsh chemicals & fragrances",
    envirobiotics: "100% natural probiotics",
  },
  {
    category: "Maintenance",
    traditional: "Constant re-cleaning required",
    envirobiotics: "Simple cartridge swap every 3-6 months",
  },
];

/* ─── Room size / space filters ─── */
const roomSizes = [
  { id: "all", label: "All Sizes" },
  { id: "small", label: "Up to 300 sq ft", max: 300 },
  { id: "medium", label: "300–1000 sq ft", min: 300, max: 1000 },
  { id: "large", label: "1000+ sq ft", min: 1000 },
];

const spaceTypes = [
  { id: "all", label: "All Spaces" },
  { id: "bedroom", label: "Bedrooms" },
  { id: "living", label: "Living Rooms" },
  { id: "office", label: "Home Offices" },
  { id: "nursery", label: "Nurseries" },
  { id: "travel", label: "Travel" },
];

const RoomSolutionsPage = () => {
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedSpace, setSelectedSpace] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    const roomProducts = products.filter((p) => p.slug !== "ebiotic-pro");
    return roomProducts.filter((product) => {
      const coverageMatch = product.coverage.match(/(\d+,?\d*)/);
      const coverage = coverageMatch ? parseInt(coverageMatch[1].replace(",", "")) : 0;

      if (selectedSize !== "all") {
        const sizeFilter = roomSizes.find((s) => s.id === selectedSize);
        if (sizeFilter) {
          if (sizeFilter.max && coverage > sizeFilter.max) return false;
          if (sizeFilter.min && coverage < sizeFilter.min) return false;
        }
      }

      if (selectedSpace !== "all") {
        const spaceKeywords: Record<string, string[]> = {
          bedroom: ["bedroom", "master", "sleep"],
          living: ["living", "room", "playroom"],
          office: ["office", "desk", "work"],
          nursery: ["nursery", "baby", "children"],
          travel: ["travel", "portable", "plane"],
        };
        const keywords = spaceKeywords[selectedSpace] || [];
        const idealForLower = product.idealFor.map((i) => i.toLowerCase()).join(" ");
        if (!keywords.some((k) => idealForLower.includes(k))) return false;
      }

      return true;
    });
  }, [selectedSize, selectedSpace]);

  const clearFilters = () => {
    setSelectedSize("all");
    setSelectedSpace("all");
  };

  const hasActiveFilters = selectedSize !== "all" || selectedSpace !== "all";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Room Purifiers: Treat the Source of Indoor Pollution | EnviroBiotics"
        description="Mold, allergens, pet dander &amp; odors don't just float in the air: they live on your surfaces. EnviroBiotics room purifiers treat the source with beneficial probiotics."
        path="/solutions/room"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions" },
              { name: "Room Purifiers", url: "/solutions/room" },
            ]),
            {
              "@type": "WebPage",
              "@id": "https://envirobiotics.com/solutions/room",
              "name": "Room Purifiers: Treat the Source of Indoor Pollution",
              "description": "EnviroBiotics room purifiers treat the source of indoor pollution with beneficial probiotics.",
              "isPartOf": { "@id": "https://envirobiotics.com/#website" },
            },
          ],
        }}
      />
      <Navbar />
      <main>
        {/* ═══════ Hero — Sonos style with background image ═══════ */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="container relative z-10">
            <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] ring-1 ring-black/[0.06] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.35),0_20px_40px_-20px_rgba(0,0,0,0.15)]">
              {/* Background image */}
              <img
                src={roomHeroBg}
                alt=""
                aria-hidden="true"
                loading="eager"
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Readability gradient — lighter wash to keep image bright */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

              {/* Content */}
              <div className="relative z-10 px-6 py-20 sm:px-12 sm:py-28 md:px-16 md:py-36 lg:px-20 lg:py-44">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/80 mb-6">
                    <Home className="w-3.5 h-3.5" />
                    Room Purifier Solutions
                  </span>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-display font-bold leading-[1.02] tracking-[-0.035em] text-white mb-6">
                    It's Not Just <span className="whitespace-nowrap">in the Air.</span>
                    <br />
                    It's on <span className="text-[hsl(24_95%_53%)]">Every Surface.</span>
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-xl leading-relaxed mb-10">
                    Mold, allergens, pet dander, and odors don't disappear with a quick wipe. They live on your surfaces, in your fabrics, and throughout your home. We treat the source, not just the symptoms.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="#products"
                      className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-foreground text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-white/95"
                    >
                      Browse Room Purifiers
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <Link
                      to="/shop#find-my-solution"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white text-sm font-semibold ring-1 ring-inset ring-white/30 backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      Take the Quiz
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ Problem Sources — Sonos clean grid ═══════ */}
        <section className="py-24 md:py-32 bg-background relative">
          <div className="container relative z-10 px-5 md:px-6">
            <ScrollReveal variant="fadeUp" className="max-w-3xl mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                The Hidden Problem
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] mb-6">
                The sources of indoor pollution
                <br className="hidden md:block" />
                <span className="text-[hsl(24_95%_53%)]"> you can't see.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Even in clean homes and offices, harmful microbes, mold, allergens, and odor-causing bacteria accumulate on surfaces, in fabrics, and within hidden cavities. Traditional cleaning only addresses the surface temporarily. The source remains.
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5" staggerDelay={0.08}>
              {problemSources.map(({ icon: Icon, title, description, locations }) => (
                <StaggerItem key={title} variant="fadeUp">
                  <div className="group h-full rounded-3xl bg-muted/40 hover:bg-muted/60 p-7 md:p-8 transition-colors duration-300">
                    <div className="w-11 h-11 rounded-xl bg-background flex items-center justify-center mb-6 ring-1 ring-border/60">
                      <Icon className="w-5 h-5 text-foreground/70" />
                    </div>
                    <h3 className="font-display font-semibold text-lg md:text-xl tracking-tight mb-3">{title}</h3>
                    <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-5">{description}</p>
                    <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground/60">
                      {locations}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ═══════ Where Problems Hide — Sonos split card ═══════ */}
        <section className="py-16 md:py-24 bg-background relative">
          <div className="container px-5 md:px-6">
            <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-muted/40 ring-1 ring-border/50">
              <div className="grid lg:grid-cols-2 gap-0 items-stretch">
                <div className="relative min-h-[320px] lg:min-h-[560px] order-2 lg:order-1">
                  <img
                    src={roomHiddenProblemsImg}
                    alt="Dust and allergens accumulate on everyday home surfaces"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="order-1 lg:order-2 px-7 py-12 sm:px-12 sm:py-16 md:px-14 md:py-20 lg:py-24 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                    Room by Room
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.05] tracking-[-0.03em] mb-5">
                    Every room has a hidden problem.
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                    From the bedroom pillows you press your face into every night, to the kitchen counters where you prepare food, contaminants settle and multiply on the surfaces you touch most.
                  </p>

                  <StaggerContainer className="grid grid-cols-2 gap-2.5 md:gap-3" staggerDelay={0.06}>
                    {roomHotspots.map(({ icon: Icon, label, detail }) => (
                      <StaggerItem key={label} variant="fadeUp">
                        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-background ring-1 ring-border/50">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm leading-tight">{label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{detail}</p>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ We Treat the Source — Sonos editorial split ═══════ */}
        <section className="py-16 md:py-24 bg-background relative">
          <div className="container px-5 md:px-6">
            <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-muted/40 ring-1 ring-border/50">
              <div className="grid lg:grid-cols-2 gap-0 items-stretch">
                <div className="relative min-h-[320px] lg:min-h-[600px]">
                  <img
                    src={familyCleanHomeImg}
                    alt="Family enjoying a healthier living environment with probiotic protection"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="px-7 py-12 sm:px-12 sm:py-16 md:px-14 md:py-20 lg:py-24 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                    The EnviroBiotics Difference
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.05] tracking-[-0.03em] mb-6 text-foreground">
                    We treat the source,
                    <br />
                    not just the air.
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-7 max-w-lg">
                    Our room purifiers release beneficial Bacillus probiotics that don't just float in the air, they settle onto every surface in the room. Once there, they:
                  </p>

                  <ul className="space-y-3.5 mb-9">
                    {[
                      "Colonize surfaces where mold, bacteria, and allergens live",
                      "Outcompete harmful microbes for resources naturally",
                      "Neutralize odors at the source, not with fragrances",
                      "Continue working 24/7, even when you're not home",
                      "Create a healthier microbiome on every surface",
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground text-[15px] md:text-base leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-background text-foreground ring-1 ring-inset ring-border">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      MADE SAFE Certified
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-background text-foreground ring-1 ring-inset ring-border">
                      <Leaf className="w-3.5 h-3.5 text-primary" />
                      100% Natural
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-background text-foreground ring-1 ring-inset ring-border">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      24/7 Protection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ Comparison — Sonos refined ═══════ */}
        <section className="py-24 md:py-32 bg-background relative">
          <div className="container relative z-10 px-5 md:px-6">
            <ScrollReveal variant="fadeUp" className="max-w-3xl mb-12 md:mb-16">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                Why Probiotics Win
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.05] tracking-[-0.03em] mb-5">
                Traditional cleaning vs. EnviroBiotics.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Sprays, wipes, and HEPA filters react to symptoms. Probiotics address the root cause, continuously.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.1}>
              <div className="max-w-4xl rounded-3xl bg-muted/40 ring-1 ring-border/50 overflow-hidden">
                <div className="grid grid-cols-2 px-6 md:px-10 py-5 border-b border-border/60">
                  <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/70">Traditional</div>
                  <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-primary-text">EnviroBiotics</div>
                </div>
                <div className="divide-y divide-border/50">
                  {comparison.map(({ category, traditional, envirobiotics }) => (
                    <div key={category} className="px-6 md:px-10 py-5 md:py-6">
                      <div className="text-[10px] md:text-xs font-medium text-muted-foreground/70 uppercase tracking-[0.18em] mb-3">
                        {category}
                      </div>
                      <div className="grid grid-cols-2 gap-6 md:gap-10">
                        <div className="flex items-start gap-2.5">
                          <XCircle className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                          <span className="text-sm md:text-[15px] text-muted-foreground leading-snug">{traditional}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm md:text-[15px] text-foreground font-medium leading-snug">{envirobiotics}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════ Product Grid ═══════ */}
        <section id="products" className="section-padding bg-background relative overflow-hidden">
          <div className="container px-5 md:px-6">
            <ScrollReveal variant="fadeUp" className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                <Zap className="w-3.5 h-3.5" />
                Our Room Purifiers
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.05] tracking-[-0.03em] mb-5">
                Choose the right device for your space.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                From portable personal protection to whole-room coverage, find the purifier that fits your lifestyle.
              </p>
            </ScrollReveal>

            {/* Filter Bar */}
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {(selectedSize !== "all" ? 1 : 0) + (selectedSpace !== "all" ? 1 : 0)}
                    </Badge>
                  )}
                </Button>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                    <X className="h-3 w-3" />
                    Clear all
                  </Button>
                )}

                <div className="ml-auto text-sm text-muted-foreground">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                </div>
              </div>

              {showFilters && (
                <div className="card-premium p-6 rounded-2xl mb-8 animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold mb-3 text-foreground">Room Size</h3>
                      <div className="flex flex-wrap gap-2">
                        {roomSizes.map((size) => (
                          <button
                            key={size.id}
                            onClick={() => setSelectedSize(size.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              selectedSize === size.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80 text-foreground"
                            }`}
                          >
                            {size.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-3 text-foreground">Space Type</h3>
                      <div className="flex flex-wrap gap-2">
                        {spaceTypes.map((space) => (
                          <button
                            key={space.id}
                            onClick={() => setSelectedSpace(space.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              selectedSpace === space.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80 text-foreground"
                            }`}
                          >
                            {space.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.1}>
              {filteredProducts.map((product) => (
                <StaggerItem key={product.slug} variant="fadeUp">
                  <div className="group card-premium rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative aspect-square bg-gradient-to-br from-muted/50 to-muted p-8 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500 will-change-transform"
                        style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({product.slug === "biologic-mini" ? "70+" : product.slug === "biotica-800" ? "40+" : "20+"} reviews)
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-bold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{product.tagline}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="text-xs">{product.coverage}</Badge>
                        {product.idealFor.slice(0, 2).map((ideal) => (
                          <Badge key={ideal} variant="outline" className="text-xs">{ideal}</Badge>
                        ))}
                      </div>

                      <ul className="space-y-2 mb-6 flex-grow">
                        {product.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                        <div>
                          {product.price ? (
                            <>
                              <span className="text-2xl font-bold text-foreground">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through ml-2">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-sm font-medium text-primary">Get a Quote</span>
                          )}
                        </div>
                        <Button variant="hero" size="sm" asChild>
                          <Link to={`/product/${product.slug}`}>
                            View Details
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">No products match your current filters.</p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </section>

        {/* ═══════ HVAC + Quiz — Sonos dual cards ═══════ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-5 md:px-6">
            <div className="grid lg:grid-cols-2 gap-5 md:gap-6">
              <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-primary/5 ring-1 ring-primary/15 p-10 sm:p-12 md:p-14 min-h-[360px] flex flex-col justify-end">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-primary-text mb-5">
                    Whole-Building Coverage
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-[1.08] tracking-[-0.02em] mb-4 text-foreground">
                    Need protection for your entire building?
                  </h2>
                  <p className="text-muted-foreground mb-8 text-base md:text-lg max-w-md leading-relaxed">
                    Our HVAC-integrated E-Biotic Pro system delivers probiotic protection to every room through your existing ductwork, treating up to 25,000 sq ft.
                  </p>
                  <Link
                    to="/hvac"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    Explore HVAC Solutions
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-muted/40 ring-1 ring-border/50 p-10 sm:p-12 md:p-14 min-h-[360px] flex flex-col justify-end">
                <div className="absolute top-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Personal Match
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-[1.08] tracking-[-0.02em] mb-4 text-foreground">
                    Not sure which device is right for you?
                  </h2>
                  <p className="text-muted-foreground mb-8 text-base md:text-lg max-w-md leading-relaxed">
                    Take our 60-second quiz to get a personalized recommendation based on your space, concerns, and lifestyle.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/shop#find-my-solution"
                      className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
                    >
                      Take the Quiz
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/how-it-works"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-background text-foreground text-sm font-semibold ring-1 ring-inset ring-border transition-all hover:bg-background/80"
                    >
                      Learn How It Works
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RoomSolutionsPage;
