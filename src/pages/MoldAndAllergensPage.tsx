import { lazy, Suspense } from "react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/ui/section-label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Shield, Microscope, Droplets, Wind, PawPrint, Baby,
  Leaf, Heart, AlertTriangle, ShoppingBag, ArrowRight,
  Check, Sparkles, Bug, FlaskConical, ThermometerSun,
  Home, Layers, SprayCan,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const ScrollReveal = lazy(() => import("@/components/ui/scroll-reveal").then(m => ({ default: m.ScrollReveal })));
const RelatedTopics = lazy(() => import("@/components/RelatedTopics").then(m => ({ default: m.RelatedTopics })));

/* ─── JSON-LD schema ─────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "How to Reduce Mold and Allergens at Home Naturally (2025 Guide)",
      description:
        "Learn how to reduce mold, dust mite allergens, pet dander, and indoor pathogens naturally, without harsh chemicals. Science-backed strategies including probiotic purification.",
      author: { "@type": "Organization", name: "EnviroBiotics" },
      publisher: { "@type": "Organization", name: "EnviroBiotics", url: "https://envirobiotics.com" },
      url: "https://envirobiotics.com/mold-and-allergens",
      datePublished: "2024-01-01",
      dateModified: "2025-04-01",
    },
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Mold & Allergens", url: "/mold-and-allergens" },
    ]),
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is the fastest way to reduce dust mite allergens?", acceptedAnswer: { "@type": "Answer", text: "The fastest short-term measures are washing all bedding at 60°C and encasing your mattress and pillows in allergen-barrier covers. For sustained reduction, continuous probiotic purification delivers the most significant long-term results, with independent studies showing up to 90% allergen reduction within 30 days." } },
        { "@type": "Question", name: "Does an air purifier help with mold?", acceptedAnswer: { "@type": "Answer", text: "A HEPA air purifier can capture airborne mold spores that pass through it. However, it has no effect on mold already growing on surfaces, which is where the health risk is greatest. Probiotic purification addresses surface mold at the source by depriving spores of the food they need to germinate." } },
        { "@type": "Question", name: "Is bleach effective against mold?", acceptedAnswer: { "@type": "Answer", text: "Bleach kills surface mold on contact but evaporates quickly and leaves no residual protection. On porous surfaces, bleach cannot penetrate deeply enough to eliminate mold roots. Vinegar and probiotic treatment are more effective for long-term mold prevention." } },
        { "@type": "Question", name: "Can you fully eliminate dust mites from a home?", acceptedAnswer: { "@type": "Answer", text: "Complete elimination is not realistic, as dust mites are present in virtually every indoor environment. The goal is to reduce allergen concentrations below the threshold that triggers symptoms." } },
        { "@type": "Question", name: "How long does it take for probiotic purification to reduce allergens?", acceptedAnswer: { "@type": "Answer", text: "Independent testing by Indoor Biotechnologies showed measurable allergen reduction within the first week and up to 90% reduction after 30 days of continuous use." } },
        { "@type": "Question", name: "Is probiotic purification safe if I have pets?", acceptedAnswer: { "@type": "Answer", text: "Yes. EnviroBiotics uses FDA GRAS certified Bacillus strains, the same safety classification used for bacteria in pet food and animal feed. The devices are safe for all animals." } },
        { "@type": "Question", name: "What humidity level prevents both mold and dust mites?", acceptedAnswer: { "@type": "Answer", text: "Keeping indoor relative humidity between 40% and 50% is the optimal range. Below 50% prevents dust mite survival. Below 60% prevents most mold growth." } },
      ],
    },
  ],
};

/* ─── Allergen sources ──────────────────────────────────── */
const allergenSources = [
  { icon: Bug, title: "Dust mites", text: "These microscopic arachnids live in mattresses, pillows, carpets, and upholstered furniture. Their fecal waste proteins, specifically Der p1 and Der f1, are among the most potent indoor allergens known. A single gram of dust can contain thousands of dust mite waste particles." },
  { icon: Droplets, title: "Mold", text: "Mold spores are present in virtually every indoor environment. They become a health problem when they find a food source on a damp surface. Common problem areas include bathrooms, kitchens, basements, window frames, and inside HVAC systems." },
  { icon: PawPrint, title: "Pet dander", text: "Pet allergens are protein-based particles shed from skin, saliva, and urine of cats, dogs, and other animals. Fel d1 (cats) and Can f1 (dogs) are extremely small and sticky, clinging to surfaces and persisting for months." },
  { icon: Microscope, title: "Indoor bacteria & pathogens", text: "Pathogenic bacteria thrive on organic residue on surfaces throughout the home. They are transmitted by touch, re-aerosolized by foot traffic, and accumulate wherever organic matter is available as a food source." },
];

