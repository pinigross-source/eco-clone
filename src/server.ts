import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { APP_ORIGIN, corsHeaders, injectNoindexMeta, isAppHost, isCorsAllowedOrigin } from "./lib/hosts";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"}  try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

// CORS for /api/public/* (Shopify storefront forms, attribution beacon) and
// noindex for every HTML page served on app.envirobiotics.com.
async function applyHostRules(request: Request, response: Response): Promise<Response> {
  const url = new URL(request.url);
  const origin = request.headers.get("origin");

  if (url.pathname.startsWith("/api/public/") && isCorsAllowedOrigin(origin)) {
    const headers = new Headers(response.headers);
    for (const [k, v] of Object.entries(corsHeaders(origin!))) headers.set(k, v);
    response = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }

  if (isAppHost(url.hostname)) {
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    const ct = headers.get("content-type") ?? "";
    if (ct.includes("text/html")) {
      const html = injectNoindexMeta(await response.text());
      headers.delete("content-length");
      return new Response(html, { status: response.status, statusText: response.statusText, headers });
    }
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
  return response;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (request.method === "OPTIONS" && url.pathname.startsWith("/api/public/")) {
        const origin = request.headers.get("origin");
        return new Response(null, {
          status: 204,
          headers: isCorsAllowedOrigin(origin) ? corsHeaders(origin!) : { Vary: "Origin" },
        });
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await applyHostRules(request, await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
  async scheduled(_event: unknown, env: unknown, ctx: { waitUntil: (p: Promise<unknown>) => void }) {
    try {
      // In-process call to this app's own server entry: never leaves the
      // worker, so it keeps working whatever the root domain points to.
      const req = new Request(`${APP_ORIGIN}/api/public/meta-ads-sync`, {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.META_SYNC_SECRET ?? ""}` },
      });
      const promise = getServerEntry()
        .then((h) => h.fetch(req, env, ctx))
        .then(async (res) => {
          if (!res.ok) {
            const text = await res.text();
            console.error("[scheduled:meta-ads-sync] failed", res.status, text);
          }
        })
        .catch((error) => console.error("[scheduled:meta-ads-sync] error", error));
      ctx.waitUntil(promise);
    } catch (error) {
      console.error("[scheduled:meta-ads-sync] error", error);
    }
  },
};

