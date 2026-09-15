import type { SupabaseClient } from "@supabase/supabase-js";

interface MetaInsight {
  date_start?: string;
  date_stop?: string;
  campaign_id?: string;
  campaign_name?: string;
  adset_id?: string;
  adset_name?: string;
  ad_id?: string;
  ad_name?: string;
  spend?: string;
  impressions?: string;
  clicks?: string;
  ctr?: string;
  cpc?: string;
  conversions?: string;
  cost_per_conversion?: string;
  actions?: Array<{ action_type: string; value: string }>;
  cost_per_action_type?: Array<{ action_type: string; value: string }>;
  frequency?: string;
  reach?: string;
}

function num(v: string | undefined | null): number | null {
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function sumActions(actions: MetaInsight["actions"], type: string): number {
  if (!Array.isArray(actions)) return 0;
  return actions
    .filter((a) => a.action_type === type)
    .reduce((s, a) => s + (num(a.value) ?? 0), 0);
}

export async function syncMetaAdsInsights(days = 30) {
  const token = process.env.META_ADS_ACCESS_TOKEN;
  const accountId = process.env.META_ADS_ACCOUNT_ID;

  if (!token || !accountId) {
    throw new Error("Meta Ads credentials are not configured.");
  }

  const since = new Date(Date.now() - days * 864e5).toISOString().split("T")[0];
  const until = new Date().toISOString().split("T")[0];
  const fields = [
    "campaign_id",
    "campaign_name",
    "adset_id",
    "adset_name",
    "ad_id",
    "ad_name",
    "spend",
    "impressions",
    "clicks",
    "ctr",
    "cpc",
    "conversions",
    "cost_per_conversion",
    "actions",
    "cost_per_action_type",
    "frequency",
    "reach",
  ].join(",");

  const base = `https://graph.facebook.com/v19.0/${accountId}/insights`;
  const url = new URL(base);
  url.searchParams.set("fields", fields);
  url.searchParams.set("level", "ad");
  url.searchParams.set("time_range", JSON.stringify({ since, until }));
  url.searchParams.set("time_increment", "1");
  url.searchParams.set("limit", "500");

  const rows: ReturnType<typeof mapInsight>[] = [];
  let nextUrl: string | null = url.toString();
  let pages = 0;

  while (nextUrl && pages < 20) {
    const res = await fetch(nextUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Meta API error ${res.status}: ${text.slice(0, 500)}`);
    }
    const json = (await res.json()) as {
      data?: MetaInsight[];
      paging?: { next?: string };
      error?: { message: string };
    };

    if (json.error) {
      throw new Error(json.error.message);
    }

    for (const insight of json.data ?? []) {
      rows.push(mapInsight(insight));
    }

    nextUrl = json.paging?.next ?? null;
    pages++;
  }

  if (rows.length) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const client = supabaseAdmin as unknown as SupabaseClient;
    const { error } = await client
      .from("meta_ads_insights")
      .upsert(rows, { onConflict: "date_start,ad_id" });
    if (error) throw new Error(error.message);
  }

  return { synced: rows.length };
}

function mapInsight(insight: MetaInsight) {
  const conversions =
    num(insight.conversions) ??
    sumActions(insight.actions, "offsite_conversion.purchase");

  return {
    date_start: insight.date_start ?? null,
    date_stop: insight.date_stop ?? null,
    campaign_id: insight.campaign_id ?? null,
    campaign_name: insight.campaign_name ?? null,
    adset_id: insight.adset_id ?? null,
    adset_name: insight.adset_name ?? null,
    ad_id: insight.ad_id ?? null,
    ad_name: insight.ad_name ?? null,
    spend: num(insight.spend),
    impressions: num(insight.impressions),
    clicks: num(insight.clicks),
    ctr: num(insight.ctr),
    cpc: num(insight.cpc),
    conversions,
    cost_per_conversion: num(insight.cost_per_conversion),
    actions: insight.actions ?? null,
    cost_per_action_type: insight.cost_per_action_type ?? null,
    frequency: num(insight.frequency),
    reach: num(insight.reach),
  };
}
