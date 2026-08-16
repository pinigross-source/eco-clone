import { Link } from "@/lib/link";

/**
 * Shown when a route render throws. Keeps the site chrome usable instead of
 * serving an empty 200 shell, and tells crawlers not to index the failure.
 */
export const RouteErrorFallback = ({ error }: { error?: Error }) => {
  if (import.meta.env.DEV && error) {
    console.error("Route render error:", error);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <meta name="robots" content="noindex, nofollow" />
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-display font-bold mb-3 text-foreground">
          This page couldn't be displayed
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Something went wrong while loading this page. Please try again, or
          head back to the homepage.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="rounded-full border border-border px-5 py-2 text-sm font-medium"
          >
            Reload
          </button>
          <Link
            to="/"
            className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-medium"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
};
