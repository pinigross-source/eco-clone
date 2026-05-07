import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { resolveTier, getTierFeatures } from "@/lib/subscription-tiers";
import { SubscriberBadge, WarrantyBadge } from "@/components/subscriber/SubscriberComponents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { 
  CreditCard, 
  Calendar, 
  Package, 
  Settings, 
  RefreshCw,
  LogIn,
  AlertCircle,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@/lib/link";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

export default function ManageSubscriptionPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState<EntitlementData | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        await fetchSubscriptionStatus();
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        await fetchSubscriptionStatus();
      } else {
        setSubscriptionData(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-entitlement');
      
      if (error) throw error;
      setSubscriptionData(data);
    } catch (error: any) {
      console.error('Error fetching subscription:', error);
      toast({
        title: "Error",
        description: "Failed to fetch subscription status",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchSubscriptionStatus();
    setRefreshing(false);
    toast({
      title: "Refreshed",
      description: "Subscription status updated",
    });
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
      console.error('Error opening portal:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to open subscription management portal",
        variant: "destructive",
      });
    } finally {
      setPortalLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 sm:px-6 pt-24 pb-16">
          <div className="max-w-2xl mx-auto space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 sm:px-6 pt-24 pb-16">
          <div className="max-w-lg mx-auto text-center">
            <ScrollReveal>
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <LogIn className="w-10 h-10 text-muted-foreground" />
              </div>
              <h1 className="font-display font-bold text-3xl mb-4">Sign In Required</h1>
              <p className="text-muted-foreground mb-8">
                Please sign in to view and manage your subscriptions.
              </p>
              <Button asChild size="lg">
                <Link to="/auth">Sign In</Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 sm:px-6 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2">
                  My Subscriptions
                </h1>
                <p className="text-muted-foreground">
                  View and manage your active subscriptions
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </ScrollReveal>

          {subscriptionData?.subscribed ? (
            <div className="space-y-6">
              <ScrollReveal>
                <Card className="border-primary/20 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">
                            {getTierFeatures(resolveTier(subscriptionData.stripe_product_id, (subscriptionData.woo_subscriptions?.length ?? 0) > 0)).label}
                          </CardTitle>
                          <CardDescription className="capitalize">
                            Status: {subscriptionData.subscription_status}
                          </CardDescription>
                        </div>
                      </div>
                      <SubscriberBadge
                        tier={resolveTier(subscriptionData.stripe_product_id, (subscriptionData.woo_subscriptions?.length ?? 0) > 0)}
                        features={getTierFeatures(resolveTier(subscriptionData.stripe_product_id, (subscriptionData.woo_subscriptions?.length ?? 0) > 0))}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {subscriptionData.subscription_end && (
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Next Billing Date</p>
                          <p className="font-semibold">
                            {formatDate(subscriptionData.subscription_end)}
                          </p>
                        </div>
                      </div>
                    )}

                    <WarrantyBadge subscribed={subscriptionData.subscribed} className="px-4" />

                    <div className="pt-4 border-t border-border">
                      <Button 
                        onClick={handleManageSubscription} 
                        disabled={portalLoading}
                        className="w-full sm:w-auto"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        {portalLoading ? 'Opening...' : 'Manage Subscription'}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Update payment method, change plan, or cancel subscription
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {subscriptionData.woo_subscriptions?.length > 0 && 
                subscriptionData.woo_subscriptions.map((ws) => (
                  <ScrollReveal key={ws.id}>
                    <Card className="border-primary/20 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Package className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{ws.product_name}</CardTitle>
                            <CardDescription>WooCommerce subscription</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </ScrollReveal>
                ))
              }
            </div>
          ) : (
            <ScrollReveal>
              <Card className="border-dashed">
                <CardContent className="py-12">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2">No Active Subscriptions</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      You don't have any active subscriptions yet. Subscribe to get exclusive benefits including lifetime warranty!
                    </p>
                    <Button asChild>
                      <Link to="/subscribe">
                        View Subscription Plans
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          )}

          {/* Quick Links */}
          <ScrollReveal delay={0.2}>
            <div className="mt-8 p-6 rounded-2xl bg-muted/30 border border-border">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/subscribe">Subscription Benefits</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/shop">Shop Products</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/account">Account Settings</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/support">Get Support</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Footer />
    </div>
  );
}
