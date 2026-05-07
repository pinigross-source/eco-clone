import { Navbar } from "@/components/Navbar";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { 
  Check, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Leaf, 
  ArrowRight,
  Sparkles,
  Star,
  RefreshCw,
  Award,
  Heart,
  ShoppingCart
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { StripeProductCard } from "@/components/shop/StripeProductCard";
import { getSubscriptions } from "@/lib/stripe-products";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    description: "Your device is protected for life as long as you maintain an active subscription. No questions asked.",
    highlight: true
  },
  {
    icon: Clock,
    title: "Never Run Out",
    description: "Automatic deliveries timed perfectly so you never experience a gap in protection."
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Your cartridges arrive at your door with free priority shipping, every time."
  },
];

const comparisonData = [
  { feature: "Device Warranty", standard: "1 Year", subscriber: "Lifetime" },
  { feature: "Cartridge Price", standard: "Full Price", subscriber: "Best Value" },
  { feature: "Shipping", standard: "$5.99+", subscriber: "Always Free" },
  
  { feature: "Early Access to Products", standard: "No", subscriber: "Yes" },
  { feature: "Exclusive Member Discounts", standard: "No", subscriber: "Yes" },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    quote: "The lifetime warranty alone made subscribing a no-brainer. Plus, I love not having to remember to reorder!",
    rating: 5
  },
  {
    name: "David K.",
    location: "Portland, OR",
    quote: "I've been a subscriber for 2 years now. The savings add up, and the convenience is unmatched.",
    rating: 5
  },
  {
    name: "Jennifer L.",
    location: "Miami, FL",
    quote: "When my Biotica 800 had an issue after 3 years, they replaced it instantly. That's the lifetime warranty in action!",
    rating: 5
  }
];

