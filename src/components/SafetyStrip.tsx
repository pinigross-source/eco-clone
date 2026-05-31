import { ShieldCheck, FlaskConical, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/lib/link";
import fdaGrasBadge from "@/assets/fda-gras-badge.jpg";
import epaBadge from "@/assets/epa-badge.png";

const certifications = [
  { image: epaBadge, name: "EPA Registered", sub: "Reg. No. 95029-1" },
  { image: fdaGrasBadge, name: "FDA GRAS", sub: "Generally Recognized as Safe" },
];

const highlights = [
  { icon: ShieldCheck, label: "Safe for kids & pets", sub: "Non-toxic, hypoallergenic" },
  { icon: FlaskConical, label: "15+ years of research", sub: "Independently lab tested" },
  { icon: Star, label: "30-day risk-free trial", sub: "Full refund, no questions" },
];

// Official certifier profile pages. Update with the certifier-provided links
// once they're confirmed.
const MADE_SAFE_URL = "https://madesafe.org/";
const ALLERGY_UK_URL = "https://www.allergyuk.org/";

const MadeSafeBadge = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden>
    <defs>
      <linearGradient id="msGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1f3a2b" />
        <stop offset="100%" stopColor="#0f2418" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="96" fill="url(#msGrad)" stroke="#c9b173" strokeWidth="3" />
    <circle cx="100" cy="100" r="80" fill="none" stroke="#c9b173" strokeWidth="1" opacity="0.6" />
    <text x="100" y="82" textAnchor="middle" fill="#f5efe1" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" letterSpacing="2">MADE</text>
    <text x="100" y="112" textAnchor="middle" fill="#c9b173" fontFamily="Georgia, serif" fontSize="26" fontWeight="700" letterSpacing="3">SAFE</text>
    <text x="100" y="115" textAnchor="middle" fill="#f5efe1" fontFamily="Arial, sans-serif" fontSize="9">®</text>
    <text x="100" y="140" textAnchor="middle" fill="#f5efe1" fontFamily="Arial, sans-serif" fontSize="8" letterSpacing="2">CERTIFIED</text>
  </svg>
);

const AllergyUKBadge = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden>
    <circle cx="100" cy="100" r="96" fill="#ffffff" stroke="#0066a3" strokeWidth="3" />
    <text x="100" y="78" textAnchor="middle" fill="#0066a3" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="800" letterSpacing="1">Allergy</text>
    <text x="100" y="104" textAnchor="middle" fill="#e85d3a" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="900" letterSpacing="2">UK</text>
    <text x="100" y="128" textAnchor="middle" fill="#0066a3" fontFamily="Arial, sans-serif" fontSize="8" letterSpacing="2">SEAL OF APPROVAL</text>
    <text x="100" y="148" textAnchor="middle" fill="#666" fontFamily="Arial, sans-serif" fontSize="8">Certified 2024–2026</text>
  </svg>
);

export const SafetyStrip = () => {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-card overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.04),transparent_55%)]" />

      <div className="container relative max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] font-display font-bold text-foreground leading-[1.05] tracking-[-0.035em] mb-8 text-balance">
              Safe for kids and pets.{" "}
              <span className="text-heading-accent">EPA registered. FDA GRAS.</span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
              Designed for everyday homes with kids, pets, bedrooms, nurseries, and
              shared living spaces. EnviroBiotics leaves no ozone, no harsh chemical
              residue, and no added fragrance.
            </p>

            <ul className="space-y-5 mb-10 max-w-md">
              {highlights.map(({ icon: Icon, label, sub }) => (
                <li key={label} className="flex items-start gap-4 group">
                  <div className="mt-0.5 w-10 h-10 rounded-full bg-primary/8 ring-1 ring-primary/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-[18px] w-[18px] text-primary" strokeWidth={1.6} />
                  </div>
                  <div className="min-w-0 pt-1">
                    <p className="text-[15px] font-semibold text-foreground leading-tight">{label}</p>
                    <p className="text-[13px] text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-[15px] text-foreground/85 leading-relaxed max-w-xl mb-6 font-medium">
              EnviroBiotics beneficial probiotic formula is certified by MADE SAFE
              and Allergy UK.
            </p>

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
                  Independently Certified
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <a
                  href={MADE_SAFE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 text-center transition-transform hover:-translate-y-0.5"
                >
                  <div className="w-24 h-24"><MadeSafeBadge /></div>
                  <p className="text-[12px] font-semibold text-foreground leading-tight">MADE SAFE®</p>
                </a>
                <a
                  href={ALLERGY_UK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 text-center transition-transform hover:-translate-y-0.5"
                >
                  <div className="w-24 h-24"><AllergyUKBadge /></div>
                  <p className="text-[12px] font-semibold text-foreground leading-tight">Allergy UK</p>
                </a>
              </div>

              <div className="h-px bg-border/70 mb-6" />

              <div className="grid grid-cols-2 gap-6">
                {certifications.map(({ image, name, sub }) => (
                  <div key={name} className="flex flex-col items-center gap-2 text-center">
                    <div className="h-14 flex items-center justify-center">
                      <img src={image} alt={`${name} certification`} className="max-h-full w-auto object-contain" loading="lazy" decoding="async" />
                    </div>
                    <p className="text-[11.5px] font-semibold text-foreground leading-tight">{name}</p>
                    <p className="text-[10px] text-muted-foreground leading-snug">{sub}</p>
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
