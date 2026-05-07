import { lazy, Suspense } from "react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "@/lib/link";
import { SectionLabel } from "@/components/ui/section-label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Shield, Microscope, Sparkles, Award, ShoppingBag,
  Check, SprayCan, Grid2X2, Leaf, RefreshCw,
  Heart, PawPrint, Baby, Droplets, FlaskConical, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const RelatedTopics = lazy(() => import("@/components/RelatedTopics").then(m => ({ default: m.RelatedTopics })));

/* ─── JSON-LD schema ─────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "What Is Probiotic Air Purification? The Complete Guide (2025)",
      description:
        "Discover how probiotic air purifiers work differently from HEPA filters, using beneficial Bacillus bacteria to clean air and surfaces 24/7. FDA GRAS certified.",
      author: { "@type": "Organization", name: "EnviroBiotics" },
      publisher: { "@type": "Organization", name: "EnviroBiotics", url: "https://envirobiotics.com" },
      url: "https://envirobiotics.com/probiotic-air-purification",
      datePublished: "2024-01-01",
      dateModified: "2025-04-01",
    },
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Probiotic Air Purification", url: "/probiotic-air-purification" },
    ]),
    {
      "@type": "HowTo",
      name: "How Probiotic Air Purification Works: Step by Step",
      step: [
        { "@type": "HowToStep", position: 1, name: "Continuous Dispersal", text: "An EnviroBiotics probiotic purifier runs continuously, releasing a fine mist of beneficial Bacillus spores into the air of your room." },
        { "@type": "HowToStep", position: 2, name: "Surface Settlement", text: "Probiotic spores settle on every surface the air touches, including floors, furniture, bedding, walls, countertops, and the interior surfaces of your HVAC system." },
        { "@type": "HowToStep", position: 3, name: "Competitive Exclusion in Action", text: "The Bacillus probiotics activate and begin consuming organic matter, outcompeting mold spores, dust mite allergens, and pet dander proteins." },
        { "@type": "HowToStep", position: 4, name: "Self-Replenishment", text: "Because the device continues running, the probiotic layer is constantly replenished. New contamination encounters an active biological defense rather than an empty surface." },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Can I use a probiotic air purifier alongside my existing HEPA filter?", acceptedAnswer: { "@type": "Answer", text: "Yes, and in fact this combination is ideal. HEPA filtration handles airborne particles and smoke effectively while probiotic purification handles surface contamination. They address different problems and work well together." } },
        { "@type": "Question", name: "How long does it take to see results?", acceptedAnswer: { "@type": "Answer", text: "Independent testing shows measurable allergen reduction within 30 days of continuous use. Many users report noticeable improvements in odors and allergy symptoms within the first two weeks." } },
        { "@type": "Question", name: "Is it safe to run continuously while I sleep?", acceptedAnswer: { "@type": "Answer", text: "Yes. The devices produce no ozone, no disruptive light, and operate at whisper-quiet noise levels. The BioLogic Mini includes a Nighttime Mode that disables all indicator lights for uninterrupted sleep." } },
        { "@type": "Question", name: "Do probiotics spread to food or surfaces where I prepare food?", acceptedAnswer: { "@type": "Answer", text: "The Bacillus strains used are FDA GRAS certified, which is the same classification as bacteria used in food production. They are not food contaminants and pose no safety concern in kitchen environments." } },
        { "@type": "Question", name: "How is this different from air fresheners or ionizers?", acceptedAnswer: { "@type": "Answer", text: "Air fresheners mask odors with chemical fragrance and introduce VOCs into your air. Ionizers use electrical charge to clump particles but do not address surface contamination. Probiotic purifiers address the biological root cause of odors and allergens rather than masking or moving them." } },
        { "@type": "Question", name: "What happens when I stop using the device?", acceptedAnswer: { "@type": "Answer", text: "The probiotic layer gradually diminishes over 3 to 5 days without replenishment, as the beneficial bacteria do not permanently colonize surfaces. For continuous protection, the device should run regularly." } },
        { "@type": "Question", name: "Are the devices noisy?", acceptedAnswer: { "@type": "Answer", text: "EnviroBiotics devices operate at whisper-quiet levels, significantly quieter than most HEPA units at comparable coverage areas." } },
      ],
    },
  ],
};

/* ─── 4-step mechanism ──────────────────────────────────── */
const steps = [
  {
    icon: SprayCan,
    num: "01",
    title: "Continuous Dispersal",
    text: "An EnviroBiotics probiotic purifier runs continuously, releasing a fine mist of beneficial Bacillus spores into the air of your room. These spores are microscopic, invisible and odorless, and they stay suspended in the air just long enough to travel throughout the space.",
  },
  {
    icon: Grid2X2,
    num: "02",
    title: "Surface Settlement",
    text: "Unlike particles captured by a HEPA filter, probiotic spores are designed to land. They settle on every surface the air touches: floors, furniture, bedding, walls, countertops, and the interior surfaces of your HVAC system. The treatment goes where the contamination actually is.",
  },
  {
    icon: Sparkles,
    num: "03",
    title: "Competitive Exclusion",
    text: "Once settled, the Bacillus probiotics activate and begin consuming organic matter. Mold spores that land on a surface find no available food source. Dust mite allergens are broken down at the molecular level. Pet dander proteins are consumed before they can accumulate.",
  },
  {
    icon: RefreshCw,
    num: "04",
    title: "Self-Replenishment",
    text: "Because the device continues running, the probiotic layer is constantly replenished. New contamination entering the space encounters an active biological defense rather than an empty surface. Protection is continuous, not episodic.",
  },
];

