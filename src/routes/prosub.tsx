import { createFileRoute } from "@tanstack/react-router"
import { useEffect } from "react"

export const Route = createFileRoute("/prosub")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(null, {
          status: 301,
          headers: {
            Location: "https://shop.envirobiotics.com/collections/prosub",
          },
        })
      },
    },
  },
  component: () => {
    useEffect(() => {
      window.location.replace("https://shop.envirobiotics.com/collections/prosub")
    }, [])
    return null
  },
})
