import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Gift } from 'lucide-react';
import { useStripeCartStore } from '@/stores/stripeCartStore';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ExitIntentPopupProps {
  onEmailCapture?: (email: string) => void;
}

const POPUP_SHOWN_KEY = 'exit-intent-shown';
const POPUP_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

export const ExitIntentPopup = ({ onEmailCapture }: ExitIntentPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, getEstimatedSubtotal } = useStripeCartStore();

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const shouldShowPopup = useCallback(async () => {
    if (items.length === 0) return false;

    // Check cooldown
    const lastShown = localStorage.getItem(POPUP_SHOWN_KEY);
    if (lastShown && Date.now() - parseInt(lastShown) < POPUP_COOLDOWN_MS) return false;

    // Don't show for logged-in users (they're tracked automatically)
    const { data: { user } } = await supabase.auth.getUser();
    if (user) return false;

    return true;
  }, [items.length]);

  useEffect(() => {
    const handleMouseLeave = async (e: MouseEvent) => {
      if (e.clientY <= 0) {
        const show = await shouldShowPopup();
        if (show) {
          setIsOpen(true);
          localStorage.setItem(POPUP_SHOWN_KEY, Date.now().toString());
        }
      }
    };

    // Also trigger on tab visibility change (mobile-friendly)
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        const show = await shouldShowPopup();
        if (show) {
          setIsOpen(true);
          localStorage.setItem(POPUP_SHOWN_KEY, Date.now().toString());
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [shouldShowPopup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      onEmailCapture(email.trim());
      toast.success("We'll save your cart and send you a reminder!");
      setIsOpen(false);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Don't forget your cart!
          </DialogTitle>
          <DialogDescription className="text-base">
            You have {items.length} item{items.length !== 1 ? 's' : ''} worth{' '}
            <span className="font-semibold text-primary">{formatPrice(getEstimatedSubtotal())}</span>{' '}
            waiting for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
            <Gift className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Enter your email and we'll save your cart. Plus, we'll send you a{' '}
              <span className="font-semibold text-foreground">special discount</span> if you come back!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isSubmitting || !email.trim()}>
              {isSubmitting ? 'Saving...' : 'Save Cart'}
            </Button>
          </form>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            No thanks, I'll continue browsing
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
