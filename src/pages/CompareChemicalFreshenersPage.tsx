import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { RelatedTopics } from "@/components/RelatedTopics";
import { SectionLabel } from "@/components/ui/section-label";
import { Check, X, Leaf, SprayCan, ShoppingBag, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Compare", url: "/compare/envirobiotics-vs-chemical-fresheners" },
      { name: "EnviroBiotics vs Chemical Fresheners", url: "/compare/envirobiotics-vs-chemical-fresheners" },
    ]),
    {
      "@type": "Article",
      headline: "EnviroBiotics vs Chemical Air Fresheners: Natural vs Synthetic",
      description: "Compare probiotic air purification with chemical air fresheners and sprays. Learn why eliminating odor sources is safer and more effective than masking them.",
      author: { "@type": "Organization", name: "EnviroBiotics" },
      publisher: { "@type": "Organization", name: "EnviroBiotics", url: "https://envirobiotics.com" },
      url: "https://envirobiotics.com/compare/envirobiotics-vs-chemical-fresheners",
      datePublished: "2025-03-01",
      dateModified: "2026-03-11",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do air fresheners actually clean the air?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Air fresheners mask odors with synthetic fragrances or attempt to neutralize odor molecules chemically. They do not remove the source of the odor: bacteria, mold, or organic matter on surfaces. EnviroBiotics eliminates odor at the source by outcompeting the organisms that produce it.",
          },
        },
        {
          "@type": "Question",
          name: "Are chemical air fresheners safe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Many chemical air fresheners contain VOCs (volatile organic compounds), phthalates, and synthetic musks that studies have linked to respiratory irritation, hormone disruption, and headaches. The NRDC found that 86% of tested air fresheners contained phthalates. EnviroBiotics uses only FDA GRAS-certified Bacillus probiotics with zero synthetic chemicals.",
          },
        },
        {
          "@type": "Question",
          name: "Can probiotics eliminate pet odors?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Pet odors come from bacteria breaking down organic matter (dander, saliva, urine residue) on surfaces. EnviroBiotics probiotics outcompete these odor-producing bacteria through competitive exclusion, eliminating the odor at its biological source rather than masking it.",
          },
        },
        {
          "@type": "Question",
          name: "How long do chemical air fresheners last vs probiotics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Chemical air fresheners provide temporary masking that fades within hours, requiring repeated application. EnviroBiotics probiotics establish a living layer on surfaces that remains active for days between device cycles, providing continuous odor prevention at the source.",
          },
        },
        {
          "@type": "Question",
          name: "Are EnviroBiotics products safe for people with asthma or chemical sensitivities?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. EnviroBiotics products produce zero VOCs, zero fragrances, and zero chemical emissions. They are MADE SAFE certified and ideal for people with asthma, MCS (Multiple Chemical Sensitivity), or fragrance allergies, populations that often react severely to chemical air fresheners.",
          },
        },
      ],
    },
  ],
};

const comparisonRows = [
  { feature: "Approach", envirobiotics: "Eliminates odor source biologically", chemical: "Masks odor with synthetic fragrance" },
  { feature: "Treats Root Cause", envirobiotics: true, chemical: false },
  { feature: "Chemical Free", envirobiotics: true, chemical: false },
  { feature: "Zero VOCs", envirobiotics: true, chemical: false },
  { feature: "Zero Synthetic Fragrance", envirobiotics: true, chemical: false },
  { feature: "Safe for Asthma / MCS", envirobiotics: true, chemical: false },
  { feature: "Reduces Surface Bacteria", envirobiotics: true, chemical: false },
  { feature: "Continuous Protection", envirobiotics: true, chemical: false },
  { feature: "Safe for Children & Pets", envirobiotics: true, chemical: false },
  { feature: "FDA GRAS Certified", envirobiotics: true, chemical: false },
  { feature: "MADE SAFE Certified", envirobiotics: true, chemical: false },
  { feature: "Addresses Allergens", envirobiotics: true, chemical: false },
];

const Cell = ({ value }: { value: boolean | string }) => {
  if (typeof value === "string") return <span className="text-sm text-foreground">{value}</span>;
  return value ? (
    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
      <Check className="w-4 h-4 text-primary" />
    </div>
  ) : (
    <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
  );
};

