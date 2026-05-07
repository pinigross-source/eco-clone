import { AlertTriangle } from "lucide-react";

/**
 * Persistent banner shown on every page so we never confuse the test hub
 * with production. Intentionally bright + sticky.
 */
export function TestEnvironmentBanner() {
  return (
    <div
      role="status"
      aria-label="Test environment"
      className="sticky top-0 z-[100] w-full bg-amber-400 text-black border-b border-amber-600"
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
        <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Test environment — not production. Orders, analytics, and content are sandboxed.</span>
        <a
          href="/dev-tools"
          className="ml-2 underline underline-offset-2 hover:no-underline"
        >
          Dev tools
        </a>
      </div>
    </div>
  );
}
