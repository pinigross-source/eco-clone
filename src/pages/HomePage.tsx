import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "@tanstack/react-router";
import { SEOHead, organizationJsonLd, websiteJsonLd, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { NatureStatementSection } from "@/components/NatureStatementSection";
import { TrustedPlacesSection } from "@/components/TrustedPlacesSection";
import { SizedToYourSpaceSection } from "@/components/SizedToYourSpaceSection";
import { ScienceOfBalanceSection } from "@/components/ScienceOfBalanceSection";
import { AddLayerOfWellnessSection } from "@/components/AddLayerOfWellnessSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { DeferredSection } from "@/components/DeferredSection";

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
          element.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <NatureStatementSection />
        <TrustedPlacesSection />
        <SizedToYourSpaceSection />
        <ScienceOfBalanceSection />
        <AddLayerOfWellnessSection />
        <TestimonialsSection />
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
