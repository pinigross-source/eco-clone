import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// TODO: replace src with the stitched cut of Vimeo 1114657157 + 1:10–1:32
// segment of the secondary source. Embed shows 1114657157 in the meantime.
const VIMEO_ID = "1114657157";

export const BeardedManVideoSection = () => {
  return (
    <section id="video" className="py-24 sm:py-32 lg:py-40 bg-card">
      <div className="container max-w-5xl mx-auto px-5 sm:px-6">
        <ScrollReveal variant="fadeUp" className="text-center mb-12 sm:mb-16">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground/70 mb-5">
            Watch · 1 min
          </p>
          <h2 className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-semibold tracking-[-0.03em] leading-[1.05] text-foreground max-w-3xl mx-auto text-balance">
            How EnviroBiotics works,{" "}
            <span className="text-heading-accent">in plain English.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.15}>
          <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] aspect-video bg-foreground/5 shadow-2xl ring-1 ring-foreground/5">
            <iframe
              src={`https://player.vimeo.com/video/${VIMEO_ID}?title=0&byline=0&portrait=0`}
              title="How EnviroBiotics works"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="mt-12 sm:mt-16 rounded-[1.5rem] bg-background border border-border/60 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <div className="flex-1">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-3">
                Our Products
              </p>
              <h3 className="font-display text-[1.5rem] sm:text-[1.85rem] font-semibold text-foreground leading-snug tracking-[-0.02em]">
                Three devices, one beneficial probiotic system — sized for your space.
              </h3>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-foreground text-background px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors"
            >
              See all products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