const CompareChemicalFreshenersPage = () => {
  return (
    <>
      <SEOHead
        title="EnviroBiotics vs Chemical Air Fresheners | Natural Odor Elimination"
        description="Compare EnviroBiotics probiotic technology with chemical air fresheners. Learn why eliminating odor sources with probiotics is safer and more effective than masking with chemicals."
        path="/compare/envirobiotics-vs-chemical-fresheners"
        keywords="EnviroBiotics vs air fresheners, natural odor removal, chemical free air freshener, VOC free, probiotic odor elimination, air freshener dangers"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="section-padding pt-28 md:pt-36 pb-12 md:pb-16">
          <div className="container max-w-4xl mx-auto px-5">
            <SectionLabel className="mb-4">Technology Comparison</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              EnviroBiotics vs Chemical Air Fresheners:
              <span className="text-gradient-primary block mt-1">Eliminate Odors, Don't Mask Them</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Chemical air fresheners add synthetic fragrance to cover up odors. EnviroBiotics eliminates the organisms that create odors in the first place. Here's why that difference matters for your health.
            </p>
          </div>
        </section>

        {/* The Hidden Cost of Air Fresheners */}
        <section className="section-padding py-12 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">The Hidden Cost of "Fresh" Scented Air</h2>
            <p className="text-muted-foreground mb-4">
              The global air freshener market generates over $12 billion annually by selling a simple idea: spray a fragrance to make your home smell clean. But mounting scientific evidence reveals that chemical air fresheners don't clean anything. They layer synthetic compounds over existing contamination while introducing new health risks.
            </p>
            <p className="text-muted-foreground mb-4">
              A landmark study by the Natural Resources Defense Council (NRDC) found that 86% of tested air fresheners contained phthalates, endocrine-disrupting chemicals not listed on product labels. The EPA classifies many common air freshener ingredients as volatile organic compounds (VOCs) that contribute to indoor air pollution.
            </p>

            <div className="mt-6 p-5 rounded-xl bg-destructive/5 border border-destructive/20">
              <h3 className="font-display font-semibold text-base mb-2 flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" /> What Chemical Air Fresheners May Contain
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Phthalates</strong>: linked to hormone disruption and reproductive issues</li>
                <li>• <strong>Formaldehyde</strong>: a known human carcinogen (IARC Group 1)</li>
                <li>• <strong>Benzene & Toluene</strong>: volatile organic compounds linked to respiratory damage</li>
                <li>• <strong>Synthetic musks</strong>: bioaccumulative compounds found in human blood and breast milk</li>
                <li>• <strong>1,4-Dichlorobenzene</strong>: found in 89% of tested air fresheners (EPA)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How EnviroBiotics Eliminates Odors */}
        <section className="section-padding py-12">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">How EnviroBiotics Eliminates Odors at the Source</h2>
            <p className="text-muted-foreground mb-4">
              Bad odors in your home have a biological origin. They come from bacteria metabolizing organic matter: pet dander, skin cells, food residue, mold, and moisture. As these bacteria feed and multiply, they release volatile sulfur compounds and other malodorous byproducts. Spraying fragrance over these colonies does nothing to stop the process.
            </p>
            <p className="text-muted-foreground mb-4">
              EnviroBiotics uses <Link to="/glossary" className="text-primary hover:underline">competitive exclusion</Link> to address odors biologically. Beneficial Bacillus probiotics are dispersed throughout your home, where they settle on surfaces and consume the same organic nutrients that odor-producing bacteria need. By outcompeting harmful organisms for food, the probiotics reduce their populations, and the odors they produce, at the source.
            </p>
            <p className="text-muted-foreground">
              The result isn't masked odors. It's genuinely cleaner surfaces and the absence of odor-producing organisms. No fragrance, no chemicals, no VOCs: just the natural outcome of a balanced microbial environment.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="section-padding py-12 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">Side-by-Side Comparison</h2>
            <div className="rounded-2xl border border-border overflow-x-auto bg-card">
              <div className="min-w-[520px] grid grid-cols-3 gap-0">
                <div className="p-3 md:p-4 font-semibold text-sm md:text-base text-foreground bg-muted/50 border-b border-border">Feature</div>
                <div className="p-3 md:p-4 font-semibold text-sm md:text-base text-primary text-center bg-primary/5 border-b border-border">EnviroBiotics</div>
                <div className="p-3 md:p-4 font-semibold text-sm md:text-base text-muted-foreground text-center bg-muted/50 border-b border-border">Chemical Fresheners</div>
                {comparisonRows.map((row, i) => (
                  <>
                    <div key={`f-${i}`} className={`p-3 md:p-4 text-xs md:text-sm font-medium text-foreground border-b border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>{row.feature}</div>
                    <div key={`e-${i}`} className={`p-3 md:p-4 text-center border-b border-border ${i % 2 === 0 ? "bg-primary/5" : "bg-primary/[0.02]"}`}><Cell value={row.envirobiotics} /></div>
                    <div key={`c-${i}`} className={`p-3 md:p-4 text-center border-b border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}><Cell value={row.chemical} /></div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who Benefits Most */}
        <section className="section-padding py-12">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Who Benefits Most from Switching</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <h3 className="font-display font-semibold text-lg mb-3 text-primary flex items-center gap-2"><Leaf className="w-5 h-5" /> EnviroBiotics Is Ideal For</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Families with children, babies, or pregnant women</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Pet owners with persistent odor issues</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> People with asthma, allergies, or chemical sensitivities</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Anyone wanting to eliminate household chemicals</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Homes with musty, hard-to-locate odor sources</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2"><SprayCan className="w-5 h-5" /> Chemical Fresheners May Suit</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> Quick, temporary scent masking for guests</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> Short-term use in non-residential settings</li>
                </ul>
                <p className="text-xs text-muted-foreground/60 mt-4 italic">Note: We recommend avoiding chemical air fresheners for long-term, daily use due to cumulative VOC exposure.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/shop"><ShoppingBag className="mr-2 h-4 w-4" />Shop EnviroBiotics</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding py-12 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {(jsonLd["@graph"][1] as any).mainEntity.map((q: any, i: number) => (
                <div key={i} className="border-b border-border pb-5">
                  <h3 className="font-display font-semibold text-lg mb-2">{q.name}</h3>
                  <p className="text-muted-foreground text-sm">{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RelatedTopics
          currentPath="/compare/envirobiotics-vs-chemical-fresheners"
          links={[
            { label: "vs HEPA Purifiers", href: "/compare/envirobiotics-vs-hepa" },
            { label: "vs UV-C Purifiers", href: "/compare/envirobiotics-vs-uvc" },
            { label: "Safety & Certifications", href: "/safety" },
            { label: "Probiotic Air Purification Hub", href: "/probiotic-air-purification" },
            { label: "Shop Products", href: "/shop" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
};

export default CompareChemicalFreshenersPage;
