import { Link } from "@/lib/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { products } from "@/data/productData";
import {
  Sparkles,
  Check,
  ArrowRight,
  AlertTriangle,
  Droplets,
  Wind,
  ShieldCheck,
  Leaf,
  Clock,
  CheckCircle2,
  DoorOpen,
  Fan,
  ExternalLink,
  Quote,
  Star,
} from "lucide-react";

import solutionsHeroBg from "@/assets/solutions-hero-bg.avif";
import familyLivingImg from "@/assets/family-living-cozy.jpg";
import hiddenProblemImg from "@/assets/hidden-problem-livingroom.jpg";

const problemPoints = [
  {
    icon: AlertTriangle,
    title: "Hidden Surface Buildup",
    description:
      "Keyboards, remotes, countertops, and high-touch areas harbor microbes that accumulate daily, recontaminating within hours of cleaning.",
    locations: "High-touch surfaces",
  },
  {
    icon: Droplets,
    title: "Moisture & Odors",
    description:
      "Bathrooms, kitchens, and pet areas trap moisture where bacteria and mold thrive, causing persistent odors that recirculate through the home.",
    locations: "Bathrooms, kitchens, pet areas",
  },
  {
    icon: Wind,
    title: "HVAC Spreads Contaminants",
    description:
      "Your air ducts circulate dust, allergens, and microbes throughout every room, turning a localized problem into a whole-home one.",
    locations: "Ductwork & vents",
  },
];

const traditionalVsEnvirobiotics = [
  { category: "Approach", traditional: "React after problems appear", envirobiotics: "Proactively prevent buildup" },
  { category: "Duration", traditional: "Temporary relief (hours)", envirobiotics: "Continuous 24/7 protection" },
  { category: "Coverage", traditional: "Air only (what passes through)", envirobiotics: "Air AND surfaces throughout space" },
  { category: "Chemicals", traditional: "Often contains harsh chemicals", envirobiotics: "100% natural probiotics" },
  { category: "Maintenance", traditional: "Frequent filter changes & cleaning", envirobiotics: "Simple cartridge swap every 3-6 months" },
];

const solutionCategories = [
  {
    icon: DoorOpen,
    title: "Room Purifiers",
    description:
      "Standalone probiotic devices for individual rooms: bedrooms, living rooms, offices, and nurseries.",
    highlights: [
      "Coverage from 300 to 2,600 sq ft",
      "Plug-and-play, no installation needed",
      "Quiet operation, day and night",
      "Perfect for homes, offices & clinics",
    ],
    cta: "Browse Room Purifiers",
    href: "https://shop.envirobiotics.com/collections/all",
    external: true,
    badge: "Most Popular",
    featured: true,
  },
  {
    icon: Fan,
    title: "HVAC Systems",
    description:
      "Whole-building probiotic treatment integrated into your central air and heating system.",
    highlights: [
      "Up to 25,000 sq ft coverage",
      "Professional installation included",
      "Treats every room through ductwork",
      "Ideal for large homes & commercial spaces",
    ],
    cta: "Explore HVAC Solutions",
    href: "/hvac",
    badge: "Whole-Building",
  },
  {
    icon: Leaf,
    title: "Agriculture",
    description:
      "Probiotic solutions designed for agricultural environments: greenhouses, livestock, and crop treatment.",
    highlights: [
      "Reduce chemical pesticide usage",
      "Improve crop health naturally",
      "Safe for animals and workers",
      "Sustainable farming innovation",
    ],
    cta: "Visit Agriotics",
    href: "https://agriotics.com",
    external: true,
    badge: "New",
  },
];

