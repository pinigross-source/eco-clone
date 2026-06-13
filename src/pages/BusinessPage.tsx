import { lazy, Suspense, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Building2, ShieldCheck, Sparkles, Wind, ArrowRight, CheckCircle2, Hotel, Briefcase, Dumbbell, Stethoscope } from "lucide-react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { ContactFormDialog } from "@/components/ContactFormDialog";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const verticals = [
  { icon: Hotel, label: "Hotels & Hospitality", desc: "Cleaner-smelling rooms, lobbies, and back-of-house  without chemical maskers." },
  { icon: Briefcase, label: "Offices & Co-working", desc: "Reduce dust, dander, and musty odors across shared HVAC zones." },
  { icon: Dumbbell, label: "Gyms & Studios", desc: "Continuously address sweat, mat, and locker-room bacteria on surfaces and in the air." },
  { icon: Stethoscope, label: "Clinics & Wellness", desc: "Probiotic support that complements existing IAQ and cleaning protocols." },
];

const benefits = [
  "Whole-building coverage via HVAC integration",
  "Works 24/7 on surfaces and in the air",
  "FDA GRAS organisms  safe for occupants",
  "No ozone, no harsh chemicals, no downtime",
  "Service plans with monitoring and refills",
  "Documented protocols for facility teams",
];

export default function BusinessPage() {
  const [open, setOpen] = useState(false);

  const cta = (
    <Button
      size="lg"
      className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base rounded-full"
      onClick={() => setOpen(true)}
    >
      Book a free facility assessment
      <ArrowRight className="w-5 h-5 ml-2" />
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Probiotic Solutions for Hotels, Offices, Gyms & Clinics | EnviroBiotics"
        description="Whole-building probiotic air and surface solutions for hospitality, commercial, fitness, and clinical facilities. Book a free facility assessment."
        path="/business"
        jsonLd={makeBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "For Business", url: "/business" },
        ])}
      />
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20">
        {/* Hero */}
        <section className="container px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/60 border border-border/60 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 mb-6">
            <Building2 className="w-3.5 h-3.5" />
            For Facilities & Operators
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.03em] text-foreground text-balance mb-6">
            Whole-building probiotic solutions for the places people trust.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            Continuous probiotic air and surface support, integrated into your HVAC and operations.
            Designed for hotels, offices, gyms, and clinics  never a retail add-to-cart.
          </p>
          <div className="flex justify-center">{cta}</div>
          <p className="text-xs text-muted-foreground/80 mt-4">No obligation. Walk-through, scope, and quote.</p>
        </section>

        {/* Verticals */}
        <section className="container px-4 sm:px-6 max-w-6xl mx-auto mt-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {verticals.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="rounded-2xl border border-border/60 bg-card p-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="container px-4 sm:px-6 max-w-5xl mx-auto mt-24">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60 mb-4">What you get</p>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] text-foreground text-balance">
                Built for facility teams, not shopping carts.
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Our commercial deployments are scoped, installed, and supported. You get documentation,
                service plans, and a real point of contact.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/85">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How engagement works */}
        <section className="container px-4 sm:px-6 max-w-5xl mx-auto mt-24">
          <div className="rounded-3xl border border-border/60 bg-muted/30 p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Sparkles, step: "01", title: "Facility assessment", desc: "We learn your building, HVAC, and goals." },
                { icon: Wind, step: "02", title: "Scoped deployment", desc: "Custom plan for air and surface coverage." },
                { icon: ShieldCheck, step: "03", title: "Ongoing service", desc: "Monitoring, refills, and reporting." },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div key={step}>
                  <div className="text-xs font-medium text-foreground/50 tracking-[0.2em] mb-3">{step}</div>
                  <Icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-1.5">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container px-4 sm:px-6 max-w-3xl mx-auto mt-24 text-center">
          <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] text-foreground text-balance mb-4">
            Ready to scope your building?
          </h2>
          <p className="text-muted-foreground mb-8">
            Tell us about your facility. We'll come back with a walk-through plan and proposal.
          </p>
          <div className="flex justify-center">{cta}</div>
        </section>
      </main>

      <ContactFormDialog open={open} onOpenChange={setOpen} />

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
