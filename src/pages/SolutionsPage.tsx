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
    href: "/solutions/room",
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

        {/* ═══════ Problem — Sonos clean grid ═══════ */}
        <section className="py-24 md:py-32 bg-background relative">
          <div className="container relative z-10 px-5 md:px-6">
            <ScrollReveal variant="fadeUp" className="max-w-3xl mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                The Hidden Problem
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] mb-6">
                Your indoor environment is
                <br className="hidden md:block" />
                <span className="text-[hsl(24_95%_53%)]"> working against you.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Even in clean homes and offices, microbes accumulate on surfaces, in fabrics, and throughout your HVAC system. The symptoms? Sneezing, congestion, lingering odors, and that stuffy feeling you can't quite shake.
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5" staggerDelay={0.08}>
              {problemPoints.map(({ icon: Icon, title, description, locations }) => (
                <StaggerItem key={title} variant="fadeUp">
                  <div className="group h-full rounded-3xl bg-muted/40 hover:bg-muted/60 p-7 md:p-8 transition-colors duration-300">
                    <div className="w-11 h-11 rounded-xl bg-background flex items-center justify-center mb-6 ring-1 ring-border/60">
                      <Icon className="w-5 h-5 text-foreground/70" />
                    </div>
                    <h3 className="font-display font-semibold text-lg md:text-xl tracking-tight mb-3">
                      {title}
                    </h3>
                    <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-5">
                      {description}
                    </p>
                    <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground/60">
                      {locations}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ═══════ Nature's Answer — Sonos editorial split ═══════ */}
        <section className="py-16 md:py-24 bg-background relative">
          <div className="container px-5 md:px-6">
            <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-muted/40 ring-1 ring-border/50">
              <div className="grid lg:grid-cols-2 gap-0 items-stretch">
                <div className="relative min-h-[320px] lg:min-h-[600px]">
                  <img
                    src={familyLivingImg}
                    alt="A family enjoying a healthier living environment with probiotic protection"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="px-7 py-12 sm:px-12 sm:py-16 md:px-14 md:py-20 lg:py-24 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                    The EnviroBiotics Difference
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.05] tracking-[-0.03em] mb-6 text-foreground">
                    Nature's answer
                    <br />
                    to indoor pollution.
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-7 max-w-lg">
                    EnviroBiotics uses beneficial <strong>Bacillus probiotics</strong>, naturally occurring bacteria safely used for decades. When released into your space, they:
                  </p>

                  <ul className="space-y-3.5 mb-8">
                    {[
                      "Colonize surfaces where harmful microbes live",
                      "Outcompete pathogens for resources naturally",
                      "Continue working 24/7, even when you're away",
                      "Support fresher air and reduced odors over time",
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground text-[15px] md:text-base">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background ring-1 ring-border/60 text-xs font-medium text-foreground">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      MADE SAFE Certified
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background ring-1 ring-border/60 text-xs font-medium text-foreground">
                      <Leaf className="w-3.5 h-3.5 text-primary" />
                      100% Natural
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background ring-1 ring-border/60 text-xs font-medium text-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      24/7 Protection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ Traditional vs EnviroBiotics — minimal table ═══════ */}
        <section className="py-16 md:py-24 bg-background relative">
          <div className="container px-5 md:px-6 max-w-5xl">
            <ScrollReveal variant="fadeUp" className="max-w-3xl mb-12 md:mb-16">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                Side by Side
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.05] tracking-[-0.03em] mb-5">
                Traditional cleaning vs.
                <br className="hidden md:block" />
                <span className="text-[hsl(24_95%_53%)]"> probiotic protection.</span>
              </h2>
            </ScrollReveal>

            <div className="rounded-[2rem] bg-muted/40 ring-1 ring-border/50 overflow-hidden">
              <div className="grid grid-cols-3 px-6 sm:px-10 py-5 border-b border-border/50 text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground/70">
                <div>Category</div>
                <div>Traditional</div>
                <div className="text-primary">EnviroBiotics</div>
              </div>
              {traditionalVsEnvirobiotics.map(({ category, traditional, envirobiotics }, i) => (
                <div
                  key={category}
                  className={`grid grid-cols-3 px-6 sm:px-10 py-5 sm:py-6 items-start gap-3 ${
                    i !== traditionalVsEnvirobiotics.length - 1 ? "border-b border-border/40" : ""
                  }`}
                >
                  <div className="font-semibold text-sm sm:text-base text-foreground">{category}</div>
                  <div className="text-sm sm:text-[15px] text-muted-foreground leading-snug">{traditional}</div>
                  <div className="text-sm sm:text-[15px] text-foreground font-medium leading-snug flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{envirobiotics}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ Solution Categories — Sonos pillar cards ═══════ */}
        <section id="solutions" className="py-24 md:py-32 bg-background relative">
          <div className="container relative z-10 px-5 md:px-6">
            <ScrollReveal variant="fadeUp" className="max-w-3xl mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                Our Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] mb-6">
                Solutions for
                <br className="hidden md:block" />
                <span className="text-[hsl(24_95%_53%)]"> every environment.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                From single rooms to entire buildings and agricultural operations, choose the probiotic approach that fits your space.
              </p>
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
                Not sure which is
                <br className="hidden md:block" />
                <span className="text-[hsl(24_95%_53%)]"> right for you?</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-9">
                Take our 60-second quiz to get a personalized recommendation based on your space, concerns, and lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/shop#find-my-solution"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Take the Quiz
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
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
