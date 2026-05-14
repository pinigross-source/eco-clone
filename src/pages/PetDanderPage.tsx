import { EducationArticle } from "@/components/EducationArticle";

export default function PetDanderPage() {
  return (
    <EducationArticle
      category="Allergens & health"
      title="Pet Dander"
      lede="Fel d1 and Can f1 — the proteins behind cat and dog allergies — are among the stickiest, most persistent indoor allergens. They cling to fabric, travel on clothing between homes, and remain detectable for months even after a pet is gone."
      path="/pet-dander"
      seoTitle="Pet Dander Allergens (Fel d1 & Can f1) Explained | EnviroBiotics Education"
      seoDescription="How pet dander allergens like Fel d1 and Can f1 spread through the home, why they persist for so long, and how probiotic surface care helps reduce them at the source."
      keyPoints={[
        { label: "Cat allergen", value: "Fel d1 — produced in saliva and skin glands; extremely sticky and airborne." },
        { label: "Dog allergen", value: "Can f1 — found in skin, saliva, and hair; carried widely on clothing." },
        { label: "Why they persist", value: "Both cling to fabric and dust and remain detectable for months." },
      ]}
      sections={[
        {
          heading: "What pet allergens actually are",
          body: [
            "People often blame pet hair for allergies, but hair itself is not the trigger. The allergens are proteins produced by the animal — secreted in saliva, skin oils, and urine — that attach to shed skin flakes (dander) and to hair as the animal grooms.",
            "Fel d1 (cats) is unusually small, sticky, and lightweight. It becomes airborne easily, settles on every type of surface, and is detectable in homes that have never had a cat — carried in on visitors' clothing.",
            "Can f1 (dogs) is similar in behavior, with multiple subtypes that differ slightly across breeds. There is no truly hypoallergenic dog or cat — only individuals that produce more or less of the trigger proteins.",
          ],
        },
        {
          heading: "Why pet dander spreads everywhere",
          body: "Dander particles are tiny — small enough to stay airborne for hours and to settle into every fabric in the home. They cling electrostatically to upholstery, walls, clothing, and even smooth surfaces. Each time someone sits on the couch, walks past a curtain, or pets the animal, allergen-laden particles resuspend into the air and resettle elsewhere.",
          bullets: [
            "Carpets, rugs, and upholstered furniture",
            "Bedding, pillows, and curtains",
            "Walls and ceilings (yes — Fel d1 has been measured on both)",
            "Inside HVAC ducts and on filter surfaces",
            "Clothing, including clothes of guests who have pets",
          ],
        },
        {
          heading: "Why standard cleaning falls short",
          body: [
            "Vacuuming with HEPA filtration helps reduce surface dander, but it cannot reach the protein bound deep in upholstery padding or behind walls. Wiping smooth surfaces removes a fraction of what is there. And once the cleaning is done, the animal continues to shed, replenishing the load within hours.",
            "This is why allergy symptoms often persist long after dramatic cleaning interventions — the allergen reservoir was never fully addressed.",
          ],
        },
        {
          heading: "How probiotic purification helps",
          body: "EnviroBiotics continuously disperses beneficial Bacillus probiotics into the room. As they settle onto fabrics, carpets, and high-touch surfaces, they consume the organic film that allergen proteins bind to — gradually reducing the allergen load on the surfaces you actually contact. Continuous operation matters: the pet keeps shedding, so the response has to be continuous too.",
          bullets: [
            "Reaches deep fabrics and HVAC surfaces that vacuuming misses",
            "Operates 24/7 to keep up with continuous shedding",
            "Safe to run in occupied rooms, including pet sleeping areas",
            "Works alongside HEPA filtration, not as a replacement for it",
          ],
        },
      ]}
      faqs={[
        {
          q: "Will EnviroBiotics make a cat- or dog-allergic person symptom-free?",
          a: "Individual responses vary. The goal is meaningful, sustained reduction of surface allergen load — enough to lower symptoms below the threshold most people react to. It works best as part of a layered approach with HEPA filtration, washable bedding, and routine cleaning.",
        },
        {
          q: "Is it safe to use around pets?",
          a: "Yes. The Bacillus probiotics in EnviroBiotics are evaluated under the FDA's GRAS framework and are safe for use in homes with cats, dogs, and other pets.",
        },
      ]}
      related={[
        { label: "Dust Mite Allergens", to: "/dust-mite-allergens" },
        { label: "Mold Indoors", to: "/mold-indoors" },
        { label: "How to Reduce Mold and Allergens Naturally", to: "/mold-and-allergens" },
        { label: "How EnviroBiotics Works", to: "/how-it-works" },
      ]}
    />
  );
}
