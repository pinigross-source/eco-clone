import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@/lib/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  ShoppingBag, 
  ArrowRight, 
  Loader2, 
  Calendar, 
  Truck,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Order = Tables<"orders">;

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
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

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthAndFetchOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate({ to: "/auth?redirect=/orders" });
        return;
      }

      setUser(true);

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data || []);
      }
      setLoading(false);
    };

    checkAuthAndFetchOrders();
  }, [navigate]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getOrderTotal = (order: Order) => {
    // WC orders store total_amount in cents, EB orders in dollars
    if (order.order_number?.startsWith("WC-")) return order.total_amount / 100;
    return order.total_amount;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusConfig = (status: string) => {
    return statusConfig[status] || statusConfig.pending;
  };

  const getTrackingUrl = (trackingNumber: string): string => {
    const tn = trackingNumber.trim();
    if (/^1Z/i.test(tn)) return `https://www.ups.com/track?tracknum=${tn}`;
    if (/^\d{12,34}$/.test(tn) && !(/^(94|92|93|420)\d+$/.test(tn))) return `https://www.fedex.com/fedextrack/?trknbr=${tn}`;
    if (/^\d{10}$/.test(tn) || /^[A-Z]{2}\d{9}[A-Z]{2}$/i.test(tn)) return `https://www.dhl.com/us-en/home/tracking/tracking-parcel.html?submit=1&tracking-id=${tn}`;
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tn}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container flex items-center justify-center min-h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">
                  Order History
                </h1>
                <p className="text-muted-foreground">
                  View and track your past orders
                </p>
              </div>
              <Button asChild variant="outline">
                <Link to="/account">
                  Back to Account
                </Link>
              </Button>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-2xl">
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't placed any orders. Start shopping to see your orders here.
                </p>
                <Button asChild variant="hero">
                  <Link to="/shop">
                    Browse Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, index) => {
                  const status = getStatusConfig(order.status);
                  const items = (Array.isArray(order.items) ? order.items : []) as unknown as OrderItem[];
                  
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-card border border-border rounded-xl overflow-hidden"
                    >
                      {/* Order Header */}
                      <div className="p-4 md:p-6 border-b border-border bg-muted/30">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="hidden sm:flex w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
                              <Package className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-lg">{order.order_number}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {formatDate(order.created_at)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant="outline" 
                              className={`${status.color} flex items-center gap-1`}
                            >
                              {status.icon}
                              {status.label}
                            </Badge>
                            <span className="font-bold text-lg text-primary">
                              {formatPrice(getOrderTotal(order))}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-4 md:p-6">
                        <div className="space-y-3">
                          {items.length > 0 ? (
                            items.map((item, itemIndex) => {
                              const anyItem = item as any;
                              const isWC = order.order_number?.startsWith("WC-");
                              const displayPrice = anyItem.price
                                ? (anyItem.price * (anyItem.quantity || 1)) / 100
                                : anyItem.amount
                                ? anyItem.amount / 100
                                : isWC
                                ? order.total_amount / 100
                                : 0;
                              return (
                                <div 
                                  key={itemIndex} 
                                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                      <Package className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{item.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        Qty: {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="font-medium">
                                    {formatPrice(displayPrice)}
                                  </span>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              Order details not available
                            </p>
                          )}
                        </div>

                        {order.tracking_number && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="flex items-center gap-2 text-sm">
                              <Truck className="w-4 h-4 text-primary" />
                              <span className="text-muted-foreground">Tracking:</span>
                              <a 
                                href={getTrackingUrl(order.tracking_number)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono font-medium text-primary hover:underline"
                              >
                                {order.tracking_number}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
