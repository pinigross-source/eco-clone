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
  Wind, Activity, Moon, Shield, Brain, Eye,
  Baby, Heart, Leaf, PawPrint, Droplets, Microscope, Bug,
  ArrowRight, ShoppingBag, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import heroImg from "@/assets/health-scandi-livingroom.jpg";
import bedroomImg from "@/assets/health-scandi-bedroom.jpg";
import nurseryImg from "@/assets/health-scandi-nursery.jpg";
import kitchenImg from "@/assets/health-scandi-kitchen.jpg";
import windowImg from "@/assets/health-scandi-window.jpg";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const RelatedTopics = lazy(() => import("@/components/RelatedTopics").then(m => ({ default: m.RelatedTopics })));

/* ─── JSON-LD ─────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "The Health Benefits of Cleaner Indoor Air | EnviroBiotics",
      description:
        "How indoor air quality shapes sleep, allergies, asthma, immunity and cognition — and how continuous probiotic purification addresses the biological root causes.",
      author: { "@type": "Organization", name: "EnviroBiotics" },
      publisher: { "@type": "Organization", name: "EnviroBiotics", url: "https://envirobiotics.com" },
      url: "https://envirobiotics.com/health-benefits",
      datePublished: "2024-01-01",
      dateModified: "2026-05-01",
    },
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Health Benefits", url: "/health-benefits" },
    ]),
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How long until I notice a difference?", acceptedAnswer: { "@type": "Answer", text: "Most people notice improvement in nasal congestion and sleep quality within 2–3 weeks of continuous use. Allergen reduction is measurable within 30 days." } },
        { "@type": "Question", name: "Will it work if I still have pets?", acceptedAnswer: { "@type": "Answer", text: "Yes. Probiotic purification reduces pet allergens on surfaces. You don't have to choose between your pet and breathing clearly." } },
        { "@type": "Question", name: "What if I have mold right now?", acceptedAnswer: { "@type": "Answer", text: "Fix the moisture source first. Probiotic treatment prevents mold from re-establishing after remediation." } },
        { "@type": "Question", name: "Is it safe for my kids?", acceptedAnswer: { "@type": "Answer", text: "Yes. All EnviroBiotics strains are FDA GRAS certified and EPA registered. Safe for infants, children and pregnant women." } },
        { "@type": "Question", name: "Can I use it with my air purifier?", acceptedAnswer: { "@type": "Answer", text: "Yes. An air purifier handles the floating particles. EnviroBiotics handles the surfaces where most allergens live." } },
      ],
    },
  ],
};

const contaminants = [
  { icon: Bug, title: "Dust mite allergens", text: "Der p1 and Der f1 — the waste proteins shed by dust mites in mattresses, carpets and soft furnishings. Among the most potent triggers for allergic rhinitis and asthma." },
  { icon: Droplets, title: "Mold spores & mycotoxins", text: "Airborne spores trigger respiratory inflammation. Certain species produce mycotoxins linked to neurological symptoms, immune suppression and chronic fatigue." },
  { icon: PawPrint, title: "Pet allergen proteins", text: "Fel d1 and Can f1 stay active on surfaces and in the air for months — even in homes without pets. They define daily quality of life for the 10–20% of people with pet allergies." },
  { icon: Microscope, title: "Pathogens & VOCs", text: "Surface bacteria continuously reseed the air. Cleaning chemicals, fragrances and off-gassing furniture add VOC loads that irritate airways with chronic exposure." },
];

const conditions = [
  {
    icon: Wind,
    title: "Allergic rhinitis",
    intro: "Year-round congestion driven by indoor allergens — not seasonal pollen.",
    body: "Nasal congestion, sneezing, itchy eyes, post-nasal drip. When the trigger lives in your mattress, carpet and furniture, symptoms never resolve seasonally. In independent lab testing, continuous probiotic treatment reduced common indoor allergen concentrations by up to 90% within 30 days.",
  },
  {
    icon: Activity,
    title: "Asthma",
    intro: "Indoor biological triggers drive a large share of exacerbations in the 25 million Americans with asthma.",
    body: "Dust mite allergens in bedding, mold spores in hidden spaces, pet dander on every soft surface — every movement stirs them back into the air you breathe. Probiotic purification works where the problem lives, breaking down the proteins and depriving microbes of their food source.",
  },
  {
    icon: Moon,
    title: "Sleep quality",
    intro: "Your mattress and pillow are the densest dust mite habitat in your home.",
    body: "Allergen exposure during sleep raises nighttime respiratory resistance, reduces deep sleep and produces the morning fatigue you blame on yourself. Most users report deeper sleep and clearer mornings within two to three weeks.",
  },
  {
    icon: Shield,
    title: "Immune calibration",
    intro: "Modern indoor environments are microbially impoverished — and your immune system notices.",
    body: "Diversity of the indoor microbiome influences how the immune system develops, responds and regulates itself. Probiotic purification reintroduces beneficial Bacillus strains that train the immune system toward tolerance instead of reactivity.",
  },
  {
    icon: Brain,
    title: "Cognitive performance",
    intro: "Air quality changes how clearly you think.",
    body: "Harvard researchers found workers in lower-VOC environments scored significantly higher across nine cognitive domains. Long-term exposure to poor air quality is associated with increased risk of cognitive decline. Better air protects both inhalation and the deep sleep that does the cognitive repair.",
  },
  {
    icon: Eye,
    title: "Skin health",
    intro: "Your skin is the interface between your body and the air in your home.",
    body: "Dust mite proteins penetrate skin barrier defects and trigger inflammation at the cellular level. VOC-rich, allergen-heavy air provokes chronic eczema and contact dermatitis. Reducing the surface load lets the skin barrier heal.",
  },
];

const outcomes = [
  "Less nasal congestion, fewer sneezing fits, clearer eyes — usually within days.",
  "Deeper sleep, fewer nighttime awakenings, mornings without grogginess.",
  "Fewer inhaler uses and symptom flares — especially in children.",
  "Pet, musty and cooking odors eliminated at the source, not masked.",
  "No mold regrowth in previously affected bathrooms, basements and HVAC.",
  "Year-round allergy sufferers report manageable seasons for the first time.",
];

const beneficiaries = [
  { icon: Baby, title: "Children with allergies & asthma", text: "Kids breathe more air per pound of body weight and live closer to where allergens settle. Safe for infants from birth." },
  { icon: Wind, title: "Adults with chronic rhinitis", text: "Attacks the year-round allergen reservoirs directly instead of filtering what passes through the air." },
  { icon: Droplets, title: "Recovering from mold", text: "Continuous prevention so mold cannot reestablish itself after remediation." },
  { icon: Heart, title: "Older adults", text: "Continuous reduction in pathogens and allergens for those with reduced immune resilience." },
  { icon: Leaf, title: "Non-toxic households", text: "Better biological outcomes without reintroducing chemical loads into your air." },
  { icon: PawPrint, title: "Pet owners", text: "Reduces pet allergen loads to manageable levels. Keep your pet. Keep your health." },
];

const faqs = [
  { q: "How long until I notice a difference?", a: "Most people notice improvement in nasal congestion and sleep quality within 2–3 weeks of continuous use. Allergen reduction is measurable within 30 days. Severity of the starting allergen load determines the slope." },
  { q: "Will it work if I still have pets?", a: "Yes. Probiotic purification reduces pet allergens on surfaces, not by removing the pet. Most people find the resulting load very tolerable." },
  { q: "What if I have mold right now?", a: "Fix the moisture source first. Probiotic treatment prevents mold from re-establishing afterward — it works as prevention and maintenance, not as a replacement for fixing a leak." },
  { q: "Is it safe for my kids?", a: "Yes. All EnviroBiotics strains are FDA GRAS certified and EPA registered — the same beneficial bacteria found in soil and on healthy skin. Safe for infants, children and pregnant women." },
  { q: "Can I use it with my air purifier?", a: "Yes. An air purifier handles floating particles. EnviroBiotics handles the surfaces where most allergens actually live. Together they cover the whole problem." },
];

const HealthBenefitsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Health Benefits of Cleaner Indoor Air | EnviroBiotics"
        description="How indoor air quality affects sleep, allergies, asthma, immunity and cognition — and how continuous probiotic purification addresses the biological root causes."
        path="/health-benefits"
        keywords="health benefits indoor air quality, probiotic air purification, allergy relief home, asthma triggers home, sleep air quality, EnviroBiotics"
        jsonLd={jsonLd}
      />

      <Navbar />

      {/* ════════ HERO — full-bleed Sonos style ════════ */}
      <section className="relative w-full overflow-hidden pt-16 sm:pt-20">
        <div className="relative min-h-[78vh] md:min-h-[88vh] w-full">
          <img
            src={heroImg}
            alt="A serene Scandinavian living room bathed in soft morning light"
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
                  Science-Backed Guide
                </p>
                <h1 className="font-display font-bold tracking-tight text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.04] mb-6 !text-white">
                  The health benefits of cleaner indoor air.
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl">
                  Sleep, allergies, asthma, immunity, the way you think. All shaped by what's <span className="text-[hsl(24_95%_53%)]">living</span> in
                  the air around you. Here's what the science says, and what changes when you fix it.
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
                The air inside your home is affecting your body <span className="text-[hsl(24_95%_53%)]">right now.</span>
              </p>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>
                  If it's carrying elevated levels of dust mite allergens, mold spores, pet dander
                  or pathogenic bacteria, you're already experiencing the consequences — whether
                  you recognise them as such. Chronic fatigue. Sleep that never feels restorative.
                  Allergies that won't resolve. A persistent low-grade respiratory irritation
                  you've stopped noticing.
                </p>
                <p className="text-foreground font-medium">
                  None of that is normal. And it's directly traceable to the biological quality of
                  your indoor environment — which you can measure, test and change.
                </p>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════ THE SCALE OF EXPOSURE ════════ */}
      <section className="bg-secondary/40 py-24 md:py-36">
        <div className="container px-5 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp" className="lg:col-span-5">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
                  <img
                    src={windowImg}
                    alt="Linen curtain in soft Scandinavian morning light"
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
                  The Scale of Exposure
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-8 text-balance">
                  You spend over 90% of your life breathing <span className="text-[hsl(24_95%_53%)]">indoor air.</span>
                </h2>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed mb-10">
                  <p>
                    The EPA ranks indoor air pollution among the top five environmental risks to
                    public health. Indoor air can be two to five times more polluted than outdoor
                    air. In some homes, far worse.
                  </p>
                  <p>
                    The contaminants don't stay suspended. They settle on every surface and get
                    stirred back into the air with every breath, every step, every moment of
                    daily life.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
                  <div>
                    <p className="text-3xl md:text-4xl font-display font-semibold text-foreground">90%</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">of life spent indoors</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-display font-semibold text-foreground">5×</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">more polluted than outdoor air</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-display font-semibold text-foreground">80%</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">of allergens live on surfaces</p>
                  </div>
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </div>
      </section>

      {/* ════════ CONTAMINANTS ════════ */}
      <section className="py-24 md:py-36">
        <div className="container max-w-6xl mx-auto px-5 sm:px-6">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                What's actually in the air
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-14 max-w-3xl text-balance">
                The biological contaminants most responsible for <span className="text-[hsl(24_95%_53%)]">health impacts.</span>
              </h2>
            </ScrollReveal>
          </Suspense>

          <div className="grid sm:grid-cols-2 gap-px bg-border/60 rounded-3xl overflow-hidden border border-border/60">
            {contaminants.map((c, i) => (
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

      {/* ════════ CONDITIONS — editorial list with image ════════ */}
      <section className="bg-secondary/40 py-24 md:py-36">
        <div className="container max-w-6xl mx-auto px-5 sm:px-6">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                Conditions & Research
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-16 max-w-3xl text-balance">
                Six health outcomes shaped by the air in <span className="text-[hsl(24_95%_53%)]">your home.</span>
              </h2>
            </ScrollReveal>
          </Suspense>

          <div className="space-y-px bg-border/60 rounded-3xl overflow-hidden border border-border/60">
            {conditions.map((c, i) => (
              <Suspense key={c.title} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.04}>
                  <article className="bg-background p-8 md:p-12 grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-4 flex md:flex-col items-start gap-4">
                      <c.icon className="w-7 h-7 text-foreground/80" strokeWidth={1.5} />
                      <h3 className="text-2xl md:text-3xl font-display font-semibold text-foreground tracking-tight leading-tight">
                        {c.title}
                      </h3>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-foreground text-lg leading-relaxed mb-4 font-medium">{c.intro}</p>
                      <p className="text-muted-foreground leading-relaxed">{c.body}</p>
                    </div>
                  </article>
                </ScrollReveal>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SLEEP IMAGE BREAKER ════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full max-h-[720px]">
          <img
            src={bedroomImg}
            alt="A calm Scandinavian bedroom with linen bedding and warm morning light"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container px-5 sm:px-6 pb-10 md:pb-16">
              <p className="text-white/85 text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">Where it matters most</p>
              <p className="text-white text-2xl sm:text-3xl md:text-4xl font-display font-semibold max-w-2xl leading-tight" style={{ textShadow: "0 2px 18px rgba(0,0,0,0.4)" }}>
                You spend a third of your life in your bedroom. Make it the cleanest air you breathe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ THE PROBIOTIC DIFFERENCE ════════ */}
      <section className="py-24 md:py-36">
        <div className="container px-5 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp" className="lg:col-span-7 order-2 lg:order-1">
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                  The Probiotic Difference
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-8 text-balance">
                  A HEPA filter captures what floats. We work where the problem <span className="text-[hsl(24_95%_53%)]">actually lives.</span>
                </h2>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Up to 80% of indoor allergens, mold spores and pathogens don't float — they
                    live on surfaces. Your mattress. Your carpet. Your furniture. No filter
                    addresses that reservoir. No spray stays active long enough.
                  </p>
                  <p className="text-foreground font-medium">
                    EnviroBiotics devices continuously disperse FDA GRAS certified Bacillus
                    probiotics throughout the room.
                  </p>
                  <p>
                    They settle on every surface and form a living protective layer — consuming
                    organic matter, degrading allergen proteins, preventing mold germination,
                    and displacing pathogenic bacteria through competitive exclusion. You're not
                    fighting biology anymore. You're using biology to protect yourself.
                  </p>
                </div>
              </ScrollReveal>
            </Suspense>

            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp" delay={0.1} className="lg:col-span-5 order-1 lg:order-2">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
                  <img
                    src={kitchenImg}
                    alt="A quiet Scandinavian morning ritual with warm tea"
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

      {/* ════════ OUTCOMES ════════ */}
      <section className="bg-secondary/40 py-24 md:py-36">
        <div className="container max-w-5xl mx-auto px-5 sm:px-6">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                Real Outcomes
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

      {/* ════════ NURSERY IMAGE BREAKER ════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full max-h-[720px]">
          <img
            src={nurseryImg}
            alt="A peaceful Scandinavian nursery in soft morning light"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container px-5 sm:px-6">
              <p className="text-white/85 text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">Safe from day one</p>
              <p className="text-white text-2xl sm:text-3xl md:text-4xl font-display font-semibold max-w-2xl leading-tight" style={{ textShadow: "0 2px 18px rgba(0,0,0,0.4)" }}>
                FDA GRAS certified. EPA registered. Safe for infants, children and pregnant women — from birth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ WHO BENEFITS ════════ */}
      <section className="py-24 md:py-36">
        <div className="container max-w-6xl mx-auto px-5 sm:px-6">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                Best For
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-14 max-w-3xl text-balance">
                Who benefits <span className="text-[hsl(24_95%_53%)]">most.</span>
              </h2>
            </ScrollReveal>
          </Suspense>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 rounded-3xl overflow-hidden border border-border/60">
            {beneficiaries.map((b, i) => (
              <Suspense key={b.title} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.04}>
                  <div className="bg-background p-8 md:p-10 h-full">
                    <b.icon className="w-7 h-7 text-foreground/80 mb-6" strokeWidth={1.5} />
                    <h3 className="text-lg md:text-xl font-display font-semibold text-foreground mb-3">{b.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">{b.text}</p>
                  </div>
                </ScrollReveal>
              </Suspense>
            ))}
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
                Your indoor air is a health decision.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
                How you sleep tonight. How you breathe tomorrow. How clearly you think next week.
                And — over the long term — how your health ages.
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
            <RelatedTopics currentPath="/health-benefits" />
          </Suspense>

          <p className="text-xs text-muted-foreground mt-16 leading-relaxed text-center max-w-3xl mx-auto">
            All EnviroBiotics probiotic strains are FDA GRAS certified, EPA registered and MADE SAFE certified.
            Independent lab testing conducted by Indoor Biotechnologies. Health information provided for
            educational purposes. Not intended as medical advice. Consult a qualified healthcare provider
            for personal health guidance.
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HealthBenefitsPage;
