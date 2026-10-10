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
  Ruler,
  Calendar,
  Play,
  Download,
} from "lucide-react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Link } from "@tanstack/react-router";
import { TrustedPlacesSection } from "@/components/TrustedPlacesSection";
import { BusinessQuoteForm } from "@/components/BusinessQuoteForm";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import lobbyAsset from "@/assets/business/lobby.jpg.asset.json";
import comboAsset from "@/assets/business/combo.png.asset.json";
import "@/components/business-page.css";
import hospitalityImg from "@/assets/biz-hospitality.jpg.asset.json";
import healthcareImg from "@/assets/biz-healthcare.jpg.asset.json";
import educationImg from "@/assets/biz-education.jpg.asset.json";
import officesImg from "@/assets/biz-offices.jpg.asset.json";
import biotica800Img from "@/assets/ebiotic-pro-office.avif.asset.json";
import lungsDiagramAsset from "@/assets/hvac-lungs-anatomy.jpg.asset.json";
import bacteriaChart from "@/assets/evidence-bacteria-counts.avif.asset.json";
import absenteeismChart from "@/assets/evidence-absenteeism.avif.asset.json";
import moldChart from "@/assets/evidence-mold-reduction.avif.asset.json";
import virusChart from "@/assets/evidence-virus-reduction.avif.asset.json";

const lungsDiagram = lungsDiagramAsset.url;

const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

const VIDEO_URL = "https://player.vimeo.com/video/1166149538?autoplay=1&title=0&byline=0&portrait=0";

