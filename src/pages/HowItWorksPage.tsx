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
import protectingLivingRoom from "@/assets/protecting-living-room.jpg";
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
      {/* Hero Section - Editorial atmospheric depth */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="container relative z-10 px-5 md:px-6">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] ring-1 ring-black/[0.06] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.35),0_20px_40px_-20px_rgba(0,0,0,0.15)] min-h-[640px] md:min-h-[720px] flex items-center">
            {/* Background image */}
            <img
              src={howItWorksHeroBg}
              alt=""
              aria-hidden="true"
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Readability gradient — deeper editorial wash */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

            {/* Atmospheric mist orbs */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/3 left-1/4 w-[28rem] h-[28rem] bg-sky-200/10 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-[34rem] h-[34rem] bg-primary/10 blur-[150px] rounded-full animate-pulse [animation-delay:1.2s]" />
              <div className="absolute top-12 right-12 w-40 h-40 bg-white/5 blur-3xl rounded-full" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-6 py-20 sm:px-12 sm:py-28 md:px-16 md:py-36 lg:px-24 lg:py-44">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="w-10 h-px bg-primary" />
                  <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-white/80">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    The Science
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-display font-bold leading-[1.02] tracking-[-0.04em] text-white mb-8">
                  How EnviroBiotics
                  <br />
                  <span className="text-primary whitespace-nowrap">works.</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-xl leading-relaxed font-light mb-12">
                  Unlike passive air filters, EnviroBiotics works proactively, continuously cleaning the surfaces, air, and ventilation systems that move air through your home.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://shop.envirobiotics.com/collections/all"
                    className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-foreground text-sm font-semibold overflow-hidden transition-all duration-500 hover:pr-14 hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.5)]"
                  >
                    <span className="relative z-10">Explore Solutions</span>
                    <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Indoor Contamination */}
      <section className="section-padding bg-background">
        <div className="container px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal variant="fadeUp">
              <div className="space-y-5 md:space-y-6">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  The Problem
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
                  Why air filtration alone <span className="text-primary whitespace-nowrap">won't</span> keep your home clean.
                </h2>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Most of what's in the air doesn't stay there. Dust, allergens, and odor-causing particles settle onto surfaces, fabrics, and objects, then get stirred back into the air with every footstep, door, and breath of moving air. Cleaning the air alone isn't enough. You have to treat the surfaces it lands on.
                </p>

                <ul className="space-y-4 pt-4">
                  {settlingPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-5 group">
                      <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-primary/5 border border-primary/15 flex items-center justify-center text-primary text-xs font-bold tracking-wider transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:-translate-y-0.5">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <span className="text-base md:text-lg text-foreground/80 leading-relaxed pt-2.5">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="relative">
                <div aria-hidden="true" className="absolute -inset-6 bg-foreground/[0.04] rounded-[2.5rem] -rotate-2 -z-10" />
                <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-black/[0.04] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)] bg-background">
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
          <ScrollReveal variant="fadeUp" className="max-w-3xl mx-auto mb-16 md:mb-24 text-center">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-6">
              <Repeat className="w-3.5 h-3.5" />
              The Process
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[3.75rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-6">
              A simple 3-step cycle.
              <br />
              <span className="text-primary whitespace-nowrap">Always running.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Plug it in once. EnviroBiotics works automatically in the background, putting a living layer of protection on every surface in your home, 24 hours a day.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.15}>
            {steps.map(({ icon: Icon, title, text }, index) => (
              <StaggerItem
                key={title}
                variant="fadeUp"
                className={index === 1 ? "md:translate-y-10" : index === 2 ? "md:translate-y-20" : ""}
              >
                <div className="group relative h-full p-10 md:p-12 rounded-[2.5rem] bg-card ring-1 ring-primary/10 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-30px_rgba(249,115,22,0.25)] hover:-translate-y-2">
                  {/* Watermark numeral */}
                  <span aria-hidden="true" className="absolute top-6 right-8 text-[7rem] leading-none font-display font-bold text-primary/[0.07] select-none italic">
                    {index + 1}
                  </span>

                  <div className="relative z-10 space-y-6">
                    <div className="w-16 h-16 rounded-3xl bg-primary/8 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:rotate-3">
                      <Icon className="h-7 w-7 text-primary transition-colors duration-500 group-hover:text-primary-foreground" />
                    </div>

                    <div>
                      <span className="block text-[10px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
                        Step {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-3xl md:text-[2rem] font-display font-bold tracking-tight text-foreground mb-4">
                        {title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {text}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal variant="fadeUp" delay={0.4} className="mt-32 md:mt-40 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card ring-1 ring-primary/15 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-foreground tracking-wide">Runs quietly. Works constantly. Notice nothing but the difference.</span>
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
      <section className="section-padding bg-background">
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
                  <span className="text-primary whitespace-nowrap">in every room.</span>
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

      {/* What Makes It Different — editorial split */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container px-5 md:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Image — anchors the section */}
            <ScrollReveal variant="fadeUp" className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative">
                {/* Soft ambient glow behind the frame */}
                <div
                  aria-hidden
                  className="absolute -inset-6 md:-inset-10 rounded-[3rem] pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 30% 40%, rgba(244, 197, 153, 0.35) 0%, rgba(244, 197, 153, 0) 70%)",
                    filter: "blur(40px)",
                  }}
                />
                <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-black/[0.04] shadow-[0_40px_120px_-40px_rgba(15,23,42,0.35)]">
                  <img
                    src={protectingLivingRoom}
                    alt="Woman relaxing with tea in a calm sunlit living room — a balanced, breathable space"
                    className="w-full object-cover aspect-[4/5] md:aspect-[5/6]"
                    width={1280}
                    height={1280}
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Subtle bottom vignette for text-friendly base */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,23,42,0.18), rgba(15,23,42,0))",
                    }}
                  />
                  {/* Floating quiet caption — Sonos-style overlay */}
                  <div className="absolute left-5 md:left-7 bottom-5 md:bottom-7 right-5 md:right-7">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md ring-1 ring-black/[0.04] shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-700">
                        Balance maintained
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Copy + features */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <ScrollReveal variant="fadeUp">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                  <Shield className="w-3.5 h-3.5" />
                  The Difference
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.02] tracking-[-0.03em] text-foreground mb-6">
                  Stop reacting.
                  <br />
                  <span className="text-primary whitespace-nowrap">Start protecting.</span>
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 md:mb-12 max-w-md">
                  Most cleaning happens after the buildup appears. EnviroBiotics
                  helps maintain balance on surfaces so your home stays more
                  stable between cleanings.
                </p>
              </ScrollReveal>

              {/* Hairline feature rows — quiet, premium */}
              <StaggerContainer className="divide-y divide-black/[0.06] border-y border-black/[0.06]" staggerDelay={0.1}>
                {features.map(({ icon: Icon, title, text }, i) => (
                  <StaggerItem key={title} variant="fadeUp">
                    <div className="group flex items-start gap-5 py-5 md:py-6 transition-colors">
                      <span className="text-[11px] font-medium tracking-[0.15em] tabular-nums text-muted-foreground/50 pt-1.5 w-8">
                        0{i + 1}
                      </span>
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/[0.08] flex items-center justify-center mt-0.5 transition-colors group-hover:bg-primary/[0.14]">
                        <Icon className="h-[18px] w-[18px] text-primary" strokeWidth={1.5} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-display font-semibold tracking-tight text-foreground mb-1">
                          {title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {text}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="section-padding bg-background">
        <div className="container px-5 md:px-6">
          <ScrollReveal variant="fadeUp" className="max-w-3xl mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              The Results
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[3.75rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              Long-term benefits
              <br />
              for your <span className="text-primary whitespace-nowrap">home and health.</span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-px bg-black/[0.06] ring-1 ring-black/[0.06] rounded-[1.75rem] overflow-hidden" staggerDelay={0.12}>
            {results.map(({ icon: Icon, title, bullets }, idx) => (
              <StaggerItem key={title} variant="fadeUp">
                <div className="group relative h-full p-8 md:p-10 bg-card transition-colors duration-500 hover:bg-primary/[0.03]">
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-black/[0.08]" />
                    <Icon className="h-[18px] w-[18px] text-primary/80" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-semibold tracking-tight text-foreground leading-snug mb-6 max-w-[14ch]">
                    {title}
                  </h3>
                  <ul className="space-y-0">
                    {bullets.map((bullet, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 py-3 border-t border-black/[0.06] first:border-t-0"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-primary/70 flex-shrink-0" />
                        <span className="text-[15px] text-muted-foreground leading-relaxed">{bullet}</span>
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
                  <span className="text-primary whitespace-nowrap">impacts everyone inside.</span>
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
