import { describe, expect, test } from "bun:test";
import { isAppHost, isCorsAllowedOrigin, injectNoindexMeta } from "./hosts";

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
