import { useState } from "react";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { RelatedTopics } from "@/components/RelatedTopics";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  description: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "safety",
    title: "Safety & Certifications",
    description: "Peace of mind first. Every certification, every safety standard, answered directly.",
    items: [
      {
        question: "Is it safe for kids and pets?",
        answer:
          "Yes. EnviroBiotics uses FDA GRAS certified Bacillus probiotics, the same class found in soil and used in food. Products carry MADE SAFE certification, EPA registration, and the Parent Tested Parent Approved (PTPA) award. They produce no ozone, no VOCs, and no chemical residues. Safe for daily continuous use around infants, toddlers, pregnant women, cats, dogs, birds, and reptiles.",
      },
      {
        question: "Does EnviroBiotics produce ozone or harmful chemicals?",
        answer:
          "No. EnviroBiotics devices use only beneficial probiotic bacteria as the active mechanism. They produce zero ozone, zero volatile organic compounds (VOCs), and zero chemical residues. Unlike ionizers or UV purifiers that can generate harmful byproducts, EnviroBiotics works entirely through naturally occurring Bacillus bacteria with no synthetic agents involved.",
      },
      {
        question: "Is it safe for people with allergies or asthma?",
        answer:
          "Yes. EnviroBiotics products are certified by AllergyUK, the leading UK allergy charity, confirming they are appropriate for allergy sufferers and those with respiratory sensitivities. The probiotic strains are hypoallergenic and do not trigger allergic responses. Many customers with asthma and dust mite allergies report improved everyday comfort after 30 days of continuous use.",
      },
      {
        question: "What certifications does EnviroBiotics hold?",
        answer:
          "EnviroBiotics holds EPA registration, FDA GRAS certification for all probiotic strains, ISO 9001 quality management certification, AllergyUK approval, MADE SAFE certification, and the PTPA (Parent Tested Parent Approved) award. Each certification is granted by an independent third party confirming safety and efficacy for household and commercial use.",
      },
      {
        question: "Are the probiotic strains studied for long-term safety?",
        answer:
          "Yes. Bacillus-genus probiotics have been studied in clinical, agricultural, and consumer settings for decades. The specific strains used by EnviroBiotics are non-pathogenic, spore-forming bacteria that occur naturally in soil and are already present in most indoor environments. Their safety profile is well established in peer-reviewed literature and confirmed by U.S. and European regulatory bodies.",
      },
    ],
  },
  {
    id: "what-is-it",
    title: "What Is It & How It Works",
    description: "Understand what makes probiotic air purification fundamentally different from filtration.",
    items: [
      {
        question: "What is a probiotic air purifier?",
        answer:
          "A probiotic air purifier is a device that continuously disperses beneficial Bacillus bacteria into a room to competitively suppress harmful microorganisms on surfaces and in the air. Unlike HEPA filters that only capture airborne particles passing through a machine, probiotic purifiers actively treat surfaces, fabrics, and cracks where contamination accumulates and re-contaminates the air.",
      },
      {
        question: "What is EnviroBiotics?",
        answer:
          "EnviroBiotics, formerly known as BetterAir, is the category leader in probiotic air and surface purification. Founded in 2009, EnviroBiotics devices continuously release beneficial probiotics that colonize surfaces, HVAC systems, fabrics, and cracks throughout a space, keeping indoor environments naturally cleaner 24 hours a day, 7 days a week, without manual effort.",
      },
      {
        question: "How does EnviroBiotics work?",
        answer:
          "EnviroBiotics works in three automatic steps: Disperse, the device releases beneficial Bacillus probiotics as an invisible mist on a timed cycle. Settle, probiotics land on surfaces, fabrics, furniture, and hard-to-reach cracks where contamination lives. Support, the established probiotic layer outcompetes harmful bacteria, mold, and allergens for nutrients, suppressing them continuously between your regular cleanings.",
      },
      {
        question: "How is this different from a HEPA air purifier?",
        answer:
          "A HEPA purifier filters particles that physically pass through the machine, but cannot treat surfaces, fabrics, or areas without direct airflow. EnviroBiotics treats the source: surfaces, upholstery, cracks, and HVAC ducts where contamination accumulates and re-enters the air. The two technologies are complementary. Many customers use both for comprehensive protection.",
      },
      {
        question: "What does 'competitive exclusion' mean?",
        answer:
          "Competitive exclusion is the biological principle behind EnviroBiotics. Beneficial probiotics consume the organic nutrients that harmful bacteria, mold, and allergens need to survive and multiply. When probiotics occupy the surface and exhaust the available food source, harmful microorganisms are suppressed without any chemical intervention. It is the same principle by which beneficial gut flora protect digestive health.",
      },
      {
        question: "Which products does EnviroBiotics offer?",
        answer:
          "EnviroBiotics offers the BioLogic Mini, a portable probiotic purifier for personal spaces up to 300 sq ft. The Biotica 800 is the flagship whole-room device covering up to 800 sq ft. The BA 2080 combines probiotic protection with H13 HEPA filtration for spaces up to 2,600 sq ft. The E-Biotic Pro is a commercial HVAC-integrated system treating up to 25,000 sq ft.",
      },
    ],
  },
  {
    id: "usage",
    title: "Usage & Setup",
    description: "Everything you need to get started, maintain your device, and get the most from your subscription.",
    items: [
      {
        question: "What's included in the 30 day risk free trial?",
        answer:
          "Every EnviroBiotics device purchase includes a 30 day money back guarantee. If you are not satisfied for any reason within 30 days of receiving your order, return the device for a full refund, no questions asked. Subscribers also benefit from Best Value Pricing, zero shipping costs on all refills, and a Lifetime Warranty for as long as their subscription is active.",
      },
      {
        question: "How often do I need to replace the cartridge?",
        answer:
          "The BioLogic Mini uses a 90-day probiotic cartridge. The Biotica 800 cartridge lasts approximately 3 months. HVAC units have longer service intervals. Subscribers on the cartridge refill plan receive replacement cartridges automatically before they run out, with 5% savings on every order and free shipping every time.",
      },
      {
        question: "Where should I place the device in my home?",
        answer:
          "Place the device in the room where you and your family spend the most time, typically a bedroom, living room, or open-plan kitchen. For the BioLogic Mini, a central surface location at mid-height works best. For the Biotica 800, a central floor or shelf position allows probiotics to settle across the full coverage area. Avoid placing directly on carpet or against walls.",
      },
      {
        question: "Does it need to run all the time?",
        answer:
          "EnviroBiotics devices are designed for continuous automatic operation. They cycle on a timed interval, typically releasing probiotics for a short burst every 30 minutes, then resting. This timed cycle is what makes them maintenance-free. For best results and to build a stable probiotic layer on surfaces, the device should remain powered on continuously for at least the first 30 days.",
      },
      {
        question: "How long before I notice a difference?",
        answer:
          "Most customers notice a fresher, cleaner scent in their space within the first 1 to 2 weeks. Measurable surface allergen reduction has been documented in independent lab testing within 30 days of continuous use. Full competitive exclusion, where a stable probiotic layer is established across surfaces throughout the room, typically takes 4 to 6 weeks.",
      },
      {
        question: "Does EnviroBiotics replace my regular cleaning routine?",
        answer:
          "No. EnviroBiotics is designed to complement your existing routine, not replace it. It continuously suppresses re-contamination between your regular cleanings, so surfaces stay cleaner for longer. Think of it as 24-hour maintenance between your weekly or daily cleans. For best results, avoid using harsh antibacterial sprays in treated areas, as these disrupt the probiotic layer.",
      },
      {
        question: "What is the Lifetime Warranty on subscriptions?",
        answer:
          "Active subscribers on any EnviroBiotics cartridge refill subscription receive a Lifetime Warranty on their device. This means if your device has a defect or malfunction during the period your subscription is active, EnviroBiotics will repair or replace it at no cost. The Lifetime Warranty remains in effect for as long as your subscription continues.",
      },
    ],
  },
  {
    id: "science",
    title: "Science & Research",
    description:
      "Peer-reviewed evidence, independent testing, and the microbiology behind how probiotics treat indoor environments.",
    items: [
      {
        question: "Is there peer-reviewed research supporting probiotic air purification?",
        answer:
          "Yes. Multiple peer-reviewed studies and independent laboratory evaluations support the efficacy of environmental Bacillus probiotics for reducing pathogens, allergens, and mold on indoor surfaces. EnviroBiotics technology has been tested in hospitals, schools, offices, and residential environments. Published case studies demonstrate measurable reductions in surface contamination within 30 days of continuous use.",
      },
      {
        question: "Can probiotics help reduce mold?",
        answer:
          "Yes. Bacillus-based environmental probiotics suppress mold regrowth by competitively excluding fungal organisms from colonizing surfaces and by reducing the organic nutrients mold requires to establish. They are effective at reducing mold spore concentrations on treated surfaces. For active mold infestations, professional remediation is recommended first. EnviroBiotics then helps prevent regrowth after remediation.",
      },
      {
        question: "Can EnviroBiotics reduce dust mites and allergens?",
        answer:
          "Yes. Independent testing shows that probiotic surface colonization reduces the organic matter, skin cells and pet dander, that dust mites feed on. By reducing the food source, dust mite populations decline over time. AllergyUK has certified EnviroBiotics products as appropriate for allergy sufferers. Customers report reduced dust accumulation on furniture and surfaces with continuous use.",
      },
      {
        question: "What are Bacillus probiotics?",
        answer:
          "Bacillus probiotics are a genus of gram-positive, spore-forming bacteria naturally abundant in soil, water, and indoor environments. They are non-pathogenic to humans and have been used safely in food production, agriculture, and medical settings for decades. The specific Bacillus strains in EnviroBiotics are selected for their ability to competitively exclude harmful indoor microorganisms and their FDA GRAS safety classification.",
      },
      {
        question: "Has EnviroBiotics been tested in clinical or commercial settings?",
        answer:
          "Yes. EnviroBiotics technology has been independently evaluated in hospitals, dental clinics, schools, and hotels across Europe, North America, and Asia. Case studies document measurable reductions in surface bacterial counts, reduced HVAC biofilm accumulation, and improved indoor air quality scores. Full research and white papers are available on the EnviroBiotics Research page.",
      },
    ],
  },
];

