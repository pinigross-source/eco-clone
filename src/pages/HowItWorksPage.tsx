import { useState, lazy, Suspense } from "react";
import { SprayCan, Grid2X2, ShieldCheck, Repeat, Leaf, Home, Shield, HeartPulse, Gauge, Building2, Check, ArrowRight, Play, Sparkles, AlertTriangle, Wind, Zap } from "lucide-react";

const ActiveDefenseToggle = lazy(() => import("@/components/hero/ActiveDefenseToggle").then(m => ({ default: m.ActiveDefenseToggle })));
import { SectionLabel } from "@/components/ui/section-label";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
const HVACFlowAnimation = lazy(() => import("@/components/HVACFlowAnimation").then(m => ({ default: m.HVACFlowAnimation })));
import howItWorksThumb from "@/assets/how-it-works-video-thumb.jpg";
import howItWorksHeroBg from "@/assets/how-it-works-hero-bg.avif";
const HowItWorksThumbnailMistOverlay = lazy(() => import("@/components/HowItWorksThumbnailMistOverlay").then(m => ({ default: m.HowItWorksThumbnailMistOverlay })));
import { SEOHead, howToJsonLd, makeBreadcrumbJsonLd } from "@/components/SEOHead";
const RelatedTopics = lazy(() => import("@/components/RelatedTopics").then(m => ({ default: m.RelatedTopics })));

const steps = [
  {
    icon: SprayCan,
    title: "Disperse",
    text: "Your device automatically releases a fine mist of living probiotics into the air, reaching every room it serves.",
  },
  {
    icon: Grid2X2,
    title: "Settle",
    text: "The probiotics land on every surface a filter never reaches. Countertops, bedding, pillows, remotes, vents, corners. Exactly where dust, allergens, and odors collect.",
  },
  {
    icon: ShieldCheck,
    title: "Neutralize",
    text: "The probiotics break down odors, allergens, and the bacteria that cause them. At the source. Around the clock. Long after they've landed.",
  },
];

const hvacBenefits = [
  "Probiotics travel through ducts, coils, and internal surfaces",
  "Airflow carries protection to every connected room",
  "A stable microbial layer suppresses buildup between service intervals",
];

const features = [
  { icon: Repeat, title: "Continuous", text: "Works between cleanings" },
  { icon: Leaf, title: "Non-chemical", text: "Supports balance, not harsh removal" },
  { icon: Home, title: "Designed for real homes", text: "Safe for daily life" },
];

const results = [
  {
    icon: HeartPulse,
    title: "Healthier indoor environments",
    bullets: [
      "Elimination of noxious odors",
      "Reduced circulation of pathogens",
      "More consistent home comfort",
    ],
  },
  {
    icon: Gauge,
    title: "More stable system performance",
    bullets: [
      "Cleaner internal surfaces",
      "Better airflow",
      "Reduces strain on your HVAC system",
    ],
  },
  {
    icon: Building2,
    title: "Long term system value",
    bullets: [
      "Less need for intensive maintenance",
      "Longer HVAC system life",
      "Protection for the system that serves your home",
    ],
  },
];

const settlingPoints = [
  "Surfaces you touch every day",
  "Furniture, carpets, and bedding",
  "Cracks, crevices, and hidden areas",
  "HVAC ducts that recirculate air",
];

