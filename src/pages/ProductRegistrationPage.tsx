import { useState, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2,
  Loader2,
  Package,
  LogIn
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@/lib/link";
import type { User } from "@supabase/supabase-js";
import { LifestyleHero } from "@/components/LifestyleHero";
import heroRegistrationLifestyle from "@/assets/hero-registration-lifestyle.jpg";

const products = [
  { value: "biologic-mini", label: "BioLogic Mini" },
  { value: "biotica-800", label: "Biotica 800" },
  { value: "ba-2080", label: "BA 2080" },
  { value: "ba-2080-combo", label: "BA 2080 Combo Kit" },
  { value: "e-biotic-pro", label: "E-Biotic Pro (HVAC)" },
];

const warrantyBenefits = [
  "1-Year Limited Warranty Coverage",
  "Priority Customer Support",
  "Product Update Notifications",
  "Exclusive Offers & Promotions",
  "Easy Replacement Process",
];

const ProductRegistrationPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    productName: "",
    serialNumber: "",
    purchaseDate: "",
    purchaseLocation: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    newsletterOptIn: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setIsLoadingAuth(false);
      
      // Pre-fill email from user account
      if (session?.user?.email) {
        setFormData(prev => ({ ...prev, email: session.user.email || prev.email }));
      }
    });

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoadingAuth(false);
      if (session?.user?.email) {
        setFormData(prev => ({ ...prev, email: session.user.email || prev.email }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register your product.",
        variant: "destructive",
      });
      navigate({ to: "/auth?redirect=/product-registration" });
      return;
    }

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.productName) {
      toast({
        title: "Error",
        description: "Please select a product.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.purchaseDate) {
      toast({
        title: "Error",
        description: "Please enter the purchase date.",
        variant: "destructive",
      });
      return;
    }

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
      const { error } = await supabase
        .from("product_registrations")
        .insert({
          user_id: user.id,
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || null,
          product_name: formData.productName,
          serial_number: formData.serialNumber.trim() || null,
          purchase_date: formData.purchaseDate,
          purchase_location: formData.purchaseLocation.trim() || null,
          address_line1: formData.addressLine1.trim() || null,
          address_line2: formData.addressLine2.trim() || null,
          city: formData.city.trim() || null,
          state: formData.state.trim() || null,
          zip_code: formData.zipCode.trim() || null,
          country: formData.country,
          newsletter_opt_in: formData.newsletterOptIn,
        });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Registration Complete!",
        description: "Your product has been registered successfully.",
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "Failed to register product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Registration Complete!
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Thank you for registering your EnviroBiotics product. Your warranty is now active and we've sent a confirmation to your email.
                </p>
                <div className="p-6 rounded-2xl bg-muted/50 border border-border/50 mb-8">
                  <h3 className="font-semibold mb-4">What's Next?</h3>
                  <ul className="space-y-3 text-left text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Check your email for your warranty confirmation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Visit our support page for setup guides and videos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Enjoy cleaner, healthier air with your new device</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" asChild>
                    <Link to="/support">
                      View Support Resources
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/shop">
                      Shop Refills & Accessories
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show loading state while checking auth
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container">
            <ScrollReveal>
              <div className="max-w-lg mx-auto text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <LogIn className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Sign In Required
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Please sign in or create an account to register your product and activate your warranty.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" asChild>
                    <Link to="/auth?redirect=/product-registration">
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/">
                      Return Home
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Register Your Product | EnviroBiotics Warranty"
        description="Register your EnviroBiotics device to activate your warranty and get priority support, product updates, and exclusive offers."
        path="/register"
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <LifestyleHero
          image={heroRegistrationLifestyle}
          imageAlt="Hands unboxing a minimal cream device on a Scandinavian dining table"
          eyebrow="Product Registration"
          title={<>Welcome <span className="text-primary">to fresher space</span></>}
          subcopy="Register your device to activate the warranty and unlock priority support, product updates, and exclusive benefits."
          ctaLabel="Register Now"
          ctaHref="#registration-form"
        />

        {/* Benefits & Form Section */}
        <section id="registration-form" className="section-padding bg-muted/30 scroll-mt-24">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Benefits Sidebar */}
              <div className="lg:col-span-1">
                <ScrollReveal>
                  <div className="sticky top-32">
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-display font-bold mb-4">
                        Warranty Benefits
                      </h3>
                      <ul className="space-y-3">
                        {warrantyBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Registration Form */}
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass-card">
                    <h2 className="text-2xl font-display font-bold mb-6">
                      Product Information
                    </h2>
                    
                    {/* Product Selection */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Product <span className="text-destructive">*</span>
                        </label>
                        <Select
                          value={formData.productName}
                          onValueChange={(value) => setFormData({ ...formData, productName: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.value} value={product.value}>
                                {product.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Serial Number
                        </label>
                        <Input
                          value={formData.serialNumber}
                          onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                          placeholder="Found on device label"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Purchase Date <span className="text-destructive">*</span>
                        </label>
                        <Input
                          type="date"
                          value={formData.purchaseDate}
                          onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Where did you purchase?
                        </label>
                        <Input
                          value={formData.purchaseLocation}
                          onChange={(e) => setFormData({ ...formData, purchaseLocation: e.target.value })}
                          placeholder="e.g., Amazon, EnviroBiotics.com"
                        />
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-6 mb-6">
                      <h2 className="text-2xl font-display font-bold mb-6">
                        Your Information
                      </h2>
                    </div>

                    {/* Personal Information */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email <span className="text-destructive">*</span>
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Address Line 1
                      </label>
                      <Input
                        value={formData.addressLine1}
                        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Address Line 2
                      </label>
                      <Input
                        value={formData.addressLine2}
                        onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                        placeholder="Apt 4B"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          City
                        </label>
                        <Input
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          State
                        </label>
                        <Input
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          placeholder="NY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          ZIP Code
                        </label>
                        <Input
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          placeholder="10001"
                        />
                      </div>
                    </div>

                    {/* Newsletter Opt-in */}
                    <div className="flex items-start gap-3 mb-8 p-4 rounded-xl bg-muted/50">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletterOptIn}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, newsletterOptIn: checked as boolean })
                        }
                      />
                      <div>
                        <label htmlFor="newsletter" className="text-sm font-medium cursor-pointer">
                          Subscribe to our newsletter
                        </label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Get tips on indoor wellness, exclusive offers, and product updates. Unsubscribe anytime.
                        </p>
                      </div>
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Registering...
                        </>
                      ) : (
                        <>
                          Register Product
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      By registering, you agree to our{" "}
                      <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                      {" "}and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                    </p>
                  </form>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductRegistrationPage;
