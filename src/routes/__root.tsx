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
import { WordPressRedirectHandler } from "@/components/WordPressRedirectHandler";
import { AttributionBeacon } from "@/components/AttributionBeacon";
import { TidioChat } from "@/components/TidioChat";
import { isTestEnv } from "@/lib/env";


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
      { name: "author", content: isTestEnv ? "Lovable" : "EnviroBiotics" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "EnviroBiotics" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(isTestEnv ? [{ name: "twitter:site", content: "@Lovable" }] : []),
      { name: "google-site-verification", content: "Y5A06VI6sH3RIrGwheezAnybP5cHN8gEV0qXu_S2nT8" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=Manrope:wght@600;700;800&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;600;700&display=swap",
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
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function () {
  var SHOP_HOSTS = ["shop.envirobiotics.com"];
  var KEYS = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content",
              "fbclid","gclid","gbraid","wbraid","ttclid","msclkid"];
  var STORE_KEY = "eb_attribution";
  var TTL_DAYS = 30;

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (Date.now() - obj.t > TTL_DAYS * 864e5) { localStorage.removeItem(STORE_KEY); return null; }
      return obj.v;
    } catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ t: Date.now(), v: v })); } catch (e) {}
  }

  var p = new URLSearchParams(window.location.search);
  var incoming = {};
  KEYS.forEach(function (k) { var v = p.get(k); if (v) incoming[k] = v; });

  if (Object.keys(incoming).length) {
    if (!incoming.utm_source) {
      if (incoming.fbclid) { incoming.utm_source = "facebook"; incoming.utm_medium = incoming.utm_medium || "paid"; }
      else if (incoming.gclid || incoming.gbraid || incoming.wbraid) {
        incoming.utm_source = "google"; incoming.utm_medium = incoming.utm_medium || "cpc";
      }
    }
    save(incoming);
  } else if (!load() && document.referrer) {
    try {
      var rd = new URL(document.referrer).hostname;
      if (rd && rd.indexOf("envirobiotics.com") === -1) {
        save({ utm_source: rd.replace(/^www\\./, ""), utm_medium: "referral" });
      }
    } catch (e) {}
  }

  function decorate(href) {
    var url;
    try { url = new URL(href, window.location.href); } catch (e) { return href; }
    if (SHOP_HOSTS.indexOf(url.hostname) === -1) return href;

    var attr = load();
    if (attr) {
      KEYS.forEach(function (k) {
        if (attr[k] && !url.searchParams.has(k)) url.searchParams.set(k, attr[k]);
      });
      if (attr.utm_source && url.searchParams.get("utm_source") === "envirobiotics") {
        var lpCampaign = url.searchParams.get("utm_campaign");
        if (lpCampaign) url.searchParams.set("lp_section", lpCampaign);
        url.searchParams.set("utm_source", attr.utm_source);
        if (attr.utm_medium) url.searchParams.set("utm_medium", attr.utm_medium);
        if (attr.utm_campaign) url.searchParams.set("utm_campaign", attr.utm_campaign);
      }
    }
    if (!url.searchParams.has("lp_page")) {
      url.searchParams.set("lp_page", window.location.pathname || "/");
    }
    return url.toString();
  }

  function handler(ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest("a[href]") : null;
    if (!a) return;
    var d = decorate(a.href);
    if (d !== a.href) a.href = d;
  }
  document.addEventListener("click", handler, true);
  document.addEventListener("auxclick", handler, true);

  window.ebDecorateUrl = decorate;
})();`,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var BENIGN=[/ResizeObserver loop/i,/messageHandlers/i,/window\\.webkit/i];var match=function(m){return typeof m==='string'&&BENIGN.some(function(r){return r.test(m)})};window.addEventListener('error',function(e){if(match(e&&e.message)){e.stopImmediatePropagation();e.preventDefault();}},true);window.addEventListener('unhandledrejection',function(e){var m=e&&e.reason&&(e.reason.message||String(e.reason));if(match(m)){e.stopImmediatePropagation();e.preventDefault();}});}catch(_){}})();`,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.crossOrigin="anonymous";t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "x3td09c108");`,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.crossOrigin="anonymous";t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1235463294095149');fbq('track','PageView');`,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1235463294095149&ev=PageView&noscript=1" />`,
          }}
        />

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
      <WordPressRedirectHandler />
      <AttributionBeacon />
      <TidioChat collapsed />
      <Outlet />
    </QueryClientProvider>
  );
}
