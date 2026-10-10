import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { businessQuoteSchema, businessSpaceTypes, type BusinessQuoteData } from "@/lib/businessQuote";

export function BusinessQuoteForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<z.input<typeof businessQuoteSchema>, unknown, BusinessQuoteData>({ resolver: zodResolver(businessQuoteSchema), defaultValues: { source: "business", company: "", phone: "", area: "", needs: "", spaceType: "" } });
  async function submit(data: BusinessQuoteData) {
    setError("");
    try {
      const res = await fetch("/api/public/installation-quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(businessQuoteSchema.parse(data)) });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || "Your request could not be sent. Please try again or call us.");
      setSuccess(true);
    } catch (err) { setError(err instanceof Error ? err.message : "Your request could not be sent. Please try again or call us."); }
  }
  if (success) return <div role="status" className="py-12"><CheckCircle2 className="mb-5 h-10 w-10 text-primary" /><h3 className="font-display text-3xl mb-3">Request received.</h3><p className="text-background/75 leading-relaxed">Thank you. We'll come back within one business day with a plan and a quote, or connect you with your local dealer.</p></div>;
  const fields = [{ name: "name", label: "Full name*", max: 100, auto: "name" }, { name: "company", label: "Company", max: 150, auto: "organization" }, { name: "email", label: "Work email*", max: 255, auto: "email" }, { name: "phone", label: "Phone", max: 30, auto: "tel" }] as const;
  return <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
    <div className="grid sm:grid-cols-2 gap-5">{fields.map(field => <div key={field.name} className="space-y-2 min-w-0"><Label htmlFor={`business-${field.name}`}>{field.label}</Label><Input id={`business-${field.name}`} type={field.name === "email" ? "email" : field.name === "phone" ? "tel" : "text"} autoComplete={field.auto} maxLength={field.max} required={field.name === "name" || field.name === "email"} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `business-${field.name}-error` : undefined} {...register(field.name)} className="h-12 bg-background text-foreground border-background/20" />{errors[field.name] && <p id={`business-${field.name}-error`} className="text-sm text-primary" role="alert">{errors[field.name]?.message}</p>}</div>)}</div>
    <div className="space-y-2"><Label htmlFor="business-space">Type of space</Label><Select onValueChange={value => setValue("spaceType", businessQuoteSchema.shape.spaceType.parse(value), { shouldValidate: true })}><SelectTrigger id="business-space" className="w-full h-12 bg-background text-foreground"><SelectValue placeholder="Select type of space" /></SelectTrigger><SelectContent>{businessSpaceTypes.map(value => <SelectItem value={value} key={value}>{value}</SelectItem>)}</SelectContent></Select></div>
    <div className="space-y-2"><Label htmlFor="business-area">Approx. area or rooms</Label><Input id="business-area" maxLength={100} {...register("area")} className="h-12 bg-background text-foreground" />{errors.area && <p role="alert" className="text-primary text-sm">{errors.area.message}</p>}</div>
    <div className="space-y-2"><Label htmlFor="business-needs">What do you need?</Label><Textarea id="business-needs" maxLength={1000} rows={4} {...register("needs")} className="bg-background text-foreground" />{errors.needs && <p role="alert" className="text-primary text-sm">{errors.needs.message}</p>}</div>
    {error && <p role="alert" className="border border-primary/50 rounded-lg p-4 text-background">{error}</p>}
    <Button variant="hero" size="lg" type="submit" disabled={isSubmitting} className="w-full sm:w-auto tracking-normal">{isSubmitting ? <><Loader2 className="animate-spin" />Sending…</> : <>Send request<ArrowRight /></>}</Button>
  </form>;
}
