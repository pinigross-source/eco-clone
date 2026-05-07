import { useCallback } from "react";
import { Check, X, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

// ── types ──────────────────────────────────────────
export type CategoryFilter = "devices" | "bundles" | "subscriptions" | "refills";
export type PriceRange = "under100" | "100to300" | "300to1000" | "over1000";

export interface ShopFilterState {
  categories: Set<CategoryFilter>;
  priceRanges: Set<PriceRange>;
}

export const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  devices: "Devices",
  bundles: "Bundles",
  subscriptions: "Subscribe & Save",
  refills: "Refills & Accessories",
};

const PRICE_LABELS: Record<PriceRange, string> = {
  under100: "Under $100",
  "100to300": "$100 – $300",
  "300to1000": "$300 – $1,000",
  over1000: "Over $1,000",
};

// ── count helpers ──────────────────────────────────
interface CategoryCounts {
  devices: number;
  bundles: number;
  subscriptions: number;
  refills: number;
}

// ── props ──────────────────────────────────────────
interface ShopFiltersProps {
  filters: ShopFilterState;
  onToggleCategory: (c: CategoryFilter) => void;
  onTogglePriceRange: (p: PriceRange) => void;
  onClear: () => void;
  onRemoveCategory: (c: CategoryFilter) => void;
  onRemovePriceRange: (p: PriceRange) => void;
  totalResults: number;
  categoryCounts: CategoryCounts;
}

// ── sidebar content (shared desktop + mobile) ─────
function FilterContent({
  filters,
  onToggleCategory,
  onTogglePriceRange,
  onClear,
  categoryCounts,
}: Pick<ShopFiltersProps, "filters" | "onToggleCategory" | "onTogglePriceRange" | "onClear" | "categoryCounts">) {
  const activeCount = filters.categories.size + filters.priceRanges.size;

  return (
    <div className="space-y-6">
      {/* Category section */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Category</h3>
        <div className="space-y-2.5">
          {(Object.keys(CATEGORY_LABELS) as CategoryFilter[]).map((key) => {
            const isChecked = filters.categories.has(key);
            const count = categoryCounts[key];
            return (
              <label
                key={key}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => onToggleCategory(key)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className={`text-sm flex-1 transition-colors ${isChecked ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
                  {CATEGORY_LABELS[key]}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Price Range section */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Price</h3>
        <div className="space-y-2.5">
          {(Object.keys(PRICE_LABELS) as PriceRange[]).map((key) => {
            const isChecked = filters.priceRanges.has(key);
            return (
              <label
                key={key}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => onTogglePriceRange(key)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className={`text-sm flex-1 transition-colors ${isChecked ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
                  {PRICE_LABELS[key]}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {activeCount > 0 && (
        <>
          <Separator />
          <Button variant="outline" size="sm" className="w-full" onClick={onClear}>
            Clear all filters
          </Button>
        </>
      )}
    </div>
  );
}

// ── applied filter chips ──────────────────────────
export function AppliedFilterChips({
  filters,
  onRemoveCategory,
  onRemovePriceRange,
  onClear,
  totalResults,
}: Pick<ShopFiltersProps, "filters" | "onRemoveCategory" | "onRemovePriceRange" | "onClear" | "totalResults">) {
  const activeCount = filters.categories.size + filters.priceRanges.size;
  if (activeCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <AnimatePresence mode="popLayout">
        {Array.from(filters.categories).map((f) => (
          <motion.span
            key={`cat-${f}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
          >
            {CATEGORY_LABELS[f]}
            <button onClick={() => onRemoveCategory(f)} aria-label={`Remove ${CATEGORY_LABELS[f]}`}>
              <X className="w-3 h-3" />
            </button>
          </motion.span>
        ))}
        {Array.from(filters.priceRanges).map((p) => (
          <motion.span
            key={`price-${p}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-accent/15 text-accent-foreground border border-accent/20"
          >
            {PRICE_LABELS[p]}
            <button onClick={() => onRemovePriceRange(p)} aria-label={`Remove ${PRICE_LABELS[p]}`}>
              <X className="w-3 h-3" />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
      <button
        onClick={onClear}
        className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors ml-1"
      >
        Clear all
      </button>
      <span className="ml-auto text-xs text-muted-foreground font-medium whitespace-nowrap">
        {totalResults} {totalResults === 1 ? "result" : "results"}
      </span>
    </div>
  );
}

// ── desktop sidebar ───────────────────────────────
export function ShopFilterSidebar(props: ShopFiltersProps) {
  return (
    <aside className="hidden lg:block w-[220px] shrink-0 sticky top-[80px] self-start">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </h2>
          <span className="text-xs text-muted-foreground font-medium">
            {props.totalResults} results
          </span>
        </div>
        <FilterContent
          filters={props.filters}
          onToggleCategory={props.onToggleCategory}
          onTogglePriceRange={props.onTogglePriceRange}
          onClear={props.onClear}
          categoryCounts={props.categoryCounts}
        />
      </div>
    </aside>
  );
}

// ── mobile filter drawer trigger ──────────────────
export function MobileFilterTrigger(props: ShopFiltersProps) {
  const activeCount = props.filters.categories.size + props.filters.priceRanges.size;

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeCount > 0 && (
              <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0 min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                {activeCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[320px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              <span className="text-xs text-muted-foreground font-normal ml-auto">
                {props.totalResults} results
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent
              filters={props.filters}
              onToggleCategory={props.onToggleCategory}
              onTogglePriceRange={props.onTogglePriceRange}
              onClear={props.onClear}
              categoryCounts={props.categoryCounts}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
