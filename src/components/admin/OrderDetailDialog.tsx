import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Loader2,
  Package,
  Truck,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Save,
  Clock,
  CheckCircle2,
  XCircle,
  User,
} from "lucide-react";

interface ShippingAddress {
  name?: string;
  phone?: string;
  email?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  // flat format fallback
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

interface OrderDetail {
  id: string;
  order_number: string;
  user_id: string;
  total_amount: number;
  status: string;
  tracking_number: string | null;
  created_at: string;
  updated_at: string;
  items: Array<{ name?: string; description?: string; quantity?: number; price?: number; amount?: number; priceId?: string | null; recurring?: { interval?: string; interval_count?: number } | boolean }>;
  shippo_shipment_id: string | null;
  shipping_address: ShippingAddress | null;
  customer_email: string;
}

interface OrderDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string | null;
  onUpdated: () => void;
}

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  pending: { color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: <Clock className="w-3 h-3" /> },
  processing: { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: <Package className="w-3 h-3" /> },
  shipped: { color: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: <Truck className="w-3 h-3" /> },
  delivered: { color: "bg-green-500/10 text-green-600 border-green-500/20", icon: <CheckCircle2 className="w-3 h-3" /> },
  cancelled: { color: "bg-red-500/10 text-red-600 border-red-500/20", icon: <XCircle className="w-3 h-3" /> },
};

function normalizeAddress(addr: ShippingAddress | null) {
  if (!addr) return { name: "", phone: "", line1: "", line2: "", city: "", state: "", postal_code: "", country: "US" };
  return {
    name: addr.name || "",
    phone: addr.phone || "",
    line1: addr.address?.line1 || addr.line1 || "",
    line2: addr.address?.line2 || addr.line2 || "",
    city: addr.address?.city || addr.city || "",
    state: addr.address?.state || addr.state || "",
    postal_code: addr.address?.postal_code || addr.postal_code || "",
    country: addr.address?.country || addr.country || "US",
  };
}

