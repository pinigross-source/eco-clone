import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { toast } from "sonner";
import {
  Loader2,
  Search,
  RefreshCw,
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  Users,
  ExternalLink,
  Copy,
  TrendingUp,
  Upload,
  FileText,
  AlertCircle,
  Download,
  
} from "lucide-react";

interface Affiliate {
  id: string;
  affiliate_number: number | null;
  first_name: string;
  last_name: string;
  email: string;
  referral_code: string;
  coupon_code: string | null;
  commission_rate: number;
  status: string;
  total_earnings: number;
  total_paid: number;
  total_referrals: number;
  payment_method: string | null;
  website_url: string | null;
  created_at: string;
}

interface Commission {
  id: string;
  affiliate_id: string;
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

const getCommissionReference = (commission: Commission) => {
  return commission.payout_reference || commission.notes || "—";
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  inactive: "bg-muted text-muted-foreground",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  approved: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  paid: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

export function AffiliateManagementSection() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Detail dialog
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [affiliateCommissions, setAffiliateCommissions] = useState<Commission[]>([]);
  const [affiliateCommissionsLoading, setAffiliateCommissionsLoading] = useState(false);
  const [selectedCommissionIds, setSelectedCommissionIds] = useState<Set<string>>(new Set());

  // Payout dialog
  const [payoutOpen, setPayoutOpen] = useState(false);
  const [payoutAffiliate, setPayoutAffiliate] = useState<Affiliate | null>(null);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutReference, setPayoutReference] = useState("");
  const [payoutNotes, setPayoutNotes] = useState("");
  const [payoutProcessing, setPayoutProcessing] = useState(false);

