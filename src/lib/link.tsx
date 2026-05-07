// Permissive Link wrapper — relaxes TanStack's strict route-literal typing
// so legacy components ported from react-router-dom keep working.
//
// Shop integration: any link to /shop or /product/* is redirected to the
// external Shopify store at shop.envirobiotics.com. Update SHOPIFY_BASE
// or PRODUCT_MAP to fine-tune destinations.
import { Link as TLink } from "@tanstack/react-router";
import type { ComponentProps, MouseEvent } from "react";

type LinkProps = Omit<ComponentProps<typeof TLink>, "to"> & {
  to: string;
  params?: Record<string, unknown>;
  search?: Record<string, unknown> | string;
  state?: Record<string, unknown>;
  hash?: string;
  replace?: boolean;
};

const SHOPIFY_BASE = "https://shop.envirobiotics.com";

// Map internal product slugs → Shopify product handles.
// Adjust handles to match the actual Shopify store URLs.
const PRODUCT_MAP: Record<string, string> = {
  "biologic-mini": "/products/biologic-mini",
  "biotica-800": "/products/biotica-800",
  "ba-2080": "/products/ba-2080",
  "betterair-2080": "/products/ba-2080",
  "ebiotic-pro": "/products/e-biotic-pro",
};

export function resolveShopifyUrl(to: string): string | null {
  // Strip query/hash for matching
  const [pathOnly] = to.split(/[?#]/);

  if (pathOnly === "/shop" || pathOnly.startsWith("/shop/")) {
    return SHOPIFY_BASE + pathOnly.replace(/^\/shop/, "/collections/all");
  }

  const productMatch = pathOnly.match(/^\/product\/([^/]+)$/);
  if (productMatch) {
    const slug = productMatch[1];
    const mapped = PRODUCT_MAP[slug] ?? `/products/${slug}`;
    return SHOPIFY_BASE + mapped;
  }

  if (pathOnly === "/subscribe") {
    return SHOPIFY_BASE + "/collections/subscriptions";
  }

  return null;
}

export function Link(props: LinkProps) {
  const { to, onClick, children, ...rest } = props;
  const externalUrl = typeof to === "string" ? resolveShopifyUrl(to) : null;

  if (externalUrl) {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e as unknown as never);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anchorProps = rest as any;
    return (
      <a
        {...anchorProps}
        href={externalUrl}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TLink {...(props as any)} />;
}

export type { LinkProps };
