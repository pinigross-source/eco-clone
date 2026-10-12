import { createFileRoute } from "@tanstack/react-router";

// "/" is redirected to the Shopify store by the root route and the server.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EnviroBiotics" },
      { name: "description", content: "EnviroBiotics has moved to envirobiotics.com." },
      { property: "og:title", content: "EnviroBiotics" },
      { property: "og:description", content: "EnviroBiotics has moved to envirobiotics.com." },
    ],
  }),
  component: () => null,
});
