import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Phone, Mail, User, MapPin, Home, MessageSquare, Loader2, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const quoteFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20, "Phone number is too long"),
  zipCode: z.string().trim().min(5, "Please enter a valid ZIP code").max(10, "ZIP code is too long"),
  hvacType: z.string().min(1, "Please select your HVAC type"),
  homeSize: z.string().min(1, "Please select your home size"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface InstallationQuoteFormProps {
  productName: string;
  trigger?: React.ReactNode;
}

const RECAPTCHA_SITE_KEY = "6LdFf2QsAAAAADxCvgV9IGrHVGs9CoF50_ksSjXu";

const InstallationQuoteFormInner = ({ productName, trigger }: InstallationQuoteFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    try {
      let recaptchaToken = "";
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha("installation_quote");
        } catch (recaptchaError) {
          console.warn("reCAPTCHA failed, proceeding without token:", recaptchaError);
        }
      }

      const message = `
Phone: ${data.phone}
ZIP Code: ${data.zipCode}
HVAC Type: ${data.hvacType}
Home Size: ${data.homeSize}

Additional Message:
${data.message || "No additional message provided."}
      `.trim();

      const { data: response, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          subject: `Installation Quote Request - ${productName}`,
          message,
          recaptchaToken,
        },
      });

      if (error) throw error;
      if (response && !response.success) throw new Error(response.error || "Submission failed");

      setIsSuccess(true);
      toast.success("Quote request submitted! We'll contact you within 24 hours.");
      
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
        reset();
      }, 2000);
    } catch (error: any) {
      const msg = error?.message || "Failed to submit request. Please try again.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="hero-outline" size="lg" className="gap-2">
            <Calendar className="h-5 w-5" />
            Request Installation Quote
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground">
              Our team will contact you within 24 hours to schedule your consultation.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display">Request Installation Quote</DialogTitle>
              <DialogDescription>
                Fill out the form below and our HVAC specialists will contact you within 24 hours to schedule a free consultation.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...register("firstName")}
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-destructive">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    {...register("lastName")}
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    {...register("phone")}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    ZIP Code
                  </Label>
                  <Input
                    id="zipCode"
                    placeholder="12345"
                    {...register("zipCode")}
                    className={errors.zipCode ? "border-destructive" : ""}
                  />
                  {errors.zipCode && (
                    <p className="text-xs text-destructive">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hvacType" className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    HVAC Type
                  </Label>
                  <Select onValueChange={(value) => setValue("hvacType", value)}>
                    <SelectTrigger className={errors.hvacType ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="central-gas">Central Gas</SelectItem>
                      <SelectItem value="central-electric">Central Electric</SelectItem>
                      <SelectItem value="heat-pump">Heat Pump</SelectItem>
                      <SelectItem value="mini-split">Mini-Split</SelectItem>
                      <SelectItem value="other">Other / Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.hvacType && (
                    <p className="text-xs text-destructive">{errors.hvacType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="homeSize">Home Size</Label>
                  <Select onValueChange={(value) => setValue("homeSize", value)}>
                    <SelectTrigger className={errors.homeSize ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1500">Under 1,500 sq ft</SelectItem>
                      <SelectItem value="1500-2500">1,500 - 2,500 sq ft</SelectItem>
                      <SelectItem value="2500-4000">2,500 - 4,000 sq ft</SelectItem>
                      <SelectItem value="over-4000">Over 4,000 sq ft</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.homeSize && (
                    <p className="text-xs text-destructive">{errors.homeSize.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  Additional Information (Optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your home, any concerns, or questions you have..."
                  rows={3}
                  {...register("message")}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Request Free Consultation
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to our{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                We'll never share your information.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export const InstallationQuoteForm = (props: InstallationQuoteFormProps) => (
  <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
    <InstallationQuoteFormInner {...props} />
  </GoogleReCaptchaProvider>
);
