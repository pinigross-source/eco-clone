import React, { lazy, Suspense } from "react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "@/lib/link";
import { SectionLabel } from "@/components/ui/section-label";
import {
  BookOpen,
  Shield,
  Microscope,
  FlaskConical,
  ArrowRight,
  Beaker,
  Bug,
  PawPrint,
  Wind,
  Scale,
  Award,
  HeartPulse,
  Sparkles,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroLivingRoom from "@/assets/edu-hero-living-room.jpg";
import microbiomeMacro from "@/assets/edu-microbiome-macro.jpg";
import bedroomAllergens from "@/assets/edu-bedroom-allergens.jpg";
import petriStill from "@/assets/edu-petri-still.jpg";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const ContentProductCTA = lazy(() => import("@/components/ContentProductCTA").then(m => ({ default: m.ContentProductCTA })));
const RelatedTopics = lazy(() => import("@/components/RelatedTopics").then(m => ({ default: m.RelatedTopics })));

/* ───────────────────────── Guide card ───────────────────────── */

interface GuideCardProps {
  title: string;
  description: string;
  bestFor?: string;
  to: string;
  linkText: string;
  icon: React.ReactNode;
}

const GuideCard = ({ title, description, bestFor, to, linkText, icon }: GuideCardProps) => (
  <Link to={to} className="block h-full">
    <div className="group relative flex flex-col h-full p-7 sm:p-8 rounded-3xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-[0_24px_60px_-30px_hsl(var(--primary)/0.35)] transition-all duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="shrink-0 w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
        <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80 font-medium">
          Guide
        </span>
      </div>
      <h3 className="text-xl sm:text-2xl font-display font-semibold text-foreground leading-[1.2] mb-4 text-balance">
        {title}
      </h3>
      <p className="text-muted-foreground text-[15px] leading-relaxed mb-5 flex-1">{description}</p>
      {bestFor && (
        <p className="text-xs text-muted-foreground/80 mb-6 leading-relaxed">
          <span className="font-semibold text-foreground/80">Best for:</span> {bestFor}
        </p>
      )}
      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all mt-auto">
        {linkText}
        <ArrowRight className="w-4 h-4" />
      </span>
    </div>
  </Link>
);

/* ───────────────────────── Section heading ───────────────────────── */

const SectionHead = ({
  eyebrow,
  title,
  intro,
  align = "left",
}: { eyebrow?: string; title: React.ReactNode; intro?: string; align?: "left" | "center" }) => (
  <div className={align === "center" ? "text-center max-w-3xl mx-auto mb-14" : "max-w-3xl mb-14"}>
    {eyebrow && (
      <SectionLabel className={align === "center" ? "mb-5 mx-auto" : "mb-5"}>{eyebrow}</SectionLabel>
    )}
    <h2 className="text-[2rem] sm:text-5xl lg:text-[2.85rem] xl:text-[3.1rem] 2xl:text-[3.8rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-balance">
      {title}
    </h2>
    {intro && (
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mt-5">
        {intro}
      </p>
    )}
  </div>
);

/* ───────────────────────── Static data ───────────────────────── */

const steps = [
  {
    title: "Beneficial probiotics are released into your indoor space",
    body: "EnviroBiotics disperses selected Bacillus probiotics into the room. These beneficial microbes move with the natural air currents in your home.",
  },
  {
    title: "They settle where filters cannot reach",
    body: "The probiotics land on bedding, upholstery, carpets, counters, vents, pet areas, dust, and other high-contact surfaces, the places where many allergens, odors, mold spores, and microbes collect.",
  },
  {
    title: "They compete with unwanted microbes",
    body: "Beneficial probiotics compete with harmful bacteria and mold for space and nutrients. When beneficial microbes occupy the environment first, it becomes harder for unwanted organisms to establish and grow.",
  },
  {
    title: "They support continuous surface-level balance",
    body: "Chemical sprays act only at the moment of use. EnviroBiotics is designed for continuous dispersal, helping maintain microbial balance over time instead of relying on periodic treatment.",
  },
];

const paths = [
  {
    icon: <HeartPulse className="w-5 h-5" />,
    title: "I have allergies or asthma",
    guides: [
      { label: "Dust Mite Allergens", to: "/dust-mite-allergens" },
      { label: "Pet Dander", to: "/pet-dander" },
      { label: "Mold Indoors", to: "/mold-indoors" },
      { label: "What Is the Indoor Microbiome?", to: "/indoor-microbiome" },
    ],
  },
  {
    icon: <Wind className="w-5 h-5" />,
    title: "I am worried about mold",
    guides: [
      { label: "Mold Indoors", to: "/mold-indoors" },
      { label: "How to Reduce Mold and Allergens Naturally", to: "/mold-and-allergens" },
      { label: "The Science of Competitive Exclusion", to: "/competitive-exclusion" },
    ],
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: "I am comparing this to an air purifier",
    guides: [
      { label: "What Is Probiotic Air Purification?", to: "/probiotic-air-purification" },
      { label: "Probiotic vs. Chemical Disinfection", to: "/probiotic-vs-chemical" },
      { label: "How EnviroBiotics Works", to: "/how-it-works" },
    ],
  },
  {
    icon: <FlaskConical className="w-5 h-5" />,
    title: "I want to understand the science",
    guides: [
      { label: "What Is the Indoor Microbiome?", to: "/indoor-microbiome" },
      { label: "The Hygiene Hypothesis Explained", to: "/hygiene-hypothesis" },
      { label: "The Science of Competitive Exclusion", to: "/competitive-exclusion" },
    ],
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "I want to understand safety",
    guides: [
      { label: "Understanding FDA GRAS Status", to: "/fda-gras-status" },
      { label: "How EnviroBiotics Works", to: "/how-it-works" },
      { label: "Product Testing and Safety", to: "/safety" },
    ],
  },
];

const allergens = [
  { name: "Der p1", source: "Dust mite feces", trigger: "Asthma, allergic rhinitis", locations: "Bedding, mattress, carpet, upholstery", why: "Accumulates in fabric and dust; resuspends easily." },
  { name: "Der f1", source: "Dust mite feces", trigger: "Allergic asthma, eczema", locations: "Mattresses, soft furniture, rugs", why: "Persists for months; survives normal cleaning." },
  { name: "Fel d1", source: "Cat skin and saliva", trigger: "Severe allergic reactions", locations: "Furniture, clothing, walls, dust", why: "Sticky and lightweight; spreads everywhere." },
  { name: "Can f1", source: "Dog skin, fur, saliva", trigger: "Allergic rhinitis, asthma", locations: "Carpet, upholstery, beds, clothing", why: "Travels via fabric and accumulates over time." },
  { name: "Mold spores", source: "Damp areas, HVAC, walls", trigger: "Respiratory irritation, asthma", locations: "Bathrooms, basements, vents, behind walls", why: "Reproduces wherever moisture and organic matter exist." },
  { name: "Bacterial buildup", source: "Skin, food, pets, dust", trigger: "Odors, irritation", locations: "Counters, bedding, vents, dust", why: "Continuously replenished from daily life." },
];

const faqs = [
  {
    q: "What is the indoor microbiome?",
    a: "The indoor microbiome is the community of microorganisms, bacteria, fungi, viruses, that live in your home. A healthy indoor microbiome is diverse and dominated by beneficial organisms. Modern cleaning practices and sealed building design have depleted this diversity, which researchers increasingly connect to rising rates of allergies and immune dysfunction.",
  },
  {
    q: "How is probiotic air purification different from a regular air purifier?",
    a: "A conventional air purifier filters particles that pass through it. A probiotic air purifier disperses beneficial bacteria throughout your space, where they settle on surfaces and compete with the organic matter that allergens and pathogens depend on. It addresses the surfaces where most indoor triggers accumulate, not just what floats through the air.",
  },
  {
    q: "Is the science behind probiotic purification established?",
    a: "Competitive exclusion is well established in microbiology, agriculture, and hospital hygiene research. Independent lab testing has shown meaningful reductions in common indoor allergens after continuous probiotic treatment, and probiotic surface care is now part of published hospital hygiene guidelines in some European institutions.",
  },
  {
    q: "Are the probiotic strains safe?",
    a: "EnviroBiotics uses Bacillus strains selected for their history of safe use, genetic stability, and absence of toxin or virulence factors. They have been evaluated under the FDA's Generally Recognized As Safe (GRAS) framework and reviewed by independent toxicologists.",
  },
  {
    q: "Where should I start if I am new to this topic?",
    a: "Start with the guide to probiotic air purification for an overview, then move to the mold and allergen guide if you have a specific health concern. The How EnviroBiotics Works page covers the underlying biology for anyone who wants the mechanism explained before purchasing.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Education Center", url: "/education" },
    ]),
    {
      "@type": "WebPage",
      "@id": "https://envirobiotics.com/education",
      name: "Indoor Air Quality & Probiotic Science | EnviroBiotics Education Center",
      description: "Learn the science behind the indoor microbiome, allergens, mold, pet dander, and probiotic purification.",
      isPartOf: { "@id": "https://envirobiotics.com/#website" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/* ───────────────────────── Page ───────────────────────── */

const EducationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Indoor Air Quality & Probiotic Science | EnviroBiotics Education Center"
        description="Learn the science behind the indoor microbiome, allergens, mold, pet dander, and probiotic purification. Explore how EnviroBiotics works differently from traditional air purifiers."
        path="/education"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          {/* subtle, single light wash, Sonos-style restraint */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-[520px] h-[520px] bg-primary/[0.06] rounded-full blur-3xl pointer-events-none" />

          <div className="container max-w-7xl px-5 sm:px-6 relative z-10">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
                  {/* Left: editorial copy */}
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2.5 mb-8">
                      <span className="h-px w-8 bg-foreground/40" />
                      <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-foreground/70">
                        Education Center
                      </span>
                    </div>
                    <h1 className="font-display font-bold text-foreground text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-[-0.035em] mb-8 text-balance">
                      The science of a<br className="hidden sm:block" />{" "}
                      healthier home.
                    </h1>
                    <p className="text-lg sm:text-xl text-foreground/70 max-w-xl leading-[1.55] mb-10">
                      Indoor air can be two to five times more polluted than outdoor air, and most of it begins on the surfaces around you. Learn how the indoor microbiome, allergens, and probiotic purification really work.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <a
                        href="#foundations"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all text-sm sm:text-base shadow-sm hover:shadow-md"
                      >
                        Start with the basics
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <Link
                        to="/how-it-works"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-foreground/15 rounded-full font-medium hover:bg-foreground hover:text-background transition-colors text-sm sm:text-base"
                      >
                        See how EnviroBiotics works
                      </Link>
                    </div>
                  </div>

                  {/* Right: editorial image */}
                  <div className="lg:col-span-5">
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_40px_100px_-40px_hsl(var(--foreground)/0.35)]">
                      <img
                        src={heroLivingRoom}
                        alt="Sunlit modern living room with dust motes drifting through soft warm light, visualizing the indoor environment EnviroBiotics protects."
                        className="absolute inset-0 w-full h-full object-cover"
                        width={1080}
                        height={1350}
                        loading="eager"
                        fetchPriority="high"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 bg-gradient-to-t from-black/55 via-black/15 to-transparent">
                        <p className="text-white/95 text-[13px] sm:text-sm font-medium leading-snug max-w-xs">
                          Most indoor problems start where light, dust, and surfaces meet.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats strip, quiet editorial band */}
                <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 rounded-3xl border border-border/60 bg-card overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-border/60">
                  {[
                    { stat: "90%", label: "of our time is spent indoors", source: "EPA" },
                    { stat: "2–5×", label: "indoor air vs. outdoor pollution", source: "EPA" },
                    { stat: "1000s", label: "of microbial species in a typical home", source: "Microbiome research" },
                  ].map((item, i) => (
                    <div key={i} className="p-7 sm:p-8 hover:bg-muted/40 transition-colors">
                      <div className="font-display font-bold text-4xl sm:text-5xl tracking-[-0.02em] text-primary tabular-nums mb-3">
                        {item.stat}
                      </div>
                      <div className="text-[15px] text-foreground leading-snug font-medium mb-1.5">
                        {item.label}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground/70">
                        {item.source}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground/70 max-w-2xl leading-relaxed pt-6 mt-8">
                  Built around peer-reviewed microbiome research, allergen biology, probiotic hygiene studies, and independent product testing.
                </p>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── Start Here / Foundations ── */}
        <section id="foundations" className="py-20 md:py-32 bg-muted/40">
          <div className="container max-w-6xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <SectionHead
                  eyebrow="Start here"
                  title={<>The <span className="text-primary">Foundations</span></>}
                  intro="New to probiotic purification? These three guides explain the core idea: your home has a microbiome, many indoor triggers live on surfaces, and beneficial probiotics can help restore balance continuously."
                />
              </ScrollReveal>
            </Suspense>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
              <GuideCard
                icon={<BookOpen className="w-5 h-5" />}
                title={<>What Is Probiotic <span className="text-primary">Air Purification</span>?</>}
                description="Probiotic air purification is not a better filter, it is a fundamentally different approach. Beneficial Bacillus probiotics travel through the air, settle on surfaces, and address the sources of the problem where filters never reach."
                bestFor="Anyone new to probiotic purification or comparing it to conventional air purifiers."
                to="/probiotic-air-purification"
                linkText="Read the guide"
              />
              <GuideCard
                icon={<Bug className="w-5 h-5" />}
                title={<>How to Reduce Mold and Allergens <span className="text-primary">Naturally</span></>}
                description="Mold, dust mites, and pet allergens live in almost every home. The goal is not sterility, it is reducing triggers to levels your body tolerates. Practical steps plus biological support."
                bestFor="Allergy and asthma sufferers, pet owners, and anyone dealing with recurring mold or dust."
                to="/mold-and-allergens"
                linkText="Read the guide"
              />
              <GuideCard
                icon={<Microscope className="w-5 h-5" />}
                title={<>How EnviroBiotics <span className="text-primary">Works</span></>}
                description="Three simultaneous mechanisms, competitive exclusion, antimicrobial production, and surface colonization, working continuously, 24/7, to maintain a protective microbial layer."
                bestFor="Anyone who wants to understand the biology before making a purchase decision."
                to="/how-it-works"
                linkText="Read the guide"
              />
            </div>
          </div>
        </section>

        {/* ── How probiotic purification works (numbered rail) ── */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-background to-accent/[0.04] pointer-events-none" />
          <div className="container max-w-6xl px-5 sm:px-6 relative">
            <Suspense fallback={null}>
              <ScrollReveal>
                <SectionHead
                  eyebrow="How it works"
                  title={<>How Probiotic Purification <span className="text-primary">Works</span></>}
                  intro="Traditional air purifiers focus on what is floating in the air. EnviroBiotics is designed to go further by helping address the surfaces your air touches every day."
                />
              </ScrollReveal>
            </Suspense>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {steps.map((s, i) => (
                <Suspense key={i} fallback={null}>
                  <ScrollReveal delay={i * 60}>
                    <div className="group h-full p-7 sm:p-9 rounded-3xl border border-border/60 bg-card/80 backdrop-blur-sm hover:border-primary/40 hover:shadow-[0_24px_60px_-30px_hsl(var(--primary)/0.3)] transition-all">
                      <div className="flex items-baseline gap-5 mb-5">
                        <span className="text-5xl sm:text-6xl font-display font-bold text-gradient-primary leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px flex-1 bg-border/60" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-semibold leading-snug mb-3 text-balance">
                        {s.title}
                      </h3>
                      <p className="text-muted-foreground text-[15px] leading-relaxed">{s.body}</p>
                    </div>
                  </ScrollReveal>
                </Suspense>
              ))}
            </div>
          </div>
        </section>

        {/* ── Choose your path ── */}
        <section className="py-20 md:py-32 bg-muted/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.06] rounded-full blur-3xl pointer-events-none" />
          <div className="container max-w-6xl px-5 sm:px-6 relative">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="max-w-3xl mb-14">
                  <SectionLabel className="mb-5">Choose your path</SectionLabel>
                  <h2 className="text-[2rem] sm:text-5xl lg:text-[2.85rem] xl:text-[3.1rem] 2xl:text-[3.8rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-balance mb-5">
                    What brought you <span className="text-primary">here?</span>
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Different homes have different problems. Choose the path that best matches your situation, then jump straight into the relevant guides.
                  </p>
                </div>
              </ScrollReveal>
            </Suspense>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paths.map((p, i) => (
                <Suspense key={i} fallback={null}>
                  <ScrollReveal delay={i * 50}>
                    <div className="h-full p-7 rounded-3xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-[0_24px_60px_-30px_hsl(var(--primary)/0.3)] transition-all">
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                        {p.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-semibold leading-snug mb-5 text-balance text-foreground">
                        {p.title}
                      </h3>
                      <ul className="space-y-1.5">
                        {p.guides.map((g, j) => (
                          <li key={j}>
                            <Link
                              to={g.to}
                              className="group flex items-start justify-between gap-3 text-sm text-foreground/85 leading-relaxed py-1.5 hover:text-primary transition-colors"
                            >
                              <span className="flex items-start gap-2.5">
                                <span className="mt-2 w-1 h-1 rounded-full bg-primary/60 shrink-0 group-hover:bg-primary" />
                                {g.label}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0 mt-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                </Suspense>
              ))}
            </div>
          </div>
        </section>

        {/* ── Indoor Microbiome ── */}
        <section className="py-20 md:py-32">
          <div className="container max-w-6xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14 md:mb-20">
                  <div className="lg:col-span-6 order-2 lg:order-1">
                    <div className="relative rounded-3xl overflow-hidden aspect-[5/4] shadow-[0_30px_80px_-40px_hsl(var(--primary)/0.45)]">
                      <img
                        src={microbiomeMacro}
                        alt="Macro abstract visualization of microbial cells suspended in warm light, the indoor microbiome rendered as art."
                        className="absolute inset-0 w-full h-full object-cover"
                        width={1600}
                        height={1280}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-6 order-1 lg:order-2">
                    <SectionLabel className="mb-5">Indoor microbiome</SectionLabel>
                    <h2 className="text-[2rem] sm:text-5xl lg:text-[2.85rem] xl:text-[3.1rem] 2xl:text-[3.8rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-balance mb-5">
                      Your home is alive, and the <span className="text-primary">balance</span> matters.
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                      Your home has its own microbial ecosystem. It can influence allergens, respiratory comfort, immune function, odors, and how your home responds to mold and dust. These guides explain what it is, how modern living changed it, and why balance matters more than sterilization.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </Suspense>

            <div className="grid md:grid-cols-2 gap-5 md:gap-7">
              <GuideCard
                icon={<FlaskConical className="w-5 h-5" />}
                title={<>What Is the Indoor <span className="text-primary">Microbiome</span>?</>}
                description="Your home is not sterile, it is alive. Thousands of microbial species form an ecosystem as complex as a rainforest, but more intimate. Modern construction and chemical cleaning have changed it in ways that affect how your home behaves."
                bestFor="Anyone new to indoor air quality science who wants to understand the foundation."
                to="/indoor-microbiome"
                linkText="Read the guide"
              />
              <GuideCard
                icon={<Shield className="w-5 h-5" />}
                title={<>The Hygiene Hypothesis <span className="text-primary">Explained</span></>}
                description="Reduced exposure to beneficial environmental microbes, especially early in life, may disrupt how the immune system develops. The issue isn't dirt; it's microbial diversity and balance."
                bestFor="Parents concerned about allergies and asthma, and anyone curious about the link between cleanliness and immune function."
                to="/hygiene-hypothesis"
                linkText="Read the guide"
              />
            </div>
          </div>
        </section>

        {/* ── Allergens & Health ── */}
        <section className="py-20 md:py-32 bg-muted/40">
          <div className="container max-w-6xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14 md:mb-20">
                  <div className="lg:col-span-6">
                    <SectionLabel className="mb-5">Allergens & health</SectionLabel>
                    <h2 className="text-[2rem] sm:text-5xl lg:text-[2.85rem] xl:text-[3.1rem] 2xl:text-[3.8rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-balance mb-5">
                      The triggers live where you <span className="text-primary">sleep.</span>
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                      Most people think indoor air problems float in the air. In reality, many common triggers settle on surfaces first, bedding, mattresses, carpets, upholstery, HVAC systems, pet areas, and dust, and resuspend with every movement.
                    </p>
                  </div>
                  <div className="lg:col-span-6">
                    <div className="relative rounded-3xl overflow-hidden aspect-[5/4] shadow-[0_30px_80px_-40px_hsl(var(--foreground)/0.25)]">
                      <img
                        src={bedroomAllergens}
                        alt="Sunlit minimalist bedroom with soft linen and a wool throw, where dust mite and pet dander allergens accumulate."
                        className="absolute inset-0 w-full h-full object-cover"
                        width={1600}
                        height={1280}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </Suspense>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
              <GuideCard
                icon={<Bug className="w-5 h-5" />}
                title={<>Dust Mite <span className="text-primary">Allergens</span></>}
                description="Der p1 and Der f1 are among the most common triggers for indoor allergies and asthma. They accumulate in fabrics and dust, especially in bedrooms, and resuspend with every movement."
                bestFor="Allergy and asthma sufferers, pet owners, and anyone with recurring respiratory symptoms."
                to="/dust-mite-allergens"
                linkText="Read the guide"
              />
              <GuideCard
                icon={<Wind className="w-5 h-5" />}
                title={<>Mold <span className="text-primary">Indoors</span></>}
                description="Mold grows wherever moisture, organic matter, and poor airflow meet. Visible mold is often only part of the problem, spores and fragments spread into dust and air."
                bestFor="People dealing with recurring mold problems, damp basements, bathrooms, or HVAC concerns."
                to="/mold-indoors"
                linkText="Read the guide"
              />
              <GuideCard
                icon={<PawPrint className="w-5 h-5" />}
                title={<>Pet <span className="text-primary">Dander</span></>}
                description="Fel d1 and Can f1 are among the stickiest, most persistent indoor allergens. They cling to fabric and travel between homes, remaining for months even after a pet is gone."
                bestFor="Pet owners with allergies or asthma, and families concerned about pet allergen exposure."
                to="/pet-dander"
                linkText="Read the guide"
              />
            </div>
          </div>
        </section>

        {/* ── Probiotic Purification Science ── */}
        <section className="py-20 md:py-32">
          <div className="container max-w-6xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14 md:mb-20">
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="relative rounded-3xl overflow-hidden aspect-square shadow-[0_30px_80px_-40px_hsl(var(--foreground)/0.25)]">
                      <img
                        src={petriStill}
                        alt="Sunlit interior corner with a billowing linen curtain and an olive tree, fresh, balanced indoor air."
                        className="absolute inset-0 w-full h-full object-cover"
                        width={1280}
                        height={1280}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <SectionLabel className="mb-5">The science</SectionLabel>
                    <h2 className="text-[2rem] sm:text-5xl lg:text-[2.85rem] xl:text-[3.1rem] 2xl:text-[3.8rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-balance mb-5">
                      Beneficial microbes, working <span className="text-primary">continuously.</span>
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                      Probiotic purification rests on a simple biological idea: beneficial microbes can shape the environment by competing with unwanted organisms for space, nutrients, and colonization sites. It has been studied for decades in agriculture, microbiology, and hospital hygiene.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </Suspense>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
              <GuideCard
                icon={<Beaker className="w-5 h-5" />}
                title={<>The Science of <span className="text-primary">Competitive Exclusion</span></>}
                description="When beneficial probiotics occupy a surface first, they compete with unwanted bacteria and mold for nutrients, adhesion sites, and space, creating a more stable microbial environment over time."
                bestFor="Anyone who wants to understand the core mechanism behind probiotic purification."
                to="/competitive-exclusion"
                linkText="Read the guide"
              />
              <GuideCard
                icon={<Award className="w-5 h-5" />}
                title={<>Understanding <span className="text-primary">FDA GRAS</span> Status</>}
                description="GRAS, Generally Recognized As Safe, is a safety designation for substances and ingredients evaluated for their history of safe use. For probiotic products, strain identity and selection matter most."
                bestFor="Anyone concerned about product safety, health-conscious families, and people with chemical sensitivities."
                to="/fda-gras-status"
                linkText="Read the guide"
              />
              <GuideCard
                icon={<Scale className="w-5 h-5" />}
                title={<>Probiotic vs. <span className="text-primary">Chemical</span> Disinfection</>}
                description="Chemical disinfectants can be fast, but they leave residues, disrupt microbial balance, and stop working once the chemistry breaks down. Probiotic hygiene takes a longer-term, biologically balanced approach."
                bestFor="Anyone weighing the health impact of chemical cleaners, especially families with asthma or chemical sensitivities."
                to="/probiotic-vs-chemical"
                linkText="Read the guide"
              />
            </div>
          </div>
        </section>

        {/* ── Allergens at a glance (reference table) ── */}
        <section className="py-20 md:py-32 bg-muted/40">
          <div className="container max-w-6xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <SectionHead
                  eyebrow="Quick reference"
                  title={<>Common Indoor Allergens <span className="text-primary">at a Glance</span></>}
                  intro="Where common indoor allergens come from, where they collect, and why they are difficult to remove with air filtration alone."
                />
              </ScrollReveal>
            </Suspense>

            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-foreground text-background">
                        <tr>
                          <th className="text-left px-6 py-4 font-display font-semibold tracking-tight">Allergen</th>
                          <th className="text-left px-6 py-4 font-display font-semibold tracking-tight">Source</th>
                          <th className="text-left px-6 py-4 font-display font-semibold tracking-tight">Primary trigger</th>
                          <th className="text-left px-6 py-4 font-display font-semibold tracking-tight">Common locations</th>
                          <th className="text-left px-6 py-4 font-display font-semibold tracking-tight">Why it persists</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allergens.map((a, i) => (
                          <tr key={i} className="border-t border-border/50 hover:bg-muted/40 transition-colors">
                            <td className="px-6 py-5 font-semibold text-foreground whitespace-nowrap">{a.name}</td>
                            <td className="px-6 py-5 text-muted-foreground">{a.source}</td>
                            <td className="px-6 py-5 text-muted-foreground">{a.trigger}</td>
                            <td className="px-6 py-5 text-muted-foreground">{a.locations}</td>
                            <td className="px-6 py-5 text-muted-foreground">{a.why}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/70 mt-4 max-w-2xl">
                  Source-level reduction matters because air filtration alone cannot reach the surfaces where these allergens accumulate.
                </p>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 md:py-32">
          <div className="container max-w-3xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <SectionHead
                  eyebrow="FAQ"
                  title={<>Frequently Asked <span className="text-primary">Questions</span></>}
                  align="center"
                />
              </ScrollReveal>
            </Suspense>

            <Accordion type="single" collapsible className="mt-2 space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border/60 rounded-2xl px-6 sm:px-7 bg-card data-[state=open]:border-primary/40 data-[state=open]:shadow-sm transition-all"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-base sm:text-lg py-6 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-[15px] leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="pb-12 md:pb-20">
          <div className="container max-w-5xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="gradient-cta rounded-[32px] p-10 sm:p-14 md:p-20 text-center relative overflow-hidden">
                  {/* soft radial highlights */}
                  <div className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-white/15 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-32 -right-24 w-[420px] h-[420px] rounded-full bg-foreground/15 blur-3xl" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur border border-white/60 text-xs uppercase tracking-[0.18em] font-semibold text-foreground mb-6 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                      Stay informed
                    </div>
                    <h2 className="text-[2rem] sm:text-5xl lg:text-[2.85rem] xl:text-[3.1rem] 2xl:text-[3.8rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-balance mb-5">
                      A healthier indoor environment, backed by <span className="text-primary">science.</span>
                    </h2>
                    <p className="max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed text-foreground/85">
                      New guides, research summaries, and product updates are added regularly. If you have a question that is not answered here, contact the EnviroBiotics support team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                      <Link
                        to="/shop"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all text-sm sm:text-base shadow-md hover:shadow-lg"
                      >
                        Explore EnviroBiotics devices
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to="/research"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium bg-white text-foreground hover:bg-white/90 transition-colors text-sm sm:text-base shadow-sm"
                      >
                        Read independent research
                      </Link>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-block mt-6 text-sm text-foreground/80 hover:text-foreground transition-colors underline underline-offset-4 decoration-foreground/40"
                    >
                      Contact us with questions
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── Product CTA ── */}
        <section className="container max-w-5xl px-5 sm:px-6 pb-8">
          <Suspense fallback={null}>
            <ContentProductCTA
              headline="Science-backed purification for your home."
              subtitle="Explore the devices that put this research to work."
            />
          </Suspense>
        </section>

        {/* ── Disclaimer ── */}
        <div className="container max-w-4xl px-5 sm:px-6 pb-12">
          <p className="text-xs text-muted-foreground/60 leading-relaxed text-center">
            Content in the EnviroBiotics Education Center is written and reviewed by the EnviroBiotics Science Team. All claims are supported by independent laboratory research or peer-reviewed scientific literature. EnviroBiotics probiotic strains are evaluated under the FDA's GRAS framework and reviewed by independent toxicologists. Results may vary based on space size, environmental conditions, and continuous device operation.
          </p>
        </div>

        <Suspense fallback={null}>
          <div className="container max-w-5xl px-5 sm:px-6 pb-12">
            <RelatedTopics currentPath="/education" />
          </div>
        </Suspense>
      </main>

      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
};

export default EducationPage;
