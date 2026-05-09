import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2 } from "lucide-react";

const PRODUCT_OPTIONS = [
  "BioLogic Mini",
  "Biotica 800",
  "BA 2080",
  "E-Biotic Pro",
  "Other",
];

function ProductRegistrationPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [productName, setProductName] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      first_name: String(data.get("first_name") || "").trim(),
      last_name: String(data.get("last_name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim() || null,
      product_name: productName,
      serial_number: String(data.get("serial_number") || "").trim() || null,
      purchase_date: String(data.get("purchase_date") || ""),
      purchase_location: String(data.get("purchase_location") || "").trim() || null,
      address_line1: String(data.get("address_line1") || "").trim() || null,
      address_line2: String(data.get("address_line2") || "").trim() || null,
      city: String(data.get("city") || "").trim() || null,
      state: String(data.get("state") || "").trim() || null,
      zip_code: String(data.get("zip_code") || "").trim() || null,
      country: String(data.get("country") || "United States").trim(),
      newsletter_opt_in: newsletter,
    };

    if (!payload.first_name || !payload.last_name || !payload.email || !payload.product_name || !payload.purchase_date) {
      toast({ title: "Missing information", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("product_registrations").insert(payload);
    setSubmitting(false);

    if (error) {
      toast({ title: "Registration failed", description: error.message, variant: "destructive" });
      return;
    }

    setSubmitted(true);
    form.reset();
    setProductName("");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Product Registration — EnviroBiotics"
        description="Register your EnviroBiotics product to activate your warranty and get support."
        path="/product-registration"
      />
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <header className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Warranty</p>
          <h1 className="mt-2 text-4xl font-display font-bold text-foreground">Register your product</h1>
          <p className="mt-3 text-muted-foreground">
            Activate your warranty, unlock support, and get tips tailored to your device.
          </p>
        </header>

        {submitted ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-2xl font-display font-semibold text-foreground">You're registered!</h2>
            <p className="mt-2 text-muted-foreground">
              Thanks — we've recorded your registration. You'll receive a confirmation by email shortly.
            </p>
            <Button className="mt-6" onClick={() => setSubmitted(false)} variant="outline">
              Register another product
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Your information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First name *</Label>
                  <Input id="first_name" name="first_name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last name *</Label>
                  <Input id="last_name" name="last_name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Product details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="product_name">Product *</Label>
                  <Select value={productName} onValueChange={setProductName} required>
                    <SelectTrigger id="product_name">
                      <SelectValue placeholder="Select your product" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_OPTIONS.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serial_number">Serial number</Label>
                  <Input id="serial_number" name="serial_number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchase_date">Purchase date *</Label>
                  <Input id="purchase_date" name="purchase_date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchase_location">Where did you purchase?</Label>
                  <Input id="purchase_location" name="purchase_location" placeholder="e.g. envirobiotics.com" />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Shipping address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address_line1">Address</Label>
                  <Input id="address_line1" name="address_line1" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address_line2">Address line 2</Label>
                  <Input id="address_line2" name="address_line2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Region</Label>
                  <Input id="state" name="state" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip_code">ZIP / Postal code</Label>
                  <Input id="zip_code" name="zip_code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" defaultValue="United States" />
                </div>
              </div>
            </section>

            <div className="flex items-start gap-3">
              <Checkbox
                id="newsletter"
                checked={newsletter}
                onCheckedChange={(v) => setNewsletter(v === true)}
              />
              <Label htmlFor="newsletter" className="text-sm font-normal text-muted-foreground leading-snug">
                Send me product tips, care reminders, and occasional offers.
              </Label>
            </div>

            <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? "Registering…" : "Register product"}
            </Button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/product-registration")({
  component: ProductRegistrationPage,
});
