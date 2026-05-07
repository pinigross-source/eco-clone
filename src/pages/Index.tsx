import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "@tanstack/react-router";
import { SEOHead, organizationJsonLd, websiteJsonLd, homepageFaqJsonLd, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DeferredSection } from "@/components/DeferredSection";

// Lazy-load all below-fold sections
const FindMySolutionQuiz = lazy(() => import("@/components/FindMySolutionQuiz").then(m => ({ default: m.FindMySolutionQuiz })));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase").then(m => ({ default: m.ProductShowcase })));
const ProblemSection = lazy(() => import("@/components/ProblemSection").then(m => ({ default: m.ProblemSection })));
const ShiftSection = lazy(() => import("@/components/ShiftSection").then(m => ({ default: m.ShiftSection })));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection").then(m => ({ default: m.HowItWorksSection })));
const ComparisonSection = lazy(() => import("@/components/ComparisonSection").then(m => ({ default: m.ComparisonSection })));
const SolutionsSection = lazy(() => import("@/components/SolutionsSection").then(m => ({ default: m.SolutionsSection })));
const SafetyStrip = lazy(() => import("@/components/SafetyStrip").then(m => ({ default: m.SafetyStrip })));
const SafetySection = lazy(() => import("@/components/SafetySection").then(m => ({ default: m.SafetySection })));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const FAQSection = lazy(() => import("@/components/FAQSection").then(m => ({ default: m.FAQSection })));
const GuaranteeSection = lazy(() => import("@/components/GuaranteeSection").then(m => ({ default: m.GuaranteeSection })));
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
        title="EnviroBiotics – Probiotic Air & Surface Support | Fresher Home Between Cleanings"
        description="EnviroBiotics releases beneficial probiotics designed to settle on surfaces and circulate through the air, supporting a fresher indoor environment between cleanings. Safe for families and pets."
        path="/"
        keywords="bio air, bioair solutions, biotica, eco probiotic, enviro air, enviro bio, environizer air purifier, wet air purification, probiotic air purifier, probiotic air purification system, natural probiotic environmental purifier, surface air purification, EnviroBiotics, BetterAir"
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

        {/* Tier 1: First below-fold — loads eagerly (visible quickly on scroll) */}
        <Suspense fallback={<div className="min-h-[300px]" />}>
          <ShiftSection />
        </Suspense>

        {/* Tier 2: Deferred — only mounts when within 400px of viewport */}
        <DeferredSection forceMount={hasHash} minHeight="600px" rootMargin="400px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <ProblemSection />
            <HowItWorksSection />
          </Suspense>
        </DeferredSection>

        <DeferredSection forceMount={hasHash} minHeight="400px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <ComparisonSection />
            <SolutionsSection />
          </Suspense>
        </DeferredSection>

        {/* Tier 3: Products */}
        <DeferredSection forceMount={hasHash} minHeight="500px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <ProductShowcase />
          </Suspense>
        </DeferredSection>

        {/* Tier 4: Safety + Social proof + Close — furthest down */}
        <DeferredSection forceMount={hasHash} minHeight="400px" rootMargin="200px">
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <SafetyStrip />
            <SafetySection />
            <TestimonialsSection />
          </Suspense>
        </DeferredSection>

        <DeferredSection forceMount={hasHash} minHeight="400px" rootMargin="200px">
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <FAQSection />
            <GuaranteeSection />
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