export function OrderDetailDialog({ open, onOpenChange, orderId, onUpdated }: OrderDetailDialogProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [order, setOrder] = useState<OrderDetail | null>(null);

  // Editable fields
  const [status, setStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [addressFields, setAddressFields] = useState({
    name: "", phone: "", line1: "", line2: "", city: "", state: "", postal_code: "", country: "US",
  });

  useEffect(() => {
    if (open && orderId) {
      fetchOrder(orderId);
    }
    if (!open) {
      setOrder(null);
    }
  }, [open, orderId]);

  const fetchOrder = async (id: string) => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-orders?action=get&order_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch order");
      }

      const data: OrderDetail = await res.json();
      setOrder(data);
      setStatus(data.status);
      setTrackingNumber(data.tracking_number || "");
      setAddressFields(normalizeAddress(data.shipping_address));
    } catch (error: any) {
      toast.error(error.message || "Failed to load order details");
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!order) return;
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const body: Record<string, unknown> = { order_id: order.id };

      if (status !== order.status) body.status = status;
      if (trackingNumber !== (order.tracking_number || "")) body.tracking_number = trackingNumber;

      const origAddr = normalizeAddress(order.shipping_address);
      const addrChanged = Object.keys(addressFields).some(
        k => addressFields[k as keyof typeof addressFields] !== origAddr[k as keyof typeof origAddr]
      );

      if (addrChanged) {
        body.shipping_address = {
          name: addressFields.name,
          phone: addressFields.phone,
          address: {
            line1: addressFields.line1,
            line2: addressFields.line2,
            city: addressFields.city,
            state: addressFields.state,
            postal_code: addressFields.postal_code,
            country: addressFields.country,
          },
        };
      }

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-orders?action=update`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update order");
      }

      toast.success("Order updated successfully");
      onUpdated();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const formatPrice = (cents: number) => {
    // total_amount is stored in dollars already
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents);
  };

  const getItemPrice = (item: { price?: number; amount?: number; quantity?: number }) => {
    // price is unit price in cents; amount is total in cents
    if (item.amount) return item.amount / 100;
    if (item.price) return item.price / 100;
    return 0;
  };

  const formatRecurring = (item: { recurring?: { interval?: string; interval_count?: number } | boolean }) => {
    if (!item.recurring || typeof item.recurring !== 'object' || !item.recurring.interval) return "";
    const count = item.recurring.interval_count || 1;
    const interval = item.recurring.interval;
    return count === 1 ? ` / every ${interval}` : ` / every ${count} ${interval}s`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Order Details
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !order ? null : (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono font-bold text-lg">{order.order_number}</span>
              <Badge className={`${statusConfig[order.status]?.color || ""} gap-1`}>
                {statusConfig[order.status]?.icon}
                <span className="capitalize">{order.status}</span>
              </Badge>
              <span className="text-primary font-bold text-lg ml-auto">
                {formatPrice(order.total_amount)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Created: {formatDate(order.created_at)}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                {order.customer_email || "No email"}
              </div>
            </div>

            <Separator />

            {/* Status & Tracking */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                Fulfillment
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tracking Number</Label>
                  <Input
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g., 1Z999AA10123456784"
                  />
                </div>
              </div>
              {order.shippo_shipment_id && (
                <p className="text-xs text-muted-foreground">
                  Shippo ID: <span className="font-mono">{order.shippo_shipment_id}</span>
                </p>
              )}
            </div>

            <Separator />

            {/* Billing & Shipping */}
            {(() => {
              const sa = order.shipping_address as any;
              const billingName = sa?.billing_name || sa?.name || "";
              const billingAddr = sa?.billing_address;
              const shippingName = sa?.name || "";
              const isDiff = sa?.billing_name && sa.billing_name.toLowerCase() !== shippingName.toLowerCase();
              return isDiff ? (
                <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 gap-1 text-xs">
                      <MapPin className="w-3 h-3" />
                      Different Ship-to
                    </Badge>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm mt-2">
                    <div>
                      <p className="text-muted-foreground text-xs font-medium mb-1">Bill to</p>
                      <p className="font-semibold">{billingName}</p>
                      {billingAddr && (
                        <p className="text-muted-foreground text-xs">
                          {[billingAddr.line1, billingAddr.city, billingAddr.state, billingAddr.postal_code].filter(Boolean).join(", ")}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium mb-1">Ship to</p>
                      <p className="font-semibold">{shippingName}</p>
                      <p className="text-muted-foreground text-xs">
                        {[addressFields.line1, addressFields.city, addressFields.state, addressFields.postal_code].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Shipping Address
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      value={addressFields.name}
                      onChange={(e) => setAddressFields({ ...addressFields, name: e.target.value })}
                      placeholder="Customer name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      value={addressFields.phone}
                      onChange={(e) => setAddressFields({ ...addressFields, phone: e.target.value })}
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address Line 1</Label>
                <Input
                  value={addressFields.line1}
                  onChange={(e) => setAddressFields({ ...addressFields, line1: e.target.value })}
                  placeholder="Street address"
                />
              </div>
              <div className="space-y-2">
                <Label>Address Line 2</Label>
                <Input
                  value={addressFields.line2}
                  onChange={(e) => setAddressFields({ ...addressFields, line2: e.target.value })}
                  placeholder="Apt, suite, etc."
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="space-y-2 sm:col-span-1">
                  <Label>City</Label>
                  <Input
                    value={addressFields.city}
                    onChange={(e) => setAddressFields({ ...addressFields, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input
                    value={addressFields.state}
                    onChange={(e) => setAddressFields({ ...addressFields, state: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>ZIP</Label>
                  <Input
                    value={addressFields.postal_code}
                    onChange={(e) => setAddressFields({ ...addressFields, postal_code: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    value={addressFields.country}
                    onChange={(e) => setAddressFields({ ...addressFields, country: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Items */}
            {(() => {
              const filtered = (order.items || []).filter((item) => {
                if (!item.priceId && /^\d+\s*×/.test(item.name || "")) return false;
                return true;
              });
              // Deduplicate Stripe mixed-mode artifacts:
              // 1) duplicate entries with same priceId
              // 2) duplicate no-price entries when an equivalent priced entry exists
              const getItemSignature = (item: { name?: string; amount?: number; quantity?: number; recurring?: { interval?: string; interval_count?: number } | boolean }) => {
                const normalizedName = (item.name || "").trim().toLowerCase();
                const qty = item.quantity || 1;
                const amount = item.amount || 0;
                const recurringKey = typeof item.recurring === "object" && item.recurring?.interval
                  ? `recurring:${item.recurring.interval}:${item.recurring.interval_count || 1}`
                  : `recurring:${Boolean(item.recurring)}`;
                return `${normalizedName}|${amount}|${qty}|${recurringKey}`;
              };

              const deduped = filtered.reduce<typeof filtered>((acc, item) => {
                const sig = getItemSignature(item);

                if (item.priceId) {
                  // Skip exact priceId duplicates
                  if (acc.some(existing => existing.priceId === item.priceId)) return acc;

                  // Prefer priced item over equivalent unpriced duplicate
                  const unpricedIndex = acc.findIndex(existing => !existing.priceId && getItemSignature(existing) === sig);
                  if (unpricedIndex >= 0) {
                    acc[unpricedIndex] = item;
                    return acc;
                  }

                  acc.push(item);
                  return acc;
                }

                // For unpriced items, skip if an equivalent item already exists
                if (acc.some(existing => getItemSignature(existing) === sig)) return acc;

                acc.push(item);
                return acc;
              }, []);
              const oneTimeItems = deduped.filter(item => !item.recurring);
              const subscriptionItems = deduped.filter(item => !!item.recurring);
              const isBundle = oneTimeItems.length > 0 && subscriptionItems.length > 0;
              const oneTimeTotal = oneTimeItems.reduce((sum, item) => sum + (item.amount ? item.amount / 100 : (getItemPrice(item) * (item.quantity || 1))), 0);
              const subTotal = subscriptionItems.reduce((sum, item) => sum + (item.amount ? item.amount / 100 : (getItemPrice(item) * (item.quantity || 1))), 0);

              // Items to show in the top charges list (one-time only if there are subs, otherwise all non-recurring)
              const hasSubscription = subscriptionItems.length > 0;
              const chargeListItems = hasSubscription
                ? oneTimeItems.concat(subscriptionItems)
                : deduped;

              return (
                <div className="space-y-4">
                  {/* One-time charges / Items */}
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      {isBundle ? "One-Time Charges" : `Items (${deduped.length})`}
                    </h3>
                    <div className="rounded-lg border border-border divide-y divide-border">
                      {chargeListItems.map((item, i) => {
                        const unitPrice = getItemPrice(item);
                        const qty = item.quantity || 1;
                        const lineTotal = item.amount ? item.amount / 100 : unitPrice * qty;
                        const isSubItem = !!item.recurring;
                        const displayName = isSubItem
                          ? `${item.name || "Subscription"} Subscription Plan`
                          : (item.name || "Unknown item");
                        return (
                          <div key={i} className="flex items-center justify-between px-4 py-3">
                            <div>
                              <p className="font-medium text-sm">
                                {displayName}
                              </p>
                              <p className="text-xs text-muted-foreground">Qty: {qty}</p>
                            </div>
                            <span className="font-medium text-sm">${lineTotal.toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                    {isBundle && (
                      <p className="text-sm font-medium text-foreground">
                        Charged today: <span className="text-primary font-bold">{formatPrice(order.total_amount)}</span>
                      </p>
                    )}
                  </div>

                  {/* Subscription plan section (for any order with subscription items) */}
                  {hasSubscription && (
                    <div className="space-y-3">
                       <h3 className="font-semibold flex items-center gap-2">
                         <Truck className="w-4 h-4 text-primary" />
                         Subscription Plan
                       </h3>
                       <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
                         {subscriptionItems.map((item, i) => {
                           const unitPrice = getItemPrice(item);
                           const qty = item.quantity || 1;
                           const lineTotal = item.amount ? item.amount / 100 : unitPrice * qty;
                           const count = typeof item.recurring === 'object' ? (item.recurring.interval_count || 1) : 1;
                           const interval = typeof item.recurring === 'object' ? (item.recurring.interval || 'month') : 'month';
                           // All current subscriptions bill every 6 months
                           const intervalLabel = count > 1
                             ? `every ${count} ${interval}s`
                             : "every 6 months";
                           return (
                             <div key={i}>
                               <p className="font-medium text-sm">
                                 {qty} × {item.name || "Subscription"}
                               </p>
                               <p className="text-sm text-muted-foreground mt-1">
                                 The customer will be charged <span className="font-semibold text-foreground">${lineTotal.toFixed(2)}</span> {intervalLabel}
                               </p>
                             </div>
                           );
                         })}
                         <Separator />
                         <div className="space-y-1.5">
                           <p className="text-xs font-semibold text-foreground">Subscriber Benefits:</p>
                           <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                             <li>Automatic refill delivery, never run out</li>
                             <li>Free shipping on all refill orders</li>
                             <li>Lifetime warranty on paired device</li>
                           </ul>
                         </div>
                       </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Save */}
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
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
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
