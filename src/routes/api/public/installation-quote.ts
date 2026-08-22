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
            templateName: "installation-quote",
            from: "EnviroBiotics Website <hello@contact.envirobiotics.com>",
            to: ["contact@envirobiotics.com"],
            replyTo: email,
            subject,
            html,
            metadata: { submitter_email: email, submitter_name: name },
          });

          if (!result.ok) {
            return Response.json(
              { success: false, error: "Failed to send", messageId: result.messageId },
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