/* ─── Chemical problems ─────────────────────────────────── */
const chemicalProblems = [
  { title: "One-time treatments only", text: "Chemical disinfectants kill what they contact at the moment of application. Within 30 minutes to a few hours, surfaces begin to be recolonized. There is no residual protection." },
  { title: "Worsen air quality", text: "Many conventional cleaning products release volatile organic compounds (VOCs). Bleach releases chlorine gas. Fragrance-based products add chemical aerosols that can worsen allergy and asthma symptoms." },
  { title: "Create resistance", text: "Repeated use of chemical antimicrobials contributes to the development of resistant organisms. The bacteria and mold that survive become harder to eliminate over time." },
  { title: "Leave surfaces vulnerable", text: "After a chemical treatment kills existing microbes, it leaves surfaces with no biological defense. The first organism to recolonize faces no competition, a worse starting position than an untreated surface." },
];

/* ─── Mold strategies ───────────────────────────────────── */
const moldStrategies = [
  { icon: ThermometerSun, title: "Control Humidity", text: "Keep indoor relative humidity below 50%. Use a hygrometer to monitor bathrooms, basements, and kitchens. Run exhaust fans during and after showers. Fix leaks immediately, a slow drip is enough moisture to support mold growth within 24 to 48 hours." },
  { icon: Wind, title: "Improve Ventilation", text: "Stagnant air allows moisture and spore concentrations to build up. Open windows when conditions allow, run HVAC systems regularly, and replace filters on schedule. Pay attention to closets, basements, and laundry areas." },
  { icon: Sparkles, title: "Clean with Mold-Resistant Practices", text: "Vinegar is a genuinely effective mold inhibitor for hard surfaces. It penetrates surface cells and disrupts mold at a structural level. Apply undiluted white vinegar, allow it to sit for an hour, then wipe clean." },
  { icon: Leaf, title: "Use Probiotic Purification", text: "EnviroBiotics devices continuously disperse beneficial Bacillus probiotics that settle on surfaces and consume the organic matter mold spores need to germinate. This works in hidden spaces, inside HVAC ducts, behind walls, beneath flooring, where mold problems are most serious." },
];

/* ─── Dust mite strategies ──────────────────────────────── */
const dustMiteStrategies = [
  "Encase mattresses and pillows in allergen-barrier covers with pore sizes below 10 microns.",
  "Wash bedding weekly at 60°C (140°F). Cold water does not reliably kill mites.",
  "Reduce carpeting where possible. Hard flooring with washable rugs is easier to keep allergen-free.",
  "Keep indoor humidity below 50%. Dust mites cannot survive in low-humidity environments.",
  "Deploy probiotic surface treatment to consume the organic debris dust mites feed on. Independent testing showed up to 90% allergen reduction after 30 days.",
];

/* ─── Pet dander strategies ─────────────────────────────── */
const petDanderStrategies = [
  { title: "Create pet-free zones", text: "Keeping pets out of bedrooms significantly reduces allergen exposure during sleep, the most critical period for respiratory recovery." },
  { title: "Groom pets regularly", text: "Regular bathing and brushing reduces the amount of allergen shed. Ideally done by a non-allergic household member, outdoors." },
  { title: "Use HEPA in high-use rooms", text: "A HEPA purifier captures airborne pet dander effectively. However, it cannot address dander already settled into fabric and surfaces." },
  { title: "Apply probiotic purification", text: "EnviroBiotics probiotics degrade the protein structure of pet allergens at the molecular level, reducing the reservoir of settled dander that continually re-seeds the air." },
];

/* ─── Probiotic unified benefits ────────────────────────── */
const probioticBenefits = [
  "Consume the organic debris that dust mites depend on for food, reducing the population and the allergen proteins it produces.",
  "Deprive mold spores of the surface nutrition they need to germinate, preventing colonies from forming even in hidden areas.",
  "Break down pet dander proteins enzymatically, reducing allergen concentration on surfaces.",
  "Displace pathogenic bacteria through competitive exclusion, reducing the overall microbial burden of the indoor environment.",
];

