import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface EmailLogRow {
  id: string;
  message_id: string | null;
  template_name: string;
  recipient_email: string;
  status: string;
  error_message: string | null;
  provider_status_code: number | null;
  created_at: string;
}

export const listEmailLogs = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { sinceIso: string }) => input)
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { data: rows, error } = await context.supabase
      .from("email_send_log")
      .select(
        "id, message_id, template_name, recipient_email, status, error_message, provider_status_code, created_at",
      )
      .gte("created_at", data.sinceIso)
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) throw new Error(error.message);

    // Deduplicate by message_id, keeping the latest row per email.
    const seen = new Set<string>();
    const latest: EmailLogRow[] = [];
    for (const row of (rows ?? []) as EmailLogRow[]) {
      const key = row.message_id ?? row.id;
      if (seen.has(key)) continue;
      seen.add(key);
      latest.push(row);
    }
    return latest;
  });
