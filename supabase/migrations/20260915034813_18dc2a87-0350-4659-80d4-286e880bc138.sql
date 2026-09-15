CREATE TABLE public.meta_ads_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date_start date,
  date_stop date,
  campaign_id text,
  campaign_name text,
  adset_id text,
  adset_name text,
  ad_id text,
  ad_name text,
  spend numeric,
  impressions numeric,
  clicks numeric,
  ctr numeric,
  cpc numeric,
  conversions numeric,
  cost_per_conversion numeric,
  actions jsonb,
  cost_per_action_type jsonb,
  frequency numeric,
  reach numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (date_start, ad_id)
);

CREATE INDEX meta_ads_insights_date_idx ON public.meta_ads_insights (date_start DESC);
CREATE INDEX meta_ads_insights_campaign_idx ON public.meta_ads_insights (campaign_id);
CREATE INDEX meta_ads_insights_ad_idx ON public.meta_ads_insights (ad_id);

GRANT SELECT ON public.meta_ads_insights TO authenticated;
GRANT ALL ON public.meta_ads_insights TO service_role;

ALTER TABLE public.meta_ads_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view Meta ads insights"
ON public.meta_ads_insights
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
