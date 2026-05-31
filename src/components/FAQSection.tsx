import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const faqs = [
  { question: "Is this safe for kids and pets?", answer: "Designed for everyday home use around the people and pets you live with. Always follow the label and setup instructions." },
  { question: "Does it replace cleaning?", answer: "No. It's designed to support freshness between cleanings, not replace your regular routine." },
  { question: "How is this different from an air purifier?", answer: "Air purifiers focus on what's floating through a filter. EnviroBiotics also reaches the surfaces where allergens and odor-causing bacteria settle." },
  { question: "How long until I notice a difference?", answer: "Results vary by space and conditions, and effects can build over time with consistent use." },
  { question: "Does it help with pet odors or musty smells?", answer: "It may help reduce pet-related and musty odors in lived-in or damp-prone areas over time. It's not a substitute for fixing moisture sources." },
  { question: "What system do I need?", answer: "It depends on your space size and what matters most. Use the Solutions Finder above for a quick recommendation, or contact support." },
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
            {faqs.map((faq, index) => (
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
