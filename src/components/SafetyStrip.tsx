import { ShieldCheck, FlaskConical, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/lib/link";
import fdaGrasBadge from "@/assets/fda-gras-badge.jpg";
import epaBadge from "@/assets/epa-badge.png";
import ptpaAward from "@/assets/ptpa-award.png";
import isoBadge from "@/assets/iso-badge.png";

const certifications = [
  { image: epaBadge, name: "EPA Registered", sub: "Reg. No. 95029-1" },
  { image: fdaGrasBadge, name: "FDA GRAS", sub: "Generally Recognized as Safe" },
  { image: ptpaAward, name: "PTPA Winner", sub: "Parent Tested, Parent Approved" },
  { image: isoBadge, name: "ISO 9001", sub: "Certified Manufacturing" },
];

const highlights = [
  { icon: ShieldCheck, label: "Safe for kids & pets", sub: "Non-toxic, hypoallergenic" },
  { icon: FlaskConical, label: "15+ years of research", sub: "Independently lab tested" },
  { icon: Star, label: "30-day risk-free trial", sub: "Full refund, no questions" },
];

const stats = [
  { value: "0", label: "Ozone, VOCs, residues" },
  { value: "100%", label: "Food-grade strains" },
  { value: "11", label: "Independent certifications" },
];

export const SafetyStrip = () => {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-card overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.04),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="container relative max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center gap-4 mb-10 sm:mb-14">
          <span className="h-px w-10 bg-foreground/20" />
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.32em] uppercase text-muted-foreground/70">
            Proof &amp; Safety
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4rem] font-display font-bold text-foreground leading-[1.02] tracking-[-0.035em] mb-8 text-balance">
              Safety-first.
              <br />
              <span className="text-heading-accent italic font-normal">Proof-forward.</span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
              Designed for everyday homes with kids, pets, bedrooms, nurseries, and shared living spaces. EnviroBiotics leaves no ozone, no harsh chemical residue, and no added fragrance.
            </p>

            <ul className="space-y-5 mb-10 max-w-md">
              {highlights.map(({ icon: Icon, label, sub }) => (
                <li key={label} className="flex items-start gap-4 group">
                  <div className="mt-0.5 w-10 h-10 rounded-full bg-primary/8 ring-1 ring-primary/15 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/12">
                    <Icon className="h-[18px] w-[18px] text-primary" strokeWidth={1.6} />
                  </div>
                  <div className="min-w-0 pt-1">
                    <p className="text-[15px] font-semibold text-foreground leading-tight">{label}</p>
                    <p className="text-[13px] text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to="/research"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b border-foreground/30 hover:border-foreground pb-1 transition-colors"
            >
              View published research
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative rounded-[28px] bg-background border border-border/60 p-8 sm:p-10 shadow-[0_30px_80px_-40px_hsl(var(--foreground)/0.22)]">
              <div className="flex items-center justify-center gap-2 mb-8">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-muted-foreground/70">
                  Independently Verified
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                {certifications.map(({ image, name, sub }) => (
                  <Link
                    key={name}
                    to="/safety"
                    className="group flex flex-col items-center justify-start gap-3 text-center transition-transform hover:-translate-y-0.5"
                  >
                    <div className="h-16 sm:h-[68px] flex items-center justify-center">
                      <img
                        src={image}
                        alt={`${name} certification`}
                        className="max-h-full w-auto object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-foreground leading-tight">{name}</p>
                      <p className="text-[10.5px] text-muted-foreground mt-1 leading-snug">{sub}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="my-8 h-px bg-border/70" />

              <div className="grid grid-cols-3 gap-3 text-center">
                {stats.map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">{value}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-muted-foreground/70 mt-6 text-center leading-relaxed italic">
              A complement to your cleaning routine, not a substitute for it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