  // Import dialog
  const [importOpen, setImportOpen] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [importMode, setImportMode] = useState<"csv" | "json">("csv");
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvPreview, setCsvPreview] = useState<Record<string, string>[]>([]);
  const [importProcessing, setImportProcessing] = useState(false);
  const [importResults, setImportResults] = useState<{
    success?: boolean;
    dry_run?: boolean;
    imported?: number;
    would_import?: number;
    skipped?: number;
    would_skip?: number;
    errors?: { index: number; email: string; reason: string }[];
  } | null>(null);

  useEffect(() => {
    fetchAffiliates();
  }, []);

  useEffect(() => {
    if (!detailOpen || !selectedAffiliate) return;

    void loadAffiliateCommissions(selectedAffiliate.id);
  }, [detailOpen, selectedAffiliate?.id]);

  const fetchAffiliates = async () => {
    setLoading(true);
    try {
      // 7: Use aggregate view instead of fetching all commissions client-side
      const [affRes, statsRes, comRes] = await Promise.all([
        supabase
          .from("affiliates")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("affiliate_stats")
          .select("*"),
        supabase
          .from("commissions")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (affRes.error) throw affRes.error;

      const allCommissions = (comRes.data || []) as any;
      setCommissions(allCommissions);

      // Build a lookup from the stats view
      const statsMap = new Map<string, { total_earnings: number; total_paid: number; total_referrals: number }>();
      (statsRes.data || []).forEach((s: any) => {
        statsMap.set(s.affiliate_id, {
          total_earnings: Number(s.total_earnings) || 0,
          total_paid: Number(s.total_paid) || 0,
          total_referrals: Number(s.total_referrals) || 0,
        });
      });

      const affiliatesWithDerivedTotals = (affRes.data || []).map((a: any) => {
        const stats = statsMap.get(a.id) || { total_earnings: 0, total_paid: 0, total_referrals: 0 };
        return {
          ...a,
          total_earnings: (stats as any).total_earnings,
          total_paid: (stats as any).total_paid,
          total_referrals: (stats as any).total_referrals,
        };
      });

      setAffiliates(affiliatesWithDerivedTotals as Affiliate[]);
    } catch (err) {
      console.error("Error fetching affiliates:", err);
      toast.error("Failed to load affiliates");
    } finally {
      setLoading(false);
    }
  };

  const sendAffiliateNotification = async (
    type: "application_approved" | "application_rejected" | "commission_paid",
    affiliate: Affiliate,
    payout?: { amount: number; reference?: string }
  ) => {
    try {
      await supabase.functions.invoke("send-affiliate-notification", {
        body: {
          type,
          affiliate: {
            first_name: affiliate.first_name,
            last_name: affiliate.last_name,
            email: affiliate.email,
            referral_code: affiliate.referral_code,
            commission_rate: affiliate.commission_rate,
          },
          payout,
        },
      });
    } catch (err) {
      console.error("Failed to send affiliate notification:", err);
      // Don't block the main action if notification fails
    }
  };

  const updateAffiliateStatus = async (id: string, status: "active" | "inactive" | "pending" | "rejected") => {
    try {
      const { error } = await supabase
        .from("affiliates")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      toast.success(`Affiliate status updated to ${status}`);

      // Send notification email for approval/rejection
      const affiliate = affiliates.find((a) => a.id === id);
      if (affiliate && status === "active") {
        sendAffiliateNotification("application_approved", affiliate);
      } else if (affiliate && status === "rejected") {
        sendAffiliateNotification("application_rejected", affiliate);
      }

      fetchAffiliates();
    } catch (err) {
      console.error("Error updating affiliate:", err);
      toast.error("Failed to update affiliate status");
    }
  };

  const loadAffiliateCommissions = async (affiliateId: string) => {
    setAffiliateCommissionsLoading(true);
    try {
      const { data, error } = await supabase
        .from("commissions")
        .select(`
          *,
          referral:referrals_affiliate_view!commissions_referral_id_fkey (
            order_number,
            customer_name
          )
        `)
        .eq("affiliate_id", affiliateId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const enriched = (data || []).map((c: any) => {
        const referral = Array.isArray(c.referral) ? c.referral[0] : c.referral;

        return {
          ...c,
          order_number: referral?.order_number || null,
          customer_name: referral?.customer_name || null,
        };
      });

      setAffiliateCommissions(enriched as any);
    } catch (err) {
      console.error("Error loading affiliate commission details:", err);
      toast.error("Failed to load commission details");
      setAffiliateCommissions([]);
    } finally {
      setAffiliateCommissionsLoading(false);
    }
  };

  const openDetail = (affiliate: Affiliate) => {
    setSelectedAffiliate(affiliate);
    setSelectedCommissionIds(new Set());
    setDetailOpen(true);
  };

  const toggleCommissionSelection = useCallback((id: string) => {
    setSelectedCommissionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAllCommissions = useCallback(() => {
    setSelectedCommissionIds((prev) => {
      if (prev.size === affiliateCommissions.length) return new Set();
      return new Set(affiliateCommissions.map((c) => c.id));
    });
  }, [affiliateCommissions]);

  const downloadCommissionsExcel = useCallback(() => {
    const toExport = selectedCommissionIds.size > 0
      ? affiliateCommissions.filter((c) => selectedCommissionIds.has(c.id))
      : affiliateCommissions;

    if (toExport.length === 0) {
      toast.error("No commissions to download");
      return;
    }

    const headers = ["Date", "Customer", "Order", "Reference", "Status", "Amount"];
    const csvRows = [headers.join(",")];
    for (const c of toExport) {
      csvRows.push([
        `"${formatDate(c.paid_date || c.created_at)}"`,
        `"${(c.customer_name || "—").replace(/"/g, '""')}"`,
        `"${c.order_number || "—"}"`,
        `"${getCommissionReference(c).replace(/"/g, '""')}"`,
        `"${c.status}"`,
        `"$${c.amount.toFixed(2)}"`,
      ].join(","));
    }

    const affiliateName = selectedAffiliate
      ? `${selectedAffiliate.first_name}_${selectedAffiliate.last_name}`.replace(/\s+/g, "_")
      : "affiliate";

    const blob = new Blob(["\uFEFF" + csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `commissions_${affiliateName}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${toExport.length} commission(s)`);
  }, [affiliateCommissions, selectedCommissionIds, selectedAffiliate]);

  const openPayoutDialog = (affiliate: Affiliate) => {
    setPayoutAffiliate(affiliate);
    const unpaid = affiliate.total_earnings - affiliate.total_paid;
    setPayoutAmount(unpaid > 0 ? unpaid.toFixed(2) : "0.00");
    setPayoutReference("");
    setPayoutNotes("");
    setPayoutOpen(true);
  };

  const processPayout = async () => {
    if (!payoutAffiliate || !payoutAmount) return;
    const amount = parseFloat(payoutAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Enter a valid payout amount");
      return;
    }

    setPayoutProcessing(true);
    try {
      // Create a paid commission record
      const { error: comErr } = await (supabase as any).from("commissions").insert({
        affiliate_id: payoutAffiliate.id,
        amount,
        status: "paid",
        paid_date: new Date().toISOString(),
        payout_reference: payoutReference || null,
        notes: payoutNotes || `Manual payout`,
      });
      if (comErr) throw comErr;

      // Update affiliate total_paid
      const { error: affErr } = await supabase
        .from("affiliates")
        .update({ total_paid: payoutAffiliate.total_paid + amount })
        .eq("id", payoutAffiliate.id);
      if (affErr) throw affErr;

      toast.success(`Payout of $${amount.toFixed(2)} recorded`);
      sendAffiliateNotification("commission_paid", payoutAffiliate, {
        amount,
        reference: payoutReference || undefined,
      });
      setPayoutOpen(false);
      fetchAffiliates();
    } catch (err) {
      console.error("Payout error:", err);
      toast.error("Failed to process payout");
    } finally {
      setPayoutProcessing(false);
    }
  };

  const updateCommissionStatus = async (commissionId: string, status: string) => {
    try {
      const update: Record<string, unknown> = { status };
      if (status === "paid") {
        update.paid_date = new Date().toISOString();
      }
      const { error } = await supabase
        .from("commissions")
        .update(update)
        .eq("id", commissionId);

      if (error) throw error;
      toast.success(`Commission ${status}`);

      // Refresh commission list for detail view
      if (selectedAffiliate) {
        await loadAffiliateCommissions(selectedAffiliate.id);
      }
      fetchAffiliates();
    } catch (err) {
      console.error("Error updating commission:", err);
      toast.error("Failed to update commission");
    }
  };

  const parseCSV = (text: string): Record<string, string>[] => {
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) return [];
    
    // Parse header row
    const headers = parseCSVLine(lines[0]);
    setCsvHeaders(headers);
    
    const rows: Record<string, string>[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => {
        row[h.trim().toLowerCase().replace(/\s+/g, "_")] = (values[idx] || "").trim();
      });
      rows.push(row);
    }
    return rows;
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        result.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    result.push(current);
    return result;
  };

  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const rows = parseCSV(text);
      setCsvPreview(rows.slice(0, 5));
      
      // Convert to JSON for the import function
      const mapped = rows.map((row) => ({
        first_name: row.first_name || row.firstname || row.name?.split(" ")[0] || "",
        last_name: row.last_name || row.lastname || row.name?.split(" ").slice(1).join(" ") || "",
        email: row.email || row.email_address || "",
        referral_code: row.referral_code || row.code || "",
        coupon_code: row.coupon_code || row.coupon || "",
        commission_rate: row.commission_rate ? parseFloat(row.commission_rate) : undefined,
        status: row.status || "active",
        website_url: row.website_url || row.website || "",
        payment_method: row.payment_method || "bank_transfer",
        total_earnings: row.total_earnings ? parseFloat(row.total_earnings) : 0,
        total_paid: row.total_paid ? parseFloat(row.total_paid) : 0,
        total_referrals: row.total_referrals ? parseInt(row.total_referrals) : 0,
        slicewp_id: row.slicewp_id || row.id || "",
        notes: row.notes || "",
      }));
      
      setImportJson(JSON.stringify(mapped, null, 2));
    };
    reader.readAsText(file);
  };

  const runImport = async (dryRun: boolean) => {
    let parsed: unknown[];
    try {
      parsed = JSON.parse(importJson);
      if (!Array.isArray(parsed)) throw new Error("Must be an array");
    } catch {
      toast.error("Invalid data. Check your CSV or JSON format.");
      return;
    }

    setImportProcessing(true);
    setImportResults(null);
    try {
      const { data, error } = await supabase.functions.invoke("import-slicewp-affiliates", {
        body: { affiliates: parsed, dry_run: dryRun },
      });

      if (error) throw error;
      setImportResults(data);

      if (!dryRun && data?.success) {
        toast.success(`Imported ${data.imported} affiliates`);
        fetchAffiliates();
      }
    } catch (err: any) {
      console.error("Import error:", err);
      toast.error(err.message || "Import failed");
    } finally {
      setImportProcessing(false);
    }
  };

  const filteredAffiliates = affiliates.filter((a) => {
    const matchesSearch =
      `${a.first_name} ${a.last_name} ${a.email} ${a.referral_code}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalActiveAffiliates = affiliates.filter((a) => a.status === "active").length;
  const totalPendingAffiliates = affiliates.filter((a) => a.status === "pending").length;
  const totalEarnings = affiliates.reduce((s, a) => s + a.total_earnings, 0);
  const totalPaid = affiliates.reduce((s, a) => s + a.total_paid, 0);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active", value: totalActiveAffiliates, icon: Users, color: "text-emerald-600" },
          { label: "Pending", value: totalPendingAffiliates, icon: Clock, color: "text-yellow-600" },
          { label: "Total Earnings", value: `$${totalEarnings.toFixed(2)}`, icon: TrendingUp, color: "text-blue-600" },
          { label: "Total Paid", value: `$${totalPaid.toFixed(2)}`, icon: DollarSign, color: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-1">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="font-display font-bold text-xl">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search affiliates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={fetchAffiliates}>
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh
        </Button>
        <Button variant="outline" onClick={() => { setImportOpen(true); setImportResults(null); setImportJson(""); setImportMode("csv"); setCsvPreview([]); setCsvHeaders([]); }}>
          <Upload className="w-4 h-4 mr-2" /> Import Affiliates
        </Button>
        <Button variant="outline" onClick={() => {
          if (!affiliates.length) { toast.error("No affiliates to export"); return; }
          const headers = ["first_name","last_name","email","referral_code","coupon_code","commission_rate","status","total_earnings","total_paid","total_referrals","payment_method","website_url","created_at"];
          const csvRows = [headers.join(",")];
          affiliates.forEach(a => {
            csvRows.push(headers.map(h => {
              const val = (a as any)[h];
              const str = val == null ? "" : String(val);
              return str.includes(",") || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
            }).join(","));
          });
          const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `affiliates-export-${new Date().toISOString().slice(0,10)}.csv`;
          link.click();
          URL.revokeObjectURL(url);
          toast.success(`Exported ${affiliates.length} affiliates`);
        }}>
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Affiliates Table */}
      {filteredAffiliates.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No affiliates found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">ID</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Affiliate</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Sharing URL</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Referrals</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Earnings</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Unpaid</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAffiliates.map((a) => {
                const unpaid = a.total_earnings - a.total_paid;
                return (
                  <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono font-semibold">{a.affiliate_number ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="font-medium">{a.first_name} {a.last_name}</span>
                        <p className="text-xs text-muted-foreground">{a.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <code className="text-xs bg-muted px-2 py-1 rounded truncate max-w-[260px]">
                          {`https://envirobiotics.com/aff/${a.affiliate_number ?? ""}/`}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 shrink-0"
                          onClick={() => {
                            navigator.clipboard.writeText(`https://envirobiotics.com/aff/${a.affiliate_number ?? ""}/`);
                            toast.success("Sharing URL copied!");
                          }}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={statusColors[a.status] || ""}>
                        {a.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">{a.total_referrals}</td>
                    <td className="px-4 py-3 text-right font-medium">${a.total_earnings.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      {unpaid > 0 ? (
                        <span className="text-yellow-600 font-medium">${unpaid.toFixed(2)}</span>
                      ) : (
                        <span className="text-muted-foreground">$0.00</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" onClick={() => openDetail(a)}>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                        {a.status === "pending" && (
                          <>
                            <Button size="sm" variant="ghost" className="text-emerald-600" onClick={() => updateAffiliateStatus(a.id, "active")}>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => updateAffiliateStatus(a.id, "rejected")}>
                              <XCircle className="w-3.5 h-3.5" />
                            </Button>
                          </>
                        )}
                        {a.status === "active" && unpaid > 0 && (
                          <Button size="sm" variant="outline" onClick={() => openPayoutDialog(a)}>
                            <DollarSign className="w-3.5 h-3.5 mr-1" /> Pay
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open);

          if (!open) {
            setAffiliateCommissions([]);
            setAffiliateCommissionsLoading(false);
            setSelectedAffiliate(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedAffiliate && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedAffiliate.first_name} {selectedAffiliate.last_name}
                </DialogTitle>
                <DialogDescription>{selectedAffiliate.email}</DialogDescription>
              </DialogHeader>

              {/* Sharing URL Block */}
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                <Label className="text-xs text-muted-foreground mb-1 block">Affiliate ID</Label>
                <p className="font-mono font-semibold text-lg mb-3">{selectedAffiliate.affiliate_number ?? "—"}</p>
                <Label className="text-xs text-muted-foreground mb-1 block">Sharing URL</Label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm bg-background px-3 py-2 rounded border border-border break-all">
                    {`https://envirobiotics.com/aff/${selectedAffiliate.affiliate_number ?? ""}/`}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://envirobiotics.com/aff/${selectedAffiliate.affiliate_number ?? ""}/`);
                      toast.success("Sharing URL copied!");
                    }}
                  >
                    <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Referral Code</Label>
                  <p className="font-mono font-semibold">{selectedAffiliate.referral_code}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Coupon Code</Label>
                  <p className="font-mono">{selectedAffiliate.coupon_code || "—"}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Commission Rate</Label>
                  <p>{selectedAffiliate.commission_rate}%</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Payment Method</Label>
                  <p className="capitalize">{selectedAffiliate.payment_method?.replace("_", " ") || "—"}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    <Select
                      value={selectedAffiliate.status}
                      onValueChange={(v: "active" | "inactive" | "pending" | "rejected") => {
                        updateAffiliateStatus(selectedAffiliate.id, v);
                        setSelectedAffiliate({ ...selectedAffiliate, status: v });
                      }}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Joined</Label>
                  <p>{formatDate(selectedAffiliate.created_at)}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Commission History</h4>
                  {affiliateCommissions.length > 0 && !affiliateCommissionsLoading && (
                    <Button variant="outline" size="sm" onClick={downloadCommissionsExcel}>
                      <Download className="w-4 h-4 mr-2" />
                      Download {selectedCommissionIds.size > 0 ? `(${selectedCommissionIds.size})` : "All"}
                    </Button>
                  )}
                </div>
                {affiliateCommissionsLoading ? (
                  <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
                    Loading commission details...
                  </div>
                ) : affiliateCommissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No commissions yet</p>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="px-3 py-2 w-8">
                            <Checkbox
                              checked={selectedCommissionIds.size === affiliateCommissions.length && affiliateCommissions.length > 0}
                              onCheckedChange={toggleAllCommissions}
                            />
                          </th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground">Date</th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground">Customer</th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground">Order</th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground">Reference</th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground">Status</th>
                          <th className="text-right px-3 py-2 font-medium text-muted-foreground">Amount</th>
                          <th className="text-right px-3 py-2 font-medium text-muted-foreground">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {affiliateCommissions.map((c) => (
                          <tr key={c.id} className="border-b border-border last:border-0">
                            <td className="px-3 py-2">
                              <Checkbox
                                checked={selectedCommissionIds.has(c.id)}
                                onCheckedChange={() => toggleCommissionSelection(c.id)}
                              />
                            </td>
                            <td className="px-3 py-2">{formatDate(c.paid_date || c.created_at)}</td>
                            <td className="px-3 py-2">{c.customer_name || "—"}</td>
                            <td className="px-3 py-2 font-mono text-xs">{c.order_number || "—"}</td>
                            <td className="px-3 py-2 max-w-[260px] text-xs text-muted-foreground align-top">
                              <span className="block whitespace-normal break-words">{getCommissionReference(c)}</span>
                            </td>
                            <td className="px-3 py-2">
                              <Badge variant="outline" className={statusColors[c.status] || ""}>
                                {c.status}
                              </Badge>
                            </td>
                            <td className="px-3 py-2 text-right font-medium">${c.amount.toFixed(2)}</td>
                            <td className="px-3 py-2 text-right">
                              {c.status === "pending" && (
                                <div className="flex gap-1 justify-end">
                                  <Button size="sm" variant="ghost" className="h-7 text-xs text-emerald-600" onClick={() => updateCommissionStatus(c.id, "approved")}>
                                    Approve
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive" onClick={() => updateCommissionStatus(c.id, "rejected")}>
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {c.status === "approved" && (
                                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => updateCommissionStatus(c.id, "paid")}>
                                  Mark Paid
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <DialogFooter>
                {selectedAffiliate.status === "active" && selectedAffiliate.total_earnings - selectedAffiliate.total_paid > 0 && (
                  <Button onClick={() => { setDetailOpen(false); openPayoutDialog(selectedAffiliate); }}>
                    <DollarSign className="w-4 h-4 mr-2" /> Process Payout
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Payout Dialog */}
      <Dialog open={payoutOpen} onOpenChange={setPayoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Process Payout
            </DialogTitle>
            <DialogDescription>
              Record a payout for {payoutAffiliate?.first_name} {payoutAffiliate?.last_name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Amount ($)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Payment Reference (optional)</Label>
              <Input
                placeholder="e.g., PayPal transaction ID"
                value={payoutReference}
                onChange={(e) => setPayoutReference(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Notes (optional)</Label>
              <Textarea
                placeholder="Any notes about this payout"
                value={payoutNotes}
                onChange={(e) => setPayoutNotes(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPayoutOpen(false)}>Cancel</Button>
            <Button onClick={processPayout} disabled={payoutProcessing}>
              {payoutProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Confirm Payout
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Import Dialog */}
      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Import Affiliates
            </DialogTitle>
            <DialogDescription>
              Upload a CSV file or paste JSON to import affiliates. CSV columns should include: first_name, last_name, email. Optional: referral_code, commission_rate, status, total_earnings, etc.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Mode toggle */}
            <div className="flex gap-2">
              <Button
                variant={importMode === "csv" ? "default" : "outline"}
                size="sm"
                onClick={() => setImportMode("csv")}
              >
                <FileText className="w-4 h-4 mr-1" /> CSV File
              </Button>
              <Button
                variant={importMode === "json" ? "default" : "outline"}
                size="sm"
                onClick={() => setImportMode("json")}
              >
                <FileText className="w-4 h-4 mr-1" /> JSON
              </Button>
            </div>

            {importMode === "csv" ? (
              <div className="space-y-3">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <Label htmlFor="csv-upload" className="cursor-pointer text-sm text-primary hover:underline">
                    Click to upload CSV file
                  </Label>
                  <Input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleCsvFileUpload}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Expected headers: first_name, last_name, email, referral_code, commission_rate, status
                  </p>
                </div>

                {csvPreview.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Preview ({csvPreview.length} of {JSON.parse(importJson).length} rows)
                    </h4>
                    <div className="overflow-x-auto rounded-lg border border-border">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-muted/50 border-b border-border">
                            {Object.keys(csvPreview[0]).slice(0, 5).map((h) => (
                              <th key={h} className="text-left px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {csvPreview.map((row, i) => (
                            <tr key={i} className="border-b border-border last:border-0">
                              {Object.values(row).slice(0, 5).map((v, j) => (
                                <td key={j} className="px-3 py-2 whitespace-nowrap max-w-[150px] truncate">
                                  {String(v)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-muted rounded-lg p-3 text-xs font-mono">
                  <p className="text-muted-foreground mb-1">Example format:</p>
                  {`[{"first_name":"Jane","last_name":"Doe","email":"jane@example.com","commission_rate":15,"status":"active"}]`}
                </div>
                <Textarea
                  placeholder="Paste JSON array here..."
                  value={importJson}
                  onChange={(e) => setImportJson(e.target.value)}
                  rows={8}
                  className="font-mono text-xs"
                />
              </div>
            )}

            {importResults && (
              <div className="rounded-lg border border-border p-4 space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {importResults.dry_run ? "Preview Results" : "Import Results"}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Would import:</span>
                  <span className="font-medium">{importResults.would_import ?? importResults.imported}</span>
                  <span className="text-muted-foreground">Skipped:</span>
                  <span className="font-medium">{importResults.would_skip ?? importResults.skipped}</span>
                </div>
                {importResults.errors && importResults.errors.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-destructive flex items-center gap-1 mb-1">
                      <AlertCircle className="w-3 h-3" /> Errors:
                    </p>
                    <div className="max-h-32 overflow-y-auto text-xs space-y-1">
                      {importResults.errors.map((e, i) => (
                        <p key={i} className="text-muted-foreground">
                          Row {e.index}: {e.email} — {e.reason}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setImportOpen(false)}>Cancel</Button>
            <Button variant="outline" onClick={() => runImport(true)} disabled={importProcessing || !importJson.trim()}>
              {importProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
              Dry Run
            </Button>
            <Button onClick={() => runImport(false)} disabled={importProcessing || !importJson.trim()}>
              {importProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
