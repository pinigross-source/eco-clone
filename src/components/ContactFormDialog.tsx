import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactFormDialog = ({ open, onOpenChange }: ContactFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill out all fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_inquiries").insert({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      if (error) throw error;

      // Try sending notification email
      try {
        await supabase.functions.invoke("send-contact-email", {
          body: { name: form.name, email: form.email, subject: form.subject, message: form.message },
        });
      } catch {}

      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setSubmitted(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{submitted ? "Message Sent!" : "Contact Our Team"}</DialogTitle>
          <DialogDescription>
            {submitted
              ? "We'll get back to you as soon as possible."
              : "Fill out the form below and our team will reach out to you."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <CheckCircle2 className="w-12 h-12 text-primary" />
            <p className="text-muted-foreground text-center">Thank you for reaching out. We typically respond within 24 hours.</p>
            <Button onClick={() => handleClose(false)}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="cf-name">Name</Label>
                <Input id="cf-name" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cf-email">Email</Label>
                <Input id="cf-email" type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cf-subject">Subject</Label>
              <Input id="cf-subject" value={form.subject} onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="How can we help?" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cf-message">Message</Label>
              <Textarea id="cf-message" value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your needs..." rows={4} required />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</> : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
