import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { TestEnvironmentBanner } from "@/components/TestEnvironmentBanner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { isTestEnv } from "@/lib/env";

const PROD_TITLE = "EnviroBiotics — Probiotic air purification";
const PROD_DESCRIPTION =
  "EnviroBiotics neutralizes mold, allergens, and odors on every surface, object, and corner your air touches.";
const PROD_OG_IMAGE = "https://envirobiotics.com/og-default.jpg";

const TEST_TITLE = "Enviro_test";
const TEST_DESCRIPTION =
  "Eco Clone replicates the functionality of enviro-clean.lovable.app without using Shopify.";
const TEST_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c793fa13-7000-4814-b3d1-0c4dda400ccd/id-preview-4bec4d66--a538c9f9-a84b-4fdd-944e-d2e334872313.lovable.app-1778137015008.png";

const title = isTestEnv ? TEST_TITLE : PROD_TITLE;
const description = isTestEnv ? TEST_DESCRIPTION : PROD_DESCRIPTION;
const ogImage = isTestEnv ? TEST_OG_IMAGE : PROD_OG_IMAGE;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...(isTestEnv
        ? [
            { name: "robots", content: "noindex, nofollow, noarchive, nosnippet, noimageindex" },
            { name: "googlebot", content: "noindex, nofollow" },
          ]
        : [{ name: "robots", content: "index, follow" }]),
      { title },
      { name: "description", content: description },
      { name: "author", content: isTestEnv ? "Lovable" : "EnviroBiotics" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(isTestEnv ? [{ name: "twitter:site", content: "@Lovable" }] : []),
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { property: "og:image", content: ogImage },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      {isTestEnv && <TestEnvironmentBanner />}
      <Outlet />
    </QueryClientProvider>
  );
}
