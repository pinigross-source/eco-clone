
import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "@tanstack/react-router";
import { Link } from "@/lib/link";
import { SEOHead, organizationJsonLd, websiteJsonLd, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";

import { CertificationsBar } from "@/components/CertificationsBar";
import { SafetyFirstSection } from "@/components/SafetyFirstSection";
import { MicroscopicWorldSection } from "@/components/MicroscopicWorldSection";
import { SizedToYourSpaceSection } from "@/components/SizedToYourSpaceSection";
import { DeferredSection } from "@/components/DeferredSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TrustedPlacesSection } from "@/components/TrustedPlacesSection";


// Lazy-load all below-fold sections
const FinalCTASection = lazy(() => import("@/components/FinalCTASection").then(m => ({ default: m.FinalCTASection })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));


const Index = () => {
  const location = useLocation();
  const hasHash = !!location.hash;
  useEffect(() => {
    if (location.hash) {
      let lastTop = -1;
      let stableCount = 0;
      const tryScroll = (attempts = 0) => {
        const element = document.querySelector(location.hash);
        if (element) {
          const rect = element.getBoundingClientRect();
          const currentTop = rect.top + window.scrollY;
          if (Math.abs(currentTop - lastTop) < 2) {
            stableCount++;
          } else {
            stableCount = 0;
          }
          lastTop = currentTop;
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Keep retrying until position stabilizes (layout done)
          if (stableCount < 3 && attempts < 30) {
            setTimeout(() => tryScroll(attempts + 1), 200);
          }
        } else if (attempts < 30) {
          setTimeout(() => tryScroll(attempts + 1), 200);
        }
      };
      setTimeout(() => tryScroll(), 300);
    }
  }, [location.hash]);

  return (
    <div className="homepage-impact min-h-screen bg-background">
      <SEOHead
        title="Reduce Dust Mites, Pet Dander & Mold Spores | EnviroBiotics"
        description="Cuts down on dust mites, pet dander, mold spores, and musty-smell bacteria, on every surface, around the clock. The way air filters can't. FDA GRAS."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            organizationJsonLd,
            websiteJsonLd,
            makeBreadcrumbJsonLd([{ name: "Home", url: "/" }]),
          ],
        }}
      />
      <Navbar />
      <main id="main-content" className="relative pb-20 md:pb-0">

        <HeroSection />
        <MicroscopicWorldSection />
        <SafetyFirstSection />
        <TestimonialsSection />
        <TrustedPlacesSection />
        <SizedToYourSpaceSection />

        {/* Anniversary / Mission Statement */}
        <section className="relative w-full overflow-hidden bg-background border-t border-foreground/10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 50% at 80% 20%, hsl(var(--primary) / 0.08) 0%, transparent 60%), radial-gradient(50% 40% at 10% 90%, hsl(var(--primary) / 0.05) 0%, transparent 70%)",
            }}
          />

          <div className="relative mx-auto w-full max-w-[1320px] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
            <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-7">
                <h2
                  className="font-sans font-normal tracking-[-0.035em] text-[2rem] leading-[1.08] sm:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.04]"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  Your Research. <span className="font-bold">Your Planet.</span>
                </h2>

              </div>


              <div className="lg:col-span-5 space-y-6">
                <p
                  className="max-w-[58ch] text-[1rem] leading-[1.6] sm:text-[1.1rem]"
                  style={{ color: "hsl(var(--foreground) / 0.82)" }}
                >
                  EnviroBiotics products are crafted from a decade of work focused on fostering general health, now shared at a special price so wellbeing reaches every home.
                </p>
                <p
                  className="max-w-[58ch] text-[1rem] leading-[1.6] sm:text-[1.1rem]"
                  style={{ color: "hsl(var(--foreground) / 0.82)" }}
                >
                  Once it is on, you enjoy its benefit, and our planet earth does too.
                </p>
                <p
                  className="max-w-[58ch] border-l-2 pl-5 text-[1rem] leading-[1.6] sm:text-[1.1rem] italic"
                  style={{ color: "hsl(var(--foreground) / 0.75)", borderColor: "hsl(var(--primary) / 0.5)" }}
                >
                  A new era of biological solutions that replace the polluting chemicals
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <Link
                    to="/how-it-works"
                    className="group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] transition-all hover:-translate-y-0.5"
                    style={{
                      borderColor: "hsl(var(--foreground) / 0.2)",
                      color: "hsl(var(--foreground))",
                      background: "transparent",
                    }}
                  >
                    Our Technology
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Final CTA (with risk-free guarantee) */}
        <DeferredSection forceMount={hasHash} minHeight="500px" rootMargin="200px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <FinalCTASection />
          </Suspense>
        </DeferredSection>


      </main>
      <DeferredSection forceMount={hasHash} minHeight="200px" rootMargin="200px">
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </DeferredSection>
    </div>
  );
};

export default Index;
