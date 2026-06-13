import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "@/lib/link";
import { RelatedTopics } from "@/components/RelatedTopics";
import { SectionLabel } from "@/components/ui/section-label";
import { Check, X, Leaf, Wind, ShoppingBag, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Compare", url: "/compare/betterair-vs-molekule" },
      { name: "EnviroBiotics vs Molekule", url: "/compare/betterair-vs-molekule" },
    ]),
    {
      "@type": "Article",
      headline: "EnviroBiotics vs Molekule: Probiotic Purification vs PECO Technology",
      description: "An in-depth comparison of EnviroBiotics probiotic air purification and Molekule's PECO filtration technology, covering mechanism, surface treatment, and long-term effectiveness.",
      author: { "@type": "Organization", name: "EnviroBiotics" },
      publisher: { "@type": "Organization", name: "EnviroBiotics", url: "https://envirobiotics.com" },
      url: "https://envirobiotics.com/compare/betterair-vs-molekule",
      datePublished: "2025-03-01",
      dateModified: "2026-05-27",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is PECO technology and how does it work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PECO (Photo Electrochemical Oxidation) uses UV light to activate a catalyst that breaks down pollutants at a molecular level. Unlike HEPA, which traps particles, PECO claims to destroy them. However, it only treats air that passes through the unit.",
          },
        },
        {
          "@type": "Question",
          name: "Does Molekule treat surfaces like EnviroBiotics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Molekule's PECO technology only treats airborne particles that pass through the device. It cannot reach surfaces, fabrics, cracks, or HVAC ducts where allergens and mold actually accumulate. EnviroBiotics probiotics settle on all surfaces for continuous protection.",
          },
        },
        {
          "@type": "Question",
          name: "Which is better for allergies: Molekule or EnviroBiotics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For allergies, EnviroBiotics is more effective because most allergens settle on surfaces within minutes. PECO only captures airborne particles. Probiotics continuously break down allergen proteins on surfaces where they accumulate.",
          },
        },
        {
          "@type": "Question",
          name: "Does PECO technology work when the device is off?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. PECO stops working the moment the device is turned off. EnviroBiotics probiotics remain active on surfaces for days between device cycles, providing continuous biological protection.",
          },
        },
        {
          "@type": "Question",
          name: "Are Molekule filters expensive to replace?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Molekule PECO filters typically cost $80-$150 per replacement and need changing every 6 months. EnviroBiotics probiotic cartridges last 90 days and provide surface-level protection that PECO cannot match.",
          },
        },
      ],
    },
  ],
};