// Build flat list for JSON-LD schema
const allFaqs = faqCategories.flatMap((cat) => cat.items);

const faqJsonLd = {
  "@type": "FAQPage",
  mainEntity: allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const FAQAccordionItem = ({ faq, index }: { faq: FAQItem; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground leading-snug">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-muted-foreground mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("safety");

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Frequently Asked Questions: EnviroBiotics"
        description="Get answers to common questions about EnviroBiotics probiotic air purification, safety certifications, product usage, cartridge replacement, and HVAC integration."
        path="/faq"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            faqJsonLd,
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "FAQ", url: "/faq" },
            ]),
          ],
        }}
      />
      <Navbar />
      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 max-w-4xl mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Help Center</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Everything you want to know about EnviroBiotics probiotic air purification, safety, usage, and the science
            behind it.
          </p>
        </section>

        {/* Category tabs */}
        <section className="border-b border-border sticky top-16 bg-background z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <nav className="flex gap-1 overflow-x-auto pb-0 scrollbar-hide" aria-label="FAQ categories">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeCategory === cat.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* FAQ content */}
        <div className="container mx-auto px-4 max-w-4xl mt-12 space-y-16">
          {faqCategories
            .filter((cat) => cat.id === activeCategory)
            .map((cat) => (
              <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
                <div className="mb-8">
                  <h2 id={`cat-${cat.id}`} className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                    {cat.title}
                  </h2>
                  <p className="text-muted-foreground">{cat.description}</p>
                </div>
                <div className="rounded-2xl border border-border bg-card px-6">
                  {cat.items.map((faq, i) => (
                    <FAQAccordionItem key={i} faq={faq} index={i} />
                  ))}
                </div>
              </section>
            ))}

          {/* All categories — hidden but in DOM for SEO / AI crawlers */}
          <div className="sr-only" aria-hidden="true">
            {faqCategories
              .filter((cat) => cat.id !== activeCategory)
              .map((cat) =>
                cat.items.map((faq, i) => (
                  <div key={`${cat.id}-${i}`}>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                )),
              )}
          </div>

          {/* Still have questions CTA */}
          <section className="p-8 bg-muted/50 rounded-2xl">
            <h2 className="text-xl font-semibold text-foreground mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is happy to help. Reach out directly or explore our educational resources.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/support"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition"
              >
                Contact Support
              </Link>
              <Link
                to="/research"
                className="inline-flex items-center px-6 py-3 border border-border text-foreground rounded-xl font-medium hover:bg-muted transition"
              >
                View Research & Case Studies
              </Link>
            </div>
          </section>

          <RelatedTopics currentPath="/faq" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
