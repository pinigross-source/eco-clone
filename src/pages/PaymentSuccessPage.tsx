import { useEffect } from "react";
import { Link, useSearchParams } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, ArrowRight, Home, Mail } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { trackFBEvent } from "@/lib/fb-pixel";
import { trackRedditEvent } from "@/lib/reddit-pixel";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const provider = searchParams.get("provider");
  const paypalOrderId = searchParams.get("paypal_order_id");
  const isPayPal = provider === "paypal";

  useEffect(() => {
    // Celebrate with confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#10b981", "#34d399", "#6ee7b7"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#10b981", "#34d399", "#6ee7b7"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Fire Facebook Pixel Purchase event (display-only, no access granted)
    trackFBEvent('Purchase', { currency: 'USD', value: 0 });
    trackRedditEvent('Purchase', { currency: 'USD', value: 0, itemCount: 1 });
  }, [isPayPal]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Thank You for Your Order!
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Your payment was successful. We're preparing your order and you'll receive a confirmation email shortly.
            </p>

            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">What's Next?</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an email with your order details and tracking information once your order ships.
                  </p>
                </div>
              </div>
            </div>

            {isPayPal && paypalOrderId && (
              <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Paid with PayPal</h3>
                    <p className="text-sm text-muted-foreground">
                      PayPal Order ID: {paypalOrderId}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {sessionId && (
              <p className="text-xs text-muted-foreground mb-8">
                Order Reference: {sessionId.slice(0, 20)}...
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/shop">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
