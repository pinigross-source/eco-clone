import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { z } from "zod";
import {
  Users,
  TrendingUp,
  DollarSign,
  Link2,
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from "lucide-react";

const affiliateSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  websiteUrl: z.string().trim().url("Invalid URL").max(500).or(z.literal("")),
  referralCode: z
    .string()
    .trim()
    .min(3, "Code must be at least 3 characters")
    .max(30, "Code must be under 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, hyphens, underscores"),
  message: z.string().trim().max(1000).optional(),
});

function AffiliateSignupPageInner() {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    websiteUrl: "",
    referralCode: "",
    message: "",
  });

  const generateCode = () => {
    const code =
      formData.firstName.toLowerCase().replace(/[^a-z0-9]/g, "") +
      formData.lastName.charAt(0).toLowerCase() +
      Math.floor(Math.random() * 100);
    setFormData((prev) => ({ ...prev, referralCode: code }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = affiliateSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      let recaptchaToken = "";
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha("affiliate_signup");
        } catch (recaptchaError) {
          console.warn("reCAPTCHA failed, proceeding without token:", recaptchaError);
        }
      }

      // Verify recaptcha server-side
      const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: {
            recaptchaToken,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            subject: "New Affiliate Application",
            message: `Affiliate application from ${formData.firstName} ${formData.lastName} (${formData.email}). Referral code: ${formData.referralCode}. Website: ${formData.websiteUrl || "N/A"}. Message: ${formData.message || "N/A"}`,
          },
        }
      );

      // Even if email sending fails, still try to insert
      // Insert affiliate record
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      const { error: insertError } = await supabase.from("affiliates").insert({
        first_name: result.data.firstName,
        last_name: result.data.lastName,
        email: result.data.email.toLowerCase(),
        referral_code: result.data.referralCode.toLowerCase(),
        website_url: result.data.websiteUrl || null,
        notes: result.data.message || null,
        status: "pending",
        commission_rate: 10,
        payment_method: "bank_transfer",
        user_id: currentSession?.user?.id || null,
      });

      if (insertError) {
        if (insertError.message?.includes("affiliates_referral_code_key")) {
          setErrors({ referralCode: "This referral code is already taken. Choose another." });
          return;
        }
        if (insertError.message?.includes("affiliates_email_key")) {
          setErrors({ email: "An application with this email already exists." });
          return;
        }
        throw insertError;
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container max-w-lg mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-display font-bold text-3xl mb-3">Application Submitted!</h1>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                We'll review your application and get back to you within 1 to 2 business days.
                Once approved, you'll receive access to your affiliate dashboard.
              </p>
              <Button onClick={() => navigate("/")}>Back to Home</Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Affiliate Program – Earn Commissions Promoting Clean Air Surfaces and Objects"
        description="Join the EnviroBiotics affiliate program and earn 10% commission promoting probiotic solutions for clean air, surfaces, and objects. Get your unique referral link today."
        path="/affiliate/join"
      />
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Hero */}
            <div className="text-center mb-12">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                Affiliate Program
              </Badge>
              <h1 className="font-display font-bold text-3xl sm:text-4xl mb-4">
                Earn Commissions Promoting Clean Air Surfaces and Objects
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Join our affiliate program and earn 10% commission on every sale you refer.
                Share your unique link, and we'll handle the rest.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Benefits */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="font-display font-semibold text-xl mb-4">Why Join?</h2>
                {[
                  {
                    icon: DollarSign,
                    title: "10% Commission",
                    desc: "Earn on every sale from your referrals, no caps, no limits.",
                  },
                  {
                    icon: Link2,
                    title: "Unique Referral Link",
                    desc: "Get your own trackable link with 30-day cookie attribution.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Real-Time Dashboard",
                    desc: "Track clicks, conversions, and earnings in your affiliate dashboard.",
                  },
                  {
                    icon: Users,
                    title: "Dedicated Support",
                    desc: "Get marketing materials and support from our team.",
                  },
                ].map((benefit) => (
                  <div key={benefit.title} className="flex gap-3 p-4 rounded-xl bg-card border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{benefit.title}</h3>
                      <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
                  <h2 className="font-display font-semibold text-xl mb-6">Apply Now</h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="Jane"
                          value={formData.firstName}
                          onChange={(e) => updateField("firstName", e.target.value)}
                          className={errors.firstName ? "border-destructive" : ""}
                        />
                        {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => updateField("lastName", e.target.value)}
                          className={errors.lastName ? "border-destructive" : ""}
                        />
                        {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="websiteUrl">Website / Social Media URL</Label>
                      <Input
                        id="websiteUrl"
                        type="url"
                        placeholder="https://yoursite.com"
                        value={formData.websiteUrl}
                        onChange={(e) => updateField("websiteUrl", e.target.value)}
                        className={errors.websiteUrl ? "border-destructive" : ""}
                      />
                      {errors.websiteUrl && <p className="text-xs text-destructive">{errors.websiteUrl}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="referralCode">Preferred Referral Code *</Label>
                      <div className="flex gap-2">
                        <Input
                          id="referralCode"
                          placeholder="janedoe"
                          value={formData.referralCode}
                          onChange={(e) => updateField("referralCode", e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                          className={errors.referralCode ? "border-destructive flex-1" : "flex-1"}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={generateCode}
                          disabled={!formData.firstName}
                        >
                          Generate
                        </Button>
                      </div>
                      {errors.referralCode && <p className="text-xs text-destructive">{errors.referralCode}</p>}
                      <p className="text-xs text-muted-foreground">
                        Your link will be: {window.location.origin}/?ref=
                        {formData.referralCode || "yourcode"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Tell us about yourself (optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="How do you plan to promote our products?"
                        value={formData.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By applying, you agree to our affiliate terms. Applications are typically reviewed within 1 to 2 business days.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const RECAPTCHA_SITE_KEY = "6LdFf2QsAAAAADxCvgV9IGrHVGs9CoF50_ksSjXu";
export default function AffiliateSignupPage() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <AffiliateSignupPageInner />
    </GoogleReCaptchaProvider>
  );
}
