import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Package,
  AlertTriangle,
  Loader2,
  Search,
  Plus,
  Pencil,
  History,
  ArrowUpDown,
} from "lucide-react";

interface Product {
  id: string;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  name: string;
  description: string | null;
  category: string;
  price_cents: number;
  original_price_cents: number | null;
  slug: string | null;
  is_active: boolean;
  stock_quantity: number;
  low_stock_threshold: number;
  track_inventory: boolean;
  created_at: string;
  updated_at: string;
}

interface InventoryLog {
  id: string;
  product_id: string;
  change_quantity: number;
  previous_quantity: number;
  new_quantity: number;
  reason: string;
  reference_id: string | null;
  created_at: string;
}

const categoryColors: Record<string, string> = {
  device: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  refill: "bg-green-500/10 text-green-700 border-green-500/20",
  bundle: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  subscription: "bg-amber-500/10 text-amber-700 border-amber-500/20",
};

export function ProductCatalogSection({ isAdmin }: { isAdmin: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [logDialogOpen, setLogDialogOpen] = useState(false);
  const [logProduct, setLogProduct] = useState<Product | null>(null);
  const [logs, setLogs] = useState<InventoryLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  // Adjust stock dialog
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [adjustProduct, setAdjustProduct] = useState<Product | null>(null);
  const [adjustQty, setAdjustQty] = useState("");
  const [adjustReason, setAdjustReason] = useState("restock");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("category")
      .order("name");
    if (!error && data) setProducts(data as Product[]);
    setLoading(false);
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(search.toLowerCase());
    const matchesCat = catFilter === "all" || p.category === catFilter;
    return matchesSearch && matchesCat;
  });

  const lowStockProducts = products.filter(
    (p) => p.track_inventory && p.stock_quantity <= p.low_stock_threshold && p.stock_quantity > 0
  );
  const outOfStockProducts = products.filter(
    (p) => p.track_inventory && p.stock_quantity === 0 && p.category !== "subscription"
  );

  const openEdit = (product: Product) => {
    setEditProduct({ ...product });
    setEditDialogOpen(true);
  };

  const saveProduct = async () => {
    if (!editProduct) return;
    setSaving(true);
    const { error } = await supabase
      .from("products")
      .update({
        name: editProduct.name,
        description: editProduct.description,
        category: editProduct.category,
        price_cents: editProduct.price_cents,
        original_price_cents: editProduct.original_price_cents,
        slug: editProduct.slug || null,
        is_active: editProduct.is_active,
        low_stock_threshold: editProduct.low_stock_threshold,
        track_inventory: editProduct.track_inventory,
      })
      .eq("id", editProduct.id);

    if (error) {
      toast.error("Failed to update product");
    } else {
      toast.success("Product updated");
      setEditDialogOpen(false);
      fetchProducts();
    }
    setSaving(false);
  };

  const openAdjust = (product: Product) => {
    setAdjustProduct(product);
    setAdjustQty("");
    setAdjustReason("restock");
    setAdjustDialogOpen(true);
  };

  const submitAdjust = async () => {
    if (!adjustProduct || !adjustQty) return;
    const change = parseInt(adjustQty);
    if (isNaN(change) || change === 0) {
      toast.error("Enter a non-zero quantity");
      return;
    }
    setSaving(true);
    const newQty = Math.max(adjustProduct.stock_quantity + change, 0);

    // Update stock
    const { error: updateErr } = await supabase
      .from("products")
      .update({ stock_quantity: newQty })
      .eq("id", adjustProduct.id);

    if (updateErr) {
      toast.error("Failed to adjust stock");
      setSaving(false);
      return;
    }

    // Log the change
    await (supabase as any).from("inventory_logs").insert({
      product_id: adjustProduct.id,
      change_quantity: change,
      previous_quantity: adjustProduct.stock_quantity,
      new_quantity: newQty,
      reason: adjustReason,
    });

    toast.success(`Stock adjusted: ${adjustProduct.name} → ${newQty} units`);
    setAdjustDialogOpen(false);
    fetchProducts();
    setSaving(false);
  };

  const openLogs = async (product: Product) => {
    setLogProduct(product);
    setLogDialogOpen(true);
    setLogsLoading(true);
    const { data } = await supabase
      .from("inventory_logs")
      .select("*")
      .eq("product_id", product.id)
      .order("created_at", { ascending: false })
      .limit(50);
    setLogs((data as any) || []);
    setLogsLoading(false);
  };

  const fmt = (cents: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
        <div className="space-y-2">
          {outOfStockProducts.length > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm">
              <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
              <span className="font-medium text-destructive">Out of Stock:</span>
              <span className="text-destructive/80">{outOfStockProducts.map((p) => p.name).join(", ")}</span>
            </div>
          )}
          {lowStockProducts.length > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm">
              <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0" />
              <span className="font-medium text-yellow-700">Low Stock:</span>
              <span className="text-yellow-700/80">
                {lowStockProducts.map((p) => `${p.name} (${p.stock_quantity})`).join(", ")}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="device">Devices</SelectItem>
            <SelectItem value="refill">Refills</SelectItem>
            <SelectItem value="bundle">Bundles</SelectItem>
            <SelectItem value="subscription">Subscriptions</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border text-left text-muted-foreground">
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-center">Stock</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const isLow = p.track_inventory && p.stock_quantity <= p.low_stock_threshold && p.stock_quantity > 0;
              const isOut = p.track_inventory && p.stock_quantity === 0 && p.category !== "subscription";
              return (
                <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <div className="font-medium">{p.name}</div>
                    {p.description && (
                      <div className="text-xs text-muted-foreground truncate max-w-[300px]">{p.description}</div>
                    )}
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className={categoryColors[p.category] || ""}>
                      {p.category}
                    </Badge>
                  </td>
                  <td className="p-3 text-right font-medium">
                    {fmt(p.price_cents)}
                    {p.original_price_cents && (
                      <span className="text-xs text-muted-foreground line-through ml-1">
                        {fmt(p.original_price_cents)}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {p.track_inventory ? (
                      <span
                        className={`font-semibold ${
                          isOut ? "text-destructive" : isLow ? "text-yellow-600" : "text-foreground"
                        }`}
                      >
                        {p.stock_quantity}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">N/A</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {p.is_active ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20 text-xs">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-muted text-muted-foreground text-xs">
                        Inactive
                      </Badge>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {p.track_inventory && (
                        <Button size="sm" variant="ghost" onClick={() => openAdjust(p)} title="Adjust stock">
                          <ArrowUpDown className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => openLogs(p)} title="Inventory history">
                        <History className="w-3.5 h-3.5" />
                      </Button>
                      {isAdmin && (
                        <Button size="sm" variant="ghost" onClick={() => openEdit(p)} title="Edit product">
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editProduct && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={editProduct.description || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price (cents)</Label>
                  <Input
                    type="number"
                    value={editProduct.price_cents}
                    onChange={(e) => setEditProduct({ ...editProduct, price_cents: parseInt(e.target.value) || 0 })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Display only  Stripe stays authoritative</p>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={editProduct.category} onValueChange={(v) => setEditProduct({ ...editProduct, category: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="device">Device</SelectItem>
                      <SelectItem value="refill">Refill</SelectItem>
                      <SelectItem value="bundle">Bundle</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Slug</Label>
                  <Input
                    value={editProduct.slug || ""}
                    onChange={(e) => setEditProduct({ ...editProduct, slug: e.target.value || null })}
                  />
                </div>
                <div>
                  <Label>Low Stock Threshold</Label>
                  <Input
                    type="number"
                    value={editProduct.low_stock_threshold}
                    onChange={(e) => setEditProduct({ ...editProduct, low_stock_threshold: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editProduct.is_active}
                    onCheckedChange={(v) => setEditProduct({ ...editProduct, is_active: v })}
                  />
                  <Label>Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editProduct.track_inventory}
                    onCheckedChange={(v) => setEditProduct({ ...editProduct, track_inventory: v })}
                  />
                  <Label>Track Inventory</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveProduct} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Stock Dialog */}
      <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Adjust Stock  {adjustProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Current stock: <span className="font-semibold text-foreground">{adjustProduct?.stock_quantity}</span>
            </p>
            <div>
              <Label>Quantity Change</Label>
              <Input
                type="number"
                placeholder="e.g. +20 or -5"
                value={adjustQty}
                onChange={(e) => setAdjustQty(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">Use positive for restock, negative for removal</p>
            </div>
            <div>
              <Label>Reason</Label>
              <Select value={adjustReason} onValueChange={setAdjustReason}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restock">Restock</SelectItem>
                  <SelectItem value="manual_adjustment">Manual Adjustment</SelectItem>
                  <SelectItem value="damaged">Damaged / Write-off</SelectItem>
                  <SelectItem value="return">Customer Return</SelectItem>
                  <SelectItem value="correction">Correction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustDialogOpen(false)}>Cancel</Button>
            <Button onClick={submitAdjust} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Adjust
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Inventory Log Dialog */}
      <Dialog open={logDialogOpen} onOpenChange={setLogDialogOpen}>
        <DialogContent className="max-w-lg max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inventory History  {logProduct?.name}</DialogTitle>
          </DialogHeader>
          {logsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : logs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No inventory changes recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 text-sm">
                  <div>
                    <span
                      className={`font-semibold ${log.change_quantity > 0 ? "text-green-600" : "text-destructive"}`}
                    >
                      {log.change_quantity > 0 ? "+" : ""}
                      {log.change_quantity}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      ({log.previous_quantity} → {log.new_quantity})
                    </span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {log.reason.replace(/_/g, " ")}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{fmtDate(log.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
