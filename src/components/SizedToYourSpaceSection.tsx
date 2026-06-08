import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import biologicMini from "@/assets/biologic-mini-nobg-new.avif";
import biotica800 from "@/assets/biotica800-hero.avif";
import ebioticLifestyle from "@/assets/ebiotic-pro-lifestyle-v4.avif";
import ebioticDevice from "@/assets/ebiotic-pro-device.png";

export const SizedToYourSpaceSection = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/coming-soon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, product: "E-Biotic Home" }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section id="find-your-system" className="py-24 sm:py-32 lg:py-40 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-20 mx-auto text-center">
            <h2 className="font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              <span className="block text-5xl sm:text-6xl md:text-7xl">
                Find the system
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl text-heading-accent italic font-normal">
                that suits your space.
              </span>
            </h2>
            <p className="mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
              The same proven probiotics power every device. We'll match you with the right device and keep it refilled.
            </p>
          </div>
        </ScrollReveal>

        {/* 01 - For a room you live in */}
        <ScrollReveal>
          <div className="mb-10">
            <div className="flex flex-col items-center justify-center gap-3 pb-6 border-b border-foreground/10 text-center">
              <div className="flex items-center justify-center gap-5">
                <span className="text-sm font-semibold tracking-[0.2em] text-muted-foreground/60">01</span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground">
                  Room Purifiers
                </h3>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
                Portable and plug-in, for the spaces you spend time in.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {/* BioLogic Mini */}
          <ScrollReveal variant="fadeUp">
            <article className="group rounded-2xl border border-foreground/10 bg-card overflow-hidden hover:border-foreground/20 transition-colors h-full flex flex-col">
              <div className="absolute z-10 m-5">
                <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground bg-background/80 backdrop-blur px-3 py-1.5 rounded-full border border-foreground/10">
                  Portable
                </span>
              </div>
              <div className="relative w-full bg-gradient-to-b from-muted/40 to-muted/10 aspect-[4/3] min-h-[260px] flex items-center justify-center p-10">
                <img
                  src={biologicMini}
                  alt="BioLogic Mini portable probiotic purifier"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60 mb-3">
                  Up to 300 sq ft
                </p>
                <h4 className="text-2xl font-display font-bold text-foreground mb-2">
                  A single room
                </h4>
                <p className="text-sm text-heading-accent italic mb-5">
                  Bedrooms, personal office, vehicle, anywhere you go.
                </p>
                <div className="border-t border-foreground/10 pt-5 mt-auto">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">
                    Paired with
                  </p>
                  <p className="text-base font-semibold text-heading-accent mb-3">BioLogic Mini</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Your personal portable guardian. Compact and fully portable, plug it in anywhere and pack it when you travel.
                  </p>
                  <a
                    href="https://shop.envirobiotics.com/products/biologic-mini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:translate-y-[-1px] self-start"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      boxShadow: "0 12px 30px -12px hsl(var(--primary) / 0.55)",
                    }}
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </article>
          </ScrollReveal>

          {/* Biotica 800 */}
          <ScrollReveal variant="fadeUp">
            <article className="group rounded-2xl border border-foreground/10 bg-card overflow-hidden hover:border-foreground/20 transition-colors h-full flex flex-col">
              <div className="relative w-full bg-gradient-to-b from-muted/40 to-muted/10 aspect-[4/3] min-h-[260px] flex items-center justify-center p-10">
                <img
                  src={biotica800}
                  alt="Biotica 800 probiotic air purifier for shared spaces"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60 mb-3">
                  300 – 800 sq ft
                </p>
                <h4 className="text-2xl font-display font-bold text-foreground mb-2">
                  A larger shared space
                </h4>
                <p className="text-sm text-heading-accent italic mb-5">
                  Large halls, common areas, open-plan living.
                </p>
                <div className="border-t border-foreground/10 pt-5 mt-auto">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">
                    Paired with
                  </p>
                  <p className="text-base font-semibold text-heading-accent mb-3">Biotica 800</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Set-and-forget coverage for the spaces you spend the most time in. Pairs with BioLogic Mini for separated smaller rooms.
                  </p>
                  <a
                    href="https://shop.envirobiotics.com/products/biotica-800"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:translate-y-[-1px] self-start"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      boxShadow: "0 12px 30px -12px hsl(var(--primary) / 0.55)",
                    }}
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </article>
          </ScrollReveal>
        </div>

        {/* 02 - For your entire home */}
        <ScrollReveal>
          <div className="mb-10">
            <div className="flex flex-col items-center justify-center gap-3 pb-6 border-b border-foreground/10 text-center">
              <div className="flex items-center justify-center gap-5">
                <span className="text-sm font-semibold tracking-[0.2em] text-muted-foreground/60">02</span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground">
                  Whole-Home Systems
                </h3>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
                Centralized and HVAC-integrated, for continuous coverage.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <article className="rounded-2xl overflow-hidden border border-foreground/10 grid lg:grid-cols-[6fr_5fr] items-stretch">
            {/* Lifestyle image side */}
            <div className="relative bg-muted min-h-[280px] sm:min-h-[360px] lg:min-h-[560px]">
              <img
                src={ebioticLifestyle}
                alt="E-Biotic Home integrated with HVAC system"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 65%" }}
              />
              <div className="absolute top-5 left-5">
                <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground bg-background/85 backdrop-blur px-3 py-1.5 rounded-full border border-foreground/10">
                  Whole-home
                </span>
              </div>
            </div>

            {/* Content side */}
            <div className="bg-background text-foreground p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center">

              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                Every room, from one device
              </p>
              <h4 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-[1.05] tracking-[-0.02em] mb-3">
                Your whole home.
              </h4>
              <p className="text-2xl sm:text-3xl font-display italic font-light text-heading-accent mb-6">
                Every room, all at once.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                Connects directly to your home's HVAC system, cleaning the entire airduct, a source of most household contaminants, while distributing probiotics across every room. Replaces multiple Biotica and BioLogic Mini units in large multi-room spaces.
              </p>

              <div className="border-t border-foreground/10 pt-6 mb-8 max-w-md">
                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-2">
                  Paired with
                </p>
                <p className="text-lg font-semibold text-heading-accent mb-2">E-Biotic Home</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Integrated probiotic coverage for the entire home, refilled on schedule.
                </p>
              </div>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:translate-y-[-1px] self-start"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      boxShadow: "0 12px 30px -12px hsl(var(--primary) / 0.55)",
                    }}
                  >
                    Cover my whole home
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-display">Coming Soon</DialogTitle>
                    <DialogDescription>
                      The E-Biotic Home is not available yet. Leave your details and we'll notify you as soon as it's ready.
                    </DialogDescription>
                  </DialogHeader>
                  {submitted ? (
                    <div className="py-8 text-center">
                      <p className="text-lg font-semibold text-foreground mb-2">You're on the list!</p>
                      <p className="text-sm text-muted-foreground">We'll reach out when E-Biotic Home is available.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="coming-soon-name">Name</Label>
                        <Input
                          id="coming-soon-name"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coming-soon-email">Email</Label>
                        <Input
                          id="coming-soon-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:translate-y-[-1px] disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background: "hsl(var(--primary))",
                          color: "hsl(var(--primary-foreground))",
                          boxShadow: "0 12px 30px -12px hsl(var(--primary) / 0.55)",
                        }}
                      >
                        {submitting ? "Sending…" : "Notify me"}
                      </button>
                      {error && (
                        <p className="text-sm text-destructive text-center">{error}</p>
                      )}
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto">
            Every option ships with an automatic probiotic refill subscription, so your space stays balanced without you thinking about it.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
