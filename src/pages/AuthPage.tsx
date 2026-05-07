import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, ArrowLeft, AlertTriangle } from "lucide-react";
import { z } from "zod";
import { trackEvent } from "@/lib/tracking";
import { SubscriberBanner } from "@/components/auth/SubscriberBanner";
import { LegacyCustomerBanner } from "@/components/auth/LegacyCustomerBanner";
import { ClaimAccountModal } from "@/components/auth/ClaimAccountModal";
import { NeedHelpSection } from "@/components/auth/NeedHelpSection";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

type AuthMode = "login" | "signup" | "reset";

const getRecoveryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const tokenHash = params.get("token_hash") ?? params.get("tokenHash");
  const type = params.get("type");
  const mode = params.get("mode");

  return {
    tokenHash,
    type,
    shouldShowReset: mode === "reset" || (type === "recovery" && Boolean(tokenHash)),
  };
};

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [showLoginFailedClaim, setShowLoginFailedClaim] = useState(false);
  const [resetLinkExpired, setResetLinkExpired] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Caps Lock detection
  const handleKeyEvent = useCallback((e: KeyboardEvent) => {
    if (e.getModifierState) {
      setCapsLockOn(e.getModifierState("CapsLock"));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent);
    window.addEventListener("keyup", handleKeyEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
      window.removeEventListener("keyup", handleKeyEvent);
    };
  }, [handleKeyEvent]);

  useEffect(() => {
    const { tokenHash, type, shouldShowReset } = getRecoveryParams();

    if (shouldShowReset) {
      setMode("reset");
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          setMode("reset");
          setResetLinkExpired(false);
          setInlineError(null);
          return;
        }
        if (session?.user && !shouldShowReset) {
          navigate("/");
        }
      }
    );

    const bootstrapRecovery = async () => {
      if (type === "recovery" && tokenHash) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: "recovery",
        });

        if (error) {
          setResetLinkExpired(true);
          setInlineError("This reset link has expired. Please request a new one.");
          return;
        }

        setMode("reset");
        setResetLinkExpired(false);
        setInlineError(null);

        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.set("mode", "reset");
        cleanUrl.searchParams.delete("token_hash");
        cleanUrl.searchParams.delete("tokenHash");
        cleanUrl.searchParams.delete("type");
        cleanUrl.hash = "";

        window.history.replaceState({}, document.title, `${cleanUrl.pathname}${cleanUrl.search}`);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user && !shouldShowReset) {
        navigate("/");
      }
    };

    void bootstrapRecovery();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (mode !== "reset") {
      const emailResult = emailSchema.safeParse(formData.email);
      if (!emailResult.success) {
        newErrors.email = emailResult.error.errors[0].message;
      }
    }

    if (mode !== "reset") {
      const passwordResult = passwordSchema.safeParse(formData.password);
      if (!passwordResult.success) {
        newErrors.password = passwordResult.error.errors[0].message;
      }
    }

    if (mode === "reset") {
      const passwordResult = passwordSchema.safeParse(formData.password);
      if (!passwordResult.success) {
        newErrors.password = passwordResult.error.errors[0].message;
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (mode === "signup" && !formData.displayName.trim()) {
      newErrors.displayName = "Please enter your name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError(null);
    setShowLoginFailedClaim(false);

    if (mode === "reset") {
      await handleSetNewPassword();
      return;
    }

    if (!validateForm()) return;
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          trackEvent("login_failed", { email: formData.email });
          const msg = error.message.toLowerCase();
          if (msg.includes("invalid login credentials")) {
            setInlineError("Email or password is incorrect. If you had an account on our previous store, set a new password to get started.");
            setShowLoginFailedClaim(true);
          } else if (msg.includes("email not confirmed")) {
            setInlineError("Please confirm your email address before signing in.");
          } else if (msg.includes("rate") || msg.includes("too many")) {
            setInlineError("Too many attempts. Please try again in a few minutes.");
          } else {
            setInlineError(error.message);
          }
          setFormData((prev) => ({ ...prev, password: "" }));
          return;
        }

        toast.success("Welcome back!");
        navigate("/");
      } else {
        const { data, error } = await supabase.functions.invoke("custom-signup", {
          body: {
            email: formData.email,
            password: formData.password,
            displayName: formData.displayName,
            redirectTo: `${window.location.origin}/`,
          },
        });

        if (error) {
          const errorMsg = typeof error === "object" && "message" in error ? error.message : String(error);
          if (errorMsg.includes("already registered")) {
            setInlineError("This email is already registered. Please sign in instead.");
            setMode("login");
          } else {
            setInlineError(errorMsg || "Failed to create account.");
          }
          return;
        }

        if (data?.error) {
          if (data.error.includes("already registered")) {
            setInlineError("This email is already registered. Please sign in instead.");
            setMode("login");
          } else {
            setInlineError(data.error);
          }
          return;
        }

        toast.success("Account created! Please check your email to confirm your address.");
      }
    } catch {
      setInlineError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetNewPassword = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setInlineError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) {
        const msg = error.message.toLowerCase();
        if (msg.includes("weak") || msg.includes("pwned")) {
          setInlineError("Password is too common. Please choose a more unique password.");
        } else if (msg.includes("expired") || msg.includes("invalid") || msg.includes("not authorized")) {
          setResetLinkExpired(true);
          setInlineError("This reset link has expired. Please request a new one.");
        } else {
          setInlineError(error.message);
        }
        return;
      }

      toast.success("Password updated successfully! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      setInlineError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Determine heading text
  const headingMap: Record<AuthMode, { badge: string; title: string; desc: string }> = {
    login: {
      badge: "Account",
      title: "Sign In",
      desc: "Sign in to your store account",
    },
    signup: {
      badge: "Join EnviroBiotics",
      title: "Create Account",
      desc: "Sign up to manage your products and orders",
    },
    reset: {
      badge: "Set New Password",
      title: "Reset Password",
      desc: "Enter your new password below",
    },
  };

  const heading = headingMap[mode];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container max-w-md mx-auto px-4 space-y-4">

          {/* CHANGE 1 — Subscriber Banner */}
          {mode === "login" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SubscriberBanner />
            </motion.div>
          )}

          {/* CHANGE 2 — Legacy Customer Banner */}
          {mode === "login" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <LegacyCustomerBanner onClaimClick={() => setClaimModalOpen(true)} />
            </motion.div>
          )}

          {/* CHANGE 3 — Sign In Form (visually secondary) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: mode === "login" ? 0.2 : 0 }}
            className="bg-card rounded-2xl border border-border p-8 shadow-lg"
            id="signin-form"
          >
            <div className="text-center mb-6">
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                <User className="w-3 h-3 mr-1" />
                {heading.badge}
              </Badge>
              <h1 className="font-display font-bold text-2xl sm:text-3xl mb-1">
                {heading.title}
              </h1>
              <p className="text-muted-foreground text-sm">{heading.desc}</p>
            </div>

            {/* Inline error banner */}
            {inlineError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-3"
              >
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm text-destructive">{inlineError}</p>
                  {/* CHANGE 5 — Claim from login error */}
                  {showLoginFailedClaim && (
                    <div className="space-y-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-destructive/30 text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          trackEvent("click_claim_from_login_error");
                          setClaimModalOpen(true);
                        }}
                      >
                        Set a new password
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        If you're trying to manage a subscription, use the{" "}
                        <a href="/manage-subscription" className="text-primary hover:underline">
                          subscription portal
                        </a>
                        .
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Reset link expired state */}
            {mode === "reset" && resetLinkExpired ? (
              <div className="text-center space-y-4">
                <div className="bg-destructive/10 rounded-xl p-6">
                  <AlertTriangle className="w-10 h-10 text-destructive mx-auto mb-3" />
                  <p className="font-medium mb-1">Reset link expired</p>
                  <p className="text-sm text-muted-foreground">
                    This password reset link has expired or is no longer valid.
                  </p>
                </div>
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={() => {
                    setClaimModalOpen(true);
                    setResetLinkExpired(false);
                    setInlineError(null);
                    setErrors({});
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send a new reset link
                </Button>
                <NeedHelpSection />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="displayName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        className={`pl-10 ${errors.displayName ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.displayName && (
                      <p className="text-xs text-destructive">{errors.displayName}</p>
                    )}
                  </div>
                )}

                {mode !== "reset" && (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (inlineError) setInlineError(null);
                          if (showLoginFailedClaim) setShowLoginFailedClaim(false);
                        }}
                        className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{mode === "reset" ? "New Password" : "Password"}</Label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => {
                          trackEvent("click_claim_account");
                          setClaimModalOpen(true);
                        }}
                        className="text-xs text-primary hover:underline"
                      >
                        Claim account / Reset password
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        if (inlineError) setInlineError(null);
                        if (showLoginFailedClaim) setShowLoginFailedClaim(false);
                      }}
                      className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-destructive">{errors.password}</p>
                  )}
                  {capsLockOn && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      Caps Lock is on
                    </motion.p>
                  )}
                </div>

                {mode === "reset" && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className={`pl-10 pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-destructive">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  variant={mode === "login" ? "outline" : "hero"}
                  className={`w-full ${mode === "login" ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {mode === "reset" ? "Updating..." : mode === "login" ? "Signing in..." : "Creating account..."}
                    </>
                  ) : (
                    <>
                      {mode === "reset" ? "Update Password" : mode === "login" ? "Sign In" : "Create Account"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center space-y-2">
              {mode !== "reset" && (
                <p className="text-sm text-muted-foreground">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={() => {
                      setMode(mode === "login" ? "signup" : "login");
                      setErrors({});
                      setInlineError(null);
                      setShowLoginFailedClaim(false);
                    }}
                    className="ml-1 text-primary hover:underline font-medium"
                  >
                    {mode === "login" ? "Sign up" : "Sign in"}
                  </button>
                </p>
              )}
            </div>

            {!(mode === "reset" && resetLinkExpired) && <NeedHelpSection />}
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* CHANGE 4 — Claim Account Modal */}
      <ClaimAccountModal open={claimModalOpen} onOpenChange={setClaimModalOpen} />
    </div>
  );
}
