import { EducationArticle } from "@/components/EducationArticle";

export default function FdaGrasStatusPage() {
  return (
    <EducationArticle
      category="Safety & science"
      title="Understanding FDA GRAS Status"
      lede="GRAS — Generally Recognized As Safe — is the FDA framework for substances and microbial strains evaluated for their history of safe use. For a probiotic product, GRAS-eligible strain selection is the most important safety signal."
      path="/fda-gras-status"
      seoTitle="What FDA GRAS Status Means for Probiotics | EnviroBiotics Education"
      seoDescription="A clear explanation of the FDA's GRAS framework, what it means for probiotic products, and how EnviroBiotics applies GRAS criteria to strain selection and safety review."
      keyPoints={[
        { label: "GRAS", value: "Generally Recognized As Safe — an FDA framework for evaluating substances with a long history of safe use." },
        { label: "Why it matters", value: "Strain identity and characterization — not marketing language — determine probiotic safety." },
        { label: "How we apply it", value: "EnviroBiotics uses Bacillus strains evaluated under GRAS criteria and reviewed by independent toxicologists." },
      ]}
      sections={[
        {
          heading: "What GRAS actually means",
          body: [
            "GRAS stands for Generally Recognized As Safe. It is an FDA framework originally created for food ingredients, and now widely applied to microbial strains used in food, supplements, and consumer products.",
            "A substance is GRAS when qualified scientific experts conclude — based on published data and established history of safe use — that it is safe under the conditions of its intended use. Strain-level GRAS evaluations include identity confirmation, safety literature review, toxin and virulence factor screening, and antibiotic resistance profiling.",
          ],
        },
        {
          heading: "Why strain selection matters more than category",
          body: 'Not all "Bacillus" or "probiotic" strains are equal. The genus Bacillus contains hundreds of species, ranging from completely benign environmental organisms to known pathogens. Safety lives at the strain level, not the genus level. A reputable probiotic product will name its specific strains, hold deposits in recognized culture collections, and provide the underlying safety documentation.',
          bullets: [
            "Confirmed species and strain identity by whole-genome sequencing",
            "Absence of known toxin and virulence genes",
            "No transferable antibiotic resistance",
            "Documented history of safe use in published literature",
            "Independent toxicology review",
          ],
        },
        {
          heading: "How EnviroBiotics applies the GRAS framework",
          body: [
            "The Bacillus strains in EnviroBiotics were selected specifically for their established safety profile. They have been evaluated under GRAS criteria, sequenced to confirm identity, screened for toxin and virulence factors, and reviewed by independent toxicologists.",
            "Beyond strain selection, the product itself is tested for stability, dispersal characteristics, and residue safety in occupied spaces — including bedrooms, nurseries, and rooms with pets.",
          ],
        },
        {
          heading: "What GRAS does not mean",
          body: "GRAS is a safety designation, not an efficacy guarantee. A GRAS strain is safe to use; whether a product containing that strain works for a specific purpose depends on formulation, delivery, dose, and the testing the manufacturer has done. EnviroBiotics pairs GRAS-eligible strains with independent laboratory testing of allergen and microbial reduction in real indoor environments.",
        },
      ]}
      faqs={[
        {
          q: "Is the EnviroBiotics product itself FDA-approved?",
          a: "FDA does not approve consumer probiotic products in the same way it approves drugs. What matters here is that the underlying strains are evaluated under the FDA's GRAS framework, and that the finished product has been independently tested for safety and performance.",
        },
        {
          q: "How can I tell if a probiotic product is using safe strains?",
          a: "Look for named, sequenced strains rather than generic species labels. Reputable products will identify each strain, reference its deposit in a public culture collection, and provide safety documentation on request.",
        },
      ]}
      related={[
        { label: "Product Testing and Safety", to: "/safety" },
        { label: "How EnviroBiotics Works", to: "/how-it-works" },
        { label: "Probiotic vs. Chemical Disinfection", to: "/probiotic-vs-chemical" },
      ]}
    />
  );
}
