import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, RefreshCw, TrendingUp } from "lucide-react";

interface VisitRow {
  landing_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  click_id_type: string | null;
  created_at: string;
}

interface OrderRow {
  order_number: string | null;
  email: string | null;
  total_price: number | null;
  currency: string | null;
  landing_page: string | null;
  lp_section: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  click_id_type: string | null;
  ordered_at: string | null;
  created_at: string;
}

const RANGES = [
  { value: "7", label: "Last 7 days" },
  { value: "28", label: "Last 28 days" },
  { value: "90", label: "Last 90 days" },
  { value: "365", label: "Last 12 months" },
];

const isFacebook = (s: string | null | undefined) =>
  !!s && /facebook|meta|instagram|fb/i.test(s);

function money(n: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function AdAttributionSection() {
  const [range, setRange] = useState("28");
  const [onlyFacebook, setOnlyFacebook] = useState(true);
  const [groupBy, setGroupBy] = useState<
    "landing_page" | "utm_source" | "utm_campaign" | "utm_content"
  >("landing_page");
  const [visits, setVisits] = useState<VisitRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const since = new Date(
      Date.now() - Number(range) * 864e5,
    ).toISOString();
    const [v, o] = await Promise.all([
      supabase
        .from("attribution_visits")
        .select(
          "landing_page,utm_source,utm_medium,utm_campaign,utm_content,click_id_type,created_at",
        )
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000),
      supabase
        .from("attribution_orders")
        .select(
          "order_number,email,total_price,currency,landing_page,lp_section,utm_source,utm_medium,utm_campaign,utm_content,click_id_type,ordered_at,created_at",
        )
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000),
    ]);
    setVisits((v.data as VisitRow[]) ?? []);
    setOrders((o.data as OrderRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  const fVisits = useMemo(
    () =>
      onlyFacebook
        ? visits.filter(
            (v) => isFacebook(v.utm_source) || v.click_id_type === "fbclid",
          )
        : visits,
    [visits, onlyFacebook],
  );
  const fOrders = useMemo(
    () =>
      onlyFacebook
        ? orders.filter(
            (o) => isFacebook(o.utm_source) || o.click_id_type === "fbclid",
          )
        : orders,
    [orders, onlyFacebook],
  );

  const revenue = fOrders.reduce((s, o) => s + (o.total_price ?? 0), 0);
  const currency = fOrders.find((o) => o.currency)?.currency ?? "USD";
  const cvr = fVisits.length ? (fOrders.length / fVisits.length) * 100 : 0;

  type Bucket = { key: string; visits: number; orders: number; revenue: number };

  const aggregate = (
    v: Array<Record<string, unknown>>,
    o: Array<Record<string, unknown>>,
    keyOf: (r: Record<string, unknown>) => string,
  ) => {
    const map = new Map<string, Bucket>();
    for (const row of v) {
      const k = keyOf(row);
      const e = map.get(k) ?? { key: k, visits: 0, orders: 0, revenue: 0 };
      e.visits++;
      map.set(k, e);
    }
    for (const row of o) {
      const k = keyOf(row);
      const e = map.get(k) ?? { key: k, visits: 0, orders: 0, revenue: 0 };
      e.orders++;
      e.revenue += (row.total_price as number | null) ?? 0;
      map.set(k, e);
    }
    return [...map.values()].sort(
      (a, b) => b.revenue - a.revenue || b.visits - a.visits,
    );
  };

  const sourceOf = (r: Record<string, unknown>) => {
    const src = (r.utm_source as string | null) || null;
    if (src) return src.toLowerCase();
    const click = r.click_id_type as string | null;
    if (click === "fbclid") return "facebook";
    if (click === "gclid" || click === "gbraid" || click === "wbraid") return "google";
    if (click === "ttclid") return "tiktok";
    if (click === "msclkid") return "bing";
    return "direct / organic";
  };

  const rows = useMemo(() => {
    const keyOf = (r: Record<string, unknown>) =>
      groupBy === "utm_source"
        ? sourceOf(r)
        : ((groupBy === "landing_page"
            ? (r.landing_page as string | null)
            : groupBy === "utm_campaign"
              ? (r.utm_campaign as string | null)
              : (r.utm_content as string | null)) || "(not set)");
    return aggregate(
      fVisits as unknown as Array<Record<string, unknown>>,
      fOrders as unknown as Array<Record<string, unknown>>,
      keyOf,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fVisits, fOrders, groupBy]);

  // Traffic sources, always grouped by source regardless of the table grouping
  const sourceRows = useMemo(
    () =>
      aggregate(
        visits as unknown as Array<Record<string, unknown>>,
        orders as unknown as Array<Record<string, unknown>>,
        sourceOf,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visits, orders],
  );

  // Landing pages, always grouped by page (for the "what to improve" engine)
  const pageRows = useMemo(
    () =>
      aggregate(
        fVisits as unknown as Array<Record<string, unknown>>,
        fOrders as unknown as Array<Record<string, unknown>>,
        (r) => (r.landing_page as string | null) || "(not set)",
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fVisits, fOrders],
  );

  const insights = useMemo(() => {
    const out: { tone: "good" | "warn" | "bad"; text: string }[] = [];
    const withVisits = pageRows.filter((r) => r.visits >= 20);
    const rate = (r: Bucket) => (r.visits ? r.orders / r.visits : 0);

    if (fVisits.length < 50) {
      out.push({
        tone: "warn",
        text: `Only ${fVisits.length} tracked visits in this window. Wait for at least a few hundred before acting on differences between pages, they are still noise.`,
      });
    }
    if (fVisits.length > 0 && fOrders.length === 0) {
      out.push({
        tone: "bad",
        text: "Traffic is being tracked but no orders are coming back from Shopify. Confirm the Order creation webhook points to /api/public/shopify-order, otherwise every conversion stays invisible here.",
      });
    }

    if (withVisits.length) {
      const best = [...withVisits].sort((a, b) => rate(b) - rate(a))[0];
      const worst = [...withVisits].sort((a, b) => rate(a) - rate(b))[0];
      out.push({
        tone: "good",
        text: `Best converting landing page: ${best.key} at ${(rate(best) * 100).toFixed(2)}% (${best.orders} orders from ${best.visits} visits).`,
      });
      if (worst.key !== best.key) {
        out.push({
          tone: "bad",
          text: `Weakest page: ${worst.key} at ${(rate(worst) * 100).toFixed(2)}%. Send its ad budget to ${best.key}, or rewrite its hero and CTA to match what that page does.`,
        });
      }
      const trafficHeavy = [...withVisits].sort((a, b) => b.visits - a.visits)[0];
      if (trafficHeavy.key !== best.key && rate(trafficHeavy) < rate(best) * 0.7) {
        out.push({
          tone: "warn",
          text: `${trafficHeavy.key} gets the most traffic but converts below ${best.key}. That gap is where the money is: shift spend or fix the page.`,
        });
      }
    }

    const paidSources = sourceRows.filter((s) => s.visits >= 20);
    if (paidSources.length > 1) {
      const bestSrc = [...paidSources].sort((a, b) => rate(b) - rate(a))[0];
      out.push({
        tone: "good",
        text: `Highest converting traffic source: ${bestSrc.key} at ${(rate(bestSrc) * 100).toFixed(2)}% with ${money(bestSrc.revenue, currency)} revenue.`,
      });
      const zero = paidSources.filter((s) => s.orders === 0);
      if (zero.length) {
        out.push({
          tone: "bad",
          text: `No orders at all from: ${zero.map((z) => z.key).join(", ")}. Either the targeting is wrong or the click never reaches a page built to sell.`,
        });
      }
    }

    const unset = pageRows.find((r) => r.key === "(not set)");
    if (unset && unset.visits > fVisits.length * 0.2) {
      out.push({
        tone: "warn",
        text: "Over 20% of visits have no landing page recorded. Add utm_content and utm_campaign to every ad link so creatives can be compared.",
      });
    }

    if (fOrders.length >= 5) {
      const aov = revenue / fOrders.length;
      out.push({
        tone: "good",
        text: `Average order value ${money(aov, currency)}. Raising it with a bundle or a refill add-on is usually cheaper than buying more clicks.`,
      });
    }
    return out;
  }, [pageRows, sourceRows, fVisits, fOrders, revenue, currency]);



  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <TrendingUp className="h-5 w-5 text-primary" />
          Ad Attribution (Facebook → Landing Page → Shopify)
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RANGES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={groupBy}
            onValueChange={(v) => setGroupBy(v as typeof groupBy)}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="landing_page">By landing page</SelectItem>
              <SelectItem value="utm_campaign">By campaign</SelectItem>
              <SelectItem value="utm_content">By ad / creative</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={onlyFacebook ? "default" : "outline"}
            onClick={() => setOnlyFacebook((x) => !x)}
          >
            {onlyFacebook ? "Facebook only" : "All sources"}
          </Button>
          <Button variant="outline" size="icon" onClick={() => void load()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-4">
            {[
              { label: "Landing page visits", value: fVisits.length.toLocaleString() },
              { label: "Attributed orders", value: fOrders.length.toLocaleString() },
              { label: "Revenue", value: money(revenue, currency) },
              { label: "Conversion rate", value: `${cvr.toFixed(2)}%` },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {k.label}
                </p>
                <p className="mt-1 text-2xl font-semibold">{k.value}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">
                    {groupBy === "landing_page"
                      ? "Landing page"
                      : groupBy === "utm_campaign"
                        ? "Campaign"
                        : "Ad / creative"}
                  </th>
                  <th className="px-4 py-3 text-right font-medium">Visits</th>
                  <th className="px-4 py-3 text-right font-medium">Orders</th>
                  <th className="px-4 py-3 text-right font-medium">CVR</th>
                  <th className="px-4 py-3 text-right font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      No attributed traffic yet for this period.
                    </td>
                  </tr>
                )}
                {rows.map((r) => (
                  <tr key={r.key} className="border-t border-border">
                    <td className="max-w-[320px] truncate px-4 py-3">{r.key}</td>
                    <td className="px-4 py-3 text-right">{r.visits}</td>
                    <td className="px-4 py-3 text-right">{r.orders}</td>
                    <td className="px-4 py-3 text-right">
                      {r.visits ? ((r.orders / r.visits) * 100).toFixed(2) : "0.00"}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      {money(r.revenue, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mb-3 mt-8 text-lg font-semibold">Recent attributed orders</h3>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Campaign</th>
                  <th className="px-4 py-3 font-medium">Landing page</th>
                  <th className="px-4 py-3 text-right font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {fOrders.slice(0, 50).map((o, i) => (
                  <tr key={`${o.order_number}-${i}`} className="border-t border-border">
                    <td className="px-4 py-3">{o.order_number ?? "—"}</td>
                    <td className="px-4 py-3">
                      {o.utm_source ?? o.click_id_type ?? "direct"}
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3">
                      {o.utm_campaign ?? "—"}
                    </td>
                    <td className="max-w-[220px] truncate px-4 py-3">
                      {o.landing_page ?? o.lp_section ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {o.total_price != null
                        ? money(o.total_price, o.currency ?? currency)
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(o.ordered_at ?? o.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {fOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      No orders recorded yet. Connect the Shopify order webhook to start
                      collecting purchases.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
