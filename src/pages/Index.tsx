import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "@tanstack/react-router";
import { SEOHead, organizationJsonLd, websiteJsonLd, homepageFaqJsonLd, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CertificationsBar } from "@/components/CertificationsBar";
import { TrustedPlacesSection } from "@/components/TrustedPlacesSection";
import { DeferredSection } from "@/components/DeferredSection";


const ProblemSection = lazy(() => import("@/components/ProblemSection").then(m => ({ default: m.ProblemSection })));
const ProductsSection = lazy(() => import("@/components/ProductsSection").then(m => ({ default: m.ProductsSection })));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection").then(m => ({ default: m.HowItWorksSection })));
const SafetyStrip = lazy(() => import("@/components/SafetyStrip").then(m => ({ default: m.SafetyStrip })));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const FAQSection = lazy(() => import("@/components/FAQSection").then(m => ({ default: m.FAQSection })));
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
            homepageFaqJsonLd,
            makeBreadcrumbJsonLd([{ name: "Home", url: "/" }]),
          ],
        }}
      />
      <Navbar />
      <main id="main-content" className="pb-20 md:pb-0">
        <HeroSection />
        <CertificationsBar />

        <DeferredSection forceMount={hasHash} minHeight="600px" rootMargin="400px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <ProblemSection />
          </Suspense>
        </DeferredSection>

        <TrustedPlacesSection />

        <DeferredSection forceMount={hasHash} minHeight="500px" rootMargin="400px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <HowItWorksSection />
          </Suspense>
        </DeferredSection>

        <DeferredSection forceMount={hasHash} minHeight="400px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <SafetyStrip />
          </Suspense>
        </DeferredSection>

        <DeferredSection forceMount={hasHash} minHeight="500px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <ProductsSection />
          </Suspense>
        </DeferredSection>



        <DeferredSection forceMount={hasHash} minHeight="400px" rootMargin="200px">
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <TestimonialsSection />
          </Suspense>
        </DeferredSection>

        <DeferredSection forceMount={hasHash} minHeight="500px" rootMargin="200px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <FAQSection />
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
