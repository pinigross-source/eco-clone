import { ShieldCheck, FlaskConical, Star, ArrowRight } from "lucide-react";
import { Link } from "@/lib/link";
import fdaGrasBadge from "@/assets/fda-gras-badge.jpg";
import epaBadge from "@/assets/epa-badge.png";
import madeSafeLogo from "@/assets/made-safe-logo.avif";
import isoBadge from "@/assets/iso-badge.png";

const certifications = [
  { image: fdaGrasBadge, name: "FDA GRAS", href: "/safety" },
  { image: epaBadge, name: "EPA Registered", href: "/safety" },
  { image: madeSafeLogo, name: "MADE SAFE®", href: "/safety" },
  { image: isoBadge, name: "ISO Certified", href: "/safety" },
];

const highlights = [
  { icon: ShieldCheck, label: "Safe for kids & pets" },
  { icon: FlaskConical, label: "15+ years of research" },
  { icon: Star, label: "Over 3 million spaces protected" },
];

export const SafetyStrip = () => {
  return (
    <section className="py-16 sm:py-28 bg-card border-t border-border/40">
      <div className="container max-w-4xl mx-auto text-center px-5 sm:px-6">
        <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground/70 mb-4 sm:mb-6">
          Safety & Certifications
        </p>
        <h2 className="text-[1.85rem] sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-[1.1] tracking-[-0.025em] mb-9 sm:mb-12 text-balance">
          Safety-first.
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>
          Proof-forward.
        </h2>

        {/* Certification logos: clean 2×2 on mobile, row on desktop */}
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-12 mb-10 sm:mb-14">
          {certifications.map(({ image, name, href }) => (
            <Link
              key={name}
              to={href}
              className="group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-border/60 bg-background/60 px-4 py-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:hover:translate-y-0 sm:hover:shadow-none"
            >
              <img
                src={image}
                alt={`${name} certification`}
                className="h-12 sm:h-16 w-auto object-contain group-hover:scale-105 transition-transform"
                loading="lazy"
                decoding="async"
              />
              <p className="text-[11px] sm:text-xs font-bold text-foreground tracking-wide">{name}</p>
            </Link>
          ))}
        </div>

        {/* Highlights: tight horizontal cards on mobile */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-10 mb-8 sm:mb-10">
          {highlights.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-full border border-border/60 bg-background/60 px-4 py-2.5 shadow-sm sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-[13.5px] sm:text-sm font-medium text-foreground text-left">{label}</span>
            </div>
          ))}
        </div>

        <Link
          to="/research"
          className="group inline-flex items-center gap-2 text-[13.5px] sm:text-sm font-semibold text-primary hover:text-primary-text transition-colors"
        >
          View published research
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <p className="text-[11px] sm:text-xs text-muted-foreground/60 mt-5 sm:mt-6 max-w-lg mx-auto leading-relaxed">
          We don't claim instant disinfection, and this doesn't replace cleaning or moisture control.
        </p>
      </div>
    </section>
  );
};
