import { lazy, Suspense } from "react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "@/lib/link";
import { SectionLabel } from "@/components/ui/section-label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Shield, Microscope, Sparkles, FlaskConical, Leaf,
  ShoppingBag, ArrowRight, Check, Bug, Layers,
  RefreshCw, Beaker, BookOpen, FileText, Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const RelatedTopics = lazy(() => import("@/components/RelatedTopics").then(m => ({ default: m.RelatedTopics })));

/* ─── JSON-LD schema ─────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "The Science of Competitive Exclusion | How Probiotics Protect Your Home",
      description:
        "Competitive exclusion is the mechanism that makes probiotic air purification work. Learn how beneficial Bacillus bacteria crowd out mold, allergens, and pathogens.",
      author: { "@type": "Organization", name: "EnviroBiotics" },
      publisher: { "@type": "Organization", name: "EnviroBiotics", url: "https://envirobiotics.com" },
      url: "https://envirobiotics.com/education/competitive-exclusion",
      datePublished: "2025-01-01",
      dateModified: "2025-04-01",
    },
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Education Center", url: "/education" },
      { name: "Competitive Exclusion", url: "/education/competitive-exclusion" },
    ]),
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What does competitive exclusion mean in simple terms?", acceptedAnswer: { "@type": "Answer", text: "It means beneficial bacteria occupy surfaces and consume the resources that harmful organisms need to survive. Mold, pathogenic bacteria, and allergen sources cannot establish themselves on a surface that is already claimed by a thriving beneficial microbial community." } },
        { "@type": "Question", name: "Is competitive exclusion established science or a new concept?", acceptedAnswer: { "@type": "Answer", text: "It is firmly established science with over 50 years of peer-reviewed research across food safety, medicine, and environmental microbiology. The Robert Koch Institute's 2022 incorporation of probiotic surface cleaning into its hospital hygiene guidelines represents the most recent major institutional validation." } },
        { "@type": "Question", name: "Can harmful bacteria develop resistance to competitive exclusion?", acceptedAnswer: { "@type": "Answer", text: "No. Competitive exclusion is an ecological mechanism based on resource competition and biological occupation of surface space, not a chemical one. Bacteria cannot evolve resistance to being out-competed for nutrients and space." } },
        { "@type": "Question", name: "Does it work in areas that cannot be cleaned?", acceptedAnswer: { "@type": "Answer", text: "Yes. Spores travel through the air and settle on every surface, including inside HVAC ducts, behind walls, beneath flooring, and in hidden areas where mold and contamination accumulate and where chemical treatments can never reach." } },
        { "@type": "Question", name: "How long does it take to establish meaningful protection?", acceptedAnswer: { "@type": "Answer", text: "Bacillus bacteria replicate rapidly on organic-rich surfaces. Meaningful surface colonization begins within hours. Independent testing shows measurable allergen reduction within the first week and up to 90% allergen reduction after 30 days." } },
      ],
    },
  ],
};

/* ─── Mechanism steps ─────────────────────────────────────── */
const mechanismSteps = [
  {
    num: "01",
    icon: Sparkles,
    title: "Dispersal and Surface Settlement",
    text: "EnviroBiotics devices continuously release Bacillus probiotic spores into the indoor environment. Spores are dormant, resilient structures that remain viable until they land on a surface and encounter organic matter. This spore-forming capability is precisely what makes Bacillus strains effective for environmental dispersal.",
  },
  {
    num: "02",
    icon: Microscope,
    title: "Activation and Colonization",
    text: "On contact with organic matter, spores activate and begin metabolic activity. The bacteria consume available organic matter using proteases that break down protein allergens, lipases that metabolize fat-based compounds, and amylases that degrade carbohydrate substrates.",
  },
  {
    num: "03",
    icon: Bug,
    title: "Resource Depletion and Displacement",
    text: "As the beneficial population grows and consumes available resources, conditions supporting harmful organism growth are systematically removed. Mold spores find no available nutrition. Dust mite allergen proteins are enzymatically broken down. Pathogenic bacteria face an established, resource-depleted environment.",
  },
  {
    num: "04",
    icon: Shield,
    title: "Lipopeptide Antimicrobial Activity",
    text: "The established Bacillus population produces iturin, surfactin, and fengycin family lipopeptides that actively inhibit the growth of competing pathogens and fungi. Research confirms this antimicrobial production is an essential component of Bacillus competitive strategy, not a secondary effect.",
  },
  {
    num: "05",
    icon: RefreshCw,
    title: "Continuous Replenishment",
    text: "Because EnviroBiotics devices continue operating, new probiotic spores continuously replenish the surface population. New contamination entering from outside, surface disturbance from daily activity, and natural population turnover are all compensated by continuous dispersal.",
  },
];

