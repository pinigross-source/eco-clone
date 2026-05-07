import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { RelatedTopics } from "@/components/RelatedTopics";
import { SectionLabel } from "@/components/ui/section-label";
import { Check, X, Shield, Wind, Microscope, Leaf, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Compare", url: "/compare/envirobiotics-vs-hepa" },
      { name: "EnviroBiotics vs HEPA", url: "/compare/envirobiotics-vs-hepa" },
    ]),
    {
      "@type": "Article",
      headline: "EnviroBiotics vs HEPA Air Purifiers: Complete Comparison",
      description: "An in-depth comparison of probiotic air purification and HEPA filtration technology, covering mechanism, surface treatment, allergen reduction, and long-term effectiveness.",
      author: { "@type": "Organization", name: "EnviroBiotics" },
      publisher: { "@type": "Organization", name: "EnviroBiotics", url: "https://envirobiotics.com" },
      url: "https://envirobiotics.com/compare/envirobiotics-vs-hepa",
      datePublished: "2025-03-01",
      dateModified: "2026-03-11",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I use EnviroBiotics and a HEPA filter together?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Many customers pair a HEPA filter for immediate airborne particle capture with an EnviroBiotics device for continuous surface treatment. The BA-2080 combines both technologies in a single unit.",
          },
        },
        {
          "@type": "Question",
          name: "Does a HEPA filter remove mold from surfaces?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. HEPA filters only capture mold spores that pass through the unit while airborne. They cannot treat mold growing on surfaces, in cracks, or inside HVAC ducts. Probiotic technology addresses mold at the surface level through competitive exclusion.",
          },
        },
        {
          "@type": "Question",
          name: "Which is better for pet allergies: HEPA or EnviroBiotics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For pet allergies, EnviroBiotics is more effective because pet dander settles on surfaces within minutes. HEPA filters only capture dander while it's airborne. Probiotics continuously break down allergen proteins on surfaces where they accumulate.",
          },
        },
        {
          "@type": "Question",
          name: "How long do HEPA filters last compared to probiotic cartridges?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "HEPA filters typically need replacement every 6-12 months and cost $30-$80 each. EnviroBiotics probiotic cartridges last 90 days (180 days for BA-2080) and provide surface-level protection that HEPA filters cannot match.",
          },
        },
        {
          "@type": "Question",
          name: "Are probiotic air purifiers FDA approved?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "EnviroBiotics uses Bacillus probiotics classified as FDA GRAS (Generally Recognized As Safe). The products are also EPA-registered, MADE SAFE certified, and ISO 9001 certified.",
          },
        },
      ],
    },
  ],
};

