import { useState, lazy, Suspense } from "react";
import { Link } from "@/lib/link";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
import { ExternalLink, ArrowRight, FileText, Download, Microscope, Building2, CheckCircle2, BookOpen } from "lucide-react";
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
        to={`/case-studies/${item.slug}`}
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
              "@type": "ScholarlyArticle",
              "headline": "Research & Science: Environmental Probiotics for Indoor Air and Surfaces",
              "description": "A reference summary of peer-reviewed studies and clinical evidence for Bacillus-based environmental probiotics — including the University of Genova SARS-CoV-2 study, Indoor Biotechnologies allergen study, and PCHS hospital trials.",
              "url": "https://envirobiotics.com/research",
              "mainEntityOfPage": "https://envirobiotics.com/research",
              "author": { "@type": "Organization", "name": "EnviroBiotics" },
              "publisher": { "@type": "Organization", "name": "EnviroBiotics", "url": "https://envirobiotics.com" },
              "about": [
                "Environmental probiotics",
                "Bacillus subtilis",
                "Indoor air quality",
                "Competitive exclusion",
                "Antimicrobial resistance",
              ],
              "citation": [
                { "@type": "ScholarlyArticle", "name": "97.7% SARS-CoV-2 surface reduction within 3 hours", "publisher": "University of Genova, Department of Experimental Medicine", "datePublished": "2025", "url": "https://ecologicalbalancing.com/a-new-path-to-suppress-covid-19-on-surfaces/" },
                { "@type": "ScholarlyArticle", "name": "Allergen reduction by environmental probiotics", "publisher": "Indoor Biotechnologies (Cardiff, UK)", "datePublished": "2024", "url": "https://ecologicalbalancing.com/Asthma-and-Allergies-Prevention/" },
                { "@type": "ScholarlyArticle", "name": "Reducing HAI with PCHS — Caselli E. et al.", "publisher": "PLOS ONE", "datePublished": "2018", "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0199616" },
                { "@type": "ScholarlyArticle", "name": "Probiotic-based sanitation & AMR — D'Accolti M. et al.", "publisher": "Microorganisms", "datePublished": "2021", "url": "https://www.mdpi.com/2076-2607/9/2/225" },
                { "@type": "ScholarlyArticle", "name": "Hard-surface biocontrol — Vandini A. et al.", "publisher": "PLOS ONE", "datePublished": "2014", "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0108598" },
              ],
            },
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

        {/* Key Findings — featured-snippet / AI Overview target */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold">Key Research Findings</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    { stat: "97.7% reduction in SARS-CoV-2 on surfaces within 3 hours", source: "University of Genova, Department of Experimental Medicine" },
                    { stat: "Measurable reduction in indoor allergens within 8 days of continuous use", source: "Indoor Biotechnologies (Cardiff, UK)" },
                    { stat: "~52% reduction in healthcare-associated infections vs. conventional disinfectants", source: "Caselli E. et al., PLOS ONE, 2018 (6-hospital trial)" },
                    { stat: "Deployed in hospitals, schools, nursing homes, and cruise ships worldwide", source: "Multi-site PCHS field deployments" },
                    { stat: "FDA GRAS-certified Bacillus strains — no ozone, no chemicals, safe for children and pets", source: "MADE SAFE® certification & FDA GRAS notice inventory" },
                  ].map((item) => (
                    <li key={item.stat} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground leading-snug">{item.stat}</p>
                        <p className="text-xs text-muted-foreground mt-1">— {item.source}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-muted-foreground border-t border-border/50 pt-5">
                  Want to see how these findings translate into a product? The{" "}
                  <Link to="/product/ba-2080" className="text-primary font-medium hover:underline">BA-2080</Link>{" "}
                  applies the room-level evidence at home, the{" "}
                  <Link to="/product/biologic-mini" className="text-primary font-medium hover:underline">BioLogic Mini</Link>{" "}
                  and{" "}
                  <Link to="/product/biotica-800" className="text-primary font-medium hover:underline">Biotica 800</Link>{" "}
                  apply the surface-activity evidence, and the{" "}
                  <Link to="/product/ebiotic-pro" className="text-primary font-medium hover:underline">E-Biotic Pro</Link>{" "}
                  applies the whole-home / HVAC evidence.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Cited Studies — full reference blocks for citation-grade content */}
        <section id="cited-studies" className="section-padding bg-muted/30 scroll-mt-24">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-8 bg-primary rounded-full" />
                <h2 className="text-2xl md:text-3xl font-display font-bold">Cited Studies</h2>
              </div>
              <p className="text-muted-foreground text-sm mb-10 max-w-2xl">
                Full citation blocks for the primary evidence behind EnviroBiotics. Each entry lists institution, year, method, key result, and a link to the source.
              </p>
            </ScrollReveal>

            <div className="space-y-8">
              {[
                {
                  authors: "University of Genova — Department of Experimental Medicine",
                  year: "2025",
                  title: "Suppressing SARS-CoV-2 on Surfaces with Environmental Probiotics",
                  method: "EnviroBiotics suspension incubated with SARS-CoV-2 viral particles; measurements at 15 min, 1 h, and 3 h. Spike-protein inactivation confirmed via colony-forming assay against untreated controls.",
                  result: "67% viral neutralization within 15 minutes, 97.7% within 3 hours. Control surfaces showed no spontaneous decline.",
                  url: "https://ecologicalbalancing.com/a-new-path-to-suppress-covid-19-on-surfaces/",
                  productLine: <>Direct evidence for room-level surface defense — see how the <Link to="/product/ba-2080" className="text-primary font-medium hover:underline">BA-2080</Link> applies this in a home setting.</>,
                },
                {
                  authors: "Indoor Biotechnologies (Cardiff, UK; Charlottesville, VA; Bangalore, India)",
                  year: "2024",
                  title: "Indoor Allergen Elimination by Bacillus-Based Environmental Probiotics",
                  method: "8-day controlled application supervised by Dr. Sivasankar Baalasubramanian, with a parallel longer-period simulation at EMSL Analytical Laboratories (NJ). Allergen concentrations measured against baseline.",
                  result: "Cumulative, statistically meaningful decrease in dust-mite, pet-dander, and mold allergens. Probiotic Bacillus cells secrete proteolytic enzymes that degrade allergenic epitopes.",
                  url: "https://ecologicalbalancing.com/Asthma-and-Allergies-Prevention/",
                  productLine: <>Direct evidence for surface allergen activity — see how the <Link to="/product/biologic-mini" className="text-primary font-medium hover:underline">BioLogic Mini</Link> and <Link to="/product/biotica-800" className="text-primary font-medium hover:underline">Biotica 800</Link> deliver this in homes and nurseries.</>,
                },
                {
                  authors: "Caselli E., Brusaferro S., Coccagna M. et al.",
                  year: "2018",
                  title: "Reducing healthcare-associated infections incidence by a probiotic-based sanitation system: a multicentre, prospective, intervention study",
                  method: "Multicentre prospective trial across six Italian hospitals. Conventional chemical disinfection was replaced by a Bacillus-based probiotic cleaning system (PCHS). HAI rates and antimicrobial use tracked over the intervention period.",
                  result: "~52% reduction in cumulative HAI incidence and a parallel reduction in antimicrobial drug consumption. Published in PLOS ONE.",
                  url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0199616",
                  productLine: <>Whole-facility, HVAC-level evidence — closest in scale to the <Link to="/product/ebiotic-pro" className="text-primary font-medium hover:underline">E-Biotic Pro</Link> deployed across whole homes and small commercial spaces.</>,
                },
                {
                  authors: "D'Accolti M., Soffritti I., Mazzacane S., Caselli E.",
                  year: "2021",
                  title: "Pathogen Control in the Built Environment: A Probiotic-Based System as a Remedy for the Spread of Antibiotic Resistance",
                  method: "Review and field data on the impact of Bacillus-based probiotic sanitation (PCHS) on the resistome of indoor environments, with metagenomic profiling of antimicrobial resistance genes (ARGs).",
                  result: "Continuous probiotic cleaning significantly lowered pathogen load and the abundance of ARGs on indoor surfaces vs. chemical disinfection. Published in Microorganisms (MDPI).",
                  url: "https://www.mdpi.com/2076-2607/9/2/225",
                  productLine: <>Mechanism evidence for competitive exclusion at scale — relevant to the <Link to="/product/ebiotic-pro" className="text-primary font-medium hover:underline">E-Biotic Pro</Link> for whole-home HVAC integration.</>,
                },
                {
                  authors: "Vandini A., Temmerman R., Frabetti A. et al.",
                  year: "2014",
                  title: "Hard surface biocontrol in hospitals using microbial-based cleaning products",
                  method: "8-week trial comparing conventional disinfectants vs. a probiotic cleaner containing Bacillus subtilis, B. pumilus, and B. megaterium on hospital hard surfaces. Surface swabs analyzed for S. aureus, E. coli, Candida albicans and other pathogens.",
                  result: "Stable, long-term reduction of pathogens on treated surfaces — competitive exclusion confirmed across the full trial. Published in PLOS ONE.",
                  url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0108598",
                  productLine: <>Foundational competitive-exclusion evidence — applies to every device in the lineup, including the <Link to="/product/biotica-800" className="text-primary font-medium hover:underline">Biotica 800</Link> for medium-sized rooms.</>,
                },
              ].map((c) => (
                <ScrollReveal key={c.title}>
                  <article className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{c.authors} · {c.year}</p>
                    <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-3 leading-snug">{c.title}</h3>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="inline font-semibold text-foreground">Method: </dt>
                        <dd className="inline text-muted-foreground">{c.method}</dd>
                      </div>
                      <div>
                        <dt className="inline font-semibold text-foreground">Key result: </dt>
                        <dd className="inline text-muted-foreground">{c.result}</dd>
                      </div>
                    </dl>
                    <p className="mt-4 text-sm text-foreground/90">{c.productLine}</p>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      Read the source <ExternalLink className="w-4 h-4" />
                    </a>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

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
