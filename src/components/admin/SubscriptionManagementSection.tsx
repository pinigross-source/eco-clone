import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, RefreshCw, Search, Calendar, CheckCircle2, AlertTriangle, Package, Mail, CreditCard, Save } from "lucide-react";
import { toast } from "sonner";

const PRODUCT_NAMES: Record<string, string> = {
  prod_TmgdfsJfvJcYqq: "BioLogic Mini Twin-Pack",
  prod_TmgfTg2BOlhzOu: "Biotica 800-NV Twin-Pack",
  prod_TmggA1UUuPy7mv: "BA-2080 Refill",
  prod_TyevTJlN928IJl: "E-Biotic Pro 250ML",
  prod_TyevV5dGqeusYr: "E-Biotic Pro 500ML",
  prod_TyewfcWpXpXmeW: "E-Biotic Pro 1L",
};

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-500/10 text-green-600 border-green-500/20",
  trialing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  past_due: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  canceled: "bg-red-500/10 text-red-600 border-red-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
  incomplete: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  migrated_to_stripe: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  approved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  pending_approval: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "on-hold": "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

const SOURCE_COLORS: Record<string, string> = {
  stripe: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  legacy_stripe: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  woocommerce: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

type UnifiedSubscription = {
  id: string;
  rawId: string;
  email: string;
  name: string;
  product: string;
  source: string;
  status: string;
  amount: string;
  amountRaw: number | null;
  billingInterval: string;
  startDate: string;
  nextBillingDate: string;
  nextBillingRaw: string | null;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  billedExternally: boolean;
};

export function SubscriptionManagementSection() {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<UnifiedSubscription[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<string>("");
  const [processing, setProcessing] = useState(false);

  // Detail dialog state
  const [detailSub, setDetailSub] = useState<UnifiedSubscription | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editInterval, setEditInterval] = useState("");
  const [editNextBilling, setEditNextBilling] = useState("");
  const [editProduct, setEditProduct] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke("admin-subscriptions", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) throw error;

      const unified: UnifiedSubscription[] = [];

      for (const sub of data.stripe_subscriptions || []) {
        unified.push({
          id: `stripe-${sub.id}`,
          rawId: sub.id,
          email: sub.email,
          name: sub.display_name || "",
          product: sub.stripe_product_id ? (PRODUCT_NAMES[sub.stripe_product_id] || sub.stripe_product_id) : "Unknown",
          source: sub.source,
          status: sub.subscription_status || "unknown",
          amount: "",
          amountRaw: null,
          billingInterval: "",
          startDate: sub.created_at ? formatDate(sub.created_at) : "",
          nextBillingDate: sub.current_period_end ? formatDate(sub.current_period_end) : "",
          nextBillingRaw: sub.current_period_end,
          stripeCustomerId: sub.stripe_customer_id || "",
          stripeSubscriptionId: sub.stripe_subscription_id || "",
          billedExternally: false,
        });
      }

      for (const sub of data.woo_subscriptions || []) {
        unified.push({
          id: `woo-${sub.id}`,
          rawId: sub.id,
          email: sub.email,
          name: "",
          product: sub.product_name,
          source: "woocommerce",
          status: sub.status,
          amount: sub.amount ? `$${(sub.amount / 100).toFixed(2)}` : "",
          amountRaw: sub.amount,
          billingInterval: sub.billing_interval || "",
          startDate: "",
          nextBillingDate: sub.current_period_end ? formatDate(sub.current_period_end) : "",
          nextBillingRaw: sub.current_period_end,
          stripeCustomerId: "",
          stripeSubscriptionId: sub.woo_subscription_id || "",
          billedExternally: true,
        });
      }

      setSubscriptions(unified);
      setSelectedIds(new Set());
    } catch (err: any) {
      console.error("Error fetching subscriptions:", err);
      toast.error(err.message || "Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const toDateInputValue = (raw: string | null) => {
    if (!raw) return "";
    try {
      return new Date(raw).toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const filtered = subscriptions.filter((sub) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      sub.email.toLowerCase().includes(q) ||
      sub.name.toLowerCase().includes(q) ||
      sub.product.toLowerCase().includes(q) ||
      sub.stripeSubscriptionId.toLowerCase().includes(q);
    const matchesSource = sourceFilter === "all" || sub.source === sourceFilter;
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesSource && matchesStatus;
  });

  const wooFiltered = filtered.filter((s) => s.source === "woocommerce");

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (wooFiltered.every((s) => selectedIds.has(s.id))) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        wooFiltered.forEach((s) => next.delete(s.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        wooFiltered.forEach((s) => next.add(s.id));
        return next;
      });
    }
  };

  const selectedWooSubs = subscriptions.filter(
    (s) => s.source === "woocommerce" && selectedIds.has(s.id)
  );

  const handleBulkAction = (action: string) => {
    if (selectedWooSubs.length === 0) {
      toast.error("Please select at least one WooCommerce subscription");
      return;
    }
    setBulkAction(action);
    setApprovalDialogOpen(true);
  };

  const confirmBulkAction = async () => {
    setProcessing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const wooIds = selectedWooSubs.map((s) => s.rawId);

      const { error } = await supabase.functions.invoke("admin-subscriptions", {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: { action: "update_status", woo_ids: wooIds, new_status: bulkAction },
      });

      if (error) throw error;

      toast.success(`${wooIds.length} subscription(s) updated to "${bulkAction}"`);
      setApprovalDialogOpen(false);
      setSelectedIds(new Set());
      await fetchSubscriptions();
    } catch (err: any) {
      console.error("Bulk action error:", err);
      toast.error(err.message || "Failed to update subscriptions");
    } finally {
      setProcessing(false);
    }
  };

  // Detail dialog
  const openDetail = (sub: UnifiedSubscription) => {
    setDetailSub(sub);
    setEditStatus(sub.status);
    setEditAmount(sub.amountRaw != null ? (sub.amountRaw / 100).toFixed(2) : "");
    setEditInterval(sub.billingInterval === "" ? "" : sub.billingInterval);
    setEditNextBilling(toDateInputValue(sub.nextBillingRaw));
    setEditProduct(sub.product);
    setDetailOpen(true);
  };

  const saveDetail = async () => {
    if (!detailSub) return;
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { error } = await supabase.functions.invoke("admin-subscriptions", {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: {
          action: "update_detail",
          subscription_id: detailSub.rawId,
          source: detailSub.source,
          updates: {
            status: editStatus,
            amount: editAmount ? Math.round(parseFloat(editAmount) * 100) : undefined,
            billing_interval: editInterval || undefined,
            current_period_end: editNextBilling ? new Date(editNextBilling).toISOString() : undefined,
            product_name: detailSub.source === "woocommerce" ? editProduct : undefined,
          },
        },
      });

      if (error) throw error;

      toast.success("Subscription updated successfully");
      setDetailOpen(false);
      await fetchSubscriptions();
    } catch (err: any) {
      console.error("Save error:", err);
      toast.error(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const sourceCounts = {
    stripe: subscriptions.filter((s) => s.source === "stripe").length,
    legacy_stripe: subscriptions.filter((s) => s.source === "legacy_stripe").length,
    woocommerce: subscriptions.filter((s) => s.source === "woocommerce").length,
  };

  const statusCounts = subscriptions.reduce<Record<string, number>>((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {});

  const sourceLabel = (source: string) => {
    switch (source) {
      case "stripe": return "Stripe (New)";
      case "legacy_stripe": return "Legacy Stripe";
      case "woocommerce": return "WooCommerce";
      default: return source;
    }
  };

  const allWooSelected = wooFiltered.length > 0 && wooFiltered.every((s) => selectedIds.has(s.id));
  const someWooSelected = wooFiltered.some((s) => selectedIds.has(s.id));
  const isWoo = detailSub?.source === "woocommerce";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Total Subscriptions</p>
          <p className="text-2xl font-bold">{subscriptions.length}</p>
        </div>
        <div className="p-4 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <p className="text-sm text-muted-foreground">Stripe (New)</p>
          </div>
          <p className="text-2xl font-bold">{sourceCounts.stripe}</p>
        </div>
        <div className="p-4 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <p className="text-sm text-muted-foreground">Legacy Stripe</p>
          </div>
          <p className="text-2xl font-bold">{sourceCounts.legacy_stripe}</p>
        </div>
        <div className="p-4 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-accent-foreground" />
            <p className="text-sm text-muted-foreground">WooCommerce</p>
          </div>
          <p className="text-2xl font-bold">{sourceCounts.woocommerce}</p>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedWooSubs.length > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-primary/30 bg-primary/5">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">
            {selectedWooSubs.length} WooCommerce subscription(s) selected
          </span>
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="default" onClick={() => handleBulkAction("approved")}>
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Approve for Billing
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleBulkAction("pending_approval")}>
              Set Pending
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("cancelled")}
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by email, name, product, or subscription ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="stripe">Stripe (New)</SelectItem>
            <SelectItem value="legacy_stripe">Legacy Stripe</SelectItem>
            <SelectItem value="woocommerce">WooCommerce</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.keys(statusCounts).map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, " ")} ({statusCounts[status]})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={fetchSubscriptions} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {subscriptions.length} subscriptions
        <span className="ml-2 text-xs text-muted-foreground/60"> Double-click a row to view details</span>
      </p>

      {/* Table with sticky header */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-y-auto max-h-[calc(100vh-320px)]">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-card shadow-[0_1px_0_0] shadow-border">
              <TableRow>
                <TableHead className="w-8 px-2">
                  <Checkbox
                    checked={allWooSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all WooCommerce subscriptions"
                    className={someWooSelected && !allWooSelected ? "opacity-50" : ""}
                  />
                </TableHead>
                <TableHead className="px-2">Subscriber</TableHead>
                <TableHead className="px-2">Product</TableHead>
                <TableHead className="px-2">Source / Status</TableHead>
                <TableHead className="px-2">Billing</TableHead>
                <TableHead className="px-2">Dates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    No subscriptions found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((sub) => (
                  <TableRow
                    key={sub.id}
                    className={`cursor-pointer select-none transition-colors ${
                      selectedIds.has(sub.id) ? "bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onDoubleClick={() => openDetail(sub)}
                  >
                    <TableCell className="px-2 w-8" onClick={(e) => e.stopPropagation()}>
                      {sub.source === "woocommerce" ? (
                        <Checkbox
                          checked={selectedIds.has(sub.id)}
                          onCheckedChange={() => toggleSelect(sub.id)}
                          aria-label={`Select ${sub.email}`}
                        />
                      ) : (
                        <span className="w-4" />
                      )}
                    </TableCell>
                    <TableCell className="px-2">
                      <p className="font-medium text-sm truncate max-w-[200px]">{sub.email}</p>
                      {sub.name !== "" && (
                        <p className="text-xs text-muted-foreground">{sub.name}</p>
                      )}
                    </TableCell>
                    <TableCell className="px-2">
                      <p className="text-sm truncate max-w-[160px]">{sub.product}</p>
                    </TableCell>
                    <TableCell className="px-2">
                      <div className="flex flex-col gap-1">
                        <Badge className={`${SOURCE_COLORS[sub.source] || ""} text-xs w-fit`}>
                          {sourceLabel(sub.source)}
                        </Badge>
                        <Badge className={`${STATUS_COLORS[sub.status] || ""} text-xs w-fit`}>
                          {sub.status.replace(/_/g, " ")}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="px-2">
                      <div className="text-xs space-y-0.5">
                        <p className="font-mono">{sub.amount}</p>
                        <p className="text-muted-foreground">{sub.billingInterval}</p>
                        {sub.billedExternally ? (
                          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px] px-1.5 py-0">
                            Manual
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px] px-1.5 py-0">
                            Auto
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-2">
                      <div className="text-xs space-y-0.5">
                        {sub.startDate !== "" && (
                          <p className="text-muted-foreground">Start: {sub.startDate}</p>
                        )}
                        <p className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                          <span>Next: {sub.nextBillingDate}</span>
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Subscription Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Subscription Details
            </DialogTitle>
          </DialogHeader>

          {detailSub && (
            <div className="space-y-5 py-2">
              {/* Read-only info */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {detailSub.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Source</p>
                  <Badge className={`${SOURCE_COLORS[detailSub.source] || ""} text-xs`}>
                    {sourceLabel(detailSub.source)}
                  </Badge>
                </div>
                {detailSub.name !== "" && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Name</p>
                    <p className="text-sm">{detailSub.name}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Subscription ID</p>
                  <p className="text-xs font-mono text-muted-foreground">{detailSub.stripeSubscriptionId}</p>
                </div>
                {detailSub.stripeCustomerId !== "" && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Customer ID</p>
                    <p className="text-xs font-mono text-muted-foreground">{detailSub.stripeCustomerId}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Billing Type</p>
                  <p className="text-sm">{detailSub.billedExternally ? "Manual (WooCommerce)" : "Automatic (Stripe)"}</p>
                </div>
              </div>

              {/* Editable fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="detail-product">Product</Label>
                  <Input
                    id="detail-product"
                    value={editProduct}
                    onChange={(e) => setEditProduct(e.target.value)}
                    disabled={!isWoo}
                    placeholder="Product name"
                  />
                  {!isWoo && <p className="text-xs text-muted-foreground">Stripe products cannot be changed here</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="detail-status">Status</Label>
                    <Select value={editStatus} onValueChange={setEditStatus} disabled={!isWoo}>
                      <SelectTrigger id="detail-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending_approval">Pending Approval</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="detail-amount">Amount ($)</Label>
                    <Input
                      id="detail-amount"
                      type="number"
                      step="0.01"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      disabled={!isWoo}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="detail-interval">Billing Interval</Label>
                    <Select value={editInterval} onValueChange={setEditInterval} disabled={!isWoo}>
                      <SelectTrigger id="detail-interval">
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">Monthly</SelectItem>
                        <SelectItem value="3 months">Every 3 Months</SelectItem>
                        <SelectItem value="6 months">Every 6 Months</SelectItem>
                        <SelectItem value="year">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="detail-next-billing">Next Billing Date</Label>
                    <Input
                      id="detail-next-billing"
                      type="date"
                      value={editNextBilling}
                      onChange={(e) => setEditNextBilling(e.target.value)}
                      disabled={!isWoo}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailOpen(false)}>
              Close
            </Button>
            {isWoo && (
              <Button onClick={saveDetail} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approval Confirmation Dialog */}
      <AlertDialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {bulkAction === "approved" ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : bulkAction === "cancelled" ? (
                <AlertTriangle className="w-5 h-5 text-destructive" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              )}
              Confirm: {bulkAction === "approved"
                ? "Approve for Billing"
                : bulkAction === "cancelled"
                ? "Cancel Subscriptions"
                : "Set Pending Approval"}
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                You are about to change the status of{" "}
                <strong>{selectedWooSubs.length}</strong> WooCommerce subscription(s)
                to <strong>"{bulkAction?.replace(/_/g, " ")}"</strong>.
              </p>
              <div className="max-h-48 overflow-y-auto rounded-lg border border-border bg-muted/50 p-3 space-y-1">
                {selectedWooSubs.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{sub.email}</span>
                    <span className="text-muted-foreground">{sub.product} · {sub.amount}</span>
                  </div>
                ))}
              </div>
              {bulkAction === "approved" && (
                <p className="text-sm text-amber-600 font-medium">
                  ⚠️ Approved subscriptions will be eligible for automatic billing migration.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBulkAction}
              disabled={processing}
              className={
                bulkAction === "cancelled"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Confirm ${bulkAction === "approved" ? "Approval" : bulkAction === "cancelled" ? "Cancellation" : "Update"}`
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
