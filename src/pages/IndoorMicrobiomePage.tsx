import { EducationArticle } from "@/components/EducationArticle";

export default function IndoorMicrobiomePage() {
  return (
    <EducationArticle
      category="Indoor microbiome"
      title="What Is the Indoor Microbiome?"
      lede="Your home is not sterile — it is alive. Thousands of microbial species form an ecosystem on every surface, in dust, and in the air. Understanding this ecosystem is the foundation of probiotic purification."
      path="/indoor-microbiome"
      seoTitle="What Is the Indoor Microbiome? | EnviroBiotics Education"
      seoDescription="A plain-language guide to the indoor microbiome — the bacteria, fungi, and microbes that live in your home — and why its balance matters for allergies, asthma, and respiratory health."
      keyPoints={[
        { label: "What it is", value: "The community of bacteria, fungi, and viruses living on indoor surfaces, in dust, and in the air." },
        { label: "Why it matters", value: "A diverse microbiome resists allergens, mold, and odor-causing organisms." },
        { label: "Modern problem", value: "Sealed buildings and chemical cleaning have reduced microbial diversity in most homes." },
      ]}
      sections={[
        {
          heading: "An ecosystem you cannot see",
          body: [
            "Every home contains its own invisible ecosystem. Bacteria, fungi, and viruses live on counters, in bedding, inside HVAC systems, and on every soft surface. Researchers have shown that the microbial community of a home shifts within days of new occupants moving in — and that pets, plants, and outdoor exposure all change which microbes dominate.",
            "Just like the gut microbiome influences digestion and immunity, the indoor microbiome influences how your home behaves. A balanced, diverse community of beneficial microbes can suppress mold, outcompete pathogens, and lower the load of allergens that accumulate over time.",
          ],
        },
        {
          heading: "What a healthy indoor microbiome looks like",
          body: "A healthy indoor microbiome is not the absence of microbes — it is the presence of the right ones. It is dominated by harmless or beneficial environmental bacteria, with low populations of pathogens and minimal overgrowth of mold. Diversity is the key signal: more species crowding the same surface leaves less room for any single problem organism to dominate.",
          bullets: [
            "High microbial diversity, with no single species dominating",
            "Low standing populations of mold and opportunistic pathogens",
            "Stable populations of harmless environmental bacteria on high-touch surfaces",
            "Beneficial microbes occupying the same niches that allergens and pathogens would otherwise colonize",
          ],
        },
        {
          heading: "How modern living changed it",
          body: [
            "Modern construction sealed our homes for energy efficiency. That is good for heating bills, but it cut the natural exchange of outdoor microbes that historically diversified indoor environments.",
            "At the same time, chemical disinfectants became a daily habit. These products kill broadly — including the beneficial microbes that would otherwise compete with pathogens. The result is a depleted indoor ecosystem where opportunistic organisms can grow back unchecked.",
          ],
        },
        {
          heading: "Why balance beats sterility",
          body: "A truly sterile environment is impossible to maintain — and would not be healthy if it were. Whatever you wipe away comes back. The question is what comes back first. Probiotic purification is built on this principle: continuously seed the environment with safe, beneficial Bacillus probiotics so the surfaces you live with are dominated by organisms that work in your favor.",
        },
      ]}
      faqs={[
        {
          q: "Is the indoor microbiome the same as the gut microbiome?",
          a: "No. The two are separate ecosystems, but they interact. Exposure to a diverse indoor microbiome — especially in early life — has been linked to immune system development and lower rates of allergies and asthma.",
        },
        {
          q: "Does cleaning destroy the microbiome?",
          a: "Cleaning physically removes dirt and debris and is essential for hygiene. Broad-spectrum chemical disinfection, however, also wipes out beneficial microbes and creates an empty surface where the next organism to arrive — often an opportunistic one — wins by default.",
        },
      ]}
      related={[
        { label: "The Hygiene Hypothesis Explained", to: "/hygiene-hypothesis" },
        { label: "The Science of Competitive Exclusion", to: "/competitive-exclusion" },
        { label: "How EnviroBiotics Works", to: "/how-it-works" },
        { label: "Probiotic vs. Chemical Disinfection", to: "/probiotic-vs-chemical" },
      ]}
    />
  );
}
