import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { RelatedTopics } from "@/components/RelatedTopics";
import { SectionLabel } from "@/components/ui/section-label";
import { Check, X, Shield, Zap, Leaf, ShoppingBag, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Compare", url: "/compare/envirobiotics-vs-uvc" },
      { name: "EnviroBiotics vs UV-C", url: "/compare/envirobiotics-vs-uvc" },
    ]),
    {
      "@type": "Article",
      headline: "EnviroBiotics vs UV-C Air Purifiers: Complete Comparison",
      description: "Compare probiotic air purification with UV-C germicidal technology. Learn the key differences in safety, surface treatment, and long-term effectiveness.",
      author: { "@type": "Organization", name: "EnviroBiotics" },
      publisher: { "@type": "Organization", name: "EnviroBiotics", url: "https://envirobiotics.com" },
      url: "https://envirobiotics.com/compare/envirobiotics-vs-uvc",
      datePublished: "2025-03-01",
      dateModified: "2026-03-11",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is UV-C light safe for homes with children and pets?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "UV-C light can be hazardous. Direct exposure causes skin burns and eye damage. Many consumer UV-C devices are shielded, but leaks are a documented concern. EnviroBiotics uses Bacillus probiotics classified as FDA GRAS, completely safe for children, pets, and sensitive individuals.",
          },
        },
        {
          "@type": "Question",
          name: "Can UV-C purifiers treat surfaces?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "UV-C only works on surfaces in direct line of sight and requires several minutes of sustained exposure. Shadowed areas, cracks, fabrics, and HVAC ducts receive no treatment. EnviroBiotics probiotics settle on all surfaces including hidden areas, providing continuous protection.",
          },
        },
        {
          "@type": "Question",
          name: "Does UV-C produce ozone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Some UV-C devices emit ozone as a byproduct, particularly units using 185nm wavelength bulbs. Ozone is a respiratory irritant even at low concentrations. EnviroBiotics produces zero ozone, zero byproducts, and zero chemicals.",
          },
        },
        {
          "@type": "Question",
          name: "Which is more effective for mold: UV-C or probiotics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For mold prevention, probiotics are more effective because they address mold where it grows, on surfaces. UV-C can only kill mold spores that pass directly in front of the light. Probiotics continuously outcompete mold on surfaces through competitive exclusion, preventing regrowth.",
          },
        },
        {
          "@type": "Question",
          name: "Do UV-C air purifiers work when turned off?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. UV-C provides zero protection when the device is off. The moment you turn it off, re-contamination begins immediately. EnviroBiotics probiotics remain active on surfaces for days between device cycles, providing continuous biological protection.",
          },
        },
      ],
    },
  ],
};

