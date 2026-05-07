import { useState, useEffect, useMemo } from "react";
import { ChangePasswordSection } from "@/components/account/ChangePasswordSection";
import { resolveTier, getTierFeatures } from "@/lib/subscription-tiers";
import { SubscriberBadge, WarrantyBadge } from "@/components/subscriber/SubscriberComponents";
import { useNavigate, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { 
  User, 
  Package, 
  CreditCard, 
  Settings, 
  LogOut, 
  Loader2, 
  Save,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck,
  ExternalLink,
  XCircle,
  RefreshCw,
  Shield,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  TrendingUp
} from "lucide-react";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { z } from "zod";

interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  phone: string | null;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  items: OrderItem[];
  tracking_number: string | null;
  created_at: string;
}

interface WooSubscription {
  id: string;
  product_name: string;
  current_period_end: string | null;
}

interface EntitlementData {
  subscribed: boolean;
  subscription_status: string;
  subscription_end: string | null;
  stripe_subscription_id: string | null;
  stripe_product_id: string | null;
  woo_subscriptions: WooSubscription[];
  source: string;
}

export default function AccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState<EntitlementData | null>(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [isAdminOrManager, setIsAdminOrManager] = useState(false);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate({ to: "/auth" });
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate({ to: "/auth" });
      } else {
        fetchProfile(session.user.id);
        fetchOrders(session.user.id);
        fetchSubscriptions();
        checkAdminRole(session.user.id);
        checkAffiliateStatus(session.user.id, session.user.email ?? "");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .in("role", ["admin", "store_manager"]);
    setIsAdminOrManager(!!(data && data.length > 0));
  };

  const checkAffiliateStatus = async (userId: string, userEmail: string) => {
    let { data } = await supabase
      .from("affiliates")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    // Auto-link by email if not found by user_id
    if (!data && userEmail) {
      const { data: emailMatch } = await supabase
        .from("affiliates")
        .select("id")
        .eq("email", userEmail.toLowerCase())
        .is("user_id", null)
        .maybeSingle();

      if (emailMatch) {
        await supabase
          .from("affiliates")
          .update({ user_id: userId })
          .eq("id", emailMatch.id);
        data = emailMatch;
      }
    }

    setIsAffiliate(!!data);
  };

  const fetchSubscriptions = async () => {
    setSubscriptionLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-entitlement');
      
      if (error) {
        console.error("Error fetching subscriptions:", error);
        return;
      }

      setSubscriptionData(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast.error("Failed to open subscription management. Please try again.");
      console.error("Portal error:", error);
    } finally {
      setPortalLoading(false);
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
      }

      if (data) {
        setProfile(data);
        setFormData({
          displayName: data.display_name || "",
          phone: data.phone || "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      }

      if (data) {
        setOrders(data.map(order => ({
          id: order.id,
          order_number: order.order_number,
          status: order.status as Order['status'],
          total_amount: order.total_amount,
          items: (order.items as unknown) as OrderItem[],
          tracking_number: order.tracking_number,
          created_at: order.created_at,
        })));
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'processing':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'shipped':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'delivered':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTrackingUrl = (trackingNumber: string): string => {
    const tn = trackingNumber.trim();
    // UPS: starts with 1Z
    if (/^1Z/i.test(tn)) return `https://www.ups.com/track?tracknum=${tn}`;
    // FedEx: 12-34 digits
    if (/^\d{12,34}$/.test(tn) && !(/^(94|92|93|420)\d+$/.test(tn))) return `https://www.fedex.com/fedextrack/?trknbr=${tn}`;
    // DHL: 10 digits starting with specific patterns or contains letters
    if (/^\d{10}$/.test(tn) || /^[A-Z]{2}\d{9}[A-Z]{2}$/i.test(tn)) return `https://www.dhl.com/us-en/home/tracking/tracking-parcel.html?submit=1&tracking-id=${tn}`;
    // Default USPS
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tn}`;
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: formData.displayName,
          phone: formData.phone,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profile updated successfully!");
      setProfile(prev => prev ? {
        ...prev,
        display_name: formData.displayName,
        phone: formData.phone,
      } : null);
    } catch (error: any) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate({ to: "/" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display font-bold text-2xl sm:text-3xl mb-2">
                  My Account
                </h1>
                <p className="text-muted-foreground">
                  Manage your profile, orders, and subscriptions
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {isAffiliate && (
                  <Button 
                    variant="outline" 
                    onClick={() => navigate({ to: "/affiliate" })}
                    className="w-fit"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Affiliate Dashboard
                  </Button>
                )}
                {isAdminOrManager && (
                  <Button 
                    variant="outline" 
                    onClick={() => navigate({ to: "/admin" })}
                    className="w-fit"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="w-fit"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="gap-2">
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="subscriptions" className="gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span className="hidden sm:inline">Subscriptions</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="icon-container icon-container-md">
                      <Settings className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-display font-semibold text-lg">Profile Settings</h2>
                      <p className="text-sm text-muted-foreground">Update your personal information</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={user?.email || ""}
                          disabled
                          className="pl-10 bg-muted"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="displayName"
                          type="text"
                          placeholder="Your name"
                          value={formData.displayName}
                          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
                      </div>
                    </div>

                    <Button 
                      onClick={handleSaveProfile} 
                      disabled={saving}
                      className="w-full sm:w-auto"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Change Password Section */}
                <ChangePasswordSection />

              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="icon-container icon-container-md">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-display font-semibold text-lg">Order History</h2>
                        <p className="text-sm text-muted-foreground">View your past orders and track shipments</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/orders">
                        View All
                        <ExternalLink className="ml-2 w-3 h-3" />
                      </Link>
                    </Button>
                  </div>

                  {ordersLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <Package className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                        When you make a purchase, your order history will appear here.
                      </p>
                      <Button onClick={() => navigate({ to: "/shop" })}>
                        Browse Products
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-border rounded-xl p-4 sm:p-5 hover:border-primary/30 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-sm font-medium">{order.order_number}</span>
                              <Badge className={`${getStatusColor(order.status)} gap-1`}>
                                {getStatusIcon(order.status)}
                                <span className="capitalize">{order.status}</span>
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {new Date(order.created_at).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </span>
                              <span className="font-semibold text-foreground">
                                ${order.total_amount.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="space-y-2">
                            {order.items.map((item, index) => {
                              const anyItem = item as any;
                              const displayPrice = anyItem.price
                                ? (anyItem.price * (anyItem.quantity || 1)) / 100
                                : anyItem.amount
                                ? anyItem.amount / 100
                                : 0;
                              return (
                                <div key={index} className="flex items-center gap-3 text-sm">
                                  {item.image && (
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-10 h-10 rounded-lg object-cover bg-muted"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-muted-foreground"> × {item.quantity}</span>
                                  </div>
                                  <span className="text-muted-foreground">
                                    ${displayPrice.toFixed(2)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Tracking */}
                          {order.tracking_number && (order.status === 'shipped' || order.status === 'delivered') && (
                            <div className="mt-4 pt-4 border-t border-border">
                              <a 
                                href={getTrackingUrl(order.tracking_number)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                              >
                                <Truck className="w-4 h-4" />
                                Track Package
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Subscriptions Tab */}
              <TabsContent value="subscriptions">
                <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="icon-container icon-container-md">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-display font-semibold text-lg">Subscriptions</h2>
                        <p className="text-sm text-muted-foreground">Manage your refill subscriptions</p>
                      </div>
                    </div>
                    {subscriptionData?.subscribed && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleManageSubscription}
                        disabled={portalLoading}
                      >
                        {portalLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Manage
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {subscriptionLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : subscriptionData?.subscribed ? (
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-primary/20 bg-primary/5 rounded-xl p-5"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <RefreshCw className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {(() => {
                                  const tier = resolveTier(subscriptionData.stripe_product_id, (subscriptionData.woo_subscriptions?.length ?? 0) > 0);
                                  const features = getTierFeatures(tier);
                                  return features.label;
                                })()}
                              </h3>
                              <p className="text-sm text-muted-foreground capitalize">
                                Status: {subscriptionData.subscription_status}
                              </p>
                            </div>
                          </div>
                          <SubscriberBadge
                            tier={resolveTier(subscriptionData.stripe_product_id, (subscriptionData.woo_subscriptions?.length ?? 0) > 0)}
                            features={getTierFeatures(resolveTier(subscriptionData.stripe_product_id, (subscriptionData.woo_subscriptions?.length ?? 0) > 0))}
                          />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {subscriptionData.subscription_end && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Next billing:</span>
                              <span className="font-medium">
                                {new Date(subscriptionData.subscription_end).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          )}
                          <WarrantyBadge subscribed={subscriptionData.subscribed} />
                        </div>
                      </motion.div>

                      {subscriptionData.woo_subscriptions?.length > 0 && (
                        subscriptionData.woo_subscriptions.map((ws, idx) => (
                          <motion.div
                            key={ws.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (idx + 1) * 0.1 }}
                            className="border border-primary/20 bg-primary/5 rounded-xl p-5"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Package className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{ws.product_name}</h3>
                                <p className="text-sm text-muted-foreground">WooCommerce subscription</p>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}

                      <div className="flex gap-3 pt-4">
                        <Button 
                          onClick={handleManageSubscription}
                          disabled={portalLoading}
                          variant="outline"
                          className="flex-1"
                        >
                          {portalLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          ) : (
                            <Settings className="w-4 h-4 mr-2" />
                          )}
                          Manage Subscriptions
                        </Button>
                        <Button 
                          onClick={() => navigate({ to: "/shop" })}
                          className="flex-1"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Add Subscription
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <CreditCard className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">No active subscriptions</h3>
                      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                        Subscribe to automatic refills and save 5% on every order + get lifetime warranty!
                      </p>
                      <Button onClick={() => navigate({ to: "/shop" })}>
                        Start a Subscription
                      </Button>
                    </div>
                  )}

                  {/* Subscription benefits */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <h3 className="font-medium mb-4">Subscription Benefits</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Lifetime Warranty</p>
                          <p className="text-xs text-muted-foreground">Device covered for life</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Auto-delivery</p>
                          <p className="text-xs text-muted-foreground">Never run out of refills</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Save 5%</p>
                          <p className="text-xs text-muted-foreground">On every refill order</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
