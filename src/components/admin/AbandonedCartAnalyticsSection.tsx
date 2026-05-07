import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, ShoppingCart, DollarSign, Mail, TrendingUp, RotateCcw, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface CartRow {
  id: string;
  email: string;
  cart_total: number;
  emails_sent: number;
  recovered: boolean;
  recovered_at: string | null;
  abandoned_at: string;
  created_at: string;
  discount_code: string | null;
  cart_items: unknown;
}

export const AbandonedCartAnalyticsSection = () => {
  const [carts, setCarts] = useState<CartRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCarts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('abandoned_carts' as any)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (!error && data) {
      setCarts(data as any as CartRow[]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchCarts(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const totalCarts = carts.length;
  const recoveredCarts = carts.filter(c => c.recovered);
  const recoveryRate = totalCarts > 0 ? (recoveredCarts.length / totalCarts * 100) : 0;
  const totalRecoveredRevenue = recoveredCarts.reduce((sum, c) => sum + c.cart_total, 0);
  const totalAbandonedRevenue = carts.filter(c => !c.recovered).reduce((sum, c) => sum + c.cart_total, 0);

  // Email sequence performance
  const emailStats = {
    neverEmailed: carts.filter(c => c.emails_sent === 0).length,
    after1: carts.filter(c => c.emails_sent >= 1).length,
    after2: carts.filter(c => c.emails_sent >= 2).length,
    after3: carts.filter(c => c.emails_sent >= 3).length,
    recoveredAfter1: carts.filter(c => c.recovered && c.emails_sent >= 1).length,
    recoveredAfter2: carts.filter(c => c.recovered && c.emails_sent >= 2).length,
    recoveredAfter3: carts.filter(c => c.recovered && c.emails_sent >= 3).length,
  };

  const discountRecoveries = recoveredCarts.filter(c => c.discount_code).length;

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Total Abandoned</span>
          </div>
          <p className="text-2xl font-bold">{totalCarts}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm text-muted-foreground">Recovery Rate</span>
          </div>
          <p className="text-2xl font-bold">{recoveryRate.toFixed(1)}%</p>
          <p className="text-xs text-muted-foreground">{recoveredCarts.length} recovered</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm text-muted-foreground">Revenue Recovered</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{formatPrice(totalRecoveredRevenue)}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm text-muted-foreground">Still Abandoned</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">{formatPrice(totalAbandonedRevenue)}</p>
        </div>
      </div>

      {/* Email Sequence Performance */}
      <div className="rounded-xl border border-border bg-background p-5">
        <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          Email Sequence Performance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Email 1 – Reminder (4h)', sent: emailStats.after1, recovered: emailStats.recoveredAfter1 },
            { label: 'Email 2 – 10% Discount (24h)', sent: emailStats.after2, recovered: emailStats.recoveredAfter2 },
            { label: 'Email 3 – Last Chance (72h)', sent: emailStats.after3, recovered: emailStats.recoveredAfter3 },
          ].map((step) => (
            <div key={step.label} className="rounded-lg border border-border/50 p-4 space-y-2">
              <p className="text-sm font-medium">{step.label}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sent</span>
                <span className="font-semibold">{step.sent}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Recovered after</span>
                <span className="font-semibold text-green-600">{step.recovered}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Conversion</span>
                <span className="font-semibold">
                  {step.sent > 0 ? ((step.recovered / step.sent) * 100).toFixed(1) : '0.0'}%
                </span>
              </div>
            </div>
          ))}
        </div>
        {discountRecoveries > 0 && (
          <p className="text-sm text-muted-foreground mt-3">
            💰 {discountRecoveries} recovery{discountRecoveries !== 1 ? 'ies' : 'y'} used a discount code
          </p>
        )}
      </div>

      {/* Recent Abandoned Carts */}
      <div className="rounded-xl border border-border bg-background p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-primary" />
            Recent Carts
          </h3>
          <Button variant="outline" size="sm" onClick={fetchCarts}>
            <RotateCcw className="w-3 h-3 mr-1" /> Refresh
          </Button>
        </div>

        {carts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No abandoned carts yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 pr-3">Email</th>
                  <th className="text-right py-2 px-3">Cart Value</th>
                  <th className="text-center py-2 px-3">Emails Sent</th>
                  <th className="text-center py-2 px-3">Status</th>
                  <th className="text-right py-2 pl-3">Abandoned</th>
                </tr>
              </thead>
              <tbody>
                {carts.slice(0, 50).map((cart) => (
                  <tr key={cart.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2.5 pr-3 font-medium truncate max-w-[200px]">{cart.email}</td>
                    <td className="py-2.5 px-3 text-right">{formatPrice(cart.cart_total)}</td>
                    <td className="py-2.5 px-3 text-center">{cart.emails_sent}/3</td>
                    <td className="py-2.5 px-3 text-center">
                      {cart.recovered ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                          Recovered
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/20 text-xs">
                          Abandoned
                        </Badge>
                      )}
                    </td>
                    <td className="py-2.5 pl-3 text-right text-muted-foreground">
                      {format(new Date(cart.abandoned_at), 'MMM d, h:mm a')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
