import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Shield, Eye, Database, Share2, Lock, UserCheck, Cookie, Globe, Baby, Mail, Phone, Clock, HelpCircle } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: (
      <>
        <p className="mb-4">
          Ecological Balancing Technologies Corporation ("EBT Corp.", "EnviroBiotics", "we", "us", or "our") collects information you provide directly when you interact with our website, products, and services. This includes:
        </p>
        <h4 className="font-semibold text-foreground mb-2">Personal Information</h4>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Name, email address, phone number, and mailing/shipping address</li>
          <li>Payment and billing information (processed securely via Stripe)</li>
          <li>Account login credentials</li>
          <li>Product registration details and serial numbers</li>
          <li>Communications you send to us (support inquiries, feedback)</li>
        </ul>
        <h4 className="font-semibold text-foreground mb-2">Automatically Collected Information</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Device type, browser type, and operating system</li>
          <li>IP address and approximate geographic location</li>
          <li>Pages visited, time spent, and referral sources</li>
          <li>Cookies and similar tracking technologies (see Cookie Policy below)</li>
        </ul>
      </>
    ),
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    content: (
      <>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Process and fulfill orders, including shipping and payment</li>
          <li>Manage your account and product registrations</li>
          <li>Provide customer support and respond to inquiries</li>
          <li>Send order confirmations, shipping notifications, and service updates</li>
          <li>Send promotional communications and product recommendations (with your consent)</li>
          <li>Administer our Subscribe & Save and affiliate programs</li>
          <li>Improve our website, products, and services</li>
          <li>Detect and prevent fraud or unauthorized activity</li>
          <li>Comply with legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    icon: Share2,
    title: "Information Sharing & Disclosure",
    content: (
      <>
        <p className="mb-4">
          We do not sell, trade, or rent your personal information to third parties. We may share your information with:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Service providers:</strong> Payment processors (Stripe, PayPal), shipping carriers (USPS, FedEx), email service providers, and analytics tools that help us operate our business</li>
          <li><strong>Legal requirements:</strong> When required by law, regulation, legal process, or enforceable governmental request</li>
          <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction</li>
          <li><strong>With your consent:</strong> When you have given explicit permission for a specific purpose</li>
        </ul>
      </>
    ),
  },
  {
    icon: Lock,
    title: "Data Security",
    content: (
      <>
        <p className="mb-4">
          We implement industry-standard technical and organizational measures to protect your personal information, including:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>SSL/TLS encryption for all data transmitted to and from our website</li>
          <li>PCI-compliant payment processing through Stripe. We never store your full credit card information</li>
          <li>Secure data storage with access controls and regular security audits</li>
          <li>Employee training on data privacy and security practices</li>
        </ul>
        <p className="mt-4">
          While we strive to protect your information, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and keep your account credentials confidential.
        </p>
      </>
    ),
  },
  {
    icon: Cookie,
    title: "Cookie Policy",
    content: (
      <>
        <p className="mb-4">
          Our website uses cookies and similar technologies to enhance your browsing experience. These include:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li><strong>Essential cookies:</strong> Required for site functionality (cart, authentication, preferences)</li>
          <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site (Google Analytics, Microsoft Clarity)</li>
          <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements and measure campaign effectiveness (Facebook Pixel)</li>
        </ul>
        <p>
          You can manage your cookie preferences through your browser settings. Disabling certain cookies may affect site functionality.
        </p>
      </>
    ),
  },
  {
    icon: UserCheck,
    title: "Your Rights & Choices",
    content: (
      <>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal retention requirements</li>
          <li><strong>Opt-out:</strong> Unsubscribe from marketing emails at any time via the link in each email</li>
          <li><strong>Data portability:</strong> Request your data in a structured, commonly used format</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at <a href="mailto:contact@envirobiotics.com" className="text-primary hover:underline">contact@envirobiotics.com</a> or call <a href="tel:8336923883" className="text-primary hover:underline">(833) 692-3883</a>. We will respond within 30 days.
        </p>
      </>
    ),
  },
  {
    icon: Baby,
    title: "Children's Privacy",
    content: (
      <p>
        Our website and services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will promptly delete it.
      </p>
    ),
  },
  {
    icon: Globe,
    title: "International Users",
    content: (
      <p>
        Our website is operated from the United States. If you are accessing our site from outside the U.S., please be aware that your information may be transferred to, stored, and processed in the United States, where data protection laws may differ from those in your jurisdiction. By using our services, you consent to this transfer.
      </p>
    ),
  },
];

const PrivacyPage = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="EnviroBiotics privacy policy. Learn how we collect, use, protect, and share your personal information when you use our website and products."
        path="/privacy"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          description: "EnviroBiotics privacy policy covering data collection, usage, security, and your rights.",
          url: "https://envirobiotics.com/privacy",
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
              <span className="text-sm font-medium text-primary-foreground/90">Your Privacy Matters</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-secondary-foreground mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-secondary-foreground/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              We are committed to protecting your personal information and being transparent about how we use it.
            </p>
            <p className="text-secondary-foreground/50 text-sm mt-4">Last updated: January 2025</p>
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

          {/* Policy Changes Notice */}
          <div className="mt-10 bg-muted rounded-xl border border-border p-6 sm:p-8">
            <h2 className="text-lg font-display font-bold text-foreground mb-2">Changes to This Policy</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically. Continued use of our website after changes constitutes acceptance of the revised policy.
            </p>
          </div>

          {/* Contact */}
          <div className="mt-10 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/15 rounded-xl p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2">
              Questions About Your Privacy?
            </h2>
            <p className="text-muted-foreground mb-6">We're here to help with any privacy-related concerns.</p>
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

export default PrivacyPage;
