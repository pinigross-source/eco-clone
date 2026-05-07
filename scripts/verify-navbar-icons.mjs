#!/usr/bin/env node
/**
 * Verifies the navbar icon cluster (Search, Account, Cart) routes to Shopify
 * in the same browser tab.
 *
 * - Cart  → must be an <a> pointing at shop.envirobiotics.com (no target=_blank)
 * - Account → must be an <a> that, after the project's resolveShopifyUrl
 *             rewrite, points at Shopify (no target=_blank)
 * - Search → is a button that opens an in-page overlay (not a navigation),
 *             so we only assert the trigger exists.
 *
 * Usage: node scripts/verify-navbar-icons.mjs [baseUrl]
 */
import { JSDOM } from "jsdom";

const BASE = process.argv[2] || "https://enviro-clone-spark.lovable.app";
const SHOPIFY_HOST = "shop.envirobiotics.com";
const INTERNAL_SHOP_RE = /^\/(shop|product\/|cart|checkout|account|subscribe|subscription|orders?|order-history|manage-subscription|product-registration|pro-subscription)/;

function resolvesToShopify(href) {
  if (!href) return false;
  try {
    const u = new URL(href, BASE);
    if (u.hostname === SHOPIFY_HOST) return true;
    if (u.origin === new URL(BASE).origin && INTERNAL_SHOP_RE.test(u.pathname)) return true;
  } catch {}
  return false;
}

const res = await fetch(BASE);
if (!res.ok) {
  console.error(`Failed to fetch ${BASE}: HTTP ${res.status}`);
  process.exit(2);
}
const dom = new JSDOM(await res.text());
const doc = dom.window.document;

const checks = [
  { name: "Cart",    selector: 'a[aria-label*="cart" i], a[title="Cart"]' },
  { name: "Account", selector: 'a[aria-label*="account" i], a[aria-label*="sign in" i], a[title*="Account" i], a[title*="Sign In" i]' },
];

const failures = [];

for (const { name, selector } of checks) {
  const els = [...doc.querySelectorAll(selector)];
  if (els.length === 0) {
    failures.push(`${name}: no anchor matched selector ${selector}`);
    continue;
  }
  for (const el of els) {
    const href = el.getAttribute("href");
    const target = el.getAttribute("target");
    if (target === "_blank") {
      failures.push(`${name}: target="_blank" on ${href}`);
    }
    if (!resolvesToShopify(href)) {
      failures.push(`${name}: href "${href}" does not route to Shopify`);
    } else {
      console.log(`✓ ${name} → ${href}`);
    }
  }
}

// Search trigger (button, not link)
const searchBtn = doc.querySelector(
  'button[aria-label*="search" i], [aria-label*="open search" i]'
);
if (searchBtn) console.log(`✓ Search trigger present (in-page overlay)`);
else failures.push(`Search: no search trigger found`);

if (failures.length) {
  console.error(`\n❌ FAIL — ${failures.length} issue(s):`);
  failures.forEach((f) => console.error(`  • ${f}`));
  process.exit(1);
}
console.log(`\n✅ PASS — all navbar icons route to Shopify in the same tab.`);
