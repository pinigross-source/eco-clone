import { Link } from "@/lib/link";
import { Play } from "lucide-react";
import scienceImage from "@/assets/hero-scandinavian-family.jpg";

export const ScienceOfBalanceSection = () => {
  return (
    <section
      aria-label="Let nature into your space"
      className="relative w-full overflow-hidden bg-background border-y border-foreground/10"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-2">
        {/* Text side */}
        <div className="flex flex-col justify-center px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
          <h2 className="font-display font-bold leading-[1.02] tracking-[-0.03em] text-foreground text-4xl sm:text-5xl lg:text-6xl">
            The Science of <span className="italic font-normal text-heading-accent">Balance.</span>
          </h2>
          <p className="mt-6 font-serif italic text-xl sm:text-2xl text-foreground/80 leading-snug">
            Environmental probiotics, intelligently dispersed.
          </p>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-foreground/70 leading-relaxed">
            When nature is invited in, allergies, fatigue, headaches, sleep disorders, low mood, and stubborn odors quietly fade.
          </p>

          <h3 className="mt-10 font-display font-bold text-2xl sm:text-3xl text-foreground">
            Let Nature Back Indoors
          </h3>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/"
              hash="find-your-system"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "0 12px 30px -12px hsl(var(--primary) / 0.55)",
              }}
            >
              Choose Your System
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-foreground hover:text-primary transition-colors"
            >
              <Play className="w-4 h-4" />
              Watch how it works
            </Link>
          </div>
        </div>

        {/* Image side */}
        <div className="relative min-h-[320px] lg:min-h-full bg-muted">
          <img
            src={scienceImage}
            alt="Sunlit living room with soft light trails of dispersed environmental probiotics"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
