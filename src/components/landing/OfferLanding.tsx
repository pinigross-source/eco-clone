import type { ReactNode } from "react";
import { OfferProvider, type OfferId } from "@/lib/offer";
import { OfferPromoBar } from "@/components/consumer/ConsumerCRO";

export type LandingPageProps = {
  /** "guarantee" = organic page, "meta15" = paid /go/* variant. */
  offer?: OfferId;
};

/**
 * Shared shell for every consumer landing page. Supplies the active offer to
 * all shop links, prices, and badges, and renders the promo bar when the
 * meta15 offer is active.
 */
export function OfferLanding({
  offer = "guarantee",
  pageName,
  children,
}: {
  offer?: OfferId;
  pageName: string;
  children: ReactNode;
}) {
  return (
    <OfferProvider offer={offer} pageName={pageName}>
      <OfferPromoBar />
      {children}
    </OfferProvider>
  );
}
