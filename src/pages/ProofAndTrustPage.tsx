import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "@/lib/link";
import { RelatedTopics } from "@/components/RelatedTopics";
import { SectionLabel } from "@/components/ui/section-label";
import { BadgeCheck, FlaskConical, FileText, MessageSquareQuote, Shield } from "lucide-react";

const certifications = [
  {
    label: "FDA GRAS",
    desc: "Our probiotic strains are classified as Generally Recognized As Safe by the U.S. Food & Drug Administration.",
  },
  {
    label: "ISO 9001 Manufacturing",
    desc: "Our production facilities follow international quality management standards.",
  },
  { label: "EPA Registered", desc: "Our products are approved by the Environmental Protection Agency (EPA) for their safety, ensuring they meet rigorous safety standards." },
  { label: "MADE SAFE® Certified", desc: "Screened for known harmful chemicals and ingredients." },
  { label: "PTPA (Parent Tested Parent Approved)", desc: "Recognized by families as safe for homes with children." },
  { label: "Allergy Standards Limited", desc: "Independently tested for allergen reduction efficacy." },
];

const labResults = [
  "A substantial reduction in dust-mite allergens (Der f 1) on treated surfaces",
  "Significant suppression of mold colony growth.",
  "Reduction in airborne particulate matter in controlled room studies",
  "EnviroBiotics devices do not omit any ozone nor any other gas",
];

const ProofAndTrustPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Proof & Trust: Certifications, Testing & Research"
        description="Review EnviroBiotics' FDA GRAS certification, ISO manufacturing standards, third-party lab results, and published research supporting probiotic air purification."
        path="/proof-and-trust"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Proof & Trust", url: "/proof-and-trust" },
            ]),
          ],
        }}
      />
      <Navbar />

      {/* Gradient Hero */}
      <section className="gradient-hero pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionLabel centered className="mb-4 justify-center">
            Evidence & Trust
          </SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Proof & Trust: Certifications, Testing & Research
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            We believe transparency builds trust. EnviroBiotics products are backed by rigorous independent testing,
            recognized safety certifications, and a growing body of published research. This page consolidates the
            evidence so you can make an informed decision.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        {/* Card: Safety Certifications */}
        <div className="card-premium p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="icon-container icon-container-lg shrink-0">
              <BadgeCheck className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground pt-2">Safety Certifications</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 pl-0 md:pl-[4.5rem]">
            {certifications.map((cert) => (
              <div key={cert.label} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <p className="font-semibold text-foreground text-sm mb-1">{cert.label}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card: Lab Results */}
        <div className="card-premium p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="icon-container icon-container-lg shrink-0">
              <FlaskConical className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground pt-2">Third-Party Lab Results</h2>
          </div>
          <div className="pl-0 md:pl-[4.5rem]">
            <p className="text-muted-foreground mb-4 leading-relaxed">
              EnviroBiotics devices have been tested by accredited independent laboratories for efficacy against common
              indoor contaminants. Key findings include:
            </p>
            <div className="space-y-2">
              {labResults.map((result) => (
                <div key={result} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p className="text-muted-foreground text-sm">{result}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-4">
              Explore the full details on our{" "}
              <Link to="/research" className="text-primary underline">
                research page
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Card: Published Research */}
        <div className="card-premium p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="icon-container icon-container-lg shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground pt-2">Published Research & Whitepapers</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed pl-0 md:pl-[4.5rem]">
            <p>
              The science of environmental probiotics is supported by peer-reviewed studies and industry whitepapers.
              Our{" "}
              <Link to="/research" className="text-primary underline">
                research library
              </Link>{" "}
              provides access to published findings covering competitive exclusion, biofilm reduction, and allergen
              management.
            </p>
            <p>
              For real-world outcomes, review our{" "}
              <Link to="/case-studies" className="text-primary underline">
                case studies
              </Link>{" "}
              documenting before-and-after results from residential and commercial installations.
            </p>
          </div>
        </div>

        {/* Card: Testimonials */}
        <div className="card-premium p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="icon-container icon-container-lg shrink-0">
              <MessageSquareQuote className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground pt-2">Customer Testimonials</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed pl-0 md:pl-[4.5rem]">
            Thousands of families, allergists, and facility managers trust EnviroBiotics. Hear from them directly on our
            homepage or explore specific{" "}
            <Link to="/product-use-cases" className="text-primary underline">
              use case stories
            </Link>{" "}
            from customers across North America.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-4">
          <Link
            to="/safety"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
          >
            View Safety Details
          </Link>
          <Link
            to="/probiotic-air-purification"
            className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition"
          >
            Back to Probiotic Air Purification
          </Link>
        </div>

        <RelatedTopics currentPath="/proof-and-trust" />
      </main>
      <Footer />
    </div>
  );
};

export default ProofAndTrustPage;
