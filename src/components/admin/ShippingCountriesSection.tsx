import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Globe, Plus, Pencil, Trash2, Loader2, DollarSign } from "lucide-react";

interface ShippingCountry {
  id: string;
  country_name: string;
  country_code: string;
  shipping_rate: number;
  free_shipping_threshold: number | null;
  is_active: boolean;
  created_at: string;
}

export function ShippingCountriesSection() {
  const [countries, setCountries] = useState<ShippingCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ShippingCountry | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [shippingRate, setShippingRate] = useState("");
  const [freeThreshold, setFreeThreshold] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("shipping_countries")
        .select("*")
        .order("country_name");

      if (error) throw error;
      setCountries((data as unknown as ShippingCountry[]) || []);
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Failed to fetch shipping countries");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setCountryName("");
    setCountryCode("");
    setShippingRate("");
    setFreeThreshold("200");
    setIsActive(true);
    setDialogOpen(true);
  };

  const openEdit = (country: ShippingCountry) => {
    setEditing(country);
    setCountryName(country.country_name);
    setCountryCode(country.country_code);
    setShippingRate(String(country.shipping_rate));
    setFreeThreshold(country.free_shipping_threshold ? String(country.free_shipping_threshold) : "");
    setIsActive(country.is_active);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!countryName || !countryCode || !shippingRate) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        country_name: countryName.trim(),
        country_code: countryCode.trim().toUpperCase(),
        shipping_rate: parseFloat(shippingRate),
        free_shipping_threshold: freeThreshold ? parseFloat(freeThreshold) : null,
        is_active: isActive,
      };

      if (editing) {
        const { error } = await supabase
          .from("shipping_countries")
          .update(payload as any)
          .eq("id", editing.id);
        if (error) throw error;
        toast.success("Country updated");
      } else {
        const { error } = await supabase
          .from("shipping_countries")
          .insert(payload as any);
        if (error) throw error;
        toast.success("Country added");
      }

      setDialogOpen(false);
      fetchCountries();
    } catch (error: any) {
      console.error("Error saving country:", error);
      toast.error(error.message || "Failed to save country");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (country: ShippingCountry) => {
    if (!confirm(`Delete ${country.country_name}?`)) return;

    try {
      const { error } = await supabase
        .from("shipping_countries")
        .delete()
        .eq("id", country.id);
      if (error) throw error;
      toast.success("Country deleted");
      fetchCountries();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete country");
    }
  };

  const toggleActive = async (country: ShippingCountry) => {
    try {
      const { error } = await supabase
        .from("shipping_countries")
        .update({ is_active: !country.is_active } as any)
        .eq("id", country.id);
      if (error) throw error;
      fetchCountries();
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {countries.filter(c => c.is_active).length} active countries
        </p>
        <Button onClick={openAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Country
        </Button>
      </div>

      <div className="space-y-3">
        {countries.map((country) => (
          <div
            key={country.id}
            className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
              country.is_active ? "bg-card border-border" : "bg-muted/50 border-border/50 opacity-60"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {country.country_code}
              </div>
              <div>
                <p className="font-medium">{country.country_name}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {formatCurrency(country.shipping_rate)}
                  </span>
                  {country.free_shipping_threshold && (
                    <span>Free over {formatCurrency(country.free_shipping_threshold)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={country.is_active}
                onCheckedChange={() => toggleActive(country)}
              />
              <Button variant="ghost" size="icon" onClick={() => openEdit(country)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(country)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}

        {countries.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No shipping countries configured</p>
            <Button onClick={openAdd} variant="outline" className="mt-4">
              Add Your First Country
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Country" : "Add Shipping Country"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label>Country Name *</Label>
                <Input
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
                  placeholder="United States"
                />
              </div>
              <div>
                <Label>Code *</Label>
                <Input
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
                  placeholder="US"
                  maxLength={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Shipping Rate ($) *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={shippingRate}
                  onChange={(e) => setShippingRate(e.target.value)}
                  placeholder="8.95"
                />
              </div>
              <div>
                <Label>Free Shipping Threshold ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={freeThreshold}
                  onChange={(e) => setFreeThreshold(e.target.value)}
                  placeholder="200"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={isActive} onCheckedChange={setIsActive} />
              <Label>Active: available for checkout</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editing ? "Update" : "Add Country"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
