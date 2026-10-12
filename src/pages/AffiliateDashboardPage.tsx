import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Loader2,
  Copy,
  CheckCircle2,
  DollarSign,
  Users,
  Link2,
  TrendingUp,
  Clock,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

interface AffiliateData {
  id: string;
  referral_code: string;
  coupon_code: string | null;
  commission_rate: number;
  status: string;
  total_earnings: number;
  total_paid: number;
  total_referrals: number;
}

interface Referral {
  id: string;
  referral_type: string;
  amount: number | null;
  status: string;
  converted: boolean;
  conversion_date: string | null;
  created_at: string;
  order_number: string | null;
  customer_name: string | null;
}

interface Commission {
  id: string;
  amount: number;
  status: string;
  paid_date: string | null;
  payout_reference: string | null;
  notes: string | null;
  created_at: string;
  referral_id: string | null;
  order_number?: string | null;
  customer_name?: string | null;
}

export default function AffiliateDashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "referrals" | "payouts">("overview");

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate({ to: "/auth" });
        return;
      }
      await fetchAffiliateData(session.user.id, session.user.email ?? "");
    };
    init();
  }, [navigate]);

  const fetchAffiliateData = async (userId: string, userEmail: string) => {
    try {
      // First try by user_id
      let { data: affData, error: affErr } = await supabase
        .from("affiliates")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      // If not found, try matching by email and auto-link
      if (!affData && userEmail) {
        const { data: emailMatch } = await supabase
          .from("affiliates")
          .select("*")
          .eq("email", userEmail.toLowerCase())
          .is("user_id", null)
          .maybeSingle();

        if (emailMatch) {
          await supabase
            .from("affiliates")
            .update({ user_id: userId })
            .eq("id", emailMatch.id);
          affData = { ...emailMatch, user_id: userId };
        }
      }

      if (affErr || !affData) {
        setLoading(false);
        return;
      }

      // 7: Use aggregate view for totals instead of client-side computation
      const sb = supabase as any;
      const [refRes, comRes, statsRes] = await Promise.all([
        sb
          .from("referrals_affiliate_view")
          .select("id, affiliate_id, created_at, referral_type, amount, amount_cents, status, converted, conversion_date, order_id, order_number, customer_name")
          .eq("affiliate_id", affData.id)
          .order("created_at", { ascending: false })
          .limit(50),
        sb
          .from("commissions")
          .select("*")
          .eq("affiliate_id", affData.id)
          .order("created_at", { ascending: false })
          .limit(50),
        sb
          .from("affiliate_stats")
          .select("*")
          .eq("affiliate_id", affData.id)
          .maybeSingle(),
      ]);

      const refs = (refRes.data || []) as any[];
      const comms = (comRes.data || []).map((c: any) => {
        // Enrich commissions with order info from matching referral
        const matchRef = c.referral_id ? refs.find((r: any) => r.id === c.referral_id) : null;
        return {
          ...c,
          order_number: matchRef?.order_number || null,
          customer_name: matchRef?.customer_name || null,
        };
      }) as any;
      setReferrals(refs);
      setCommissions(comms);

      const stats: any = statsRes.data;
      setAffiliate({
        ...affData,
        total_earnings: Number(stats?.total_earnings) || 0,
        total_paid: Number(stats?.total_paid) || 0,
        total_referrals: Number(stats?.total_referrals) || 0,
      } as any);
    } catch (err) {
      console.error("Error loading affiliate data:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopied(null), 2000);
  };

  const referralLink = affiliate
    ? `${window.location.origin}/?ref=${affiliate.referral_code}`
    : "";

  const pendingEarnings = commissions
    .filter((c) => c.status === "pending" || c.status === "approved")
    .reduce((sum, c) => sum + c.amount, 0);

  const statusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "approved": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "pending": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "rejected": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!affiliate) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container max-w-2xl mx-auto px-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="font-display font-bold text-2xl mb-2">No Affiliate Account Found</h1>
            <p className="text-muted-foreground mb-6">
              You don't have an affiliate account yet. Contact us to join our affiliate program.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate({ to: "/account" })}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Account
              </Button>
              <Button onClick={() => navigate({ to: "/support" })}>Contact Us</Button>
            </div>
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
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/account" })} className="p-0 h-auto">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Account
                  </Button>
                </div>
                <h1 className="font-display font-bold text-2xl sm:text-3xl">Affiliate Dashboard</h1>
                <p className="text-muted-foreground">
                  Track your referrals, earnings, and payouts
                </p>
              </div>
              <Badge className={`${affiliate.status === "active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"} text-sm px-3 py-1`}>
                {affiliate.status.charAt(0).toUpperCase() + affiliate.status.slice(1)}
              </Badge>
            </div>

            {/* Referral Link Card */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-6 shadow-sm">
              <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <Link2 className="w-5 h-5 text-primary" /> Your Referral Link
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-muted rounded-lg px-4 py-3 text-sm font-mono break-all">
                  {referralLink}
                </div>
                <Button onClick={() => copyToClipboard(referralLink, "Referral link")} className="shrink-0">
                  {copied === "Referral link" ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied === "Referral link" ? "Copied!" : "Copy Link"}
                </Button>
              </div>
              {affiliate.coupon_code && (
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Coupon Code:</span>
                  <code className="bg-muted px-3 py-1.5 rounded-md text-sm font-mono font-semibold">
                    {affiliate.coupon_code}
                  </code>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(affiliate.coupon_code!, "Coupon code")}>
                    {copied === "Coupon code" ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-3">
                Commission rate: {affiliate.commission_rate}% per sale
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Referrals", value: affiliate.total_referrals, icon: Users, color: "text-blue-600" },
                { label: "Total Earnings", value: `$${affiliate.total_earnings.toFixed(2)}`, icon: TrendingUp, color: "text-emerald-600" },
                { label: "Pending", value: `$${pendingEarnings.toFixed(2)}`, icon: Clock, color: "text-yellow-600" },
                { label: "Total Paid", value: `$${affiliate.total_paid.toFixed(2)}`, icon: DollarSign, color: "text-primary" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card rounded-xl border border-border p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="font-display font-bold text-xl">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-border">
              {(["overview", "referrals", "payouts"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                <h3 className="font-display font-semibold">Recent Referrals</h3>
                {referrals.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-8 text-center">No referrals yet. Share your link to get started!</p>
                ) : (
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/50">
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Customer</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Order</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                            <th className="text-right px-4 py-3 font-medium text-muted-foreground">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {referrals.slice(0, 10).map((ref) => (
                            <tr key={ref.id} className="border-b border-border last:border-0">
                              <td className="px-4 py-3">
                                {new Date(ref.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </td>
                              <td className="px-4 py-3">{ref.customer_name || ""}</td>
                              <td className="px-4 py-3 font-mono text-xs">{ref.order_number || ""}</td>
                              <td className="px-4 py-3">
                                <Badge variant="outline" className={statusColor(ref.status)}>
                                  {ref.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-right font-medium">
                                {ref.amount ? `$${Number(ref.amount).toFixed(2)}` : ""}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "referrals" && (
              <div className="space-y-4">
                <h3 className="font-display font-semibold">All Referrals</h3>
                {referrals.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-8 text-center">No referrals yet.</p>
                ) : (
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/50">
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Customer</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Order</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Converted</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                            <th className="text-right px-4 py-3 font-medium text-muted-foreground">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {referrals.map((ref) => (
                            <tr key={ref.id} className="border-b border-border last:border-0">
                              <td className="px-4 py-3">
                                {new Date(ref.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </td>
                              <td className="px-4 py-3">{ref.customer_name || ""}</td>
                              <td className="px-4 py-3 font-mono text-xs">{ref.order_number || ""}</td>
                              <td className="px-4 py-3">
                                {ref.converted ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <Badge variant="outline" className={statusColor(ref.status)}>{ref.status}</Badge>
                              </td>
                              <td className="px-4 py-3 text-right font-medium">
                                {ref.amount ? `$${Number(ref.amount).toFixed(2)}` : ""}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "payouts" && (
              <div className="space-y-4">
                <h3 className="font-display font-semibold">Payout History</h3>
                {commissions.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-8 text-center">No commissions yet.</p>
                ) : (
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/50">
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Customer</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Order</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                            <th className="text-right px-4 py-3 font-medium text-muted-foreground">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {commissions.map((com) => (
                            <tr key={com.id} className="border-b border-border last:border-0">
                              <td className="px-4 py-3">
                                {new Date(com.paid_date || com.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </td>
                              <td className="px-4 py-3">{com.customer_name || ""}</td>
                              <td className="px-4 py-3 font-mono text-xs">{com.order_number || ""}</td>
                              <td className="px-4 py-3">
                                <Badge variant="outline" className={statusColor(com.status)}>{com.status}</Badge>
                              </td>
                              <td className="px-4 py-3 text-right font-semibold">
                                ${com.amount.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