const faqs = [
  {
    question: "How does the Lifetime Warranty work?",
    answer: "As long as you maintain an active refill subscription, your device is covered for life. If anything goes wrong with your unit due to manufacturing defects, we'll repair or replace it at no cost to you."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely! There are no long-term commitments. You can pause, skip, or cancel your subscription at any time through your account dashboard. Note that canceling will revert your warranty to the standard 1-year term from the original purchase date."
  },
  {
    question: "How much do I save with a subscription?",
    answer: "Subscribers enjoy free shipping on every order plus lifetime warranty coverage. Over a year, this amounts to significant savings while ensuring continuous protection."
  },
  {
    question: "When will my cartridges arrive?",
    answer: "We'll send your refill cartridges automatically based on your device's cartridge life cycle. For BioLogic Mini (90 days), Biotica 800 (180 days), and BA 2080 (180 days). You can adjust the timing anytime."
  }
];

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Refill Subscriptions – Save More, Never Run Out"
        description="Subscribe to EnviroBiotics refill cartridges and get free shipping, lifetime device warranty, and automatic deliveries. Cancel or pause anytime."
        path="/subscribe"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Subscribe & Save", url: "/subscribe" },
            ]),
            {
              "@type": "WebPage",
              "@id": "https://envirobiotics.com/subscribe",
              "name": "Refill Subscriptions – Save More, Never Run Out",
              "description": "Subscribe to EnviroBiotics refill cartridges and get free shipping, lifetime device warranty, and automatic deliveries.",
              "isPartOf": { "@id": "https://envirobiotics.com/#website" },
            },
          ],
        }}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10 px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Subscribe & Save
              </Badge>
              
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
                <span className="text-foreground">Protect Your Home.</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  Protect Your Investment.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Join our Refill Subscription Program and enjoy lifetime warranty coverage, 
                exclusive savings, and the convenience of automatic deliveries.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Button variant="hero" size="lg" className="rounded-full group" asChild>
                  <Link to="/shop#subscriptions-section">
                    Start Your Subscription
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <a href="#how-it-works">Learn More</a>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2.5 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-3.5 py-2 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Lifetime Warranty</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-3.5 py-2 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-3.5 py-2 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Never Run Out</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Lifetime warranty included with all active subscriptions</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lifetime Warranty Highlight */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20">
        <div className="container px-4 sm:px-6">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Award className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                    Lifetime Warranty
                  </h2>
                  <p className="text-muted-foreground">Exclusive to subscribers</p>
                </div>
              </div>
              
              <div className="hidden lg:block w-px h-16 bg-primary/30" />
              
              <div className="text-center lg:text-left max-w-md">
                <p className="text-muted-foreground">
                  Standard purchases include a 1-year warranty. <span className="text-foreground font-medium">Subscribe to upgrade to lifetime coverage</span> and never worry about your device again.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 sm:py-28">
        <div className="container px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4">Member Benefits</Badge>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
                More Than Just Refills
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Subscribers enjoy exclusive perks that make protecting your indoor environment 
                easier and more affordable.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 0.1}>
                <motion.div
                  className={`relative p-8 rounded-2xl border transition-all duration-300 h-full ${
                    benefit.highlight 
                      ? 'bg-primary/5 border-primary/30 shadow-lg shadow-primary/10' 
                      : 'bg-card border-border hover:border-primary/30 hover:shadow-lg'
                  }`}
                  whileHover={{ y: -4 }}
                >
                  {benefit.highlight && (
                    <Badge className="absolute -top-3 right-6 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    benefit.highlight 
                      ? 'bg-primary/20' 
                      : 'bg-muted'
                  }`}>
                    <benefit.icon className={`w-7 h-7 ${benefit.highlight ? 'text-primary' : 'text-primary'}`} />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4">Compare Plans</Badge>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
                Standard vs. Subscriber
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                See how much more value you get as a subscription member.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="max-w-3xl mx-auto">
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-xl">
                {/* Header */}
                <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
                  <div className="p-6 font-semibold text-foreground">Feature</div>
                  <div className="p-6 text-center font-semibold text-muted-foreground">Standard</div>
                  <div className="p-6 text-center font-semibold text-primary bg-primary/5 border-l border-primary/20">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Subscriber
                    </div>
                  </div>
                </div>
                
                {/* Rows */}
                {comparisonData.map((row, index) => (
                  <div 
                    key={row.feature} 
                    className={`grid grid-cols-3 border-b border-border last:border-b-0 ${
                      index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                    }`}
                  >
                    <div className="p-5 font-medium text-foreground flex items-center">
                      {row.feature}
                    </div>
                    <div className="p-5 text-center text-muted-foreground flex items-center justify-center">
                      {row.standard}
                    </div>
                    <div className="p-5 text-center font-medium text-primary bg-primary/5 border-l border-primary/20 flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      {row.subscriber}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="container px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4">Simple Process</Badge>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Getting started with your subscription is easy.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Choose Your Device", description: "Select your EnviroBiotics device and add the refill subscription at checkout." },
              { step: "2", title: "Enjoy Automatic Refills", description: "We'll send fresh cartridges right when you need them, with free shipping." },
              { step: "3", title: "Relax with Lifetime Coverage", description: "Your device is protected for life as long as you're a subscriber." }
            ].map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.15}>
                <div className="relative text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <span className="font-display font-bold text-2xl text-primary">{item.step}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Products Section */}
      <section id="subscription-products" className="py-20 sm:py-28 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Badge className="bg-primary text-primary-foreground mb-4">
                <RefreshCw className="w-3 h-3 mr-1" />
                Subscribe & Save
              </Badge>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
                Choose Your Subscription
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Get free shipping on every delivery and unlock lifetime warranty on your device.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {getSubscriptions().filter(p => !p.name.toLowerCase().includes('e-biotic pro')).map((product) => (
              <StaggerItem key={product.id}>
                <StripeProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Subscription Benefits Reminder */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6 mt-12 p-6 rounded-2xl bg-card border border-primary/20 max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Lifetime Warranty</div>
                  <div className="text-xs text-muted-foreground">For subscribers only</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Never Run Out</div>
                  <div className="text-xs text-muted-foreground">Automatic deliveries</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Free Shipping</div>
                  <div className="text-xs text-muted-foreground">On all subscription orders</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-muted/30 to-background">
        <div className="container px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4">Happy Subscribers</Badge>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
                What Our Members Say
              </h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} delay={index * 0.1}>
                <div className="bg-card rounded-2xl border border-border p-8 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-28">
        <div className="container px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4">FAQ</Badge>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
                Common Questions
              </h2>
            </div>
          </ScrollReveal>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq.question} delay={index * 0.05}>
                <details className="group bg-card rounded-xl border border-border overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-foreground hover:text-primary transition-colors">
                    {faq.question}
                    <ChevronIcon />
                  </summary>
                  <div className="px-6 pb-6 text-muted-foreground">
                    {faq.answer}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10">
        <div className="container px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
                <Leaf className="w-5 h-5" />
                <span className="font-medium">Join Thousands of Happy Subscribers</span>
              </div>
              
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
                Start Protecting Your Space Today
              </h2>
              
              <p className="text-lg text-muted-foreground mb-10">
                Get lifetime warranty, save on every refill, and enjoy the convenience of automatic deliveries. 
                Cancel anytime with no obligations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" className="group" asChild>
                  <Link to="/shop">
                    Subscribe & Save Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/support">Have Questions? Contact Us</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg 
      className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform duration-200" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
