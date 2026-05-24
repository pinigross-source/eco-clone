
DROP POLICY IF EXISTS "Anyone can submit contact inquiries" ON public.contact_inquiries;
CREATE POLICY "Anyone can submit contact inquiries"
ON public.contact_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(subject) BETWEEN 1 AND 300
  AND length(message) BETWEEN 1 AND 5000
  AND status = 'new'
);

DROP POLICY IF EXISTS "Anyone can submit quiz leads" ON public.quiz_leads;
CREATE POLICY "Anyone can submit quiz leads"
ON public.quiz_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(recommended_product) BETWEEN 1 AND 200
  AND email_sent IS NOT TRUE
);

DROP POLICY IF EXISTS "Anyone can insert upsell analytics" ON public.upsell_analytics;
CREATE POLICY "Anyone can insert upsell analytics"
ON public.upsell_analytics
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(event_type) BETWEEN 1 AND 100
  AND length(device_name) BETWEEN 1 AND 200
  AND length(device_product_id) BETWEEN 1 AND 200
  AND (device_quantity IS NULL OR device_quantity BETWEEN 1 AND 1000)
);
