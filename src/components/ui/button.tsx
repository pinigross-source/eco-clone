import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-[-0.01em] ring-offset-background cursor-pointer select-none transition-[background-color,color,border-color,transform,box-shadow,opacity] duration-150 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-150 active:[&_svg]:scale-95",
  {
    variants: {
      variant: {
        // Sonos-style: solid black pill, no heavy shadow, subtle hover
        default: "bg-foreground text-background hover:bg-foreground/90 shadow-none",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-none",
        outline: "border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5 hover:border-foreground/40 shadow-none",
        "outline-light": "border border-white/40 bg-transparent text-white hover:bg-white/10 hover:border-white shadow-none",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-none",
        ghost: "hover:bg-foreground/5 hover:text-foreground rounded-full",
        link: "text-foreground underline-offset-4 hover:underline rounded-none",
        // Hero kept as primary brand pill but flatter, no transform
        hero: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-none",
        "hero-outline": "border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5 hover:border-foreground/40 shadow-none",
        premium: "bg-foreground text-background hover:bg-foreground/90 shadow-none",
        glass: "bg-background/70 backdrop-blur-md border border-border/50 text-foreground hover:bg-background/90",
        // Impact theme variants  already Sonos-aligned
        impact: "bg-foreground text-background hover:bg-foreground/90 shadow-none",
        "impact-outline": "bg-transparent border border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40 shadow-none",
        "impact-light": "bg-white text-black hover:bg-white/90 shadow-none",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base font-bold",
        icon: "h-10 w-10",
        "impact-md": "h-12 px-7 py-3 text-[15px]",
        "impact-lg": "h-14 px-9 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
