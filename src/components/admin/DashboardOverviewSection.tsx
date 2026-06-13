import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  Package,
  TrendingUp,
  ShoppingCart,
  Users,
  Repeat,
  Loader2,
  CalendarIcon,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import * as XLSX from "xlsx";
import type { DateRange as DayPickerRange } from "react-day-picker";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  format,
  subDays,
  startOfDay,
  endOfDay,
  isAfter,
  isBefore,
  startOfMonth,
  endOfMonth,
  subMonths,
  startOfYear,
  endOfYear,
  subYears,
} from "date-fns";

type DateRange =
  | "7d"
  | "30d"
  | "90d"
  | "this_month"
  | "last_month"
  | "this_year"
  | "last_year"
  | "all"
  | "custom";

interface OrderRow {
  id: string;
  total_amount: number;
  items: unknown;
  status: string;
  created_at: string;
  order_number: string;
}

// WC orders store total_amount in cents, EB orders in dollars
const normalizeTotalDollars = (o: OrderRow): number => {
  if (o.order_number?.startsWith("WC-")) return o.total_amount / 100;
  return o.total_amount;
};

// Stripe invoice artifact pattern: "N × Product (at $X / every Y)"
const isInvoiceArtifact = (name: string): boolean =>
  /^\d+\s*×\s*.+\(at \$/.test(name);

const PIE_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2, 160 60% 45%))",
  "hsl(var(--chart-3, 30 80% 55%))",
  "hsl(var(--chart-4, 280 65% 60%))",
  "hsl(var(--chart-5, 200 70% 50%))",
  "hsl(var(--muted-foreground))",
];

