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
  Shield, Heart, Moon, Brain, Sparkles, Baby,
  Leaf, ShoppingBag, ArrowRight, Check,
  Wind, PawPrint, Bug, Droplets, Users,
  Microscope, Activity, Eye,
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
      headline: "Health Benefits of Cleaner Indoor Air | EnviroBiotics",
      description:
        "Poor indoor air quality affects sleep, allergies, asthma, immunity, and long-term health. Learn how probiotic purification addresses the biological root causes.",
      author: { "@type": "Organization", name: "EnviroBiotics" },
      publisher: { "@type": "Organization", name: "EnviroBiotics", url: "https://envirobiotics.com" },
      url: "https://envirobiotics.com/benefits",
      datePublished: "2024-01-01",
      dateModified: "2025-04-01",
    },
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Health Benefits", url: "/benefits" },
    ]),
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Can probiotic air purification help with allergies?", acceptedAnswer: { "@type": "Answer", text: "Yes. Independent lab testing shows up to 90% reduction in common indoor allergen concentrations within 30 days of continuous probiotic treatment." } },
        { "@type": "Question", name: "Does indoor air quality affect sleep?", acceptedAnswer: { "@type": "Answer", text: "Research consistently shows that elevated allergen levels, particulate matter, and VOCs in the bedroom environment disrupt sleep architecture and reduce time in deep sleep stages." } },
        { "@type": "Question", name: "Is probiotic purification safe for children and infants?", acceptedAnswer: { "@type": "Answer", text: "Yes. EnviroBiotics uses FDA GRAS certified Bacillus strains. The devices produce no ozone, no VOCs, and no chemical residues. They are safe for use in nurseries from birth." } },
        { "@type": "Question", name: "How long before health improvements are noticeable?", acceptedAnswer: { "@type": "Answer", text: "Many users report improvements in odor and sleep quality within one to two weeks. Independent testing shows measurable allergen reduction within the first week and up to 90% reduction after 30 days." } },
        { "@type": "Question", name: "Can probiotic purification replace asthma medication?", acceptedAnswer: { "@type": "Answer", text: "No. Probiotic purification reduces the environmental triggers that provoke asthma episodes. It is a complementary environmental intervention, not a medical treatment." } },
        { "@type": "Question", name: "Is the connection between indoor air quality and cognitive health established?", acceptedAnswer: { "@type": "Answer", text: "Yes. Multiple peer-reviewed studies, including research from Harvard University, have found measurable connections between indoor air quality and cognitive performance." } },
      ],
    },
  ],
};

/* ─── Contaminant categories ─────────────────────────────── */
const contaminants = [
  { icon: Bug, title: "Dust mite allergen proteins", text: "Der p1 and Der f1 are waste proteins shed by dust mites living in mattresses, carpets, and soft furnishings. They are among the most potent triggers for allergic rhinitis and asthma in both adults and children." },
  { icon: Droplets, title: "Mold spores & mycotoxins", text: "Airborne mold spores trigger respiratory inflammation in sensitive individuals. Certain mold species also produce mycotoxins, compounds that cause systemic health effects including neurological symptoms, immune suppression, and chronic fatigue." },
  { icon: PawPrint, title: "Pet allergen proteins", text: "Fel d1 (cats) and Can f1 (dogs) are exceptionally small, airborne, and persistent. They remain active on surfaces and in the air for months. For the roughly 10 to 20% of the population with pet allergies, indoor levels directly determine quality of daily life." },
  { icon: Microscope, title: "Indoor pathogens & VOCs", text: "Pathogenic bacteria on surfaces continuously re-seed indoor air. Chemical cleaning products, synthetic fragrances, and off-gassing from furniture add VOC loads that irritate airways and disrupt endocrine function with chronic exposure." },
];

