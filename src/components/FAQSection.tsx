import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const faqs = [
  { question: "Is it safe for kids and pets?", answer: "Yes. Our EnviroBiotics is EPA-registered and uses probiotics on the EPA's GRAS list (Generally Recognized As Safe) — the same kind of beneficial probiotics that already exist in nature, in soil, and on healthy skin. It's designed for everyday use in homes with children, pets, and people with sensitivities. Nothing harsh. No chemicals. Just living probiotics doing what they do in nature, in the rooms where your family actually lives." },
  { question: "Does it replace cleaning?", answer: "No, and that's the point. Cleaning removes what you can see. Our device works in the background on what you can't, breaking down allergens and odors on every surface, 24 hours a day, between cleanings and long after. Think of it as the layer that keeps your home fresh in the days your mop and vacuum can't." },
  { question: "How is this different from an air purifier?", answer: "Air purifiers move air through a filter. They can only clean what floats into them, and only while they're running. Our device works differently. It releases living probiotics that settle on every high-touch surface a filter never reaches: doorknobs, counters, bedding, pillows, remotes, and keep breaking down allergens and odors at the source, 24 hours a day. Purifiers clean the air around you. We clean the surfaces your air actually touches." },
  { question: "How fast will I notice a difference?", answer: "Most people notice a difference within a few days. In some environments, depending on factors such as room size, ventilation, and the persistence of the issue, it can take 3 to 4 weeks for the full effect to take hold. That's exactly why we offer a 30-day free trial. Long enough to feel the difference in your space. If you don't, send it back. Full refund, no questions." },
  { question: "What about musty spaces?", answer: "Musty smells come from microbes that thrive in damp, low-airflow areas. Our probiotics outcompete them at the source, breaking down the odor where it actually lives instead of just covering it up. You'll notice the difference within days in most spaces. One honest note: if there's an active moisture problem behind the smell, fix the moisture first. The probiotics handle the air and surfaces. Your home handles the plumbing." },
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