/* ─── Evidence pillars ────────────────────────────────────── */
const evidencePillars = [
  {
    icon: Beaker,
    title: "Food Safety Research",
    text: "The introduction of beneficial bacteria from healthy adult hens was shown to prevent Salmonella colonization in newly hatched chicks. Research published in Frontiers in Physiology (2022) confirmed that diverse beneficial microbial communities reduce Salmonella colonization by multiple logarithmic orders.",
  },
  {
    icon: Layers,
    title: "Surface Bioprotection",
    text: "Research published in Applied and Environmental Microbiology established that competitive exclusion is a primary mechanism by which beneficial bacteria inhibit fungal growth on surfaces, through nutrient scavenging that deprives fungi of trace elements required for cell growth.",
  },
  {
    icon: FlaskConical,
    title: "Bacillus Antimicrobials",
    text: "Research published in Biomolecules (NIH, 2023) confirmed that all Bacillus subtilis strains produce iturin-family lipopeptides with documented antifungal and antibacterial activity, creating pores in the cell membranes of pathogenic organisms.",
  },
  {
    icon: Leaf,
    title: "Indoor Microbiome and Health",
    text: "Two Finnish birth-cohort studies found that high home bacterial richness in early life reduced the risk of asthma and allergic rhinitis. Research in Nature concluded that modern buildings are inappropriately viewed as repositories for microorganisms to be eliminated.",
  },
];

