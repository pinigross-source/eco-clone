import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import greenGirl from "@/assets/magic-microscopic.avif.asset.json";
import magicMobile from "@/assets/magic-mobile.avif.asset.json";

export const MicroscopicWorldSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  const steps = [
    {
      n: "01.",
      title: "Release",
      body: "Probiotics are gently dispersed into the air, reaching every surface and corner of your space.",
    },
    {
      n: "02.",
      title: "Settle",
      body: "The microscopic layer lands softly on furniture and fabrics, settling where dust and allergens collect.",
    },
    {
      n: "03.",
      title: "Keep working",
      body: "A continuous cycle helps keep your indoor ecosystem in balance, around the clock.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Subtle ambient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 20%, hsl(var(--primary) / 0.05) 0%, transparent 60%), radial-gradient(50% 40% at 10% 90%, hsl(var(--primary) / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1480px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        {/* Top hairline */}
        <div
          aria-hidden="true"
          className="mb-12 h-px w-full"
          style={{ background: "hsl(var(--foreground) / 0.08)" }}
        />

        {/* Editorial card spread */}
        <div
          className="relative grid grid-cols-1 items-stretch gap-0 overflow-hidden rounded-[28px] bg-background lg:grid-cols-2"
          style={{
            boxShadow:
              "0 30px 80px -40px hsl(var(--foreground) / 0.25), 0 8px 24px -16px hsl(var(--primary) / 0.15)",
            border: "1px solid hsl(var(--foreground) / 0.06)",
          }}
        >
          {/* Image side */}
          <div className="relative">
            <div className="relative h-full min-h-[420px] w-full overflow-hidden lg:min-h-[640px]">
              {/* Mobile image */}
              <img
                src={magicMobile.url}
                alt="The magical microscopic world of EnviroBiotics"
                className="absolute inset-0 block h-full w-full object-cover sm:hidden"
                loading="lazy"
              />
              {/* Tablet/Desktop image */}
              <img
                src={greenGirl.url}
                alt="The magical microscopic world of EnviroBiotics"
                className="absolute inset-0 hidden h-full w-full object-cover sm:block"
                loading="lazy"
                width={900}
                height={1125}
              />
            </div>
          </div>

          {/* Content side */}
          <div className="flex flex-col justify-center gap-6 px-7 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
            <span
              className="block font-sans text-[0.7rem] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              The Science of Balance
            </span>

            <div className="space-y-2">
              <h2 className="font-display font-bold leading-[1.05] tracking-[-0.025em] text-[2.25rem] text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
                Your Space.
              </h2>
              <p className="font-serif text-[1.5rem] italic leading-[1.2] text-heading-accent sm:text-[1.75rem]">
                Rebalanced.
              </p>
            </div>

            <p
              className="text-[1rem] leading-[1.7] sm:text-[1.0625rem]"
              style={{ color: "hsl(var(--foreground) / 0.78)" }}
            >
              Indoor environments are living ecosystems. Just as probiotics balance your body from within, EnviroBiotics restore balance to the spaces where you live, work, and thrive. It actively targets and reduces bacteria, molds, allergens and odors in even the toughest and hard to reach areas.
            </p>

            <p
              className="mt-4 text-[1rem] leading-[1.7] sm:text-[1.0625rem]"
              style={{ color: "hsl(var(--foreground) / 0.78)" }}
            >
              As these irritants vanish, so do the symptoms they cause: allergies, fatigue, headaches, sleep disorders, low mood, and stubborn odors.
            </p>

            <div
              className="mt-2 pt-6"
              style={{ borderTop: "1px solid hsl(var(--foreground) / 0.1)" }}
            >
              <h3 className="font-display text-[1.25rem] font-bold leading-tight text-foreground">
                Invite nature in
              </h3>
              <p
                className="mt-1 text-[0.95rem] leading-[1.6]"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                Apply its wisdom for your health, day and night.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-nowrap items-stretch sm:items-center gap-3 pt-4 sm:gap-4">
              <a
                href="#find-your-system"
                className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-8 py-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-all duration-500"
                style={{
                  background: "hsl(var(--foreground))",
                  color: "hsl(var(--background))",
                  boxShadow: "0 18px 40px -18px hsl(var(--foreground) / 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsl(var(--primary))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "hsl(var(--foreground))";
                }}
              >
                Choose Your System
              </a>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full border px-8 py-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-all duration-500"
                style={{
                  borderColor: "hsl(var(--foreground) / 0.15)",
                  color: "hsl(var(--foreground))",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--foreground))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--foreground) / 0.15)";
                }}
              >
                Watch Our Technology
              </button>
            </div>
          </div>
        </div>

        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-none rounded-2xl overflow-hidden [&>button]:text-white [&>button]:hover:text-white/80">
            <div className="aspect-video w-full">
              {videoOpen && (
                <iframe
                  src="https://player.vimeo.com/video/1198422138?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                  title="How EnviroBiotics Works"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>


        {/* Process ribbon */}
        <div
          className="mt-24 pt-16 sm:mt-32"
          style={{ borderTop: "1px solid hsl(var(--foreground) / 0.1)" }}
        >
          <div className="mb-14 mx-auto max-w-[60ch] text-center">
            <h3 className="font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              <span className="block text-2xl sm:text-3xl md:text-4xl">
                Your Protection.
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl text-heading-accent italic font-normal">
                Around the clock.
              </span>
            </h3>
            <p className="mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
              A continuous, three-stage cycle that keeps your space in healthy balance, day and night.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-20">
            {steps.map((step) => (
              <li key={step.n} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span
                    className="font-display text-[1.875rem] italic leading-none"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    {step.n}
                  </span>
                  <span className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.2em] text-foreground">
                    {step.title}
                  </span>
                </div>
                <p
                  className="text-[0.95rem] leading-[1.65]"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