const HowItWorksPage = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="How Probiotic Air & Surface Treatment Works"
        description="Learn how EnviroBiotics environmental probiotics disperse, settle, and continuously support healthier indoor air and surfaces. Science-backed technology explained."
        path="/how-it-works"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            howToJsonLd,
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "How It Works", url: "/how-it-works" },
            ]),
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How does EnviroBiotics work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "EnviroBiotics devices automatically release beneficial Bacillus probiotics into your space in three steps: (1) Disperse, probiotics are released as an invisible mist, (2) Settle, they land on surfaces, fabrics, and hard-to-reach areas, (3) Support, they suppress harmful bacteria and mold by outcompeting them for nutrients. The cycle runs 24/7 without any manual effort.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is probiotic air purification safe?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. The Bacillus probiotics used in EnviroBiotics devices are FDA GRAS (Generally Recognized As Safe) certified, produce no ozone or VOCs, and are MADE SAFE certified. They are safe for daily exposure around children, infants, pregnant women, and pets.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the difference between a probiotic purifier and a HEPA air purifier?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A HEPA air purifier filters particles that physically pass through the machine, but cannot treat surfaces, fabrics, or areas without airflow. A probiotic purifier like EnviroBiotics releases beneficial bacteria that actively colonize surfaces throughout the room, treating contamination at its source. Many users combine both technologies for comprehensive protection.",
                  },
                },
              ],
            },
          ],
        }}
      />
      <Navbar />
      <main>
      {/* Hero Section - HVAC style boxed card */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="container relative z-10 px-5 md:px-6">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] ring-1 ring-black/[0.06] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.35),0_20px_40px_-20px_rgba(0,0,0,0.15)]">
            {/* Background image */}
            <img
              src={howItWorksHeroBg}
              alt=""
              aria-hidden="true"
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Readability gradient — lighter wash to keep image bright */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 px-6 py-20 sm:px-12 sm:py-28 md:px-16 md:py-36 lg:px-20 lg:py-44">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/80 mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  The Science
                </span>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-display font-bold leading-[1.02] tracking-[-0.035em] text-white mb-6">
                  How EnviroBiotics
                  <br />
                  <span className="text-[#F97316]">works.</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-xl leading-relaxed mb-10">
                  Unlike passive air filters, EnviroBiotics works proactively, continuously cleaning the surfaces, air, and ventilation systems that move air through your home.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://shop.envirobiotics.com/collections/all"
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

      {/* Problem Section - Indoor Contamination */}
      <section className="section-padding bg-[#fafaf7]">
        <div className="container px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal variant="fadeUp">
              <div className="space-y-5 md:space-y-6">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  The Problem
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
                  Why air filtration alone won't keep your home clean.
                </h2>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Most of what's in the air doesn't stay there. Dust, allergens, and odor-causing particles settle onto surfaces, fabrics, and objects, then get stirred back into the air with every footstep, door, and breath of moving air. Cleaning the air alone isn't enough. You have to treat the surfaces it lands on.
                </p>

                <ul className="space-y-3 pt-2">
                  {settlingPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm md:text-base text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-black/[0.04] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)] bg-[#fafaf7]">
                <img
                  src="/assets/surfaces-hero.webp"
                  alt="Particles settling on surfaces inside a home"
                  width="512"
                  height="683"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Video Section - between Problem and Process */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-5 md:px-6">
          <ScrollReveal variant="fadeUp" className="max-w-5xl mx-auto">
            <div
              className="relative rounded-[2rem] overflow-hidden ring-1 ring-black/[0.06] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.25),0_20px_40px_-20px_rgba(0,0,0,0.1)] cursor-pointer group"
              onClick={() => setIsVideoOpen(true)}
            >
              <div className="aspect-video relative">
                <img
                  src={howItWorksThumb}
                  alt="How EnviroBiotics Works video preview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                <Suspense fallback={null}>
                  <HowItWorksThumbnailMistOverlay />
                </Suspense>
              </div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/30 animate-ping" />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6 md:w-7 md:h-7 text-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                  Watch How It Works
                </span>
                <span className="text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-inset ring-white/20">
                  1:40
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Video Dialog */}
        <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
          <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-background">
            <DialogTitle className="sr-only">How EnviroBiotics Works Video</DialogTitle>
            <div className="aspect-video w-full">
              <iframe
                src="https://player.vimeo.com/video/1041721190?autoplay=1&title=0&byline=0&portrait=0"
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="How EnviroBiotics Works"
              />
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Steps Section - The 3-Step Process */}
      <section className="section-padding bg-background">
        <div className="container px-5 md:px-6">
          <ScrollReveal variant="fadeUp" className="max-w-3xl mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
              <Repeat className="w-3.5 h-3.5" />
              The Process
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[3.75rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-5">
              A simple 3-step cycle.
              <br />
              Always running.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              EnviroBiotics works automatically in the background, creating a proactive layer of protection throughout your space.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-5 md:gap-6" staggerDelay={0.15}>
            {steps.map(({ icon: Icon, title, text }, index) => (
              <StaggerItem key={title} variant="fadeUp">
                <div className="h-full p-8 md:p-10 rounded-[1.75rem] bg-card ring-1 ring-black/[0.04] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.12)] hover:-translate-y-1">
                  <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-6 mb-6 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-foreground mb-3">
                    {title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal variant="fadeUp" delay={0.4} className="mt-10 md:mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card ring-1 ring-black/[0.06]">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-foreground">Runs quietly in the background, 24/7</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Interactive Comparison Animation */}
      <section className="section-padding bg-background">
        <div className="container px-5 md:px-6">
          <Suspense fallback={<div className="w-full max-w-5xl mx-auto aspect-[16/8] bg-muted/20 rounded-2xl animate-pulse" />}>
            <ActiveDefenseToggle />
          </Suspense>
        </div>
      </section>

      {/* HVAC Section - Whole Home Coverage */}
      <section className="section-padding bg-[#fafaf7]">
        <div className="container px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal variant="fadeUp">
              <div className="space-y-5 md:space-y-6">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70">
                  <Wind className="w-3.5 h-3.5" />
                  Whole-Home Coverage
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
                  Probiotic protection
                  <br />
                  in every room.
                </h2>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Your HVAC system connects every room in your home. EnviroBiotics works with this natural airflow to deliver protection everywhere air travels.
                </p>

                <div className="rounded-2xl bg-card ring-1 ring-black/[0.04] p-6">
                  <ul className="space-y-3">
                    {hvacBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm md:text-base text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-black/[0.04] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)]">
                <img
                  src="/assets/hvac-lungs-home.jpg"
                  alt="HVAC system as the lungs of your home, cross-section showing air circulation"
                  className="w-full object-cover aspect-[4/3]"
                  loading="lazy"
                  decoding="async"
                />
                <Suspense fallback={null}>
                  <HVACFlowAnimation />
                </Suspense>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What Makes It Different - Feature Block */}
      <section className="section-padding bg-background">
        <div className="container px-5 md:px-6">
          <ScrollReveal variant="fadeUp" className="max-w-3xl mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
              <Shield className="w-3.5 h-3.5" />
              The Difference
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[3.75rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-5">
              Stop reacting.
              <br />
              Start protecting.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Most cleaning happens after the buildup appears. EnviroBiotics helps maintain balance on surfaces so your home stays more stable between cleanings.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-3 gap-5 md:gap-6" staggerDelay={0.12}>
            {features.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title} variant="fadeUp">
                <div className="h-full p-7 md:p-8 rounded-[1.75rem] bg-card ring-1 ring-black/[0.04] transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-semibold tracking-tight text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Results Grid */}
      <section className="section-padding bg-[#fafaf7]">
        <div className="container px-5 md:px-6">
          <ScrollReveal variant="fadeUp" className="max-w-3xl mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              The Results
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[3.75rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              Long-term benefits
              <br />
              for your home and health.
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-5 md:gap-6" staggerDelay={0.12}>
            {results.map(({ icon: Icon, title, bullets }) => (
              <StaggerItem key={title} variant="fadeUp">
                <div className="h-full p-7 md:p-9 rounded-[1.75rem] bg-card ring-1 ring-black/[0.04] transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)]">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-semibold tracking-tight text-foreground mb-4">{title}</h3>
                  <ul className="space-y-2.5">
                    {bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Shared Spaces Section */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal variant="fadeUp" className="order-2 lg:order-1">
              <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-black/[0.04] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)]">
                <img
                  src="/assets/building-breathing.png"
                  alt="Modern building representing shared indoor spaces"
                  className="w-full object-cover object-center aspect-[3/4] md:aspect-square"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.2} className="order-1 lg:order-2">
              <div className="space-y-5 md:space-y-6">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70">
                  <Building2 className="w-3.5 h-3.5" />
                  Shared Spaces
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
                  The air you share
                  <br />
                  impacts everyone inside.
                </h2>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  At home. At work. Across every building you step into.
                </p>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Most families and teams spend over 90% of their time indoors, breathing air that's constantly circulated through HVAC systems.
                </p>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  EnviroBiotics works directly with those systems to help support healthier indoor environments, reducing unwanted buildup and making shared spaces more comfortable for the people who live and work in them.
                </p>

                <div className="pt-3">
                  <p className="text-base md:text-lg font-semibold text-foreground leading-snug tracking-tight">
                    One solution.
                    <br />
                    Designed for homes. Trusted in workplaces.
                    <br />
                    Built for the spaces we share every day.
                  </p>
                </div>

                <div className="pt-5 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://shop.envirobiotics.com/collections/all"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
                  >
                    Explore Solutions
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  Safe for families. Trusted in workplaces.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="container max-w-4xl px-4 pb-16">
        <RelatedTopics currentPath="/how-it-works" />
      </section>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
};

export default HowItWorksPage;