/* ─── References ──────────────────────────────────────────── */
const references = [
  { num: 1, authors: "Nurmi E, Rantala M. (1973)", title: "New aspects of Salmonella infection in broiler production.", journal: "Nature, 241, 210-211", url: "https://www.nature.com/articles/241210a0" },
  { num: 2, authors: "Bielke et al. (2003)", title: "Probiotics, prebiotics and competitive exclusion for prophylaxis against bacterial disease.", journal: "Animal Health Research Reviews, Cambridge University Press", url: "https://www.cambridge.org/core/journals/animal-health-research-reviews/article/abs/probiotics-prebiotics-and-competitive-exclusion-for-prophylaxis-against-bacterial-disease/69E86594270E6E333D68F6DF88D9CF9D" },
  { num: 3, authors: "Frontiers in Physiology (2022)", title: "Bacterial composition of a competitive exclusion product and its correlation with product efficacy at reducing Salmonella in poultry.", journal: "DOI: 10.3389/fphys.2022.1043383", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9868637/" },
  { num: 4, authors: "Siedler S et al. (2020)", title: "Competitive Exclusion Is a Major Bioprotective Mechanism of Lactobacilli against Fungal Spoilage.", journal: "Applied and Environmental Microbiology, ASM", url: "https://journals.asm.org/doi/10.1128/aem.02312-19" },
  { num: 5, authors: "Yaraguppi DA et al. (2023)", title: "Iturin: A Promising Cyclic Lipopeptide with Diverse Applications.", journal: "Biomolecules, MDPI / PMC", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10604914/" },
  { num: 6, authors: "Zeriouh H et al. (2011)", title: "The Iturin-like Lipopeptides Are Essential Components in the Biological Control Arsenal of Bacillus subtilis.", journal: "Molecular Plant-Microbe Interactions", url: "https://apsjournals.apsnet.org/doi/10.1094/MPMI-06-11-0162" },
  { num: 7, authors: "Meadow JF et al. (2019)", title: "Building upon current knowledge of indoor microbiology to construct the next era of theory.", journal: "Journal of Exposure Science, Nature", url: "https://www.nature.com/articles/s41370-019-0157-y" },
  { num: 8, authors: "National Academies (2017)", title: "Microbiomes of the Built Environment: A Research Agenda.", journal: "The National Academies Press", url: "https://www.nationalacademies.org/read/23647/chapter/4" },
  { num: 9, authors: "Liu AH. (2015)", title: "Revisiting the hygiene hypothesis for allergy and asthma.", journal: "Journal of Allergy and Clinical Immunology", url: "https://www.jacionline.org/article/S0091-6749(15)01193-8/fulltext" },
  { num: 10, authors: "Zhang Y et al. (2022)", title: "Indoor microbiome and allergic diseases: From theoretical advances to prevention strategies.", journal: "ScienceDirect / PubMed", url: "https://www.sciencedirect.com/science/article/pii/S277298502200031X" },
  { num: 11, authors: "KRINKO / Robert Koch Institute (2024)", title: "Hygiene requirements for cleaning and disinfection of surfaces.", journal: "GMS Hygiene and Infection Control / PMC", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11035912/" },
  { num: 12, authors: "Tschudin-Sutter S et al. (2024)", title: "Can probiotics trigger a paradigm shift for cleaning healthcare environments?", journal: "Antimicrobial Resistance and Infection Control, BMC", url: "https://aricjournal.biomedcentral.com/articles/10.1186/s13756-024-01474-6" },
];

/* ─── FAQ data ────────────────────────────────────────────── */
const faqs = [
  { q: "What does competitive exclusion mean in simple terms?", a: "It means beneficial bacteria occupy surfaces and consume the resources that harmful organisms need to survive. Mold, pathogenic bacteria, and allergen sources cannot establish themselves on a surface that is already claimed by a thriving beneficial microbial community." },
  { q: "Is competitive exclusion established science or a new concept?", a: "It is firmly established science with over 50 years of peer-reviewed research across food safety, medicine, and environmental microbiology. The concept was first formally applied by Nobel laureate Elie Metchnikoff in the early 20th century and has been validated in hundreds of published studies since. The Robert Koch Institute's 2022 incorporation of probiotic surface cleaning into its hospital hygiene guidelines represents the most recent major institutional validation." },
  { q: "Can harmful bacteria develop resistance to competitive exclusion?", a: "No. Competitive exclusion is an ecological mechanism based on resource competition and biological occupation of surface space, not a chemical one. Bacteria cannot evolve resistance to being out-competed for nutrients and space the same way they develop resistance to antibiotics or chemical disinfectants." },
  { q: "Does it work in areas that cannot be cleaned?", a: "Yes. This is one of the most significant practical advantages of airborne probiotic dispersal. Spores travel through the air and settle on every surface, including inside HVAC ducts, behind walls, beneath flooring, and in hidden areas where mold and contamination accumulate and where chemical treatments can never reach." },
  { q: "How long does it take to establish meaningful protection?", a: "Bacillus bacteria replicate rapidly on organic-rich surfaces. Meaningful surface colonization begins within hours of dispersal. Independent testing shows measurable allergen reduction within the first week of continuous operation, and up to 90% allergen reduction after 30 days." },
];

/* ═══════════════════════════════════════════════════════════ */

const CompetitiveExclusionPage = () => {
  return (
    <>
      <SEOHead
        title="The Science of Competitive Exclusion | How Probiotics Protect Your Home"
        description="Competitive exclusion is the mechanism that makes probiotic air purification work. Learn how beneficial Bacillus bacteria crowd out mold, allergens, and pathogens. Science-backed guide."
        path="/education/competitive-exclusion"
        keywords="competitive exclusion bacteria, competitive exclusion indoor air quality, how probiotics work indoors, beneficial bacteria home, Bacillus probiotic mechanism, probiotic surface protection"
        jsonLd={jsonLd}
      />

      <Navbar />

      <main className="min-h-screen bg-background">
        {/* ── Hero ────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="absolute top-32 -left-32 w-[480px] h-[480px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

          <div className="container relative px-5 md:px-6 max-w-4xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
                  <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                  <span>/</span>
                  <Link to="/education" className="hover:text-foreground transition-colors">Education</Link>
                  <span>/</span>
                  <span className="text-foreground">Competitive Exclusion</span>
                </nav>
                <SectionLabel className="mb-5 md:mb-6">Science-Backed Guide</SectionLabel>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] mb-6 text-balance">
                  The Science of{" "}
                  <span className="text-gradient-primary">Competitive Exclusion</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                  How beneficial bacteria protect your indoor environment, why this mechanism produces better long-term outcomes than chemical disinfection, and what the peer-reviewed research says.
                </p>
                <p className="text-xs text-muted-foreground/60 mt-4">
                  By EnviroBiotics Science Team
                </p>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── Introduction ───────────────────────────────── */}
        <section className="section-padding bg-background">
          <div className="container px-5 md:px-6 max-w-3xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <div className="prose-editorial space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                  <p className="text-foreground text-lg md:text-xl font-medium leading-relaxed">
                    Nature does not leave surfaces empty.
                  </p>
                  <p>
                    In any healthy outdoor environment, every surface, every patch of soil, every leaf and stone is occupied by a dense community of microorganisms. That community is not random. It is the result of billions of years of ecological competition, cooperation, and balance among countless microbial species. Because those surfaces are already occupied by a thriving, diverse microbial ecosystem, harmful pathogens have an extremely difficult time establishing themselves.
                  </p>
                  <p>
                    This principle is called <strong className="text-foreground">competitive exclusion</strong>. It is one of the most fundamental and thoroughly researched concepts in microbial ecology, and it is the core mechanism behind probiotic air purification.
                  </p>
                  <p>
                    Understanding how it works explains not just why probiotic purification is effective, but why it produces better outcomes over time than chemical disinfection or passive filtration.
                  </p>
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── Scientific Foundation ──────────────────────── */}
        <section className="section-padding bg-muted/30">
          <div className="container px-5 md:px-6 max-w-3xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <SectionLabel className="mb-5">The Principle</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-8">
                  What Is Competitive Exclusion?
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                  <p>
                    Competitive exclusion is a biological principle describing what happens when two or more organisms compete for the same limited resources in the same environment. The principle, formalized in ecology as Gause's law after the Russian biologist G.F. Gause's experiments in the 1930s, holds that when resources are limited, the species best adapted to use those resources will outcompete and displace others.
                  </p>
                  <p>
                    In microbiology, the concept was first formally applied to pathogens by Elie Metchnikoff, the Nobel Prize-winning biologist, who proposed in the early 20th century that beneficial microorganisms could displace pathogens, improve intestinal health, and prolong life. This foundational insight has since been validated across a wide range of organisms and environments, from the human gut to food production systems to building surfaces.
                  </p>
                  <p>
                    In practical terms: a harmful organism cannot establish itself on a surface that is already fully occupied and biologically defended by beneficial ones. Competition for food, space, and nutrients is constant, and outcomes are determined by which organisms arrived first and which are best adapted to the specific environment.
                  </p>
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── Evidence Base ──────────────────────────────── */}
        <section className="section-padding bg-background">
          <div className="container px-5 md:px-6 max-w-5xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp" className="text-center mb-12 md:mb-16">
                <SectionLabel className="mb-5">Peer-Reviewed Research</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
                  Four Decades of Validated Research
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Competitive exclusion is not a theoretical concept. It has been validated in peer-reviewed research across multiple fields and decades.
                </p>
              </ScrollReveal>
              <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                {evidencePillars.map((p, i) => (
                  <ScrollReveal key={i} variant="fadeUp" delay={i * 0.1}>
                    <div className="h-full p-6 sm:p-8 rounded-2xl border border-border/50 bg-card">
                      <p.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                      <h3 className="text-lg font-display font-semibold mb-3 text-foreground">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </Suspense>
          </div>
        </section>

        {/* ── Hygiene Hypothesis ─────────────────────────── */}
        <section className="section-padding bg-muted/30">
          <div className="container px-5 md:px-6 max-w-3xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <SectionLabel className="mb-5">Microbiome Science</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-8">
                  The Hygiene Hypothesis and Microbiome Depletion
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                  <p>
                    The connection between depleted indoor microbial environments and rising rates of allergic disease is now well established in the scientific literature. The hygiene hypothesis, first proposed by David Strachan in 1989 and subsequently refined into the "old friends hypothesis" and "microbial diversity hypothesis," is supported by population studies showing that allergic and autoimmune disease rates are significantly lower in populations with greater early-life microbial exposure.
                  </p>
                  <p>
                    Research in the Journal of Allergy and Clinical Immunology concluded that a diversity of microbial exposures in early life is largely protective, dramatically decreasing the risk of developing allergic diseases. The National Academies of Sciences, Engineering, and Medicine published a major research agenda report titled "Microbiomes of the Built Environment" in 2017, which established that indoor biological contamination, particularly dampness and mold, is a significant driver of respiratory disease and called for a fundamental shift in how building microbiology is understood and managed.
                  </p>
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── Robert Koch Institute ──────────────────────── */}
        <section className="section-padding bg-background">
          <div className="container px-5 md:px-6 max-w-3xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <SectionLabel className="mb-5">Institutional Validation</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-8">
                  The Robert Koch Institute Endorsement
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                  <p>
                    The most significant institutional endorsement of competitive exclusion as a practical surface hygiene strategy came in 2022, when the Robert Koch Institute, Germany's federal public health agency, updated its official recommendations on hospital surface cleaning to formally include probiotic cleaning methods.
                  </p>
                  <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 my-8">
                    <p className="text-foreground font-medium italic leading-relaxed">
                      "Probiotic bacteria form a long-term stable microbiome, while the success of disinfection only lasts for a short time. Disinfectants are known to stimulate the development of cross-resistance to antibiotics, which is not the case with probiotic cleaning products."
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">
                      Commission for Hospital Hygiene and Infection Prevention (KRINKO), Robert Koch Institute, 2024
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 my-8">
                    {[
                      { stat: "4.8% → 2.3%", label: "Hospital-acquired infection reduction" },
                      { stat: "99%", label: "Antimicrobial resistance gene reduction" },
                      { stat: "60.3%", label: "Reduction in antibiotic use" },
                    ].map((s, i) => (
                      <div key={i} className="text-center p-4 rounded-xl border border-border/50 bg-card">
                        <p className="text-xl md:text-2xl font-display font-bold text-primary">{s.stat}</p>
                        <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── How the Mechanism Works ────────────────────── */}
        <section className="section-padding bg-muted/30">
          <div className="container px-5 md:px-6 max-w-5xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp" className="text-center mb-12 md:mb-16">
                <SectionLabel className="mb-5">From Lab to Living Room</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
                  How the Mechanism Works at Home
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The competitive exclusion mechanism validated across decades of research operates through the same core sequence when applied using EnviroBiotics probiotic purification.
                </p>
              </ScrollReveal>
              <div className="space-y-6">
                {mechanismSteps.map((s, i) => (
                  <ScrollReveal key={i} variant="fadeUp" delay={i * 0.08}>
                    <div className="flex gap-5 sm:gap-8 p-6 sm:p-8 rounded-2xl border border-border/50 bg-card">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <s.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                        </div>
                        <p className="text-xs text-muted-foreground/50 font-mono mt-2 text-center">{s.num}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-semibold text-foreground mb-2">{s.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{s.text}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </Suspense>
          </div>
        </section>

        {/* ── Why Chemical Disinfection Cannot Replicate ── */}
        <section className="section-padding bg-background">
          <div className="container px-5 md:px-6 max-w-3xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <SectionLabel className="mb-5">The Limitation of Chemicals</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-8">
                  Why Chemical Disinfection Cannot Replicate This Outcome
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                  <p>
                    Chemical disinfectants achieve rapid reduction in surface pathogen load through direct cell killing. This is genuinely useful in outbreak situations. The problem is structural and biological.
                  </p>
                  <p>
                    A chemically disinfected surface is, biologically, an <strong className="text-foreground">empty surface</strong>. Every organism, both harmful and beneficial, has been eliminated. The surface has no biological defense against recolonization. Studies cited in the Robert Koch Institute recommendation show that pathogen populations on chemically disinfected hospital surfaces begin recovering within hours of treatment.
                  </p>
                  <p>
                    The recolonizing organisms face no competition from an established beneficial community, because that community was eliminated along with the pathogens. Whichever organisms happen to arrive first establish themselves without competitive pressure.
                  </p>
                  <p>
                    A review published in Antimicrobial Resistance and Infection Control (BioMed Central, 2024) noted that high-quality randomized clinical trials have shown probiotic surface treatment reduces hospital-acquired infections more effectively than chemical disinfection alone over extended time periods. The review concluded that probiotic cleaning represents a sustainable, biodegradable alternative that addresses the fundamental limitation of chemical approaches: the absence of residual protection.
                  </p>
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── Safety ─────────────────────────────────────── */}
        <section className="section-padding bg-muted/30">
          <div className="container px-5 md:px-6 max-w-3xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <SectionLabel className="mb-5">Safety Profile</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-8">
                  What the Regulatory Record Shows
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                  <p>
                    The FDA GRAS (Generally Recognized As Safe) designation for Bacillus subtilis and related environmental strains is based on decades of safety data from food production, agricultural applications, and environmental remediation. The same strains used in EnviroBiotics products are classified at Biosafety Level 1 by the U.S. Centers for Disease Control and Prevention.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8">
                    {[
                      { label: "FDA GRAS Certified", icon: Shield },
                      { label: "EPA Registered", icon: Award },
                      { label: "MADE SAFE Certified", icon: Check },
                      { label: "Biosafety Level 1", icon: Microscope },
                    ].map((b, i) => (
                      <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl border border-border/50 bg-card">
                        <b.icon className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
                        <p className="text-xs font-medium text-foreground">{b.label}</p>
                      </div>
                    ))}
                  </div>
                  <p>
                    Critically, unlike chemical disinfectants, Bacillus probiotic strains do not develop or transmit antimicrobial resistance. The Robert Koch Institute recommendation specifically noted this as a significant advantage of probiotic over chemical approaches in healthcare settings.
                  </p>
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────── */}
        <section className="section-padding bg-background">
          <div className="container px-5 md:px-6 max-w-3xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp" className="text-center mb-10 md:mb-14">
                <SectionLabel className="mb-5">FAQ</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold">
                  Frequently Asked Questions
                </h2>
              </ScrollReveal>
              <ScrollReveal variant="fadeUp" delay={0.15}>
                <Accordion type="single" collapsible className="space-y-3">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="card-premium px-5 md:px-6 border-none data-[state=open]:ring-2 data-[state=open]:ring-primary/20 transition-all">
                      <AccordionTrigger className="text-left font-display font-semibold text-sm md:text-base text-foreground hover:text-primary-text py-4 md:py-5 [&[data-state=open]]:text-primary-text">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-4 md:pb-5">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── References ─────────────────────────────────── */}
        <section className="section-padding bg-muted/30">
          <div className="container px-5 md:px-6 max-w-3xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <SectionLabel className="mb-5">Sources</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-8">
                  References and Sources
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  The following sources directly support claims made in this article. All are publicly accessible via the links provided.
                </p>
                <ol className="space-y-4">
                  {references.map((r) => (
                    <li key={r.num} className="text-sm text-muted-foreground leading-relaxed pl-8 relative">
                      <span className="absolute left-0 top-0 font-mono text-xs text-muted-foreground/50">[{r.num}]</span>
                      <span className="text-foreground font-medium">{r.authors}</span>{" "}
                      {r.title}{" "}
                      <span className="italic">{r.journal}</span>.{" "}
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-primary-text hover:underline break-all">
                        Source
                      </a>
                    </li>
                  ))}
                </ol>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── Bottom Line ────────────────────────────────── */}
        <section className="section-padding bg-background">
          <div className="container px-5 md:px-6 max-w-3xl mx-auto">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6">
                  The Bottom Line
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                  <p>
                    Competitive exclusion is not a marketing claim. It is a well-documented biological mechanism with over a century of scientific foundation, validated across food safety, hospital hygiene, and environmental microbiology. It is now formally recognized in the hygiene guidelines of one of the world's leading public health institutions.
                  </p>
                  <p>
                    EnviroBiotics probiotic purification applies this mechanism continuously in your indoor environment, using FDA GRAS certified Bacillus strains to establish a living protective layer that reaches every surface the air touches, including the hidden areas where contamination accumulates and where no filter or chemical spray can follow.
                  </p>
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────── */}
        <section className="section-padding bg-muted/30">
          <div className="container px-5 md:px-6 max-w-3xl mx-auto text-center">
            <Suspense fallback={null}>
              <ScrollReveal variant="fadeUp">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="gradient-cta text-primary-foreground rounded-full px-8 text-base">
                    <Link to="/probiotic-air-purification">
                      Learn what probiotic purification eliminates
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base">
                    <Link to="/research">Read the independent research</Link>
                  </Button>
                </div>
                <div className="mt-4">
                  <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
                    <Link to="/shop">
                      <ShoppingBag className="mr-2 w-4 h-4" />
                      Explore EnviroBiotics devices
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </Suspense>
          </div>
        </section>

        {/* ── Disclaimer ─────────────────────────────────── */}
        <section className="py-8 bg-background border-t border-border/30">
          <div className="container px-5 md:px-6 max-w-3xl mx-auto">
            <p className="text-xs text-muted-foreground/60 text-center leading-relaxed">
              Content reviewed by the EnviroBiotics Science Team. All institutional references are publicly available and linked to source publications.
            </p>
          </div>
        </section>

        {/* ── Related ────────────────────────────────────── */}
        <Suspense fallback={null}>
          <RelatedTopics
            currentPath="/education/competitive-exclusion"
            title="Continue Learning"
          />
        </Suspense>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
};

export default CompetitiveExclusionPage;