const comparisonRows = [
  { feature: "Technology", envirobiotics: "Living beneficial bacteria", uvc: "Ultraviolet-C germicidal light" },
  { feature: "Treats Surfaces", envirobiotics: true, uvc: false },
  { feature: "Treats Air", envirobiotics: true, uvc: true },
  { feature: "Reaches Hidden Areas", envirobiotics: true, uvc: false },
  { feature: "Works When Off", envirobiotics: true, uvc: false },
  { feature: "Safe Around Children", envirobiotics: true, uvc: false },
  { feature: "Safe Around Pets", envirobiotics: true, uvc: false },
  { feature: "Zero Ozone Emissions", envirobiotics: true, uvc: false },
  { feature: "Prevents Regrowth", envirobiotics: true, uvc: false },
  { feature: "Treats HVAC Ducts", envirobiotics: true, uvc: false },
  { feature: "FDA GRAS Certified", envirobiotics: true, uvc: false },
  { feature: "MADE SAFE Certified", envirobiotics: true, uvc: false },
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

const CompareUVCPage = () => {
  return (
    <>
      <SEOHead
        title="EnviroBiotics vs UV-C Air Purifiers | Safety & Effectiveness Comparison"
        description="Compare EnviroBiotics probiotic purification with UV-C germicidal light. See why surface-level probiotic treatment outperforms UV-C for allergens, mold, and safety."
        path="/compare/envirobiotics-vs-uvc"
        keywords="EnviroBiotics vs UV-C, probiotic vs UV-C, UV-C air purifier safety, UV-C ozone, probiotic air purifier, surface treatment"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="section-padding pt-28 md:pt-36 pb-12 md:pb-16">
          <div className="container max-w-4xl mx-auto px-5">
            <SectionLabel className="mb-4">Technology Comparison</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              EnviroBiotics vs UV-C Purifiers:
              <span className="text-gradient-primary block mt-1">Safety, Surface Treatment & Real Protection</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              UV-C germicidal light kills microorganisms on contact, but only in direct line of sight. Here's why living probiotics provide safer, more comprehensive protection for your home.
            </p>
          </div>
        </section>

        {/* How UV-C Works */}
        <section className="section-padding py-12 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">How UV-C Purifiers Work, and Their Limitations</h2>
            <p className="text-muted-foreground mb-4">
              UV-C (ultraviolet-C) light at 254nm wavelength damages the DNA of microorganisms, rendering them unable to reproduce. In-duct UV-C systems are used in hospitals and commercial HVAC, while consumer units typically house UV-C bulbs inside a chamber where air passes through.
            </p>
            <p className="text-muted-foreground mb-4">
              The core limitation is exposure time and line of sight. UV-C must shine directly on an organism for several seconds to minutes for effective kill rates. Air moving through a consumer unit at typical flow rates may not receive sufficient UV-C dose to neutralize all pathogens. More critically, UV-C cannot treat surfaces, fabrics, cracks, or any area not in the direct light path.
            </p>

            <div className="mt-6 p-5 rounded-xl bg-destructive/5 border border-destructive/20">
              <h3 className="font-display font-semibold text-base mb-2 flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" /> Safety Concerns with Consumer UV-C Devices
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Direct UV-C exposure causes photokeratitis (eye damage) and skin burns</li>
                <li>• Some units produce ozone as a byproduct, a respiratory irritant at any concentration</li>
                <li>• FDA and FTC have issued warnings about unverified UV-C product claims</li>
                <li>• UV-C bulbs degrade over time, reducing effectiveness without visible indication</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How EnviroBiotics Differs */}
        <section className="section-padding py-12">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">The Probiotic Approach: Biological Surface Protection</h2>
            <p className="text-muted-foreground mb-4">
              EnviroBiotics takes a fundamentally different approach. Instead of trying to kill microorganisms with energy (light, heat, chemicals), probiotic technology uses <Link to="/glossary" className="text-primary hover:underline">competitive exclusion</Link>, the same principle used in agriculture, food safety, and gut health for decades.
            </p>
            <p className="text-muted-foreground mb-4">
              Beneficial Bacillus probiotics are dispersed into your indoor environment and settle on every surface. They consume the organic nutrients (dead skin cells, dust mite waste, mold food sources) that harmful organisms depend on. Without food, harmful bacteria, mold, and allergen-producing organisms cannot sustain their populations.
            </p>
            <p className="text-muted-foreground">
              This biological layer remains active for days between cycles, providing protection even when the device is off. There are zero byproducts, zero ozone, zero UV exposure risks: just naturally occurring bacteria classified as FDA GRAS (Generally Recognized As Safe).
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
                <div className="p-3 md:p-4 font-semibold text-sm md:text-base text-muted-foreground text-center bg-muted/50 border-b border-border">UV-C Purifier</div>
                {comparisonRows.map((row, i) => (
                  <>
                    <div key={`f-${i}`} className={`p-3 md:p-4 text-xs md:text-sm font-medium text-foreground border-b border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>{row.feature}</div>
                    <div key={`e-${i}`} className={`p-3 md:p-4 text-center border-b border-border ${i % 2 === 0 ? "bg-primary/5" : "bg-primary/[0.02]"}`}><Cell value={row.envirobiotics} /></div>
                    <div key={`u-${i}`} className={`p-3 md:p-4 text-center border-b border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}><Cell value={row.uvc} /></div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ideal Scenarios */}
        <section className="section-padding py-12">
          <div className="container max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">When Each Technology Makes Sense</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <h3 className="font-display font-semibold text-lg mb-3 text-primary flex items-center gap-2"><Leaf className="w-5 h-5" /> Choose EnviroBiotics When</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Safety for children and pets is non-negotiable</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Surface mold, allergens, or odors are the main concern</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You want zero ozone and zero chemical byproducts</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> You need protection in hidden areas (cracks, ducts, fabrics)</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Continuous protection, even when the device is between cycles</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> UV-C May Suit</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> Commercial/hospital in-duct sterilization with professional installation</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> Water purification systems (enclosed UV chambers)</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" /> Lab/clean room sterilization under controlled conditions</li>
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
          currentPath="/compare/envirobiotics-vs-uvc"
          links={[
            { label: "vs HEPA Purifiers", href: "/compare/envirobiotics-vs-hepa" },
            { label: "vs Chemical Fresheners", href: "/compare/envirobiotics-vs-chemical-fresheners" },
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

export default CompareUVCPage;
