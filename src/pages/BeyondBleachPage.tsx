import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "@/lib/link";
import {
  ArrowRight,
  Check,
  Clock,
  Sparkles,
  Layers,
  Users,
  SprayCan,
  ShieldCheck,
  Home,
  Building2,
  GraduationCap,
  BedDouble,
  HeartPulse,
  Store,
  Leaf,
  RefreshCw,
  Repeat,
  HelpCircle,
} from "lucide-react";

const Footer = lazy(() =>
  import("@/components/Footer").then((m) => ({ default: m.Footer }))
);

import oldWayImg from "@/assets/bb-old-way.jpg";
import betterWayImg from "@/assets/bb-better-way.jpg";
import splitMicroImg from "@/assets/bb-split-micro.jpg";
import indoorMicrobiomeImg from "@/assets/bb-indoor-microbiome.jpg";

/* ── Sonos-style system, built on our site tokens ───────────────────── */
const INK = "#1B2A2A"; // --color-ink
const SAGE = "#2E8B7F"; // --color-sage
const SAGE_LIGHT = "#3FA593"; // sage for dark surfaces
const CREAM = "#FFFFFF"; // page canvas — pure white
const SAGE_SOFT = "#E6EFEC"; // --color-sage-soft

const DISPLAY = `"Manrope", "Inter", system-ui, -apple-system, sans-serif`;
const SERIF = `"Instrument Serif", "Playfair Display", Georgia, serif`;

/** Sonos headline: bold sans + final word in italic serif. */
const Headline = ({
  lead,
  italic,
  className = "",
  color = INK,
}: {
  lead: string;
  italic: string;
  className?: string;
  color?: string;
}) => (
  <h2
    className={`font-extrabold tracking-[-0.03em] leading-[1.02] ${className}`}
    style={{ fontFamily: DISPLAY, color }}
  >
    {lead}{" "}
    <em
      className="not-italic"
      style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}
    >
      {italic}
    </em>
  </h2>
);

