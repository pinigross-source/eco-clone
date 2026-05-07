import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
import { 
  ShieldCheck, 
  FlaskConical, 
  Leaf, 
  Baby, 
  PawPrint, 
  CheckCircle2,
  FileText,
  Award,
  Microscope,
  Heart
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionLabel } from "@/components/ui/section-label";
import madeSafeBadge from "@/assets/made-safe-badge.png";
import ptpaAward from "@/assets/ptpa-award.png";
import fdaGrasBadge from "@/assets/fda-gras-badge.jpg";
import epaBadge from "@/assets/epa-badge.png";
import allergyFreeBadge from "@/assets/allergy-free-badge.png";
import isoBadge from "@/assets/iso-badge.png";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
const RelatedTopics = lazy(() => import("@/components/RelatedTopics").then(m => ({ default: m.RelatedTopics })));
const ContentProductCTA = lazy(() => import("@/components/ContentProductCTA").then(m => ({ default: m.ContentProductCTA })));

const certifications = [
  {
    name: "EPA Product Approval",
    description: "Our products are approved by the Environmental Protection Agency (EPA) for their safety, ensuring they meet rigorous safety standards.",
    image: epaBadge,
  },
  {
    name: "FDA GRAS Certified",
    description: "Our probiotic strains are Generally Recognized As Safe by the FDA, meeting the highest safety standards for consumer products.",
    image: fdaGrasBadge,
  },
  {
    name: "ISO 9001 Certified",
    description: "Our manufacturing processes meet international quality management standards, ensuring consistent product quality and safety.",
    image: isoBadge,
  },
  {
    name: "Allergy-Free Certified",
    description: "Certified hypoallergenic and free from common allergens. Safe for individuals with sensitivities and respiratory conditions.",
    image: allergyFreeBadge,
  },
  {
    name: "MADE SAFE® Certified",
    description: "Certified free from known harmful chemicals and ingredients. Made with human health and ecosystem safety in mind.",
    image: madeSafeBadge,
  },
  {
    name: "PTPA Winner",
    description: "Parent Tested Parent Approved seal of approval, recognizing products that meet the high standards of today's families.",
    image: ptpaAward,
  },
];

const safetyFeatures = [
  {
    icon: Baby,
    title: "Safe for Children",
    description: "Our environmental probiotics are completely safe around infants, toddlers, and children of all ages. Non-toxic and gentle.",
  },
  {
    icon: PawPrint,
    title: "Pet Friendly",
    description: "Safe for all pets including dogs, cats, birds, and reptiles. No harmful chemicals that could affect your furry family members.",
  },
  {
    icon: Leaf,
    title: "Eco Friendly",
    description: "Biodegradable and environmentally responsible. Our probiotics work with nature, not against it.",
  },
  {
    icon: Heart,
    title: "Allergy Conscious",
    description: "Free from common allergens. Safe for households with sensitivities and respiratory conditions.",
  },
];

const testingProcess = [
  {
    step: "01",
    title: "Strain Selection",
    description: "We carefully select probiotic strains with proven safety profiles and beneficial properties, sourced from trusted laboratories.",
  },
  {
    step: "02",
    title: "Laboratory Testing",
    description: "Each batch undergoes rigorous laboratory testing for purity, potency, and safety before production begins.",
  },
  {
    step: "03",
    title: "Third-Party Verification",
    description: "Independent laboratories verify our testing results and certify that our products meet all safety standards.",
  },
  {
    step: "04",
    title: "Quality Assurance",
    description: "Continuous quality monitoring throughout production ensures consistent safety and effectiveness in every product.",
  },
];

const ingredients = [
  {
    name: "Bacillus Ferment",
    type: "Active Probiotic",
    description: "Beneficial bacteria that naturally outcompete harmful microorganisms on surfaces and in the air.",
    safety: "FDA GRAS certified, extensively studied for safety",
  },
  {
    name: "Purified Water",
    type: "Base Solution",
    description: "Ultra-purified water serves as the carrier for our probiotic formulation.",
    safety: "Pharmaceutical-grade purity",
  },
  {
    name: "Natural Surfactants",
    type: "Stabilizer",
    description: "Plant-derived compounds that help maintain probiotic stability and distribution.",
    safety: "Biodegradable, non-toxic, hypoallergenic",
  },
];

const SafetyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Safety & Certifications | EnviroBiotics"
        description="EnviroBiotics products are FDA GRAS certified, EPA registered, and allergy-friendly. Safe for children, pets, and daily use. View all certifications."
        path="/safety"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Safety & Certifications", url: "/safety" },
            ]),
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is EnviroBiotics safe for children and babies?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. EnviroBiotics uses FDA GRAS certified Bacillus probiotics, the same class of bacteria found naturally in soil and used in food production. Products are MADE SAFE certified, EPA registered, and PTPA (Parent Tested Parent Approved) awarded. They are completely safe for infants, toddlers, and children for daily long-term use.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does EnviroBiotics produce ozone?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. EnviroBiotics products produce zero ozone, zero VOCs, and zero chemical residues. They work exclusively through natural probiotic bacteria, the same beneficial organisms used in food, supplements, and medical settings.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What certifications does EnviroBiotics have?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "EnviroBiotics holds EPA registration, FDA GRAS certification, ISO 9001 quality certification, AllergyUK approval, MADE SAFE certification, and PTPA (Parent Tested Parent Approved) award. These independent certifications confirm safety and efficacy for household use.",
                  },
                },
              ],
            },
          ],
        }}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container px-4 sm:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <SectionLabel className="mb-6">Safety First</SectionLabel>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Your Safety is Our{" "}
              <span className="text-primary-text">Priority</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              EnviroBiotics products are rigorously tested and certified to ensure 
              complete safety for your family, pets, and the environment.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What certifications verify EnviroBiotics safety?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our products carry prestigious certifications from leading safety organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={cert.name}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img 
                        src={cert.image} 
                        alt={cert.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {cert.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Is EnviroBiotics safe for children, pets & sensitive individuals?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our environmental probiotics are designed with your entire household in mind.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyFeatures.map((feature, index) => (
              <div key={feature.title}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Process */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-text px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Microscope className="h-4 w-4" />
              Rigorous Testing
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How does EnviroBiotics test product safety?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every EnviroBiotics product goes through a comprehensive 4-step testing process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testingProcess.map((step, index) => (
              <div key={step.step} className="relative">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <span className="text-5xl font-display font-bold text-primary/20">
                      {step.step}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-text px-4 py-2 rounded-full text-sm font-medium mb-4">
              <FlaskConical className="h-4 w-4" />
              Transparent Ingredients
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What ingredients are in EnviroBiotics products?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in complete transparency. Here's exactly what goes into our products.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {ingredients.map((ingredient, index) => (
              <div key={ingredient.name}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-lg font-semibold text-foreground">
                            {ingredient.name}
                          </h3>
                          <span className="text-xs bg-primary/10 text-primary-text px-2 py-1 rounded-full">
                            {ingredient.type}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          {ingredient.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-primary-text">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>{ingredient.safety}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Commitment */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Safety Commitment
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              At EnviroBiotics, safety isn't just a feature, it's the foundation of everything we do. 
              We're committed to providing products that you can trust completely, backed by science, 
              verified by independent testing, and certified by leading safety organizations.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Explore our <a href="/proof-and-trust" className="text-primary-text underline">full certifications and research data</a>, learn <a href="/how-it-works" className="text-primary-text underline">how the technology works</a>, or discover the <a href="/health-benefits" className="text-primary-text underline">health benefits</a> families experience with probiotic air and surface treatment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>No harmful chemicals</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Non-toxic formula</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Hypoallergenic</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Biodegradable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container max-w-4xl px-4 pb-8">
        <ContentProductCTA
          headline="Safe for your family. Proven by science."
          subtitle="All EnviroBiotics devices use FDA GRAS, EPA-approved probiotic strains. Find yours."
        />
      </section>

      <section className="container max-w-4xl px-4 pb-16">
        <RelatedTopics currentPath="/safety" />
      </section>

      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
};

export default SafetyPage;
