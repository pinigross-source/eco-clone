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

const NAVY = "#0B274D";
const GREEN = "#4D8D2A";
const CTA_GREEN = "#75B83B";

const limitations = [
  {
    icon: RefreshCw,
    title: "Surfaces Are Recolonized",
    body: "Once the disinfectant has evaporated or dried, surfaces begin to be recolonized by microorganisms.",
  },
  {
    icon: Layers,
    title: "Build-Up Continues",
    body: "Dust, skin cells, food residues, and moisture continue accumulating on indoor surfaces.",
  },
  {
    icon: Users,
    title: "New Microbes Keep Arriving",
    body: "People, pets, ventilation, and outdoor air continually introduce microorganisms into the environment.",
  },
  {
    icon: Clock,
    title: "Cleaning Is a Moment in Time",
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
  { icon: RefreshCw, label: "Recolonization Begins" },
];

const enviroSteps = [
  { icon: SprayCan, label: "Clean" },
  { icon: Leaf, label: "EnviroBiotics" },
  { icon: Sparkles, label: "Continuous Environmental Probiotics" },
  { icon: Repeat, label: "Ongoing Microbial Management" },
];

const principles = [
  { icon: Leaf, top: "Not simply cleaner.", bottom: "Balanced." },
  { icon: ShieldCheck, top: "Not simply disinfected.", bottom: "Continuously managed." },
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
  { icon: Store, label: "Commercial Spaces" },
];

const Arrow = ({ className = "" }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={`bb-arrow inline-flex items-center justify-center text-[#75B83B] ${className}`}
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
  <div className="flex items-center gap-3 md:flex-col md:gap-2 md:text-center">
    <span
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white border transition-transform duration-300 hover:-translate-y-0.5"
      style={{ borderColor: `${accent}33`, color: accent }}
    >
      <Icon className="h-5 w-5" />
    </span>
    <span
      className="text-[11px] font-semibold uppercase tracking-[0.12em] leading-snug md:max-w-[9rem]"
      style={{ color: NAVY }}
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
    className="rounded-2xl border p-5 sm:p-6 md:p-7"
    style={{
      borderColor: `${labelColor}22`,
      backgroundColor: continuous ? "#F3F8ED" : "#F6F8FB",
    }}
  >
    <div className="grid gap-6 md:grid-cols-[minmax(0,190px)_1fr] md:items-center">
      <div
        className="inline-flex w-fit items-center rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white"
        style={{ backgroundColor: labelColor }}
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
    <p className="mt-5 text-sm text-slate-600 md:pl-[214px]">{note}</p>
  </div>
);

const BeyondBleachPage = () => {
  return (
    <div className="bb-page bg-white text-slate-800">
      <style>{`
        .bb-page { font-family: "Poppins", ui-sans-serif, system-ui, sans-serif; scroll-behavior: smooth; }
        @keyframes bb-arrow-nudge { 0%,100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
        .bb-arrow > svg { animation: bb-arrow-nudge 2.4s ease-in-out infinite; }
        @keyframes bb-float { 0%,100% { transform: translate3d(0,0,0); opacity:.55 } 50% { transform: translate3d(6px,-14px,0); opacity:.9 } }
        .bb-particle { animation: bb-float 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bb-arrow > svg, .bb-particle { animation: none !important; }
          .bb-page { scroll-behavior: auto; }
        }
      `}</style>

      <Navbar />

      <main id="main-content">
        {/* HERO */}
        <section className="relative overflow-hidden bg-white pt-10 sm:pt-14 lg:pt-20">
          <div className="site-container">
            <ScrollReveal variant="fadeUp" className="text-center">
              <h1
                className="font-extrabold tracking-[-0.02em] leading-[0.95] text-[3rem] sm:text-[4.5rem] lg:text-[6.5rem]"
                style={{ color: NAVY }}
              >
                BEYOND <span style={{ color: GREEN }}>BLEACH</span>
              </h1>
              <p
                className="mx-auto mt-5 max-w-2xl text-base sm:text-lg font-semibold leading-relaxed"
                style={{ color: NAVY }}
              >
                We&apos;ve Been Fighting Nature for More Than 100 Years.
                <br className="hidden sm:block" /> Maybe It&apos;s Time to Work
                With It Instead.
              </p>
            </ScrollReveal>
          </div>

          {/* Comparison */}
          <div className="relative mt-10 sm:mt-14">
            <div className="grid lg:grid-cols-2">
              {/* OLD WAY */}
              <ScrollReveal variant="fadeRight" className="relative">
                <div className="relative min-h-[380px] sm:min-h-[440px] overflow-hidden">
                  <img
                    src={oldWayImg}
                    alt="Gloved hand spraying disinfectant on a kitchen counter"
                    width={1200}
                    height={912}
                    className="absolute inset-0 h-full w-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
                  <div className="relative flex h-full min-h-[380px] sm:min-h-[440px] flex-col justify-end p-7 sm:p-10 lg:p-14">
                    <span className="mb-4 inline-flex w-fit rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
                      The Old Way
                    </span>
                    <h2 className="max-w-sm text-2xl sm:text-3xl font-bold text-white">
                      KILL THE GERMS.
                    </h2>
                    <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-white/80">
                      Traditional disinfectants reduce microorganisms on treated
                      surfaces, but their action represents a moment in time.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* BETTER WAY */}
              <ScrollReveal variant="fadeLeft" className="relative">
                <div className="relative min-h-[380px] sm:min-h-[440px] overflow-hidden">
                  <img
                    src={betterWayImg}
                    alt="Bright modern living room with natural daylight"
                    width={1200}
                    height={912}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B274D]/85 via-[#0B274D]/35 to-transparent" />
                  {/* probiotic particles */}
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
                            "radial-gradient(circle, rgba(117,184,59,0.95) 0%, rgba(117,184,59,0.15) 70%)",
                          boxShadow: "0 0 12px rgba(117,184,59,0.6)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="relative flex h-full min-h-[380px] sm:min-h-[440px] flex-col justify-end p-7 sm:p-10 lg:p-14">
                    <span
                      className="mb-4 inline-flex w-fit rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white"
                      style={{ backgroundColor: GREEN }}
                    >
                      A Different Approach
                    </span>
                    <h2 className="max-w-md text-2xl sm:text-3xl font-bold text-white">
                      SUPPORT A HEALTHIER INDOOR MICROBIOME.
                    </h2>
                    <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-white/85">
                      EnviroBiotics continuously disperses carefully selected
                      environmental probiotics designed to help maintain
                      microbial balance on indoor surfaces.
                    </p>
                    <Link
                      to="/how-it-works"
                      className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:brightness-110 sm:w-fit"
                      style={{ backgroundColor: CTA_GREEN }}
                    >
                      Discover How It Works
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* VS badge */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            >
              <span
                className="grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-white text-xl font-extrabold shadow-xl"
                style={{ color: NAVY }}
              >
                VS
              </span>
            </div>
            <div className="flex justify-center lg:hidden" aria-hidden="true">
              <span
                className="-mt-7 grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-white text-base font-extrabold shadow-xl"
                style={{ color: NAVY }}
              >
                VS
              </span>
            </div>
          </div>

          {/* Statement bar */}
          <div style={{ backgroundColor: NAVY }}>
            <div className="site-container py-5 sm:py-6">
              <p className="text-center text-sm sm:text-base font-medium text-white/90">
                Science is evolving. The way we care for our indoor environments
                should evolve too.
              </p>
            </div>
          </div>
        </section>

        {/* 2. LIMITATIONS */}
        <section className="bg-white py-16 sm:py-24">
          <div className="site-container">
            <ScrollReveal variant="fadeUp">
              <h2
                className="mx-auto max-w-3xl text-center text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
                style={{ color: NAVY }}
              >
                THE HIDDEN LIMITATION OF TRADITIONAL DISINFECTANTS
              </h2>
            </ScrollReveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {limitations.map(({ icon: Icon, title, body }, i) => (
                <ScrollReveal
                  key={title}
                  variant="fadeUp"
                  delay={i * 0.08}
                  className="group text-center lg:border-l lg:first:border-l-0 lg:border-slate-200 lg:px-6"
                >
                  <span
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full border transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ borderColor: `${GREEN}44`, color: GREEN, backgroundColor: "#F5FAEF" }}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3
                    className="mt-5 text-sm font-bold uppercase tracking-[0.08em]"
                    style={{ color: NAVY }}
                  >
                    {title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
                    {body}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3 + 4. NATURE DOESN'T STAY EMPTY / PHILOSOPHY */}
        <section className="bg-[#F3F7EC] py-16 sm:py-24">
          <div className="site-container">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,360px)_1fr] lg:gap-10">
              <ScrollReveal variant="fadeRight">
                <h2
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{ color: NAVY }}
                >
                  NATURE DOESN&apos;T STAY EMPTY
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
                  When microorganisms are removed from a surface, new
                  microorganisms begin arriving almost immediately.
                </p>
                <div className="mt-6 flex gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Leaf className="h-5 w-5 shrink-0" style={{ color: GREEN }} />
                  <p className="text-[15px] leading-relaxed" style={{ color: NAVY }}>
                    The question isn&apos;t whether microbes will return.
                    <br />
                    <span className="font-semibold" style={{ color: GREEN }}>
                      It&apos;s which microbes return first.
                    </span>
                  </p>
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-slate-700">
                  Microbiome research is increasingly exploring whether stable
                  communities of beneficial microorganisms can help create
                  environments that are less favorable for the persistence of
                  certain unwanted microbes.
                </p>
                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  This is an active area of scientific research and approaches
                  vary depending on the application.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="scale" className="order-first lg:order-none">
                <div className="mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-full border-8 border-white shadow-xl">
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

              <ScrollReveal variant="fadeLeft">
                <h2
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{ color: NAVY }}
                >
                  A DIFFERENT PHILOSOPHY
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
                  EnviroBiotics isn&apos;t built around the idea of repeatedly
                  sterilizing your environment. It&apos;s built around helping
                  your indoor environment function more like nature.
                </p>
                <ul className="mt-6 space-y-3.5">
                  {philosophyPoints.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                        style={{ backgroundColor: GREEN }}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-[15px] leading-relaxed text-slate-700">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 5. KEY COMPARISON */}
        <section className="bg-white py-16 sm:py-24">
          <div className="site-container">
            <ScrollReveal variant="fadeUp">
              <h2
                className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
                style={{ color: NAVY }}
              >
                THE DIFFERENCE IS WHAT HAPPENS BETWEEN CLEANINGS
              </h2>
            </ScrollReveal>

            <div className="mt-10 space-y-5">
              <ScrollReveal variant="fadeUp">
                <ProcessRow
                  label="Traditional Cleaning"
                  labelColor={NAVY}
                  steps={traditionalSteps}
                  note="Microorganisms return. The cycle starts again."
                />
              </ScrollReveal>
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <ProcessRow
                  label="EnviroBiotics Approach"
                  labelColor={GREEN}
                  steps={enviroSteps}
                  note="Designed to help support microbial balance between cleanings."
                  continuous
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 6 + 7 */}
        <section className="bg-[#F8FAFC] py-16 sm:py-24">
          <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal variant="fadeRight">
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ color: NAVY }}
              >
                THIS ISN&apos;T ABOUT REPLACING CLEANING
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
                Routine cleaning remains important.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
                When disinfection is needed, for example in response to a known
                contamination event or in high-risk healthcare situations, it
                remains an essential infection-control tool.
              </p>
              <p className="mt-5 text-[15px] font-semibold" style={{ color: GREEN }}>
                But for everyday indoor environments, there&apos;s another
                question worth asking:
              </p>
              <div className="mt-5 flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white"
                  style={{ backgroundColor: GREEN }}
                >
                  <HelpCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-lg font-bold" style={{ color: NAVY }}>
                    What happens between cleanings?
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    That is where continuous environmental microbiome management
                    offers a different approach.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft">
              <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <h2
                    className="text-2xl sm:text-3xl font-bold tracking-tight"
                    style={{ color: NAVY }}
                  >
                    FROM THE HUMAN MICROBIOME TO THE INDOOR MICROBIOME
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
                    We now understand that the human body is home to trillions of
                    microorganisms that play important roles in digestion,
                    immunity, metabolism, and other biological processes.
                  </p>
                  <p
                    className="mt-5 text-lg font-bold"
                    style={{ color: GREEN }}
                  >
                    Health is about balance, not elimination.
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
                    The environments where we spend our lives are also living
                    microbial ecosystems.
                  </p>
                  <p className="mt-2 text-[15px] font-semibold" style={{ color: NAVY }}>
                    EnviroBiotics is designed with that reality in mind.
                  </p>
                </div>
                <div className="mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-full border-8 border-white shadow-lg">
                  <img
                    src={indoorMicrobiomeImg}
                    alt="Modern living room with subtle visualization of beneficial environmental probiotics"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 8 + 9. NAVY CONVERSION */}
        <section style={{ backgroundColor: NAVY }} className="py-16 sm:py-24">
          <div className="site-container grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <ScrollReveal variant="fadeUp">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-bold leading-tight text-white">
                WELCOME TO THE NEXT GENERATION OF
                <br className="hidden sm:block" /> INDOOR ENVIRONMENTAL HEALTH
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70">
                For more than a century, we focused primarily on eliminating
                microorganisms.
              </p>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">
                Today, our understanding of microbial ecosystems is evolving,
                both within the human body and in the environments around us.
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-3">
                {principles.map(({ icon: Icon, top, bottom }) => (
                  <div key={top} className="group text-center sm:text-left">
                    <span
                      className="mx-auto grid h-12 w-12 place-items-center rounded-full border transition-transform duration-300 group-hover:-translate-y-1 sm:mx-0"
                      style={{ borderColor: `${CTA_GREEN}66`, color: CTA_GREEN }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 text-sm text-white/70">{top}</p>
                    <p
                      className="mt-1 text-sm font-bold"
                      style={{ color: CTA_GREEN }}
                    >
                      {bottom}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft" className="lg:pl-10 lg:border-l lg:border-white/10">
              <h2
                className="text-3xl sm:text-4xl font-bold"
                style={{ color: CTA_GREEN }}
              >
                Go Beyond Bleach.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75">
                Discover a smarter way to manage the environment around you.
              </p>
              <Link
                to="/solutions"
                className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:w-fit"
                style={{ backgroundColor: CTA_GREEN }}
              >
                Find the Right Solution
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* 10. APPLICATIONS */}
        <section className="bg-white py-12 sm:py-16">
          <div className="site-container">
            <ScrollReveal variant="fadeUp">
              <p
                className="text-center text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: NAVY }}
              >
                Designed for the spaces where you spend your life
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 sm:grid-cols-6">
                {applications.map(({ icon: Icon, label }) => (
                  <div key={label} className="group text-center">
                    <Icon
                      className="mx-auto h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1"
                      style={{ color: NAVY }}
                    />
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <p className="text-xl font-bold" style={{ color: NAVY }}>
                  ENVIRO<span style={{ color: GREEN }}>BIOTICS</span>
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
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
