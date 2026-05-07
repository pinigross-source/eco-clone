import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const AFFILIATE_STORAGE_KEY = "eb_affiliate_ref";
const AFFILIATE_EXPIRY_KEY = "eb_affiliate_ref_expiry";
const COOKIE_DAYS = 30;

export interface AffiliateRef {
  code: string;
  type: "link" | "coupon";
}

/**
 * Reads ?ref=CODE from the URL on first visit,
 * stores it in localStorage with a 30-day expiry.
 * Also checks discount codes against affiliate coupon codes.
 */
export function useAffiliateTracking() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      setAffiliateRef({ code: refCode, type: "link" });
      // Clean the URL without reloading
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("ref");
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);
}

export function setAffiliateRef(ref: AffiliateRef) {
  const expiry = Date.now() + COOKIE_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(AFFILIATE_STORAGE_KEY, JSON.stringify(ref));
  localStorage.setItem(AFFILIATE_EXPIRY_KEY, String(expiry));
}

export function getAffiliateRef(): AffiliateRef | null {
  const expiry = localStorage.getItem(AFFILIATE_EXPIRY_KEY);
  if (expiry && Date.now() > Number(expiry)) {
    clearAffiliateRef();
    return null;
  }
  const stored = localStorage.getItem(AFFILIATE_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AffiliateRef;
  } catch {
    return null;
  }
}

export function clearAffiliateRef() {
  localStorage.removeItem(AFFILIATE_STORAGE_KEY);
  localStorage.removeItem(AFFILIATE_EXPIRY_KEY);
}

/**
 * Check if a discount code matches an affiliate coupon.
 * Called when user applies a discount code at checkout.
 */
export function setAffiliateCoupon(couponCode: string) {
  // Only set if no existing link-based ref (link takes priority)
  const existing = getAffiliateRef();
  if (!existing || existing.type !== "link") {
    setAffiliateRef({ code: couponCode, type: "coupon" });
  }
}
