import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  FileText, 
  HelpCircle,
  ArrowRight,
  Clock,
  CheckCircle2,
  Play,
  Download,
  X,
  Loader2,
  Shield,
  Share2
} from "lucide-react";
import { useState, useCallback } from "react";
import { useEntitlement } from "@/hooks/useEntitlement";

import { useToast } from "@/hooks/use-toast";
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { RelatedTopics } from "@/components/RelatedTopics";
import { Link } from "@/lib/link";
import biologicMiniImg from "@/assets/biologic-mini-nobg-new.avif";
import biotica800Img from "@/assets/shop/biotica-800.png";
import ba2080Img from "@/assets/shop/ba2080.png";
import ebioticProImg from "@/assets/ebiotic-pro.avif";
import { LifestyleHero } from "@/components/LifestyleHero";
import heroSupportLifestyle from "@/assets/hero-support-lifestyle.jpg";

const supportOptions = [
  {
    icon: Shield,
    title: "Product Registration",
    description: "Register your device for warranty coverage and exclusive benefits.",
    action: "Register Now",
    href: "/product-registration",
  },
  {
    icon: MessageCircle,
    title: "Contact Us",
    description: "Get in touch with our support team during business hours.",
    action: "Send Message",
    href: "#contact-form",
    scrollTo: true,
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Find quick answers to commonly asked questions.",
    action: "Browse FAQ",
    href: "/#faq",
  },
];

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(833) 692 3883",
    subtext: "Monday to Friday, 9AM - 4PM EST",
    href: "tel:+18336923883",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@envirobiotics.com",
    subtext: "We respond within 24 hours",
    href: "mailto:contact@envirobiotics.com",
  },
  {
    icon: Clock,
    label: "Open During",
    value: "Monday to Friday",
    subtext: "9AM - 4PM EST",
  },
];

