import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { checkSiteLinks } from "@/serverfn/link-check.functions";

type Result = Awaited<ReturnType<typeof checkSiteLinks>>;

export const Route = createFileRoute("/link-check")({
  component: LinkCheckPage,
});

function LinkCheckPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await checkSiteLinks();
      setResult(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Link Check  Internal Crawler" description="Scan the site for broken internal links." path="/link-check" />
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Diagnostics</p>
          <h1 className="mt-1 text-3xl font-bold text-foreground">Internal Link Check</h1>
          <p className="mt-2 text-muted-foreground">
            Crawls internal pages starting at the homepage (max 80 pages) and reports any links returning non-2xx status.
          </p>
        </header>

        <Button onClick={run} disabled={loading}>
          {loading ? "Crawling…" : "Run link check"}
        </Button>

        {error && (
          <div className="mt-6 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
        )}

        {result && (
          <section className="mt-8 space-y-4">
            <div className="rounded-lg border border-border bg-card p-4 text-sm">
              <div><strong>Origin:</strong> {result.origin}</div>
              <div><strong>Pages crawled:</strong> {result.pagesCrawled}</div>
              <div><strong>URLs checked:</strong> {result.totalChecked}</div>
              <div><strong>Broken:</strong> {result.brokenCount}</div>
              {result.truncated && <div className="text-amber-600">Crawl truncated at page limit.</div>}
            </div>

            {result.broken.length === 0 ? (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
                ✅ No broken internal links found.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="min-w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-3 py-2 text-left">Status</th>
                      <th className="px-3 py-2 text-left">URL</th>
                      <th className="px-3 py-2 text-left">Found on</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.broken.map((b, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="px-3 py-2 font-mono text-destructive">{b.status || "ERR"}</td>
                        <td className="px-3 py-2 font-mono">{b.url}</td>
                        <td className="px-3 py-2 font-mono text-muted-foreground">{b.foundOn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
