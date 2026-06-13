import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "@/lib/link";
import { RelatedTopics } from "@/components/RelatedTopics";
import { SectionLabel } from "@/components/ui/section-label";
import { Check, X, Leaf, Wind, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Compare", url: "/compare/betterair-vs-blueair" },
      { name: "EnviroBiotics vs Blueair", url: "/compare/betterair-vs-blueair" },
    ]),
    {
      "@type": "Article",
      headline: "EnviroBiotics vs Blueair: Probiotic Microbiome Rebalancing vs HEPASilent Filtration",
      description: "Compare EnviroBiotics probiotic air purification with Blueair's HEPASilent technology. Learn which approach offers better protection for allergies, mold, and indoor air quality.",
      author: { "@type": "Organization", name: "EnviroBiotics" },
      publisher: { "@type": "Organization", name: "EnviroBiotics", url: "https://envirobiotics.com" },
      url: "https://envirobiotics.com/compare/betterair-vs-blueair",
      datePublished: "2025-03-01",
      dateModified: "2026-05-27",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is HEPASilent and how is it different from regular HEPA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "HEPASilent is Blueair's proprietary technology that combines mechanical filtration with electrostatic charging. Particles are charged as they enter the unit, causing them to stick more effectively to the filter fibers. It captures smaller particles than standard HEPA but still only treats airborne contaminants.",
          },
        },
        {
          "@type": "Question",
          name: "Does Blueair treat surfaces where allergens settle?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Like all mechanical air purifiers, Blueair only captures airborne particles that pass through the unit. It cannot treat surfaces, fabrics, cracks, or HVAC ducts where dust mites, pet dander, and mold spores accumulate. EnviroBiotics probiotics settle on all surfaces for continuous protection.",
          },
        },
        {
          "@type": "Question",
          name: "Which is better for pet allergies: Blueair or EnviroBiotics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For pet allergies, EnviroBiotics is more effective because pet dander settles on surfaces within minutes of becoming airborne. Blueair can only capture dander while it's in the air. Probiotics continuously break down allergen proteins on surfaces, couches, bedding, and carpets where they actually accumulate.",
          },
        },
        {
          "@type": "Question",
          name: "How do filter costs compare between Blueair and EnviroBiotics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Blueair HEPASilent filters typically cost $40-$80 and need replacement every 6 months. EnviroBiotics probiotic cartridges last 90 days (180 days for BA-2080) and cost less per year while providing surface-level protection that Blueair cannot match.",
          },
        },
        {
          "@type": "Question",
          name: "Does Blueair reduce mold on surfaces?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Blueair captures airborne mold spores but cannot treat mold growing on surfaces, in cracks, or inside HVAC ducts. EnviroBiotics probiotics continuously outcompete mold on surfaces through competitive exclusion, preventing regrowth where it actually occurs.",
          },
        },
      ],
    },
  ],
};

