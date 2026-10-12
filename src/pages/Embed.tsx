import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { ShiftSection } from "@/components/ShiftSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { SafetySection } from "@/components/SafetySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { FindMySolutionQuiz } from "@/components/FindMySolutionQuiz";
import { FinalCTASection } from "@/components/FinalCTASection";

const Embed = () => {
  return (
    <div className="homepage-impact bg-background">
      <main>
        <HeroSection />
        <ProblemSection />
        <ShiftSection />
        <HowItWorksSection />
        <ComparisonSection />
        <SolutionsSection />
        <SafetySection />
        <TestimonialsSection />
        <FAQSection />
        <GuaranteeSection />
        <ProductShowcase />
        <FindMySolutionQuiz />
        <FinalCTASection />
      </main>
    </div>
  );
};

export default Embed;
