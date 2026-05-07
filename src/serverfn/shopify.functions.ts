import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const STOREFRONT_API_VERSION = "2024-10";

function getShopifyConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !token) {
    throw new Error(
      "Shopify Storefront not configured. Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_TOKEN.",
    );
  }
  return { domain, token };
}

async function storefrontFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const { domain, token } = getShopifyConfig();
  const res = await fetch(`https://${domain}/api/${STOREFRONT_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Shopify Storefront API ${res.status}: ${body.slice(0, 200)}`);
  }
  const json = (await res.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  if (!json.data) throw new Error("Shopify Storefront returned no data");
  return json.data;
}

// ---- Types returned to the client ----
export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}
export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  sku: string | null;
}
export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  totalInventory: number | null;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: ShopifyMoney; maxVariantPrice: ShopifyMoney };
  variants: ShopifyVariant[];
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  availableForSale
  totalInventory
  featuredImage { url altText }
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  variants(first: 25) {
    nodes {
      id
      title
      availableForSale
      quantityAvailable
      sku
      price { amount currencyCode }
      compareAtPrice { amount currencyCode }
    }
  }
`;

function normalizeProduct(p: any): ShopifyProduct {
  return { ...p, variants: p.variants?.nodes ?? [] };
}

/** Fetch a single product by its Shopify handle. */
export const getShopifyProduct = createServerFn({ method: "GET" })
  .inputValidator(z.object({ handle: z.string().min(1).max(255) }).parse)
  .handler(async ({ data }) => {
    const result = await storefrontFetch<{ product: any | null }>(
      `query Product($handle: String!) {
        product(handle: $handle) { ${PRODUCT_FIELDS} }
      }`,
      { handle: data.handle },
    );
    return result.product ? normalizeProduct(result.product) : null;
  });

/** Fetch multiple products by handle in a single request. */
export const getShopifyProducts = createServerFn({ method: "GET" })
  .inputValidator(z.object({ handles: z.array(z.string().min(1).max(255)).min(1).max(50) }).parse)
  .handler(async ({ data }) => {
    const aliases = data.handles
      .map(
        (h, i) =>
          `p${i}: product(handle: ${JSON.stringify(h)}) { ${PRODUCT_FIELDS} }`,
      )
      .join("\n");
    const result = await storefrontFetch<Record<string, any | null>>(`query { ${aliases} }`);
    return data.handles.map((handle, i) => {
      const p = result[`p${i}`];
      return { handle, product: p ? normalizeProduct(p) : null };
    });
  });

/** Lightweight inventory + availability check for a list of handles. */
export const getShopifyInventory = createServerFn({ method: "GET" })
  .inputValidator(z.object({ handles: z.array(z.string().min(1).max(255)).min(1).max(50) }).parse)
  .handler(async ({ data }) => {
    const aliases = data.handles
      .map(
        (h, i) =>
          `p${i}: product(handle: ${JSON.stringify(h)}) {
            handle availableForSale totalInventory
          }`,
      )
      .join("\n");
    const result = await storefrontFetch<Record<string, any | null>>(`query { ${aliases} }`);
    return data.handles.map((handle, i) => {
      const p = result[`p${i}`];
      return {
        handle,
        availableForSale: p?.availableForSale ?? false,
        totalInventory: p?.totalInventory ?? null,
      };
    });
  });
