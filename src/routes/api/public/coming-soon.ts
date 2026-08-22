import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  product: z.string().min(1).max(100).optional(),
});

export const Route = createFileRoute("/api/public/coming-soon")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const parsed = Schema.safeParse(json);
          if (!parsed.success) {
            return Response.json({ error: "Invalid input" }, { status: 400 });
          }
          const { name, email, product = "E-Biotic Home" } = parsed.data;

          const html = `
            <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
              <h2 style="margin:0 0 16px">New "Coming Soon" signup</h2>
              <p style="margin:0 0 8px"><strong>Product:</strong> ${escapeHtml(product)}</p>
              <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
            </div>
          `;

          const { sendLoggedEmail } = await import("@/lib/emailLog.server");
          const result = await sendLoggedEmail({
            templateName: "coming-soon",
            from: "EnviroBiotics Website <hello@contact.envirobiotics.com>",
            to: ["contact@envirobiotics.com"],
            replyTo: email,
            subject: `New "Coming Soon" signup — ${product}`,
            html,
            metadata: { submitter_email: email, submitter_name: name, product },
          });

          if (!result.ok) {
            return Response.json(
              { error: "Failed to send", messageId: result.messageId },
              { status: result.providerStatus ? 502 : 500 },
            );
          }

          return Response.json({ ok: true, messageId: result.messageId });
        } catch (err) {
          console.error("coming-soon handler error", err);
          return Response.json({ error: "Server error" }, { status: 500 });
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
