import { lazy, Suspense, useState, useEffect } from "react";
import { X } from "lucide-react";
import girlGreen from "@/assets/girl-green.avif.asset.json";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Leaf,
  Home,
  Building2,
  GraduationCap,
  Stethoscope,
  Hotel,
  Building,
  FileText,
  SprayCan,
  XCircle,
  CheckCircle2,
  HandMetal,
  Coffee,
  Grid2X2,
  Wind,
  Users,
  Shield,
  Microscope,
  ClipboardCheck,
  Mountain,
  Trees,
  Waves,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SEOHead, howToJsonLd, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import heroBuilding from "@/assets/hiw-hero-building.jpg";
import heroCutaway from "@/assets/hiw-hero-building-cutaway.jpg.asset.json";
import heroSpacesWave from "@/assets/home-spaces-wave.jpg.asset.json";
import techHeroMobile from "@/assets/tech-hero-mobile.avif.asset.json";
import ecoSurfaces from "@/assets/hiw-eco-surfaces.jpg";
import ecoObjects from "@/assets/hiw-eco-objects.jpg";
import ecoFabrics from "@/assets/hiw-eco-fabrics.jpg";
import ecoHvac from "@/assets/hiw-eco-hvac.jpg";
import ecoZones from "@/assets/hiw-eco-zones.jpg";
import ecoHidden from "@/assets/hiw-eco-hidden.jpg";
import deviceImg from "@/assets/hiw-device.png";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const spaces = [
  { icon: Home, label: "Homes" },
  { icon: Building2, label: "Offices" },
  { icon: GraduationCap, label: "Schools" },
  { icon: Stethoscope, label: "Clinics" },
  { icon: Hotel, label: "Hotels" },
  { icon: Building, label: "Commercial" },
];

const compareCols = [
  {
    label: "Air Purifiers",
    icon: FileText,
    items: [
      "Treat only the air",
      "Clean only the air that it can suck and trap",
      "Does not reach or clean surfaces where the majority of contaminants exist",
    ],
    highlight: false,
  },
  {
    label: "Disinfecting with chemicals",
    icon: SprayCan,
    items: [
      "Manually applied with limited reach",
      "Short-term impact as chemicals promptly evaporate",
      "Damaging delicate objects",
      "Release toxic VOCs that may cause allergies and serious illnesses",
      "Foster microbial resistance over time",
    ],
    highlight: false,
  },
  {
    label: "EnviroBiotics",
    icon: Sparkles,
    items: [
      "Foster a harmonious, balanced ecosystem of the entire indoor area",
      "Biological, non-toxic, safe and effective",
      "24/7 automated support of entire indoor spaces",
      "Effectively reaching all areas' surfaces and objects, including hidden spots",
      "Decrease the microbial resistance of diseases generating microbes",
      "Reduce harsh chemical use that compromises the health of people and planet Earth",
    ],
    highlight: true,
  },
];


const steps = [
  { n: "01", title: "Select", text: "Carefully screened environmental probiotics chosen for safety and effectiveness." },
  { n: "02", title: "Disperse", text: "Automated devices release accurate amounts continuously throughout the space." },
  { n: "03", title: "Restore", text: "Supports microbial balance across air, surfaces, and objects for a healthier indoor ecosystem." },
];

const ecosystem = [
  { img: ecoSurfaces, icon: HandMetal, title: "Surfaces", text: "Desks, counters, floors, walls, furniture." },
  { img: ecoObjects, icon: Coffee, title: "Objects", text: "Keyboards, electronics, shared equipment, toys." },
  { img: ecoFabrics, icon: Grid2X2, title: "Fabrics", text: "Carpets, upholstery, bedding, curtains." },
  { img: ecoHvac, icon: Wind, title: "HVAC Pathways", text: "Ducts, vents, shared airflow routes." },
  { img: ecoZones, icon: Users, title: "Busy Zones", text: "Offices, classrooms, clinics, lobbies." },
  { img: ecoHidden, icon: Shield, title: "Hidden Spaces", text: "Corners, grooves, under furniture, hard-to-reach areas." },
];

const traditional = [
  "Kills indiscriminately",
  "Disrupts natural microbial balance",
  "Temporary effect",
  "Can leave residues",
  "Requires frequent reapplication",
];

const biological = [
  "Supports beneficial microbes",
  "Restores natural balance",
  "Continuous, long-lasting support",
  "Non-toxic and residue-free",
  "Works with your environment",
];

const research = [
  { icon: Microscope, title: "Years of Development", text: "Dedicated research and optimization" },
  { icon: Building2, title: "Field Tested", text: "Used in a variety of real-world indoor environments" },
  { icon: ClipboardCheck, title: "Research-Backed", text: "Supported by laboratory studies and third-party validation" },
  { icon: Users, title: "Real-World Applications", text: "Trusted by organizations across multiple sectors" },
];


