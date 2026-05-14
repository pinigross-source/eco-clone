import { lazy, Suspense } from "react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "@/lib/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Bug, Droplets, PawPrint, Microscope,
  ThermometerSun, Wind, Sparkles, Leaf,
  Shield, AlertTriangle, FlaskConical, Layers,
  ShoppingBag, ArrowRight, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import heroImg from "@/assets/mold-scandi-hero.jpg";
import bathroomImg from "@/assets/mold-scandi-bathroom.jpg";
import petImg from "@/assets/mold-scandi-pet.jpg";
import bedroomImg from "@/assets/health-scandi-bedroom.jpg";
import windowImg from "@/assets/health-scandi-window.jpg";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const RelatedTopics = lazy(() => import("@/components/RelatedTopics").then(m => ({ default: m.RelatedTopics })));

/* ─── JSON-LD ─────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "How to Reduce Mold and Allergens at Home Naturally | EnviroBiotics",
      description:
        "A complete natural guide to reducing mold, dust mite allergens, pet dander and indoor pathogens at the source, without harsh chemicals.",
      author: { "@type": "Organization", name: "EnviroBiotics" },
      publisher: { "@type": "Organization", name: "EnviroBiotics", url: "https://envirobiotics.com" },
      url: "https://envirobiotics.com/mold-and-allergens",
      datePublished: "2024-01-01",
      dateModified: "2026-05-01",
    },
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Mold & Allergens", url: "/mold-and-allergens" },
    ]),
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is the fastest way to reduce dust mite allergens?", acceptedAnswer: { "@type": "Answer", text: "Wash bedding weekly above 130°F and encase mattresses and pillows in allergen-barrier covers. For sustained reduction, continuous probiotic purification has shown up to 90% allergen reduction within 30 days." } },
        { "@type": "Question", name: "Does an air purifier help with mold?", acceptedAnswer: { "@type": "Answer", text: "A HEPA purifier can capture airborne spores but has no effect on mold growing on surfaces, where the real problem lives. Probiotic purification reaches the surfaces and removes the food source spores need to germinate." } },
        { "@type": "Question", name: "What if I have active mold right now?", acceptedAnswer: { "@type": "Answer", text: "Fix the moisture source first. Clean visible mold with vinegar or a professional remediator, then deploy probiotic purification to prevent it from coming back." } },
        { "@type": "Question", name: "Can I use probiotic purification if I have pets?", acceptedAnswer: { "@type": "Answer", text: "Yes. Probiotic treatment reduces pet allergen load on surfaces. You don't have to choose between your pet and breathing easily." } },
        { "@type": "Question", name: "Is it safe for kids?", acceptedAnswer: { "@type": "Answer", text: "Yes. All EnviroBiotics strains are FDA GRAS certified and EPA registered. Safe for infants, children, pregnant women and people with chemical sensitivities." } },
        { "@type": "Question", name: "What humidity level prevents both mold and dust mites?", acceptedAnswer: { "@type": "Answer", text: "40 to 50 percent relative humidity is the sweet spot. Below 50 percent slows dust mite reproduction. Below 60 percent prevents most mold growth." } },
      ],
    },
  ],
};

/* ─── Allergen sources ──────────────────────────────────── */
const allergenSources = [
  { icon: Bug, title: "Dust mites", text: "Microscopic arachnids living in mattresses, pillows, carpets and upholstery. Their fecal proteins, Der p1 and Der f1, are among the most potent indoor allergens known. A single gram of dust can contain thousands of waste particles." },
  { icon: Droplets, title: "Mold", text: "Spores are present in every indoor environment. They become a respiratory problem when they find moisture and organic matter, behind tiles, inside HVAC ducts, beneath flooring, in window frames, in walls." },
  { icon: PawPrint, title: "Pet dander", text: "Fel d1 and Can f1 are 2 to 4 micron protein particles that stay airborne for hours and cling to soft surfaces for months. Even pet-free homes accumulate them through clothing and visitors." },
  { icon: Microscope, title: "Pathogens", text: "Bacteria thrive on the organic residue covering every surface in your home. Each touch transfers them, each footstep resuspends them, and they repopulate immediately after cleaning." },
];

