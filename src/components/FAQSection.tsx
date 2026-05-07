import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const faqs = [
  {
    question: "Is it safe for kids and pets?",
    answer: "Designed for everyday home use. Always follow the label and setup instructions. See Safety & Proof for details.",
  },
  {
    question: "Does it replace cleaning?",
    answer: "No. It's designed to support freshness between cleanings.",
  },
  {
    question: "How is this different from an air purifier?",
    answer: "Air purifiers focus on what's floating. This is designed to support a fresher environment on surfaces + air.",
  },
  {
    question: "How fast will I notice a difference?",
    answer: "Results vary by space and conditions, and effects can build over time with consistent use.",
  },
  {
    question: "What about musty spaces?",
    answer: "It may help reduce musty odors in damp-prone areas over time. It's not a substitute for fixing moisture sources.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-28 sm:py-36 lg:py-44 bg-background">
      <div className="container max-w-3xl mx-auto">
        <ScrollReveal variant="fadeUp" className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-6">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-[1.06] tracking-[-0.03em] text-foreground">
            Questions?{" "}
            <span className="text-primary">Answered.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/60 rounded-2xl px-6 border-none data-[state=open]:border-primary/20 transition-all"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-sm sm:text-base text-foreground hover:text-primary-text py-5 [&[data-state=open]]:text-primary-text">
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
