import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  address: z.string().min(1).max(1000),
  serialNumber: z.string().min(1).max(200),
});

export const Route = createFileRoute("/api/public/refill-request")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const parsed = Schema.safeParse(json);
          if (!parsed.success) {
            return Response.json({ success: false, error: "Invalid input" }, { status: 400 });
          }
          const { name, email, address, serialNumber } = parsed.data;

          const html = `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111">
              <h2 style="margin:0 0 16px">E-Biotic Pro Refill Bottle Request</h2>
              <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p style="margin:0 0 8px"><strong>Address:</strong> ${escapeHtml(address)}</p>
              <p style="margin:0 0 8px"><strong>E-Biotic Pro Serial Number:</strong> ${escapeHtml(serialNumber)}</p>
              <hr style="margin:16px 0;border:none;border-top:1px solid #eee" />
              <p style="margin:0;color:#555">Please have the customer's authorized selling dealer contact them directly to order Probiotic Refill Bottles.</p>
            </div>
          `;

          const { sendLoggedEmail } = await import("@/lib/emailLog.server");
          const result = await sendLoggedEmail({
            templateName: "refill-request",
            from: "EnviroBiotics Website <hello@contact.envirobiotics.com>",
            to: ["contact@envirobiotics.com", "pinig@envirobiotics.com", "tstaub@envirobiotics.com"],
            replyTo: email,
            subject: `E-Biotic Pro Refill Request – ${name}`,
            html,
            metadata: { submitter_email: email, submitter_name: name, serial_number: serialNumber },
          });

          if (!result.ok) {
            return Response.json(
              { success: false, error: "Failed to send", messageId: result.messageId },
              { status: result.providerStatus ? 502 : 500 },
            );
          }

          return Response.json({ success: true, messageId: result.messageId });
        } catch (err) {
          console.error("refill-request handler error", err);
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