const productSupport = [
  {
    name: "BioLogic Mini",
    image: biologicMiniImg,
    vimeoId: "1099451099",
    videoTitle: "What's in the box?",
    pdfUrl: "/manuals/BioLogic-Mini-User-Manual.pdf",
    pdfTitle: "User Manual",
  },
  {
    name: "Biotica 800",
    image: biotica800Img,
    vimeoId: "1035917424",
    videoTitle: "Quick Start Guide",
    pdfUrl: "https://zofwakmgbmcqknmiizgd.supabase.co/storage/v1/object/public/user-manuals/Biotica800-User-Manual.pdf",
    pdfTitle: "User Manual",
  },
  {
    name: "BA 2080",
    image: ba2080Img,
    vimeoId: "871042510",
    videoTitle: "Quick Start Guide",
    pdfUrl: "https://zofwakmgbmcqknmiizgd.supabase.co/storage/v1/object/public/user-manuals/BA-2080-User-Guide.pdf",
    pdfTitle: "User Manual",
  },
  {
    name: "E-Biotic Pro",
    image: ebioticProImg,
    vimeoId: "1085737785",
    videoTitle: "Installation Guide",
    pdfUrl: "https://zofwakmgbmcqknmiizgd.supabase.co/storage/v1/object/public/user-manuals/E-Biotic-Pro-User-Manual.pdf",
    pdfTitle: "User Manual",
  },
];

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [activeVideo, setActiveVideo] = useState<{ vimeoId: string; title: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { subscribed, features } = useEntitlement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let recaptchaToken = "";
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha("contact_form");
        } catch (recaptchaError) {
          console.warn("reCAPTCHA failed, proceeding without token:", recaptchaError);
        }
      }

      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          recaptchaToken,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Customer Support | EnviroBiotics Help Center"
        description="Get help with your EnviroBiotics products. Contact support, register your device, access manuals, and find answers to common questions."
        path="/support"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Support", url: "/support" },
            ]),
            {
              "@type": "WebPage",
              "@id": "https://envirobiotics.com/support",
              "name": "Customer Support | EnviroBiotics Help Center",
              "description": "Get help with your EnviroBiotics products. Contact support, register your device, access manuals, and find answers to common questions.",
              "isPartOf": { "@id": "https://envirobiotics.com/#website" },
            },
          ],
        }}
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <LifestyleHero
          image={heroSupportLifestyle}
          imageAlt="Calm Scandinavian living room with diffused natural light"
          eyebrow="Customer Support"
          title={<>How can we <span className="text-primary">help you?</span></>}
          subcopy="Our dedicated support team is here to assist you with any questions about our probiotic solutions for healthier indoor environments."
          ctaLabel="Contact Support"
          ctaHref="#contact-form"
        />

        {/* Support Options */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportOptions.map((option, index) => (
                <StaggerItem key={index}>
                  <div className="h-full p-6 rounded-2xl glass-card hover:shadow-lg transition-all group">
                    <div className="icon-container-lg mb-4">
                      <option.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2">{option.title}</h3>
                    <p className="text-muted-foreground mb-4">{option.description}</p>
                    {option.scrollTo ? (
                      <Button
                        variant="outline"
                        className="group-hover:border-primary/50 transition-colors"
                        onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      >
                        {option.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : option.href!.includes("#") ? (
                      <Button variant="outline" className="group-hover:border-primary/50 transition-colors" asChild>
                        <a href={option.href!}>
                          {option.action}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" className="group-hover:border-primary/50 transition-colors" asChild>
                        <Link to={option.href!}>
                          {option.action}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Product Support Section */}
        <section className="section-padding">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Product Resources & Support
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Access user manuals, quick start guides, and video tutorials for your EnviroBiotics device.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {productSupport.map((product, index) => (
                <StaggerItem key={index}>
                  <div className="h-full bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all flex flex-col">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gradient-to-b from-muted/50 to-muted flex items-center justify-center p-6">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="max-h-full w-auto object-contain"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold mb-4 text-center italic text-foreground/90">
                        {product.name}
                      </h3>
                      
                      <div className="space-y-3">
                        {/* User Manual Button */}
                        <div className="flex items-center gap-2">
                          <a
                            href={product.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <Download className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-display font-semibold text-sm">{product.pdfTitle}</p>
                              <p className="text-xs text-primary font-medium">Download PDF</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </a>
                          <button
                            onClick={async () => {
                              if (navigator.share) {
                                try { await navigator.share({ title: `${product.name} - ${product.pdfTitle}`, url: product.pdfUrl }); } catch {}
                              } else {
                                await navigator.clipboard.writeText(product.pdfUrl);
                                toast({ title: "Link copied!", description: "Manual link copied to clipboard." });
                              }
                            }}
                            className="shrink-0 w-10 h-10 rounded-xl bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors"
                            aria-label={`Share ${product.pdfTitle}`}
                            title="Share manual link"
                          >
                            <Share2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
                          </button>
                        </div>

                        {/* Video Guide Button */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveVideo({ vimeoId: product.vimeoId, title: product.videoTitle })}
                            className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                              <Play className="w-5 h-5 text-accent" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-display font-semibold text-sm">{product.videoTitle}</p>
                              <p className="text-xs text-muted-foreground">Watch Video</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                          </button>
                          <button
                            onClick={async () => {
                              const url = `https://vimeo.com/${product.vimeoId}`;
                              if (navigator.share) {
                                try { await navigator.share({ title: product.videoTitle, url }); } catch {}
                              } else {
                                await navigator.clipboard.writeText(url);
                                toast({ title: "Link copied!", description: "Video link copied to clipboard." });
                              }
                            }}
                            className="shrink-0 w-10 h-10 rounded-xl bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors"
                            aria-label={`Share ${product.videoTitle}`}
                            title="Share video link"
                          >
                            <Share2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <ScrollReveal variant="fadeRight">
                <div id="contact-form" className="p-8 rounded-2xl glass-card">
                  <h2 className="text-2xl font-display font-bold mb-2">Send Us a Message</h2>
                  <p className="text-muted-foreground mb-6">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </ScrollReveal>

              {/* Contact Info */}
              <ScrollReveal variant="fadeLeft" delay={0.2}>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-bold mb-2">Get in Touch</h2>
                    <p className="text-muted-foreground">
                      Prefer to reach out directly? Here's how you can contact us.
                    </p>
                  </div>

                  <StaggerContainer className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <StaggerItem key={index}>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 hover:bg-muted transition-colors"
                          >
                            <div className="icon-container">
                              <info.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{info.label}</p>
                              <p className="font-semibold">{info.value}</p>
                              <p className="text-sm text-muted-foreground">{info.subtext}</p>
                            </div>
                          </a>
                        ) : (
                          <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
                            <div className="icon-container">
                              <info.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{info.label}</p>
                              <p className="font-semibold">{info.value}</p>
                              <p className="text-sm text-muted-foreground">{info.subtext}</p>
                            </div>
                          </div>
                        )}
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  {/* Response Time */}
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-4">
                      <div className="icon-container bg-primary/10">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Our Response Times</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            Live Chat: Instant during business hours
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            Email: Within 24 hours
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            Phone: Immediate assistance available
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Video Modal */}
        {activeVideo && (
          <div 
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div 
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center mb-4">
                <h3 className="text-xl font-display font-bold text-foreground">
                  {activeVideo.title}
                </h3>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
                <iframe
                  src={`https://player.vimeo.com/video/${activeVideo.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={activeVideo.title}
                />
              </div>
            </div>
          </div>
        )}
        <section className="container max-w-4xl px-4 pb-16">
          <RelatedTopics currentPath="/support" />
        </section>
      </main>
      <Footer />
    </div>
  );
};

const RECAPTCHA_SITE_KEY = "6LdFf2QsAAAAADxCvgV9IGrHVGs9CoF50_ksSjXu";
const SupportPageWithRecaptcha = () => (
  <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
    <SupportPage />
  </GoogleReCaptchaProvider>
);

export default SupportPageWithRecaptcha;