const comparisonRows = [
  { feature: "Technology", envirobiotics: "Living beneficial bacteria (Bacillus)", molekule: "UV-activated catalytic oxidation (PECO)" },
  { feature: "Treats Surfaces", envirobiotics: true, molekule: false },
  { feature: "Treats Air", envirobiotics: true, molekule: true },
  { feature: "Reaches Cracks & Crevices", envirobiotics: true, molekule: false },
  { feature: "Continuous Protection", envirobiotics: true, molekule: false },
  { feature: "Reduces Surface Allergens", envirobiotics: true, molekule: false },
  { feature: "Destroys Airborne Pollutants", envirobiotics: false, molekule: true },
  { feature: "Treats HVAC Ducts", envirobiotics: true, molekule: false },
  { feature: "Noise Level", envirobiotics: "< 5-30 dB", molekule: "39-65 dB" },
  { feature: "Chemical / UV Free", envirobiotics: true, molekule: false },
  { feature: "FDA GRAS / EPA Registered", envirobiotics: true, molekule: false },
  { feature: "Works When Off", envirobiotics: true, molekule: false },
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

const CompareMolekulePage = () => {
  return (
    <>
      <SEOHead
        title="EnviroBiotics vs Molekule | PECO vs Probiotic Purification"
        description="EnviroBiotics vs Molekule: compare probiotic purification vs PECO technology. See which air purifier approach fits your home. Side-by-side comparison."
        path="/compare/betterair-vs-molekule"
        keywords="EnviroBiotics vs Molekule, probiotic vs PECO, PECO air purifier, Molekule comparison, probiotic air purifier vs PECO"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="section-padding pt-28 md:pt-36 pb-12 md:pb-16">
          <div className="container max-w-4xl mx-auto px-5">
            <SectionLabel className="mb-4">Technology Comparison</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              EnviroBiotics vs Molekule:
              <span className="text-gradient-primary block mt-1">Probiotics vs PECO Technology</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Molekule's PECO technology destroys pollutants at a molecular level, but only treats air passing through the unit. Here's how it compares to EnviroBiotics' continuous surface-level probiotic protection.
            </p>
          </div>
        </section>

        {/* How PECO Works */}
        <section className="section-padding py-12 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">How PECO Technology Works  and Its Limitations</h2>
            <p className="text-muted-foreground mb-4">
              PECO (Photo Electrochemical Oxidation) is Molekule's proprietary technology that uses UV-A light to activate a nanocatalyst filter. The catalyst creates a chemical reaction that claims to break down pollutants, allergens, and VOCs at a molecular level rather than just trapping them like a HEPA filter.
            </p>
            <p className="text-muted-foreground mb-4">
              While this sounds advanced, the core limitation is the same as all mechanical air purifiers: it only treats air that actively passes through the device. Pollutants on surfaces, in fabrics, inside cracks, and settled in HVAC ducts receive zero treatment. Like HEPA and UV-C before it, PECO is an airborne-only solution.
            </p>
            <div className="mt-6 p-5 rounded-xl bg-destructive/5 border border-destructive/20">
              <h3 className="font-display font-semibold text-base mb-2 flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" /> Key Limitations of PECO
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Only treats air passing through the unit  surface contaminants are unaffected</li>
                <li>• PECO filters are expensive ($80-$150) and require replacement every 6 months</li>
                <li>• Higher noise levels (39-65 dB) can disrupt sleep and daily life</li>
                <li>• Uses UV light and chemical oxidation  not ideal for sensitive individuals</li>
                <li>• Zero protection when the device is turned off</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How EnviroBiotics Works Differently */}
        <section className="section-padding py-12">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">The Probiotic Approach: Biological Surface Protection</h2>
            <p className="text-muted-foreground mb-4">
              EnviroBiotics takes a fundamentally different approach to indoor air quality. Instead of trying to destroy pollutants with energy or chemicals, our devices disperse beneficial <Link to="/glossary" className="text-primary hover:underline">Bacillus probiotics</Link> into your indoor environment.
            </p>
            <p className="text-muted-foreground mb-4">
              These beneficial bacteria travel with natural airflow and settle on every surface  countertops, fabrics, inside HVAC ducts, and into cracks that no filter can reach. Once established, they consume the organic nutrients that harmful organisms need to survive, a process called competitive exclusion.
            </p>
            <p className="text-muted-foreground">
              This biological layer remains active for days between device cycles, providing continuous protection even when the device is off. There are zero byproducts, zero UV exposure risks, and zero chemicals  just naturally occurring bacteria classified as FDA GRAS (Generally Recognized As Safe).
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
                <div className="p-3 md:p-4 font-semibold text-sm md:text-base text-muted-foreground text-center bg-muted/50 border-b border-border">Molekule (PECO)</div>
                {comparisonRows.map((row, i) => (
                  <>
                    <div key={`f-${i}`} className={`p-3 md:p-4 text-xs md:text-sm font-medium text-foreground border-b border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>{row.feature}</div>
                    <div key={`e-${i}`} className={`p-3 md:p-4 text-center border-b border-border ${i % 2 === 0 ? "bg-primary/5" : "bg-primary/[0.02]"}`}><Cell value={row.envirobiotics} /></div>
                    <div key={`m-${i}`} className={`p-3 md:p-4 text-center border-b border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}><Cell value={row.molekule} /></div>
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
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Surface mold, dust mites, or pet dander are your primary concern</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You want chemical-free, UV-free continuous protection</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Ultra-quiet operation is essential for bedrooms and nurseries</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You need protection in hidden areas, fabrics, and HVAC ducts</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You want protection that continues even when the device is off</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2"><Wind className="w-5 h-5" /> Molekule May Suit</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> You want a device that claims to destroy (not trap) VOCs</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> You're willing to pay premium prices for replacement filters</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> Airborne-only treatment is sufficient for your needs</li>
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
          currentPath="/compare/betterair-vs-molekule"
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

export default CompareMolekulePage;
