// SVG icons matching shop.envirobiotics.com header for visual consistency
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export const ShopSearchIcon = ({ size = 22, className, ...props }: IconProps) => (
  <svg
    role="presentation"
    focusable="false"
    width={size}
    height={size}
    viewBox="0 0 22 22"
    strokeWidth={2}
    className={className}
    {...props}
  >
    <circle cx="11" cy="10" r="7" fill="none" stroke="currentColor" />
    <path d="m16 15 3 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ShopAccountIcon = ({ size = 22, className, ...props }: IconProps) => (
  <svg
    role="presentation"
    focusable="false"
    width={size}
    height={size}
    viewBox="0 0 22 22"
    strokeWidth={2}
    className={className}
    {...props}
  >
    <circle cx="11" cy="7" r="4" fill="none" stroke="currentColor" />
    <path
      d="M3.5 19c1.421-2.974 4.247-5 7.5-5s6.079 2.026 7.5 5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

export const ShopCartIcon = ({ size = 22, className, ...props }: IconProps) => (
  <svg
    role="presentation"
    focusable="false"
    width={size}
    height={size}
    viewBox="0 0 22 22"
    strokeWidth={2}
    className={className}
    {...props}
  >
    <path
      d="M11 7H3.577A2 2 0 0 0 1.64 9.497l2.051 8A2 2 0 0 0 5.63 19H16.37a2 2 0 0 0 1.937-1.503l2.052-8A2 2 0 0 0 18.422 7H11Zm0 0V1"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
