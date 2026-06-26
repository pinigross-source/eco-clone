import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wind, Shield, Zap, Building2, Droplets, ThermometerSun, ArrowRight, CheckCircle2, AlertTriangle, Sparkles, Heart, DollarSign, Leaf, Mail, Phone, Settings, Cpu, Wifi, Play, FileText, Package, MapPin, Send, Users, Calendar, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import InstallationVideoPlayer from "@/components/InstallationVideoPlayer";
import { InstallationQuoteForm } from "@/components/InstallationQuoteForm";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { RelatedTopics } from "@/components/RelatedTopics";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

import hvacAnatomyDiagram from "@/assets/hvac-anatomy-diagram.png";
import hvacBreathingDifficult from "@/assets/hvac-breathing-difficult.jpg";
import hvacNewParadigm from "@/assets/hvac-new-paradigm.jpg";
import probioticHvacProcess from "@/assets/probiotic-hvac-process.png";
import hvacHealthyBuilding from "@/assets/hvac-healthy-building.jpg";
import ebioticProDevice from "@/assets/ebiotic-pro-device.png";
import ebioticProLifestyle from "@/assets/ebiotic-pro-lifestyle.jpg";
import hvacBuildingLungsBg from "@/assets/hvac-building-lungs-bg.avif";

const anatomyPoints = [
  { label: "Fresh Air Intake", icon: Wind, description: "Inhales fresh air from outside" },
  { label: "Air Filters", icon: Shield, description: "Filters out contaminants" },
  { label: "Ductwork & Supply Vents", icon: Building2, description: "Distributes oxygen throughout" },
  { label: "Exhaust Vents", icon: Droplets, description: "Exhales waste and stale air" },
];

const symptoms = [
  {
    icon: AlertTriangle,
    title: "Degraded Air Quality",
    description: "Circulating microorganisms and biological byproducts lead directly to recurring odor complaints and an unhealthy indoor environment for occupants.",
  },
  {
    icon: Zap,
    title: "Increased Energy Consumption",
    description: "Restricted airflow forces the system to work harder to maintain temperature, driving up electricity usage and operational costs.",
  },
  {
    icon: ThermometerSun,
    title: "Accelerated System Strain",
    description: "Constant strain increases the frequency of required maintenance, puts key components at risk, and can shorten the equipment's overall lifespan.",
  },
];

const ebioticProBenefits = [
  {
    icon: Shield,
    title: "Comprehensive Purification",
    description: "Automatically cleans air, surfaces, and objects, including hidden areas like HVAC components and ducts, reducing contaminants, allergens, mold, bacteria, and viruses.",
  },
  {
    icon: Heart,
    title: "Enhanced Health & Immunity",
    description: "By reducing exposure to germs and allergens, it fosters healing of our immune system that keeps us healthier.",
  },
  {
    icon: DollarSign,
    title: "Cost Effective Coverage",
    description: "A single system provides total purification for large areas up to 25,000 sq. ft., eliminating the need for multiple devices.",
  },
  {
    icon: Leaf,
    title: "Energy Efficiency",
    description: "Cleaner HVAC systems operate more efficiently, lowering energy consumption and reducing operational costs.",
  },
];

const ebioticProFeatures = [
  { icon: Cpu, label: "Intelligent Sensors", description: "Automated, sensor-based operation" },
  { icon: Wifi, label: "HVAC Connected", description: "Direct integration with existing systems" },
  { icon: Settings, label: "Fully Automated", description: "Set it and forget it operation" },
  { icon: Building2, label: "25,000 sq. ft.", description: "Coverage for large commercial spaces" },
];

const results = [
  {
    category: "Healthier Indoor Environments",
    points: [
      "Reduces circulating microorganisms",
      "Effectively suppresses persistent, hard-to-solve odors",
      "Fewer occupant complaints",
    ],
  },
  {
    category: "Improved Operational Efficiency",
    points: [
      "Maintains cleaner coils and surfaces for better airflow",
      "Allows the system to operate closer to its design specifications",
      "Potential for lower electricity consumption",
    ],
  },
  {
    category: "Long Term Asset Value",
    points: [
      "Reduces strain on critical components",
      "Decreases the frequency of intensive maintenance",
      "Helps extend the functional lifespan of HVAC equipment",
    ],
  },
];

