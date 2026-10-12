import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Globe, 
  ShieldCheck, 
  FlaskConical, 
  Heart,
  Leaf,
  Users,
  Home,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { RelatedTopics } from "@/components/RelatedTopics";

const companyValues = [
  {
    icon: FlaskConical,
    title: "Science Backed",
    description: "Our approach is rooted in microbiology and validated through third party testing.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description: "Safe for children, pets, and long term daily use. Non chemical approach you can trust.",
  },
  {
    icon: Leaf,
    title: "Continuous Care",
    description: "We treat indoor environments as biological systems, not just mechanical ones.",
  },
  {
    icon: Heart,
    title: "People Focused",
    description: "Designed for environments where the health and well-being of those you protect, serve, and care for truly matter.",
  },
];

const whatWeDo = [
  "Treat indoor environments as biological ecosystems, not just mechanical ones",
  "Establish a stable layer of probiotic microflora on surfaces and in HVAC systems",
  "Work continuously, not episodically",
  "Provide set-and-forget automated operations for lasting peace of mind",
];

const whatWeRefuse = [
  "Rely on harsh chemicals",
  "Claim instant disinfection",
  "Replace your cleaning routines",
];

const whereWeWork = [
  { icon: Home, label: "Homes", description: "Single-family homes and apartments" },
  { icon: Building2, label: "Schools", description: "Educational facilities" },
  { icon: Users, label: "Assisted Living", description: "Senior care facilities" },
  { icon: Globe, label: "Public Venues", description: "Large buildings and institutions" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About EnviroBiotics | Probiotic Indoor Environment Technology"
        description="EnviroBiotics pioneers probiotic technology for healthier indoor spaces. Science-backed, safe for families and pets, and trusted by homes and businesses."
        path="/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "About", url: "/about" },
            ]),
          ],
        }}
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-50" />
          <div className="container relative z-10">
            <ScrollReveal>
              <div className="text-center max-w-4xl mx-auto">
                <SectionLabel className="mb-6">About EnviroBiotics</SectionLabel>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
                  Clean That{" "}
                  <span className="text-gradient-primary">Keeps Working</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  EnviroBiotics provides environmental probiotic systems that continuously support cleaner indoor surfaces and HVAC systems by establishing a healthy microbial balance.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <ScrollReveal variant="fadeRight">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-display font-bold">
                    What We Do Differently
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Instead of reacting after contamination appears, we establish a healthy microbial balance that works continuously in the background.
                  </p>
                  
                  <StaggerContainer className="space-y-3">
                    {whatWeDo.map((item, index) => (
                      <StaggerItem key={index}>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border/50">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeLeft" delay={0.2}>
                <div className="space-y-6">
                  <h3 className="text-2xl font-display font-bold">
                    What We Refuse to Do
                  </h3>
                  <p className="text-muted-foreground">
                    We believe in honest, sustainable solutions. That's why we're committed to what we won't do.
                  </p>
                  
                  <StaggerContainer className="space-y-3">
                    {whatWeRefuse.map((item, index) => (
                      <StaggerItem key={index}>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-destructive/5 border border-destructive/20">
                          <span className="w-5 h-5 flex items-center justify-center text-destructive shrink-0">✕</span>
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section-padding">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Our Core Values
                </h2>
                <p className="text-lg text-muted-foreground">
                  Everything we do is guided by principles that put the health and well-being of those you protect, serve, and care for first.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyValues.map((value, index) => (
                <StaggerItem key={index}>
                  <div className="h-full p-6 rounded-2xl glass-card hover:shadow-lg transition-all text-center">
                    <div className="icon-container-lg mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Where We Work */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Where We Make a Difference
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our solutions are trusted worldwide across homes, hospitality, education, sports, and healthcare settings, delivering healthier indoor environments wherever people live, learn, recover, and perform.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whereWeWork.map((place, index) => (
                <StaggerItem key={index}>
                  <div className="h-full p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all text-center">
                    <div className="icon-container mx-auto mb-4">
                      <place.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{place.label}</h3>
                    <p className="text-sm text-muted-foreground">{place.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Products Overview */}
        <section className="section-padding">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Our Solutions
                </h2>
                <p className="text-lg text-muted-foreground">
                  From room-based devices to whole-home HVAC systems, we have solutions for every need.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              <ScrollReveal variant="fadeRight">
                <div className="p-8 rounded-2xl glass-card">
                  <h3 className="text-2xl font-display font-bold mb-4">Room-Based Solutions</h3>
                  <p className="text-muted-foreground mb-4">
                    Probiotic devices designed for individual rooms and spaces.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>BioLogic Mini, Starting at $98</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Biotica 800, Core home solutions</span>
                    </li>
                  </ul>
                  <Button variant="outline" asChild>
                    <a href="/#solutions">
                      View Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeLeft" delay={0.2}>
                <div className="p-8 rounded-2xl glass-card">
                  <h3 className="text-2xl font-display font-bold mb-4">Central HVAC Solution</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive systems that treat your building's respiratory system.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>BA 2080 – Whole home coverage</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>HVAC Series – Commercial grade</span>
                    </li>
                  </ul>
                  <Button variant="outline" asChild>
                    <a href="/hvac">
                      Learn About HVAC
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto p-8 md:p-12 rounded-3xl glass-card border border-primary/20">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Ready to Experience the Difference?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of homes and facilities that have discovered clean that keeps working.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" asChild>
                    <a href="/#solutions">
                      Explore Solutions
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="/support">Contact Support</a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="container max-w-4xl px-4 pb-16">
          <RelatedTopics currentPath="/about" />
        </section>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
};

export default AboutPage;
