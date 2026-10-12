import { EducationArticle } from "@/components/EducationArticle";

export default function HygieneHypothesisPage() {
  return (
    <EducationArticle
      category="Indoor microbiome"
      title="The Hygiene Hypothesis Explained"
      lede="Reduced exposure to beneficial environmental microbes  especially in early childhood  may disrupt how the immune system develops. The issue is not dirt. It is the loss of microbial diversity in the places we spend most of our lives."
      path="/hygiene-hypothesis"
      seoTitle="The Hygiene Hypothesis Explained | EnviroBiotics Education"
      seoDescription="What the hygiene hypothesis actually says, what the research has found since it was proposed in 1989, and why microbial diversity in the home matters for immune development."
      keyPoints={[
        { label: "The idea", value: "Lower exposure to environmental microbes is associated with higher rates of allergies and immune dysfunction." },
        { label: "What it isn't", value: "It is not a license to skip cleaning or hygiene. It is about diversity, not dirt." },
        { label: "What helps", value: "Restoring beneficial microbes indoors  without the disease-carrying ones  is the modern application." },
      ]}
      sections={[
        {
          heading: "What the hygiene hypothesis actually proposes",
          body: [
            "The hygiene hypothesis was first proposed by epidemiologist David Strachan in 1989. He noticed that children from larger families  with more siblings, pets, and shared exposures  had lower rates of hay fever and eczema. He suggested that early-life exposure to a wider range of microbes helps the developing immune system learn to distinguish real threats from harmless ones.",
            "Decades of follow-up research have refined the idea. The leading version today, sometimes called the 'old friends' hypothesis, focuses on the loss of beneficial environmental microbes that humans co-evolved with  not the loss of disease-causing organisms.",
          ],
        },
        {
          heading: "Why allergies and asthma rates keep climbing",
          body: "Allergic disease and asthma rates have risen sharply across industrialized countries since the mid-20th century. Genetics did not change that fast. What changed was the environment we grow up in: more time indoors, sealed buildings, fewer pets in the home, smaller families, broad-spectrum disinfection, and dramatically less exposure to soil and outdoor microbial communities.",
          bullets: [
            "Children raised on traditional farms have lower rates of asthma and allergies",
            "Early-life pet exposure is linked to a lower risk of allergic sensitization",
            "Antibiotic use in infancy is associated with higher rates of allergic disease later",
            "Adults who grew up in microbially diverse environments often have more resilient immune responses",
          ],
        },
        {
          heading: "What it does  and does not  mean for hygiene",
          body: [
            "The hygiene hypothesis is not an argument against washing your hands or cleaning your kitchen. Hygiene that prevents the spread of disease-causing organisms is essential and saves lives.",
            "What it does suggest is that broad chemical sterilization of the home  wiping out beneficial microbes alongside the bad  may have unintended consequences for immune development and allergic disease.",
          ],
        },
        {
          heading: "The probiotic application",
          body: "Probiotic purification is one practical response to this research. By continuously seeding indoor surfaces with safe, well-characterized Bacillus strains, EnviroBiotics helps restore microbial diversity in modern homes  without reintroducing pathogens or compromising day-to-day hygiene.",
        },
      ]}
      faqs={[
        {
          q: "Does this mean I should stop cleaning?",
          a: "No. Cleaning physically removes dirt, allergens, and pathogens, and remains essential. The hygiene hypothesis is about adding back microbial diversity, not about removing standard cleaning practices.",
        },
        {
          q: "Is the hygiene hypothesis universally accepted?",
          a: "The general principle  that microbial exposure influences immune development  is widely supported. The exact mechanisms are still actively researched, and modern formulations like the 'old friends' hypothesis are now more commonly used by immunologists.",
        },
      ]}
      related={[
        { label: "What Is the Indoor Microbiome?", to: "/indoor-microbiome" },
        { label: "How EnviroBiotics Works", to: "/how-it-works" },
        { label: "The Science of Competitive Exclusion", to: "/competitive-exclusion" },
      ]}
    />
  );
}
