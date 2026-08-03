import { lazy, Suspense, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Building2,
  ShieldCheck,
  Wind,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import hospitalityImg from "@/assets/biz-hospitality.jpg.asset.json";
import healthcareImg from "@/assets/biz-healthcare.jpg.asset.json";
import educationImg from "@/assets/biz-education.jpg.asset.json";
import officesImg from "@/assets/biz-offices.jpg.asset.json";
import lungsDiagram from "@/assets/hvac-lungs-anatomy.jpg";
import hvacBuildingLungsBg from "@/assets/hvac-building-lungs-bg.avif";

const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

const VIDEO_URL = "https://drive.google.com/file/d/168FTHDrbj5OAwZrXMvKiakNeARXN3mjq/preview";

const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "hospitality", label: "Hospitality" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "offices", label: "Offices" },
  { id: "how-it-works", label: "How It Works" },
  { id: "contact", label: "Contact" },
];

const industries = [
  {
    id: "hospitality",
    label: "Hospitality",
    img: hospitalityImg.url,
    desc: "Hotels, resorts, casinos, and spas. Guest rooms, lobbies, and back-of-house stay fresher without chemical maskers or room downtime.",
    points: ["Room-by-room or whole-property coverage", "Works between turnovers, 24/7", "No odor maskers, no ozone"],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    img: healthcareImg.url,
    desc: "Clinics, senior living, rehabilitation and wellness centers. A continuous probiotic layer that complements existing hygiene protocols.",
    points: ["Complements, never replaces, clinical cleaning", "FDA GRAS organisms, safe around occupants", "Documented protocols for facility teams"],
  },
  {
    id: "education",
    label: "Education",
    img: educationImg.url,
    desc: "Universities, schools, dorms, and childcare. High-traffic shared rooms treated continuously through the air handling you already run.",
    points: ["Classrooms, dorms, gyms, and cafeterias", "Safe for children and staff", "No disruption to class schedules"],
  },
  {
    id: "offices",
    label: "Offices",
    img: officesImg.url,
    desc: "Offices, co-working, training and leisure facilities. Reduce dust, dander, and musty odors across shared HVAC zones.",
    points: ["Whole-floor coverage via HVAC", "Quiet, automated, maintenance-light", "Service plans with refills and reporting"],
  },
];

const cirsData = [
  { species: "Stachybotrys chartarum", before: 250, after: 35, drop: "87%" },
  { species: "Chaetomium globosum", before: 510, after: 50, drop: "91%" },
  { species: "Aspergillus versicolor", before: 650, after: 480, drop: "26%" },
];
const CIRS_MAX = 650;

