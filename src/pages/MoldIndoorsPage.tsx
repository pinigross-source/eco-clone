import { EducationArticle } from "@/components/EducationArticle";

export default function MoldIndoorsPage() {
  return (
    <EducationArticle
      category="Allergens & health"
      title="Mold Indoors"
      lede="Mold grows wherever moisture, organic matter, and poor airflow meet. Visible mold is often only part of the problem  spores and fragments spread silently into dust and air long before a stain appears on the wall."
      path="/mold-indoors"
      seoTitle="Mold Indoors: Sources, Health Effects, and Probiotic Control | EnviroBiotics Education"
      seoDescription="A practical guide to indoor mold  how it grows, the health effects of spores and mycotoxins, and how probiotic purification supports continuous mold control on indoor surfaces."
      keyPoints={[
        { label: "What it needs", value: "Moisture, organic matter, and limited airflow." },
        { label: "Where it hides", value: "Bathrooms, basements, HVAC systems, behind walls, around windows." },
        { label: "Why it persists", value: "Spores reproduce wherever conditions repeat  fixing one spot rarely solves the problem." },
      ]}
      sections={[
        {
          heading: "How indoor mold actually grows",
          body: [
            "Mold is a fungus. It reproduces by releasing microscopic spores that float through the air, settle on surfaces, and germinate when they find moisture and organic material to feed on. Drywall paper, wood, dust, soap residue, and grout are all suitable food sources.",
            "Indoor mold is rarely a one-time event. Spores are everywhere  outdoors, in HVAC ducts, in household dust. The reason mold appears in the same spots repeatedly is that those spots offer the conditions mold needs to grow: moisture and limited airflow.",
          ],
        },
        {
          heading: "Where mold concentrates indoors",
          body: "",
          bullets: [
            "Bathroom grout, caulk, shower curtains, and ceilings",
            "Basements and crawl spaces with humidity above ~60%",
            "Around windows where condensation collects",
            "HVAC drip pans, evaporator coils, and ducts",
            "Behind drywall, under sinks, and around plumbing leaks",
            "Front-loading washing machine gaskets",
          ],
        },
        {
          heading: "Health effects of indoor mold",
          body: [
            "Most people react to mold through inhalation of spores and fragments. Common reactions include allergic rhinitis, sinus congestion, coughing, and asthma exacerbations. Sensitive individuals  especially infants, the elderly, people with asthma, and the immunocompromised  can experience more significant respiratory symptoms.",
            "Some mold species also produce mycotoxins, which are secondary metabolites that can cause irritation and, in higher exposures, more serious health effects. Visible mold is not always the most harmful kind, and dangerous spore loads can exist with no visible mold at all.",
          ],
        },
        {
          heading: "Why traditional cleaning is not enough",
          body: "Bleach and chemical disinfectants kill mold on contact, but they do nothing about the conditions that allowed mold to grow in the first place. Within days or weeks, spores from elsewhere in the home settle on the same wet surface and the cycle restarts. This is why mold tends to return to the exact spots where it was just removed.",
        },
        {
          heading: "How probiotic purification helps",
          body: "EnviroBiotics disperses beneficial Bacillus probiotics that settle on surfaces and continuously compete with mold for nutrients and space. By keeping the surface microbially occupied, the environment becomes less hospitable to opportunistic mold colonization. This is the same principle of competitive exclusion that has been used in agriculture and hospital hygiene for decades.",
          bullets: [
            "Continuous, 24/7 surface coverage instead of one-time disinfection",
            "Reaches HVAC, vents, and behind furniture where filters cannot",
            "Reduces the organic dust film that mold uses as a food source",
            "Safe to operate in occupied spaces, including bedrooms and nurseries",
          ],
        },
      ]}
      faqs={[
        {
          q: "Will probiotics fix an active water leak or wet drywall?",
          a: "No  moisture problems must be fixed at the source. Probiotic purification helps maintain microbial balance on dry surfaces and reduce ongoing recolonization, but a leaking pipe, flooded basement, or saturated wall requires repair and remediation.",
        },
        {
          q: "Is EnviroBiotics safe to use if I am sensitive to mold?",
          a: "Yes. The Bacillus strains used are evaluated under the FDA's GRAS framework and have a long history of safe use. They are not molds and do not produce mycotoxins.",
        },
      ]}
      related={[
        { label: "How to Reduce Mold and Allergens Naturally", to: "/mold-and-allergens" },
        { label: "Dust Mite Allergens", to: "/dust-mite-allergens" },
        { label: "The Science of Competitive Exclusion", to: "/competitive-exclusion" },
        { label: "How EnviroBiotics Works", to: "/how-it-works" },
      ]}
    />
  );
}
