import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

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
          const parsed = Schema.safeParse(json);
          if (!parsed.success) {
            return Response.json({ success: false, error: "Invalid input" }, { status: 400 });
          }
          const { name, email, subject, message } = parsed.data;

          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          const RESEND_API_KEY = process.env.RESEND_API_KEY;
          if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
            return Response.json({ success: false, error: "Email service not configured" }, { status: 500 });
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

          const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "X-Connection-Api-Key": RESEND_API_KEY,
            },
            body: JSON.stringify({
              from: "EnviroBiotics Website <onboarding@resend.dev>",
              to: ["contact@envirobiotics.com"],
              reply_to: email,
              subject,
              html,
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("Resend gateway error", res.status, text);
            return Response.json({ success: false, error: "Failed to send" }, { status: 502 });
          }

          return Response.json({ success: true });
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
