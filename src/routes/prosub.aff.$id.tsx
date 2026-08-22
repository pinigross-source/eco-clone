import { createFileRoute, useParams } from "@tanstack/react-router"
import { useEffect } from "react"

const SHOP_URL = "https://shop.envirobiotics.com/collections/prosub"

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
    const url = id ? `${SHOP_URL}?ref=${encodeURIComponent(id)}` : SHOP_URL
    window.location.replace(url)
  }, [id])

  return null
}