const comparisonRows = [
  { feature: "Technology", envirobiotics: "Living beneficial bacteria (Bacillus)", hepa: "Mechanical fiber mesh filter" },
  { feature: "Treats Surfaces", envirobiotics: true, hepa: false },
  { feature: "Treats Air", envirobiotics: true, hepa: true },
  { feature: "Reaches Cracks & Crevices", envirobiotics: true, hepa: false },
  { feature: "Continuous Protection", envirobiotics: true, hepa: false },
  { feature: "Reduces Surface Allergens", envirobiotics: true, hepa: false },
  { feature: "Captures Airborne Particles", envirobiotics: false, hepa: true },
  { feature: "Treats HVAC Ducts", envirobiotics: true, hepa: false },
  { feature: "Noise Level", envirobiotics: "< 5-30 dB", hepa: "40-70 dB" },
  { feature: "Chemical Free", envirobiotics: true, hepa: true },
  { feature: "FDA GRAS / EPA Registered", envirobiotics: true, hepa: false },
  { feature: "Works When Off", envirobiotics: true, hepa: false },
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

const CompareHEPAPage = () => {
  return (
    <>
      <SEOHead
        title="EnviroBiotics vs HEPA Air Purifiers | Complete Comparison"
        description="Compare EnviroBiotics probiotic air purification with HEPA filters. Learn why surface treatment outperforms airborne-only filtration for allergens, mold, and bacteria."
        path="/compare/envirobiotics-vs-hepa"
        keywords="EnviroBiotics vs HEPA, probiotic vs HEPA, probiotic air purifier comparison, HEPA filter limitations, surface treatment vs filtration"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="section-padding pt-28 md:pt-36 pb-12 md:pb-16">
          <div className="container max-w-4xl mx-auto px-5">
            <SectionLabel className="mb-4">Technology Comparison</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              EnviroBiotics vs HEPA Air Purifiers:
              <span className="text-gradient-primary block mt-1">Which Actually Protects Your Home?</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              HEPA filters capture airborne particles, but up to 80% of indoor allergens settle on surfaces within minutes. Here's how two fundamentally different technologies compare for real-world protection.
            </p>
          </div>
        </section>

        {/* The Core Problem */}
        <section className="section-padding py-12 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">The Problem HEPA Filters Can't Solve</h2>
            <p className="text-muted-foreground mb-4">
              HEPA (High-Efficiency Particulate Air) filters are excellent at one thing: capturing particles 0.3 microns and larger as air passes through the unit. They remove dust, pollen, and some airborne bacteria with up to 99.97% efficiency, but only while the air is actively moving through the filter.
            </p>
            <p className="text-muted-foreground mb-4">
              The limitation is fundamental. Indoor allergens like pet dander, dust mite waste, mold spores, and bacterial colonies don't stay airborne. Research shows that most particulate matter settles onto surfaces, furniture, bedding, carpets, and cracks within minutes of becoming airborne. Once settled, HEPA filters cannot reach them.
            </p>
            <p className="text-muted-foreground">
              This is why many people run HEPA purifiers 24/7 yet still experience allergy symptoms. The filter treats the symptom (airborne particles) without addressing the source (surface contamination where allergens breed and re-launch).
            </p>
          </div>
        </section>

        {/* How EnviroBiotics Works Differently */}
        <section className="section-padding py-12">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">How EnviroBiotics Works Differently</h2>
            <p className="text-muted-foreground mb-4">
              EnviroBiotics devices disperse beneficial Bacillus probiotics into your indoor environment on a timed cycle. These microscopic organisms travel with natural airflow and settle on every surface: countertops, fabrics, inside HVAC ducts, and into cracks that no filter can reach.
            </p>
            <p className="text-muted-foreground mb-4">
              Once established on surfaces, the probiotics consume the organic matter (dead skin cells, dust mite waste, mold nutrients) that harmful microorganisms need to survive. This process, called <Link to="/glossary" className="text-primary hover:underline">competitive exclusion</Link>, doesn't just capture allergens: it removes the food source that allows them to multiply.
            </p>
            <p className="text-muted-foreground">
              The result is continuous, surface-level protection that works even when the device is between cycles. Unlike a HEPA filter that stops protecting the moment you turn it off, the probiotic layer remains active on surfaces for days.
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
                <div className="p-3 md:p-4 font-semibold text-sm md:text-base text-muted-foreground text-center bg-muted/50 border-b border-border">HEPA Filter</div>
                {comparisonRows.map((row, i) => (
                  <>
                    <div key={`f-${i}`} className={`p-3 md:p-4 text-xs md:text-sm font-medium text-foreground border-b border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>{row.feature}</div>
                    <div key={`e-${i}`} className={`p-3 md:p-4 text-center border-b border-border ${i % 2 === 0 ? "bg-primary/5" : "bg-primary/[0.02]"}`}><Cell value={row.envirobiotics} /></div>
                    <div key={`h-${i}`} className={`p-3 md:p-4 text-center border-b border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}><Cell value={row.hepa} /></div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Best of Both */}
        <section className="section-padding py-12">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Best of Both Worlds: The BA-2080</h2>
            <p className="text-muted-foreground mb-4">
              You don't have to choose. The <Link to="/product/betterair-2080" className="text-primary hover:underline">BA-2080</Link> combines a true HEPA filter for immediate airborne particle capture with EnviroBiotics probiotic technology for continuous surface treatment. It's the only device on the market that addresses both airborne and surface-level contamination in a single unit.
            </p>
            <p className="text-muted-foreground mb-6">
              For rooms up to 2,600 sq ft, the BA-2080 provides dual-layer protection: HEPA filtration reduces airborne particles on the first pass, while probiotics settle onto surfaces and provide ongoing protection between filter cycles.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/product/betterair-2080">View BA-2080</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/shop"><ShoppingBag className="mr-2 h-4 w-4" />Shop All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* When to Choose */}
        <section className="section-padding py-12 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">When to Choose Each Technology</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <h3 className="font-display font-semibold text-lg mb-3 text-primary flex items-center gap-2"><Leaf className="w-5 h-5" /> Choose EnviroBiotics When</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You have persistent allergy symptoms despite using filters</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Mold, pet dander, or dust mites are your primary concern</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You want chemical-free, continuous surface protection</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You need ultra-quiet operation for bedrooms or nurseries</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You want treatment that reaches HVAC ducts and hidden areas</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2"><Wind className="w-5 h-5" /> Choose HEPA When</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> You primarily need smoke or wildfire particle removal</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> Immediate airborne particle capture is the priority</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> You're in a temporary environment (hotel, rental)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding py-12">
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
          currentPath="/compare/envirobiotics-vs-hepa"
          links={[
            { label: "How EnviroBiotics Works", href: "/how-it-works" },
            { label: "vs UV-C Purifiers", href: "/compare/envirobiotics-vs-uvc" },
            { label: "vs Chemical Air Fresheners", href: "/compare/envirobiotics-vs-chemical-fresheners" },
            { label: "Probiotic Air Purification Hub", href: "/probiotic-air-purification" },
            { label: "Shop Products", href: "/shop" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
};

export default CompareHEPAPage;