/* ─── Health conditions ──────────────────────────────────── */
const healthConditions = [
  {
    icon: Wind,
    title: "Allergic Rhinitis",
    intro: "Allergic rhinitis, commonly called hay fever, is one of the most widespread chronic conditions globally. While outdoor pollen is the best-known trigger, dust mite allergens and mold spores in the indoor environment are responsible for year-round symptoms in millions of people.",
    body: "Symptoms include nasal congestion, sneezing, itchy eyes, and post-nasal drip. When driven by indoor allergens rather than seasonal pollen, symptoms persist continuously. Reducing indoor allergen loads through probiotic surface treatment is among the most effective long-term interventions available. In the Indoor Biotechnologies study, continuous probiotic treatment reduced common indoor allergen concentrations by up to 90% within 30 days.",
  },
  {
    icon: Activity,
    title: "Asthma",
    intro: "Asthma affects over 25 million Americans. In adults and children with asthma, indoor biological triggers are responsible for a large proportion of exacerbations, hospitalizations, and reduced quality of life.",
    body: "The primary indoor asthma triggers are dust mite allergens, mold spores, pet dander, and cockroach allergen proteins, all surface-based contaminants that circulate into the air through everyday activity. Probiotic purification works on the reservoirs directly: consuming the organic matter that dust mites feed on, depriving mold of germination nutrition, and enzymatically degrading pet allergen proteins on all surfaces.",
  },
  {
    icon: Moon,
    title: "Sleep Quality",
    intro: "Sleep researchers have established a clear connection between indoor air quality and sleep outcomes. Poor air quality, specifically elevated particulate matter, allergen proteins, and VOCs, increases nighttime respiratory resistance and disrupts sleep architecture.",
    body: "Dust mite allergens are particularly relevant because the mattress and pillow are the densest concentration of dust mite habitat in most homes. Nasal congestion and airway inflammation from allergen exposure during sleep reduces time in deep sleep stages and contributes to morning fatigue and impaired concentration. Many users report noticeable improvement in sleep within two to three weeks of continuous use.",
  },
  {
    icon: Shield,
    title: "Immune System Function",
    intro: "The indoor microbiome has a significant and increasingly well-understood relationship with immune system calibration. Research consistently shows that the microbial diversity of the environments we inhabit influences how the immune system develops, responds, and regulates itself.",
    body: "Modern indoor environments, stripped of microbial diversity by chemical cleaning and tight building construction, present an impoverished microbial landscape. Researchers connect this depletion to higher rates of allergic sensitization, autoimmune conditions, and inflammatory disease. Probiotic purification partially restores this diversity by introducing beneficial Bacillus strains that re-populate the indoor environment with safe, health-supporting microorganisms.",
  },
  {
    icon: Brain,
    title: "Cognitive Performance & Mental Clarity",
    intro: "Research published in peer-reviewed environmental health journals has established that indoor air quality affects cognitive function, attention, and mental performance.",
    body: "A landmark study by Harvard University researchers found that workers in environments with lower VOC levels and better ventilation scored significantly higher on cognitive function tests across nine domains. Separately, research published in Nature Communications identified associations between long-term exposure to poor air quality and increased risk of cognitive decline. The mechanism is both direct (inhaled particles affecting brain chemistry) and indirect (disrupted sleep reducing cognitive repair).",
  },
  {
    icon: Eye,
    title: "Skin Health",
    intro: "The skin is a physical interface with the environment and is directly affected by indoor air quality.",
    body: "Dry, irritant-rich indoor air, elevated dust mite allergen concentrations, and VOC exposure are all connected to worsening of eczema and contact dermatitis in sensitive individuals. Dust mite allergen proteins penetrate skin barrier defects and provoke inflammatory responses at the cellular level. Reducing the surface allergen load in a home reduces the ongoing skin exposure that drives chronic eczema.",
  },
];

/* ─── User-reported benefits ─────────────────────────────── */
const userBenefits = [
  "Reduced frequency and severity of nasal congestion, sneezing, and eye irritation, particularly in households with pets or dust mite sensitivity.",
  "Fewer nighttime awakenings, reduced nasal congestion during sleep, and improved morning energy levels.",
  "Fewer inhaler uses and lower frequency of symptom flares, particularly in children with allergies and asthma.",
  "Complete resolution of pet odors, musty smells, and persistent cooking odors, not masking but elimination at the source.",
  "No return of mold in previously affected bathrooms, basements, and HVAC systems after implementing continuous probiotic treatment.",
];

/* ─── Who benefits most ──────────────────────────────────── */
const beneficiaries = [
  { icon: Baby, title: "Children with allergies & asthma", text: "Children are more vulnerable because they breathe more air relative to body weight and spend more time on surfaces where allergens concentrate. Probiotic purification is safe for infants from birth." },
  { icon: Wind, title: "Adults with chronic allergic rhinitis", text: "For people with year-round allergy symptoms driven by indoor triggers, probiotic purification attacks the allergen reservoirs directly rather than simply filtering what passes through the air." },
  { icon: Droplets, title: "People recovering from mold exposure", text: "Individuals rebuilding a healthy living environment benefit from ongoing prevention that ensures mold does not reestablish itself after remediation." },
  { icon: Heart, title: "Elderly individuals", text: "Older adults with reduced immune resilience and greater sensitivity to respiratory irritants benefit from the continuous reduction in pathogen and allergen loads." },
  { icon: Leaf, title: "Anyone committed to a non-toxic home", text: "People who have already eliminated chemical cleaners and synthetic fragrances benefit from a purification approach that achieves better biological outcomes without reintroducing chemical loads." },
];

