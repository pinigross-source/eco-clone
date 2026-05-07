import { SEOHead, organizationJsonLd, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RelatedTopics } from "@/components/RelatedTopics";
import { Link } from "@tanstack/react-router";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { BookOpen } from "lucide-react";
import { useState, useMemo } from "react";

interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  extendedDescription: string;
  relatedLinks?: { label: string; url: string }[];
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Allergen",
    slug: "allergen",
    definition: "A substance that triggers an immune response in sensitive individuals, causing symptoms like sneezing, itching, or asthma attacks.",
    extendedDescription: "Common indoor allergens include dust mite fecal proteins (Der p 1, Der f 1), pet dander proteins (Fel d 1 from cats, Can f 1 from dogs), mold spores, cockroach fragments, and pollen. These particles settle on surfaces and become airborne when disturbed. Environmental probiotics help reduce allergen levels by enzymatically breaking down allergenic proteins on surfaces.",
    relatedLinks: [
      { label: "Mold & Allergen Reduction", url: "/mold-and-allergens" },
      { label: "Health Benefits", url: "/benefits" },
    ],
  },
  {
    term: "Bacillus Probiotics",
    slug: "bacillus-probiotics",
    definition: "A genus of beneficial, spore-forming bacteria used in environmental probiotic products for air and surface treatment.",
    extendedDescription: "Bacillus species (such as B. subtilis, B. licheniformis, and B. megaterium) are naturally occurring soil bacteria that produce enzymes capable of breaking down organic matter. Their spore-forming ability makes them exceptionally stable during storage and transport. Once dispersed into indoor environments, they germinate and actively compete with harmful microorganisms for resources. All Bacillus strains used by EnviroBiotics are FDA GRAS (Generally Recognized As Safe) certified.",
    relatedLinks: [
      { label: "How It Works", url: "/how-it-works" },
      { label: "Safety & Certifications", url: "/safety" },
    ],
  },
  {
    term: "Biofilm",
    slug: "biofilm",
    definition: "A structured community of microorganisms that adheres to surfaces and is enclosed in a self-produced protective matrix.",
    extendedDescription: "Biofilms form when bacteria attach to surfaces and produce an extracellular polymeric substance (EPS) — a slimy matrix that shields them from cleaning agents, UV light, and immune responses. Biofilms are found on kitchen counters, bathroom tiles, HVAC ductwork, medical devices, and water pipes. They are extremely difficult to remove with conventional cleaning because the EPS matrix protects embedded organisms. Probiotic-based approaches disrupt biofilm communities by competing for surface space and nutrients, gradually weakening the biofilm structure over time.",
    relatedLinks: [
      { label: "Education Center", url: "/education" },
      { label: "HVAC Applications", url: "/hvac-applications" },
    ],
  },
  {
    term: "Biofilm Reduction",
    slug: "biofilm-reduction",
    definition: "The process of disrupting and reducing biofilm formation on surfaces using biological or chemical methods.",
    extendedDescription: "Biofilm reduction is critical in healthcare, food processing, HVAC systems, and residential environments. Traditional methods rely on harsh chemical disinfectants that are temporarily effective but cannot prevent re-formation. Environmental probiotics offer a continuous approach: beneficial bacteria compete with biofilm-forming organisms for surface adhesion sites and nutrients, reducing both the density and persistence of harmful biofilms without chemical residues.",
    relatedLinks: [
      { label: "Research & Studies", url: "/research" },
      { label: "Case Studies", url: "/case-studies" },
    ],
  },
  {
    term: "Competitive Exclusion",
    slug: "competitive-exclusion",
    definition: "An ecological principle where one species outcompetes another for shared resources, limiting the population growth of the weaker competitor.",
    extendedDescription: "In probiotic air and surface treatment, competitive exclusion is the primary mechanism of action. Beneficial Bacillus probiotics are dispersed into indoor environments where they consume the organic nutrients (dust, skin cells, food particles, allergen proteins) that harmful bacteria, mold, and dust mites depend on. By depleting these shared resources, probiotics limit the ability of harmful organisms to reproduce and thrive. This creates a more balanced indoor microbiome without the use of chemical disinfectants.",
    relatedLinks: [
      { label: "How It Works", url: "/how-it-works" },
      { label: "Probiotic Air Purification", url: "/probiotic-air-purification" },
    ],
  },
  {
    term: "Dust Mite",
    slug: "dust-mite",
    definition: "Microscopic arachnids that feed on dead skin cells and thrive in warm, humid indoor environments, producing potent allergens.",
    extendedDescription: "Dust mites (Dermatophagoides pteronyssinus and D. farinae) are among the most common triggers of allergic rhinitis and asthma worldwide. Their fecal pellets contain digestive enzymes (Der p 1, Der f 1) that are powerful allergens. A single gram of household dust can contain up to 500 mites. Dust mites thrive in bedding, upholstered furniture, and carpets. Environmental probiotics help reduce dust mite allergen levels by enzymatically degrading the allergenic proteins on surfaces and competing with mites for organic food sources.",
    relatedLinks: [
      { label: "Mold & Allergen Reduction", url: "/mold-and-allergens" },
    ],
  },
  {
    term: "Environmental Probiotics",
    slug: "environmental-probiotics",
    definition: "Beneficial microorganisms deliberately introduced into indoor environments to improve air and surface quality by suppressing harmful organisms.",
    extendedDescription: "Unlike dietary probiotics (consumed for gut health), environmental probiotics are dispersed into living and working spaces to create a healthier indoor microbiome. They are typically Bacillus-genus bacteria that produce enzymes to break down organic pollutants, allergens, and the nutrient sources that harmful organisms depend on. Environmental probiotics work continuously, treating surfaces, fabrics, HVAC ductwork, and air — areas that traditional air purifiers and cleaning products cannot reach or protect between cleanings.",
    relatedLinks: [
      { label: "How It Works", url: "/how-it-works" },
      { label: "Probiotic Air Purification", url: "/probiotic-air-purification" },
      { label: "Education Center", url: "/education" },
    ],
  },
  {
    term: "EPA Registration",
    slug: "epa-registration",
    definition: "Official registration with the U.S. Environmental Protection Agency, confirming a product has been reviewed for safety and efficacy claims.",
    extendedDescription: "EPA registration is required for products that make antimicrobial or pesticidal claims. The registration process involves submitting toxicology data, product chemistry information, and efficacy studies. EnviroBiotics products carry EPA registration numbers, confirming they meet federal safety standards for use in occupied indoor environments, including homes, schools, offices, and healthcare facilities.",
    relatedLinks: [
      { label: "Safety & Certifications", url: "/safety" },
      { label: "Proof & Trust", url: "/proof-and-trust" },
    ],
  },
  {
    term: "FDA GRAS",
    slug: "fda-gras",
    definition: "Generally Recognized As Safe — an FDA designation indicating a substance is considered safe for its intended use based on scientific consensus.",
    extendedDescription: "The GRAS designation from the U.S. Food and Drug Administration confirms that qualified experts have determined a substance is safe under the conditions of its intended use. For EnviroBiotics' Bacillus probiotic strains, GRAS status means the organisms have a well-documented safety profile and are considered safe for continuous exposure in occupied indoor environments, including around infants, children, pregnant women, and pets.",
    relatedLinks: [
      { label: "Safety & Certifications", url: "/safety" },
    ],
  },
  {
    term: "HEPA Filter",
    slug: "hepa-filter",
    definition: "High-Efficiency Particulate Air filter — a mechanical filter that captures at least 99.97% of airborne particles 0.3 microns or larger.",
    extendedDescription: "HEPA filters are the gold standard for airborne particle filtration and are widely used in hospitals, laboratories, and consumer air purifiers. However, HEPA filters only treat air that passes through them. They cannot address particles that have settled on surfaces, fabrics, or in cracks — where up to 80% of indoor allergens reside. The BA-2080 from EnviroBiotics combines HEPA filtration with probiotic dispersion to address both airborne and surface-level contamination.",
    relatedLinks: [
      { label: "BA-2080 Product", url: "/product/betterair-2080" },
      { label: "Probiotic vs HEPA Comparison", url: "/probiotic-air-purification" },
    ],
  },
  {
    term: "HVAC System",
    slug: "hvac-system",
    definition: "Heating, Ventilation, and Air Conditioning — the ductwork and mechanical systems that distribute air throughout a building.",
    extendedDescription: "HVAC systems are often described as the 'lungs of a building.' They circulate air through supply and return ducts, passing through filters and climate-control units. However, HVAC ductwork can harbor biofilm, mold, and dust buildup that re-contaminates indoor air with every cycle. The eBiotic Pro integrates directly into HVAC systems, continuously dispersing environmental probiotics throughout the entire duct network to treat surfaces inside the system and every room it serves — up to 25,000 sq ft.",
    relatedLinks: [
      { label: "HVAC Solutions", url: "/hvac" },
      { label: "HVAC Applications", url: "/hvac-applications" },
      { label: "eBiotic Pro", url: "/product/ebiotic-pro" },
    ],
  },
  {
    term: "Indoor Air Quality (IAQ)",
    slug: "indoor-air-quality",
    definition: "A measure of the air quality within and around buildings, assessed by the concentration of pollutants, temperature, humidity, and ventilation adequacy.",
    extendedDescription: "The EPA estimates indoor air can be 2–5× more polluted than outdoor air. Poor IAQ contributes to allergies, asthma, headaches, fatigue, and long-term respiratory disease. Sources of indoor air pollution include VOCs from building materials, biological contaminants (mold, bacteria, dust mite allergens), and particulate matter from cooking and pets. Improving IAQ requires addressing both airborne particles and surface-level contamination — which is why EnviroBiotics treats the entire indoor environment, not just filtered air.",
    relatedLinks: [
      { label: "Education Center", url: "/education" },
      { label: "Health Benefits", url: "/benefits" },
    ],
  },
  {
    term: "MADE SAFE Certification",
    slug: "made-safe-certification",
    definition: "A third-party certification verifying a product is made without known toxic chemicals, including carcinogens, endocrine disruptors, and reproductive toxins.",
    extendedDescription: "MADE SAFE is one of the most rigorous non-toxic certifications available for consumer products. It screens ingredients against databases of known harmful substances and requires full ingredient disclosure. EnviroBiotics' MADE SAFE certification confirms our probiotic formulations contain no harmful chemicals, no synthetic fragrances, no ozone-generating compounds, and no substances linked to adverse health effects.",
    relatedLinks: [
      { label: "Safety & Certifications", url: "/safety" },
      { label: "Proof & Trust", url: "/proof-and-trust" },
    ],
  },
  {
    term: "Microbiome",
    slug: "microbiome",
    definition: "The complete community of microorganisms (bacteria, fungi, viruses) living in a specific environment, such as the human gut or an indoor space.",
    extendedDescription: "Every indoor environment has a microbiome — a complex ecosystem of billions of microorganisms on surfaces, in the air, and within HVAC systems. A balanced indoor microbiome, with a healthy proportion of beneficial organisms, supports better air quality and reduces the dominance of harmful pathogens. Environmental probiotics shift the indoor microbiome toward a healthier balance by introducing beneficial Bacillus bacteria that outcompete harmful organisms through competitive exclusion.",
    relatedLinks: [
      { label: "How It Works", url: "/how-it-works" },
      { label: "Education Center", url: "/education" },
    ],
  },
  {
    term: "Mold Spores",
    slug: "mold-spores",
    definition: "Microscopic reproductive units produced by mold fungi that travel through air and can colonize damp surfaces.",
    extendedDescription: "Mold spores are present in virtually every indoor environment. Species like Aspergillus, Cladosporium, Penicillium, and Stachybotrys (black mold) produce spores that become airborne and settle on surfaces. Inhaling mold spores can trigger allergic reactions, asthma attacks, and, in severe cases, fungal infections. Mold thrives in damp, poorly ventilated areas such as bathrooms, basements, and HVAC ductwork. Environmental probiotics compete with mold for surface space and nutrients, helping to suppress mold colonization and reduce airborne spore counts over time.",
    relatedLinks: [
      { label: "Mold & Allergen Reduction", url: "/mold-and-allergens" },
      { label: "Case Studies", url: "/case-studies" },
    ],
  },
  {
    term: "Ozone-Free",
    slug: "ozone-free",
    definition: "A product designation indicating that no ozone (O₃) is produced during operation, avoiding a known respiratory irritant.",
    extendedDescription: "Some air purifiers, particularly those using ionization or UV-C technology, produce ozone as a byproduct. Ozone is a respiratory irritant that can aggravate asthma and other lung conditions. The California Air Resources Board (CARB) requires ozone emission testing for air purifiers sold in California. All EnviroBiotics devices produce zero ozone — they use biological probiotics rather than chemical or electrical processes to improve indoor air quality.",
    relatedLinks: [
      { label: "Safety & Certifications", url: "/safety" },
    ],
  },
  {
    term: "Pet Dander",
    slug: "pet-dander",
    definition: "Microscopic flakes of skin shed by cats, dogs, and other animals that carry allergenic proteins.",
    extendedDescription: "Pet dander contains potent allergenic proteins such as Fel d 1 (cats) and Can f 1 (dogs) that trigger allergic reactions in up to 30% of people with allergies. These particles are extremely small (2.5 microns or less) and remain airborne for hours. They also settle on surfaces, fabrics, and in HVAC ductwork, making them difficult to fully remove with vacuuming or air filtration alone. EnviroBiotics probiotics enzymatically break down dander proteins on surfaces, reducing the allergen load between cleanings.",
    relatedLinks: [
      { label: "Mold & Allergen Reduction", url: "/mold-and-allergens" },
      { label: "Product Use Cases", url: "/product-use-cases" },
    ],
  },
  {
    term: "Probiotic Air Purifier",
    slug: "probiotic-air-purifier",
    definition: "A device that disperses beneficial probiotic bacteria into indoor environments to treat both air and surfaces.",
    extendedDescription: "Unlike traditional air purifiers that use filters to capture airborne particles, probiotic air purifiers take an active approach. They continuously release beneficial Bacillus bacteria that travel with airflow and settle on every surface in a room. These probiotics consume the organic matter that harmful bacteria, mold, and allergens depend on, creating ongoing protection between cleanings. EnviroBiotics offers probiotic air purifiers in multiple formats: the portable BioLogic Mini (300 sq ft), the whole-room Biotica 800 (800 sq ft), the hybrid BA-2080 (2,600 sq ft), and the HVAC-integrated eBiotic Pro (25,000 sq ft).",
    relatedLinks: [
      { label: "Probiotic Air Purification Guide", url: "/probiotic-air-purification" },
      { label: "Shop Products", url: "/shop" },
    ],
  },
  {
    term: "Probiotic Air Purification System",
    slug: "probiotic-air-purification-system",
    definition: "A technology system that uses environmental probiotics for continuous air and surface treatment in indoor spaces.",
    extendedDescription: "A probiotic air purification system goes beyond traditional filtration by deploying living beneficial microorganisms into the environment. The system operates on a timed cycle, automatically dispersing calibrated doses of Bacillus probiotics throughout the day. These organisms settle on surfaces, in fabric fibers, and inside HVAC ductwork — areas that no filter can reach. Through competitive exclusion and enzymatic activity, the probiotic layer continuously suppresses harmful organisms, reduces allergen levels, and neutralizes odors without chemicals or ozone.",
    relatedLinks: [
      { label: "How It Works", url: "/how-it-works" },
      { label: "Probiotic Air Purification", url: "/probiotic-air-purification" },
    ],
  },
  {
    term: "Surface Contamination",
    slug: "surface-contamination",
    definition: "The accumulation of harmful microorganisms, allergens, and organic pollutants on indoor surfaces.",
    extendedDescription: "Research shows that up to 80% of indoor allergens and biological contaminants reside on surfaces — not in the air. Countertops, furniture, bedding, carpets, and HVAC ductwork harbor bacteria, mold, dust mite allergens, and pet dander that re-contaminate the air every time they are disturbed. Traditional cleaning provides temporary relief but contamination returns within hours. Environmental probiotics create a persistent protective layer on surfaces that actively competes with harmful organisms 24/7, extending protection between cleanings.",
    relatedLinks: [
      { label: "Probiotic Air Purification", url: "/probiotic-air-purification" },
      { label: "Product Use Cases", url: "/product-use-cases" },
    ],
  },
  {
    term: "VOC (Volatile Organic Compound)",
    slug: "voc",
    definition: "Chemical gases emitted by building materials, furniture, cleaning products, and paints that can cause health issues at high concentrations.",
    extendedDescription: "VOCs include formaldehyde, benzene, toluene, and hundreds of other compounds found in indoor environments. Sources include new furniture, paint, adhesives, cleaning sprays, and even air fresheners. Long-term exposure to elevated VOC levels can cause headaches, nausea, and damage to liver, kidney, and central nervous system. While HEPA filters cannot capture gaseous VOCs, reducing the overall biological load on surfaces through probiotic treatment helps improve overall indoor environmental quality.",
    relatedLinks: [
      { label: "Education Center", url: "/education" },
      { label: "Indoor Air Quality", url: "/benefits" },
    ],
  },
];

