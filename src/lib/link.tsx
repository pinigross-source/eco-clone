// Permissive Link wrapper  relaxes TanStack's strict route-literal typing
// so legacy components ported from react-router-dom keep working.
//
// Shop integration: any link to /shop or /product/* is redirected to the
// external Shopify store at shop.envirobiotics.com. Update SHOPIFY_BASE
// or PRODUCT_MAP to fine-tune destinations.
import { Link as TLink } from "@tanstack/react-router";
import type { ComponentProps, MouseEvent } from "react";
import { resolveShopifyUrl } from "@/lib/shopify";

type LinkProps = Omit<ComponentProps<typeof TLink>, "to"> & {
  to: string;
  params?: Record<string, unknown>;
  search?: Record<string, unknown> | string;
  state?: Record<string, unknown>;
  hash?: string;
  replace?: boolean;
};

export { resolveShopifyUrl };

export function Link(props: LinkProps) {
  const { to, onClick, children, ...rest } = props;
  const isAbsolute = typeof to === "string" && /^https?:\/\//i.test(to);
  const externalUrl = isAbsolute ? to : typeof to === "string" ? resolveShopifyUrl(to) : null;

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
        target="_top"
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
