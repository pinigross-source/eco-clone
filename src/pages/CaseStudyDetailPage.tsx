import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { Link } from "@/lib/link";
import { Navigate } from "@/lib/router-compat";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { 
  ArrowLeft, 
  ArrowRight, 
  Download, 
  Building2, 
  CheckCircle2, 
  Quote,
  TrendingDown,
  Target,
  Lightbulb,
  BarChart3
} from "lucide-react";
import { 
  getCaseStudyBySlug, 
  getRelatedCaseStudies,
  getCategoryLabel 
} from "@/data/researchData";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const CaseStudyDetailPage = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;
  const relatedStudies = slug ? getRelatedCaseStudies(slug) : [];

  if (!caseStudy || !caseStudy.caseStudyDetail) {
    return <Navigate to="/research" replace />;
  }

  const detail = caseStudy.caseStudyDetail;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${caseStudy.title} | Case Study`}
        description={caseStudy.description}
        path={`/case-studies/${slug}`}
        type="article"
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={caseStudy.image} 
              alt={caseStudy.title}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          </div>
          
          <div className="container relative z-10">
            <ScrollReveal>
              <Link 
                to="/research" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Research
              </Link>
              
              <div className="flex items-center gap-3 mb-6">
                {caseStudy.publishedDate && (
                  <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                    {caseStudy.publishedDate}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6 max-w-4xl">
                {caseStudy.title}
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mb-8">
                {caseStudy.description}
              </p>

              {caseStudy.pdfUrl && (
                <a
                  href={caseStudy.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Full Report
                </a>
              )}
            </ScrollReveal>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {detail.keyMetrics.map((metric, index) => (
                  <div 
                    key={index}
                    className="text-center p-6 bg-card rounded-2xl border border-border/50"
                  >
                    <div className="text-3xl md:text-4xl font-display font-bold text-primary-text mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-foreground mb-1">
                      {metric.label}
                    </div>
                    {metric.change && (
                      <div className="text-xs text-muted-foreground">
                        {metric.change}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="section-padding">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-destructive" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold">
                    The Challenge
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {detail.challenge}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold">
                    The Solution
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {detail.solution}
                </p>

                <h3 className="text-xl font-display font-semibold mb-4">
                  Implementation Timeline
                </h3>
                <div className="space-y-3">
                  {detail.implementation.map((step, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border/50"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-semibold text-primary">{index + 1}</span>
                      </div>
                      <p className="text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Results Section with Chart */}
        <section className="section-padding">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold">
                    The Results
                  </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  {/* Chart */}
                  <div className="bg-card rounded-2xl border border-border/50 p-6">
                    <h3 className="text-lg font-display font-semibold mb-4 text-center">
                      {detail.chartTitle}
                    </h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={detail.chartData}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            axisLine={{ stroke: 'hsl(var(--border))' }}
                          />
                          <YAxis 
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            axisLine={{ stroke: 'hsl(var(--border))' }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '12px'
                            }}
                          />
                          <Legend />
                          <Bar 
                            dataKey="before" 
                            name="Before" 
                            fill="hsl(var(--muted-foreground))" 
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar 
                            dataKey="after" 
                            name="After" 
                            fill="hsl(var(--primary))" 
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Results List */}
                  <div className="space-y-3">
                    {detail.results.map((result, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border/50"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  What They're Saying
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Hear from the people who experienced the transformation firsthand.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {detail.testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <div className="h-full bg-card rounded-2xl border border-border/50 p-6 flex flex-col">
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <blockquote className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="border-t border-border/50 pt-4">
                      <div className="font-semibold text-foreground">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-primary-text mt-1">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Related Case Studies */}
        {relatedStudies.length > 0 && (
          <section className="section-padding">
            <div className="container">
              <ScrollReveal>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-display font-bold">
                    Related Case Studies
                  </h2>
                  <Link 
                    to="/research"
                    className="text-primary-text hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>

              <StaggerContainer className="grid md:grid-cols-2 gap-6">
                {relatedStudies.map((study) => (
                  <StaggerItem key={study.slug}>
                    <Link 
                      to={`/case-studies/${study.slug}`}
                      className="group flex gap-4 bg-card rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <div className="w-32 md:w-48 shrink-0">
                        <img 
                          src={study.image} 
                          alt={study.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="py-4 pr-4 flex flex-col justify-center">
                        <span className="text-xs font-medium text-primary-text mb-2">
                          {getCategoryLabel(study.category)}
                        </span>
                        <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {study.title}
                        </h3>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          Read Case Study
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto p-8 md:p-12 rounded-3xl glass-card border border-primary/20">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  Ready to Achieve Similar Results?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Let's discuss how environmental probiotic technology can transform your space.
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
                    to="/shop"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted transition-colors"
                  >
                    Explore Products
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default CaseStudyDetailPage;