/* ─── Contaminants ──────────────────────────────────────── */
const contaminants = [
  { title: "Dust mite allergens", text: "Dust mite waste proteins (Der p1 and Der f1) are among the most common indoor allergy triggers. Probiotics consume the organic debris dust mites feed on. In a study by Indoor Biotechnologies, allergen levels dropped by up to 90% after 30 days of continuous probiotic treatment." },
  { title: "Mold spores", text: "Mold requires organic matter to germinate and grow. By depleting that food source on surfaces, probiotics help prevent mold from taking hold, including in hidden areas like inside walls, beneath carpets, and in HVAC systems." },
  { title: "Pet dander proteins", text: "Pet allergens such as Fel d1 from cats and Can f1 from dogs are protein-based and are directly degraded by probiotic enzymatic activity." },
  { title: "Odor-causing bacteria", text: "Indoor odors are caused by the metabolic byproducts of bacteria breaking down organic waste. Probiotics displace those bacteria and consume the waste before the odor cycle begins." },
  { title: "Harmful airborne bacteria", text: "Competitive exclusion reduces the overall load of pathogenic microorganisms on surfaces, limiting the reservoir that continually re-seeds your air." },
];

/* ─── Comparison table ──────────────────────────────────── */
const comparisonData = [
  { header: "What it treats", hepa: "Airborne particles only", probiotic: "Air and all surfaces" },
  { header: "How it works", hepa: "Passive filtration: traps particles as they pass through", probiotic: "Active biological defense: treats surfaces continuously" },
  { header: "Where allergens live", hepa: "Only captures what floats through the filter", probiotic: "Reaches the 80% of allergens living on surfaces" },
  { header: "Mold prevention", hepa: "No effect on mold growing on surfaces", probiotic: "Deprives mold of food source and helps prevent growth" },
  { header: "Chemical residues", hepa: "None", probiotic: "None" },
  { header: "Ongoing protection", hepa: "Only while running, no residual effect", probiotic: "Maintains a living protective layer between uses" },
  { header: "Safe for infants & pets", hepa: "Yes", probiotic: "Yes, FDA GRAS certified strains" },
];

/* ─── Who Benefits ──────────────────────────────────────── */
const benefits = [
  { icon: Heart, title: "Allergies & asthma", text: "Surface-based reservoirs continuously re-seed the air with allergens. Probiotic treatment addresses this root cause directly." },
  { icon: PawPrint, title: "Pet owners", text: "A probiotic layer continuously processes dander, tracked-in outdoor microbes, and fur proteins rather than allowing them to accumulate." },
  { icon: Droplets, title: "Mold-prone environments", text: "Probiotic treatment deprives mold spores of the surface nutrition they need to germinate, creating a proactive prevention layer." },
  { icon: Baby, title: "Parents of young children", text: "Infants and toddlers spend a disproportionate amount of time on floors and surfaces. Reducing the biological load directly reduces their exposure." },
  { icon: Leaf, title: "Chemical-free households", text: "Probiotic purification replaces chemical disinfectants with a biological approach that achieves better long-term results without VOCs or harsh residues." },
];

