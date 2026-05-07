import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Copy,
  Search,
  Tag,
  RefreshCw,
  Calendar,
  Hash,
} from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: "percentage" | "fixed_amount";
  discount_value: number;
  min_order_amount: number;
  max_uses: number | null;
  current_uses: number;
  is_active: boolean;
  starts_at: string | null;
  expires_at: string | null;
  applicable_products: string[];
  stripe_coupon_id: string | null;
  stripe_promo_id: string | null;
  created_at: string;
  updated_at: string;
}

interface CouponFormData {
  code: string;
  description: string;
  discount_type: "percentage" | "fixed_amount";
  discount_value: string;
  min_order_amount: string;
  max_uses: string;
  is_active: boolean;
  starts_at: string;
  expires_at: string;
  stripe_coupon_id: string;
  stripe_promo_id: string;
}

const emptyForm: CouponFormData = {
  code: "",
  description: "",
  discount_type: "percentage",
  discount_value: "",
  min_order_amount: "0",
  max_uses: "",
  is_active: true,
  starts_at: "",
  expires_at: "",
  stripe_coupon_id: "",
  stripe_promo_id: "",
};

interface CouponManagementSectionProps {
  isAdmin: boolean;
}

export function CouponManagementSection({ isAdmin }: CouponManagementSectionProps) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState<CouponFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCoupons((data as unknown as Coupon[]) || []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      toast.error("Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingCoupon(null);
    setFormData(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description || "",
      discount_type: coupon.discount_type,
      discount_value: String(coupon.discount_value),
      min_order_amount: String(coupon.min_order_amount || 0),
      max_uses: coupon.max_uses ? String(coupon.max_uses) : "",
      is_active: coupon.is_active,
      starts_at: coupon.starts_at ? coupon.starts_at.slice(0, 16) : "",
      expires_at: coupon.expires_at ? coupon.expires_at.slice(0, 16) : "",
      stripe_coupon_id: coupon.stripe_coupon_id || "",
      stripe_promo_id: coupon.stripe_promo_id || "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.code.trim()) {
      toast.error("Coupon code is required");
      return;
    }
    if (!formData.discount_value || Number(formData.discount_value) <= 0) {
      toast.error("Discount value must be greater than 0");
      return;
    }
    if (formData.discount_type === "percentage" && Number(formData.discount_value) > 100) {
      toast.error("Percentage discount cannot exceed 100%");
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const payload = {
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim() || null,
        discount_type: formData.discount_type,
        discount_value: Number(formData.discount_value),
        min_order_amount: Number(formData.min_order_amount) || 0,
        max_uses: formData.max_uses ? Number(formData.max_uses) : null,
        is_active: formData.is_active,
        starts_at: formData.starts_at ? new Date(formData.starts_at).toISOString() : null,
        expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
        stripe_coupon_id: formData.stripe_coupon_id.trim() || null,
        stripe_promo_id: formData.stripe_promo_id.trim() || null,
      };

      if (editingCoupon) {
        const { error } = await supabase
          .from("coupons")
          .update(payload as any)
          .eq("id", editingCoupon.id);
        if (error) throw error;
        toast.success("Coupon updated successfully");
      } else {
        const { error } = await supabase
          .from("coupons")
          .insert({ ...payload, created_by: user?.id } as any);
        if (error) throw error;
        toast.success("Coupon created successfully");
      }

      setDialogOpen(false);
      fetchCoupons();
    } catch (error: any) {
      console.error("Error saving coupon:", error);
      if (error.message?.includes("duplicate") || error.code === "23505") {
        toast.error("A coupon with this code already exists");
      } else {
        toast.error(error.message || "Failed to save coupon");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!couponToDelete) return;
    try {
      const { error } = await supabase
        .from("coupons")
        .delete()
        .eq("id", couponToDelete.id);
      if (error) throw error;
      toast.success("Coupon deleted");
      setDeleteDialogOpen(false);
      setCouponToDelete(null);
      fetchCoupons();
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("Failed to delete coupon");
    }
  };

  const toggleActive = async (coupon: Coupon) => {
    try {
      const { error } = await supabase
        .from("coupons")
        .update({ is_active: !coupon.is_active } as any)
        .eq("id", coupon.id);
      if (error) throw error;
      toast.success(`Coupon ${!coupon.is_active ? "activated" : "deactivated"}`);
      fetchCoupons();
    } catch (error) {
      console.error("Error toggling coupon:", error);
      toast.error("Failed to update coupon");
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied "${code}" to clipboard`);
  };

  const filteredCoupons = coupons.filter(c =>
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDiscount = (coupon: Coupon) => {
    if (coupon.discount_type === "percentage") {
      return `${coupon.discount_value}%`;
    }
    return `$${Number(coupon.discount_value).toFixed(2)}`;
  };

  const getCouponStatus = (coupon: Coupon) => {
    if (!coupon.is_active) return { label: "Inactive", color: "bg-muted text-muted-foreground" };
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return { label: "Expired", color: "bg-red-500/10 text-red-600 border-red-500/20" };
    }
    if (coupon.starts_at && new Date(coupon.starts_at) > new Date()) {
      return { label: "Scheduled", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" };
    }
    if (coupon.max_uses && coupon.current_uses >= coupon.max_uses) {
      return { label: "Used Up", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" };
    }
    return { label: "Active", color: "bg-green-500/10 text-green-600 border-green-500/20" };
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search coupons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={fetchCoupons} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Create Coupon
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold">{coupons.length}</p>
        </div>
        <div className="p-4 rounded-xl border">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {coupons.filter(c => c.is_active && (!c.expires_at || new Date(c.expires_at) > new Date())).length}
          </p>
        </div>
        <div className="p-4 rounded-xl border">
          <p className="text-sm text-muted-foreground">Expired</p>
          <p className="text-2xl font-bold text-red-600">
            {coupons.filter(c => c.expires_at && new Date(c.expires_at) < new Date()).length}
          </p>
        </div>
        <div className="p-4 rounded-xl border">
          <p className="text-sm text-muted-foreground">Total Uses</p>
          <p className="text-2xl font-bold">
            {coupons.reduce((sum, c) => sum + c.current_uses, 0)}
          </p>
        </div>
      </div>

      {/* Coupon List */}
      {filteredCoupons.length === 0 ? (
        <div className="text-center py-12">
          <Tag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {searchQuery ? "No coupons match your search" : "No coupons yet. Create your first one!"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCoupons.map((coupon) => {
            const status = getCouponStatus(coupon);
            return (
              <div
                key={coupon.id}
                className="border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono font-bold text-lg">{coupon.code}</span>
                      <Badge className={status.color}>{status.label}</Badge>
                      <Badge variant="outline">
                        {coupon.discount_type === "percentage" ? "%" : "$"} off
                      </Badge>
                      <button
                        onClick={() => copyCode(coupon.code)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        title="Copy code"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    {coupon.description && (
                      <p className="text-sm text-muted-foreground mb-2">{coupon.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground text-base">
                        {formatDiscount(coupon)} off
                      </span>
                      {coupon.min_order_amount > 0 && (
                        <span>Min: ${Number(coupon.min_order_amount).toFixed(2)}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Hash className="w-3 h-3" />
                        {coupon.current_uses}{coupon.max_uses ? `/${coupon.max_uses}` : ""} uses
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {coupon.expires_at ? `Expires ${formatDate(coupon.expires_at)}` : "No expiry"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={coupon.is_active}
                      onCheckedChange={() => toggleActive(coupon)}
                    />
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(coupon)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    {isAdmin && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          setCouponToDelete(coupon);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              {editingCoupon ? "Edit Coupon" : "Create Coupon"}
            </DialogTitle>
            <DialogDescription>
              {editingCoupon
                ? `Update coupon "${editingCoupon.code}"`
                : "Create a new discount coupon for your store"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="coupon-code">Code *</Label>
              <Input
                id="coupon-code"
                placeholder="e.g., SUMMER20"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coupon-desc">Description</Label>
              <Textarea
                id="coupon-desc"
                placeholder="Short description for internal reference"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Discount Type</Label>
                <Select
                  value={formData.discount_type}
                  onValueChange={(v) => setFormData({ ...formData, discount_type: v as "percentage" | "fixed_amount" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed_amount">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coupon-value">
                  Value {formData.discount_type === "percentage" ? "(%)" : "($)"} *
                </Label>
                <Input
                  id="coupon-value"
                  type="number"
                  min="0"
                  max={formData.discount_type === "percentage" ? "100" : undefined}
                  step={formData.discount_type === "percentage" ? "1" : "0.01"}
                  placeholder={formData.discount_type === "percentage" ? "10" : "5.00"}
                  value={formData.discount_value}
                  onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-order">Min Order ($)</Label>
                <Input
                  id="min-order"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.min_order_amount}
                  onChange={(e) => setFormData({ ...formData, min_order_amount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-uses">Max Uses (blank = unlimited)</Label>
                <Input
                  id="max-uses"
                  type="number"
                  min="1"
                  placeholder="Unlimited"
                  value={formData.max_uses}
                  onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="starts-at">Starts At</Label>
                <Input
                  id="starts-at"
                  type="datetime-local"
                  value={formData.starts_at}
                  onChange={(e) => setFormData({ ...formData, starts_at: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expires-at">Expires At</Label>
                <Input
                  id="expires-at"
                  type="datetime-local"
                  value={formData.expires_at}
                  onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stripe-coupon">Stripe Coupon ID (optional)</Label>
              <Input
                id="stripe-coupon"
                placeholder="e.g., zRhGtcOF"
                value={formData.stripe_coupon_id}
                onChange={(e) => setFormData({ ...formData, stripe_coupon_id: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Link to an existing Stripe coupon for automatic checkout integration
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stripe-promo">Stripe Promotion Code ID (optional)</Label>
              <Input
                id="stripe-promo"
                placeholder="e.g., promo_xxx"
                value={formData.stripe_promo_id}
                onChange={(e) => setFormData({ ...formData, stripe_promo_id: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="is-active">Active</Label>
              <Switch
                id="is-active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : editingCoupon ? (
                "Update Coupon"
              ) : (
                "Create Coupon"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Coupon</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete coupon "{couponToDelete?.code}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
