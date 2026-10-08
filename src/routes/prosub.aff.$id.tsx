import { createFileRoute, useParams } from "@tanstack/react-router"
import { useEffect } from "react"
import { navigateToShopify } from "@/lib/shopify"
import { buildShopUrl } from "@/lib/shopify";
import { AFFILIATE_REDIRECT_MAP } from "@/lib/affiliateRedirects";

const SHOP_URL = buildShopUrl("/collections/prosub")

export const Route = createFileRoute("/prosub/aff/$id")({
  component: ProsubAffiliateRedirect,
})

/**
 * Affiliate deep link straight to the Pro subscription collection.
 * The referral code is passed through untouched for GoAffPro on Shopify.
 */
function ProsubAffiliateRedirect() {
  const { id } = useParams({ from: "/prosub/aff/$id" })

  useEffect(() => {
    // Numeric legacy IDs (e.g. /prosub/aff/16) resolve through the affiliate
    // mapping table; anything else is passed through as a GoAffPro ref.
    const mapped = id ? AFFILIATE_REDIRECT_MAP[id] : undefined
    const url = mapped ?? (id ? `${SHOP_URL}?ref=${encodeURIComponent(id)}` : SHOP_URL)
    navigateToShopify(url, { replace: true })
  }, [id])

  return null
}
