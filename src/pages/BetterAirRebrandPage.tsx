import { SEOHead, organizationJsonLd, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RelatedTopics } from "@/components/RelatedTopics";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight, CheckCircle2, ShieldCheck, Repeat, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const timeline = [
  { year: "2009", label: "Founded as BetterAir", detail: "Pioneered commercial probiotic air treatment in Israel." },
  { year: "2017", label: "U.S. Market Launch", detail: "Brought the Biotica 800 and BioLogic Mini to North America." },
  { year: "2023", label: "FDA GRAS & MADE SAFE", detail: "Achieved gold-standard safety certifications for consumer products." },
  { year: "2024", label: "Rebranded to EnviroBiotics", detail: "New name reflecting our expanded mission: environmental probiotics for every indoor space." },
];

const sameTechnology = [
  "Same patented Bacillus probiotic strains",
  "Same manufacturing facility and quality standards",
  "Same FDA GRAS certified, MADE SAFE certified formulas",
  "Same engineering team and R&D leadership",
  "Same EPA registered products",
  "Same customer support and warranty coverage",
];

const BetterAirRebrandPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd,
      makeBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "BetterAir is Now EnviroBiotics", url: "/betterair-to-envirobiotics" },
      ]),
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is EnviroBiotics the same as BetterAir?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. EnviroBiotics is the new name for BetterAir. The company, technology, products, and team are the same. The rebrand reflects an expanded mission: environmental probiotics for every indoor space, not just air.",
            },
          },
          {
            "@type": "Question",
            name: "Why did BetterAir change its name to EnviroBiotics?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "BetterAir rebranded to EnviroBiotics in 2024 to better reflect that our technology treats both air and surfaces. 'BetterAir' implied air-only treatment, while 'EnviroBiotics' communicates the full scope: environmental probiotics that protect your entire indoor environment.",
            },
          },
          {
            "@type": "Question",
            name: "Are BetterAir products still available?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. All former BetterAir products — including the Biotica 800, BioLogic Mini, BA-2080, and eBiotic Pro — are still available under the EnviroBiotics brand with the same formulations, certifications, and warranties.",
            },
          },
          {
            "@type": "Question",
            name: "Will my existing BetterAir warranty still be honored?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. All existing BetterAir warranties remain fully valid under EnviroBiotics. Your warranty coverage, refill subscriptions, and customer support remain unchanged.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="BetterAir Is Now EnviroBiotics | Same Technology, New Name"
        description="BetterAir has rebranded to EnviroBiotics. Same probiotic air and surface purification technology, same team, same certifications. Learn about our evolution from BetterAir to EnviroBiotics."
        path="/betterair-to-envirobiotics"
        keywords="BetterAir, Better Air, BetterAir probiotic, BetterAir air purifier, EnviroBiotics, betterair.com, betterair probiotic air purifier, BetterAir rebranding, environmental probiotics"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">BetterAir Is Now EnviroBiotics</span>
        </nav>

        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            BetterAir Is Now <span className="text-gradient-primary">EnviroBiotics</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-4">
            If you're looking for <strong>BetterAir</strong>, you're in the right place. In 2024, BetterAir officially rebranded to <strong>EnviroBiotics</strong> — a new name that better represents our complete approach to indoor environmental health.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            The technology hasn't changed. The team hasn't changed. The certifications haven't changed. We simply outgrew a name that only described part of what we do.
          </p>
        </ScrollReveal>

        {/* Why the rebrand */}
        <ScrollReveal>
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Why Did BetterAir Rebrand to EnviroBiotics?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              "BetterAir" suggested our probiotic technology only treated air. In reality, our environmental probiotics treat <strong>surfaces, fabrics, cracks, HVAC ductwork, and air</strong> — every part of your indoor environment where harmful organisms actually live and multiply.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The name <strong>EnviroBiotics</strong> (Environmental + Probiotics) communicates the full scope of what our technology delivers: a continuously active probiotic ecosystem that protects your entire indoor environment, not just the air passing through a filter.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This rebrand also reflects our expansion into <Link to="/hvac-applications" className="text-primary underline hover:text-primary/80">commercial HVAC applications</Link>, <Link to="/nursery" className="text-primary underline hover:text-primary/80">nursery-specific solutions</Link>, and <Link to="/subscribe" className="text-primary underline hover:text-primary/80">subscription-based refill programs</Link> — all areas where "BetterAir" didn't capture the full picture.
            </p>
          </section>
        </ScrollReveal>

        {/* Same technology */}
        <ScrollReveal>
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <Repeat className="h-7 w-7 text-primary" />
              Same Technology. Same Team. New Name.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Nothing has changed except the name and visual identity. Here's what remains exactly the same:
            </p>
            <ul className="space-y-3">
              {sameTechnology.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal>
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Our Journey</h2>
            <div className="border-l-2 border-primary/30 pl-6 space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                  <p className="text-sm font-bold text-primary">{item.year}</p>
                  <h3 className="text-lg font-semibold text-foreground">{item.label}</h3>
                  <p className="text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Products */}
        <ScrollReveal>
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Former BetterAir Products — Now Under EnviroBiotics
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Every product you knew from BetterAir is still available with the same specifications, safety certifications, and performance:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: "BioLogic Mini", desc: "Portable probiotic purifier, up to 300 sq ft", slug: "biologic-mini" },
                { name: "Biotica 800", desc: "Whole-room probiotic purifier, up to 800 sq ft", slug: "biotica-800" },
                { name: "BA-2080", desc: "Hybrid HEPA + probiotic, up to 2,600 sq ft", slug: "betterair-2080" },
                { name: "eBiotic Pro", desc: "HVAC-integrated system, up to 25,000 sq ft", slug: "ebiotic-pro" },
              ].map((p) => (
                <Link
                  key={p.slug}
                  to={`/product/${p.slug}`}
                  className="block p-4 rounded-xl border border-border hover:border-primary/40 transition bg-card"
                >
                  <h3 className="font-semibold text-foreground mb-1">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal>
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Frequently Asked Questions About the BetterAir Rebrand
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Is EnviroBiotics the same company as BetterAir?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes. EnviroBiotics is the new name for BetterAir. The company, technology, products, and team are identical. The rebrand reflects our expanded mission: environmental probiotics for every indoor space, not just air.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Are BetterAir products still available?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes. All former BetterAir products — Biotica 800, BioLogic Mini, BA-2080, and eBiotic Pro — are available under the EnviroBiotics brand with the same formulations, certifications, and warranties.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Will my BetterAir warranty still be honored?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Absolutely. All existing BetterAir warranties, refill subscriptions, and customer support commitments remain fully valid under EnviroBiotics.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">What happened to betterair.com?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The BetterAir website has transitioned to <strong>envirobiotics.com</strong>. All product information, support resources, and account access are available here. If you have any issues, <Link to="/support" className="text-primary underline">contact our support team</Link>.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, hsl(var(--primary-soft)) 0%, hsl(var(--background)) 100%)" }}>
            <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Experience the Difference?</h2>
            <p className="text-muted-foreground mb-6">Same proven probiotic technology. Same certifications. A better name for a broader mission.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/shop">
                  Shop Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>

        <RelatedTopics currentPath="/betterair-to-envirobiotics" />
      </main>
      <Footer />
    </div>
  );
};

export default BetterAirRebrandPage;
