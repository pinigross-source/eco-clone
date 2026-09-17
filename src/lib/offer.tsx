import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { SHOPIFY_BASE, PRODUCT_HANDLE_MAP } from "@/lib/shopify";
import { captureSessionAttribution, withVisitorAttribution } from "@/lib/attribution-session";

export type OfferId = "guarantee" | "meta15";

export const META15_CODE = "META15";
export const META15_PERCENT = 15;

export type OfferValue = {
  offer: OfferId;
  /** Page name used for utm_content on outbound shop links. */
  pageName: string;
  isPromo: boolean;
  discountPercent: number;
  /** Build an outbound shop URL for an internal product slug or handle. */
  shopUrl: (slugOrHandle: string) => string;
  /** Build an outbound shop URL from a raw shop path, e.g. "/products/x". */
  shopPathUrl: (path: string) => string;
  /** Discounted price for the current offer, rounded to cents. */
  salePrice: (basePrice: number) => number;
};

const OfferContext = createContext<OfferValue | null>(null);

/**
 * The single source of truth for every outbound shop.envirobiotics.com URL.
 *
 * guarantee -> https://shop.envirobiotics.com{productPath}
 * meta15    -> https://shop.envirobiotics.com/discount/META15?redirect={encoded productPath}
 *
 * No hard-coded utm_source / utm_medium / utm_campaign. The visitor's own
 * campaign params (saved in sessionStorage on the first page load) plus
 * utm_content={pageName} are appended at click time, because decorating
 * during render would break SSR hydration.
 */
export function buildShopUrl(productPath: string, offer: OfferId = "guarantee", _pageName?: string): string {
  const clean = productPath.startsWith("/") ? productPath : `/${productPath}`;
  if (offer === "meta15") {
    return `${SHOPIFY_BASE}/discount/${META15_CODE}?redirect=${encodeURIComponent(clean)}`;
  }
  return `${SHOPIFY_BASE}${clean}`;
}

export function OfferProvider({
  offer,
  pageName,
  children,
}: {
  offer: OfferId;
  pageName: string;
  children: ReactNode;
}) {
  useEffect(() => {
    captureSessionAttribution();

    // Decorate every outbound shop link at click time (SSR-safe).
    const onPointer = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      let host = "";
      try {
        host = new URL(anchor.href, window.location.href).host;
      } catch {
        return;
      }
      if (!host.startsWith("shop.")) return;
      anchor.href = withVisitorAttribution(anchor.href, pageName);
    };
    document.addEventListener("click", onPointer, true);
    document.addEventListener("auxclick", onPointer, true);
    return () => {
      document.removeEventListener("click", onPointer, true);
      document.removeEventListener("auxclick", onPointer, true);
    };
  }, [pageName, offer]);

  const value = useMemo<OfferValue>(() => {
    const isPromo = offer === "meta15";
    return {
      offer,
      pageName,
      isPromo,
      discountPercent: isPromo ? META15_PERCENT : 0,
      shopUrl: (slugOrHandle: string) =>
        buildShopUrl(`/products/${PRODUCT_HANDLE_MAP[slugOrHandle] ?? slugOrHandle}`, offer, pageName),
      shopPathUrl: (path: string) => buildShopUrl(path, offer, pageName),
      salePrice: (basePrice: number) =>
        isPromo ? Math.round(basePrice * (1 - META15_PERCENT / 100) * 100) / 100 : basePrice,
    };
  }, [offer, pageName]);

  return <OfferContext.Provider value={value}>{children}</OfferContext.Provider>;
}

const DEFAULT_OFFER: OfferValue = {
  offer: "guarantee",
  pageName: "site",
  isPromo: false,
  discountPercent: 0,
  shopUrl: (slugOrHandle: string) =>
    buildShopUrl(`/products/${PRODUCT_HANDLE_MAP[slugOrHandle] ?? slugOrHandle}`, "guarantee"),
  shopPathUrl: (path: string) => buildShopUrl(path, "guarantee"),
  salePrice: (basePrice: number) => basePrice,
};

export function useOffer(): OfferValue {
  return useContext(OfferContext) ?? DEFAULT_OFFER;
}

export function formatPrice(value: number): string {
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}
