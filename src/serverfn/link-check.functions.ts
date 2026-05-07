import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

type LinkResult = {
  url: string;
  status: number;
  ok: boolean;
  foundOn: string;
};

const MAX_PAGES = 80;
const MAX_CONCURRENCY = 6;

function extractLinks(html: string): string[] {
  const out: string[] = [];
  const re = /<a\b[^>]*\bhref=["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out;
}

function normalize(href: string, base: URL): URL | null {
  try {
    if (!href) return null;
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return null;
    const u = new URL(href, base);
    if (u.origin !== base.origin) return null;
    u.hash = "";
    return u;
  } catch {
    return null;
  }
}

export const checkSiteLinks = createServerFn({ method: "POST" }).handler(async () => {
  const host = getRequestHeader("host") ?? "";
  const proto = getRequestHeader("x-forwarded-proto") ?? "https";
  const origin = `${proto}://${host}`;
  const start = new URL("/", origin);

  const visited = new Map<string, LinkResult>();
  const queue: { url: URL; foundOn: string }[] = [{ url: start, foundOn: "(root)" }];
  const seen = new Set<string>([start.toString()]);
  const broken: LinkResult[] = [];
  let pagesCrawled = 0;

  while (queue.length > 0 && pagesCrawled < MAX_PAGES) {
    const batch = queue.splice(0, MAX_CONCURRENCY);
    await Promise.all(
      batch.map(async ({ url, foundOn }) => {
        if (visited.has(url.toString())) return;
        pagesCrawled++;
        try {
          const res = await fetch(url.toString(), { redirect: "follow" });
          const result: LinkResult = { url: url.pathname + url.search, status: res.status, ok: res.ok, foundOn };
          visited.set(url.toString(), result);
          if (!res.ok) broken.push(result);

          const ct = res.headers.get("content-type") ?? "";
          if (res.ok && ct.includes("text/html")) {
            const html = await res.text();
            for (const href of extractLinks(html)) {
              const next = normalize(href, url);
              if (!next) continue;
              const key = next.toString();
              if (seen.has(key)) continue;
              seen.add(key);
              queue.push({ url: next, foundOn: url.pathname });
            }
          }
        } catch (e) {
          const result: LinkResult = {
            url: url.pathname + url.search,
            status: 0,
            ok: false,
            foundOn,
          };
          visited.set(url.toString(), result);
          broken.push(result);
        }
      })
    );
  }

  return {
    origin,
    pagesCrawled,
    totalChecked: visited.size,
    brokenCount: broken.length,
    broken,
    truncated: queue.length > 0,
  };
});
