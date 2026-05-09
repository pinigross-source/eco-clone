import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { RelatedTopics } from "@/components/RelatedTopics";
import { Shield, Phone, Mail, Clock, Package, RotateCcw, CreditCard, ShoppingBag, Award, HelpCircle } from "lucide-react";

const sections = [
  {
    icon: Package,
    title: "Free Shipping",
    content: (
      <p>
        Ecological Balancing Technologies Corporation (EBT Corp.) offers free USPS Priority Mail shipping on orders over $200 within the continental United States. Expedited options, including FedEx Standard Overnight, are available at an additional cost based on location. Shipping rates, duties, and applicable taxes apply for orders to Hawaii, Canada, and other territories or countries.
      </p>
    ),
  },
  {
    icon: RotateCcw,
    title: "Returns – 100% Satisfaction Guarantee",
    content: (
      <>
        <p className="mb-4">
          We want you to love your Betterair device. If you're not completely satisfied, return it within 30 days of shipment for a full refund to your original payment method.
        </p>

        <h4 className="font-semibold text-foreground mb-2">Return Eligibility</h4>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Returns must include a Return Merchandise Authorization (RMA) form.</li>
          <li>To request an RMA, contact us at <a href="tel:8336923883" className="text-primary hover:underline">(833) 692-3883</a> or <a href="mailto:contact@envirobiotics.com" className="text-primary hover:underline">contact@envirobiotics.com</a>.</li>
        </ul>

        <h4 className="font-semibold text-foreground mb-2">Return Guidelines</h4>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Return the device in its original condition and package it with all accessory parts.</li>
          <li>We do not accept cartridges, whether they are opened or unopened.</li>
          <li>Use a suitable box with protective bubble wrap if the original packaging is unavailable.</li>
          <li>Remove the probiotic cartridge before shipping.</li>
        </ul>

        <h4 className="font-semibold text-foreground mb-2">Shipping Costs</h4>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>For items over $75, consider a trackable shipping service or purchasing shipping insurance.</li>
          <li>EBT Corp. is not responsible for items lost or damaged in transit.</li>
        </ul>

        <h4 className="font-semibold text-foreground mb-2">Return Address</h4>
        <address className="not-italic bg-muted rounded-lg p-4 text-sm">
          EBT Corp.<br />
          5 Lenape Road, Unit 2C<br />
          Andover, NJ 07821
        </address>
      </>
    ),
  },
  {
    icon: ShoppingBag,
    title: "Replacements",
    content: (
      <>
        <p className="mb-4">
          We'll replace your unit with the same or a similar product for defective or damaged devices.
        </p>

        <h4 className="font-semibold text-foreground mb-2">Replacement Process</h4>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Request an RMA form by contacting us at <a href="tel:8336923883" className="text-primary hover:underline">(833) 692-3883</a> or <a href="mailto:contact@envirobiotics.com" className="text-primary hover:underline">contact@envirobiotics.com</a>.</li>
          <li>Return the device in its original packaging, including all accessories. Follow the same shipping guidelines as above.</li>
          <li>Once inspected and approved, you'll receive an email with details on your replacement shipment.</li>
        </ul>

        <h4 className="font-semibold text-foreground mb-2">Shipping Costs</h4>
        <p>Return shipping costs for replacements are non-refundable.</p>
      </>
    ),
  },
  {
    icon: CreditCard,
    title: "Refunds",
    content: (
      <>
        <p className="mb-4">
          After receiving and inspecting your return, we'll notify you via email of your refund approval or rejection (with reasons). Approved refunds will be processed within 7–10 business days and credited to your original payment method.
        </p>

        <h4 className="font-semibold text-foreground mb-2">Late or Missing Refunds</h4>
        <p className="mb-2">If you haven't received your refund within 10 business days:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Check your bank or credit card statement.</li>
          <li>Please contact your bank or credit card company for additional assistance.</li>
          <li>If the issue persists, contact us at <a href="tel:8336923883" className="text-primary hover:underline">(833) 692-3883</a> (Mon–Fri, 9 AM–5 PM EST).</li>
        </ul>
      </>
    ),
  },
  {
    icon: ShoppingBag,
    title: "Amazon or Other Retail Purchases",
    content: (
      <p>
        For units purchased through Amazon.com or other retailers, please contact them directly for returns, replacements, or refunds. We do not process these requests for third-party purchases.
      </p>
    ),
  },
  {
    icon: Award,
    title: "Warranty",
    content: (
      <>
        <h4 className="font-semibold text-foreground mb-2">1-Year Limited Warranty</h4>
        <p className="mb-4">
          Our warranty covers defects for one year from the date of original purchase. If repair isn't practical, we'll replace the product with a factory-reconditioned unit of similar functionality.
        </p>

        <h4 className="font-semibold text-foreground mb-2">Exclusions</h4>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Damage caused by misuse or use not described in the owner's manual.</li>
          <li>Loss or damage to removable parts.</li>
        </ul>

        <h4 className="font-semibold text-foreground mb-2">Lifetime Warranty for Subscribe & Save Members</h4>
        <p>
          Customers enrolled in the Subscribe & Save program for replacement probiotic cartridges (not bottles) qualify for a lifetime warranty. To request a replacement unit, contact us at <a href="tel:8336923883" className="text-primary hover:underline">(833) 692-3883</a> or <a href="mailto:contact@envirobiotics.com" className="text-primary hover:underline">contact@envirobiotics.com</a>.
        </p>
      </>
    ),
  },
];

const WarrantyPolicyPage = () => {
  return (
    <>
      <SEOHead
        title="Warranty & Return Policy"
        description="EnviroBiotics warranty, return, replacement, and refund policies. 30-day satisfaction guarantee and 1-year limited warranty on all devices."
        path="/warranty-policy"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Warranty & Return Policy",
          description: "EnviroBiotics warranty, return, replacement, and refund policies.",
          url: "https://envirobiotics.com/warranty-policy",
        }}
      />
      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-accent-glow pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]" />
          <div className="container relative z-10 text-center px-4">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary-foreground/90">Customer Support Policies</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-secondary-foreground mb-4 tracking-tight">
              Warranty & Return Policy
            </h1>
            <p className="text-secondary-foreground/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Your satisfaction is our priority. Learn about our shipping, returns, replacements, refunds, and warranty coverage.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="container max-w-4xl px-4 py-12 sm:py-16 md:py-20">
          <div className="space-y-10">
            {sections.map(({ icon: Icon, title, content }) => (
              <article
                key={title}
                className="bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground pt-1">
                    {title}
                  </h2>
                </div>
                <div className="text-muted-foreground leading-relaxed pl-0 sm:pl-14">
                  {content}
                </div>
              </article>
            ))}
          </div>

          {/* Get in Touch */}
          <div className="mt-12 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/15 rounded-xl p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2">
              Get in Touch
            </h2>
            <p className="text-muted-foreground mb-6">Have questions? We're here to help!</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
              <a href="mailto:contact@envirobiotics.com" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                contact@envirobiotics.com
              </a>
              <a href="tel:8336923883" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                (833) 692-3883
              </a>
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Mon–Fri, 9 AM–5 PM EST
              </span>
            </div>
          </div>

          <RelatedTopics currentPath="/warranty-policy" />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default WarrantyPolicyPage;
