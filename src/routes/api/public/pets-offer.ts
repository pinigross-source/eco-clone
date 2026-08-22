import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const OfferRequest = z.object({
  email: z.string().email().max(320),
  website: z.string().max(0).optional(),
});

const allowedOrigin = (request: Request) => {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const hostname = new URL(origin).hostname;
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "envirobiotics.com" || hostname.endsWith(".envirobiotics.com") || hostname.endsWith(".lovable.app");
  } catch {
    return false;
  }
};

export const Route = createFileRoute("/api/public/pets-offer")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!allowedOrigin(request)) {
          return Response.json({ error: "Invalid origin" }, { status: 403 });
        }

        const parsed = OfferRequest.safeParse(await request.json().catch(() => null));
        if (!parsed.success || parsed.data.website) {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        const lovableApiKey = process.env.LOVABLE_API_KEY;
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!lovableApiKey || !resendApiKey) {
          return Response.json({ error: "Email service unavailable" }, { status: 503 });
        }

        const response = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lovableApiKey}`,
            "X-Connection-Api-Key": resendApiKey,
          },
          body: JSON.stringify({
            from: "EnviroBiotics <hello@contact.envirobiotics.com>",
            to: [parsed.data.email],
            subject: "Your 15% EnviroBiotics offer",
            html: '<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:28px;color:#1a1a1a"><h1 style="font-size:26px;margin:0 0 16px">Your 15% offer is ready</h1><p style="line-height:1.6">Use code <strong>META15</strong> at checkout, or return to the pet solutions page where the offer is applied automatically.</p><p style="margin-top:24px"><a href="https://envirobiotics.com/pets" style="background:#111;color:#fff;padding:13px 22px;border-radius:999px;text-decoration:none">Shop pet solutions</a></p></div>',
          }),
        });

        if (!response.ok) {
          console.error("Pets offer email failed", response.status);
          return Response.json({ error: "Email failed" }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});