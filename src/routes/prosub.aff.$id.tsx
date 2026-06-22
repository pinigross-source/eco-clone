import { createFileRoute, useParams } from "@tanstack/react-router"
import { useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

const SHOP_URL = "https://shop.envirobiotics.com/collections/prosub"

export const Route = createFileRoute("/prosub/aff/$id")({
  component: ProsubAffiliateRedirect,
})

function ProsubAffiliateRedirect() {
  const { id } = useParams({ from: "/prosub/aff/$id" })

  useEffect(() => {
    const run = async () => {
      const num = parseInt(id, 10)
      if (isNaN(num)) {
        window.location.replace(SHOP_URL)
        return
      }

      const { data } = await (supabase as any)
        .from("affiliates")
        .select("referral_code")
        .eq("affiliate_number", num)
        .eq("status", "active")
        .limit(1)

      const code = data?.[0]?.referral_code
      window.location.replace(code ? `${SHOP_URL}?ref=${encodeURIComponent(code)}` : SHOP_URL)
    }
    run()
  }, [id])

  return null
}