const buildingTypes = [
  { value: "office", label: "Office Building" },
  { value: "healthcare", label: "Healthcare Facility" },
  { value: "education", label: "School / University" },
  { value: "hospitality", label: "Hotel / Hospitality" },
  { value: "retail", label: "Retail / Commercial" },
  { value: "industrial", label: "Industrial / Warehouse" },
  { value: "residential", label: "Multi-Family Residential" },
  { value: "other", label: "Other" },
];

const dealerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  company: z.string().trim().max(100).optional(),
  buildingType: z.string().max(50).optional(),
  squareFootage: z.string().max(20).optional(),
  zipCode: z.string().trim().min(1, "Zip code is required").max(10),
  message: z.string().trim().max(1000).optional(),
});

const DealerContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    buildingType: "",
    squareFootage: "",
    zipCode: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = dealerSchema.safeParse(formData);
    if (!parsed.success) {
      toast({
        title: "Please check the form",
        description: parsed.error.issues[0]?.message ?? "Invalid input.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const subject = `E-Biotic Pro Dealer Request - ${formData.zipCode}`;
      const messageBody =
        `New Dealer Locator Request\n\n` +
        `Phone: ${formData.phone || "Not provided"}\n` +
        `Company: ${formData.company || "Not provided"}\n` +
        `Building Type: ${buildingTypes.find((b) => b.value === formData.buildingType)?.label || "Not specified"}\n` +
        `Square Footage: ${formData.squareFootage || "Not specified"}\n` +
        `Zip Code: ${formData.zipCode}\n\n` +
        `Message:\n${formData.message || "No additional message"}`;

      const { error } = await supabase.from("contact_inquiries").insert({
        name: formData.name,
        email: formData.email,
        subject,
        message: messageBody,
      });
      if (error) throw error;

      try {
        await supabase.functions.invoke("send-contact-email", {
          body: { name: formData.name, email: formData.email, subject, message: messageBody },
        });
      } catch {}

      setSubmitted(true);
      toast({
        title: "Request received",
        description: "We'll connect you with a dealer shortly.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email contact@envirobiotics.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-8 shadow-2xl border border-border text-center"
      >
        <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7 text-primary" />
        </div>
        <h3 className="font-display font-bold text-2xl mb-2">Request received</h3>
        <p className="text-muted-foreground mb-6">
          Thanks, {formData.name.split(" ")[0] || "there"}. A certified dealer near {formData.zipCode} will reach out within one business day.
        </p>
        <p className="text-sm text-muted-foreground">
          Need to talk now? Call{" "}
          <a href="tel:8336923883" className="text-primary hover:underline font-medium">
            (833) 692 3883
          </a>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-2xl p-8 shadow-2xl border border-border"
    >
      <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
        <Send className="w-4 h-4" />
        Contact Form
      </div>
      <h3 className="font-display font-bold text-2xl mb-6">Request a Dealer Quote</h3>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              maxLength={100}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              maxLength={255}
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              maxLength={20}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              placeholder="ABC Corporation"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              maxLength={100}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="buildingType">Building Type</Label>
            <Select
              value={formData.buildingType}
              onValueChange={(value) => setFormData({ ...formData, buildingType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {buildingTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="squareFootage">Building Size (sq. ft.)</Label>
            <Input
              id="squareFootage"
              placeholder="e.g., 15,000"
              value={formData.squareFootage}
              onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
              maxLength={20}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">Zip Code *</Label>
          <Input
            id="zipCode"
            placeholder="Enter your zip code"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            maxLength={10}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Additional Information</Label>
          <Textarea
            id="message"
            placeholder="Tell us about your project or any specific requirements..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            maxLength={1000}
            rows={4}
          />
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Find a Dealer Near Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By submitting this form, you agree to be contacted about E-Biotic Pro products and services.
        </p>
      </form>
    </motion.div>
  );
};

const HVACPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="HVAC Probiotic Treatment for Commercial Buildings"
        description="Treat your building's HVAC system with environmental probiotics. Reduce biofilm, odors, and airborne contaminants continuously. Request a free quote."
        path="/hvac"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "HVAC Solutions", url: "/hvac" },
            ]),
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How does probiotic HVAC treatment work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Probiotic HVAC treatment introduces Bacillus-based probiotics into a building's ductwork via an installed dispenser. The probiotics travel with the airflow, colonizing internal duct surfaces, coils, and drain pans, suppressing biofilm, mold, and odor-causing bacteria throughout the entire building continuously.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What size buildings can EnviroBiotics HVAC devices treat?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The E-Biotic Pro is designed for commercial buildings and treats up to 25,000 square feet per unit. Multiple units can be installed for larger facilities. EnviroBiotics also offers the BAPF series for residential HVAC systems.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is HVAC probiotic treatment safe for building occupants?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. All EnviroBiotics HVAC products use EPA registered, FDA GRAS certified Bacillus probiotic strains. They are non-pathogenic, produce no ozone or VOCs, and are safe for continuous human exposure, including in hospitals, schools, and offices.",
                  },
                },
              ],
            },
          ],
        }}
      />
      <Navbar />
      <main>
        {/* Hero Section  full-bleed Sonos style */}
        <section className="relative w-full overflow-hidden pt-16 sm:pt-20">
          <div className="relative min-h-[78vh] md:min-h-[88vh] w-full">
            <img
              src={hvacBuildingLungsBg}
              alt="HVAC building system as the respiratory system of a modern building"
              className="absolute inset-0 h-full w-full object-cover"
              width={1920}
              height={1280}
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/65 md:via-black/25 md:to-transparent"
            />
            <div className="relative z-10 flex min-h-[78vh] md:min-h-[88vh] items-end md:items-center">
              <div className="container px-5 sm:px-6 pb-12 md:pb-0">
                <div className="max-w-3xl text-white" style={{ textShadow: "0 2px 18px rgba(0,0,0,0.45)" }}>
                  <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-white/85 mb-5">
                    <Building2 className="w-3.5 h-3.5" />
                    Central Air & Heating Solutions
                  </p>
                  <h1 className="font-display font-bold tracking-tight text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.04] mb-6 !text-white">
                    Your Building Has <span className="text-[hsl(24_95%_53%)] whitespace-nowrap">Lungs.</span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl mb-10">
                    At the heart of every building is a hidden, living system. The HVAC system functions as the building's respiratory system, sustaining comfort, air quality, and overall indoor health.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="#ebiotic-pro"
                      className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-foreground text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-white/95"
                    >
                      Explore E-Biotic Pro
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="mailto:contact@envirobiotics.com"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white text-sm font-semibold ring-1 ring-inset ring-white/30 backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      <Mail className="w-4 h-4" />
                      Contact Sales
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* E-Biotic Pro Hero Section - Sonos style */}
        <section id="ebiotic-pro" className="section-padding bg-background relative overflow-hidden">
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ScrollReveal variant="fadeRight">
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70">
                    Commercial Solution
                  </span>

                  <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
                    E-Biotic Pro
                  </h2>

                  <p className="text-xl text-foreground/80 leading-snug">
                    A centralized HVAC-connected device for large areas
                  </p>

                  <p className="text-muted-foreground leading-relaxed max-w-xl">
                    Make your indoor spaces healthy and pleasant with <strong className="text-foreground">E-Biotic Pro</strong>, a centralized, intelligent purification system designed to clean and protect large areas up to <strong className="text-primary">25,000 sq. ft.</strong> Connected directly to your HVAC system, it ensures 24/7 cleanliness, even in hard-to-reach places like air ducts.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {ebioticProFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/60">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <feature.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{feature.label}</p>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <InstallationQuoteForm
                      productName="eBiotic Pro"
                      trigger={
                        <Button variant="hero" size="lg" className="gap-2">
                          <Calendar className="h-5 w-5" />
                          Get a Free Quote
                        </Button>
                      }
                    />
                    <Button variant="outline" size="lg" asChild>
                      <a href="tel:8336923883">
                        <Phone className="mr-2 h-4 w-4" />
                        (833) 692 3883
                      </a>
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Request a quote or call us to find the dealer that services your area
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeLeft" delay={0.2}>
                <div className="relative mx-auto w-full max-w-2xl">
                  <div className="relative overflow-hidden rounded-[2rem] bg-[#fafaf7] ring-1 ring-black/[0.04] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.18),0_20px_40px_-20px_rgba(0,0,0,0.08)]">
                    <img
                      src={ebioticProLifestyle}
                      alt="E-Biotic Pro installed in a modern commercial office interior"
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* E-Biotic Pro Benefits */}
        <section className="section-padding bg-background">
          <div className="container">
            <ScrollReveal>
              <div className="max-w-3xl mb-16">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Benefits
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-5">
                  E-Biotic Pro advantages.
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  The intelligent solution for comprehensive building purification.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {ebioticProBenefits.map((benefit, index) => (
                <StaggerItem key={index}>
                  <div className="h-full p-7 rounded-[1.5rem] bg-card ring-1 ring-black/[0.04] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg tracking-tight mb-2 text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Video Section */}
        <section className="section-padding bg-[#fafaf7]">
          <div className="container">
            <ScrollReveal>
              <div className="max-w-3xl mb-14">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                  <Play className="w-3.5 h-3.5" />
                  Installation Guide
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-5">
                  What's inside the box,
                  <br />
                  and how to install.
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Watch our comprehensive guides to get your E-Biotic Pro system up and running.
                </p>
              </div>
            </ScrollReveal>

            <div className="max-w-5xl">
              <ScrollReveal variant="fadeUp">
                <div className="rounded-[2rem] overflow-hidden ring-1 ring-black/[0.04] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)]">
                  <InstallationVideoPlayer />
                </div>
              </ScrollReveal>
            </div>

            {/* Additional Resources */}
            <ScrollReveal delay={0.3}>
              <div className="mt-10 p-7 rounded-[1.5rem] bg-card ring-1 ring-black/[0.04]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-foreground">PDF User Guide</h3>
                      <p className="text-sm text-muted-foreground">Complete installation and operation manual</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-foreground">What's in the Box</h3>
                      <p className="text-sm text-muted-foreground">Unit, mounting hardware, refill cartridge</p>
                    </div>
                  </div>
                  <a
                    href="mailto:contact@envirobiotics.com"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
                  >
                    Request Documentation
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Why E-Biotic Pro Section */}
        <section className="section-padding">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal variant="fadeRight">
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70">
                    <Shield className="w-3.5 h-3.5" />
                    The Magic
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
                    Why E-Biotic Pro?
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Contaminated HVAC systems and air ducts often cause building sicknesses. E-Biotic Pro offers an automated, sensor-based solution that ensures the cleanliness of visible and invisible areas, creating healthier and more pleasant indoor environments for everyone.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Take control of your indoor health and sustainability with E-Biotic Pro, a more innovative, safer way to purify large spaces.
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-4">
                    {["24/7 Protection", "Sensor-Based", "Fully Automated"].map((tag) => (
                      <div key={tag} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card ring-1 ring-black/[0.06] text-foreground text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeLeft" delay={0.2}>
                <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-black/[0.04] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)]">
                  <img
                    src={hvacNewParadigm}
                    alt="E-Biotic Pro managing HVAC as a biological system"
                    className="w-full h-auto"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Anatomy Section */}
        <section className="section-padding bg-[#fafaf7]">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ScrollReveal variant="fadeRight">
                <div className="relative rounded-[2rem] overflow-hidden bg-card ring-1 ring-black/[0.04] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.2)] p-6">
                  <img
                    src={hvacAnatomyDiagram}
                    alt="The Anatomy of the Building's Lungs - HVAC system diagram"
                    className="w-full h-auto"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeLeft" delay={0.2}>
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70">
                    Anatomy
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
                    The anatomy of
                    <br />
                    your building's lungs.
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Just as lungs sustain the body, the HVAC system sustains the building, regulating air quality, comfort, and overall health.
                  </p>

                  <StaggerContainer className="space-y-3 pt-2">
                    {anatomyPoints.map((point, index) => (
                      <StaggerItem key={index}>
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-card ring-1 ring-black/[0.04] transition-shadow hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)]">
                          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <point.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{point.label}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="section-padding bg-background">
          <div className="container">
            <ScrollReveal>
              <div className="max-w-3xl mb-16">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  The Problem
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-5">
                  When breathing
                  <br />
                  becomes difficult.
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Like any biological system, a building's lungs are vulnerable. Over time, the constant flow of air leads to an accumulation of biological buildup on internal surfaces like ducts and coils.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ScrollReveal variant="fadeRight">
                <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-black/[0.04] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)]">
                  <img
                    src={hvacBreathingDifficult}
                    alt="When breathing becomes difficult, healthy vs restricted airflow"
                    className="w-full h-auto"
                  />
                </div>
              </ScrollReveal>

              <StaggerContainer className="space-y-3">
                <StaggerItem>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight mb-4">The symptoms of an unhealthy system.</h3>
                </StaggerItem>
                {symptoms.map((symptom, index) => (
                  <StaggerItem key={index}>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-card ring-1 ring-black/[0.04] transition-shadow hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)]">
                      <div className="w-11 h-11 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                        <symptom.icon className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{symptom.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{symptom.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="section-padding bg-[#fafaf7]">
          <div className="container">
            <ScrollReveal>
              <div className="max-w-3xl mb-16">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                  <Shield className="w-3.5 h-3.5" />
                  EnviroBiotics Solution
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-5">
                  A probiotic approach
                  <br />
                  to respiratory health.
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  EnviroBiotics introduces a proprietary blend of beneficial probiotics into the HVAC system. Instead of fighting a recurring battle against contamination, this technology establishes a healthy and stable microbiome on internal surfaces.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ScrollReveal variant="fadeRight">
                <div className="relative rounded-[2rem] overflow-hidden bg-card ring-1 ring-black/[0.04] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.2)] p-6">
                  <img
                    src={probioticHvacProcess}
                    alt="Probiotic HVAC process: Dispersion, Distribution, Protection"
                    className="w-full h-auto"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeLeft" delay={0.2}>
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
                    How continuous treatment maintains system health.
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The process is automatic and continuous. A protective microbial layer forms on ducts, coils, and other internal surfaces. This layer continuously suppresses the growth of odor-causing and harmful microorganisms.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {["Dispersion", "Distribution", "Protection"].map((step, index) => (
                      <div
                        key={step}
                        className="text-center p-5 rounded-2xl bg-card ring-1 ring-black/[0.04]"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <span className="font-bold text-primary">{index + 1}</span>
                        </div>
                        <p className="font-semibold text-sm text-foreground">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                    <p className="text-center font-semibold text-primary">
                      24/7 Continuous Protection
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="section-padding bg-background">
          <div className="container">
            <ScrollReveal>
              <div className="max-w-3xl mb-16">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-5">
                  Results
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-5">
                  The results of a healthy,
                  <br />
                  breathing building.
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Proactive, continuous biological treatment ensures occupant health, operational efficiency, and long-term sustainability.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <ScrollReveal variant="fadeRight">
                <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-black/[0.04] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)] sticky top-28">
                  <img
                    src={hvacHealthyBuilding}
                    alt="The results of a healthy breathing building"
                    className="w-full h-auto"
                  />
                </div>
              </ScrollReveal>

              <StaggerContainer className="space-y-4">
                {results.map((result, index) => (
                  <StaggerItem key={index}>
                    <div className="p-7 rounded-[1.5rem] bg-card ring-1 ring-black/[0.04] transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)]">
                      <h3 className="text-xl font-display font-bold mb-4 text-foreground tracking-tight">
                        {result.category}
                      </h3>
                      <ul className="space-y-3">
                        {result.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* Dealer Locator Section - Sonos style */}
        <section id="find-dealer" className="section-padding bg-card relative overflow-hidden">
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <ScrollReveal variant="fadeRight">
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70">
                    <MapPin className="w-3.5 h-3.5" />
                    Find a Dealer
                  </span>

                  <h2 className="text-3xl md:text-5xl font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
                    Get E-Biotic Pro Installed in Your Building
                  </h2>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our network of certified dealers and installers are ready to help you transform your building's indoor environment. Fill out the form and we'll connect you with a dealer in your area.
                  </p>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/60">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Certified Installers</h4>
                        <p className="text-sm text-muted-foreground">All dealers are trained and certified by EnviroBiotics</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/60">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Full Support</h4>
                        <p className="text-sm text-muted-foreground">Installation, maintenance, and ongoing support included</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/60">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Prefer to call?</h4>
                        <p className="text-sm text-muted-foreground">
                          <a href="tel:8336923883" className="text-primary hover:underline">(833) 692 3883</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeLeft" delay={0.2}>
                <DealerContactForm />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section - Sonos style */}
        <section className="section-padding bg-background">
          <div className="container">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-[2.5rem] bg-[#fafaf7] ring-1 ring-black/[0.04] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.18)] px-8 py-20 md:px-16 md:py-28 text-center">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-6">
                  <Building2 className="w-3.5 h-3.5" />
                  Get Started
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-5 max-w-2xl mx-auto">
                  Ready for E-Biotic Pro?
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                  Transform your building's indoor environment with the most advanced HVAC-connected probiotic protection system.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="#find-dealer"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
                  >
                    <MapPin className="w-4 h-4" />
                    Find a Dealer
                  </a>
                  <a
                    href="tel:8336923883"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-card text-foreground text-sm font-semibold ring-1 ring-inset ring-black/[0.08] transition-all hover:bg-card/70"
                  >
                    <Phone className="w-4 h-4" />
                    (833) 692 3883
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="container max-w-4xl px-4 pb-16">
          <RelatedTopics currentPath="/hvac" />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HVACPage;