const sectionNav = [
  { id: "overview", label: "Overview" }, { id: "hospitality", label: "Industries" },
  { id: "ebiotic-pro", label: "E-Biotic Pro" }, { id: "how-it-works", label: "How It Works" },
  { id: "evidence", label: "Evidence" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" },
];
const industries = [
  { id: "hospitality", label: "Hospitality", title: "Fresh between every turnover.", img: hospitalityImg.url, desc: "Hotels, resorts, casinos and spas. Guest rooms, corridors and lobbies, with no perfume covering anything up.", points: ["Room-by-room or whole-property coverage", "Works between turnovers, 24/7", "No odor maskers, no ozone"] },
  { id: "healthcare", label: "Healthcare and senior living", title: "A layer that never clocks out.", img: healthcareImg.url, desc: "Clinics, rehab and care homes. A continuous probiotic layer that complements, never replaces, your cleaning protocols.", points: ["Complements, never replaces, clinical cleaning", "FDA GRAS organisms, safe around occupants", "Documented protocols for facility teams"] },
  { id: "education", label: "Education", title: "Shared rooms, treated all day.", img: educationImg.url, desc: "Schools, universities, dorms and childcare. Classrooms, gyms and cafeterias, through the air handling you already run.", points: ["Classrooms, dorms, gyms and cafeterias", "Safe around children and staff when used as directed", "No fragrance, no ozone"] },
  { id: "offices", label: "Offices", title: "Whole floors, quietly covered.", img: officesImg.url, desc: "Meeting rooms, open floors and receptions. Automatic and quiet, with control from a smartphone app.", points: ["Whole-floor coverage via HVAC", "24/7, quiet, easy installation and maintenance", "Smartphone app or central program with real-time alerts"] },
];
const faqs = [
  { question: "Is it safe around guests, patients and staff?", answer: "Registered with the EPA, Reg. No. 94339-1, and certified by MADE SAFE. Use it as the label directs. No ozone, no fragrance." },
  { question: "Does it replace our cleaning team?", answer: "No. It adds a continuous layer between cleaning shifts, on surfaces and in ductwork that cleaning can't reach every hour." },
  { question: "How much space does one E-Biotic Pro cover?", answer: "Up to 25,000 sq ft per unit depending on your air handling; larger buildings use more than one unit; we size it with you." },
  { question: "What does installation involve?", answer: "Connects at the air handler, no redesign. Watch the installation video or ask for a walk-through." },
  { question: "How are refills and service handled?", answer: "We or your local dealer handle refills and service on a schedule." },
  { question: "We don't have central HVAC. Can we still use it?", answer: "Yes, Biotica 800 and BioLogic Mini work room by room; volume pricing available." },
];
const INSTALLATION_VIDEO_URL = "https://player.vimeo.com/video/1085737785?autoplay=1";


export default function BusinessPage() {
  const [videoUrl, setVideoUrl] = useState(VIDEO_URL);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="business-page min-h-screen bg-background">
      <SEOHead
        title="For Hotels, Offices, Gyms & Clinics | EnviroBiotics"
        description="Probiotic environmental care for hotels, healthcare, schools and offices. HVAC-connected coverage of surfaces, objects, air and ducts, 24/7. Free facility quote."
        image="https://cdn.shopify.com/s/files/1/0785/0826/1628/files/ebh-business-lobby.jpg?v=1791650520&width=2000"
        path="/business"
        jsonLd={{ "@context": "https://schema.org", "@graph": [makeBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "For Business", url: "/business" },
        ]), { "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] }}
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
        <section id="overview" className="scroll-mt-32 px-4 sm:px-6 pt-14 sm:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-5">EnviroBiotics for business</p>
            <h1 className="business-hero-title font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.12]">Spaces that smell like nothing.<br /><span className="text-primary">Every day.</span></h1>
            <p className="mx-auto max-w-3xl mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">Natural probiotics delivered through your HVAC or room by room. They keep working on the carpets, upholstery and ductwork where odor, mold and allergens build up, 24/7, with no fragrance and no chemicals.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Button variant="hero" size="lg" asChild><a href="#quote">Get a free facility quote<ArrowRight /></a></Button>
              <Button variant="outline" size="lg" asChild><a href="tel:8336923883"><Phone />(833) 692-3883</a></Button>
            </div>
            <Button variant="link" className="mt-3" onClick={() => { setVideoUrl(VIDEO_URL); setVideoOpen(true); }}><Play />Watch how it works (2 min)</Button>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">EPA Reg. No. 94339-1 · MADE SAFE® certified · Reply within one business day</p>
          </div>
          <img src={lobbyAsset.url} alt="Bright hotel lobby reception with a Biotica 800 on the marble counter" width={2000} height={1125} loading="eager" fetchPriority="high" className="mx-auto mt-10 sm:mt-12 w-full max-w-[1320px] aspect-video object-cover rounded-2xl" />
        </section>
        <TrustedPlacesSection heading="Already running in hotels, resorts, offices, schools and arenas" hideClosing />
        <section className="business-dark text-background py-16 sm:py-20">
          <div className="container max-w-6xl mx-auto px-5 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">The problem</p>
            <h2 className="font-display text-3xl sm:text-4xl max-w-3xl">People notice a smell in the first five seconds.</h2>
            <p className="mt-5 max-w-3xl text-background/70 leading-relaxed">Guests, patients, students and staff all judge a space by how it smells. Odor-causing bacteria, mold spores and allergens settle into carpets, upholstery, curtains and ductwork, so cleaning shifts and fragrance only hold it back for a few hours.</p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">{[
              { title: "Fragrance and sprays", text: "Cover it up. Fade in hours." },
              { title: "Air purifiers", text: "Clean the air in one room. Never the carpet." },
              { title: "EnviroBiotics", text: "Works on surfaces, objects, air and ducts. All day, every day." },
            ].map((item, i) => <div key={item.title} className={`border-t pt-6 ${i === 2 ? "border-primary text-primary" : "border-background/25"}`}><h3 className="font-display text-xl mb-3">{item.title}</h3><p className={i === 2 ? "leading-relaxed" : "leading-relaxed text-background/70"}>{item.text}</p></div>)}</div>
          </div>
        </section>
        <section className="container px-4 sm:px-6 max-w-[1320px] mx-auto mt-20 sm:mt-24">
          <div className="max-w-2xl mb-10"><p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">Solutions by industry</p><h2 className="font-display text-3xl md:text-4xl">Every deployment is tuned to how your teams actually work.</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">{industries.map(ind => <article key={ind.id} id={ind.id} className="scroll-mt-36 min-w-0 rounded-lg border border-border bg-card overflow-hidden">
            <img src={ind.img} alt={`${ind.label} environment treated with EnviroBiotics`} width={800} height={600} loading="lazy" className="w-full aspect-[4/3] object-cover" />
            <div className="p-6"><p className="text-xs font-semibold text-primary mb-3">{ind.label}</p><h3 className="font-display text-2xl leading-tight mb-4">{ind.title}</h3><p className="text-sm text-muted-foreground leading-relaxed mb-6">{ind.desc}</p><ul className="space-y-3">{ind.points.map(point => <li key={point} className="flex gap-2 text-sm leading-relaxed"><CheckCircle2 className="w-4 h-4 shrink-0 mt-1 text-primary" /><span>{point}</span></li>)}</ul></div>
          </article>)}</div>
          <p className="mt-7 text-center text-sm text-muted-foreground">Also running in gyms and fitness clubs, pet businesses, arenas and transit.</p>
        </section>

        {/* E-Biotic Pro — Commercial Solution */}
        <section id="ebiotic-pro" className="scroll-mt-36 container px-4 sm:px-6 max-w-6xl mx-auto mt-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/55 mb-4">
                Commercial Solution
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.03em] text-foreground text-balance mb-4">
                E-Biotic Pro
              </h2>
              <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed mb-6">
                A centralized HVAC-connected device for large areas
              </p>
              <dl className="divide-y divide-border mb-8">{[
                ["Coverage", "Up to 25,000 sq ft per unit"],
                ["Installation", "At the air handler, no redesign of your building"],
                ["Control", "Smartphone app or central program, with alerts"],
                ["Service", "Refills and service handled by us or your local dealer"],
                ["Safety", "EPA Reg. No. 94339-1, no ozone, no fragrance"],
              ].map(([label, value]) => <div key={label} className="grid sm:grid-cols-[110px_1fr] gap-1 sm:gap-4 py-4"><dt className="font-semibold">{label}</dt><dd className="text-muted-foreground leading-relaxed">{value}</dd></div>)}</dl>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 h-12 px-6 rounded-full"
                  asChild
                >
                  <a href="#quote"><Calendar className="w-4 h-4 mr-2" />Get a Free Quote</a>
                </Button>
                <a
                  href="tel:8336923883"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-border/60 text-foreground font-medium hover:bg-muted/50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (833) 692 3883
                </a>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Request a quote or call us to find the dealer that services your area
              </p>
            </div>

            <div className="relative flex flex-col gap-4">
              <div className="rounded-[2rem] overflow-hidden border border-border/60 bg-muted aspect-[3/2] lg:aspect-[4/3] flex items-center justify-center">
                <img
                  src={biotica800Img.url}
                  alt="E-Biotic Pro commercial HVAC-connected probiotic device mounted on a wall in a modern office lounge"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href="https://cdn.shopify.com/s/files/1/0785/0826/1628/files/E-Biotic-Pro-User-Manual.pdf?v=1791483136"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">User Manual</p>
                    <p className="text-xs text-primary font-medium">Download PDF</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
                <Button variant="ghost"
                  onClick={() => { setVideoUrl(INSTALLATION_VIDEO_URL); setVideoOpen(true); }}
                  className="h-auto whitespace-normal flex items-center justify-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group text-left"
                >
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Play className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">Installation Guide</p>
                    <p className="text-xs text-muted-foreground">Watch Video</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial solution: Your building has lungs */}
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
                onClick={() => { setVideoUrl(VIDEO_URL); setVideoOpen(true); }}
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch how it works (2 min)
              </Button>
            </div>
          </div>
        </section>

        {/* Evidence */}
        <section id="evidence" className="scroll-mt-36 container px-4 sm:px-6 max-w-6xl mx-auto mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-4">Evidence</p>
            <h2 className="font-display text-3xl md:text-5xl tracking-[-0.02em] text-foreground text-balance">
              Measured in the lab. Felt in the building.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                src: bacteriaChart.url,
                alt: "Chart of live E. coli and S. epidermidis counts over 21 days, with and without EnviroBiotics treatment",
                caption: "Microbial growth stayed controlled through the treatment period, while untreated counts climbed sharply after day 14.",
              },
              {
                src: absenteeismChart.url,
                alt: "Bar chart comparing monthly employee absences in 2024 versus 2025, showing a 57% reduction October to December",
                caption: "A 57% drop in absenteeism across Q4 in a treated facility, compared with the same period the year before.",
              },
              {
                src: moldChart.url,
                alt: "Bar chart of toxic mold levels before and after EnviroBiotics treatment for three mold species",
                caption: "Toxic mold levels fell by up to 95% after treatment across Stachybotrys, Chaetomium, and Aspergillus species.",
              },
              {
                src: virusChart.url,
                alt: "Laboratory results showing residual viral infectivity over time in a pseudo COVID-19 model, with colony-forming assay plates",
                caption: "In a University of Genoa pseudo-virus model, residual infectivity dropped 99.7% three hours after treatment.",
              },
            ].map((fig) => (
              <figure
                key={fig.src}
                className="group h-full flex flex-col rounded-3xl border border-border/60 bg-card overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]"
              >
                <div className="bg-background p-3 sm:p-5 flex items-center justify-center aspect-[4/3]">
                  <img
                    src={fig.src}
                    alt={fig.alt}
                    loading="lazy"
                    className="w-full h-full object-contain rounded-2xl"
                  />
                </div>
                <figcaption className="border-t border-border/60 px-6 py-5 text-sm leading-relaxed text-muted-foreground">
                  {fig.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Results from independent and partner lab tests and one facility case study. See our <Link to="/research" className="underline underline-offset-4">Research page</Link> for methods and sources. EnviroBiotics complements, and does not replace, cleaning and maintenance.</p>
        </section>

        <section className="bg-muted/50 mt-24 py-16 sm:py-20">
          <div className="container max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
            <div><p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-4">Room-by-room coverage</p><h2 className="font-display text-3xl sm:text-4xl mb-5">No central HVAC?<br />Go room by room.</h2><p className="text-muted-foreground leading-relaxed">For suites, treatment rooms, small offices and studios. The Biotica 800 covers up to 800 sq ft and the BioLogic Mini up to 300 sq ft. Plug in, no installation. We quote volume pricing for both.</p><div className="flex flex-col sm:flex-row gap-3 mt-8"><Button variant="hero" asChild><a href="#quote">Ask for volume pricing<ArrowRight /></a></Button><Button variant="outline" asChild><Link to="/shop">See the devices</Link></Button></div></div>
            <img src={comboAsset.url} width={1200} height={1200} alt="Biotica 800 and BioLogic Mini room-by-room probiotic devices" loading="lazy" className="w-full max-h-[460px] object-contain" />
          </div>
        </section>
        <section className="container max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24">
          <h2 className="font-display text-3xl sm:text-4xl mb-12">How we work with you</h2>
          <div className="grid md:grid-cols-3 gap-10">{[
            ["1", "Tell us about your space", "Type of building, size and what you want solved; it takes two minutes."],
            ["2", "Get a plan and a quote", "Within one business day, from us or the dealer that serves your area."],
            ["3", "Install and forget", "Installed at the air handler or room by room, with refills and service handled."],
          ].map(([step, title, text]) => <div key={step} className="border-t border-border pt-6"><span className="text-primary font-display text-4xl">{step}</span><h3 className="font-display text-xl mt-5 mb-3">{title}</h3><p className="text-muted-foreground leading-relaxed">{text}</p></div>)}</div>
        </section>
        <section id="faq" className="scroll-mt-36 container max-w-4xl mx-auto px-5 sm:px-6 pb-20 sm:pb-24">
          <p className="text-xs uppercase tracking-[0.18em] text-primary mb-4">FAQ</p><h2 className="font-display text-3xl sm:text-4xl mb-8">Questions facility teams ask</h2>
          <Accordion type="single" collapsible>{faqs.map((faq, i) => <AccordionItem key={faq.question} value={`faq-${i}`}><AccordionTrigger className="text-left gap-4 text-base py-6">{faq.question}</AccordionTrigger><AccordionContent className="text-muted-foreground leading-relaxed text-base">{faq.answer}{i === 3 && <Button variant="link" className="block px-0 mt-2 text-primary" onClick={() => { setVideoUrl(INSTALLATION_VIDEO_URL); setVideoOpen(true); }}>Watch installation video</Button>}</AccordionContent></AccordionItem>)}</Accordion>
        </section>
        <section id="quote" className="business-dark text-background scroll-mt-32 py-16 sm:py-24">
          <div className="container max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="min-w-0"><p className="text-xs uppercase tracking-[0.18em] text-primary mb-4">Free facility quote</p><h2 className="font-display text-3xl sm:text-5xl mb-6">Tell us about your space.</h2><p className="text-background/75 leading-relaxed max-w-md">We'll come back within one business day with a plan and a quote, or put you in touch with the dealer that serves your area.</p>
              <div className="space-y-5 mt-10 text-sm"><a href="tel:8336923883" className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary shrink-0" />(833) 692-3883</a><a href="mailto:contact@envirobiotics.com" className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary shrink-0" /><span className="break-all">contact@envirobiotics.com</span></a><p className="flex items-center gap-3"><Clock className="w-5 h-5 text-primary shrink-0" />Mon–Fri, 9 AM–4 PM ET</p></div>
            </div>
            <div className="min-w-0"><BusinessQuoteForm /></div>
          </div>
        </section>
      </main>


      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden business-dark border-0">
          <DialogTitle className="sr-only">How EnviroBiotics works for business</DialogTitle>
          <div className="aspect-video w-full">
            {videoOpen && (
              <iframe
                src={videoUrl}
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
