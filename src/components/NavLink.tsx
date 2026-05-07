// Compat NavLink — react-router-dom-style activeClassName API on top of TanStack Link.
import { Link, useRouterState } from "@tanstack/react-router";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps {
  to: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  end?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  [key: string]: unknown;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, end, ...props }, ref) => {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    const isActive = end ? pathname === to : pathname === to || pathname.startsWith(to + "/");
    return (
      <Link
        ref={ref}
        to={to as never}
        className={cn(className, isActive && activeClassName, isActive && pendingClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
