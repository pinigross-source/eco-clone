DROP POLICY IF EXISTS "Anyone can submit contact inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Anyone can register products" ON public.product_registrations;
REVOKE INSERT ON public.contact_inquiries FROM anon;
REVOKE INSERT ON public.product_registrations FROM anon;