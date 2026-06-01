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
    <section className="relative py-24 sm:py-32 lg:py-40 bg-[hsl(var(--card))] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.035),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/8 to-transparent" />

      <div className="container relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left content column */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/20" />
                <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-muted-foreground/70">
                  Proof &amp; Safety
                </p>
              </div>

              <h2 className="font-display text-[2.5rem] sm:text-5xl lg:text-[3.75rem] font-normal text-foreground leading-[1.05] tracking-[-0.025em] text-balance">
                Safety is our top priority.
                <span className="block mt-2 italic font-light text-foreground/85">
                  Independently verified.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-light">
                Designed for everyday homes with kids, pets, bedrooms, nurseries, and shared living spaces. EnviroBiotics leaves no ozone, no harsh chemical residue, and no added fragrance.
              </p>
            </div>

            <ul className="space-y-6">
              {highlights.map(({ icon: Icon, label, sub }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="mt-0.5 w-10 h-10 rounded-full bg-background border border-border/70 flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.06)]">
                    <Icon className="h-[18px] w-[18px] text-foreground/70" strokeWidth={1.4} />
                  </div>
                  <div className="min-w-0 pt-1">
                    <p className="text-[15px] font-medium text-foreground leading-tight">{label}</p>
                    <p className="text-[13px] text-muted-foreground mt-1 font-light">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to="/research"
              className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground border-b border-foreground/25 hover:border-foreground pb-1 transition-colors"
            >
              View published research
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right card column */}
          <div className="lg:col-span-6 relative">
            <div className="bg-background rounded-[2.5rem] p-10 sm:p-12 lg:p-14 border border-border/40 shadow-[0_32px_64px_-16px_hsl(var(--foreground)/0.08)]">
              <div className="flex items-center justify-center gap-2 mb-12">
                <CheckCircle2 className="h-3.5 w-3.5 text-foreground/30" strokeWidth={2} />
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-muted-foreground/70">
                  Independently Verified
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-10">
                {certifications.map(({ image, name, sub }) => (
                  <Link
                    key={name}
                    to="/safety"
                    className="group flex flex-col items-center text-center gap-4 transition-transform hover:-translate-y-0.5"
                  >
                    <div className="h-14 flex items-center justify-center">
                      <img
                        src={image}
                        alt={`${name} certification`}
                        className="max-h-full w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-foreground tracking-wide">{name}</p>
                      <p className="text-[10.5px] text-muted-foreground leading-snug font-light">{sub}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="my-12 h-px bg-border/60" />

              <div className="grid grid-cols-3">
                {stats.map(({ value, label }, i) => (
                  <div
                    key={label}
                    className={`text-center ${i === 1 ? "border-x border-border/50 px-4" : "px-2"}`}
                  >
                    <p className="font-display text-3xl font-light text-foreground tracking-tight mb-1">
                      {value}
                    </p>
                    <p className="text-[10px] leading-tight uppercase tracking-wider text-muted-foreground/80">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 text-center text-[11px] text-muted-foreground/70 italic font-light">
              A complement to your cleaning routine, not a substitute for it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