export default function BusinessPage() {
  const [open, setOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="EnviroBiotics for Business: Hospitality, Healthcare, Education & Offices"
        description="Probiotic environmental care for hotels, healthcare, schools, and offices. Continuous HVAC-connected coverage of surfaces, objects, and air. Talk to our team."
        path="/business"
        jsonLd={makeBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "For Business", url: "/business" },
        ])}
      />
      <Navbar />

      {/* Section nav */}
      <nav
        aria-label="Business sections"
        className="sticky top-16 z-30 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
      >
        <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
          <ul className="flex gap-1 overflow-x-auto no-scrollbar py-2 -mx-1 text-sm">
            {sectionNav.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted/70 transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="pb-20">
        {/* Hero / Overview — minimalist dark luxe */}
        <section id="overview" className="scroll-mt-32 relative w-full overflow-hidden">
          <div className="relative min-h-[72vh] md:min-h-[84vh] w-full">
            <img
              src={hvacBuildingLungsBg}
              alt="Modern commercial building interior protected by EnviroBiotics probiotic air and surface purification"
              className="absolute inset-0 h-full w-full object-cover"
              width={1920}
              height={1280}
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20 md:bg-gradient-to-r md:from-black/75 md:via-black/40 md:to-transparent"
            />

            <div className="relative z-10 flex min-h-[72vh] md:min-h-[84vh] items-center justify-center">
              <div className="container px-5 sm:px-6 max-w-4xl mx-auto text-center py-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
                  <Building2 className="w-3 h-3 text-white/70" />
                  <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-white/80">
                    EnviroBiotics for Business
                  </span>
                </div>

                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] mb-8"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  A unified solution,
                  <br />
                  <span className="italic font-light text-white/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                    designed for your own space.
                  </span>
                </h1>

                <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/70 font-light leading-relaxed mb-12">
                  Our systems are designed to protect all kinds of facilities: healthcare, hospitality, universities and
                  schools, physical training and leisure. The same probiotic formula provides safe, automated, and continuous
                  purification of everything under your roof, all of your surfaces, objects, and air.
                </p>

                <p className="text-xs text-white/60 mt-5 tracking-wide">No obligation. Walk-through, scope, and quote.</p>
              </div>
            </div>
          </div>
        </section>


        {/* Industries */}
        <section className="container px-4 sm:px-6 max-w-6xl mx-auto mt-24">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60 mb-3">Solutions by industry</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] text-foreground text-balance">
              Choose the environment closest to yours.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Every deployment is tuned to how your teams actually work.
            </p>
          </div>

          <div className="space-y-16">
            {industries.map((ind, i) => (
              <div
                key={ind.id}
                id={ind.id}
                className={`scroll-mt-36 grid md:grid-cols-12 gap-8 md:gap-12 items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="md:col-span-5 flex justify-center">
                  <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border border-border/60 shadow-sm">
                    <img
                      src={ind.img}
                      alt={`${ind.label} environment treated with EnviroBiotics`}
                      width={800}
                      height={800}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-display text-2xl md:text-3xl tracking-[-0.02em] text-foreground mb-3">{ind.label}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">{ind.desc}</p>
                  <ul className="space-y-2.5">
                    {ind.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/85">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works: building has lungs */}
        <section id="how-it-works" className="scroll-mt-36 container px-4 sm:px-6 max-w-5xl mx-auto mt-24">
          <div className="rounded-3xl border border-border/60 bg-muted/30 p-8 md:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60 mb-4">Commercial solution</p>
            <h2 className="font-display text-3xl md:text-5xl tracking-[-0.02em] text-foreground text-balance mb-4">
              Your building has lungs.
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              At the heart of every building is a hidden, living system. The HVAC system functions as the building's
              respiratory system, sustaining comfort, air quality, and overall indoor health. E-Biotic Pro is a
              centralized, HVAC-connected device that turns it into a continuous probiotic distribution network for
              large areas.
            </p>

            <figure className="mt-10 rounded-2xl overflow-hidden border border-border/60 bg-background">
              <img
                src={lungsDiagram}
                alt="Diagram comparing the anatomy of human lungs with a building's HVAC system: fresh air intake, filters, ductwork and supply vents, and exhaust vents"
                loading="lazy"
                width={1600}
                height={893}
                className="w-full h-auto"
              />
            </figure>

            <div className="grid md:grid-cols-3 gap-8 mt-10">

              {[
                { icon: Wind, step: "01", title: "Connected to your HVAC", desc: "Installed at the air handler, no redesign of your building." },
                { icon: Building2, step: "02", title: "Distributed everywhere", desc: "Probiotics travel with the airflow to every treated zone." },
                { icon: ShieldCheck, step: "03", title: "Working continuously", desc: "Surfaces and air are re-balanced 24/7, with service and refills." },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div key={step}>
                  <div className="text-xs font-medium text-foreground/50 tracking-[0.2em] mb-3">{step}</div>
                  <Icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-1.5">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-7 rounded-full"
                onClick={() => setVideoOpen(true)}
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch how it works (2 min)
              </Button>
            </div>
          </div>
        </section>

        {/* Respiratory health / CIRS evidence */}
        <section className="container px-4 sm:px-6 max-w-5xl mx-auto mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60 mb-3">Respiratory health</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] text-foreground text-balance">
              Measured in a real, water-damaged building.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              In a CIRS (Chronic Inflammatory Response Syndrome) case study, ERMI and HERTSMI-2 tests were run on the
              same living space before treatment and again after three weeks of EnviroBiotics distributed through an
              HVAC-connected system. Spore equivalence levels of the most toxic mold species dropped sharply.
            </p>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card p-6 md:p-10">
            <div className="flex items-center gap-6 mb-8 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-muted-foreground/30" /> Before treatment
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-primary" /> After 3 weeks
              </span>
              <span className="ml-auto hidden sm:inline">Spore equivalents (SE/mg)</span>
            </div>

            <div className="space-y-7">
              {cirsData.map((row) => (
                <div key={row.species}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm font-medium text-foreground italic">{row.species}</span>
                    <span className="text-sm font-semibold text-primary">-{row.drop}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-muted-foreground/30"
                          style={{ width: `${(row.before / CIRS_MAX) * 100}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">{row.before}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(row.after / CIRS_MAX) * 100}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-xs tabular-nums text-foreground">{row.after}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground/80 mt-8 leading-relaxed">
              Source: ERMI / HERTSMI-2 laboratory testing, Bloomingdale, IL residence (pre-treatment February 2025,
              post-treatment May 2025). Results after only three weeks of treatment; longer deployments are expected to
              show broader effect. Full report available on request.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-36 container px-4 sm:px-6 max-w-5xl mx-auto mt-24">
          <div className="rounded-3xl border border-border/60 bg-muted/30 p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] text-foreground text-balance mb-4">
              Ready to scope your building?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Tell us about your facility. We'll come back with a walk-through plan and a proposal.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base rounded-full"
                onClick={() => setOpen(true)}
              >
                Talk to our team
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mt-12 text-left">
              <a
                href="tel:8336923883"
                className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 hover:border-primary/50 transition-colors"
              >
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">Sales</span>
                  <span className="font-medium text-foreground">(833) 692-3883</span>
                </span>
              </a>
              <a
                href="mailto:contact@envirobiotics.com"
                className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 hover:border-primary/50 transition-colors"
              >
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">Email</span>
                  <span className="font-medium text-foreground break-all">contact@envirobiotics.com</span>
                </span>
              </a>
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">Hours</span>
                  <span className="font-medium text-foreground">Mon–Fri, 9 AM–4 PM EST</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContactFormDialog open={open} onOpenChange={setOpen} />

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-0">
          <DialogTitle className="sr-only">How EnviroBiotics works for business</DialogTitle>
          <div className="aspect-video w-full">
            {videoOpen && (
              <iframe
                src={VIDEO_URL}
                title="How EnviroBiotics works"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
