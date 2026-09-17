import { createFileRoute } from "@tanstack/react-router"
import { useEffect } from "react"
import { navigateToShopify } from "@/lib/shopify"
import { buildShopUrl } from "@/lib/shopify";

export const Route = createFileRoute("/prosub")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(null, {
          status: 301,
          headers: {
            Location: buildShopUrl("/collections/prosub"),
          },
        })
      },
    },
  },
  component: () => {
    useEffect(() => {
      navigateToShopify(buildShopUrl("/collections/prosub"), {
        replace: true,
      })
    }, [])
    return null
  },
})