/* ─── Why chemicals fall short ──────────────────────────── */
const chemicalProblems = [
  { title: "One-time treatments only", text: "Disinfectants kill what they touch at the moment of application. Within a few hours, recolonisation is already underway. Spray Monday, square one by Wednesday." },
  { title: "Worsen the air you breathe", text: "Bleach releases chlorine gas. Fragrance products add VOC aerosols. You're trying to solve a respiratory problem by inhaling toxins that trigger the same symptoms." },
  { title: "Create resistance over time", text: "Repeated chemical antimicrobials select for harder-to-eliminate organisms. The bacteria and mold that survive each round become tougher to remove the next time." },
  { title: "Leave surfaces defenceless", text: "After a chemical strike, surfaces are sterile. The first organism to land faces no competition, a worse starting position than if you'd never sprayed at all." },
];

/* ─── Probiotic mechanism ────────────────────────────────── */
const probioticMechanisms = [
  { icon: Layers, title: "Consume the food source", text: "Beneficial Bacillus strains eat the same organic debris dust mites depend on. Mites lose their food. Their populations shrink. Allergen load drops at the source." },
  { icon: Sparkles, title: "Degrade allergen proteins", text: "Pet allergens like Fel d1 and Can f1 are broken down enzymatically on the surfaces where they settle, before they get resuspended into the air you breathe." },
  { icon: Shield, title: "Prevent mold germination", text: "By stripping surfaces of the organic matter spores need to colonise, probiotics keep mold from re-establishing in hidden spaces, HVAC ducts, behind walls, under flooring." },
  { icon: FlaskConical, title: "Crowd out pathogens", text: "Through competitive exclusion, beneficial bacteria occupy the surface niches pathogenic species would otherwise colonise, displacing them continuously." },
];

/* ─── Action plan layers ────────────────────────────────── */
const actionLayers = [
  { number: "01", title: "Environmental controls", body: "Keep relative humidity 40 to 50 percent. Fix leaks immediately. Improve ventilation in bathrooms, kitchens, basements and laundry rooms.", timing: "Foundation, fix first" },
  { number: "02", title: "Physical reduction", body: "Encase mattresses and pillows. Wash bedding weekly above 130°F. HEPA-vacuum carpets and upholstery. Replace carpet with hard flooring in bedrooms when possible.", timing: "Weekly maintenance" },
  { number: "03", title: "Source-based cleaning", body: "Use vinegar on hard mold surfaces. Limit chemical disinfectants to acute contamination. Wash soft surfaces where pet dander accumulates.", timing: "Ongoing as needed" },
  { number: "04", title: "Biological protection", body: "Run an EnviroBiotics probiotic purifier continuously. Beneficial Bacillus strains establish a living barrier on every surface. Effects build over 2 to 4 weeks and persist as long as the device runs.", timing: "Continuous, deploy now" },
  { number: "05", title: "Air filtration", body: "Use a HEPA air purifier as supplementary capture for the airborne fraction. The probiotic device prevents resuspension. Together they cover the complete problem.", timing: "Supplementary" },
];

/* ─── Outcomes ──────────────────────────────────────────── */
const outcomes = [
  "Less morning congestion, fewer sneezing fits, clearer eyes, often within days.",
  "Deeper sleep without nighttime allergic awakenings.",
  "Mold does not regrow in previously affected bathrooms, basements or HVAC.",
  "Pet allergen loads drop to manageable levels without removing the pet.",
  "Musty, pet and cooking odors eliminated at the source instead of masked.",
  "Year-round allergy sufferers report manageable seasons for the first time.",
];

/* ─── FAQs ─────────────────────────────────────────────── */
const faqs = [
  { q: "What is the fastest way to reduce dust mite allergens?", a: "Wash bedding weekly above 130°F and encase mattresses and pillows in allergen-barrier covers. For sustained reduction, continuous probiotic purification has shown up to 90% allergen reduction within 30 days of independent testing." },
  { q: "Does an air purifier help with mold?", a: "A HEPA purifier can capture airborne spores but has no effect on mold growing on surfaces, where the real problem lives. Probiotic purification reaches the surfaces and removes the food source spores need to germinate." },
  { q: "What if I have active mold right now?", a: "Fix the moisture source first, leaks, ventilation, humidity. Clean visible mold with vinegar or call a remediator if it's extensive. Then deploy probiotic purification to prevent regrowth, the layer that addresses re-accumulation." },
  { q: "Can I use probiotic purification if I have pets?", a: "Yes. Probiotic treatment reduces pet allergen load on surfaces, not by removing the pet. Most pet owners use it to manage allergens while keeping their animals comfortably." },
  { q: "Is it safe for kids?", a: "Yes. All EnviroBiotics strains are FDA GRAS certified and EPA registered, the same beneficial bacteria found in soil and on healthy skin. Safe for infants, children, pregnant women and people with chemical sensitivities." },
  { q: "What humidity level prevents both mold and dust mites?", a: "40 to 50 percent relative humidity is the sweet spot. Below 50 percent slows dust mite reproduction. Below 60 percent prevents most mold growth. A simple hygrometer in problem rooms makes this trivial to monitor." },
];

const MoldAndAllergensPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="How to Reduce Mold & Allergens at Home Naturally | EnviroBiotics"
        description="A complete natural guide to reducing mold, dust mite allergens, pet dander and indoor pathogens at the source, without harsh chemicals."
        path="/mold-and-allergens"
        keywords="reduce mold naturally, dust mite allergens, pet dander reduction, probiotic air purification, indoor allergens, EnviroBiotics"
        jsonLd={jsonLd}
      />

      <Navbar />

      {/* ════════ HERO, full-bleed Sonos style ════════ */}
      <section className="relative w-full overflow-hidden pt-16 sm:pt-20">
        <div className="relative min-h-[78vh] md:min-h-[88vh] w-full">
          <img
            src={heroImg}
            alt="A serene Scandinavian bedroom in soft morning light"
            className="absolute inset-0 h-full w-full object-cover"
            width={1920}
            height={1280}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/65 md:via-black/25 md:to-transparent"
          />
          <div className="relative z-10 flex min-h-[78vh] md:min-h-[88vh] items-end md:items-center">
            <div className="container px-5 sm:px-6 pb-12 md:pb-0">
              <div className="max-w-3xl text-white" style={{ textShadow: "0 2px 18px rgba(0,0,0,0.45)" }}>
                <p className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-white/85 mb-5">
                  The Complete Natural Guide
                </p>
                <h1 className="font-display font-bold tracking-tight text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.04] mb-6 !text-white">
                  How to reduce mold and allergens in your home.
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl">
                  No harsh chemicals. No expensive renovations. Just an understanding of where allergens
                  actually <span className="text-[hsl(24_95%_53%)]">live</span>, and how to address them at the source.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ OPENING NARRATIVE ════════ */}
      <section className="py-24 md:py-36">
        <div className="container max-w-3xl mx-auto px-5 sm:px-6">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <p className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold tracking-tight text-foreground leading-[1.2] mb-10 text-balance">
                If you suffer from allergies or asthma, your home is working <span className="text-[hsl(24_95%_53%)]">against you.</span>
              </p>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>
                  Mold spores, dust mite allergens, pet dander and airborne pathogens are among
                  the most common triggers of chronic respiratory symptoms. They don't just float
                  in the air, they live on your mattress, your carpet, your furniture, your walls.
                </p>
                <p className="text-foreground font-medium">
                  Modern sealed homes mean once contamination enters, it stays. It accumulates on
                  surfaces. It recirculates through your HVAC. It re-enters the air with every
                  step across a carpet and every fluff of a pillow.
                </p>
                <p>
                  The good news: reducing these allergens does not require breathing masks or
                  industrial sprays. It requires understanding where they actually live and
                  addressing them where they are.
                </p>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════ WHERE ALLERGENS LIVE ════════ */}
      <section className="bg-secondary/40 py-24 md:py-36">
        <div className="container px-5 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp" className="lg:col-span-5">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
                  <img
                    src={windowImg}
                    alt="Soft linen curtain in Scandinavian morning light"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </ScrollReveal>
            </Suspense>

            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp" delay={0.1} className="lg:col-span-7">
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                  Where Allergens Live
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-8 text-balance">
                  Up to 80% of indoor allergens don't float, they live on <span className="text-[hsl(24_95%_53%)]">surfaces.</span>
                </h2>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed mb-10">
                  <p>
                    This is why conventional air purifiers fall short. Even high-quality HEPA models
                    can only capture what happens to float into them. They have no effect on the mold
                    growing behind your bathroom tiles, the dust mite colonies in your mattress, or
                    the pet dander embedded in your couch fabric.
                  </p>
                  <p>
                    You can run a purifier 24 hours a day and still wake up congested, because the
                    real problem is not in the air. It's on the surfaces around you.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
                  <div>
                    <p className="text-3xl md:text-4xl font-display font-semibold text-foreground">80%</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">of allergens live on surfaces</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-display font-semibold text-foreground">90%</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">allergen reduction at 30 days</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-display font-semibold text-foreground">⅓</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">of life spent in dust mite habitat</p>
                  </div>
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </div>
      </section>

      {/* ════════ ALLERGEN SOURCES ════════ */}
      <section className="py-24 md:py-36">
        <div className="container max-w-6xl mx-auto px-5 sm:px-6">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                What's actually triggering you
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-14 max-w-3xl text-balance">
                The four sources behind almost every indoor allergic <span className="text-[hsl(24_95%_53%)]">response.</span>
              </h2>
            </ScrollReveal>
          </Suspense>

          <div className="grid sm:grid-cols-2 gap-px bg-border/60 rounded-3xl overflow-hidden border border-border/60">
            {allergenSources.map((c, i) => (
              <Suspense key={c.title} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.05}>
                  <div className="bg-background p-8 md:p-10 h-full">
                    <c.icon className="w-7 h-7 text-foreground/80 mb-6" strokeWidth={1.5} />
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-3">{c.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{c.text}</p>
                  </div>
                </ScrollReveal>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ BATHROOM IMAGE BREAKER ════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full max-h-[720px]">
          <img
            src={bathroomImg}
            alt="A clean Scandinavian bathroom in soft morning light"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container px-5 sm:px-6 pb-10 md:pb-16">
              <p className="text-white/85 text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">Mold reduction</p>
              <p className="text-white text-2xl sm:text-3xl md:text-4xl font-display font-semibold max-w-2xl leading-tight" style={{ textShadow: "0 2px 18px rgba(0,0,0,0.4)" }}>
                Mold cannot grow without moisture. Fix that first. Everything else follows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ WHY CHEMICALS FALL SHORT ════════ */}
      <section className="bg-secondary/40 py-24 md:py-36">
        <div className="container max-w-6xl mx-auto px-5 sm:px-6">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                Why Chemicals Fall Short
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-16 max-w-3xl text-balance">
                Bleach, sprays and fragrances feel like a solution. Here's what they actually <span className="text-[hsl(24_95%_53%)]">do.</span>
              </h2>
            </ScrollReveal>
          </Suspense>

          <div className="space-y-px bg-border/60 rounded-3xl overflow-hidden border border-border/60">
            {chemicalProblems.map((c, i) => (
              <Suspense key={c.title} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.04}>
                  <article className="bg-background p-8 md:p-12 grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-4 flex md:flex-col items-start gap-4">
                      <AlertTriangle className="w-7 h-7 text-foreground/80" strokeWidth={1.5} />
                      <h3 className="text-2xl md:text-3xl font-display font-semibold text-foreground tracking-tight leading-tight">
                        {c.title}
                      </h3>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-muted-foreground leading-relaxed text-lg">{c.text}</p>
                    </div>
                  </article>
                </ScrollReveal>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ THE PROBIOTIC MECHANISM ════════ */}
      <section className="py-24 md:py-36">
        <div className="container px-5 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp" className="lg:col-span-7 order-2 lg:order-1">
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                  The Probiotic Advantage
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-8 text-balance">
                  One mechanism that addresses mold, dust mites and pet dander <span className="text-[hsl(24_95%_53%)]">simultaneously.</span>
                </h2>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed mb-10">
                  <p>
                    Rather than requiring a separate product for each allergen, a probiotic
                    purifier establishes a biological environment that is simultaneously
                    inhospitable to all of them, through competitive exclusion and continuous
                    consumption of organic matter.
                  </p>
                  <p className="text-foreground font-medium">
                    Independent testing showed up to 90% allergen reduction after 30 days of
                    continuous use, sustained as long as the device runs.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60">
                  {probioticMechanisms.map(m => (
                    <div key={m.title} className="bg-background p-6 md:p-7 h-full">
                      <m.icon className="w-6 h-6 text-foreground/80 mb-4" strokeWidth={1.5} />
                      <h3 className="text-base md:text-lg font-display font-semibold text-foreground mb-2">{m.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-[15px]">{m.text}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </Suspense>

            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp" delay={0.1} className="lg:col-span-5 order-1 lg:order-2">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
                  <img
                    src={petImg}
                    alt="A golden retriever resting on a wool rug in soft morning light"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </div>
      </section>

      {/* ════════ ACTION PLAN ════════ */}
      <section className="bg-secondary/40 py-24 md:py-36">
        <div className="container max-w-5xl mx-auto px-5 sm:px-6">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                Your Action Plan
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-14 max-w-3xl text-balance">
                Five layers that, stacked together, change the biology of your <span className="text-[hsl(24_95%_53%)]">home.</span>
              </h2>
            </ScrollReveal>
          </Suspense>

          <div className="space-y-px bg-border/60 rounded-3xl overflow-hidden border border-border/60">
            {actionLayers.map((l, i) => (
              <Suspense key={l.number} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.04}>
                  <article className="bg-background p-8 md:p-12 grid md:grid-cols-12 gap-6 md:gap-8">
                    <div className="md:col-span-3">
                      <p className="text-4xl md:text-5xl font-display font-semibold text-foreground/30 leading-none mb-3">{l.number}</p>
                      <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-muted-foreground">{l.timing}</p>
                    </div>
                    <div className="md:col-span-9">
                      <h3 className="text-2xl md:text-3xl font-display font-semibold text-foreground tracking-tight leading-tight mb-4">
                        {l.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{l.body}</p>
                    </div>
                  </article>
                </ScrollReveal>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ OUTCOMES ════════ */}
      <section className="py-24 md:py-36">
        <div className="container max-w-5xl mx-auto px-5 sm:px-6">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                What Changes
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-14 max-w-3xl text-balance">
                What users <span className="text-[hsl(24_95%_53%)]">report.</span>
              </h2>
            </ScrollReveal>
          </Suspense>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
            {outcomes.map((o, i) => (
              <Suspense key={i} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.04}>
                  <div className="flex gap-4 py-5 border-b border-border/60">
                    <Check className="w-5 h-5 text-foreground/70 flex-shrink-0 mt-1" strokeWidth={2} />
                    <p className="text-foreground/90 leading-relaxed">{o}</p>
                  </div>
                </ScrollReveal>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ BEDROOM IMAGE BREAKER ════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full max-h-[720px]">
          <img
            src={bedroomImg}
            alt="A calm Scandinavian bedroom with linen bedding and warm morning light"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container px-5 sm:px-6">
              <p className="text-white/85 text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">Where it matters most</p>
              <p className="text-white text-2xl sm:text-3xl md:text-4xl font-display font-semibold max-w-2xl leading-tight" style={{ textShadow: "0 2px 18px rgba(0,0,0,0.4)" }}>
                A third of your life is spent in the densest dust mite habitat in your home. Make it the cleanest air you breathe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="bg-secondary/40 py-24 md:py-36">
        <div className="container max-w-4xl mx-auto px-5 sm:px-6">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                Common Questions
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-12 text-balance">
                Frequently <span className="text-[hsl(24_95%_53%)]">asked.</span>
              </h2>
            </ScrollReveal>
          </Suspense>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/60 rounded-2xl px-5 md:px-7 bg-background data-[state=open]:border-foreground/20 transition-colors"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline py-6">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-[15px]">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ════════ BOTTOM LINE + CTA ════════ */}
      <section className="py-24 md:py-36">
        <div className="container max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                The Bottom Line
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-foreground leading-[1.05] mb-8 text-balance">
                You don't have to live with allergies. You have to make allergens <span className="text-[hsl(24_95%_53%)]">irrelevant.</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
                Each layer addresses a different part of the problem. Together, they create an indoor
                environment where allergens cannot accumulate, mold cannot establish, and dust mites
                cannot thrive.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="default" size="lg" asChild className="rounded-full">
                  <Link to="/shop">
                    <ShoppingBag className="w-4 h-4" />
                    Explore Devices
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="rounded-full">
                  <Link to="/how-it-works">
                    How It Works
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="lg" asChild className="rounded-full">
                  <Link to="/research">
                    Read the research
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════ RELATED + DISCLAIMER ════════ */}
      <section className="pb-24">
        <div className="container max-w-5xl mx-auto px-5 sm:px-6">
          <Suspense fallback={null}>
            <RelatedTopics currentPath="/mold-and-allergens" />
          </Suspense>

          <p className="text-xs text-muted-foreground mt-16 leading-relaxed text-center max-w-3xl mx-auto">
            All EnviroBiotics probiotic strains are FDA GRAS certified, EPA registered and MADE SAFE certified.
            Independent lab testing conducted by Indoor Biotechnologies. Educational content. Not intended as
            medical advice. Consult a qualified healthcare provider for personal health guidance.
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default MoldAndAllergensPage;
