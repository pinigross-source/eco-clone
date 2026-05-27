import { FileText, Microscope, Building2 } from "lucide-react";
import caseStudyPets from "@/assets/case-study-pets.jpg";
import caseStudyCovid from "@/assets/case-study-covid.jpg";
import caseStudyAllergies from "@/assets/case-study-allergies.jpg";
import researchChlorine from "@/assets/research-chlorine.jpg";
import researchDetergent from "@/assets/research-detergent.jpg";
import researchHospital from "@/assets/research-hospital.jpg";
import researchClinical from "@/assets/research-clinical.jpg";
import researchMicrobial from "@/assets/research-microbial.jpg";
import researchSafety from "@/assets/research-safety.jpg";
export interface ChartDataPoint {
  name: string;
  before: number;
  after: number;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface CaseStudyDetail {
  challenge: string;
  solution: string;
  implementation: string[];
  results: string[];
  chartData: ChartDataPoint[];
  chartTitle: string;
  testimonials: Testimonial[];
  keyMetrics: { label: string; value: string; change?: string }[];
}

export interface ResearchItem {
  slug: string;
  title: string;
  description: string;
  category: "case-study" | "white-paper" | "research";
  image: string;
  imageAlt?: string;
  pdfUrl?: string;
  externalUrl?: string;
  highlights?: string[];
  publishedDate?: string;
  caseStudyDetail?: CaseStudyDetail;
}

export const caseStudies: ResearchItem[] = [
  {
    slug: "caring-for-our-pets",
    title: "Caring for Our Pets: Reducing Atopic Dermatitis in Dogs",
    description: "A study by Invetus (Yorklea, Australia) evaluating whether EnviroBiotics can alleviate pruritus and skin odor in dogs with atopic dermatitis over 21 days.",
    category: "case-study",
    image: caseStudyPets,
    externalUrl: "https://ecologicalbalancing.com/case-study-caring-for-our-pets/",
    highlights: [
      "Statistically significant pruritus reduction",
      "0.6% daily decrease in itch scores",
      "Clear odor reduction reported by owners",
      "21-day study conducted by Invetus, Australia"
    ],
    publishedDate: "2025",
    caseStudyDetail: {
      challenge: "Dogs with atopic skin conditions have fewer species of bacteria on their skin compared to healthy dogs, contributing to a compromised skin barrier, increased itch, and skin odor. Atopic dogs also have a significantly increased risk of developing skin infections (pyoderma). Conventional treatments address symptoms but not the underlying microbial imbalance.",
      solution: "Regular topical application of EnviroBiotics on dogs with atopic dermatitis and their sleeping area over a 21-day study period. The study assessed and measured specific bacteriological cultures, pruritus (itch) scores, and owner perception of bad odor of skin and bedding before, during, and upon termination of the study.",
      implementation: [
        "Study designed, executed, and analyzed by Invetus – Yorklea, Australia",
        "Managed by Orivet Genetic Pet Care, Australia",
        "Regular topical application of EnviroBiotics on affected dogs",
        "Treatment of dogs' sleeping areas alongside direct application",
        "Bacteriological cultures, pruritus scores, and odor assessments measured at multiple intervals"
      ],
      results: [
        "Pruritus incidence reduced by 0.6% per day – statistically significant (p=0.022)",
        "Odor assessment decreased by 0.57% daily",
        "Bacterial culture diversity improved over the study period",
        "Owners reported clear reduction of skin and bedding odor",
        "Results demonstrate relief for both pets and their owners"
      ],
      chartData: [
        { name: "Day 1", before: 5.0, after: 5.0 },
        { name: "Day 7", before: 5.0, after: 4.2 },
        { name: "Day 14", before: 5.0, after: 3.4 },
        { name: "Day 21", before: 5.0, after: 2.5 }
      ],
      chartTitle: "Pruritus (Itch) Score Over 21-Day Study",
      keyMetrics: [
        { label: "Itch Reduction", value: "0.6%/day", change: "statistically significant" },
        { label: "Odor Reduction", value: "0.57%/day", change: "↓" },
        { label: "Study Duration", value: "21 days", change: "controlled" },
        { label: "Significance", value: "p=0.022", change: "validated" }
      ],
      testimonials: [
        {
          quote: "The results demonstrate the likelihood of EnviroBiotics to reduce acute, chronic skin allergies in dogs. The pets' owners reported a clear reduction of odor, indicating relief accomplished not only by humans but also by their pets.",
          author: "Invetus Research Team",
          role: "Veterinary Contract Research Organization",
          company: "Invetus – Yorklea, Australia"
        }
      ]
    }
  },
  {
    slug: "suppress-covid-19-surfaces",
    title: "Suppressing COVID-19 on Surfaces: 97.7% Viral Neutralization",
    description: "A study by the University of Genova demonstrating that EnviroBiotics neutralized 97.7% of SARS-CoV-2 virus on surfaces within 3 hours.",
    category: "case-study",
    image: caseStudyCovid,
    externalUrl: "https://ecologicalbalancing.com/a-new-path-to-suppress-covid-19-on-surfaces/",
    highlights: [
      "67% viral neutralization in 15 minutes",
      "97.7% neutralization within 3 hours",
      "University of Genova study",
      "Spike protein inactivation confirmed"
    ],
    publishedDate: "2025",
    caseStudyDetail: {
      challenge: "SARS-CoV-2 viruses settle on surfaces and objects and can remain potent for up to 2 weeks. Airborne viruses may enter air ducts, circulate across facilities, and land on surfaces in areas the sick person had not visited. Manual disinfecting reaches only a small portion of a property and is extremely short-lived, while delicate objects like fabric, screens, and keyboards are usually untreated with harsh chemicals.",
      solution: "In experiments carried out at Genova University's Department of Experimental Medicine, EnviroBiotics liquids were incubated with SARS-CoV-2 viral particles. Scientists observed and measured the breaking down of the SARS-CoV-2 Spike protein – the vehicle for viral attachment to human cells, membrane fusion, and subsequent infection. Inactivation of the spike protein prevents virus-cell attachment and blocks viral infection.",
      implementation: [
        "Controlled experiments at University of Genova, Department of Experimental Medicine",
        "EnviroBiotics suspension incubated directly with SARS-CoV-2 viral particles",
        "Measurements taken at 15-minute, 1-hour, and 3-hour intervals",
        "Control environments with untreated surfaces run in parallel to validate results",
        "Colony-forming assay used to validate virucidal efficiency"
      ],
      results: [
        "67% of viruses neutralized within 15 minutes",
        "97.7% of viruses neutralized within 3 hours of exposure",
        "Control surfaces showed no spontaneous viral reduction – all reduction attributed to EnviroBiotics",
        "Colony-forming assay confirmed virucidal efficiency with significantly cleared plates",
        "Spike protein inactivation prevents virus-cell attachment and blocks infection",
        "Results applicable to any indoor space including public, health, and transport sectors"
      ],
      chartData: [
        { name: "0 min", before: 100, after: 100 },
        { name: "15 min", before: 100, after: 33 },
        { name: "1 hour", before: 100, after: 12 },
        { name: "3 hours", before: 100, after: 2.3 }
      ],
      chartTitle: "SARS-CoV-2 Viral Survival (% Remaining)",
      keyMetrics: [
        { label: "15-min Kill Rate", value: "67%", change: "neutralized" },
        { label: "3-hour Kill Rate", value: "97.7%", change: "neutralized" },
        { label: "Control Group", value: "Stable", change: "no spontaneous decline" },
        { label: "Conducted By", value: "Univ. Genova", change: "peer-reviewed" }
      ],
      testimonials: [
        {
          quote: "The data demonstrates that the microbial bio-control approach is applicable and efficient in preventing COVID-19 infections originating from contaminated surfaces and objects. Applying EnviroBiotics into indoor areas induces the biological deactivation of viral particles.",
          author: "Department of Experimental Medicine",
          role: "Research Team",
          company: "University of Genova"
        }
      ]
    }
  },
  {
    slug: "asthma-allergies-prevention",
    title: "Asthma and Allergies Prevention: Allergen Elimination at the Source",
    description: "Studies by Indoor Biotechnologies (UK) and EMSL Analytical Labs (USA) proving EnviroBiotics dramatically decreases indoor allergen concentrations.",
    category: "case-study",
    image: caseStudyAllergies,
    externalUrl: "https://ecologicalbalancing.com/Asthma-and-Allergies-Prevention/",
    highlights: [
      "Allergens used as nutrient source by probiotics",
      "Dramatic allergen concentration decrease",
      "Cumulative efficacy over time",
      "Validated by Indoor Biotechnologies, UK"
    ],
    publishedDate: "2025",
    caseStudyDetail: {
      challenge: "Modern indoor living fosters the proliferation of contaminants such as mold toxins, dust mite protein waste, pet dander, cockroach waste, and pollen. These allergens trigger allergic attacks. Common remedies – medications and inhalation devices – reduce pain and inflammation but are blind to the root cause. Without dealing with the source, sensitive individuals are bound for continuous suffering.",
      solution: "EnviroBiotics formula includes probiotic strains that consume allergens as a nutrient source. Bacillus cells secrete proteolytic enzymes that degrade the proteins composing allergenic epitopes, neutralizing them and rendering them harmless. This targets the root cause of allergies rather than just the symptoms.",
      implementation: [
        "Primary study conducted by Indoor Biotechnologies (Cardiff, UK; Charlottesville, VA; Bangalore, India)",
        "Supervised by Dr. Sivasankar Baalasubramanian, Executive Director",
        "8-day application period with controlled measurements",
        "Additional study at EMSL Analytical Laboratories, New Jersey",
        "Longer period simulation to confirm cumulative efficacy"
      ],
      results: [
        "EnviroBiotics dramatically decreased allergen concentrations",
        "Probiotics grow and prosper using allergens as a nutrient source",
        "Cumulative effect observed – efficacy increases over time",
        "Longer treatment periods indicate allergens could fall below detectable levels",
        "Proteolytic enzymes neutralize allergenic epitopes, rendering them harmless",
        "Validated by two independent laboratories across multiple countries"
      ],
      chartData: [
        { name: "Day 1", before: 100, after: 100 },
        { name: "Day 3", before: 100, after: 72 },
        { name: "Day 5", before: 100, after: 48 },
        { name: "Day 8", before: 100, after: 22 }
      ],
      chartTitle: "Allergen Concentration (% of Baseline)",
      keyMetrics: [
        { label: "Allergen Reduction", value: "Dramatic", change: "cumulative" },
        { label: "Mechanism", value: "Enzymatic", change: "proteolytic" },
        { label: "Labs Involved", value: "2", change: "independent" },
        { label: "Validated By", value: "Indoor Biotech", change: "UK/USA/India" }
      ],
      testimonials: [
        {
          quote: "EnviroBiotics can grow and prosper by using allergens as a nutrient source, hence dramatically decreasing the concentration of allergens and reducing the pathogenic effects of ubiquitous indoor allergens on human residents.",
          author: "Dr. Sivasankar Baalasubramanian",
          role: "Executive Director",
          company: "Indoor Biotechnologies"
        }
      ]
    }
  },
];
export const whitePapers: ResearchItem[] = [
  {
    slug: "chlorine-disinfectants-impact",
    title: "Chlorine Disinfectants' Impact on People and Environment",
    description: "Chlorine-based disinfectants are widely used but offer only short-term efficacy at a huge cost to people and their environment. Other disinfectants show similar risks.",
    category: "white-paper",
    image: researchChlorine,
    externalUrl: "https://link.springer.com/article/10.1007/s11356-021-18316-2",
    publishedDate: "2021"
  },
  {
    slug: "detergent-exposure-lung-function",
    title: "Impact of Exposure to Detergents on Lung Function",
    description: "A study of 6,350 adults shows that increased exposure to cleaning materials is linked to a decline in lung function and respiratory health.",
    category: "white-paper",
    image: researchDetergent,
    externalUrl: "https://www.atsjournals.org/doi/pdf/10.1164/rccm.201706-1311oc",
    publishedDate: "2018"
  },
  {
    slug: "probiotic-cleaning-hospitals",
    title: "Probiotic Cleaning in Hospitals: Multi-Year Study",
    description: "Probiotic cleaners deployed in hospitals showed a steep decline in nosocomial infections and much higher overall hygiene levels over multiple years.",
    category: "white-paper",
    image: researchHospital,
    externalUrl: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0148857",
    publishedDate: "2016"
  },
];

export const researchPapers: ResearchItem[] = [
  {
    slug: "caselli-2018-plos-one",
    title: "Reducing Healthcare-Associated Infections with Bacillus-Based Cleaning (PLOS ONE, 2018)",
    description: "Caselli E. et al. Multicentre prospective intervention study showing a probiotic-based sanitation system (PCHS) using Bacillus spp. reduced healthcare-associated infections by ~52% versus conventional disinfectants across six hospitals.",
    category: "research",
    image: researchClinical,
    externalUrl: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0199616",
    publishedDate: "2018",
  },
  {
    slug: "daccolti-2021-microorganisms",
    title: "Probiotic-Based Sanitation Controls Antibiotic Resistance in the Built Environment (Microorganisms, 2021)",
    description: "D'Accolti M. et al. Demonstrates that continuous application of Bacillus-based probiotic cleaning significantly lowers pathogen load and the spread of antimicrobial resistance genes on indoor surfaces.",
    category: "research",
    image: researchMicrobial,
    externalUrl: "https://www.mdpi.com/2076-2607/9/2/225",
    publishedDate: "2021",
  },
  {
    slug: "vandini-2014-plos-one",
    title: "Hard-Surface Biocontrol in Hospitals Using Bacillus Probiotic Cleaners (PLOS ONE, 2014)",
    description: "Vandini A. et al. Showed stable, long-term reductions of S. aureus, E. coli, Candida albicans and other pathogens on hospital surfaces treated with a Bacillus subtilis / pumilus / megaterium formulation — competitive exclusion confirmed across an 8-week trial.",
    category: "research",
    image: researchSafety,
    externalUrl: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0108598",
    publishedDate: "2014",
  },
  {
    slug: "safety-profile-analysis",
    title: "Long term Safety Profile of Environmental Probiotics",
    description: "Comprehensive safety analysis of Bacillus based probiotic strains used in indoor environmental applications.",
    category: "research",
    image: researchSafety,
    externalUrl: "https://ecologicalbalancing.com/research-case-studies/",
    publishedDate: "2024"
  },
];

export const getCategoryIcon = (category: ResearchItem["category"]) => {
  switch (category) {
    case "case-study":
      return Building2;
    case "white-paper":
      return FileText;
    case "research":
      return Microscope;
    default:
      return FileText;
  }
};

export const getCategoryLabel = (category: ResearchItem["category"]) => {
  switch (category) {
    case "case-study":
      return "Case Study";
    case "white-paper":
      return "White Paper";
    case "research":
      return "Research";
    default:
      return category;
  }
};

export const getAllResearch = (): ResearchItem[] => {
  return [...caseStudies, ...whitePapers, ...researchPapers];
};

export const getCaseStudyBySlug = (slug: string): ResearchItem | undefined => {
  return caseStudies.find(study => study.slug === slug);
};

export const getRelatedCaseStudies = (currentSlug: string, limit: number = 2): ResearchItem[] => {
  return caseStudies.filter(study => study.slug !== currentSlug).slice(0, limit);
};
