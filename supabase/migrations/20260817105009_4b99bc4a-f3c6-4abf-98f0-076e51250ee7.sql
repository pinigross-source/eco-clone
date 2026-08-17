CREATE TABLE public.attribution_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL,
  session_id text,
  landing_page text NOT NULL,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  ad_id text,
  adset_id text,
  click_id text,
  click_id_type text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX attribution_visits_created_idx ON public.attribution_visits (created_at DESC);
CREATE INDEX attribution_visits_source_idx ON public.attribution_visits (utm_source);
CREATE INDEX attribution_visits_click_idx ON public.attribution_visits (click_id);

GRANT ALL ON public.attribution_visits TO service_role;
GRANT SELECT ON public.attribution_visits TO authenticated;
ALTER TABLE public.attribution_visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view visits" ON public.attribution_visits
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.attribution_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shopify_order_id text NOT NULL UNIQUE,
  order_number text,
  email text,
  total_price numeric,
  currency text,
  line_items jsonb,
  landing_site text,
  landing_page text,
  lp_section text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  click_id text,
  click_id_type text,
  ordered_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX attribution_orders_created_idx ON public.attribution_orders (created_at DESC);
CREATE INDEX attribution_orders_source_idx ON public.attribution_orders (utm_source);

GRANT ALL ON public.attribution_orders TO service_role;
GRANT SELECT ON public.attribution_orders TO authenticated;
ALTER TABLE public.attribution_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view attributed orders" ON public.attribution_orders
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));