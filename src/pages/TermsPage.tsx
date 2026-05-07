import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { FileText, CheckCircle, ShoppingCart, CreditCard, Truck, RotateCcw, Shield, AlertTriangle, Scale, Globe, Pencil, Mail, Phone, Clock, HelpCircle } from "lucide-react";

const sections = [
  {
    icon: CheckCircle,
    title: "Agreement to Terms",
    content: (
      <p>
        By accessing or using the EnviroBiotics website (envirobiotics.com) and purchasing our products, you agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you and Ecological Balancing Technologies Corporation ("EBT Corp.", "EnviroBiotics", "we", "us", or "our"). If you do not agree to these terms, please do not use our website or services.
      </p>
    ),
  },
  {
    icon: ShoppingCart,
    title: "Products & Services",
    content: (
      <>
        <p className="mb-4">
          EnviroBiotics provides environmental probiotic systems designed to support cleaner indoor environments. Our products include room-based devices, whole-home HVAC systems, and probiotic refill cartridges.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Product descriptions, images, pricing, and availability are subject to change without notice.</li>
          <li>We reserve the right to limit quantities, refuse, or cancel orders at our sole discretion.</li>
          <li>Colors and appearance of products may vary slightly from images shown on our website.</li>
          <li>Our products are not intended to diagnose, treat, cure, or prevent any disease.</li>
        </ul>
      </>
    ),
  },
  {
    icon: CreditCard,
    title: "Orders & Payment",
    content: (
      <>
        <p className="mb-4">
          All orders placed through our website are subject to acceptance and availability. By placing an order, you represent that:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>You are at least 18 years of age or have the consent of a legal guardian.</li>
          <li>The payment information you provide is accurate and you are authorized to use it.</li>
          <li>You will pay the total amount due, including applicable taxes and shipping fees.</li>
        </ul>
        <p>
          Payment is processed securely through Stripe and PayPal. We do not store your full credit card information. Prices are listed in U.S. dollars (USD) unless otherwise stated. Sales tax is applied based on the shipping destination as required by law.
        </p>
      </>
    ),
  },
  {
    icon: Truck,
    title: "Shipping & Delivery",
    content: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Free USPS Priority Mail shipping is available on orders over $200 within the continental United States.</li>
          <li>Expedited shipping options (including FedEx Standard Overnight) are available at additional cost.</li>
          <li>International orders are subject to additional shipping rates, duties, and taxes.</li>
          <li>Estimated delivery times are not guaranteed and may vary based on carrier and destination.</li>
          <li>Risk of loss and title for items pass to you upon delivery to the carrier.</li>
        </ul>
      </>
    ),
  },
  {
    icon: RotateCcw,
    title: "Returns, Refunds & Warranty",
    content: (
      <>
        <p className="mb-4">
          Our complete return, refund, replacement, and warranty policies are detailed on our{" "}
          <a href="/warranty-policy" className="text-primary hover:underline font-medium">
            Warranty & Return Policy
          </a>{" "}
          page. Key highlights include:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>30-day satisfaction guarantee with full refund to original payment method</li>
          <li>Returns require a Return Merchandise Authorization (RMA) form</li>
          <li>1 year limited warranty covering manufacturing defects</li>
          <li>Lifetime warranty for Subscribe & Save members (cartridge subscriptions)</li>
          <li>Return shipping costs are the responsibility of the customer</li>
        </ul>
      </>
    ),
  },
  {
    icon: Shield,
    title: "Subscribe & Save Program",
    content: (
      <>
        <p className="mb-4">
          Our Subscribe & Save program provides automatic recurring shipments of probiotic refill cartridges at a discounted price.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Subscriptions automatically renew at the selected interval until canceled.</li>
          <li>You may cancel, pause, or modify your subscription at any time through your account or by contacting us.</li>
          <li>Pricing may change with advance notice; you will be notified before your next renewal.</li>
          <li>Active subscribers qualify for the lifetime warranty on their device (cartridge subscriptions only).</li>
        </ul>
      </>
    ),
  },
  {
    icon: Globe,
    title: "Website Use & Intellectual Property",
    content: (
      <>
        <p className="mb-4">
          All content on this website, including text, images, graphics, logos, trademarks, videos, and software, is the property of EBT Corp. or its licensors and is protected by U.S. and international intellectual property laws.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>You may not reproduce, distribute, modify, or create derivative works without our express written permission.</li>
          <li>You may not use our trademarks or branding in any way that suggests endorsement without authorization.</li>
          <li>You agree not to use automated systems (bots, scrapers) to access our website without permission.</li>
        </ul>
      </>
    ),
  },
  {
    icon: AlertTriangle,
    title: "Limitation of Liability",
    content: (
      <>
        <p className="mb-4">
          To the fullest extent permitted by law:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>EBT Corp. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or services.</li>
          <li>Our total liability for any claim shall not exceed the amount you paid for the specific product giving rise to the claim.</li>
          <li>We are not liable for delays or failures caused by circumstances beyond our reasonable control (force majeure).</li>
          <li>Product use is at your own risk. Always follow the instructions provided in the owner's manual.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Scale,
    title: "Governing Law & Disputes",
    content: (
      <>
        <p className="mb-4">
          These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of New Jersey, United States, without regard to conflict of law principles.
        </p>
        <p>
          Any disputes arising from these terms or your use of our products shall be resolved through binding arbitration in the State of New Jersey, except where prohibited by law. You agree to waive any right to a jury trial or to participate in a class action lawsuit.
        </p>
      </>
    ),
  },
  {
    icon: Pencil,
    title: "Changes to These Terms",
    content: (
      <p>
        We reserve the right to update or modify these Terms and Conditions at any time. Changes will be posted on this page with an updated effective date. Your continued use of our website or products after any changes constitutes acceptance of the revised terms. We encourage you to review these terms periodically.
      </p>
    ),
  },
];

const TermsPage = () => {
  return (
    <>
      <SEOHead
        title="Terms & Conditions"
        description="EnviroBiotics terms and conditions. Understand our policies on orders, payments, shipping, subscriptions, intellectual property, and liability."
        path="/terms"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms & Conditions",
          description: "EnviroBiotics terms and conditions governing website use, purchases, and services.",
          url: "https://envirobiotics.com/terms",
        }}
      />
      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-accent-glow pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]" />
          <div className="container relative z-10 text-center px-4">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary-foreground/90">Legal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-secondary-foreground mb-4 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-secondary-foreground/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Please read these terms carefully before using our website or purchasing our products.
            </p>
            <p className="text-secondary-foreground/50 text-sm mt-4">Effective: January 2025</p>
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

          {/* Contact */}
          <div className="mt-12 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/15 rounded-xl p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2">
              Questions About Our Terms?
            </h2>
            <p className="text-muted-foreground mb-6">We're happy to clarify anything.</p>
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
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TermsPage;