/* ─── FAQ ────────────────────────────────────────────────── */
const faqs = [
  { q: "Can probiotic air purification help with allergies?", a: "Yes. Independent lab testing shows up to 90% reduction in common indoor allergen concentrations within 30 days of continuous probiotic treatment. Dust mite allergens and pet dander proteins, the most common year-round allergy triggers, are directly reduced through probiotic enzymatic activity on surfaces." },
  { q: "Does indoor air quality affect sleep?", a: "Research consistently shows that elevated allergen levels, particulate matter, and VOCs in the bedroom environment disrupt sleep architecture and reduce time in deep sleep stages. Reducing the biological load in the bedroom is one of the most impactful changes allergy and asthma sufferers can make for sleep quality." },
  { q: "Is probiotic purification safe for children and infants?", a: "Yes. EnviroBiotics uses FDA GRAS certified Bacillus strains, the same safety classification used for bacteria in infant formula and baby food. The devices produce no ozone, no VOCs, and no chemical residues. They are safe for use in nurseries from birth." },
  { q: "How long before health improvements are noticeable?", a: "Many users report improvements in odor and sleep quality within one to two weeks. Independent testing shows measurable allergen reduction within the first week and up to 90% reduction after 30 days of continuous use. Allergy symptom improvement typically follows the allergen reduction curve." },
  { q: "Can probiotic purification replace asthma medication?", a: "No. Probiotic purification reduces the environmental triggers that provoke asthma episodes. It is a complementary environmental intervention, not a medical treatment. Always follow your physician's guidance on asthma management." },
  { q: "Is the connection between indoor air quality and cognitive health established?", a: "Yes. Multiple peer-reviewed studies, including research from Harvard University, have found measurable connections between indoor air quality and cognitive performance. This is an active area of ongoing research." },
];

