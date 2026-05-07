import { useQuery } from "@tanstack/react-query";
import {
  getShopifyProduct,
  getShopifyProducts,
  getShopifyInventory,
} from "@/server/shopify.functions";

export function useShopifyProduct(handle: string | undefined) {
  return useQuery({
    queryKey: ["shopify", "product", handle],
    queryFn: () => getShopifyProduct({ data: { handle: handle! } }),
    enabled: !!handle,
    staleTime: 5 * 60 * 1000,
  });
}

export function useShopifyProducts(handles: string[]) {
  return useQuery({
    queryKey: ["shopify", "products", ...handles],
    queryFn: () => getShopifyProducts({ data: { handles } }),
    enabled: handles.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useShopifyInventory(handles: string[]) {
  return useQuery({
    queryKey: ["shopify", "inventory", ...handles],
    queryFn: () => getShopifyInventory({ data: { handles } }),
    enabled: handles.length > 0,
    staleTime: 60 * 1000,
  });
}
