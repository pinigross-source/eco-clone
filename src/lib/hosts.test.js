import { describe, expect, test } from "bun:test";
import { isAppHost, isCorsAllowedOrigin, injectNoindexMeta, customerRedirectTarget } from "./hosts";
import { resolveShopifyUrl, shopifyDiscountUrl, buildShopUrl } from "./shopify";

describe("host rules", () => {
  test("app host is detected, root domain is not", () => {
    expect(isAppHost("app.envirobiotics.com")).toBe(true);
    expect(isAppHost("envirobiotics.com")).toBe(false);
    expect(isAppHost("www.envirobiotics.com")).toBe(false);
  });
  test("CORS allows the four envirobiotics origins only", () => {
    for (const o of ["https://envirobiotics.com", "https://www.envirobiotics.com", "https://shop.envirobiotics.com", "https://app.envirobiotics.com"]) {
      expect(isCorsAllowedOrigin(o)).toBe(true);
    }
    expect(isCorsAllowedOrigin("https://evil.com")).toBe(false);
  });
  test("noindex meta is injected into the head", () => {
    expect(injectNoindexMeta("<html><head><title>x</title></head>")).toBe(
      '<html><head><meta name="robots" content="noindex,nofollow"><title>x</title></head>',
    );
  });
});

describe("staff-only app: customer pages go to the store", () => {
  test("old pages redirect to the same path and query on envirobiotics.com", () => {
    expect(customerRedirectTarget("/contact", "?a=1")).toBe("https://envirobiotics.com/contact?a=1");
    expect(customerRedirectTarget("/blog/some-post")).toBe("https://envirobiotics.com/blog/some-post");
    expect(customerRedirectTarget("/auth")).toBe("https://envirobiotics.com/auth");
    expect(customerRedirectTarget("/")).toBe("https://envirobiotics.com/");
  });
  test("kept app paths are served here", () => {
    for (const p of ["/admin", "/admin/emails", "/link-check", "/staff-login", "/go/pets", "/lp/p1-air-7k2m", "/beyond-bleach", "/aff/8", "/prosub", "/prosub/aff/16", "/affiliate-signup", "/api/public/track-visit", "/robots.txt", "/favicon.png"]) {
      expect(customerRedirectTarget(p)).toBeNull();
    }
  });
  test("ad-page links resolve to the store", () => {
    expect(resolveShopifyUrl("/contact")).toBe("https://envirobiotics.com/pages/support");
    expect(resolveShopifyUrl("/support")).toBe("https://envirobiotics.com/pages/support");
    expect(resolveShopifyUrl("/research")).toBe("https://envirobiotics.com/research");
    expect(resolveShopifyUrl("/go/allergy")).toBeNull();
  });
  test("store links use the root domain", () => {
    expect(buildShopUrl("/products/biologic-mini")).toBe("https://envirobiotics.com/products/biologic-mini");
    expect(shopifyDiscountUrl("META15", "/products/biologic-mini")).toBe("https://envirobiotics.com/discount/META15?redirect=%2Fproducts%2Fbiologic-mini");
  });
});
