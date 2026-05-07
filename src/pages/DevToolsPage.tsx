import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { shopifyUrl } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";
import { pingShopify } from "@/serverfn/shopify-ping.functions";
import { inspectShopifyToken } from "@/serverfn/shopify-token-check.functions";


function Row({ title, description, action }: { title: string; description: string; action: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

export default function DevToolsPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [shopifyStatus, setShopifyStatus] = useState<string | null>(null);
  const [shopifyChecking, setShopifyChecking] = useState(false);

  const checkShopify = async () => {
    setShopifyChecking(true);
    setShopifyStatus(null);
    try {
      const res = await pingShopify();
      if (res.ok) {
        setShopifyStatus(`✅ Connected to "${res.shop}" (${res.domain}) — ${res.currency}`);
      } else {
        setShopifyStatus(`❌ ${res.error}`);
      }
    } catch (e) {
      setShopifyStatus(`❌ ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setShopifyChecking(false);
    }
  };


  const clearLocal = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      setStatus("Local + session storage cleared.");
    } catch {
      setStatus("Could not clear storage.");
    }
  };

  const clearCookies = () => {
    document.cookie.split(";").forEach((c) => {
      const eq = c.indexOf("=");
      const name = (eq > -1 ? c.slice(0, eq) : c).trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    setStatus("Cookies cleared (current domain).");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setStatus("Signed out of Lovable Cloud session.");
  };

  const env = {
    mode: import.meta.env.MODE,
    shopify: import.meta.env.VITE_SHOPIFY_URL ?? "https://shop.envirobiotics.com",
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Dev Tools — EnviroBiotics Test Hub"
        description="Test-environment utilities: clear cart, reset session, inspect config."
        path="/dev-tools"
      />
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Test environment</p>
          <h1 className="mt-1 text-3xl font-bold text-foreground">Dev Tools</h1>
          <p className="mt-2 text-muted-foreground">
            Reset state and inspect configuration for the test hub. None of these actions affect production.
          </p>
        </header>

        {status && (
          <div className="mb-6 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
            {status}
          </div>
        )}

        <section className="space-y-3">
          <Row
            title="Clear local + session storage"
            description="Wipes anything cached by the marketing site (quiz answers, banners, theme)."
            action={<Button onClick={clearLocal} variant="outline">Clear storage</Button>}
          />
          <Row
            title="Clear cookies (this domain)"
            description="Removes cookies set by the marketing site. Shopify cart cookies live on shop.envirobiotics.com."
            action={<Button onClick={clearCookies} variant="outline">Clear cookies</Button>}
          />
          <Row
            title="Sign out (Lovable Cloud)"
            description="Ends the current backend session if one exists."
            action={<Button onClick={signOut} variant="outline">Sign out</Button>}
          />
          <Row
            title="Open Shopify cart"
            description="Inspect or empty the Shopify-side cart on shop.envirobiotics.com."
            action={
              <Button asChild variant="outline">
                <a href={shopifyUrl("/cart", "devtools")} target="_blank" rel="noreferrer">
                  Open cart
                </a>
              </Button>
            }
          />
          <Row
            title="Open Shopify account"
            description="Log in / out of the Shopify customer account."
            action={
              <Button asChild variant="outline">
                <a href={shopifyUrl("/account", "devtools")} target="_blank" rel="noreferrer">
                  Open account
                </a>
              </Button>
            }
          />
          <Row
            title="Test Shopify Storefront API"
            description="Pings the Storefront API to verify the token + domain are configured."
            action={
              <Button onClick={checkShopify} disabled={shopifyChecking} variant="outline">
                {shopifyChecking ? "Checking…" : "Run check"}
              </Button>
            }
          />
        </section>

        {shopifyStatus && (
          <div className="mt-4 rounded-md border border-border bg-muted p-3 text-sm">
            {shopifyStatus}
          </div>
        )}


        <section className="mt-10">
          <h2 className="mb-3 text-lg font-semibold text-foreground">Environment</h2>
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-xs">
{JSON.stringify(env, null, 2)}
          </pre>
        </section>
      </main>
      <Footer />
    </div>
  );
}