const Eyebrow = ({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <p
    className="text-[11px] font-semibold uppercase tracking-[0.28em]"
    style={{ color: light ? "rgba(255,255,255,0.6)" : SAGE }}
  >
    {children}
  </p>
);

const limitations = [
  {
    icon: RefreshCw,
    title: "Surfaces are recolonized",
    body: "Once the disinfectant has evaporated or dried, surfaces begin to be recolonized by microorganisms.",
  },
  {
    icon: Layers,
    title: "Build-up continues",
    body: "Dust, skin cells, food residues, and moisture continue accumulating on indoor surfaces.",
  },
  {
    icon: Users,
    title: "New microbes keep arriving",
    body: "People, pets, ventilation, and outdoor air continually introduce microorganisms into the environment.",
  },
  {
    icon: Clock,
    title: "Cleaning is a moment in time",
    body: "Indoor environments are continuously changing, so the microbial environment continues changing after cleaning.",
  },
];

const philosophyPoints = [
  "Continuously disperses carefully selected environmental probiotics.",
  "Designed to establish and maintain a healthier microbial balance on indoor surfaces.",
  "Beneficial microorganisms naturally compete for nutrients and space.",
  "They help break down organic residues that contribute to odors and support the persistence of unwanted microbes.",
  "The goal is to help manage the conditions that allow environmental problems to develop.",
];

const traditionalSteps = [
  { icon: SprayCan, label: "Clean" },
  { icon: ShieldCheck, label: "Disinfect" },
  { icon: Home, label: "Leave" },
  { icon: RefreshCw, label: "Recolonization begins" },
];

const enviroSteps = [
  { icon: SprayCan, label: "Clean" },
  { icon: Leaf, label: "EnviroBiotics" },
  { icon: Sparkles, label: "Continuous environmental probiotics" },
  { icon: Repeat, label: "Ongoing microbial management" },
];

const principles = [
  { icon: Leaf, top: "Not simply cleaner.", bottom: "Balanced." },
  {
    icon: ShieldCheck,
    top: "Not simply disinfected.",
    bottom: "Continuously managed.",
  },
  {
    icon: Sparkles,
    top: "Not simply reducing microbes.",
    bottom: "Supporting a healthier indoor microbiome.",
  },
];

const applications = [
  { icon: Home, label: "Homes" },
  { icon: Building2, label: "Offices" },
  { icon: GraduationCap, label: "Schools" },
  { icon: BedDouble, label: "Hospitality" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Store, label: "Commercial spaces" },
];

const PillLink = ({
  to,
  children,
  variant = "dark",
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "sage";
  className?: string;
}) => {
  const style =
    variant === "light"
      ? { backgroundColor: "#FFFFFF", color: INK }
      : variant === "sage"
        ? { backgroundColor: SAGE, color: "#FFFFFF" }
        : { backgroundColor: INK, color: "#FFFFFF" };

  return (
    <Link
      to={to}
      className={`group inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full px-8 text-[13px] font-semibold tracking-[0.06em] transition-all duration-300 hover:-translate-y-0.5 sm:w-fit ${className}`}
      style={style}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
};

const Arrow = ({ className = "" }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={`bb-arrow inline-flex items-center justify-center ${className}`}
    style={{ color: SAGE }}
  >
    <ArrowRight className="h-5 w-5" />
  </span>
);

const StepNode = ({
  icon: Icon,
  label,
  accent,
}: {
  icon: typeof Home;
  label: string;
  accent: string;
}) => (
  <div className="flex items-center gap-3 md:flex-col md:gap-2.5 md:text-center">
    <span
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white transition-transform duration-300 hover:-translate-y-0.5"
      style={{ border: `1px solid ${accent}33`, color: accent }}
    >
      <Icon className="h-5 w-5" />
    </span>
    <span
      className="text-[12px] font-semibold leading-snug md:max-w-[9rem]"
      style={{ color: INK, fontFamily: DISPLAY }}
    >
      {label}
    </span>
  </div>
);

const ProcessRow = ({
  label,
  labelColor,
  steps,
  note,
  continuous,
}: {
  label: string;
  labelColor: string;
  steps: typeof traditionalSteps;
  note: string;
  continuous?: boolean;
}) => (
  <div
    className="rounded-[1.75rem] p-6 sm:p-8"
    style={{
      border: `1px solid ${INK}12`,
      backgroundColor: continuous ? SAGE_SOFT : "#FFFFFF",
    }}
  >
    <div className="grid gap-7 md:grid-cols-[minmax(0,200px)_1fr] md:items-center">
      <div
        className="text-[13px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: labelColor, fontFamily: DISPLAY }}
      >
        {label}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {steps.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col gap-4 md:flex-1 md:flex-row md:items-center md:justify-center"
          >
            <StepNode icon={s.icon} label={s.label} accent={labelColor} />
            {i < steps.length - 1 && (
              <Arrow className="ml-[22px] rotate-90 md:ml-0 md:rotate-0" />
            )}
          </div>
        ))}
        {continuous && (
          <Arrow className="ml-[22px] rotate-90 md:ml-0 md:rotate-0 md:self-center" />
        )}
      </div>
    </div>
    <p
      className="mt-6 text-sm md:pl-[224px]"
      style={{ color: `${INK}99` }}
    >
      {note}
    </p>
  </div>
);