/* ─── Page ───────────────────────────────────────────────── */
const HealthBenefitsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Health Benefits of Cleaner Indoor Air | EnviroBiotics"
        description="Poor indoor air quality affects sleep, allergies, asthma, immunity, and long-term health. Learn how probiotic purification addresses the biological root causes. Science-backed guide."
        path="/benefits"
        keywords="health benefits of indoor air quality, probiotics for allergies home, indoor air quality health benefits, probiotic purification health, allergy relief home, asthma triggers home, benefits of clean indoor air, EnviroBiotics"
        jsonLd={jsonLd}
      />

      <Navbar />

      {/* ═══════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute top-20 right-10 w-72 md:w-[500px] h-72 md:h-[500px] bg-primary/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-60 md:w-96 h-60 md:h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5 md:mb-6">Science-Backed Guide</SectionLabel>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] mb-6 text-balance">
                The Health Benefits of{" "}
                <span className="text-gradient-primary">Cleaner Indoor Air</span>
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
                  The air inside your home is doing something to your body right now.
                </p>
                <p>
                  If it is carrying elevated levels of dust mite allergens, mold spores, pet dander, or pathogenic bacteria, the effects are not always obvious. They often show up as chronic fatigue you cannot explain, sleep that never quite feels restorative, allergies that never fully resolve, or a persistent low-grade respiratory irritation that you have quietly accepted as normal.
                </p>
                <p>
                  None of those things are normal. And in most cases, they are directly traceable to the biological quality of your indoor environment.
                </p>
                <div className="bg-primary-soft/50 border border-primary/10 rounded-2xl p-5 md:p-6 mt-2">
                  <p className="text-foreground font-medium text-base md:text-lg leading-relaxed">
                    This guide covers the connection between indoor air quality and human health, which conditions are most directly affected, and how continuous probiotic purification addresses the biological root causes that conventional air purifiers leave untouched.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          WHY IAQ MATTERS
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">The Scale of Exposure</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6">
                Why Indoor Air Quality Has Such a Large Impact on Health
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
                <p>
                  The average person spends more than 90% of their time indoors. That means the quality of indoor air is far more relevant to daily health than outdoor air quality, which receives dramatically more public attention and regulatory scrutiny.
                </p>
                <p>
                  The Environmental Protection Agency consistently ranks indoor air pollution among the top five environmental risks to public health. Indoor air can be two to five times more polluted than outdoor air, and in some homes the disparity is far greater.
                </p>
              </div>
            </ScrollReveal>
          </Suspense>

          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <h3 className="text-xl md:text-2xl font-display font-semibold mb-8">
                The biological contaminants most responsible for health impacts
              </h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {contaminants.map((c) => (
                  <div key={c.title} className="group p-5 md:p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <c.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground">{c.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HEALTH CONDITIONS
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">Conditions & Research</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6">
                Health Conditions Most Directly Affected by Indoor Air Quality
              </h2>
            </ScrollReveal>
          </Suspense>

          <div className="space-y-12 mt-10">
            {healthConditions.map((c, i) => (
              <Suspense key={c.title} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.05}>
                  <div className="p-6 md:p-8 rounded-2xl border border-border/50 bg-card">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <c.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground">{c.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">{c.intro}</p>
                    <p className="text-muted-foreground leading-relaxed">{c.body}</p>
                  </div>
                </ScrollReveal>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BEYOND CONVENTIONAL PURIFIERS
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">The Probiotic Difference</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6">
                What Probiotic Purification Adds Beyond Conventional Air Purifiers
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
                <p>
                  A conventional HEPA air purifier addresses the fraction of indoor biological contaminants that become airborne and pass through the filter. That is a meaningful contribution, particularly for smoke, pollen, and PM2.5.
                </p>
                <p>
                  But the health outcomes described above are driven primarily by surface-based contamination: the allergens embedded in mattresses, carpets, and furniture that circulate into the air repeatedly throughout the day. No filter addresses this reservoir.
                </p>
                <p className="text-foreground font-medium">
                  Probiotic purification works where the contamination lives.
                </p>
                <p>
                  EnviroBiotics devices continuously disperse FDA GRAS certified Bacillus probiotics throughout the indoor space. These microorganisms settle on every surface and establish a living protective layer that consumes organic matter, degrades allergen proteins, prevents mold germination, and displaces pathogenic bacteria through competitive exclusion.
                </p>
                <p>
                  The health effects that follow are not from adding something synthetic to the environment. They come from restoring a biological balance that modern indoor environments have lost.
                </p>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          WHAT USERS REPORT
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">Real Outcomes</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-10">
                What Users Report
              </h2>
              <div className="space-y-4">
                {userBenefits.map((b, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          WHO BENEFITS MOST
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">Best For</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-10">
                Who Benefits Most
              </h2>
            </ScrollReveal>
          </Suspense>

          <div className="grid sm:grid-cols-2 gap-5">
            {beneficiaries.map((b, i) => (
              <Suspense key={b.title} fallback={null}>
                <ScrollReveal variant="fadeUp" delay={i * 0.05}>
                  <div className="group p-5 md:p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-all h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <b.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">{b.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                  </div>
                </ScrollReveal>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">Common Questions</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-10">
                Frequently Asked Questions
              </h2>
            </ScrollReveal>
          </Suspense>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/50 rounded-2xl px-5 md:px-6 bg-card data-[state=open]:border-primary/20 transition-colors"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BOTTOM LINE
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5">The Bottom Line</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6">
                Your Indoor Air Is a Health Decision
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
                <p>
                  The quality of your indoor air is not an abstract environmental concern. It has direct, measurable effects on how you sleep, how you breathe, how your immune system functions, how clearly you think, and over the long term, how your health ages.
                </p>
                <p>
                  Conventional air purifiers address one part of the problem. Probiotic purification addresses the part that matters most: the biological contamination living on every surface in your home, continuously recycling into the air you breathe every day.
                </p>
                <p>
                  EnviroBiotics devices are FDA GRAS certified, EPA registered, independently tested, and safe for every member of your household. They are the only home purification technology that works on surfaces, not just the air.
                </p>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <div className="gradient-cta rounded-3xl p-8 md:p-14 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Ready to breathe easier?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-base md:text-lg leading-relaxed">
                  Explore EnviroBiotics devices or learn how the science works before making a decision.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/shop">
                      <ShoppingBag className="w-4 h-4" />
                      Explore Devices
                    </Link>
                  </Button>
                  <Button variant="hero-outline" size="lg" asChild>
                    <Link to="/how-it-works">
                      How It Works
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="hero-outline" size="lg" asChild>
                    <Link to="/research">
                      Read the Research
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          RELATED + DISCLAIMER
          ═══════════════════════════════════════════════════ */}
      <section className="pb-20">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <RelatedTopics currentPath="/benefits" />
          </Suspense>

          <p className="text-xs text-muted-foreground mt-12 leading-relaxed">
            All EnviroBiotics probiotic strains are FDA GRAS certified, EPA registered, and MADE SAFE certified. Independent lab testing conducted by Indoor Biotechnologies. Health information provided for educational purposes. Not intended as medical advice. Consult a qualified healthcare provider for personal health guidance. Last updated April 2025.
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