/* ─── How to Choose checklist ───────────────────────────── */
const chooseChecklist = [
  "FDA GRAS certified strains: this is non-negotiable. The specific Bacillus strains used must carry this certification.",
  "EPA registration: confirms the product has been assessed for indoor environmental safety.",
  "Independent lab testing: look for published or verifiable third-party test data, not just marketing claims.",
  "Coverage area matching your space: probiotic purifiers are rated by square footage.",
  "Continuous operation design: effective probiotic purification requires continuous low-level dispersal, not periodic bursts.",
  "Refill availability and subscription options: confirm refills are readily available before purchasing.",
];

/* ─── FAQ ────────────────────────────────────────────────── */
const faqs = [
  { q: "Can I use a probiotic air purifier alongside my existing HEPA filter?", a: "Yes, and in fact this combination is ideal. HEPA filtration handles airborne particles and smoke effectively while probiotic purification handles surface contamination. They address different problems and work well together." },
  { q: "How long does it take to see results?", a: "Independent testing shows measurable allergen reduction within 30 days of continuous use. Many users report noticeable improvements in odors and allergy symptoms within the first two weeks." },
  { q: "Is it safe to run continuously while I sleep?", a: "Yes. The devices produce no ozone, no disruptive light, and operate at whisper-quiet noise levels. The BioLogic Mini includes a Nighttime Mode that disables all indicator lights for uninterrupted sleep." },
  { q: "Do probiotics spread to food or surfaces where I prepare food?", a: "The Bacillus strains used are FDA GRAS certified, which is the same classification as bacteria used in food production. They pose no safety concern in kitchen environments." },
  { q: "How is this different from air fresheners or ionizers?", a: "Air fresheners mask odors with chemical fragrance and introduce VOCs. Ionizers clump particles but do not address surface contamination. Probiotic purifiers address the biological root cause of odors and allergens rather than masking or moving them." },
  { q: "What happens when I stop using the device?", a: "The probiotic layer gradually diminishes over 3 to 5 days without replenishment. For continuous protection, the device should run regularly." },
  { q: "Are the devices noisy?", a: "EnviroBiotics devices operate at whisper-quiet levels, significantly quieter than most HEPA units at comparable coverage areas." },
];

/* ─── Safety certs ──────────────────────────────────────── */
const safetyCerts = [
  { icon: Shield, name: "FDA GRAS Certified", desc: "All Bacillus strains are Generally Recognized As Safe by the U.S. Food and Drug Administration." },
  { icon: Award, name: "EPA Registered", desc: "Assessed and approved for indoor environmental use by the U.S. Environmental Protection Agency." },
  { icon: Leaf, name: "MADE SAFE Certified", desc: "Independently verified to contain no known toxic chemicals, carcinogens, or endocrine disruptors." },
  { icon: Heart, name: "Endorsed by Allergy UK", desc: "Recognized by the UK's leading allergy charity as safe and effective for allergy-affected households." },
];

/* ─── Science items ─────────────────────────────────────── */
const scienceItems = [
  { title: "The 90% allergen reduction study", text: "In a controlled study conducted by Indoor Biotechnologies, a probiotic purification system using Bacillus strains achieved up to 90% reduction in common indoor allergen concentrations after 30 days of continuous use." },
  { title: "The indoor microbiome connection", text: "Research shows modern indoor environments have become microbially depleted, stripped of the diverse microbial communities that humans co-evolved with. This depletion correlates with rising rates of allergies and autoimmune conditions. Probiotic purification works by restoring that balance." },
  { title: "The hygiene hypothesis in practice", text: "The \"old friends hypothesis\" proposes that insufficient exposure to beneficial environmental microbes disrupts immune system development. Probiotic indoor environments may help recalibrate immune responses, particularly for allergy-prone individuals." },
  { title: "Hospital validation", text: "The Robert Koch Institute, Germany's federal public health agency, has incorporated probiotic cleaning protocols into its official hospital hygiene guidelines, citing evidence that probiotic surface treatment reduces pathogen recolonization." },
];

