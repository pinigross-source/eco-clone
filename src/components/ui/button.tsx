import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-button text-white hover:bg-primary-button-hover shadow-md hover:shadow-lg hover:shadow-primary/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-border bg-background hover:bg-muted hover:border-primary/30 text-foreground",
        "outline-light": "border-2 border-white/30 bg-transparent hover:bg-white/10 hover:border-white/50 text-white",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary-button text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary-button-hover transform hover:-translate-y-0.5 active:translate-y-0",
        "hero-outline": "border-2 border-primary/30 bg-background/80 backdrop-blur-sm hover:bg-primary-soft hover:border-primary text-foreground font-semibold",
        premium: "bg-gradient-to-r from-primary-button to-primary-glow text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transform hover:-translate-y-0.5",
        glass: "bg-background/60 backdrop-blur-md border border-border/50 text-foreground hover:bg-background/80 hover:border-primary/30",
        // Impact theme variants
        impact: "bg-foreground text-background rounded-full hover:bg-foreground/90 shadow-none font-semibold tracking-[-0.01em]",
        "impact-outline": "bg-transparent border-2 border-foreground/20 text-foreground rounded-full hover:bg-foreground/5 hover:border-foreground/40 font-semibold tracking-[-0.01em]",
        "impact-light": "bg-white text-black rounded-full hover:bg-white/90 shadow-none font-semibold tracking-[-0.01em]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-13 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-base font-bold",
        icon: "h-10 w-10",
        // Impact sizes
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
