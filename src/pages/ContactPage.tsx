import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Phone, Mail, Clock, MapPin, MessageSquare } from "lucide-react";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { useState } from "react";

const localBusinessJsonLd = {
  "@type": "LocalBusiness",
  "@id": "https://envirobiotics.com/#business",
  name: "EnviroBiotics",
  legalName: "Ecological Balancing Technologies Corporation",
  url: "https://envirobiotics.com",
  telephone: "+18336923883",
  email: "contact@envirobiotics.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5 Lenape Road, Unit 2C",
    addressLocality: "Andover",
    addressRegion: "NJ",
    postalCode: "07821",
    addressCountry: "US",
  },
  openingHours: "Mo-Fr 09:00-16:00",
  image: "https://envirobiotics.com/favicon.png",
  priceRange: "$$",
  sameAs: [
    "https://www.facebook.com/Envirobiotics",
    "https://www.instagram.com/envirobiotics/",
  ],
};

const ContactPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <SEOHead
        title="Contact Us – EnviroBiotics"
        description="Get in touch with EnviroBiotics. Call (833) 692-3883, email contact@envirobiotics.com, or send us a message. Mon–Fri, 9 AM–4 PM EST."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            localBusinessJsonLd,
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Contact Us", url: "/contact" },
            ]),
          ],
        }}
      />
      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="gradient-hero pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="container text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-tight">
              Contact Us
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              We're here to help. Reach out with questions about our products, your order, or anything else.
            </p>
          </div>
        </section>

        <section className="container max-w-5xl px-4 py-12 sm:py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-display font-bold text-foreground mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  <a href="tel:8336923883" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">(833) 692-3883</p>
                      <p className="text-sm text-muted-foreground">Toll-free, US & Canada</p>
                    </div>
                  </a>

                  <a href="mailto:contact@envirobiotics.com" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">contact@envirobiotics.com</p>
                      <p className="text-sm text-muted-foreground">We reply within 1 business day</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Mon – Fri, 9 AM – 4 PM EST</p>
                      <p className="text-sm text-muted-foreground">Excluding US public holidays</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-display font-bold text-foreground mb-4">Business Address</h2>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <address className="not-italic text-muted-foreground leading-relaxed">
                    <p className="font-semibold text-foreground">Ecological Balancing Technologies Corporation</p>
                    5 Lenape Road, Unit 2C<br />
                    Andover, NJ 07821<br />
                    United States
                  </address>
                </div>
              </div>
            </div>

            {/* Send Message CTA */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/15 rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-display font-bold text-foreground">Send Us a Message</h2>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Have a question about our products, need help with an order, or want to learn more about environmental probiotics? Fill out our contact form and we'll get back to you promptly.
                </p>
                <button
                  onClick={() => setDialogOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
                >
                  <Mail className="h-4 w-4" />
                  Open Contact Form
                </button>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-display font-bold text-foreground mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/support" className="text-primary hover:underline">Product Support & FAQs →</a>
                  </li>
                  <li>
                    <a href="/warranty-policy" className="text-primary hover:underline">Shipping, Returns & Warranty →</a>
                  </li>
                  <li>
                    <a href="/register" className="text-primary hover:underline">Register Your Product →</a>
                  </li>
                  <li>
                    <a href="/orders" className="text-primary hover:underline">Track Your Order →</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContactFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <Footer />
    </>
  );
};

export default ContactPage;