/* ─── Practical plan ────────────────────────────────────── */
const practicalPlan = [
  { icon: ThermometerSun, title: "Environmental controls", text: "Keep relative humidity below 50%, fix leaks immediately, and ensure adequate ventilation throughout the home." },
  { icon: Shield, title: "Physical barriers", text: "Use allergen-barrier mattress and pillow encasements and wash bedding weekly at high temperature." },
  { icon: Sparkles, title: "Surface cleaning", text: "Vacuum weekly with a HEPA-filtered vacuum. Use vinegar-based cleaning on surfaces prone to mold." },
  { icon: Leaf, title: "Biological protection", text: "Run an EnviroBiotics probiotic purifier continuously in bedrooms and living areas. For whole-home coverage, consider the E-Biotic Pro." },
  { icon: Wind, title: "Air filtration", text: "Use a HEPA air purifier as a complementary tool for airborne particles, smoke, and PM2.5. Combine with probiotic purification for complete coverage." },
];

/* ─── FAQ ────────────────────────────────────────────────── */
const faqs = [
  { q: "What is the fastest way to reduce dust mite allergens?", a: "The fastest short-term measures are washing all bedding at 60°C and encasing your mattress and pillows in allergen-barrier covers. For sustained reduction, continuous probiotic purification delivers the most significant long-term results, with independent studies showing up to 90% allergen reduction within 30 days." },
  { q: "Does an air purifier help with mold?", a: "A HEPA air purifier can capture airborne mold spores that pass through it. However, it has no effect on mold already growing on surfaces, which is where the health risk is greatest. Probiotic purification addresses surface mold at the source by depriving spores of the food they need to germinate." },
  { q: "Is bleach effective against mold?", a: "Bleach kills surface mold on contact but evaporates quickly and leaves no residual protection. On porous surfaces, bleach cannot penetrate deeply enough to eliminate mold roots. It also releases chlorine gas. Vinegar and probiotic treatment are more effective for long-term mold prevention." },
  { q: "Can you fully eliminate dust mites from a home?", a: "Complete elimination is not realistic. The goal is to reduce allergen concentrations below the threshold that triggers symptoms. The combination of encasements, hot washing, humidity control, and probiotic surface treatment can achieve this for most allergy sufferers." },
  { q: "How long does it take for probiotic purification to reduce allergens?", a: "Independent testing by Indoor Biotechnologies showed measurable allergen reduction within the first week and up to 90% reduction after 30 days of continuous use." },
  { q: "Is probiotic purification safe if I have pets?", a: "Yes. EnviroBiotics uses FDA GRAS certified Bacillus strains, the same safety classification used for bacteria in pet food and animal feed. The devices are safe for all animals, including cats, dogs, birds, and small pets." },
  { q: "What humidity level prevents both mold and dust mites?", a: "Keeping indoor relative humidity between 40% and 50% is the optimal range. Below 50% prevents dust mite survival. Below 60% prevents most mold growth. Staying within the 40 to 50% range addresses both simultaneously." },
];

