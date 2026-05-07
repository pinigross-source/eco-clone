import { lazy, Suspense } from "react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
import { Link } from "@/lib/link";
const RelatedTopics = lazy(() => import("@/components/RelatedTopics").then(m => ({ default: m.RelatedTopics })));
const ContentProductCTA = lazy(() => import("@/components/ContentProductCTA").then(m => ({ default: m.ContentProductCTA })));

const CaseStudiesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Case Studies: Probiotic Air Purification Results"
        description="Read documented case studies showing measurable allergen reduction, viral suppression, and pet allergy relief with EnviroBiotics probiotic technology."
        path="/case-studies"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Case Studies", url: "/case-studies" },
            ]),
            {
              "@type": "CollectionPage",
              "@id": "https://envirobiotics.com/case-studies",
              "name": "Case Studies: Probiotic Air Purification Results",
              "description": "Read documented case studies showing measurable allergen reduction, viral suppression, and pet allergy relief with EnviroBiotics probiotic technology.",
              "isPartOf": { "@id": "https://envirobiotics.com/#website" },
            },
          ],
        }}
      />
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
          Case Studies: Real Results from Probiotic Environmental Treatment
        </h1>

        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          These case studies document measurable outcomes from EnviroBiotics deployments, conducted by independent research organizations and universities. Each study follows rigorous scientific protocols with control groups and validated measurements.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Caring for Our Pets: Reducing Atopic Dermatitis in Dogs</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Dogs with atopic skin conditions have fewer species of bacteria on their skin compared to healthy dogs, contributing to a compromised skin barrier, increased itch, and skin odor. A pilot study designed, executed, and analyzed by <strong>Invetus (Yorklea, Australia)</strong> and managed by Orivet Genetic Pet Care evaluated the effects of regular topical application of EnviroBiotics on dogs with atopic dermatitis and their sleeping area over 21 days.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            The EnviroBiotics treatment reduced pruritus incidence by <strong>0.6% per day</strong>, which was statistically significant (p=0.022). Odor assessment decreased by <strong>0.57% daily</strong>. Owners reported a clear reduction of skin and bedding odor, demonstrating relief for both pets and their owners.
          </p>
          <p className="text-sm text-muted-foreground/80 italic">
            Source: Invetus – Yorklea, Australia. A copy of the 79 pages of research is available upon request.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Suppressing COVID-19 on Surfaces: 97.7% Viral Neutralization</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            In experiments carried out at <strong>Genova University's Department of Experimental Medicine</strong>, EnviroBiotics liquids were incubated with SARS-CoV-2 viral particles. Scientists observed and measured the breaking down of the Spike protein: the vehicle for viral attachment to human cells, membrane fusion, and subsequent infection.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Results showed <strong>67% of viruses neutralized within 15 minutes</strong>, with continued exposure for 3 hours increasing neutralization to <strong>97.7%</strong>. Control surfaces showed no spontaneous viral reduction, confirming all reduction was attributed to EnviroBiotics activity. A colony-forming assay validated the virucidal efficiency.
          </p>
          <p className="text-sm text-muted-foreground/80 italic">
            Source: Department of Experimental Medicine, University of Genova, Italy.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Asthma and Allergies Prevention: Eliminating Allergens at the Source</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Modern indoor living fosters the proliferation of allergens such as mold toxins, dust mite protein waste, pet dander, and pollen. EnviroBiotics includes probiotic strains whose Bacillus cells secrete proteolytic enzymes that degrade allergenic proteins, neutralizing them at the source rather than merely treating symptoms.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Studies conducted by <strong>Indoor Biotechnologies</strong> (Cardiff, UK) and <strong>EMSL Analytical Laboratories</strong> (New Jersey, USA) confirmed that EnviroBiotics dramatically decreases allergen concentrations, with a cumulative effect over time. Dr. Sivasankar Baalasubramanian, Executive Director of Indoor Biotechnologies, concluded: <em>"EnviroBiotics can grow and prosper by using allergens as a nutrient source, hence dramatically decreasing the concentration of allergens and reducing the pathogenic effects of ubiquitous indoor allergens on human residents."</em>
          </p>
          <p className="text-sm text-muted-foreground/80 italic">
            Sources: Indoor Biotechnologies (UK/USA/India) and EMSL Analytical Laboratories (New Jersey, USA). <a href="https://ecologicalbalancing.com/wp-content/uploads/2025/01/Allergens-research-by-Indoor-Biotechonlogies.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline">Read the full research</a>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Supporting Scientific Publications</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Independent peer-reviewed research supports the EnviroBiotics approach. Studies published in leading journals demonstrate the risks of chemical disinfectants and the efficacy of probiotic alternatives:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong>Chlorine disinfectants' impact:</strong> Widely used chemical disinfectants provide short-term efficacy at significant cost to people and environment. <a href="https://link.springer.com/article/10.1007/s11356-021-18316-2" target="_blank" rel="noopener noreferrer" className="text-primary underline">Published in Environmental Science and Pollution Research</a>.
            </li>
            <li>
              <strong>Detergent exposure and lung function:</strong> A study of 6,350 adults shows increased exposure to cleaning materials is linked to a decline in lung function. <a href="https://www.atsjournals.org/doi/pdf/10.1164/rccm.201706-1311oc" target="_blank" rel="noopener noreferrer" className="text-primary underline">Published in American Journal of Respiratory and Critical Care Medicine</a>.
            </li>
            <li>
              <strong>Probiotic cleaning in hospitals:</strong> Multi-year deployment of probiotic cleaners in hospitals showed steep decline in nosocomial infections and higher overall hygiene. <a href="https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0148857" target="_blank" rel="noopener noreferrer" className="text-primary underline">Published in PLOS ONE</a>.
            </li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-4 mb-8">
          <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">
            Find Your Solution
          </Link>
          <Link to="/proof-and-trust" className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition">
            View Certifications
          </Link>
        </div>

        <ContentProductCTA
          headline="Get the same results in your home"
          subtitle="Choose an EnviroBiotics device to start reducing allergens, odors, and pathogens on your surfaces."
        />

        <RelatedTopics currentPath="/case-studies" />
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
};

export default CaseStudiesPage;
