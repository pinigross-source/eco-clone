import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { KeyRound, Info } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

interface Props {
  onClaimClick: () => void;
}

export function LegacyCustomerBanner({ onClaimClick }: Props) {
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-muted/50 p-5 space-y-3">
      <div className="flex items-center gap-2">
        <KeyRound className="w-5 h-5 text-foreground" />
        <h2 className="font-display font-semibold text-lg">
          Returning customers <span className="text-muted-foreground font-normal text-sm">(previous store)</span>
        </h2>
      </div>
      <p className="text-sm text-muted-foreground">
        We upgraded our store. If you had an account on our previous WordPress site for one-time purchases, you'll need to set a new password.
      </p>
      <Button
        variant="outline"
        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        onClick={() => {
          trackEvent("click_claim_account");
          onClaimClick();
        }}
      >
        Set a new password
      </Button>

      <div className="text-center">
        <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
          <DialogTrigger asChild>
            <button className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors">
              <Info className="w-3 h-3" />
              Learn more
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="font-display">Why do I need a new password?</DialogTitle>
            </DialogHeader>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                WordPress passwords don't transfer to the new store.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                Setting a new password securely links your account.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                If you're a subscriber, use the{" "}
                <a href="/manage-subscription" className="text-primary hover:underline font-medium">
                  subscription portal
                </a>{" "}
                instead.
              </li>
            </ul>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