/* ─── Page ───────────────────────────────────────────────── */
const MoldAndAllergensPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="How to Reduce Mold and Allergens at Home Naturally (2025 Guide)"
        description="Learn how to reduce mold, dust mite allergens, pet dander, and indoor pathogens naturally, without harsh chemicals. Science-backed strategies including probiotic purification."
        path="/mold-and-allergens"
        keywords="how to reduce mold at home naturally, dust mite allergen reducer, mold prevention home, reduce indoor allergens, natural allergen reduction, mold and allergen control, EnviroBiotics"
        jsonLd={jsonLd}
      />

      <Navbar />

      {/* ════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute top-20 right-10 w-72 md:w-[500px] h-72 md:h-[500px] bg-primary/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-60 md:w-96 h-60 md:h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5 md:mb-6">The Complete Natural Guide</SectionLabel>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] mb-6 text-balance">
                How to Reduce{" "}
                <span className="text-gradient-primary">Mold & Allergens</span>{" "}
                in Your Home
              </h1>

              <p className="text-sm text-muted-foreground mb-10">
                By EnviroBiotics Science Team · Last updated April 2025
              </p>
            </ScrollReveal>
          </Suspense>

          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp" delay={0.15}>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
                  If you suffer from allergies or asthma, your home may be working against you.
                </p>
                <p>
                  Mold spores, dust mite allergens, pet dander, and airborne pathogens are among the most common triggers for chronic respiratory symptoms, and all of them thrive indoors. Modern homes are sealed tightly for energy efficiency, which means contamination that enters has nowhere to go. It accumulates on surfaces, recirculates through HVAC systems, and re-enters the air every time someone walks across a carpet or fluffs a pillow.
                </p>
                <p>
                  The good news is that reducing these allergens does not require harsh chemical sprays, expensive renovations, or breathing masks. It requires understanding where allergens actually live and addressing them at the source.
                </p>
                <div className="bg-primary-soft/50 border border-primary/10 rounded-2xl p-5 md:p-6 mt-2">
                  <p className="text-foreground font-medium text-base md:text-lg leading-relaxed">
                    This guide covers the most effective natural strategies for reducing mold and allergens in your home, including the emerging science of probiotic indoor purification, which has shown up to 90% reductions in allergen concentration in independent testing.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          WHERE DO ALLERGENS COME FROM?
          ════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">Understanding The Problem</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6">
                Where Do Indoor Allergens Actually Come From?
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                Before addressing the problem, it helps to understand the scale of it. According to health researchers and indoor environmental scientists, up to 80% of indoor allergens do not live in the air. They live on surfaces, your carpet, mattress, upholstered furniture, curtains, bedding, and the hidden crevices of your walls and baseboards.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
                This is why conventional air purifiers, even high-quality HEPA models, can only do so much. A HEPA filter captures particles that happen to pass through it. It has no effect on the mold growing behind your bathroom tiles, the dust mite colonies in your mattress, or the pet dander embedded in your couch fabric.
              </p>
            </ScrollReveal>
          </Suspense>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {allergenSources.map((item, i) => (
              <Suspense key={item.title} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.1}>
                  <div className="card-premium p-6 md:p-8 h-full">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="icon-container icon-container-lg shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg md:text-xl font-display font-semibold text-foreground pt-2">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed pl-0 md:pl-[4.5rem]">{item.text}</p>
                  </div>
                </ScrollReveal>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          THE PROBLEM WITH CHEMICALS
          ════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28">
        <div className="absolute top-40 left-10 w-60 md:w-80 h-60 md:h-80 bg-destructive/4 rounded-full blur-3xl pointer-events-none" />
        <div className="container relative px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">Why Chemicals Fall Short</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6">
                The Problem with Chemical Approaches
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
                The instinctive response to mold and allergens is to reach for a cleaning product. Bleach for mold. Disinfectant spray for bacteria. Chemical fresheners for odors. These approaches have real limitations.
              </p>
            </ScrollReveal>
          </Suspense>

          <div className="space-y-4">
            {chemicalProblems.map((item, i) => (
              <Suspense key={item.title} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.08}>
                  <div className="card-premium p-5 md:p-6 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          NATURAL MOLD STRATEGIES
          ════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">Mold Prevention</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
                Natural Strategies for Reducing Mold at Home
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
                Effective mold reduction combines environmental controls, cleaning practices, and biological protection. The following strategies work best when used together.
              </p>
            </ScrollReveal>
          </Suspense>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {moldStrategies.map((item, i) => (
              <Suspense key={item.title} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.1}>
                  <div className="card-premium p-6 md:p-8 h-full">
                    <div className="icon-container icon-container-lg mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          DUST MITE STRATEGIES
          ════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28">
        <div className="absolute top-20 right-0 w-60 md:w-96 h-60 md:h-96 bg-primary/4 rounded-full blur-3xl pointer-events-none" />
        <div className="container relative px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">Dust Mite Control</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
                Natural Strategies for Reducing Dust Mite Allergens
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
                Dust mites are one of the hardest allergens to control because their primary habitat, the mattress and bedding you sleep in, is where you spend a third of your life.
              </p>
            </ScrollReveal>
          </Suspense>

          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <div className="card-premium p-6 md:p-8">
                <div className="space-y-4">
                  {dustMiteStrategies.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PET DANDER STRATEGIES
          ════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">Pet Allergen Control</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
                Natural Strategies for Reducing Pet Dander
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
                Pet allergens are particularly challenging because they are so small and sticky. Fel d1 particles from cats are roughly 2 to 4 microns in size, which means they remain airborne for extended periods and cling tenaciously to soft surfaces.
              </p>
            </ScrollReveal>
          </Suspense>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
            {petDanderStrategies.map((item, i) => (
              <Suspense key={item.title} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.1}>
                  <div className="card-premium p-6 h-full">
                    <h3 className="text-base font-display font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PROBIOTIC UNIFIED APPROACH
          ════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28">
        <div className="absolute bottom-20 left-10 w-60 md:w-80 h-60 md:h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container relative px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">The Probiotic Advantage</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
                How Probiotic Purification Addresses All Three Allergen Sources at Once
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                One of the most practical advantages of probiotic indoor purification is that it addresses mold, dust mite allergens, and pet dander through a single continuous mechanism: competitive exclusion and organic matter consumption.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
                Rather than requiring a separate product or strategy for each allergen type, a probiotic purifier establishes a biological environment that is inhospitable to all of them simultaneously.
              </p>
            </ScrollReveal>
          </Suspense>

          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <div className="card-premium p-6 md:p-8">
                <h3 className="font-display font-semibold text-foreground mb-5 text-lg">The beneficial Bacillus strains in EnviroBiotics devices:</h3>
                <div className="space-y-4">
                  {probioticBenefits.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary-soft/50 border border-primary/10 rounded-xl p-5 mt-6">
                  <p className="text-foreground font-medium text-sm md:text-base leading-relaxed">
                    This whole-environment approach is what distinguishes probiotic purification from every other allergen control strategy. Other approaches treat specific symptoms in specific locations. Probiotic purification changes the biology of the entire space.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PRACTICAL PLAN
          ════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">Your Action Plan</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
                A Practical Allergen Reduction Plan for Your Home
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
                For the best results, combine the following elements. This layered approach addresses allergens at every stage: before they accumulate on surfaces, while they are present, and as they attempt to re-enter the air.
              </p>
            </ScrollReveal>
          </Suspense>

          <div className="space-y-4">
            {practicalPlan.map((item, i) => (
              <Suspense key={item.title} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.08}>
                  <div className="card-premium p-5 md:p-6 flex items-start gap-4">
                    <div className="relative shrink-0">
                      <span className="absolute -top-1 -left-1 text-[2.5rem] font-display font-black text-primary/[0.06] leading-none select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="icon-container icon-container-lg relative z-10">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FAQ
          ════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">FAQ</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-10">
                Frequently Asked Questions
              </h2>
            </ScrollReveal>
          </Suspense>

          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="card-premium px-5 md:px-6 border-none data-[state=open]:ring-2 data-[state=open]:ring-primary/20 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold text-sm md:text-base text-foreground hover:text-primary-text py-4 md:py-5 [&[data-state=open]]:text-primary-text">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-4 md:pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          BOTTOM LINE / CTA
          ════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">The Bottom Line</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6">
                Create an Environment That's Biologically Unfavorable to Allergens
              </h2>
              <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
                <p>
                  Mold and allergen reduction is not about a single product or a single cleaning session. It is about creating indoor conditions that are biologically unfavorable for the organisms causing your symptoms.
                </p>
                <p>
                  Environmental controls reduce moisture and stagnation. Physical barriers limit exposure during sleep. Regular cleaning removes accumulated allergen loads. And probiotic purification provides the ongoing biological defense layer that no filter, spray, or encasement can replicate on its own.
                </p>
              </div>
            </ScrollReveal>
          </Suspense>

          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp" delay={0.15}>
              <div className="gradient-cta rounded-2xl p-8 md:p-12 text-center">
                <p className="text-foreground font-medium text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                  EnviroBiotics devices are FDA GRAS certified, EPA registered, and independently tested to reduce dust mite allergens, mold spores, pet dander, and harmful bacteria continuously. Safe for every member of your household.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="hero" size="lg">
                    <Link to="/shop">
                      <ShoppingBag className="w-5 h-5" />
                      Explore EnviroBiotics Devices
                    </Link>
                  </Button>
                  <Button asChild variant="hero-outline" size="lg">
                    <Link to="/probiotic-air-purification">
                      How Probiotic Air Purification Works
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                  <Link to="/proof-and-trust" className="text-sm text-primary-text hover:underline font-medium inline-flex items-center gap-1">
                    Read the independent studies & certifications <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </Suspense>

          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-xs text-muted-foreground text-center mt-8 max-w-2xl mx-auto leading-relaxed">
                All EnviroBiotics probiotic strains are FDA GRAS certified, EPA registered, and MADE SAFE certified. Independent lab testing conducted by Indoor Biotechnologies. Results may vary based on space size, environmental conditions, and continuous device operation.
              </p>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* Related Topics */}
      <section className="py-12 md:py-16">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <RelatedTopics currentPath="/mold-and-allergens" />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default MoldAndAllergensPage;
