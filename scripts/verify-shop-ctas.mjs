#!/usr/bin/env node
/**
 * End-to-end verification that every "Shop now" / "Buy now" / "Buy" CTA
 * on the marketing site navigates to Shopify in the SAME browser tab
 * (i.e., no target="_blank").
 *
 * Strategy:
 *   1. Crawl the published site (or a URL passed as argv[2]).
 *   2. Visit every internal page reachable from "/".
 *   3. On each page, find anchors whose visible text matches /shop now|buy now|buy/i.
 *   4. Resolve each anchor's effective destination:
 *        - direct external href → use it
 *        - internal href like /shop or /product/* → assert it would map to Shopify
 *          via the project's resolveShopifyUrl rule.
 *   5. Fail if any matching anchor has target="_blank".
 *   6. Fail if any matching anchor does NOT lead to a Shopify destination.
 *
 * Usage:
 *   node scripts/verify-shop-ctas.mjs [baseUrl]
 *   default baseUrl = https://enviro-clone-spark.lovable.app
 */

import { JSDOM } from "jsdom";

const BASE = process.argv[2] || "https://enviro-clone-spark.lovable.app";
const SHOPIFY_HOSTS = ["shop.envirobiotics.com"];
const CTA_RE = /\b(shop now|buy now|buy)\b/i;
// Internal paths we treat as Shopify-bound (mirrors src/lib/shopify.ts).
const INTERNAL_SHOP_RE = /^\/(shop|product\/|cart|checkout)/;

const visited = new Set();
const queue = ["/"];
const failures = [];
const summary = { pagesScanned: 0, ctasChecked: 0 };

function isInternal(href) {
  try {
    const u = new URL(href, BASE);
    return u.origin === new URL(BASE).origin;
  } catch {
    return false;
  }
}

function isShopifyDestination(href) {
  try {
    const u = new URL(href, BASE);
    if (SHOPIFY_HOSTS.includes(u.hostname)) return true;
    if (u.origin === new URL(BASE).origin && INTERNAL_SHOP_RE.test(u.pathname)) return true;
    return false;
  } catch {
    return false;
  }
}

async function fetchPage(path) {
  const url = new URL(path, BASE).toString();
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return { url, html: await res.text() };
}

async function processPath(path) {
  if (visited.has(path)) return;
  visited.add(path);
  let page;
  try {
    page = await fetchPage(path);
  } catch (e) {
    console.warn(`! skip ${path}: ${e.message}`);
    return;
  }
  summary.pagesScanned++;
  const dom = new JSDOM(page.html);
  const doc = dom.window.document;

  for (const a of doc.querySelectorAll("a[href]")) {
    const text = (a.textContent || "").trim().replace(/\s+/g, " ");
    if (!CTA_RE.test(text)) continue;
    summary.ctasChecked++;

    const href = a.getAttribute("href");
    const target = a.getAttribute("target");

    if (target === "_blank") {
      failures.push({
        page: page.url,
        text,
        href,
        reason: `target="_blank" — CTA must open in same tab`,
      });
    }

    if (!isShopifyDestination(href)) {
      failures.push({
        page: page.url,
        text,
        href,
        reason: "destination is not Shopify (shop.envirobiotics.com or /shop|/product/*)",
      });
    }
  }

  // enqueue internal links for crawl
  for (const a of doc.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    if (!isInternal(href)) continue;
    const u = new URL(href, BASE);
    const cleanPath = u.pathname;
    if (INTERNAL_SHOP_RE.test(cleanPath)) continue; // these redirect off-site
    if (cleanPath.startsWith("/api/") || cleanPath.startsWith("/admin")) continue;
    if (!visited.has(cleanPath)) queue.push(cleanPath);
  }
}

console.log(`Crawling ${BASE} for Shop/Buy CTAs…`);
while (queue.length) {
  const next = queue.shift();
  await processPath(next);
}

console.log(`\nScanned ${summary.pagesScanned} pages, checked ${summary.ctasChecked} CTA links.`);
if (failures.length === 0) {
  console.log("✅ PASS — all Shop/Buy CTAs navigate to Shopify in the same tab.");
  process.exit(0);
} else {
  console.error(`❌ FAIL — ${failures.length} problem(s):`);
  for (const f of failures) {
    console.error(`  • [${f.page}] "${f.text}" → ${f.href}\n      ${f.reason}`);
  }
  process.exit(1);
}
