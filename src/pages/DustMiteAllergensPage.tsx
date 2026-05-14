import { EducationArticle } from "@/components/EducationArticle";

export default function DustMiteAllergensPage() {
  return (
    <EducationArticle
      category="Allergens & health"
      title="Dust Mite Allergens"
      lede="Der p1 and Der f1 are among the most common triggers of indoor allergy and asthma. They live deep in mattresses, bedding, and upholstery — and resuspend into the air with every movement."
      path="/dust-mite-allergens"
      seoTitle="Dust Mite Allergens (Der p1 & Der f1) Explained | EnviroBiotics Education"
      seoDescription="What dust mite allergens are, where they accumulate in the home, why they are difficult to remove, and how probiotic surface support reduces them at the source."
      keyPoints={[
        { label: "Allergens", value: "Der p1 (Dermatophagoides pteronyssinus) and Der f1 (Dermatophagoides farinae)." },
        { label: "Source", value: "Microscopic mites that feed on shed human skin and live in fabrics." },
        { label: "Where they hide", value: "Mattresses, pillows, bedding, sofas, rugs, and household dust." },
      ]}
      sections={[
        {
          heading: "What dust mite allergens are",
          body: [
            "Dust mites are microscopic arachnids that live in almost every home in the world. They do not bite. The allergic reaction they cause comes from proteins in their fecal pellets and shed body fragments — primarily Der p1 and Der f1.",
            "These two proteins are among the most studied indoor allergens in the world. They are well-established triggers of perennial allergic rhinitis, asthma exacerbations, and atopic dermatitis (eczema).",
          ],
        },
        {
          heading: "Where they accumulate",
          body: "Dust mites need three things: warmth, humidity, and a steady food supply (shed human skin). That makes the bedroom their ideal habitat. A typical mattress can host millions of mites within a few years of use, with allergen concentrations highest in mattresses, pillows, comforters, fabric headboards, upholstered furniture, and carpet.",
          bullets: [
            "Mattresses and box springs",
            "Pillows and bedding",
            "Upholstered chairs and sofas",
            "Carpet and area rugs",
            "Stuffed animals in children's rooms",
            "Fabric curtains and dust along baseboards",
          ],
        },
        {
          heading: "Why they are so hard to remove",
          body: [
            "Der p1 and Der f1 are sticky and physically stable. They bind to fabric fibers and persist for months even after the mites themselves are gone. Standard washing helps but does not eliminate them — laundering must be done at temperatures above about 130 °F (55 °C) to denature the protein.",
            "HEPA vacuuming reduces surface dust but cannot reach allergens embedded deep in the mattress core or upholstery padding. And every time someone sits down, lies down, or walks across a carpet, allergen-laden particles are resuspended into the air for 20–30 minutes before they settle again.",
          ],
        },
        {
          heading: "How probiotic purification helps",
          body: "EnviroBiotics works on the surfaces where dust mite allergens collect. The Bacillus probiotics dispersed into the room settle into bedding, upholstery, and carpet, where they consume the organic debris that mites depend on and physically displace allergen proteins from fiber surfaces. Independent lab testing has shown meaningful reductions in Der p1 and Der f1 after continuous probiotic treatment compared with untreated control rooms.",
        },
        {
          heading: "Practical steps that complement probiotics",
          body: "",
          bullets: [
            "Encase mattresses and pillows in allergen-impermeable covers",
            "Wash bedding weekly in water hot enough to denature allergen proteins",
            "Replace carpet with hard flooring in bedrooms when possible",
            "Maintain indoor humidity below ~50% to slow mite reproduction",
            "Run EnviroBiotics continuously to reduce surface allergen load over time",
          ],
        },
      ]}
      faqs={[
        {
          q: "How quickly does probiotic treatment reduce dust mite allergens?",
          a: "Reductions build over time as the probiotic population establishes and consumes the organic debris mites depend on. Lab testing typically shows measurable reductions after several weeks of continuous treatment.",
        },
        {
          q: "Does this kill dust mites directly?",
          a: "EnviroBiotics is not designed as a pesticide. It works upstream by reducing the food source mites rely on and displacing the allergens they leave behind, which addresses the trigger you actually react to.",
        },
      ]}
      related={[
        { label: "Pet Dander", to: "/pet-dander" },
        { label: "Mold Indoors", to: "/mold-indoors" },
        { label: "How to Reduce Mold and Allergens Naturally", to: "/mold-and-allergens" },
        { label: "How EnviroBiotics Works", to: "/how-it-works" },
      ]}
    />
  );
}
