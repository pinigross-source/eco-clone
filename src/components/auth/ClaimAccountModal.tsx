import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, ArrowLeft, Loader2, RefreshCw, CheckCircle2, AlertTriangle, HelpCircle, ChevronDown, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/tracking";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClaimAccountModal({ open, onOpenChange }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [networkError, setNetworkError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [helpExpanded, setHelpExpanded] = useState(false);

  const PREVIEW_HOST_PATTERNS = ["lovableproject.com", "id-preview--"];
  const PUBLISHED_APP_ORIGIN = "https://enviro-clean.lovable.app";

  const getResetRedirectOrigin = () => {
    const host = window.location.hostname;
    const isPreviewHost = PREVIEW_HOST_PATTERNS.some((pattern) => host.includes(pattern));
    return isPreviewHost ? PUBLISHED_APP_ORIGIN : window.location.origin;
  };

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // Reset state when modal closes
  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!newOpen) {
      // Keep email for convenience, reset the rest
      setError("");
      setNetworkError("");
      setSuccess(false);
      setLoading(false);
    }
    onOpenChange(newOpen);
  }, [onOpenChange]);

  const sendReset = async () => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setError("");
    setNetworkError("");
    setLoading(true);

    try {
      trackEvent("submit_claim_account", { email });

      const redirectOrigin = getResetRedirectOrigin();
      const { error: fnError } = await supabase.functions.invoke("send-password-reset", {
        body: { email, redirectTo: `${redirectOrigin}/auth?mode=reset` },
      });

      if (fnError) {
        setNetworkError("Something went wrong sending the email. Please try again.");
        return;
      }

      setSuccess(true);
      setResendCooldown(45);
      trackEvent("claim_account_success_shown");
    } catch {
      setNetworkError("Something went wrong sending the email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !email) return;
    trackEvent("click_resend_reset");
    await sendReset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {success ? "Check your email" : "Set a new password"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="bg-primary/10 rounded-xl p-5 text-center">
                <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  If an account exists for <strong>{email}</strong>, we've sent a password reset link. Check spam/promotions too.
                </p>
              </div>

              {/* Resend */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResend}
                disabled={resendCooldown > 0 || loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                {resendCooldown > 0
                  ? `Resend available in ${resendCooldown}s`
                  : "Resend reset email"}
              </Button>

              {/* Support escape hatch */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setHelpExpanded(!helpExpanded)}
                  className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    I'm not receiving the email
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${helpExpanded ? "rotate-180" : ""}`} />
                </button>

                {helpExpanded && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-muted-foreground space-y-1.5 pl-6 list-disc"
                  >
                    <li>Check your spam or promotions folder</li>
                    <li>Wait at least 2 minutes for delivery</li>
                    <li>Try resending after the cooldown</li>
                    <li>Verify the email spelling is correct</li>
                  </motion.ul>
                )}
              </div>

              <div className="flex flex-col gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1 justify-center"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Back to sign in
                </button>
                <a
                  href="/support"
                  className="text-muted-foreground hover:text-foreground text-center transition-colors"
                >
                  Contact support
                </a>
                <a
                  href="/manage-subscription"
                  className="text-xs text-muted-foreground hover:text-foreground text-center transition-colors"
                >
                  Manage a subscription instead →
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                Enter the email you used on our previous store and we'll send a link to set your new password.
              </p>

              {networkError && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-destructive">{networkError}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="claim-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="claim-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                      if (networkError) setNetworkError("");
                    }}
                    className={`pl-10 ${error ? "border-destructive" : ""}`}
                    autoFocus
                  />
                </div>
                {error && <p className="text-xs text-destructive">{error}</p>}
              </div>

              <Button
                variant="hero"
                className="w-full"
                onClick={sendReset}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>

              <div className="flex flex-col items-center gap-2 text-sm pt-1">
                <a href="https://shop.envirobiotics.com/collections/all" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors">
                  <ShoppingBag className="w-3 h-3" />
                  Continue shopping
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