const HowItWorksPage = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setVideoOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [videoOpen]);

  return (
    <div className="min-h-screen bg-background">

      <SEOHead
        title="How EnviroBiotics Works | Restoring Indoor Ecosystem Balance"
        description="See how EnviroBiotics restores balance across the entire indoor ecosystem, air, surfaces, objects, fabrics, HVAC pathways, and hidden spaces, continuously."
        path="/how-it-works"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            howToJsonLd,
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "How It Works", url: "/how-it-works" },
            ]),
          ],
        }}
      />
      <Navbar />

      <main className="pb-20 md:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden text-foreground pt-0 pb-16 md:pb-28 bg-background">
          {/* Subtle ambient gradient wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              background:
                "radial-gradient(80% 60% at 85% 0%, hsl(152 60% 92% / 0.55) 0%, transparent 60%), radial-gradient(60% 50% at 0% 100%, hsl(152 30% 95% / 0.5) 0%, transparent 60%)",
            }}
          />

          {/* Mobile hero image (above text), hides desktop background */}
          <div className="mb-8 w-full md:hidden">
            <img
              src={techHeroMobile.url}
              alt="EnviroBiotics technology"
              className="block w-full h-auto"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          {/* Full-bleed lifestyle image above the hero text (desktop/tablet) */}
          <div className="mb-12 md:mb-16 w-full hidden md:block">
            <img
              src={heroSpacesWave.url}
              alt="Living room, bedroom, classroom, office, and lobby spaces connected by a flowing biomic mist"
              className="block w-full h-auto"
              width={1920}
              height={800}
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className="relative container max-w-5xl mx-auto px-5 md:px-8 text-center">

            <h1 className="font-display font-bold leading-[0.98] tracking-[-0.035em] text-foreground">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                How EnviroBiotics
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] mt-1">
                Technology{" "}
                <span className="italic font-normal text-heading-accent">works.</span>
              </span>
            </h1>

            <span aria-hidden className="block mx-auto mt-10 h-px w-16 bg-emerald-600/60" />

            <p className="mt-10 mx-auto max-w-4xl text-[1.4rem] sm:text-[1.65rem] md:text-[1.85rem] text-foreground/80 leading-[1.55] font-light">
              Every indoor space is an ecosystem. Air, surfaces, objects, fabrics, HVAC pathways, and hidden spaces, all connected.
            </p>
            <p className="mt-6 mx-auto max-w-4xl text-[1.4rem] sm:text-[1.65rem] md:text-[1.85rem] leading-[1.55] font-medium text-heading-accent">
              EnviroBiotics delivers probiotic support throughout it all, continuously.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="group inline-flex items-center gap-4 pl-7 pr-3 py-3 rounded-full bg-foreground text-background font-medium text-sm tracking-wide hover:bg-foreground/90 transition-all duration-500 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.45)]"
              >
                <span className="uppercase tracking-[0.18em] text-[12px]">
                  Watch How It Works - 2 min
                </span>
                <span className="relative w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <svg
                    viewBox="0 0 24 24"
                    className="relative w-4 h-4 text-foreground translate-x-[1px]"
                    fill="currentColor"
                  >
                    <path d="M8 5.5v13l11-6.5L8 5.5z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

        </section>





        {/* SPACES */}
        <section
          id="technology"
          className="relative pt-20 md:pt-32 pb-16 md:pb-28 bg-[hsl(150_30%_97%)] border-t border-foreground/10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, hsl(152 45% 88% / 0.7) 0%, transparent 65%)",
            }}
          />
          <div className="relative container max-w-6xl mx-auto px-5 md:px-8">
            {/* Editorial intro, centered */}
            <div className="text-center max-w-5xl mx-auto">
              <h2 className="font-display font-semibold leading-[0.98] tracking-[-0.035em] text-foreground text-[2.75rem] sm:text-[4rem] lg:text-[5.25rem]">
                You spend{" "}
                <span className="italic font-normal text-[#0d8a5a]">90%</span>{" "}
                of your life indoors.
              </h2>

              <p className="mt-8 font-display italic text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.02em] text-muted-foreground">
                Make sure it's in balance.
              </p>

              <div className="mt-12 mx-auto max-w-3xl">
                <span className="block mx-auto h-px w-16 bg-[#0d8a5a]/60 mb-8" />
                <p className="text-[1.2rem] sm:text-[1.35rem] text-foreground/80 leading-[1.65] font-light">
                  A probiotic system that quietly balances the air, surfaces, and objects in every space you{" "}
                  <span className="text-foreground font-normal">live</span>,{" "}
                  <span className="text-foreground font-normal">work</span>, and{" "}
                  <span className="text-foreground font-normal">rest</span>.
                </p>
              </div>
            </div>

            {/* Spaces grid below, full width row */}
            <div className="mt-16 md:mt-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60">
              {spaces.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="group flex flex-col items-center justify-center text-center gap-4 p-8 bg-card hover:bg-muted/30 transition-all"
                >
                  <Icon className="w-7 h-7 text-foreground/80 group-hover:scale-110 transition-transform" strokeWidth={1.4} />
                  <span className="text-[15px] font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>

            {/* Ecosystem statement */}
            <div className="mt-20 md:mt-28 max-w-4xl mx-auto text-center">
              <p className="text-[1.2rem] sm:text-[1.35rem] text-foreground/85 leading-[1.65] font-light">
                Indoor environments are complete ecosystems where we live, work, learn, heal, and gather. Each space has unique challenges, but the need for balance is universal.
              </p>
            </div>
          </div>
        </section>



        {/* ORIGIN STORY — Finding EnviroBiotics */}
        <section className="relative overflow-hidden border-t border-border/60 bg-background py-20 md:py-32">
          {/* ambient backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, hsl(var(--foreground)) 0, transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--foreground)) 0, transparent 45%)",
            }}
          />
          {/* soft primary wash behind image side */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 h-[680px] w-[680px] rounded-full opacity-[0.18] blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 65%)" }}
          />

          <div className="container relative max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* LEFT: editorial copy */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <h2 className="font-display font-semibold text-foreground text-balance leading-[1.02] tracking-[-0.035em] text-[2.5rem] sm:text-[3.25rem] md:text-[4.25rem]">
                  Finding{" "}
                  <em className="not-italic text-heading-accent">EnviroBiotics.</em>
                </h2>

                <div className="mt-8 flex items-center gap-4">
                  <span className="h-px w-12 bg-primary/60" />
                  <span className="text-[10.5px] font-semibold tracking-[0.32em] uppercase text-muted-foreground/80">
                    A worldwide search
                  </span>
                </div>

                <p className="mt-6 text-[1.2rem] sm:text-[1.35rem] text-foreground/80 leading-[1.65] max-w-[60ch]">
                  Our team climbed mountains, searched jungles, and dove deep
                  waters, collecting hundreds of samples. Each was screened for
                  absolute safety, high efficacy, and regulatory compliance.
                  Only a few passed every test, and became the patented strains
                  inside{" "}
                  <span className="text-foreground font-medium">
                    EnviroBiotics.
                  </span>
                </p>

              </div>

              {/* RIGHT: framed portrait */}
              <div className="lg:col-span-5 order-1 lg:order-2 relative">
                <div className="relative mx-auto max-w-[460px] lg:max-w-none">
                  {/* offset accent frame */}
                  <div
                    aria-hidden
                    className="absolute -inset-3 md:-inset-5 rounded-[2rem] border border-primary/30"
                    style={{ transform: "rotate(-1.5deg)" }}
                  />
                  {/* subtle leaf glyph */}
                  <div
                    aria-hidden
                    className="absolute -top-6 -left-6 z-10 h-14 w-14 rounded-full bg-background ring-1 ring-foreground/10 shadow-sm flex items-center justify-center"
                  >
                    <Leaf className="h-5 w-5 text-primary" strokeWidth={1.6} />
                  </div>

                  {/* portrait */}
                  <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-foreground/[0.08] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
                    <img
                      src={girlGreen.url}
                      alt="EnviroBiotics, nature meets science"
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-auto object-cover aspect-[4/5]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>




        <section className="py-14 md:py-20 border-t border-border/60 bg-[#fafaf7]">
          <div className="container max-w-7xl mx-auto px-5 md:px-8">
            <div className="max-w-3xl mb-8 md:mb-10">
              <h2 className="text-3xl md:text-[2.75rem] font-display font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
                Why air-only and chemical-only solutions{" "}
                <span className="text-muted-foreground">fall short.</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
              {compareCols.map(({ label, icon: Icon, items, highlight }) => (
                <div
                  key={label}
                  className={`relative rounded-3xl p-7 transition-all ${
                    highlight
                      ? "bg-gradient-to-br from-[#0f5e3f] via-[#0d8a5a] to-[#2ECC8A] text-white border border-emerald-300/30 shadow-[0_30px_80px_-20px_rgba(46,204,138,0.55)]"
                      : "bg-card border border-border/60 hover:border-border"
                  }`}
                >
                  {highlight && (
                    <div className="absolute -top-px left-7 right-7 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
                  )}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${highlight ? "bg-white/15 backdrop-blur" : "bg-muted/50"}`}>
                      <Icon className={`w-5 h-5 ${highlight ? "text-white" : "text-muted-foreground"}`} strokeWidth={1.6} />
                    </div>
                    {highlight && (
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white bg-white/15 border border-white/30 rounded-full px-2.5 py-1">
                        Recommended
                      </span>
                    )}
                  </div>
                  <h3 className={`text-lg font-semibold mb-5 ${highlight ? "text-white" : "text-foreground"}`}>
                    {label}
                  </h3>
                  <ul className="space-y-3.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[1.2rem] sm:text-[1.35rem] leading-[1.65]">
                        {highlight ? (
                          <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />

                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={highlight ? "text-white/85" : "text-muted-foreground"}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3-STEP SYSTEM */}
        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-7xl mx-auto px-5 md:px-8">
            <div className="max-w-3xl mx-auto mb-8 md:mb-10 text-center">
              <h2 className="text-3xl md:text-[2.75rem] font-display font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
                A simple{" "}
                <span className="text-muted-foreground">3-step system.</span>
              </h2>
            </div>

            <div className="relative grid md:grid-cols-3 gap-px bg-border/60 rounded-3xl overflow-hidden border border-border/60">
              {steps.map((s) => (
                <div key={s.n} className="relative p-8 md:p-10 bg-card group">
                  <div className="flex items-baseline justify-between mb-8">
                    <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">STEP {s.n}</span>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-foreground tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-[1.2rem] sm:text-[1.35rem] text-muted-foreground leading-[1.65]">{s.text}</p>
                </div>

              ))}
            </div>
          </div>
        </section>

        {/* ECOSYSTEM GRID */}
        <section className="py-14 md:py-20 border-t border-border/60 bg-[#fafaf7]">
          <div className="container max-w-7xl mx-auto px-5 md:px-8">
            <div className="max-w-3xl mb-8 md:mb-10">
              <h2 className="text-3xl md:text-[2.75rem] font-display font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
                Designed for the whole{" "}
                <span className="text-muted-foreground">indoor ecosystem.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ecosystem.map(({ img, icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="group relative rounded-2xl overflow-hidden bg-card border border-border/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img
                      src={img}
                      alt={title}
                      width={800}
                      height={550}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-lg">
                      <Icon className="w-4.5 h-4.5 text-foreground/80" strokeWidth={1.6} />
                    </div>
                    <h3 className="absolute bottom-4 left-5 text-white text-lg font-display font-semibold tracking-tight">
                      {title}
                    </h3>
                  </div>
                  <div className="p-5">
                    <p className="text-[1.2rem] sm:text-[1.35rem] text-muted-foreground leading-[1.65]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>




        {/* RESEARCH STRIP */}
        <section className="py-14 md:py-20 border-t border-border/60 bg-[#fafaf7]">
          <div className="container max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.4fr] gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="text-2xl md:text-[2rem] font-display font-semibold leading-tight tracking-[-0.025em] text-foreground">
                  Developed through research, testing, and real-world use.
                </h2>
                <p className="mt-5 text-[1.2rem] sm:text-[1.35rem] text-muted-foreground leading-[1.65] max-w-md">
                  Our probiotic formula has been optimized, and validated through rigorous laboratory testing and real-world trials executed in collaborations with leading research centers.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60">
                {research.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex flex-col gap-4 p-6 bg-card">
                    <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/60 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-foreground/80" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground leading-tight">{title}</h3>
                      <p className="mt-1.5 text-[1.2rem] sm:text-[1.35rem] text-muted-foreground leading-[1.65]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA — bright, premium */}
        <section className="relative overflow-hidden bg-[#fafaf7] text-foreground border-t border-border/60">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse at center, #000 20%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(closest-side, hsl(150 60% 45% / 0.35), transparent)",
            }}
          />
          <div className="relative container max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-semibold leading-[1.02] tracking-[-0.035em] text-foreground">
              Ready to find the product that suits you best?
            </h2>
            <p className="mt-6 text-[1.2rem] sm:text-[1.35rem] text-foreground/65 max-w-xl mx-auto font-light leading-[1.65]">
              Discover how EnviroBiotics can help you create healthier indoor environments, naturally.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="https://shop.envirobiotics.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-foreground/90 transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_20px_60px_-15px_rgba(0,0,0,0.25)]"
              >
                Browse Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Technology video"
        >
          <button
            type="button"
            onClick={() => setVideoOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://player.vimeo.com/video/1041721190?autoplay=1&title=0&byline=0&portrait=0"
              className="absolute inset-0 w-full h-full"
              frameBorder={0}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="EnviroBiotics Technology"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HowItWorksPage;