export function DashboardOverviewSection() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<DateRange>("30d");
  const [customRange, setCustomRange] = useState<DayPickerRange | undefined>();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("id, total_amount, items, status, created_at, order_number, user_id")
      .gte("created_at", "2026-02-08T00:00:00Z")
      .order("created_at", { ascending: true });

    if (!error && data) setOrders(data);
    setLoading(false);
  };

  // ── Compute date window {from, to} based on range selection ──
  const dateWindow = useMemo<{ from: Date | null; to: Date | null }>(() => {
    const now = new Date();
    switch (range) {
      case "all":
        return { from: null, to: null };
      case "7d":
        return { from: startOfDay(subDays(now, 7)), to: null };
      case "30d":
        return { from: startOfDay(subDays(now, 30)), to: null };
      case "90d":
        return { from: startOfDay(subDays(now, 90)), to: null };
      case "this_month":
        return { from: startOfMonth(now), to: endOfMonth(now) };
      case "last_month": {
        const lm = subMonths(now, 1);
        return { from: startOfMonth(lm), to: endOfMonth(lm) };
      }
      case "this_year":
        return { from: startOfYear(now), to: endOfYear(now) };
      case "last_year": {
        const ly = subYears(now, 1);
        return { from: startOfYear(ly), to: endOfYear(ly) };
      }
      case "custom":
        return {
          from: customRange?.from ? startOfDay(customRange.from) : null,
          to: customRange?.to ? endOfDay(customRange.to) : null,
        };
      default:
        return { from: null, to: null };
    }
  }, [range, customRange]);

  const filtered = useMemo(() => {
    const { from, to } = dateWindow;
    const dateFiltered = orders.filter((o) => {
      const d = new Date(o.created_at);
      if (from && !isAfter(d, from)) return false;
      if (to && !isBefore(d, to)) return false;
      return true;
    });
    return dateFiltered.filter((o) => o.total_amount >= 10);
  }, [orders, dateWindow]);

  // ── KPI cards ──
  const totalRevenue = filtered.reduce((s, o) => s + normalizeTotalDollars(o), 0);
  const orderCount = filtered.length;
  const avgOrder = orderCount ? totalRevenue / orderCount : 0;
  const cancelledCount = filtered.filter((o) => o.status === "cancelled").length;
  const activeCount = orderCount - cancelledCount;

  // New subscribers in window: unique users whose order contains a recurring item
  const newSubscribers = useMemo(() => {
    const users = new Set<string>();
    filtered.forEach((o: any) => {
      const items = Array.isArray(o.items) ? o.items : [];
      const hasRecurring = items.some((it: any) => it?.recurring === true);
      if (hasRecurring && o.user_id) users.add(o.user_id);
    });
    return users.size;
  }, [filtered]);

  // ── Revenue over time (group by day) ──
  const revenueByDay = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((o) => {
      const day = format(new Date(o.created_at), "MMM d");
      map.set(day, (map.get(day) || 0) + normalizeTotalDollars(o));
    });
    return Array.from(map, ([date, revenue]) => ({ date, revenue: +revenue.toFixed(2) }));
  }, [filtered]);

  // ── Orders by status ──
  const statusCounts = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((o) => map.set(o.status, (map.get(o.status) || 0) + 1));
    return Array.from(map, ([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));
  }, [filtered]);

  // ── Top products ──
  // "Units Sold" = number of subscription plans or item orders (not raw quantity sums)
  const topProducts = useMemo(() => {
    const map = new Map<string, { qty: number; rev: number }>();
    filtered.forEach((o) => {
      const items = Array.isArray(o.items) ? o.items : [];
      const hasAmounts = items.some((item: any) => item.amount != null);
      const isWC = o.order_number?.startsWith("WC-");
      items.forEach((item: any) => {
        const name: string = item.name || item.description || "Unknown";
        // Skip shipping & Stripe invoice artifacts (e.g. "12 × Product (at $X / every 6 months)")
        if (/shipping|delivery|freight/i.test(name)) return;
        if (isInvoiceArtifact(name)) return;
        const prev = map.get(name) || { qty: 0, rev: 0 };
        const qty = item.quantity || 1;
        let lineRev: number;
        if (hasAmounts) {
          lineRev = (item.amount ?? 0) / 100;
        } else if (isWC) {
          // WC: total_amount is in cents, distribute among non-shipping items
          const nonShipping = items.filter((i: any) => !/shipping|delivery|freight/i.test(i.name || ""));
          lineRev = (o.total_amount / 100) / (nonShipping.length || 1);
        } else {
          const nonShipping = items.filter((i: any) => !/shipping|delivery|freight/i.test(i.name || ""));
          lineRev = o.total_amount / (nonShipping.length || 1);
        }
        map.set(name, { qty: prev.qty + qty, rev: prev.rev + lineRev });
      });
    });
    return Array.from(map, ([name, { qty, rev }]) => ({ name, qty, rev: +rev.toFixed(2) }))
      .sort((a, b) => b.rev - a.rev)
      .slice(0, 8);
  }, [filtered]);

  // ── Orders per day (bar chart) ──
  const ordersPerDay = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((o) => {
      const day = format(new Date(o.created_at), "MMM d");
      map.set(day, (map.get(day) || 0) + 1);
    });
    return Array.from(map, ([date, count]) => ({ date, count }));
  }, [filtered]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  const handleExportExcel = () => {
    const periodLabel =
      (dateWindow.from ? format(dateWindow.from, "yyyy-MM-dd") : "start") +
      "_to_" +
      (dateWindow.to ? format(dateWindow.to, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"));

    const wb = XLSX.utils.book_new();

    // Summary sheet (KPIs)
    const summaryRows = [
      ["Dashboard Overview Report"],
      ["Period", periodLabel.replace(/_/g, " ")],
      [],
      ["Metric", "Value"],
      ["Total Revenue", totalRevenue],
      ["Order Count", orderCount],
      ["Average Order Value", +avgOrder.toFixed(2)],
      ["Active Orders", activeCount],
      ["Cancelled Orders", cancelledCount],
      ["New Subscribers", newSubscribers],
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows);
    wsSummary["!cols"] = [{ wch: 28 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");

    // Top Products sheet
    const productsRows = [
      ["#", "Product", "Plans / Units Sold", "Avg. Price", "Revenue"],
      ...topProducts.map((p, i) => [
        i + 1,
        p.name,
        p.qty,
        p.qty > 0 ? +(p.rev / p.qty).toFixed(2) : 0,
        p.rev,
      ]),
    ];
    const wsProducts = XLSX.utils.aoa_to_sheet(productsRows);
    wsProducts["!cols"] = [{ wch: 5 }, { wch: 45 }, { wch: 20 }, { wch: 14 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(wb, wsProducts, "Top Products");

    // Orders sheet
    const orderRows = [
      ["Order Number", "Date", "Status", "Total ($)"],
      ...filtered.map((o) => [
        o.order_number,
        format(new Date(o.created_at), "yyyy-MM-dd HH:mm"),
        o.status,
        +normalizeTotalDollars(o).toFixed(2),
      ]),
    ];
    const wsOrders = XLSX.utils.aoa_to_sheet(orderRows);
    wsOrders["!cols"] = [{ wch: 22 }, { wch: 18 }, { wch: 14 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, wsOrders, "Orders");

    XLSX.writeFile(wb, `dashboard_${periodLabel}.xlsx`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date range selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Dashboard Overview</h2>
          {(dateWindow.from || dateWindow.to) && (
            <p className="text-xs text-muted-foreground mt-1">
              {dateWindow.from ? format(dateWindow.from, "MMM d, yyyy") : "Start"}
              {" → "}
              {dateWindow.to ? format(dateWindow.to, "MMM d, yyyy") : "Today"}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportExcel} className="gap-2">
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
          <Select value={range} onValueChange={(v) => setRange(v as DateRange)}>
            <SelectTrigger className="w-[170px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="this_month">This month</SelectItem>
              <SelectItem value="last_month">Last month</SelectItem>
              <SelectItem value="this_year">This year</SelectItem>
              <SelectItem value="last_year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="custom">Custom range…</SelectItem>
            </SelectContent>
          </Select>

          {range === "custom" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal gap-2",
                    !customRange?.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="w-4 h-4" />
                  {customRange?.from ? (
                    customRange.to ? (
                      <>
                        {format(customRange.from, "MMM d")} – {format(customRange.to, "MMM d, yyyy")}
                      </>
                    ) : (
                      format(customRange.from, "MMM d, yyyy")
                    )
                  ) : (
                    <span>Pick dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={customRange}
                  onSelect={setCustomRange}
                  numberOfMonths={2}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard icon={<DollarSign className="w-5 h-5" />} label="Total Revenue" value={fmt(totalRevenue)} accent />
        <KpiCard icon={<Package className="w-5 h-5" />} label="Orders" value={String(orderCount)} />
        <KpiCard icon={<ShoppingCart className="w-5 h-5" />} label="Avg. Order" value={fmt(avgOrder)} />
        <KpiCard icon={<TrendingUp className="w-5 h-5" />} label="Active Orders" value={String(activeCount)} />
        <KpiCard icon={<Repeat className="w-5 h-5" />} label="New Subscribers" value={String(newSubscribers)} />
      </div>

      {/* Revenue line chart */}
      <Card className="p-5">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Revenue Over Time</h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueByDay}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
              <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12 }} className="fill-muted-foreground" />
              <Tooltip formatter={(v: number) => [fmt(v), "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Orders bar + Status pie */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Orders Per Day</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersPerDay}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Orders by Status</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusCounts}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusCounts.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Top products table */}
      <Card className="p-5">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Top Selling Products</h3>
        {topProducts.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">No product data available for this period.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-2 pr-4">#</th>
                  <th className="pb-2 pr-4">Product</th>
                  <th className="pb-2 pr-4 text-right">Plans / Units Sold</th>
                  <th className="pb-2 pr-4 text-right">Avg. Price</th>
                  <th className="pb-2 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={p.name} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 pr-4 text-muted-foreground">{i + 1}</td>
                    <td className="py-2.5 pr-4 font-medium truncate max-w-[300px]">{p.name}</td>
                    <td className="py-2.5 pr-4 text-right">{p.qty}</td>
                    <td className="py-2.5 pr-4 text-right text-muted-foreground">{p.qty > 0 ? fmt(p.rev / p.qty) : ""}</td>
                    <td className="py-2.5 text-right font-medium">{fmt(p.rev)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <Card className="p-4 flex items-start gap-3">
      <div className={`p-2 rounded-lg ${accent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold tracking-tight">{value}</p>
      </div>
    </Card>
  );
}
