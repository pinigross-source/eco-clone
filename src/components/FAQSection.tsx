import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const homepageFaqs = [
  {
    question: "What is a probiotic air purifier?",
    answer: "A probiotic air purifier is a device that continuously disperses beneficial Bacillus bacteria into a room to competitively suppress harmful microorganisms on surfaces and in the air. Unlike HEPA filters that only capture airborne particles passing through a machine, probiotic purifiers actively treat surfaces, fabrics, and cracks where contamination accumulates and re-contaminates the air.",
  },
  {
    question: "How does EnviroBiotics work?",
    answer: "EnviroBiotics works in three automatic steps. Disperse: the device releases beneficial Bacillus probiotics as an invisible mist on a timed cycle. Settle: probiotics land on surfaces, fabrics, furniture, and hard-to-reach cracks where contamination lives. Support: the established probiotic layer outcompetes harmful bacteria, mold, and allergens for nutrients, suppressing them continuously between your regular cleanings.",
  },
  {
    question: "Is it safe for kids and pets?",
    answer: "Yes. EnviroBiotics uses FDA GRAS, MADE SAFE certified Bacillus strains naturally found in soil and water. It is designed for everyday homes with infants, children, and pets. No ozone, no harsh chemicals, no added fragrance.",
  },
  {
    question: "How is this different from a HEPA air purifier?",
    answer: "A HEPA purifier filters particles that physically pass through the machine, but cannot treat surfaces, fabrics, or areas without direct airflow. EnviroBiotics treats the source — surfaces, upholstery, cracks, and HVAC ducts where contamination accumulates and re-enters the air. The two technologies are complementary.",
  },
  {
    question: "Which products does EnviroBiotics offer?",
    answer: "The BioLogic Mini is a portable probiotic purifier for personal spaces up to 300 sq ft. The Biotica 800 covers larger living areas up to 800 sq ft. The E-Biotic Home & Small Office covers whole spaces 800+ sq ft for apartments and small offices.",
  },
  {
    question: "How often do I need to replace the cartridge?",
    answer: "The BioLogic Mini uses a 90-day probiotic cartridge. The Biotica 800 cartridge lasts approximately 3 months. Subscribers on the refill plan receive replacement cartridges automatically before they run out, with savings on every order and free shipping.",
  },
  {
    question: "How long before I notice a difference?",
    answer: "Most customers notice a fresher, cleaner scent within the first 1 to 2 weeks. Measurable surface allergen reduction has been documented in independent lab testing within 30 days of continuous use. A stable probiotic layer typically establishes in 4 to 6 weeks.",
  },
  {
    question: "Does it replace my regular cleaning routine?",
    answer: "No. EnviroBiotics is designed to complement your existing routine, not replace it. It continuously suppresses re-contamination between your regular cleanings. Avoid using harsh antibacterial sprays in treated areas, as these disrupt the probiotic layer.",
  },
  {
    question: "Can EnviroBiotics reduce dust mites and allergens?",
    answer: "Yes. Independent testing shows that probiotic surface colonization reduces the organic matter — skin cells and pet dander — that dust mites feed on. By reducing the food source, dust mite populations decline over time. AllergyUK has certified EnviroBiotics products as appropriate for allergy sufferers.",
  },
  {
    question: "What's included in the 30-day risk-free trial?",
    answer: "Every EnviroBiotics device purchase includes a 30-day money-back guarantee. If you are not satisfied for any reason within 30 days of receiving your order, return the device for a full refund. Subscribers also benefit from best-value pricing, free shipping on refills, and a Lifetime Warranty for as long as their subscription is active.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-32 bg-background">
      <div className="container max-w-3xl mx-auto">
        <ScrollReveal variant="fadeUp" className="text-center mb-12">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-5">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-bold leading-[1.1] tracking-[-0.025em] text-foreground">
            Questions?{" "}
            <span className="text-heading-accent">Answered.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <Accordion type="single" collapsible className="space-y-3">
            {homepageFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/60 rounded-2xl px-6 border-none data-[state=open]:border-primary/20 transition-all"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-sm sm:text-base text-foreground hover:text-primary py-5 [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.4} className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <a href="/support" className="text-primary font-medium hover:underline">
              Contact support
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
