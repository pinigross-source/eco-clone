import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import refillImageAsset from "@/assets/shop/ebiotic-pro-5ml-refill.avif.asset.json";
const refillImage = refillImageAsset.url;

export const Route = createFileRoute("/ebiotic-pro-refill")({
  head: () => ({
    meta: [
      { title: "E-Biotic Pro Probiotic Refill Bottles | EnviroBiotics" },
      {
        name: "description",
        content:
          "To order E-Biotic Pro Probiotic Refill Bottles, contact your authorized selling dealer. Provide your serial number and we will have your dealer contact you directly.",
      },
      { property: "og:title", content: "E-Biotic Pro Probiotic Refill Bottles | EnviroBiotics" },
      {
        property: "og:description",
        content:
          "To order E-Biotic Pro Probiotic Refill Bottles, contact your authorized selling dealer. Provide your serial number and we will have your dealer contact you directly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EbioticProRefillPage,
});

function EbioticProRefillPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "", serialNumber: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.serialNumber) {
      toast.error("Please fill out all fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/public/refill-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="E-Biotic Pro Probiotic Refill Bottles | EnviroBiotics"
        description="To order E-Biotic Pro Probiotic Refill Bottles, contact your authorized selling dealer. Provide your serial number and we will have your dealer contact you directly."
        path="/ebiotic-pro-refill"
      />
      <Navbar />

      <main className="min-h-screen bg-background">
        <section className="gradient-hero pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="container max-w-5xl px-4">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="flex justify-center">
                <img
                  src={refillImage}
                  alt="E-Biotic Pro 500ml Probiotic Refill Bottle"
                  className="w-full max-w-xs rounded-xl shadow-lg"
                  loading="eager"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
                  E-Biotic Pro
                </p>
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4 tracking-tight">
                  Probiotic Refill Bottles
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  To order Probiotic Refill Bottles, please contact your authorized selling dealer.
                  If you do not have their contact information, please provide your E-Biotic Pro
                  serial number, along with your name and address, and we will have your authorized
                  selling dealer contact you directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container max-w-2xl px-4 py-12 sm:py-16">
          <div className="bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-primary" />
                <h2 className="text-xl font-display font-bold text-foreground">Request Received</h2>
                <p className="text-muted-foreground">
                  Thank you. Your authorized selling dealer will contact you directly to complete
                  your refill order.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-display font-bold text-foreground mb-2">
                  Request Refill Bottles
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill out the form below and your authorized selling dealer will reach out to you.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="rr-name">Name</Label>
                      <Input
                        id="rr-name"
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="rr-email">Email</Label>
                      <Input
                        id="rr-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="rr-address">Address</Label>
                    <Textarea
                      id="rr-address"
                      value={form.address}
                      onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                      placeholder="Street, city, state, ZIP"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="rr-serial">E-Biotic Pro Serial Number</Label>
                    <Input
                      id="rr-serial"
                      value={form.serialNumber}
                      onChange={(e) => setForm((p) => ({ ...p, serialNumber: e.target.value }))}
                      placeholder="Found on your E-Biotic Pro unit"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" /> Submit Request
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
