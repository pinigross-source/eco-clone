import { HelpCircle, ShoppingBag } from "lucide-react";

export function NeedHelpSection() {
  return (
    <div className="mt-4 pt-4 border-t border-border space-y-2">
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <HelpCircle className="w-4 h-4" />
        <span>Need help?</span>
        <a href="/support" className="text-primary hover:underline font-medium">
          Contact Support
        </a>
      </div>
      <div className="flex justify-center">
        <a
          href="/shop"
          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
        >
          <ShoppingBag className="w-3 h-3" />
          Continue shopping
        </a>
      </div>
    </div>
  );
}
