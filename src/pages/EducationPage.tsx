import { lazy, Suspense } from "react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/ui/section-label";
import { BookOpen, Shield, Microscope, FlaskConical, ArrowRight, Beaker, Bug, PawPrint, Wind, Scale, FileText, Building2, Award, MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const ScrollReveal = lazy(() => import("@/components/ui/scroll-reveal").then(m => ({ default: m.ScrollReveal })));
const ContentProductCTA = lazy(() => import("@/components/ContentProductCTA").then(m => ({ default: m.ContentProductCTA })));
const RelatedTopics = lazy(() => import("@/components/RelatedTopics").then(m => ({ default: m.RelatedTopics })));

interface GuideCardProps {
  title: string;
  description: string;
  bestFor?: string;
  to: string;
  linkText: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

const GuideCard = ({ title, description, bestFor, to, linkText, icon, comingSoon }: GuideCardProps) => {
  const content = (
    <div className="group relative flex flex-col h-full p-6 sm:p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{description}</p>
      {bestFor && (
        <p className="text-xs text-muted-foreground/80 mb-5 italic">Best for: {bestFor}</p>
      )}
      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
        {comingSoon ? "Coming soon" : linkText}
        {!comingSoon && <ArrowRight className="w-4 h-4" />}
      </span>
    </div>
  );

  if (comingSoon) {
    return <div className="opacity-60 cursor-default">{content}</div>;
  }

  return <Link to={to} className="block">{content}</Link>;
};

const faqs = [
  {
    q: "What is the indoor microbiome?",
    a: "The indoor microbiome is the community of microorganisms, including bacteria, fungi, and viruses, that live in your home. A healthy indoor microbiome is diverse and dominated by beneficial organisms. Modern cleaning practices and building design have depleted this diversity, which researchers increasingly connect to rising rates of allergies and immune dysfunction.",
  },
  {
    q: "How is probiotic air purification different from a regular air purifier?",
    a: "A conventional air purifier filters particles that pass through it. A probiotic air purifier disperses beneficial bacteria throughout your space, where they settle on surfaces and actively consume the organic matter that allergens and pathogens depend on. It treats the 80% of indoor contamination that lives on surfaces, not just what floats through the air.",
  },
  {
    q: "Is the science behind probiotic purification established?",
    a: "Yes. The mechanism of competitive exclusion is well established in microbiology. Independent lab testing by Indoor Biotechnologies has shown up to 90% reduction in common allergens after 30 days of continuous probiotic treatment. The Robert Koch Institute in Germany has incorporated probiotic surface treatment into its official hospital hygiene guidelines.",
  },
  {
    q: "Who is the EnviroBiotics Science Team?",
    a: "EnviroBiotics research draws on over a decade of work in environmental probiotics, originally developed under the BetterAir brand and now expanded for consumer and commercial applications. Our strains have been assessed for safety by independent toxicologists, the EPA, and the FDA.",
  },
  {
    q: "Where should I start if I am new to this topic?",
    a: "Start with the guide to probiotic air purification for a broad overview, then move to the mold and allergen reduction guide if you have a specific health concern. The How It Works page covers the biology in more detail for those who want to understand the mechanism before purchasing.",
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
      name: "Indoor Air Quality Education Center | EnviroBiotics",
      description: "Learn the science of indoor air quality, the indoor microbiome, allergen reduction, and probiotic purification. Guides, research, and resources from the EnviroBiotics Science Team.",
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

const EducationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Indoor Air Quality Education Center | EnviroBiotics"
        description="Learn the science of indoor air quality, the indoor microbiome, allergen reduction, and probiotic purification. Guides, research, and resources from the EnviroBiotics Science Team."
        path="/education"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute top-20 right-10 w-72 md:w-[500px] h-72 md:h-[500px] bg-primary/6 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 md:w-96 h-60 md:h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

          <div className="container max-w-4xl px-5 sm:px-6 relative z-10">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <SectionLabel className="mb-5">Education Center</SectionLabel>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-6 text-balance">
                  Indoor Air Quality &{" "}
                  <span className="text-gradient-primary">Probiotic Science</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Most people spend over 90% of their time indoors. Yet indoor air can be two to five times more polluted than outdoor air. The science of indoor environmental health is evolving fast. This center brings together everything we know about allergen biology, the indoor microbiome, and probiotic purification.
                </p>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── Start Here ── */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-5xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold">Start Here: The Foundations</h2>
                </div>
                <p className="text-muted-foreground mb-10 max-w-2xl">
                  These three guides cover the core science and give you the clearest picture of how indoor air quality actually works and what you can do about it.
                </p>
              </ScrollReveal>
            </Suspense>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <GuideCard
                icon={<BookOpen className="w-5 h-5" />}
                title="What Is Probiotic Air Purification?"
                description="The complete guide to how probiotic purifiers work, what they eliminate, how they compare to HEPA filtration, and what the independent research says."
                bestFor="Anyone new to probiotic purification or comparing it to conventional air purifiers."
                to="/probiotic-air-purification"
                linkText="Read the guide"
              />
              <GuideCard
                icon={<Bug className="w-5 h-5" />}
                title="How to Reduce Mold and Allergens Naturally"
                description="A practical, science-backed guide to reducing dust mites, mold spores, pet dander, and indoor pathogens. Covers environmental strategies and biological approaches."
                bestFor="Allergy and asthma sufferers, pet owners, and anyone dealing with recurring mold."
                to="/mold-and-allergens"
                linkText="Read the guide"
              />
              <GuideCard
                icon={<Microscope className="w-5 h-5" />}
                title="How EnviroBiotics Works"
                description="A detailed explanation of the competitive exclusion mechanism, the Bacillus strains used, how surface settlement works, and why continuous dispersal outperforms periodic treatment."
                bestFor="Anyone who wants to understand the biology before making a purchase decision."
                to="/how-it-works"
                linkText="Read the guide"
              />
            </div>
          </div>
        </section>

        {/* ── Indoor Microbiome ── */}
        <section className="py-16 md:py-24">
          <div className="container max-w-5xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold">The Science of the Indoor Microbiome</h2>
                </div>
                <p className="text-muted-foreground mb-10 max-w-2xl">
                  The indoor microbiome is one of the most important and least understood aspects of home health. These guides cover what it is, why it matters, and how modern living has disrupted it.
                </p>
              </ScrollReveal>
            </Suspense>

            <div className="grid sm:grid-cols-2 gap-6">
              <GuideCard
                icon={<FlaskConical className="w-5 h-5" />}
                title="What Is the Indoor Microbiome?"
                description="Your home has its own microbial ecosystem. Modern building practices, chemical cleaning habits, and reduced contact with nature have depleted it in ways that correlate with rising rates of allergies, asthma, and inflammatory disease."
                to="/education"
                linkText="Coming soon"
                comingSoon
              />
              <GuideCard
                icon={<Shield className="w-5 h-5" />}
                title="The Hygiene Hypothesis Explained"
                description="The hygiene hypothesis proposes that reduced exposure to beneficial environmental microbes is disrupting immune system development. Here is what the research actually says and what it means for how you manage your home."
                to="/education"
                linkText="Coming soon"
                comingSoon
              />
            </div>
          </div>
        </section>

        {/* ── Allergens & Health ── */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-5xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold">Allergens and Health</h2>
                </div>
              </ScrollReveal>
            </Suspense>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <GuideCard
                icon={<Bug className="w-5 h-5" />}
                title="Dust Mite Allergens"
                description="Dust mite waste proteins are among the most common triggers for indoor allergies and asthma. This guide covers the biology, why conventional approaches fall short, and what independent testing shows about probiotic reduction of Der p1 and Der f1."
                to="/education"
                linkText="Coming soon"
                comingSoon
              />
              <GuideCard
                icon={<Wind className="w-5 h-5" />}
                title="Mold Indoors"
                description="Mold grows inside walls, beneath flooring, inside HVAC systems, and in dozens of hidden locations that cleaning products cannot reach. This guide covers mold biology, conditions that allow it to thrive, and effective prevention strategies."
                to="/education"
                linkText="Coming soon"
                comingSoon
              />
              <GuideCard
                icon={<PawPrint className="w-5 h-5" />}
                title="Pet Dander"
                description="Fel d1 and Can f1 are two of the stickiest, most persistent indoor allergens. They cling to surfaces for months. This guide explains why conventional approaches provide limited relief and how enzymatic probiotic degradation addresses pet allergens at the molecular level."
                to="/education"
                linkText="Coming soon"
                comingSoon
              />
            </div>
          </div>
        </section>

        {/* ── Probiotic Purification Science ── */}
        <section className="py-16 md:py-24">
          <div className="container max-w-5xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold">Probiotic Purification Science</h2>
                </div>
              </ScrollReveal>
            </Suspense>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <GuideCard
                icon={<Beaker className="w-5 h-5" />}
                title="The Science of Competitive Exclusion"
                description="Competitive exclusion is the core mechanism behind probiotic purification. Learn how beneficial Bacillus strains compete with harmful organisms for resources and space, and what the peer-reviewed research says."
                to="/education"
                linkText="Coming soon"
                comingSoon
              />
              <GuideCard
                icon={<Award className="w-5 h-5" />}
                title="Understanding FDA GRAS Certification"
                description="GRAS is the FDA's highest safety designation for microorganisms. This guide explains what it means, how it is evaluated, and why it is the key safety standard to look for in any probiotic air purification product."
                to="/education"
                linkText="Coming soon"
                comingSoon
              />
              <GuideCard
                icon={<Scale className="w-5 h-5" />}
                title="Probiotic vs. Chemical Disinfection"
                description="A comparison of long-term outcomes between probiotic surface treatment and conventional chemical disinfection, drawing on hospital hygiene research including the Robert Koch Institute guidelines."
                to="/education"
                linkText="Coming soon"
                comingSoon
              />
            </div>
          </div>
        </section>

        {/* ── Comparisons ── */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-5xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold">Comparisons</h2>
                </div>
                <p className="text-muted-foreground mb-10 max-w-2xl">
                  Designed for people actively evaluating air purification options who want an honest, science-based comparison.
                </p>
              </ScrollReveal>
            </Suspense>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <GuideCard
                icon={<Scale className="w-5 h-5" />}
                title="EnviroBiotics vs. HEPA Air Purifiers"
                description="How probiotic purification and HEPA filtration differ, where each performs best, and why combining both provides the most comprehensive indoor air quality solution."
                to="/compare/hepa"
                linkText="Read the comparison"
              />
              <GuideCard
                icon={<Scale className="w-5 h-5" />}
                title="EnviroBiotics vs. UV-C Purifiers"
                description="UV-C light kills organisms that pass through it but has no effect on surface contamination. This guide compares the two technologies across the most important performance dimensions."
                to="/compare/uvc"
                linkText="Read the comparison"
              />
              <GuideCard
                icon={<Scale className="w-5 h-5" />}
                title="EnviroBiotics vs. Chemical Fresheners"
                description="Chemical fresheners mask odors and provide one-time antimicrobial action. Probiotic purification eliminates the source of both odors and contamination continuously."
                to="/compare/chemical-fresheners"
                linkText="Read the comparison"
              />
            </div>
          </div>
        </section>

        {/* ── Proof & Research ── */}
        <section className="py-16 md:py-24">
          <div className="container max-w-5xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold">Proof and Research</h2>
                </div>
              </ScrollReveal>
            </Suspense>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <GuideCard
                icon={<FileText className="w-5 h-5" />}
                title="Independent Studies and Lab Results"
                description="The research behind EnviroBiotics, including the Indoor Biotechnologies study showing up to 90% allergen reduction, toxicological safety assessments, and third-party performance testing."
                to="/research"
                linkText="Read the research"
              />
              <GuideCard
                icon={<Award className="w-5 h-5" />}
                title="Certifications Explained"
                description="What FDA GRAS, EPA registration, MADE SAFE certification, and Allergy UK endorsement actually mean, how each is evaluated, and why they matter."
                to="/proof-and-trust"
                linkText="Read the guide"
              />
              <GuideCard
                icon={<Building2 className="w-5 h-5" />}
                title="Case Studies"
                description="Real outcomes from households, offices, HVAC facilities, and healthcare environments that have used EnviroBiotics technology."
                to="/case-studies"
                linkText="Read the case studies"
              />
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-3xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold">Frequently Asked Questions</h2>
                </div>
              </ScrollReveal>
            </Suspense>

            <Accordion type="single" collapsible className="mt-8 space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border/50 rounded-xl px-5 sm:px-6 bg-card data-[state=open]:border-primary/30 transition-colors">
                  <AccordionTrigger className="text-left font-display font-semibold text-sm sm:text-base py-5 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl px-5 sm:px-6">
            <Suspense fallback={null}>
              <ScrollReveal>
                <div className="gradient-cta rounded-3xl p-8 sm:p-10 md:p-14 text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 text-balance">
                    Stay Informed
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm sm:text-base">
                    New guides, research summaries, and product updates are added regularly. If you have a question that is not answered here, visit the FAQ or contact the EnviroBiotics support team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/shop"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
                    >
                      Explore EnviroBiotics Devices
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/research"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border rounded-xl font-medium hover:bg-muted transition-colors text-sm sm:text-base"
                    >
                      Read Independent Research
                    </Link>
                  </div>
                  <Link to="/contact" className="inline-block mt-5 text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4">
                    Contact us with questions
                  </Link>
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── Product CTA ── */}
        <section className="container max-w-4xl px-5 sm:px-6 pb-8">
          <Suspense fallback={null}>
            <ContentProductCTA
              headline="Science-backed purification for your home."
              subtitle="Explore the devices that deliver these research-proven results."
            />
          </Suspense>
        </section>

        {/* ── Disclaimer ── */}
        <div className="container max-w-4xl px-5 sm:px-6 pb-12">
          <p className="text-xs text-muted-foreground/60 leading-relaxed text-center">
            Content in the EnviroBiotics Education Center is written and reviewed by the EnviroBiotics Science Team. All claims are supported by independent laboratory research or peer-reviewed scientific literature. All EnviroBiotics probiotic strains are FDA GRAS certified, EPA registered, and MADE SAFE certified. Independent lab testing conducted by Indoor Biotechnologies. Results may vary based on space size, environmental conditions, and continuous device operation. Last updated April 2025.
          </p>
        </div>

        <Suspense fallback={null}>
          <div className="container max-w-4xl px-5 sm:px-6 pb-8">
            <RelatedTopics currentPath="/education" />
          </div>
        </Suspense>
      </main>

      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
};

export default EducationPage;