const comparisonRows = [
  { feature: "Technology", envirobiotics: "Living beneficial bacteria (Bacillus)", blueair: "Electrostatic + mechanical filtration (HEPASilent)" },
  { feature: "Treats Surfaces", envirobiotics: true, blueair: false },
  { feature: "Treats Air", envirobiotics: true, blueair: true },
  { feature: "Reaches Cracks & Crevices", envirobiotics: true, blueair: false },
  { feature: "Continuous Protection", envirobiotics: true, blueair: false },
  { feature: "Reduces Surface Allergens", envirobiotics: true, blueair: false },
  { feature: "Captures Airborne Particles", envirobiotics: false, blueair: true },
  { feature: "Treats HVAC Ducts", envirobiotics: true, blueair: false },
  { feature: "Noise Level", envirobiotics: "< 5-30 dB", blueair: "32-62 dB" },
  { feature: "Chemical Free", envirobiotics: true, blueair: true },
  { feature: "FDA GRAS / EPA Registered", envirobiotics: true, blueair: false },
  { feature: "Works When Off", envirobiotics: true, blueair: false },
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

const CompareBlueairPage = () => {
  return (
    <>
      <SEOHead
        title="EnviroBiotics vs Blueair | HEPASilent vs Probiotic Purification"
        description="EnviroBiotics vs Blueair: probiotic microbiome rebalancing vs HEPASilent filtration. Which air purifier is right for allergies and air quality?"
        path="/compare/betterair-vs-blueair"
        keywords="EnviroBiotics vs Blueair, probiotic vs HEPASilent, Blueair comparison, HEPASilent vs probiotic, air purifier for allergies"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="section-padding pt-28 md:pt-36 pb-12 md:pb-16">
          <div className="container max-w-4xl mx-auto px-5">
            <SectionLabel className="mb-4">Technology Comparison</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              EnviroBiotics vs Blueair:
              <span className="text-gradient-primary block mt-1">Probiotics vs HEPASilent Filtration</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Blueair's HEPASilent technology efficiently captures airborne particles, but like all mechanical filters, it cannot reach surfaces where allergens and mold accumulate. Here's how probiotic protection compares.
            </p>
          </div>
        </section>

        {/* How HEPASilent Works */}
        <section className="section-padding py-12 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">How Blueair HEPASilent Works  and Its Limitations</h2>
            <p className="text-muted-foreground mb-4">
              HEPASilent is Blueair's proprietary combination of mechanical filtration and electrostatic charging. As air enters the unit, particles receive an electrostatic charge that causes them to adhere more effectively to the filter fibers. This allows Blueair to claim capture of particles smaller than standard HEPA while maintaining high airflow rates.
            </p>
            <p className="text-muted-foreground mb-4">
              Blueair units are well-regarded for their stylish design, relatively quiet operation (on lower settings), and efficient airborne particle capture. However, the fundamental limitation remains: HEPASilent, like all mechanical purifiers, only treats air that passes through the unit.
            </p>
            <p className="text-muted-foreground">
              Indoor allergens like pet dander, dust mite waste, and mold spores settle onto surfaces within minutes of becoming airborne. Once settled, no air purifier  regardless of filtration technology  can reach them. This is why many Blueair owners still experience allergy symptoms despite running their units continuously.
            </p>
          </div>
        </section>

        {/* How EnviroBiotics Works Differently */}
        <section className="section-padding py-12">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">How EnviroBiotics Works Differently</h2>
            <p className="text-muted-foreground mb-4">
              EnviroBiotics devices disperse beneficial Bacillus probiotics into your indoor environment on a timed cycle. These microscopic organisms travel with natural airflow and settle on every surface  countertops, fabrics, inside HVAC ducts, and into cracks that no filter can reach.
            </p>
            <p className="text-muted-foreground mb-4">
              Once established on surfaces, the probiotics consume the organic matter (dead skin cells, dust mite waste, mold nutrients) that harmful microorganisms need to survive. This process, called <Link to="/glossary" className="text-primary hover:underline">competitive exclusion</Link>, doesn't just capture allergens  it removes the food source that allows them to multiply.
            </p>
            <p className="text-muted-foreground">
              The result is continuous, surface-level protection that works even when the device is between cycles. Unlike a mechanical filter that stops protecting the moment you turn it off, the probiotic layer remains active on surfaces for days.
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
                <div className="p-3 md:p-4 font-semibold text-sm md:text-base text-muted-foreground text-center bg-muted/50 border-b border-border">Blueair (HEPASilent)</div>
                {comparisonRows.map((row, i) => (
                  <>
                    <div key={`f-${i}`} className={`p-3 md:p-4 text-xs md:text-sm font-medium text-foreground border-b border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>{row.feature}</div>
                    <div key={`e-${i}`} className={`p-3 md:p-4 text-center border-b border-border ${i % 2 === 0 ? "bg-primary/5" : "bg-primary/[0.02]"}`}><Cell value={row.envirobiotics} /></div>
                    <div key={`b-${i}`} className={`p-3 md:p-4 text-center border-b border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}><Cell value={row.blueair} /></div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* When to Choose */}
        <section className="section-padding py-12">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">When Each Technology Makes Sense</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <h3 className="font-display font-semibold text-lg mb-3 text-primary flex items-center gap-2"><Leaf className="w-5 h-5" /> Choose EnviroBiotics When</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You have persistent allergy symptoms despite using air filters</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Mold, pet dander, or dust mites are your primary concern</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You want chemical-free, continuous surface protection</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You need ultra-quiet operation for bedrooms or nurseries</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You want protection that reaches HVAC ducts and hidden areas</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2"><Wind className="w-5 h-5" /> Blueair May Suit</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> You primarily need smoke or wildfire particle removal</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> Immediate airborne particle capture is the priority</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> You prefer a well-known brand with stylish design</li>
                </ul>
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
          currentPath="/compare/betterair-vs-blueair"
          links={[
            { label: "vs HEPA Filters", href: "/compare/hepa" },
            { label: "vs UV-C Purifiers", href: "/compare/uvc" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Shop Products", href: "/shop" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
};

export default CompareBlueairPage;
