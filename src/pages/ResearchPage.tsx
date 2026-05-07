import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const ScrollReveal = lazy(() => import("@/components/ui/scroll-reveal").then(m => ({ default: m.ScrollReveal })));
const StaggerContainer = lazy(() => import("@/components/ui/scroll-reveal").then(m => ({ default: m.StaggerContainer })));
const StaggerItem = lazy(() => import("@/components/ui/scroll-reveal").then(m => ({ default: m.StaggerItem })));
import { ExternalLink, ArrowRight, FileText, Download, Microscope, Building2 } from "lucide-react";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { 
  caseStudies, 
  whitePapers, 
  researchPapers, 
  ResearchItem, 
  getCategoryIcon, 
  getCategoryLabel 
} from "@/data/researchData";
import { Button } from "@/components/ui/button";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { LifestyleHero } from "@/components/LifestyleHero";
import heroResearchLifestyle from "@/assets/hero-research-lifestyle.jpg";
const ContentProductCTA = lazy(() => import("@/components/ContentProductCTA").then(m => ({ default: m.ContentProductCTA })));

const ResearchCard = ({ item }: { item: ResearchItem }) => {
  const isExternal = !!item.externalUrl;
  const hasPdf = !!item.pdfUrl;
  const isCaseStudy = item.category === "case-study";
  const CategoryIcon = getCategoryIcon(item.category);

  const cardContent = (
    <>
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          width="800"
          height="544"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full capitalize flex items-center gap-1.5">
            <CategoryIcon className="w-3 h-3" />
            {getCategoryLabel(item.category)}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {item.description}
        </p>
        
        {/* Highlights for case studies */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.highlights.slice(0, 3).map((highlight, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-3">
          {isCaseStudy ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
              View Case Study
              <ArrowRight className="w-4 h-4" />
            </span>
          ) : (
            <>
              {hasPdf && (
                <a
                  href={item.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              )}
              {isExternal && (
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
                >
                  View Study
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );

  if (isCaseStudy) {
    return (
      <Link
        to={`/case-study/${item.slug}`}
        className="group block bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      {cardContent}
    </div>
  );
};

const ResearchPage = () => {
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Research & Case Studies | EnviroBiotics Science"
        description="Explore peer-reviewed research, real-world case studies, and white papers on environmental probiotic technology for indoor air and surface treatment."
        path="/research"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Research & Science", url: "/research" },
            ]),
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is there scientific research supporting probiotic air purification?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Multiple peer-reviewed studies and independent laboratory evaluations support the efficacy of environmental Bacillus probiotics for reducing pathogens, allergens, and mold on indoor surfaces. EnviroBiotics has been tested in hospitals, schools, offices, and residential environments. Published case studies demonstrate measurable reductions in surface contamination within 30 days of continuous use.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What does the research say about probiotics for mold reduction?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Research shows that Bacillus-based environmental probiotics can suppress mold regrowth by competitively excluding fungal organisms from colonizing surfaces. They reduce the organic nutrients that mold requires to establish. Studies in HVAC environments show significant reductions in mold spore counts on internal duct surfaces after probiotic treatment.",
                  },
                },
              ],
            },
          ],
        }}
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <LifestyleHero
          image={heroResearchLifestyle}
          imageAlt="Scientist examining a sample in a calm Scandinavian lab"
          eyebrow="Research & Science"
          title={<>The science of <span className="text-primary">cleaner space</span></>}
          subcopy="Peer-reviewed research, real-world case studies, and behind environmental probiotic technology."
          ctaLabel="Explore Research"
          ctaHref="#case-studies"
        />

        {/* Case Studies Section */}
        <section id="case-studies" className="section-padding bg-muted/30 scroll-mt-24">
          <div className="container">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-1 h-8 bg-primary rounded-full" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold">
                    Case Studies
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Real-world applications and measurable results
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((item) => (
                <StaggerItem key={item.slug}>
                  <ResearchCard item={item} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>


        {/* Research Papers Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-1 h-8 bg-primary rounded-full" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold">
                    Peer-Reviewed Research
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Scientific studies and clinical trials
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchPapers.map((item) => (
                <StaggerItem key={item.slug}>
                  <ResearchCard item={item} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto p-8 md:p-12 rounded-3xl glass-card border border-primary/20">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  Need More Information?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Our team is available to discuss specific applications, provide additional research, or help you understand how environmental probiotics can work for your space.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setContactOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  >
                    Contact Our Team
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    to="/how-it-works"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted transition-colors"
                  >
                    How It Works
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* Contextual product CTA */}
      <section className="container max-w-4xl px-4 pb-8">
        <ContentProductCTA
          headline="Backed by science. Built for your home."
          subtitle="Explore the devices that deliver these research-proven results."
        />
      </section>

      <Suspense fallback={null}><Footer /></Suspense>
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default ResearchPage;
