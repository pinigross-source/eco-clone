CREATE TABLE public.email_send_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id text,
  template_name text NOT NULL,
  recipient_email text NOT NULL,
  status text NOT NULL,
  error_message text,
  provider_status_code integer,
  provider_response jsonb,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX email_send_log_message_id_created_at_idx ON public.email_send_log (message_id, created_at DESC);
CREATE INDEX email_send_log_created_at_idx ON public.email_send_log (created_at DESC);

GRANT SELECT ON public.email_send_log TO authenticated;
GRANT ALL ON public.email_send_log TO service_role;

ALTER TABLE public.email_send_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read email send log"
ON public.email_send_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));