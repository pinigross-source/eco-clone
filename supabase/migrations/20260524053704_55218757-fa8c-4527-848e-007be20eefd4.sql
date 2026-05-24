
-- 1. Recreate affiliate_stats view with security_invoker
DROP VIEW IF EXISTS public.affiliate_stats;
CREATE VIEW public.affiliate_stats
WITH (security_invoker = on) AS
SELECT a.id AS affiliate_id,
       a.code,
       a.name,
       a.email,
       COALESCE(sum(c.amount), 0::numeric) AS total_commissions,
       count(c.id) AS commission_count,
       COALESCE(sum(CASE WHEN c.status = 'paid' THEN c.amount ELSE 0 END), 0) AS paid_commissions,
       COALESCE(sum(CASE WHEN c.status = 'pending' THEN c.amount ELSE 0 END), 0) AS pending_commissions
FROM public.affiliates a
LEFT JOIN public.commissions c ON c.affiliate_id = a.id
GROUP BY a.id;

-- 2. Hide internal Stripe IDs on coupons from public/auth readers (column-level)
REVOKE SELECT (stripe_coupon_id, stripe_promo_id) ON public.coupons FROM anon, authenticated;

-- 3. Tighten affiliates INSERT policy (no privilege escalation)
DROP POLICY IF EXISTS "Anyone can apply" ON public.affiliates;
CREATE POLICY "Anyone can apply"
ON public.affiliates
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (user_id IS NULL OR user_id = auth.uid())
  AND status = 'pending'
  AND (commission_rate IS NULL OR commission_rate = 10.00)
  AND total_paid IS NOT DISTINCT FROM 0
);

-- 4. Tighten abandoned_carts INSERT + add owner SELECT/UPDATE
DROP POLICY IF EXISTS "Anyone can insert carts" ON public.abandoned_carts;
CREATE POLICY "Insert own cart"
ON public.abandoned_carts
FOR INSERT
TO anon, authenticated
WITH CHECK (user_id IS NULL OR user_id = auth.uid());

CREATE POLICY "Users view own cart"
ON public.abandoned_carts
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users update own cart"
ON public.abandoned_carts
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 5. Tighten product_registrations INSERT with basic validation (no bare true)
DROP POLICY IF EXISTS "Anyone can register products" ON public.product_registrations;
CREATE POLICY "Anyone can register products"
ON public.product_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(first_name) BETWEEN 1 AND 100
  AND length(last_name) BETWEEN 1 AND 100
  AND length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(product_name) BETWEEN 1 AND 200
  AND status = 'active'
);

-- 6. Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated.
-- These are used by triggers and by RLS (has_role); RLS evaluation uses table
-- owner privileges so revoking from end-user roles is safe.
REVOKE EXECUTE ON FUNCTION public.generate_order_number() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;
