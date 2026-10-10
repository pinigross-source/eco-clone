import { describe, it, expect } from "bun:test";
import { businessQuoteSchema, businessQuoteMessage, BUSINESS_QUOTE_SUBJECT } from "./businessQuote";
const request = { source: "business", name: "Facility Test", email: "facility@example.com" };
describe("business quote validation", () => {
  it("requires a full name", () => expect(businessQuoteSchema.safeParse({ ...request, name: " " }).success).toBe(false));
  it("requires a valid work email", () => expect(businessQuoteSchema.safeParse({ ...request, email: "invalid" }).success).toBe(false));
  it("keeps all other fields optional", () => expect(businessQuoteSchema.parse(request).company).toBe(""));
  it("rejects unknown space types", () => expect(businessQuoteSchema.safeParse({ ...request, spaceType: "Unknown" }).success).toBe(false));
  it("bounds request details at 1000 characters", () => expect(businessQuoteSchema.safeParse({ ...request, needs: "x".repeat(1001) }).success).toBe(false));
  it("retains company, phone, size and needs for email and storage", () => {
    const data = businessQuoteSchema.parse({ ...request, company: "Hotel", phone: "8336923883", area: "100 rooms", needs: "Lobby odor", spaceType: "Hotel, resort or rental" });
    expect(businessQuoteMessage(data)).toContain("Approx. area or rooms: 100 rooms");
    expect(businessQuoteMessage(data)).toContain("Lobby odor");
    expect(BUSINESS_QUOTE_SUBJECT).toBe("Business facility quote request");
  });
});
