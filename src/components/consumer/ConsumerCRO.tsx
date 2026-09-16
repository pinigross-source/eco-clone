import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, Check, ShieldCheck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/productData";
import { trackEvent } from "@/lib/tracking";
import epaAsset from "@/assets/certs/epa-new.webp.asset.json";
import fdaAsset from "@/assets/certs/fda-gras-new.webp.asset.json";
import allergyUkAsset from "@/assets/certs/allergyuk.webp.asset.json";
import madeSafeAsset from "@/assets/certs/made-safe-new.png.asset.json";
import ptpaAsset from "@/assets/certs/ptpa_v2.png.asset.json";
import biologicMiniLandscapeAsset from "@/assets/biologic-mini-landscape.jpg.asset.json";
import biotica800LandscapeAsset from "@/assets/biotica-800-landscape.jpg.asset.json";

const TRUST_MARKS = {
  epa: { label: "EPA Registered", src: epaAsset.url, size: "h-11 w-11 sm:h-12 sm:w-12" },
  fda: { label: "FDA GRAS", src: fdaAsset.url, size: "h-12 w-12 sm:h-14 sm:w-14" },
  allergyUk: { label: "AllergyUK", src: allergyUkAsset.url, size: "h-12 w-12 sm:h-14 sm:w-14" },
  madeSafe: { label: "MADE SAFE®", src: madeSafeAsset.url, size: "h-11 w-11 sm:h-12 sm:w-12" },
  ptpa: { label: "PTPA Winner", src: ptpaAsset.url, size: "h-12 w-12 sm:h-14 sm:w-14" },
} as const;

export type TrustMark = keyof typeof TRUST_MARKS;
export type CtaPlacement =
  | "hero_primary"
  | "early_product"
  | "mid_page"
  | "sticky_mobile"
  | "final_cta";

type TrackedShopLinkProps = ComponentProps<"a"> & {
  route: string;
  placement: CtaPlacement;
  product: string;
  destination: string;
};

