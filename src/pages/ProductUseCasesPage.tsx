import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "@/lib/link";
import { RelatedTopics } from "@/components/RelatedTopics";
import { SectionLabel } from "@/components/ui/section-label";
import { BedDouble, Sofa, CookingPot, Building2, HeartPulse } from "lucide-react";

const rooms = [
  {
    icon: <BedDouble className="w-6 h-6 text-primary" />,
    title: "Bedrooms & Nurseries",
    content: [
      <>You spend roughly one-third of your life in your bedroom. Mattresses, pillows, and bedding harbor millions of dust mites and their allergenic waste. A compact probiotic device like the <Link to="/product/biologic-mini" className="text-primary-text underline">BioLogic Mini</Link> placed on a nightstand continuously reduces surface allergens while you sleep, silently and without producing any ozone or chemicals.</>,
      "For nurseries, the FDA GRAS safety classification means parents can confidently use the technology around infants and young children.",
    ],
  },
  {
    icon: <Sofa className="w-6 h-6 text-primary" />,
    title: "Living Rooms & Family Spaces",
    content: [
      <>Living rooms combine soft furnishings, pet activity, and high foot traffic, all of which contribute to elevated allergen levels. The <Link to="/product/biotica-800" className="text-primary-text underline">Biotica 800</Link> is designed for medium-to-large living areas, providing continuous probiotic coverage up to 800 square feet.</>,
      "Pet owners particularly benefit from probiotic treatment. Dander proteins that settle on furniture are biologically reduced, and odor-causing bacteria are displaced by beneficial strains.",
    ],
  },
  {
    icon: <CookingPot className="w-6 h-6 text-primary" />,
    title: "Kitchens & Bathrooms",
    content: [
      <>High-moisture environments encourage mold growth on grout, under sinks, and around appliance seals. Probiotic treatment reduces the organic nutrients that mold needs to thrive. Learn more about how this works in our <Link to="/mold-and-allergens" className="text-primary-text underline">mold and allergen reduction guide</Link>.</>,
    ],
  },
  {
    icon: <Building2 className="w-6 h-6 text-primary" />,
    title: "Offices & Commercial Spaces",
    content: [
      "Shared workspaces circulate air among dozens or hundreds of occupants. HVAC-integrated solutions deliver building-wide probiotic treatment from a single installation point. Facility managers report reduced sick-day complaints and improved air quality survey scores.",
      <>See our <Link to="/hvac-applications" className="text-primary-text underline">HVAC applications page</Link> for commercial integration details, or explore <Link to="/case-studies" className="text-primary-text underline">documented case studies</Link>.</>,
    ],
  },
  {
    icon: <HeartPulse className="w-6 h-6 text-primary" />,
    title: "Healthcare & Wellness Facilities",
    content: [
      <>Clinics, dental offices, and wellness centers require stringent air quality standards. EnviroBiotics probiotic technology complements existing HVAC filtration and UV systems by addressing surface contamination that airborne-only solutions miss. Our products carry the certifications healthcare administrators require. Review them on the <Link to="/proof-and-trust" className="text-primary underline">proof and trust page</Link>.</>,
    ],
  },
];

const ProductUseCasesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Probiotic Product Use Cases: Room-by-Room Guide"
        description="See how EnviroBiotics probiotic devices are used in bedrooms, living rooms, kitchens, offices, and commercial spaces for cleaner air and surfaces."
        path="/product-use-cases"
      />
      <Navbar />

      {/* Gradient Hero */}
      <section className="gradient-hero pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionLabel centered className="mb-4 justify-center">Room-by-Room Guide</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Product Use Cases: Room-by-Room Probiotic Solutions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Every indoor space has unique air quality challenges. A nursery has different needs than a commercial gym. This guide shows how EnviroBiotics devices address specific environments, helping you choose the right product and placement for maximum impact.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        {rooms.map((room) => (
          <div key={room.title} className="card-premium p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="icon-container icon-container-lg shrink-0">
                {room.icon}
              </div>
              <h2 className="text-2xl font-semibold text-foreground pt-2">{room.title}</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed pl-0 md:pl-[4.5rem]">
              {room.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="flex flex-wrap gap-4">
          <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">
            Shop by Room Size
          </Link>
          <Link to="/probiotic-air-purification" className="inline-flex items-center px-6 py-3 border border-primary text-primary-text rounded-lg font-medium hover:bg-primary/10 transition">
            Back to Probiotic Air Purification
          </Link>
        </div>

        <RelatedTopics currentPath="/product-use-cases" />
      </main>
      <Footer />
    </div>
  );
};

export default ProductUseCasesPage;