const GlossaryPage = () => {
  const [filter, setFilter] = useState("");

  const filteredTerms = useMemo(() => {
    if (!filter) return glossaryTerms;
    const q = filter.toLowerCase();
    return glossaryTerms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    );
  }, [filter]);

  const letterGroups = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const t of filteredTerms) {
      const letter = t.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(t);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredTerms]);

  const allLetters = useMemo(() => {
    const set = new Set(glossaryTerms.map((t) => t.term[0].toUpperCase()));
    return Array.from(set).sort();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd,
      makeBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Glossary", url: "/glossary" },
      ]),
      {
        "@type": "DefinedTermSet",
        name: "EnviroBiotics Indoor Air Quality & Probiotic Glossary",
        description: "Definitions of key terms related to probiotic air purification, indoor air quality, environmental probiotics, and surface treatment.",
        hasDefinedTerm: glossaryTerms.map((t) => ({
          "@type": "DefinedTerm",
          name: t.term,
          description: t.definition,
          url: `https://envirobiotics.com/glossary#${t.slug}`,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Glossary of Indoor Air Quality & Probiotic Terms"
        description="Learn key terms in probiotic air purification, indoor air quality, competitive exclusion, biofilm reduction, environmental probiotics, allergens, and more. A comprehensive glossary by EnviroBiotics."
        path="/glossary"
        keywords="environmental probiotics glossary, competitive exclusion, biofilm reduction, probiotic air purification, indoor air quality terms, HEPA filter, allergens, dust mites, mold spores, FDA GRAS, probiotic air purifier, IAQ, VOC, pet dander, microbiome, surface contamination"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Glossary</span>
        </nav>

        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Glossary
            </h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            A comprehensive guide to the science and terminology behind <Link to="/probiotic-air-purification" className="text-primary underline hover:text-primary/80">probiotic air purification</Link>, indoor air quality, and <Link to="/education" className="text-primary underline hover:text-primary/80">environmental probiotics</Link>. Understanding these concepts helps you make informed decisions about protecting your indoor environment.
          </p>
        </ScrollReveal>

        {/* Search + Letter nav */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search terms…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <div className="flex flex-wrap gap-2">
            {allLetters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="w-8 h-8 flex items-center justify-center rounded bg-muted text-sm font-semibold text-muted-foreground hover:bg-primary hover:text-primary-foreground transition"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="space-y-10">
          {letterGroups.map(([letter, terms]) => (
            <section key={letter} id={`letter-${letter}`}>
              <h2 className="text-2xl font-bold text-primary mb-4 border-b border-border pb-2">{letter}</h2>
              <div className="space-y-8">
                {terms.map((t) => (
                  <article key={t.slug} id={t.slug} className="scroll-mt-24">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{t.term}</h3>
                    <p className="text-muted-foreground font-medium mb-2">{t.definition}</p>
                    <p className="text-muted-foreground leading-relaxed mb-3">{t.extendedDescription}</p>
                    {t.relatedLinks && (
                      <div className="flex flex-wrap gap-2">
                        {t.relatedLinks.map((rl) => (
                          <Link
                            key={rl.url}
                            to={rl.url}
                            className="text-xs px-3 py-1 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition"
                          >
                            {rl.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No terms match "{filter}". Try a different search.
          </p>
        )}

        <RelatedTopics currentPath="/glossary" />
      </main>
      <Footer />
    </div>
  );
};

export default GlossaryPage;