/* ─── Page ───────────────────────────────────────────────── */
const ProbioticAirPurificationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="What Is Probiotic Air Purification? The Complete Guide (2025)"
        description="Discover how probiotic air purifiers work differently from HEPA filters, using beneficial Bacillus bacteria to clean air and surfaces 24/7. FDA GRAS certified. Learn more."
        path="/probiotic-air-purification"
        keywords="probiotic air purifier, probiotic air purification, indoor microbiome, what is probiotic air purification, chemical-free air purifier, probiotic indoor air quality, EnviroBiotics, BetterAir"
        jsonLd={jsonLd}
      />

      <Navbar />

      {/* ════════════════════════════════════════════════════
          HERO — Full-width cinematic intro
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Ambient blurs */}
        <div className="absolute top-20 right-10 w-72 md:w-[500px] h-72 md:h-[500px] bg-primary/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-60 md:w-96 h-60 md:h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-5 md:mb-6">The Complete Guide</SectionLabel>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] mb-6 text-balance">
                What Is{" "}
                <span className="text-gradient-primary">Probiotic Air Purification</span>?
              </h1>

              <p className="text-sm text-muted-foreground mb-10">
                By EnviroBiotics Science Team · Last updated April 2025
              </p>
            </ScrollReveal>
          </Suspense>

          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp" delay={0.15}>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                <p>
                  Your air purifier is running right now. The fan is humming, the filter is trapping dust particles as they float past, and the little indicator light is telling you everything is fine.
                </p>
                <p>
                  But here is what it is not telling you: up to 80% of the allergens, mold spores, pet dander, and bacteria in your home are not floating in the air at all. They are living on your surfaces, on your couch, in your carpet, on your bedding, inside the hidden crevices behind your baseboards.
                </p>
                <p className="text-xl md:text-2xl font-display text-foreground">
                  Your HEPA filter will never touch them.
                </p>
                <p>
                  That is the problem probiotic air purification was designed to solve. Instead of waiting for contaminants to float into a filter, a probiotic purifier continuously sends beneficial microorganisms out into your environment, where they settle on every surface, consume the organic matter that harmful organisms need to survive, and maintain a living protective layer around the clock.
                </p>
                <p>
                  This guide explains exactly how it works, what the science says, and how probiotic purification compares to the conventional air purifiers you already know.
                </p>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          WHAT IS — Definition section
          ════════════════════════════════════════════════════ */}
      <section className="section-padding gradient-section-reverse">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <h2 className="text-2xl md:text-4xl font-display mb-8">
                What Is a Probiotic Air Purifier?
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <div className="space-y-5 text-muted-foreground leading-relaxed max-w-3xl">
                <p>
                  A probiotic air purifier is a device that disperses beneficial Bacillus bacteria into your indoor space. These are the same class of naturally occurring microorganisms found in healthy outdoor environments. They settle on surfaces throughout the room and establish a continuous, self-replenishing biological defense layer.
                </p>
                <p>
                  The term "probiotic" here works the same way it does in gut health. Just as probiotic supplements introduce beneficial bacteria to your digestive system to crowd out harmful microbes, a probiotic air purifier introduces beneficial bacteria to your indoor environment to suppress harmful ones.
                </p>
              </div>
            </ScrollReveal>

            {/* Highlight block */}
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="mt-8 bg-card border-l-4 border-primary rounded-r-2xl px-6 md:px-8 py-6 shadow-sm max-w-3xl">
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Key Mechanism</p>
                <p className="text-foreground font-medium leading-relaxed">
                  <strong>Competitive exclusion:</strong> Beneficial Bacillus strains compete with pathogenic organisms for resources and space, consuming the organic matter that harmful bacteria and allergens need to survive. Without that food source, the harmful organisms cannot thrive.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.25}>
              <p className="text-muted-foreground leading-relaxed mt-6 max-w-3xl">
                The result is an indoor environment that is biologically balanced, one that more closely resembles the healthy outdoor microbiome that human immune systems evolved alongside for millions of years.
              </p>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          HOW IT WORKS — 4 Steps
          ════════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container px-5 md:px-6 max-w-5xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-4">The Process</SectionLabel>
              <h2 className="text-2xl md:text-4xl font-display mb-12 max-w-2xl">
                How Probiotic Air Purification Works
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {steps.map(({ icon: Icon, num, title, text }, i) => (
                <ScrollReveal key={title} variant="fadeUp" delay={i * 0.1}>
                  <div className="relative group h-full">
                    {/* Number watermark */}
                    <span className="absolute -top-2 -left-1 text-[5rem] font-display text-primary/[0.06] leading-none select-none pointer-events-none">
                      {num}
                    </span>
                    <div className="card-premium p-6 md:p-8 h-full relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-display text-foreground">{title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          WHAT IT ADDRESSES — Contaminants
          ════════════════════════════════════════════════════ */}
      <section className="section-padding gradient-section">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <h2 className="text-2xl md:text-4xl font-display mb-3">
                What Does Probiotic Air Purification Address?
              </h2>
              <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                EnviroBiotics probiotic technology has been independently tested and shown to reduce the following contaminants.
              </p>
            </ScrollReveal>

            <div className="space-y-4">
              {contaminants.map(({ title, text }, i) => (
                <ScrollReveal key={title} variant="fadeUp" delay={i * 0.08}>
                  <div className="flex items-start gap-4 p-5 md:p-6 bg-card rounded-2xl border border-border/60 hover:border-primary/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                    <div>
                      <h3 className="font-display text-foreground mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          COMPARISON TABLE — HEPA vs Probiotic
          ════════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <SectionLabel className="mb-4">Side by Side</SectionLabel>
              <h2 className="text-2xl md:text-4xl font-display mb-3">
                Probiotic vs. HEPA: Key Differences
              </h2>
              <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                Understanding probiotic purification is easiest when compared directly to the technology most people are already familiar with.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.1}>
              <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/60">
                      <th className="text-left px-4 md:px-6 py-4 font-display text-foreground w-[28%]"></th>
                      <th className="text-left px-4 md:px-6 py-4 font-display text-muted-foreground">HEPA Air Purifier</th>
                      <th className="text-left px-4 md:px-6 py-4 font-display text-primary">Probiotic Air Purifier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={row.header} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                        <td className="px-4 md:px-6 py-4 text-foreground font-medium">{row.header}</td>
                        <td className="px-4 md:px-6 py-4 text-muted-foreground">{row.hepa}</td>
                        <td className="px-4 md:px-6 py-4 text-foreground bg-primary/[0.04] font-medium">{row.probiotic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.15}>
              <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed max-w-3xl">
                <p>
                  The critical distinction: a HEPA filter is a <strong className="text-foreground">passive defense</strong>. It waits for particles to float through it. A probiotic purifier is an <strong className="text-foreground">active defense</strong>. It sends microorganisms out to where contamination actually lives and addresses it at the source.
                </p>
                <p>
                  This does not mean HEPA filters have no value. For smoke, wildfire particles, and PM2.5, HEPA filtration is highly effective. But for allergens, mold, odors, and biological contamination, probiotic purification addresses the root cause rather than filtering symptoms.
                </p>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SAFETY — Certifications
          ════════════════════════════════════════════════════ */}
      <section className="section-padding gradient-section-reverse">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <h2 className="text-2xl md:text-4xl font-display mb-3">
                Is Probiotic Air Purification Safe?
              </h2>
              <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                EnviroBiotics uses exclusively FDA GRAS (Generally Recognized As Safe) certified Bacillus strains, the same classification used for probiotic bacteria in yogurt, kombucha, and dietary supplements.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              {safetyCerts.map(({ icon: Icon, name, desc }, i) => (
                <ScrollReveal key={name} variant="fadeUp" delay={i * 0.08}>
                  <div className="card-premium p-5 md:p-6 flex gap-4 items-start h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-foreground mb-1">{name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal variant="fadeUp" delay={0.35}>
              <p className="text-muted-foreground leading-relaxed mt-8 max-w-3xl">
                The devices produce no ozone, no VOCs, and no chemical residues. They are safe for use around infants, children, pregnant women, elderly individuals, and pets. Independent toxicological modeling has confirmed the microorganisms are at biosafety level 1, the highest safety classification.
              </p>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SCIENCE — Research evidence
          ════════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FlaskConical className="w-5 h-5 text-primary" />
                </div>
                <SectionLabel>Peer-Reviewed Evidence</SectionLabel>
              </div>
              <h2 className="text-2xl md:text-4xl font-display mb-10">
                What the Science Says
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {scienceItems.map(({ title, text }, i) => (
                <ScrollReveal key={title} variant="fadeUp" delay={i * 0.08}>
                  <div className="p-5 md:p-6 bg-card rounded-2xl border border-border/60 h-full">
                    <h3 className="font-display text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal variant="fadeUp" delay={0.35}>
              <p className="text-sm text-muted-foreground mt-6">
                Read the full body of evidence on our{" "}
                <Link to="/research" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">Research page</Link>.
              </p>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          WHO BENEFITS — Audience segments
          ════════════════════════════════════════════════════ */}
      <section className="section-padding gradient-section">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <h2 className="text-2xl md:text-4xl font-display mb-10">
                Who Benefits Most?
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {benefits.map(({ icon: Icon, title, text }, i) => (
                <ScrollReveal key={title} variant="fadeUp" delay={i * 0.08}>
                  <div className="card-premium p-5 md:p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-4 italic">
              Not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          HOW TO CHOOSE — Checklist
          ════════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <h2 className="text-2xl md:text-4xl font-display mb-3">
                How to Choose a Probiotic Air Purifier
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Not all products marketed as "probiotic purifiers" are equal. When evaluating options, look for the following.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.1}>
              <ul className="space-y-4 max-w-3xl">
                {chooseChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-muted-foreground leading-relaxed mt-8 max-w-3xl">
                EnviroBiotics offers three devices covering spaces from 300 sq ft (<Link to="/product/biologic-mini" className="text-primary underline underline-offset-2">BioLogic Mini</Link>) to 800 sq ft (<Link to="/product/biotica-800" className="text-primary underline underline-offset-2">Biotica 800</Link>), as well as the <Link to="/product/ebiotic-pro" className="text-primary underline underline-offset-2">E-Biotic Pro</Link> for whole-home HVAC integration.
              </p>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FAQ — Accordion
          ════════════════════════════════════════════════════ */}
      <section className="section-padding gradient-section-reverse">
        <div className="container px-5 md:px-6 max-w-3xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <h2 className="text-2xl md:text-4xl font-display mb-8">
                Frequently Asked Questions
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.1}>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-border/60">
                    <AccordionTrigger className="text-left text-foreground font-medium py-5 text-base">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-5">
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
          BOTTOM LINE + CTA
          ════════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container px-5 md:px-6 max-w-4xl mx-auto">
          <Suspense fallback={null}>
            <ScrollReveal variant="fadeUp">
              <h2 className="text-2xl md:text-4xl font-display mb-6">
                The Bottom Line
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed max-w-3xl mb-12">
                <p>
                  Probiotic air purification represents a genuinely different approach to indoor environmental health. It is not a replacement for mechanical filtration, but a biologically active layer of protection that addresses the 80% of indoor contamination that conventional purifiers leave completely untreated.
                </p>
                <p>
                  For households dealing with allergies, mold sensitivity, pets, or a desire to reduce chemical cleaners, probiotic purification offers results that HEPA filtration alone simply cannot achieve.
                </p>
                <p>
                  EnviroBiotics devices use exclusively FDA GRAS certified, EPA registered Bacillus strains. They are independently tested, MADE SAFE certified, and safe for every member of your household, including the smallest and most vulnerable.
                </p>
              </div>
            </ScrollReveal>

            {/* CTA Card */}
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl gradient-cta border border-primary/15 p-8 md:p-12">
                <div className="absolute top-0 right-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-display text-foreground">Explore EnviroBiotics</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-xl mb-8">
                    Whether you need a portable unit for a single room or whole-home HVAC integration, EnviroBiotics has a solution for your space.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Button variant="hero" size="lg" asChild>
                      <Link to="/shop">
                        Explore Devices
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="border-primary/30 text-primary hover:bg-primary/5">
                      <Link to="/compare/hepa">
                        Compare to HEPA
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="hover:border-primary/30">
                      <Link to="/research">
                        Read the Science
                      </Link>
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-8 max-w-xl">
                    All EnviroBiotics probiotic strains are FDA GRAS certified, EPA registered, and MADE SAFE certified. Independent lab testing conducted by Indoor Biotechnologies. Results may vary based on space size, environmental conditions, and continuous device operation.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* Related Topics */}
      <div className="container px-5 md:px-6 max-w-4xl mx-auto pb-12">
        <Suspense fallback={null}>
          <RelatedTopics currentPath="/probiotic-air-purification" />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ProbioticAirPurificationPage;
