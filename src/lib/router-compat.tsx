// React-Router-DOM compatibility shims for TanStack Router.
// Implements just enough of useSearchParams / Navigate to keep ported code working.
import { useEffect, useMemo, useCallback } from "react";
import { useNavigate, useRouterState, Link } from "@tanstack/react-router";

type SetSearchParamsOptions = { replace?: boolean };
type SetSearchParamsArg =
  | URLSearchParams
  | Record<string, string>
  | ((prev: URLSearchParams) => URLSearchParams | Record<string, string>);

export function useSearchParams(): [
  URLSearchParams,
  (next: SetSearchParamsArg, options?: SetSearchParamsOptions) => void,
] {
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const params = useMemo(() => new URLSearchParams(search ?? ""), [search]);

  const setSearchParams = useCallback(
    (next: SetSearchParamsArg, options?: SetSearchParamsOptions) => {
      const resolved = typeof next === "function" ? next(new URLSearchParams(search ?? "")) : next;
      const usp =
        resolved instanceof URLSearchParams ? resolved : new URLSearchParams(resolved as Record<string, string>);
      const obj: Record<string, string> = {};
      usp.forEach((v, k) => {
        obj[k] = v;
      });
      navigate({
        to: pathname,
        search: obj as never,
        replace: options?.replace,
      });
    },
    [navigate, pathname, search],
  );

  return [params, setSearchParams];
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: to as never, replace });
  }, [navigate, to, replace]);
  return null;
}

export { Link };
