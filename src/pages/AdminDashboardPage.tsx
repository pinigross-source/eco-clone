import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AdminNav } from "@/components/admin/AdminNav";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { 
  Package, 
  Truck, 
  Loader2, 
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Send,
  RefreshCw,
  Search,
  Mail,
  User,
  BarChart3,
  MessageSquare,
  Users,
  Printer,
  Upload,
  TrendingUp,
  Tag,
  ScrollText,
  Globe,
  ShoppingCart,
  Phone,
  MapPin,
  Pencil,
  FileSpreadsheet,
  CreditCard
} from "lucide-react";
import { UpsellAnalyticsSection } from "@/components/admin/UpsellAnalyticsSection";
import { SubscriptionManagementSection } from "@/components/admin/SubscriptionManagementSection";
import { QuizLeadsSection } from "@/components/admin/QuizLeadsSection";
import { ContactInquiriesSection } from "@/components/admin/ContactInquiriesSection";
import { ShippingLabelDialog } from "@/components/admin/ShippingLabelDialog";
import { WooSubscriberImportSection } from "@/components/admin/WooSubscriberImportSection";
import { WooCommerceImportSection } from "@/components/admin/WooCommerceImportSection";
import { AffiliateManagementSection } from "@/components/admin/AffiliateManagementSection";
import { CouponManagementSection } from "@/components/admin/CouponManagementSection";
import { UserManagementSection } from "@/components/admin/UserManagementSection";
import { ActivityLogsSection } from "@/components/admin/ActivityLogsSection";
import { ShippingCountriesSection } from "@/components/admin/ShippingCountriesSection";
import { AbandonedCartAnalyticsSection } from "@/components/admin/AbandonedCartAnalyticsSection";
import { DashboardOverviewSection } from "@/components/admin/DashboardOverviewSection";
import { ProductCatalogSection } from "@/components/admin/ProductCatalogSection";
import { OrderDetailDialog } from "@/components/admin/OrderDetailDialog";
interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  items: unknown;
  tracking_number: string | null;
  created_at: string;
  user_id: string;
  shipping_address: unknown;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { 
    label: "Pending", 
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", 
    icon: <Clock className="w-3 h-3" /> 
  },
  processing: { 
    label: "Processing", 
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20", 
    icon: <Package className="w-3 h-3" /> 
  },
  shipped: { 
    label: "Shipped", 
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20", 
    icon: <Truck className="w-3 h-3" /> 
  },
  delivered: { 
    label: "Delivered", 
    color: "bg-green-500/10 text-green-600 border-green-500/20", 
    icon: <CheckCircle2 className="w-3 h-3" /> 
  },
  cancelled: { 
    label: "Cancelled", 
    color: "bg-red-500/10 text-red-600 border-red-500/20", 
    icon: <XCircle className="w-3 h-3" /> 
  },
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Shipping dialog state
  const [shipDialogOpen, setShipDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("USPS");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [sendingNotification, setSendingNotification] = useState(false);
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const [labelOrder, setLabelOrder] = useState<Order | null>(null);
  const [shippoSyncing, setShippoSyncing] = useState(false);
  const [trackingSyncing, setTrackingSyncing] = useState(false);
  const [detailOrderId, setDetailOrderId] = useState<string | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth?redirect=/admin");
      return;
    }

    // Check if user is admin or store_manager
    const { data: roles, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .in("role", ["admin", "store_manager"]);

    if (error || !roles || roles.length === 0) {
      toast.error("Access denied. Admin or Store Manager privileges required.");
      navigate("/");
      return;
    }

    // Prefer admin role if user has both
    const role = roles.find(r => r.role === "admin") ? "admin" : roles[0].role;
    setUserRole(role);
    setLoading(false);
    fetchOrders();
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;
      
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status");
    }
  };

  const openShipDialog = (order: Order) => {
    setSelectedOrder(order);
    setTrackingNumber(order.tracking_number || "");
    setCarrier("USPS");
    setEstimatedDelivery("");
    setShipDialogOpen(true);
  };

  const sendShippingNotification = async () => {
    if (!selectedOrder || !trackingNumber) {
      toast.error("Please enter a tracking number");
      return;
    }

    setSendingNotification(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-shipping-notification", {
        body: {
          orderId: selectedOrder.id,
          trackingNumber,
          carrier,
          estimatedDelivery: estimatedDelivery || undefined,
        },
      });

      if (error) throw error;

      toast.success(`Shipping notification sent to ${data.sentTo}`);
      setShipDialogOpen(false);
      fetchOrders();
    } catch (error: any) {
      console.error("Error sending notification:", error);
      toast.error(error.message || "Failed to send shipping notification");
    } finally {
      setSendingNotification(false);
    }
  };

  const syncOrdersToShippo = async () => {
    setShippoSyncing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke("sync-orders-shippo", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) throw error;

      if (data.synced > 0) {
        toast.success(`Synced ${data.synced} order(s) to Shippo`);
        fetchOrders();
      } else if (data.failed > 0) {
        toast.warning(`${data.failed} order(s) failed to sync`);
      } else {
        toast.info("No orders to sync");
      }
    } catch (error: any) {
      console.error("Shippo sync error:", error);
      toast.error(error.message || "Failed to sync orders to Shippo");
    } finally {
      setShippoSyncing(false);
    }
  };

  const syncTrackingFromShippo = async () => {
    setTrackingSyncing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke("sync-tracking-shippo", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) throw error;

      if (data.updated > 0) {
        toast.success(`Updated tracking for ${data.updated} order(s)`);
        fetchOrders();
      } else if (data.failed > 0) {
        toast.warning(`${data.failed} order(s) failed to update`);
      } else {
        toast.info("All orders are up to date");
      }
    } catch (error: any) {
      console.error("Tracking sync error:", error);
      toast.error(error.message || "Failed to sync tracking from Shippo");
    } finally {
      setTrackingSyncing(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = order.order_number.toLowerCase().includes(q) ||
      (order.tracking_number && order.tracking_number.toLowerCase().includes(q)) ||
      ((order.shipping_address as any)?.name || '').toLowerCase().includes(q) ||
      ((order.shipping_address as any)?.phone || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusConfig = (status: string) => {
    return statusConfig[status] || statusConfig.pending;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!userRole) {
    return null;
  }

  const isAdmin = userRole === "admin";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl">
                  {isAdmin ? "Admin Dashboard" : "Store Manager"}
                </h1>
                <p className="text-muted-foreground">Manage orders and shipping</p>
              </div>
            </div>

            <div className="space-y-6">
              <AdminNav activeTab={activeTab} onTabChange={setActiveTab} isAdmin={isAdmin} />

              {activeTab === "home" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <DashboardOverviewSection />
                </div>
              )}

              {activeTab === "products" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Product Catalog & Inventory
                  </h2>
                  <ProductCatalogSection isAdmin={isAdmin} />
                </div>
              )}

              {activeTab === "leads" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Quiz Leads
                  </h2>
                  <QuizLeadsSection />
                </div>
              )}

              {activeTab === "inquiries" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Contact Inquiries
                  </h2>
                  <ContactInquiriesSection />
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <UpsellAnalyticsSection />
                </div>
              )}

              {activeTab === "import" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    Import WooCommerce Subscribers
                  </h2>
                  <WooSubscriberImportSection />
                </div>
              )}

              {activeTab === "affiliates" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Affiliate Management
                  </h2>
                  <AffiliateManagementSection />
                </div>
              )}

              {activeTab === "coupons" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary" />
                    Coupon Management
                  </h2>
                  <CouponManagementSection isAdmin={isAdmin} />
                </div>
              )}

              {activeTab === "users" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    User Management
                  </h2>
                  <UserManagementSection />
                </div>
              )}

              {activeTab === "activity" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <ScrollText className="w-5 h-5 text-primary" />
                    Activity Log
                  </h2>
                  <ActivityLogsSection />
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Shipping Countries & Rates
                  </h2>
                  <ShippingCountriesSection />
                </div>
              )}

              {activeTab === "abandoned-carts" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    Abandoned Cart Analytics
                  </h2>
                  <AbandonedCartAnalyticsSection />
                </div>
              )}

              {activeTab === "subscriptions" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Subscription Management
                  </h2>
                  <SubscriptionManagementSection />
                </div>
              )}

              {activeTab === "woo-import" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-primary" />
                    WooCommerce Import
                  </h2>
                  <WooCommerceImportSection />
                </div>
              )}

              {activeTab === "orders" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by order #, name, phone, tracking..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={fetchOrders} disabled={ordersLoading}>
                      <RefreshCw className={`w-4 h-4 mr-2 ${ordersLoading ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                    <Button variant="outline" onClick={syncOrdersToShippo} disabled={shippoSyncing}>
                      <Truck className={`w-4 h-4 mr-2 ${shippoSyncing ? 'animate-spin' : ''}`} />
                      {shippoSyncing ? "Syncing..." : "Sync to Shippo"}
                    </Button>
                    <Button variant="outline" onClick={syncTrackingFromShippo} disabled={trackingSyncing}>
                      <RefreshCw className={`w-4 h-4 mr-2 ${trackingSyncing ? 'animate-spin' : ''}`} />
                      {trackingSyncing ? "Pulling..." : "Pull Tracking"}
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    {Object.entries(statusConfig).map(([key, config]) => {
                      const count = orders.filter(o => o.status === key).length;
                      return (
                        <div 
                          key={key}
                          className={`p-4 rounded-xl border ${statusFilter === key ? 'ring-2 ring-primary' : ''} cursor-pointer transition-all`}
                          onClick={() => setStatusFilter(statusFilter === key ? 'all' : key)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {config.icon}
                            <span className="text-sm font-medium capitalize">{config.label}</span>
                          </div>
                          <span className="text-2xl font-bold">{count}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Orders Table */}
                  {ordersLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No orders found</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredOrders.map((order) => {
                        const status = getStatusConfig(order.status);
                        return (
                          <div
                            key={order.id}
                            className="border border-border rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer"
                            onClick={() => {
                              setDetailOrderId(order.id);
                              setDetailDialogOpen(true);
                            }}
                          >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="hidden sm:flex w-10 h-10 rounded-full bg-muted items-center justify-center">
                                  <Package className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span
                                      className="font-mono font-semibold cursor-pointer hover:text-primary hover:underline transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setDetailOrderId(order.id);
                                        setDetailDialogOpen(true);
                                      }}
                                    >
                                      {order.order_number}
                                    </span>
                                    <Badge className={`${status.color} gap-1`}>
                                      {status.icon}
                                      {status.label}
                                    </Badge>
                                    {(() => {
                                      const sa = order.shipping_address as any;
                                      if (!sa?.name || !sa?.address) return null;
                                      const billingName = sa.billing_name || "";
                                      const shippingName = sa.name || "";
                                      const billingAddr = sa.billing_address || {};
                                      const shipAddr = sa.address || {};
                                      const namesDiffer = billingName && shippingName.toLowerCase() !== billingName.toLowerCase();
                                      const addrDiffers = billingAddr.line1 && shipAddr.line1 && billingAddr.line1.toLowerCase() !== shipAddr.line1.toLowerCase();
                                      if (!namesDiffer && !addrDiffers) return null;
                                      return (
                                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 gap-1 text-xs">
                                          <MapPin className="w-3 h-3" />
                                          Different Ship-to
                                        </Badge>
                                      );
                                    })()}
                                  </div>
                                  {(() => {
                                    const sa = order.shipping_address as any;
                                    if (!sa?.name) return null;
                                    const billingName = sa.billing_name || "";
                                    const shippingName = sa.name;
                                    const isDiff = billingName && billingName.toLowerCase() !== shippingName.toLowerCase();
                                    return (
                                      <div className="flex flex-col gap-0.5 mb-0.5">
                                        {isDiff ? (
                                          <>
                                            <div className="flex items-center gap-1 text-sm text-foreground">
                                              <User className="w-3 h-3 text-muted-foreground" />
                                              <span className="text-muted-foreground text-xs">Bill to:</span>
                                              <span className="font-medium">{billingName}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-foreground">
                                              <MapPin className="w-3 h-3 text-green-600" />
                                              <span className="text-muted-foreground text-xs">Ship to:</span>
                                              <span className="font-medium">{shippingName}</span>
                                            </div>
                                          </>
                                        ) : (
                                          <div className="flex items-center gap-1 text-sm text-foreground">
                                            <User className="w-3 h-3 text-muted-foreground" />
                                            <span className="font-medium">{billingName || shippingName}</span>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })()}
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {formatDate(order.created_at)}
                                    </span>
                                    <span className="font-semibold text-foreground">
                                      {formatPrice(order.total_amount)}
                                    </span>
                                  </div>
                                   {order.tracking_number && (
                                    <div className="flex items-center gap-1 mt-1 text-sm">
                                       <Truck className="w-3 h-3 text-primary" />
                                       <span className="font-mono text-muted-foreground">{order.tracking_number}</span>
                                     </div>
                                   )}
                                   {(order.shipping_address as any)?.phone && (
                                     <div className="flex items-center gap-1 mt-1 text-sm">
                                       <Phone className="w-3 h-3 text-primary" />
                                       <span className="text-muted-foreground">{(order.shipping_address as any).phone}</span>
                                     </div>
                                   )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
                                <Select
                                  value={order.status}
                                  onValueChange={(value) => updateOrderStatus(order.id, value)}
                                >
                                  <SelectTrigger className="w-[140px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setDetailOrderId(order.id);
                                    setDetailDialogOpen(true);
                                  }}
                                >
                                  <Pencil className="w-4 h-4 mr-2" />
                                  Edit
                                </Button>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setLabelOrder(order);
                                    setLabelDialogOpen(true);
                                  }}
                                >
                                  <Printer className="w-4 h-4 mr-2" />
                                  Print Label
                                </Button>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openShipDialog(order)}
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Ship & Notify
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Shipping Dialog */}
      <Dialog open={shipDialogOpen} onOpenChange={setShipDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Ship Order & Send Notification
            </DialogTitle>
            <DialogDescription>
              Enter shipping details for order {selectedOrder?.order_number}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="trackingNumber">Tracking Number *</Label>
              <Input
                id="trackingNumber"
                placeholder="e.g., 1Z999AA10123456784"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carrier">Carrier</Label>
              <Select value={carrier} onValueChange={setCarrier}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USPS">USPS</SelectItem>
                  <SelectItem value="UPS">UPS</SelectItem>
                  <SelectItem value="FedEx">FedEx</SelectItem>
                  <SelectItem value="DHL">DHL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedDelivery">Estimated Delivery (optional)</Label>
              <Input
                id="estimatedDelivery"
                placeholder="e.g., January 20, 2026"
                value={estimatedDelivery}
                onChange={(e) => setEstimatedDelivery(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShipDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendShippingNotification} disabled={sendingNotification || !trackingNumber}>
              {sendingNotification ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Notification
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ShippingLabelDialog
        open={labelDialogOpen}
        onOpenChange={setLabelDialogOpen}
        order={labelOrder}
        onComplete={fetchOrders}
      />

      <OrderDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        orderId={detailOrderId}
        onUpdated={fetchOrders}
      />

      <Footer />
    </div>
  );
}