const BeyondBleachPage = () => {
  return (
    <div className="bb-page" style={{ backgroundColor: CREAM, color: INK }}>
      <style>{`
        .bb-page { font-family: ${DISPLAY}; scroll-behavior: smooth; }
        .bb-page p, .bb-page li, .bb-page span { font-family: ${DISPLAY}; }
        @keyframes bb-arrow-nudge { 0%,100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
        .bb-arrow > svg { animation: bb-arrow-nudge 2.4s ease-in-out infinite; }
        @keyframes bb-float { 0%,100% { transform: translate3d(0,0,0); opacity:.5 } 50% { transform: translate3d(6px,-14px,0); opacity:.9 } }
        .bb-particle { animation: bb-float 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bb-arrow > svg, .bb-particle { animation: none !important; }
          .bb-page { scroll-behavior: auto; }
        }
      `}</style>

      <Navbar />

      <main id="main-content">
        {/* HERO */}
        <section
          className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40"
          style={{ backgroundColor: CREAM }}
        >
          <div className="site-container">
            <ScrollReveal variant="fadeUp" className="max-w-4xl">
              <Eyebrow>A different approach to clean</Eyebrow>
              <h1
                className="mt-6 font-extrabold tracking-[-0.045em] leading-[0.92] text-[3.25rem] sm:text-[5rem] lg:text-[7.5rem]"
                style={{ fontFamily: DISPLAY, color: INK }}
              >
                Beyond{" "}
                <em
                  className="not-italic"
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  bleach
                </em>
              </h1>
              <p
                className="mt-7 max-w-xl text-lg sm:text-xl leading-relaxed"
                style={{ color: `${INK}B3` }}
              >
                We&apos;ve been fighting nature for more than 100 years. Maybe
                it&apos;s time to work with it instead.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <PillLink to="/how-it-works">Discover how it works</PillLink>
                <PillLink to="/solutions" variant="light">
                  Find your solution
                </PillLink>
              </div>
            </ScrollReveal>
          </div>

          {/* Full-bleed comparison */}
          <div className="relative mt-14 sm:mt-20">
            <div className="grid lg:grid-cols-2">
              <ScrollReveal variant="fadeRight" className="relative">
                <div className="relative min-h-[420px] sm:min-h-[520px] overflow-hidden">
                  <img
                    src={oldWayImg}
                    alt="Gloved hand spraying disinfectant on a kitchen counter"
                    width={1200}
                    height={912}
                    className="absolute inset-0 h-full w-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
                  <div className="relative flex h-full min-h-[420px] sm:min-h-[520px] flex-col justify-end p-8 sm:p-12 lg:p-16">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                      The old way
                    </p>
                    <h2
                      className="mt-4 max-w-sm text-3xl sm:text-[2.5rem] font-extrabold tracking-[-0.03em] leading-[1.03] text-white"
                      style={{ fontFamily: DISPLAY }}
                    >
                      Kill the{" "}
                      <em
                        className="not-italic"
                        style={{
                          fontFamily: SERIF,
                          fontStyle: "italic",
                          fontWeight: 400,
                        }}
                      >
                        germs
                      </em>
                    </h2>
                    <p className="mt-4 max-w-md text-[15px] sm:text-base leading-relaxed text-white/70">
                      Traditional disinfectants reduce microorganisms on treated
                      surfaces, but their action represents a moment in time.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* VS divider (mobile/tablet) */}
              <div
                className="relative z-10 -my-7 flex justify-center lg:hidden"
                aria-hidden="true"
              >
                <span
                  className="grid h-14 w-14 place-items-center rounded-full text-[13px] font-semibold uppercase tracking-[0.12em] shadow-xl"
                  style={{ backgroundColor: CREAM, color: INK }}
                >
                  vs
                </span>
              </div>

              <ScrollReveal variant="fadeLeft" className="relative">
                <div className="relative min-h-[420px] sm:min-h-[520px] overflow-hidden">
                  <img
                    src={betterWayImg}
                    alt="Bright modern living room with natural daylight"
                    width={1200}
                    height={912}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${INK}E6 0%, ${INK}59 45%, transparent 100%)`,
                    }}
                  />
                  <div aria-hidden="true" className="absolute inset-0">
                    {[
                      [12, 22, 0],
                      [28, 62, 1.2],
                      [46, 34, 2.4],
                      [63, 71, 0.6],
                      [78, 28, 3.1],
                      [88, 58, 1.8],
                      [36, 12, 2.9],
                      [70, 46, 4.2],
                    ].map(([l, t, d]) => (
                      <span
                        key={`${l}-${t}`}
                        className="bb-particle absolute rounded-full"
                        style={{
                          left: `${l}%`,
                          top: `${t}%`,
                          width: 10,
                          height: 10,
                          animationDelay: `${d}s`,
                          background:
                            "radial-gradient(circle, rgba(63,165,147,0.95) 0%, rgba(63,165,147,0.12) 70%)",
                          boxShadow: "0 0 12px rgba(63,165,147,0.55)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="relative flex h-full min-h-[420px] sm:min-h-[520px] flex-col justify-end p-8 sm:p-12 lg:p-16">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                      A different approach
                    </p>
                    <h2
                      className="mt-4 max-w-md text-3xl sm:text-[2.5rem] font-extrabold tracking-[-0.03em] leading-[1.03] text-white"
                      style={{ fontFamily: DISPLAY }}
                    >
                      Support a healthier indoor{" "}
                      <em
                        className="not-italic"
                        style={{
                          fontFamily: SERIF,
                          fontStyle: "italic",
                          fontWeight: 400,
                        }}
                      >
                        microbiome
                      </em>
                    </h2>
                    <p className="mt-4 max-w-md text-[15px] sm:text-base leading-relaxed text-white/75">
                      EnviroBiotics continuously disperses carefully selected
                      environmental probiotics designed to help maintain
                      microbial balance on indoor surfaces.
                    </p>
                    <PillLink
                      to="/how-it-works"
                      variant="light"
                      className="mt-7"
                    >
                      Discover how it works
                    </PillLink>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            >
              <span
                className="grid h-20 w-20 place-items-center rounded-full text-base font-semibold uppercase tracking-[0.12em] shadow-2xl"
                style={{ backgroundColor: CREAM, color: INK }}
              >
                vs
              </span>
            </div>
          </div>

          {/* Statement bar */}
          <div style={{ backgroundColor: INK }}>
            <div className="site-container py-7 sm:py-8">
              <p
                className="mx-auto max-w-3xl text-center text-lg sm:text-2xl leading-snug text-white"
                style={{ fontFamily: SERIF, fontStyle: "italic" }}
              >
                Science is evolving. The way we care for our indoor environments
                should evolve too.
              </p>
            </div>
          </div>
        </section>

        {/* LIMITATIONS */}
        <section className="py-20 sm:py-28" style={{ backgroundColor: CREAM }}>
          <div className="site-container">
            <ScrollReveal variant="fadeUp" className="max-w-3xl">
              <Eyebrow>The limitation</Eyebrow>
              <Headline
                lead="The hidden limitation of traditional"
                italic="disinfectants"
                className="mt-5 text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem]"
              />
            </ScrollReveal>

            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {limitations.map(({ icon: Icon, title, body }, i) => (
                <ScrollReveal
                  key={title}
                  variant="fadeUp"
                  delay={i * 0.08}
                  className={`group lg:px-8 ${i > 0 ? "lg:border-l lg:border-[#1B2A2A]/10" : "lg:pl-0"}`}
                >
                  <Icon
                    className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ color: SAGE }}
                  />
                  <h3
                    className="mt-6 text-xl font-extrabold tracking-[-0.02em]"
                    style={{ fontFamily: DISPLAY, color: INK }}
                  >
                    {title}
                  </h3>
                  <p
                    className="mt-3 text-[15px] leading-relaxed"
                    style={{ color: `${INK}A6` }}
                  >
                    {body}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* NATURE DOESN'T STAY EMPTY */}
        <section className="pb-20 sm:pb-28" style={{ backgroundColor: CREAM }}>
          <div className="site-container">
            <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
              <ScrollReveal variant="fadeRight">
                <Eyebrow>Nature</Eyebrow>
                <Headline
                  lead="Nature doesn't stay"
                  italic="empty"
                  className="mt-5 text-[2rem] sm:text-[2.75rem]"
                />
                <p
                  className="mt-6 text-[17px] leading-relaxed"
                  style={{ color: `${INK}B3` }}
                >
                  When microorganisms are removed from a surface, new
                  microorganisms begin arriving almost immediately.
                </p>
                <p
                  className="mt-8 text-2xl sm:text-3xl leading-snug"
                  style={{ fontFamily: SERIF, fontStyle: "italic", color: INK }}
                >
                  The question isn&apos;t whether microbes will return. It&apos;s
                  which microbes return first.
                </p>
                <div
                  className="mt-8 pt-8"
                  style={{ borderTop: `1px solid ${INK}1A` }}
                >
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{ color: `${INK}A6` }}
                  >
                    Microbiome research is increasingly exploring whether stable
                    communities of beneficial microorganisms can help create
                    environments that are less favorable for the persistence of
                    certain unwanted microbes. This is an active area of
                    scientific research and approaches vary depending on the
                    application.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale">
                <div className="overflow-hidden rounded-[2rem]">
                  <img
                    src={splitMicroImg}
                    alt="Microscopic visualization comparing a less balanced microbial surface with one populated by beneficial microorganisms"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="py-20 sm:py-28" style={{ backgroundColor: SAGE_SOFT }}>
          <div className="site-container">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <ScrollReveal variant="fadeRight">
                <Eyebrow>Philosophy</Eyebrow>
                <Headline
                  lead="A different"
                  italic="philosophy"
                  className="mt-5 text-[2rem] sm:text-[2.75rem]"
                />
                <p
                  className="mt-6 text-[17px] leading-relaxed"
                  style={{ color: `${INK}B3` }}
                >
                  EnviroBiotics isn&apos;t built around the idea of repeatedly
                  sterilizing your environment. It&apos;s built around helping
                  your indoor environment function more like nature.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fadeLeft">
                <ul>
                  {philosophyPoints.map((p, i) => (
                    <li
                      key={p}
                      className="flex gap-4 py-5"
                      style={
                        i > 0 ? { borderTop: `1px solid ${INK}14` } : undefined
                      }
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0"
                        style={{ color: SAGE }}
                      />
                      <span
                        className="text-[16px] leading-relaxed"
                        style={{ color: INK }}
                      >
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* BETWEEN CLEANINGS */}
        <section className="py-20 sm:py-28" style={{ backgroundColor: CREAM }}>
          <div className="site-container">
            <ScrollReveal variant="fadeUp" className="max-w-3xl">
              <Eyebrow>The difference</Eyebrow>
              <Headline
                lead="The difference is what happens between"
                italic="cleanings"
                className="mt-5 text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem]"
              />
            </ScrollReveal>

            <div className="mt-12 space-y-6">
              <ScrollReveal variant="fadeUp">
                <ProcessRow
                  label="Traditional cleaning"
                  labelColor={INK}
                  steps={traditionalSteps}
                  note="Microorganisms return. The cycle starts again."
                />
              </ScrollReveal>
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <ProcessRow
                  label="EnviroBiotics approach"
                  labelColor={SAGE}
                  steps={enviroSteps}
                  note="Designed to help support microbial balance between cleanings."
                  continuous
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* NOT REPLACING CLEANING + HUMAN MICROBIOME */}
        <section className="pb-20 sm:pb-28" style={{ backgroundColor: CREAM }}>
          <div className="site-container grid gap-16 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal variant="fadeRight">
              <Eyebrow>Context</Eyebrow>
              <Headline
                lead="This isn't about replacing"
                italic="cleaning"
                className="mt-5 text-[1.85rem] sm:text-[2.4rem]"
              />
              <p
                className="mt-6 text-[16px] leading-relaxed"
                style={{ color: `${INK}B3` }}
              >
                Routine cleaning remains important. When disinfection is needed,
                for example in response to a known contamination event or in
                high-risk healthcare situations, it remains an essential
                infection-control tool.
              </p>
              <div
                className="mt-8 flex gap-4 pt-8"
                style={{ borderTop: `1px solid ${INK}1A` }}
              >
                <HelpCircle
                  className="mt-1 h-5 w-5 shrink-0"
                  style={{ color: SAGE }}
                />
                <div>
                  <p
                    className="text-2xl leading-snug"
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      color: INK,
                    }}
                  >
                    What happens between cleanings?
                  </p>
                  <p
                    className="mt-2 text-[15px] leading-relaxed"
                    style={{ color: `${INK}A6` }}
                  >
                    That is where continuous environmental microbiome management
                    offers a different approach.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft">
              <div className="overflow-hidden rounded-[2rem]">
                <img
                  src={indoorMicrobiomeImg}
                  alt="Modern living room with subtle visualization of beneficial environmental probiotics"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>
              <Headline
                lead="From the human microbiome to the indoor"
                italic="microbiome"
                className="mt-10 text-[1.85rem] sm:text-[2.4rem]"
              />
              <p
                className="mt-6 text-[16px] leading-relaxed"
                style={{ color: `${INK}B3` }}
              >
                We now understand that the human body is home to trillions of
                microorganisms that play important roles in digestion, immunity,
                metabolism, and other biological processes.
              </p>
              <p
                className="mt-6 text-2xl leading-snug"
                style={{ fontFamily: SERIF, fontStyle: "italic", color: SAGE }}
              >
                Health is about balance, not elimination.
              </p>
              <p
                className="mt-6 text-[16px] leading-relaxed"
                style={{ color: `${INK}B3` }}
              >
                The environments where we spend our lives are also living
                microbial ecosystems. EnviroBiotics is designed with that reality
                in mind.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* CONVERSION */}
        <section className="py-20 sm:py-28" style={{ backgroundColor: INK }}>
          <div className="site-container grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
            <ScrollReveal variant="fadeUp">
              <Eyebrow light>The next generation</Eyebrow>
              <Headline
                lead="Welcome to the next generation of indoor environmental"
                italic="health"
                color="#FFFFFF"
                className="mt-5 text-[2rem] sm:text-[2.75rem]"
              />
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/65">
                For more than a century, we focused primarily on eliminating
                microorganisms. Today, our understanding of microbial ecosystems
                is evolving, both within the human body and in the environments
                around us.
              </p>

              <div className="mt-12 grid gap-8 sm:grid-cols-3">
                {principles.map(({ icon: Icon, top, bottom }, i) => (
                  <div
                    key={top}
                    className="group sm:pl-6"
                    style={
                      i > 0
                        ? { borderLeft: "1px solid rgba(255,255,255,0.12)" }
                        : undefined
                    }
                  >
                    <Icon
                      className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1"
                      style={{ color: SAGE_LIGHT }}
                    />
                    <p className="mt-4 text-sm text-white/55">{top}</p>
                    <p
                      className="mt-1 text-lg leading-snug"
                      style={{ fontFamily: SERIF, fontStyle: "italic", color: "#FFFFFF" }}
                    >
                      {bottom}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal
              variant="fadeLeft"
              className="lg:border-l lg:border-white/10 lg:pl-16"
            >
              <h2
                className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white"
                style={{ fontFamily: DISPLAY }}
              >
                Go beyond{" "}
                <em
                  className="not-italic"
                  style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}
                >
                  bleach
                </em>
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/65">
                Discover a smarter way to manage the environment around you.
              </p>
              <PillLink to="/solutions" variant="light" className="mt-9">
                Find the right solution
              </PillLink>
            </ScrollReveal>
          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: CREAM }}>
          <div className="site-container">
            <ScrollReveal variant="fadeUp">
              <p
                className="text-center text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: `${INK}80` }}
              >
                Designed for the spaces where you spend your life
              </p>
              <div className="mt-10 grid grid-cols-3 gap-8 sm:grid-cols-6">
                {applications.map(({ icon: Icon, label }) => (
                  <div key={label} className="group text-center">
                    <Icon
                      className="mx-auto h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1"
                      style={{ color: INK }}
                    />
                    <p
                      className="mt-3 text-[11px] font-semibold tracking-[0.06em]"
                      style={{ color: `${INK}99` }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className="mt-14 pt-10 text-center"
                style={{ borderTop: `1px solid ${INK}1A` }}
              >
                <p
                  className="text-3xl leading-none"
                  style={{ fontFamily: SERIF, fontStyle: "italic", color: INK }}
                >
                  Continuous. Natural. Proactive.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default BeyondBleachPage;
