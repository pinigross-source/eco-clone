import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { RelatedTopics } from "@/components/RelatedTopics";
import { SectionLabel } from "@/components/ui/section-label";
import { Building2, AlertCircle, Cog, BarChart3, Layers } from "lucide-react";

const HVACApplicationsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="HVAC Probiotic Applications: Whole-Building Treatment"
        description="Learn how EnviroBiotics integrates with HVAC systems to deliver continuous probiotic treatment throughout entire buildings, reducing biofilm, allergens, and odors."
        path="/hvac-applications"
      />
      <Navbar />

      {/* Gradient Hero */}
      <section className="gradient-hero pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionLabel centered className="mb-4 justify-center">HVAC Integration</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            HVAC Probiotic Applications: Whole-Building Air & Surface Treatment
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Heating, ventilation, and air-conditioning systems are designed to circulate air, but they also circulate allergens, mold spores, and bacteria. HVAC ductwork accumulates biofilm that standard filter changes cannot eliminate. EnviroBiotics' HVAC-integrated devices deliver a continuous stream of environmental probiotics through your existing duct system, treating every room from a single installation point.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-4xl space-y-8">

        {/* Card: Ductwork Problem */}
        <div className="card-premium p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="icon-container icon-container-lg shrink-0">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground pt-2">The Ductwork Problem</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed pl-0 md:pl-[4.5rem]">
            <p>
              Studies by the EPA and ASHRAE have found that HVAC ductwork is one of the primary reservoirs for indoor mold and bacterial biofilm. Every time your system runs, it can push contaminated air into living and working spaces. Duct cleaning provides temporary relief, but biofilm regrows within weeks.
            </p>
            <p>
              EnviroBiotics probiotics continuously colonize duct surfaces, competing with and displacing harmful microorganisms. This creates a self-renewing biological treatment that keeps ductwork cleaner between professional services.
            </p>
          </div>
        </div>

        {/* Card: How It Works */}
        <div className="card-premium p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="icon-container icon-container-lg shrink-0">
              <Cog className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground pt-2">How HVAC Integration Works</h2>
          </div>
          <div className="space-y-3 pl-0 md:pl-[4.5rem]">
            {[
              "A compact probiotic dispersion unit is installed in the supply plenum or return air duct.",
              "The device releases metered doses of encapsulated probiotics into the airstream.",
              "Probiotics travel through ductwork, treating interior surfaces as they pass.",
              "Treated air exits through vents, depositing probiotics on room surfaces.",
              "A refill cartridge is replaced every 3 to 6 months depending on system size.",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                  {i + 1}
                </span>
                <p className="text-muted-foreground text-sm pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card: Ideal Applications */}
        <div className="card-premium p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="icon-container icon-container-lg shrink-0">
              <Layers className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground pt-2">Ideal Applications</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 pl-0 md:pl-[4.5rem]">
            {[
              "Residential homes with central HVAC (single or multi-zone)",
              "Medical and dental offices requiring enhanced air quality",
              "Schools and daycare centers",
              "Hotels and hospitality venues",
              "Commercial offices and co-working spaces",
              "Fitness centers and gyms",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <p className="text-muted-foreground text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card: Results */}
        <div className="card-premium p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="icon-container icon-container-lg shrink-0">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground pt-2">Results</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed pl-0 md:pl-[4.5rem]">
            <p>
              Facilities using EnviroBiotics HVAC integration report measurable reductions in airborne particulates, fewer mold-related complaints, and improved occupant satisfaction scores. Review our <Link to="/case-studies" className="text-primary underline">case studies</Link> for documented outcomes.
            </p>
            <p>
              Our HVAC solutions are backed by the same <Link to="/proof-and-trust" className="text-primary underline">safety certifications</Link> as our portable products: FDA GRAS, ISO-certified manufacturing, and third-party lab validation.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-4">
          <Link to="/hvac" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">
            Explore HVAC Solutions
          </Link>
          <Link to="/probiotic-air-purification" className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition">
            Back to Probiotic Air Purification
          </Link>
        </div>

        <RelatedTopics currentPath="/hvac-applications" />
      </main>
      <Footer />
    </div>
  );
};

export default HVACApplicationsPage;
