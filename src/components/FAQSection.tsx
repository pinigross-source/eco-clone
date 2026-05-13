import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "Is it safe for kids and pets?",
    answer:
      "Designed for everyday home use. Always follow the label and setup instructions. See Safety & Proof for details.",
  },
  {
    question: "Does it replace cleaning?",
    answer:
      "No, and that's the point. Cleaning removes what you can see. Our device works in the background on what you can't, breaking down allergens and odors on every surface, 24 hours a day, between cleanings and long after. Think of it as the layer that keeps your home fresh in the days your mop and vacuum can't.",
  },
  {
    question: "How is this different from an air purifier?",
    answer:
      "Air purifiers move air through a filter. They can only clean what floats into them, and only while they're running. Our device works differently. It releases living probiotics that settle on every high-touch surface a filter never reaches: doorknobs, counters, bedding, pillows, remotes, and keep breaking down allergens and odors at the source, 24 hours a day. Purifiers clean the air around you. We clean the surfaces your air actually touches.",
  },
  {
    question: "How fast will I notice a difference?",
    answer:
      "Most people notice a difference within a few days. In some environments, depending on factors such as room size, ventilation, and the persistence of the issue, it can take 3 to 4 weeks for the full effect to take hold. That's exactly why we offer a 30-day free trial. Long enough to feel the difference in your space. If you don't, send it back. Full refund, no questions.",
  },
  {
    question: "What about musty spaces?",
    answer:
      "It may help reduce musty odors in damp-prone areas over time. It's not a substitute for fixing moisture sources.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-14 sm:py-20 lg:py-28 bg-background">
      <div className="container max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          {/* Left: sticky header */}
          <ScrollReveal variant="fadeUp" className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 text-center lg:text-left">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-6">
                Q&amp;A
              </p>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-display font-bold leading-[1.02] tracking-[-0.035em] text-foreground text-balance">
                Questions, <br />
                <span className="text-primary">answered.</span>
              </h2>
              <p className="hidden lg:block text-base text-muted-foreground mt-6 max-w-sm leading-relaxed">
                Everything you want to know about how it works, what to expect,
                and how to get the most from it.
              </p>
              <a
                href="/support"
                className="hidden lg:inline-flex group items-center gap-2 mt-8 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Still have questions?
                <span className="text-primary underline-offset-4 group-hover:underline">
                  Contact support
                </span>
                <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </ScrollReveal>

          {/* Right: accordion */}
          <ScrollReveal variant="fadeUp" delay={0.15} className="lg:col-span-7">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="group bg-card border border-border/60 rounded-2xl px-5 sm:px-7 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_10px_40px_-15px_hsl(24_95%_53%_/_0.18)] data-[state=open]:border-primary/40 data-[state=open]:shadow-[0_10px_40px_-15px_hsl(24_95%_53%_/_0.22)] data-[state=open]:bg-background"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-base sm:text-lg text-foreground hover:text-primary-text py-5 sm:py-6 [&[data-state=open]]:text-primary-text [&>svg]:hidden">
                    <span className="flex-1 pr-4">{faq.question}</span>
                    <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-muted/60 group-hover:bg-primary/10 group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-all">
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-6 pr-12">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Mobile/tablet footer */}
            <div className="lg:hidden text-center mt-10">
              <p className="text-sm text-muted-foreground">
                Still have questions?{" "}
                <a
                  href="/support"
                  className="text-primary font-semibold hover:underline underline-offset-4"
                >
                  Contact support
                </a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