export function TrackedShopLink({
  route,
  placement,
  product,
  destination,
  onClick,
  children,
  ...props
}: TrackedShopLinkProps) {
  return (
    <a
      {...props}
      href={destination}
      data-cta-placement={placement}
      data-product={product}
      onClick={(event) => {
        trackEvent("click_to_shop", {
          route,
          placement,
          product,
          destination,
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}

export function CompactTrustStrip({
  marks = ["epa", "fda", "allergyUk", "madeSafe", "ptpa"],
  label = "Independent standards and trusted certifications",
  className = "",
}: {
  marks?: TrustMark[];
  label?: string;
  className?: string;
}) {
  return (
    <section aria-label={label} className={`border-y border-border/70 bg-background ${className}`}>
      <div className="mx-auto max-w-5xl px-5 py-4 sm:px-8 sm:py-5">
        <div className="grid grid-cols-[minmax(0,1fr)_repeat(5,44px)] items-center gap-2 sm:grid-cols-[minmax(0,160px)_repeat(5,56px)] sm:justify-center sm:gap-5">
          <p className="min-w-0 text-[10px] font-semibold uppercase leading-4 text-muted-foreground sm:text-[11px]">
            Trusted standards
          </p>
          {marks.map((key) => {
            const mark = TRUST_MARKS[key];
            return (
              <span key={key} className="grid h-12 w-11 shrink-0 place-items-center sm:h-14 sm:w-14">
                <img
                  src={mark.src}
                  alt={mark.label}
                  title={mark.label}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className={`${mark.size} object-contain`}
                />
              </span>
            );
          })}
        </div>
        <div className="mt-3 flex justify-center sm:mt-4">
          <p className="flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-[13px] font-semibold text-foreground sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-[15px]">
            <ShieldCheck className="h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6" aria-hidden="true" />
            30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}

type ProductDecision = {
  slug: "biologic-mini" | "biotica-800";
  bestFor: string;
  installation: string;
  destination: string;
  ctaLabel: string;
  featured?: boolean;
};

const PRODUCT_LIFESTYLE_IMAGES = {
  "biologic-mini": biologicMiniLandscapeAsset.url,
  "biotica-800": biotica800LandscapeAsset.url,
} as const;

export function ProductDecisionBlock({
  route,
  eyebrow = "Choose by room size",
  title = "A clear fit for every room.",
  intro,
  decisions,
  placement = "early_product",
  id,
  className = "",
  presentation = "standard",
}: {
  route: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  decisions: ProductDecision[];
  placement?: CtaPlacement;
  id?: string;
  className?: string;
  presentation?: "standard" | "showcase";
}) {
  const isShowcase = presentation === "showcase";

  return (
    <section id={id} className={`scroll-mt-24 bg-background ${isShowcase ? "py-20 sm:py-28 lg:py-36" : "py-12 sm:py-20"} ${className}`}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className={isShowcase ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
          <p className="text-xs font-semibold uppercase text-eyebrow-accent">{eyebrow}</p>
          <h2 className={`mt-3 font-bold text-ink ${isShowcase ? "text-4xl leading-[1.04] sm:text-5xl lg:text-6xl" : "text-3xl leading-tight sm:text-4xl"}`}>{title}</h2>
          {intro ? <p className={`mt-4 leading-relaxed text-ink/70 ${isShowcase ? "mx-auto max-w-2xl text-lg sm:mt-6 sm:text-xl" : "text-base sm:text-lg"}`}>{intro}</p> : null}
        </div>
        <div className={`${isShowcase ? "mt-10 sm:mt-14 lg:mt-16" : "mt-8"} grid gap-5 lg:gap-8 ${decisions.length > 1 ? "md:grid-cols-2" : "max-w-3xl"}`}>
          {decisions.map((decision) => {
            const product = products.find((item) => item.slug === decision.slug);
            if (!product || product.price === undefined) return null;
            if (isShowcase) {
              return (
                <article
                  key={decision.slug}
                   className={`group relative isolate overflow-hidden rounded-lg border bg-card transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 ${
                    decision.featured
                      ? "border-sage/70 shadow-[0_32px_80px_-48px_hsl(var(--foreground)/0.48)]"
                      : "border-border shadow-[0_26px_70px_-52px_hsl(var(--foreground)/0.38)]"
                  }`}
                >
                   <div className="relative aspect-[5/4] overflow-hidden bg-cream sm:aspect-[4/3]">
                    <img
                      src={PRODUCT_LIFESTYLE_IMAGES[decision.slug]}
                      alt={`${product.name} in a home setting`}
                      width={1200}
                      height={900}
                      loading="lazy"
                      decoding="async"
                       className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" aria-hidden="true" />
                    {decision.featured ? (
                      <span className="absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-bold uppercase text-ink shadow-sm backdrop-blur-md">
                        Most popular
                      </span>
                    ) : null}
                  </div>
                  <div className="relative -mt-8 flex flex-col px-6 pb-7 sm:px-8 sm:pb-9">
                     <p className="text-xs font-semibold uppercase text-eyebrow-accent">{decision.bestFor}</p>
                     <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
                       <h3 className="min-w-0 text-3xl font-bold leading-none text-ink sm:text-4xl">{product.name}</h3>
                      <p className="shrink-0 text-2xl font-semibold text-ink">${product.price}</p>
                    </div>
                    <div className="my-6 h-px bg-border" />
                    <ul className="space-y-3 text-base leading-6 text-ink/70">
                       <li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-eyebrow-accent" />{product.coverage}</li>
                       <li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-eyebrow-accent" />{decision.installation}</li>
                    </ul>
                    <Button asChild size="lg" className="mt-7 w-full sm:w-fit">
                      <TrackedShopLink
                        route={route}
                        placement={placement}
                        product={product.slug}
                        destination={decision.destination}
                      >
                        {decision.ctaLabel}<ArrowRight className="h-4 w-4 group-hover:translate-x-0.5" />
                      </TrackedShopLink>
                    </Button>
                  </div>
                </article>
              );
            }
            return (
              <article
                key={decision.slug}
                className={`grid grid-cols-[112px_1fr] overflow-hidden rounded-lg border bg-card sm:grid-cols-[180px_1fr] ${
                  decision.featured ? "border-sage shadow-[0_18px_50px_-35px_hsl(var(--foreground)/0.35)]" : "border-border"
                }`}
              >
                <div className="flex min-h-44 items-center justify-center bg-cream p-3 sm:min-h-56 sm:p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={360}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-contain"
                  />
                </div>
                <div className="flex min-w-0 flex-col p-4 sm:p-6">
                  <p className="text-xs font-semibold uppercase text-sage">{decision.bestFor}</p>
                  <h3 className="mt-2 text-xl font-bold text-ink sm:text-2xl">{product.name}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-5 text-ink/70 sm:text-base">
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" />{product.coverage}</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" />{decision.installation}</li>
                  </ul>
                  <p className="mt-4 text-2xl font-bold text-ink">${product.price}</p>
                  <Button asChild className="mt-4 min-h-11 w-full sm:w-fit">
                    <TrackedShopLink
                      route={route}
                      placement={placement}
                      product={product.slug}
                      destination={decision.destination}
                    >
                      {decision.ctaLabel}<ArrowRight className="h-4 w-4" />
                    </TrackedShopLink>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function MobileStickyShopCTA({
  route,
  product,
  destination,
  label,
  detail,
  visible = true,
}: {
  route: string;
  product: string;
  destination: string;
  label: string;
  detail?: string;
  visible?: boolean;
}) {
  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 shadow-[0_-8px_28px_-18px_hsl(var(--foreground)/0.4)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        {detail ? <p className="min-w-0 flex-1 text-sm font-semibold leading-5 text-foreground">{detail}</p> : null}
        <Button asChild className={`${detail ? "shrink-0" : "w-full"} min-h-11 rounded-full px-5`}>
          <TrackedShopLink
            route={route}
            placement="sticky_mobile"
            product={product}
            destination={destination}
          >
            <ShoppingBag className="h-4 w-4" />{label}
          </TrackedShopLink>
        </Button>
      </div>
    </div>
  );
}

export function CtaText({ children }: { children: ReactNode }) {
  return <>{children}</>;
}