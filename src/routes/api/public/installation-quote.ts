import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { businessQuoteSchema, businessQuoteMessage, BUSINESS_QUOTE_SUBJECT } from "@/lib/businessQuote";

const Schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  subject: z.string().min(1).max(300),
  message: z.string().min(1).max(5000),
});

export const Route = createFileRoute("/api/public/installation-quote")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const isBusiness = json?.source === "business";
          const business = isBusiness ? businessQuoteSchema.safeParse(json) : undefined;
          const parsed = isBusiness && business?.success
            ? Schema.safeParse({ name: business.data.name, email: business.data.email, subject: BUSINESS_QUOTE_SUBJECT, message: businessQuoteMessage(business.data) })
            : isBusiness ? Schema.safeParse({}) : Schema.safeParse(json);
          if (!parsed.success) {
            return Response.json({ success: false, error: "Invalid input" }, { status: 400 });
          }
          const { name, email, subject, message } = parsed.data;

          // Public, insert-only form submission: use the anonymous client and the
          // existing contact_inquiries INSERT policy, never privileged access.
          if (isBusiness) {
            const url = process.env["SUPABASE_URL"];
            const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
            if (!url || !key) return Response.json({ success: false, error: "Your request could not be saved. Please call (833) 692-3883." }, { status: 503 });
            const client = createClient(url, key, {
              auth: { persistSession: false, autoRefreshToken: false },
              global: { fetch: (input, init) => {
                const headers = new Headers(init?.headers);
                if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
                headers.set("apikey", key);
                return fetch(input, { ...init, headers });
              } },
            });
            const { error } = await client.from("contact_inquiries").insert({ name, email, subject, message, status: "new" });
            if (error) return Response.json({ success: false, error: "Your request could not be saved. Please try again or call (833) 692-3883." }, { status: 500 });
          }

          const html = `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111">
              <h2 style="margin:0 0 16px">${escapeHtml(subject)}</h2>
              <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
              <hr style="margin:16px 0;border:none;border-top:1px solid #eee" />
              <pre style="white-space:pre-wrap;font-family:inherit;margin:0">${escapeHtml(message)}</pre>
            </div>
          `;

          const { sendLoggedEmail } = await import("@/lib/emailLog.server");
          const result = await sendLoggedEmail({
            templateName: isBusiness ? "business-facility-quote" : "installation-quote",
            from: "EnviroBiotics Website <hello@contact.envirobiotics.com>",
            to: ["contact@envirobiotics.com"],
            replyTo: email,
            subject,
            html,
            metadata: { submitter_email: email, submitter_name: name },
          });

          if (!result.ok) {
            return Response.json(
              { success: false, error: isBusiness ? "Your request was saved, but the email could not be sent. Please call (833) 692-3883 to confirm." : "Failed to send", messageId: result.messageId },
              { status: result.providerStatus ? 502 : 500 },
            );
          }

          return Response.json({ success: true, messageId: result.messageId });
        } catch (err) {
          console.error("installation-quote handler error", err);
          return Response.json({ success: false, error: "Server error" }, { status: 500 });
        }
      },
    },
  },
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
