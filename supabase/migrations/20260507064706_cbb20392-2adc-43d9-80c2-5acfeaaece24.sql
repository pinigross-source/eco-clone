-- Bundled EnviroBiotics schema (68 source migrations) — full DDL
-- Tables, RLS, triggers, functions for: contact_inquiries, product_registrations, quiz_leads,
-- profiles, orders, user_roles, upsell_analytics, products, inventory_logs, coupons, affiliates,
-- commissions, contact form, shipping countries, abandoned_carts, subscriptions, etc.

-- Create a table for contact form inquiries
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_contact_inquiries_updated_at BEFORE UPDATE ON public.contact_inquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Product registrations
CREATE TABLE public.product_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT,
  product_name TEXT NOT NULL, serial_number TEXT, purchase_date DATE NOT NULL,
  purchase_location TEXT, address_line1 TEXT, address_line2 TEXT, city TEXT, state TEXT,
  zip_code TEXT, country TEXT DEFAULT 'United States', newsletter_opt_in BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.product_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register products" ON public.product_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "No public updates to product registrations" ON public.product_registrations FOR UPDATE USING (false);
CREATE POLICY "No public deletes of product registrations" ON public.product_registrations FOR DELETE USING (false);
CREATE TRIGGER update_product_registrations_updated_at BEFORE UPDATE ON public.product_registrations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Quiz leads
CREATE TABLE public.quiz_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL, recommended_product TEXT NOT NULL, quiz_answers JSONB,
  discount_code TEXT, email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit quiz leads" ON public.quiz_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "No client can read quiz leads" ON public.quiz_leads FOR SELECT USING (false);
CREATE INDEX idx_quiz_leads_email ON public.quiz_leads(email);

-- Profiles
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT, avatar_url TEXT, phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name) VALUES (new.id, new.raw_user_meta_data ->> 'display_name');
  RETURN new;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Orders
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','shipped','delivered','cancelled')),
  total_amount NUMERIC(10,2) NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  shipping_address JSONB, tracking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users cannot update orders" ON public.orders FOR UPDATE USING (false);
CREATE POLICY "Users cannot delete orders" ON public.orders FOR DELETE USING (false);
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.order_number := 'EB-' || TO_CHAR(NOW(),'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM()*10000)::TEXT,4,'0'); RETURN NEW; END; $$;
CREATE TRIGGER set_order_number BEFORE INSERT ON public.orders FOR EACH ROW WHEN (NEW.order_number IS NULL) EXECUTE FUNCTION public.generate_order_number();

-- User roles
CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update all orders" ON public.orders FOR UPDATE USING (public.has_role(auth.uid(),'admin'));

-- Upsell analytics
CREATE TABLE public.upsell_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('impression','accepted','skipped')),
  device_product_id TEXT NOT NULL, device_name TEXT NOT NULL,
  subscription_product_id TEXT, subscription_name TEXT,
  device_quantity INTEGER DEFAULT 1, device_price INTEGER, subscription_price INTEGER,
  user_id UUID, session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.upsell_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert upsell analytics" ON public.upsell_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view upsell analytics" ON public.upsell_analytics FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_upsell_analytics_event_type ON public.upsell_analytics(event_type);
CREATE INDEX idx_upsell_analytics_created_at ON public.upsell_analytics(created_at);

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, description TEXT, category TEXT NOT NULL,
  price_cents INTEGER NOT NULL, original_price_cents INTEGER,
  slug TEXT UNIQUE, sku TEXT, image_url TEXT,
  stock_quantity INTEGER DEFAULT 0, low_stock_threshold INTEGER DEFAULT 10,
  track_inventory BOOLEAN DEFAULT true, is_active BOOLEAN DEFAULT true,
  stripe_product_id TEXT, stripe_price_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage products" ON public.products FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.inventory_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  change_type TEXT NOT NULL, quantity_change INTEGER NOT NULL,
  new_quantity INTEGER NOT NULL, notes TEXT, user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.inventory_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view inventory logs" ON public.inventory_logs FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins insert inventory logs" ON public.inventory_logs FOR INSERT WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Coupons
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage','fixed')),
  discount_value NUMERIC(10,2) NOT NULL,
  description TEXT, max_uses INTEGER, current_uses INTEGER DEFAULT 0,
  min_purchase_cents INTEGER DEFAULT 0,
  starts_at TIMESTAMP WITH TIME ZONE, expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true, stripe_promo_id TEXT, stripe_coupon_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active coupons" ON public.coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage coupons" ON public.coupons FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON public.coupons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Affiliates
CREATE TABLE public.affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL UNIQUE, name TEXT NOT NULL, code TEXT NOT NULL UNIQUE,
  coupon_code TEXT, payment_email TEXT, payment_method TEXT,
  commission_rate NUMERIC(5,2) DEFAULT 10.00,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active','inactive','pending','rejected')),
  total_paid NUMERIC(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Affiliates view own row" ON public.affiliates FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Anyone can apply" ON public.affiliates FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage affiliates" ON public.affiliates FOR UPDATE USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete affiliates" ON public.affiliates FOR DELETE USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_affiliates_updated_at BEFORE UPDATE ON public.affiliates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  amount NUMERIC(10,2) NOT NULL, rate NUMERIC(5,2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','paid','cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Affiliates view own commissions" ON public.commissions FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.affiliates a WHERE a.id = commissions.affiliate_id AND (a.user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "Admins manage commissions" ON public.commissions FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_commissions_updated_at BEFORE UPDATE ON public.commissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE VIEW public.affiliate_stats AS
SELECT a.id AS affiliate_id, a.code, a.name, a.email,
  COALESCE(SUM(c.amount),0) AS total_commissions,
  COUNT(c.id) AS commission_count,
  COALESCE(SUM(CASE WHEN c.status='paid' THEN c.amount ELSE 0 END),0) AS paid_commissions,
  COALESCE(SUM(CASE WHEN c.status='pending' THEN c.amount ELSE 0 END),0) AS pending_commissions
FROM public.affiliates a LEFT JOIN public.commissions c ON c.affiliate_id = a.id
GROUP BY a.id;

-- Shipping countries
CREATE TABLE public.shipping_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code TEXT NOT NULL UNIQUE, country_name TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  base_rate_cents INTEGER NOT NULL DEFAULT 0,
  free_shipping_threshold_cents INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.shipping_countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read enabled countries" ON public.shipping_countries FOR SELECT USING (is_enabled = true);
CREATE POLICY "Admins manage shipping countries" ON public.shipping_countries FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_shipping_countries_updated_at BEFORE UPDATE ON public.shipping_countries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE, stripe_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  tier TEXT, current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage subscriptions" ON public.subscriptions FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Abandoned carts
CREATE TABLE public.abandoned_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT, user_id UUID, session_id TEXT,
  cart_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  cart_total_cents INTEGER, recovery_email_sent_at TIMESTAMP WITH TIME ZONE,
  recovered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert carts" ON public.abandoned_carts FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view carts" ON public.abandoned_carts FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage carts" ON public.abandoned_carts FOR UPDATE USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_abandoned_carts_updated_at BEFORE UPDATE ON public.abandoned_carts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();