const SolutionsPage = () => {
  const featuredTestimonial = products[1]?.testimonials?.[0];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Probiotic Solutions for Every Space | EnviroBiotics"
        description="Discover EnviroBiotics probiotic solutions for rooms, HVAC systems, and agriculture. Find the right approach for cleaner air and surfaces."
        path="/solutions"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions" },
            ]),
            {
              "@type": "WebPage",
              "@id": "https://envirobiotics.com/solutions",
              name: "Probiotic Solutions for Every Space",
              description:
                "Discover EnviroBiotics probiotic solutions for rooms, HVAC systems, and agriculture.",
              isPartOf: { "@id": "https://envirobiotics.com/#website" },
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
              <img
                src={solutionsHeroBg}
                alt=""
                aria-hidden="true"
                loading="eager"
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

              <div className="relative z-10 px-6 py-20 sm:px-12 sm:py-28 md:px-16 md:py-36 lg:px-20 lg:py-44">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/80 mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    Probiotic Protection Solutions
                  </span>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-display font-bold leading-[1.02] tracking-[-0.035em] text-white mb-6">
                    Stop Reacting.
                    <br />
                    Start <span className="text-[hsl(24_95%_53%)]">Protecting.</span>
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-xl leading-relaxed mb-10">
                    Traditional cleaning fights symptoms. EnviroBiotics addresses the root cause with beneficial probiotics that continuously support healthier surfaces and air, in every space you live and work.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="#solutions"
                      className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-foreground text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-white/95"
                    >
                      Explore Solutions
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ Problem — Sonos editorial split ═══════ */}
        <section className="py-20 md:py-28 lg:py-32 bg-background relative">
          <div className="container px-5 md:px-6">
            <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-16 xl:gap-20 items-center">
              {/* Editorial copy */}
              <ScrollReveal variant="fadeUp">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-6">
                  The Hidden Problem
                </span>
                <h2 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-balance mb-6">
                  Your indoor environment is{" "}
                  <span className="text-primary whitespace-nowrap">working against you.</span>
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
                  Even in clean homes and offices, microbes accumulate on surfaces, in fabrics, and throughout your HVAC system. The symptoms? Sneezing, congestion, lingering odors, and that stuffy feeling you can't quite shake.
                </p>

                {/* Numbered hairline-divided list */}
                <ul className="border-t border-border/60">
                  {problemPoints.map(({ title, description, locations }, idx) => (
                    <li key={title} className="grid grid-cols-[auto_1fr] gap-5 sm:gap-7 py-5 sm:py-6 border-b border-border/60">
                      <span className="font-display font-bold text-foreground/30 text-xl sm:text-2xl tabular-nums leading-none pt-1">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold text-base sm:text-lg tracking-tight text-foreground mb-1.5">
                          {title}
                        </h3>
                        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-2">
                          {description}
                        </p>
                        <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60">
                          {locations}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              {/* Image with floating chips */}
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <div className="relative aspect-[4/5] rounded-[1.75rem] sm:rounded-3xl overflow-hidden bg-muted ring-1 ring-black/[0.05] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.28)]">
                  <img
                    src={hiddenProblemImg}
                    alt="Sunlit living room with airborne dust catching the light"
                    width={1280}
                    height={1600}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-foreground/0 to-transparent pointer-events-none" />

                  {/* Top-left glass caption */}
                  <div className="absolute top-5 left-5 sm:top-7 sm:left-7 max-w-[15rem]">
                    <div className="backdrop-blur-xl bg-background/85 border border-border/50 rounded-2xl px-5 py-4 shadow-xl">
                      <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-primary mb-1.5">
                        Invisible to the eye
                      </p>
                      <p className="text-sm text-foreground leading-snug">
                        The light reveals what cleaning leaves behind.
                      </p>
                    </div>
                  </div>

                  {/* Bottom-right stat chip */}
                  <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7">
                    <div className="backdrop-blur-xl bg-background/90 border border-border/50 rounded-2xl px-5 py-4 shadow-xl text-right">
                      <div className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-[-0.03em] leading-none">
                        80%
                      </div>
                      <p className="mt-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase text-muted-foreground/70">
                        Lives on surfaces
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════ Nature's Answer — Sonos editorial split ═══════ */}
        <section className="py-20 md:py-28 lg:py-32 bg-background relative">
          <div className="container px-5 md:px-6">
            <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-16 xl:gap-20 items-center">
              {/* Image with floating chips */}
              <ScrollReveal variant="fadeUp">
                <div className="relative aspect-[4/5] rounded-[1.75rem] sm:rounded-3xl overflow-hidden bg-muted ring-1 ring-black/[0.05] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.28)]">
                  <img
                    src={familyLivingImg}
                    alt="A family enjoying a healthier living environment with probiotic protection"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-foreground/0 to-transparent pointer-events-none" />

                  {/* Top-left glass caption */}
                  <div className="absolute top-5 left-5 sm:top-7 sm:left-7 max-w-[15rem]">
                    <div className="backdrop-blur-xl bg-background/85 border border-border/50 rounded-2xl px-5 py-4 shadow-xl">
                      <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-primary mb-1.5">
                        Safe by nature
                      </p>
                      <p className="text-sm text-foreground leading-snug">
                        Gentle enough for the people and pets you love most.
                      </p>
                    </div>
                  </div>

                  {/* Bottom-right stat chip */}
                  <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7">
                    <div className="backdrop-blur-xl bg-background/90 border border-border/50 rounded-2xl px-5 py-4 shadow-xl text-right">
                      <div className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-[-0.03em] leading-none">
                        100%
                      </div>
                      <p className="mt-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase text-muted-foreground/70">
                        Naturally derived
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Editorial copy */}
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-6">
                  The EnviroBiotics Difference
                </span>
                <h2 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-balance mb-6">
                  Nature's answer to{" "}
                  <span className="text-primary whitespace-nowrap">indoor pollution.</span>
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
                  EnviroBiotics uses beneficial <strong className="text-foreground font-semibold">Bacillus probiotics</strong>, naturally occurring bacteria safely used for decades. When released into your space, they go to work, quietly and continuously.
                </p>

                {/* Numbered hairline list */}
                <ul className="border-t border-border/60 mb-10">
                  {[
                    { title: "Colonize", text: "Settle on surfaces where harmful microbes live." },
                    { title: "Outcompete", text: "Crowd out pathogens for resources, naturally." },
                    { title: "Persist", text: "Continue working 24/7, even when you're away." },
                    { title: "Refresh", text: "Support cleaner air and reduced odors over time." },
                  ].map(({ title, text }, idx) => (
                    <li key={title} className="grid grid-cols-[auto_1fr] gap-5 sm:gap-7 py-4 sm:py-5 border-b border-border/60">
                      <span className="font-display font-bold text-foreground/30 text-lg sm:text-xl tabular-nums leading-none pt-1">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                        <h3 className="font-display font-semibold text-base sm:text-lg tracking-tight text-foreground sm:min-w-[7rem]">
                          {title}
                        </h3>
                        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                          {text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Trust chips */}
                <div className="flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-background ring-1 ring-border/60 text-xs font-medium text-foreground">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    MADE SAFE Certified
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-background ring-1 ring-border/60 text-xs font-medium text-foreground">
                    <Leaf className="w-3.5 h-3.5 text-primary" />
                    Natural
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-background ring-1 ring-border/60 text-xs font-medium text-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    24/7 Protection
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════ Traditional vs EnviroBiotics — Sonos editorial comparison ═══════ */}
        <section className="py-20 md:py-28 lg:py-32 bg-card relative">
          <div className="container px-5 md:px-6 max-w-6xl">
            {/* Editorial header */}
            <ScrollReveal variant="fadeUp" className="max-w-3xl mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-6">
                Side by Side
              </span>
              <h2 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-balance">
                Traditional cleaning vs.{" "}
                <span className="text-primary whitespace-nowrap">probiotic protection.</span>
              </h2>
            </ScrollReveal>

            {/* Two-column comparison */}
            <div className="grid lg:grid-cols-2 gap-5 md:gap-6 mb-10">
              {/* Traditional column */}
              <ScrollReveal variant="fadeUp">
                <div className="h-full rounded-[1.75rem] sm:rounded-3xl bg-background ring-1 ring-border/60 p-7 sm:p-9 md:p-10">
                  <div className="flex items-baseline justify-between mb-6 sm:mb-8">
                    <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70">
                      Traditional
                    </p>
                    <p className="text-[11px] font-medium tracking-wide uppercase text-muted-foreground/50">
                      Reactive
                    </p>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.02em] text-foreground/70 leading-tight mb-8 sm:mb-10">
                    Wipe. Filter. Repeat.
                  </h3>
                  <ul>
                    {traditionalVsEnvirobiotics.map(({ category, traditional }, i) => (
                      <li
                        key={category}
                        className={`grid grid-cols-[7rem_1fr] sm:grid-cols-[8rem_1fr] gap-4 sm:gap-6 py-4 sm:py-5 ${
                          i !== traditionalVsEnvirobiotics.length - 1 ? "border-b border-border/50" : ""
                        }`}
                      >
                        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-muted-foreground/60 pt-0.5">
                          {category}
                        </span>
                        <span className="text-sm sm:text-[15px] text-muted-foreground leading-snug line-through decoration-muted-foreground/30 decoration-1">
                          {traditional}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* EnviroBiotics column — light, accented */}
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <div className="relative h-full rounded-[1.75rem] sm:rounded-3xl bg-background ring-1 ring-primary/30 p-7 sm:p-9 md:p-10 shadow-[0_40px_100px_-40px_rgba(234,88,12,0.18)] overflow-hidden">
                  {/* Soft warm wash */}
                  <div
                    className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-[0.10] blur-3xl"
                    style={{ background: "hsl(24 95% 53%)" }}
                    aria-hidden="true"
                  />
                  {/* Top accent rule */}
                  <div className="absolute top-0 left-7 right-7 sm:left-9 sm:right-9 h-[2px] bg-primary/80 rounded-full" aria-hidden="true" />

                  <div className="relative">
                    <div className="flex items-baseline justify-between mb-6 sm:mb-8">
                      <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary">
                        EnviroBiotics
                      </p>
                      <p className="text-[11px] font-medium tracking-wide uppercase text-muted-foreground/60">
                        Proactive
                      </p>
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.02em] leading-tight text-foreground mb-8 sm:mb-10">
                      A living layer.{" "}
                      <span className="text-primary">Always on.</span>
                    </h3>
                    <ul>
                      {traditionalVsEnvirobiotics.map(({ category, envirobiotics }, i) => (
                        <li
                          key={category}
                          className={`grid grid-cols-[7rem_1fr] sm:grid-cols-[8rem_1fr] gap-4 sm:gap-6 py-4 sm:py-5 ${
                            i !== traditionalVsEnvirobiotics.length - 1 ? "border-b border-border/50" : ""
                          }`}
                        >
                          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-muted-foreground/60 pt-0.5">
                            {category}
                          </span>
                          <span className="text-sm sm:text-[15px] text-foreground leading-snug font-medium flex items-start gap-2">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-[3px]" strokeWidth={2.5} />
                            <span>{envirobiotics}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="fadeUp">
              <p className="text-sm sm:text-[15px] text-muted-foreground text-center max-w-2xl mx-auto">
                Same goal. Two completely different approaches. One reacts to what's already there — the other prevents it from settling in.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section id="solutions" className="py-24 md:py-32 bg-background relative">
          <div className="container relative z-10 px-5 md:px-6">
            <ScrollReveal variant="fadeUp" className="max-w-3xl mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                Our Solutions
              </span>
              <h2 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-balance">
                Solutions for{" "}
                <span className="text-primary whitespace-nowrap">every environment.</span>
              </h2>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-3 gap-4 md:gap-5" staggerDelay={0.1}>
              {solutionCategories.map(({ icon: Icon, title, description, highlights, cta, href, external, badge, featured }) => (
                <StaggerItem key={title} variant="fadeUp">
                  <div
                    className={`group h-full rounded-3xl p-7 md:p-9 transition-colors duration-300 flex flex-col ${
                      featured
                        ? "bg-primary/5 ring-1 ring-primary/20 hover:ring-primary/30"
                        : "bg-muted/40 hover:bg-muted/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-7">
                      <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center ring-1 ring-border/60">
                        <Icon className="w-5 h-5 text-foreground/80" />
                      </div>
                      {badge && (
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            featured
                              ? "bg-primary text-primary-foreground"
                              : "bg-background ring-1 ring-border/60 text-muted-foreground"
                          }`}
                        >
                          {badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight mb-3">
                      {title}
                    </h3>
                    <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-6">
                      {description}
                    </p>

                    <ul className="space-y-2.5 mb-8 flex-1">
                      {highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group/btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                          featured
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-foreground text-background hover:bg-foreground/90"
                        }`}
                      >
                        {cta}
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    ) : (
                      <Link
                        to={href}
                        className={`group/btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                          featured
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-foreground text-background hover:bg-foreground/90"
                        }`}
                      >
                        {cta}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ═══════ Testimonial — Sonos quiet quote ═══════ */}
        {featuredTestimonial && (
          <section className="py-16 md:py-24 bg-background">
            <div className="container px-5 md:px-6 max-w-3xl">
              <ScrollReveal variant="fadeUp">
                <div className="rounded-[2rem] bg-muted/40 ring-1 ring-border/50 p-10 md:p-14 text-center">
                  <Quote className="w-8 h-8 text-primary/40 mx-auto mb-6" />
                  <p className="text-xl md:text-2xl lg:text-[1.6rem] font-display font-semibold leading-[1.3] tracking-[-0.01em] text-foreground mb-8">
                    "{featuredTestimonial.quote}"
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(featuredTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[hsl(24_95%_53%)] fill-[hsl(24_95%_53%)]" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{featuredTestimonial.author}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{featuredTestimonial.location}</p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* ═══════ Final CTA — Sonos primary-tinted card ═══════ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-5 md:px-6 max-w-5xl">
            <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-primary/5 ring-1 ring-primary/15 p-10 md:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-5">
                Want to learn
                <br className="hidden md:block" />
                <span className="text-[hsl(24_95%_53%)]"> how it works?</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-9">
                Discover the science behind probiotic environmental purification and how it transforms your indoor spaces.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SolutionsPage;
