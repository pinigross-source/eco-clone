import { lazy, Suspense } from "react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "@/lib/link";
import { SectionLabel } from "@/components/ui/section-label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const ContentProductCTA = lazy(() => import("@/components/ContentProductCTA").then(m => ({ default: m.ContentProductCTA })));
const RelatedTopics = lazy(() => import("@/components/RelatedTopics").then(m => ({ default: m.RelatedTopics })));

export interface ArticleSection {
  heading: string;
  body: string | string[];
  bullets?: string[];
}

export interface ArticleFAQ {
  q: string;
  a: string;
}

export interface EducationArticleProps {
  category: string;          // eyebrow text e.g. "Indoor microbiome"
  title: string;             // H1
  lede: string;              // hero paragraph
  path: string;              // canonical path, e.g. "/indoor-microbiome"
  seoTitle: string;
  seoDescription: string;
  sections: ArticleSection[];
  keyPoints?: { label: string; value: string }[];
  faqs?: ArticleFAQ[];
  related?: { label: string; to: string }[];
}

export const EducationArticle = ({
  category,
  title,
  lede,
  path,
  seoTitle,
  seoDescription,
  sections,
  keyPoints,
  faqs = [],
  related = [],
}: EducationArticleProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      makeBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Education Center", url: "/education" },
        { name: title, url: path },
      ]),
      {
        "@type": "Article",
        headline: title,
        description: seoDescription,
        mainEntityOfPage: `https://envirobiotics.com${path}`,
      },
      ...(faqs.length
        ? [{
            "@type": "FAQPage",
            mainEntity: faqs.map(f => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }]
        : []),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={seoTitle} description={seoDescription} path={path} jsonLd={jsonLd} />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-24 right-0 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-3xl pointer-events-none" />
          <div className="container max-w-4xl px-5 sm:px-6 relative z-10">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <Link
                  to="/education"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Education Center
                </Link>
                <SectionLabel className="mb-5">Education Center · {category}</SectionLabel>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-display font-bold leading-[1.02] tracking-[-0.02em] mb-7 text-balance">
                  {title}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {lede}
                </p>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* Key points strip */}
        {keyPoints && keyPoints.length > 0 && (
          <section className="pb-4">
            <div className="container max-w-4xl px-5 sm:px-6">
              <Suspense fallback={null}>
                <ScrollReveal>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 sm:p-8 rounded-3xl border border-border/60 bg-muted/40">
                    {keyPoints.map((kp, i) => (
                      <div key={i}>
                        <div className="text-[11px] uppercase tracking-[0.18em] font-medium text-muted-foreground/80 mb-1.5">
                          {kp.label}
                        </div>
                        <div className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
                          {kp.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </Suspense>
            </div>
          </section>
        )}

        {/* Body sections — alternating light backgrounds */}
        {sections.map((s, i) => {
          const bg = i % 2 === 1 ? "bg-muted/40" : "";
          const paragraphs = Array.isArray(s.body) ? s.body : [s.body];
          return (
            <section key={i} className={`py-16 md:py-20 ${bg}`}>
              <div className="container max-w-3xl px-5 sm:px-6">
                <Suspense fallback={null}>
                  <ScrollReveal>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-[1.15] tracking-tight mb-6 text-balance">
                      {s.heading}
                    </h2>
                    <div className="space-y-5">
                      {paragraphs.map((p, j) => (
                        <p key={j} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                          {p}
                        </p>
                      ))}
                      {s.bullets && (
                        <ul className="space-y-3 pt-2">
                          {s.bullets.map((b, k) => (
                            <li key={k} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </ScrollReveal>
                </Suspense>
              </div>
            </section>
          );
        })}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="py-16 md:py-20">
            <div className="container max-w-3xl px-5 sm:px-6">
              <Suspense fallback={null}>
                <ScrollReveal>
                  <SectionLabel className="mb-5">FAQ</SectionLabel>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-[1.1] tracking-tight mb-8 text-balance">
                    Common questions
                  </h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {faqs.map((f, i) => (
                      <AccordionItem
                        key={i}
                        value={`faq-${i}`}
                        className="border border-border/60 rounded-2xl px-6 bg-card data-[state=open]:border-primary/40 data-[state=open]:shadow-sm transition-all"
                      >
                        <AccordionTrigger className="text-left font-display font-semibold text-base sm:text-lg py-5 hover:no-underline">
                          {f.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-[15px] leading-relaxed pb-5">
                          {f.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollReveal>
              </Suspense>
            </div>
          </section>
        )}

        {/* Related guides */}
        {related.length > 0 && (
          <section className="py-16 md:py-20 bg-muted/40">
            <div className="container max-w-4xl px-5 sm:px-6">
              <Suspense fallback={null}>
                <ScrollReveal>
                  <SectionLabel className="mb-5">Keep reading</SectionLabel>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-[1.1] tracking-tight mb-8 text-balance">
                    Related guides
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {related.map((r, i) => (
                      <Link
                        key={i}
                        to={r.to}
                        className="group flex items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-[0_18px_50px_-30px_hsl(var(--primary)/0.35)] transition-all"
                      >
                        <span className="font-display font-semibold text-base sm:text-lg text-foreground leading-snug">
                          {r.label}
                        </span>
                        <ArrowRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </ScrollReveal>
              </Suspense>
            </div>
          </section>
        )}

        {/* Product CTA */}
        <section className="container max-w-5xl px-5 sm:px-6 py-12 md:py-16">
          <Suspense fallback={null}>
            <ContentProductCTA
              headline="Put this science to work in your home."
              subtitle="Explore EnviroBiotics devices designed for continuous probiotic purification."
            />
          </Suspense>
        </section>

        <Suspense fallback={null}>
          <div className="container max-w-5xl px-5 sm:px-6 pb-12">
            <RelatedTopics currentPath={path} />
          </div>
        </Suspense>
      </main>

      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
};

export default EducationArticle;
