// Permissive Link wrapper — relaxes TanStack's strict route-literal typing
// so legacy components ported from react-router-dom keep working.
import { Link as TLink } from "@tanstack/react-router";
import type { ComponentProps } from "react";

type LinkProps = Omit<ComponentProps<typeof TLink>, "to"> & {
  to: string;
  params?: Record<string, unknown>;
  search?: Record<string, unknown> | string;
  state?: Record<string, unknown>;
  hash?: string;
  replace?: boolean;
};

export function Link(props: LinkProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TLink {...(props as any)} />;
}

export type { LinkProps };
