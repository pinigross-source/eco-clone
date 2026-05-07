import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  Upload,
  CheckCircle2,
  AlertCircle,
  Download,
  Package,
  Users,
  CreditCard,
  FileSpreadsheet,
  Trash2,
} from "lucide-react";

interface ImportResult {
  success: number;
  failed: number;
  skipped: number;
  errors: string[];
  created_users?: number;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += c;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(text: string): { headers: string[]; rows: string[][] } {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return { headers: [], rows: [] };
  const headers = parseCSVLine(lines[0]).map((h) => h.replace(/['"]/g, "").trim());
  const rows = lines.slice(1).map((line) => parseCSVLine(line));
  return { headers, rows };
}

function findCol(headers: string[], ...keywords: string[]): number {
  return headers.findIndex((h) => {
    const lower = h.toLowerCase();
    return keywords.some((k) => lower.includes(k));
  });
}

export function WooCommerceImportSection() {
  const [importType, setImportType] = useState<"orders" | "customers" | "subscriptions">("orders");
  const [preview, setPreview] = useState<{ headers: string[]; rows: string[][] } | null>(null);
  const [rawCSV, setRawCSV] = useState<string>("");
  const [rawXML, setRawXML] = useState<string>("");
  const [fileFormat, setFileFormat] = useState<"csv" | "xml">("csv");
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<ImportResult | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [storageImporting, setStorageImporting] = useState(false);

  function parseXMLSubscriptions(xmlText: string): { headers: string[]; rows: string[][] } {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, "text/xml");
    const items = doc.getElementsByTagName("item");
    const headers = ["Email", "Product Name", "Status", "Amount", "Billing Interval", "Subscription ID", "Period End"];
    const rows: string[][] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const getMetaValue = (key: string): string => {
        const metas = item.getElementsByTagName("wp:postmeta");
        for (let j = 0; j < metas.length; j++) {
          const metaKey = metas[j].getElementsByTagName("wp:meta_key")[0]?.textContent;
          if (metaKey === key) {
            return metas[j].getElementsByTagName("wp:meta_value")[0]?.textContent || "";
          }
        }
        return "";
      };

      // Check if this item is a subscription post type
      const postType = item.getElementsByTagName("wp:post_type")[0]?.textContent || "";
      if (postType !== "shop_subscription") continue;

      const email = getMetaValue("_billing_email");
      if (!email) continue;

      const status = (item.getElementsByTagName("wp:status")[0]?.textContent || getMetaValue("_status") || "active")
        .replace("wc-", "");
      const amount = getMetaValue("_order_total") || getMetaValue("_subscription_total") || "";
      const interval = getMetaValue("_billing_interval") || "1";
      const period = getMetaValue("_billing_period") || "month";
      const billingInterval = interval === "1" ? period : `${interval} ${period}s`;
      const subId = item.getElementsByTagName("wp:post_id")[0]?.textContent || "";
      const periodEnd = getMetaValue("_schedule_next_payment") || getMetaValue("_schedule_end") || "";

      // Get product name — try multiple strategies
      let productName = "";
      // 1. Direct meta keys
      for (const mk of ["_subscription_line_item_name", "_product_name", "_product_title"]) {
        const val = getMetaValue(mk);
        if (val) { productName = val; break; }
      }
      // 2. Parse serialized PHP from _order_items
      if (!productName) {
        const orderItems = getMetaValue("_order_items");
        if (orderItems) {
          const nameMatch = orderItems.match(/s:\d+:"name";s:\d+:"([^"]+)"/);
          if (nameMatch) productName = nameMatch[1];
        }
      }
      // 3. Title fallback (skip "Subscription #123 – Name" format)
      if (!productName) {
        const title = item.getElementsByTagName("title")[0]?.textContent || "";
        if (title && !title.startsWith("Subscription")) {
          productName = title;
        }
      }
      if (!productName) productName = "Unknown Product";

      rows.push([email, productName, status, amount, billingInterval, subId, periodEnd]);
    }

    return { headers, rows };
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResults(null);

    const isXML = file.name.toLowerCase().endsWith(".xml");

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;

        if (isXML) {
          setRawXML(text);
          setRawCSV("");
          setFileFormat("xml");
          const parsed = parseXMLSubscriptions(text);
          if (parsed.rows.length === 0) {
            toast.error("No subscription data found in XML. Make sure it's a WordPress WXR export with shop_subscription post types.");
            return;
          }
          setPreview(parsed);
          toast.success(`Loaded ${parsed.rows.length} subscription(s) from XML`);
          // Auto-switch to subscriptions tab for XML
          setImportType("subscriptions");
        } else {
          setRawCSV(text);
          setRawXML("");
          setFileFormat("csv");
          const parsed = parseCSV(text);
          if (parsed.headers.length === 0) {
            toast.error("CSV must have a header row and at least one data row");
            return;
          }
          setPreview(parsed);
          toast.success(`Loaded ${parsed.rows.length} row(s) from ${file.name}`);
        }
      } catch {
        toast.error("Failed to parse file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const clearPreview = () => {
    setPreview(null);
    setRawCSV("");
    setRawXML("");
    setFileFormat("csv");
    setFileName("");
    setResults(null);
  };

  const handleImport = async () => {
    if (!rawCSV && !rawXML) {
      toast.error("Please upload a file first");
      return;
    }

    setImporting(true);
    setResults(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const bodyPayload: Record<string, string> = { import_type: importType };
      if (fileFormat === "xml") {
        bodyPayload.xml_data = rawXML;
      } else {
        bodyPayload.csv_data = rawCSV;
      }

      const { data, error } = await supabase.functions.invoke("import-woo-data", {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: bodyPayload,
      });

      if (error) throw error;

      setResults(data);

      if (data.failed === 0 && data.skipped === 0) {
        toast.success(`Successfully imported ${data.success} record(s)`);
      } else {
        toast.warning(
          `Imported ${data.success}, skipped ${data.skipped}, failed ${data.failed}`
        );
      }
    } catch (error: any) {
      console.error("Import error:", error);
      toast.error(error.message || "Import failed");
    } finally {
      setImporting(false);
    }
  };

  const handleStorageImport = async (type: "subscriptions" | "customers", storagePath: string) => {
    setStorageImporting(true);
    setResults(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke("import-woo-data", {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: {
          import_type: type,
          storage_path: storagePath,
        },
      });

      if (error) throw error;
      setResults(data);

      const label = type === "subscriptions" ? "subscription(s)" : "customer(s)";
      if (data.failed === 0 && data.skipped === 0) {
        toast.success(`Successfully imported ${data.success} ${label}`);
      } else {
        toast.warning(
          `Imported ${data.success}, skipped ${data.skipped}, failed ${data.failed}`
        );
      }
    } catch (error: any) {
      console.error("Storage import error:", error);
      toast.error(error.message || "Import failed");
    } finally {
      setStorageImporting(false);
    }
  };

  const downloadTemplate = () => {
    let csv = "";
    if (importType === "orders") {
      csv =
        'Order Number,Order Status,Order Date,Order Total,Billing First Name,Billing Last Name,Billing Email,Billing Phone,Billing Address 1,Billing Address 2,Billing City,Billing State,Billing Postcode,Billing Country,Shipping First Name,Shipping Last Name,Shipping Address 1,Shipping Address 2,Shipping City,Shipping State,Shipping Postcode,Shipping Country,Item Name,Item Quantity\n"1001","completed","2026-01-15","149.00","John","Doe","john@example.com","+1234567890","123 Main St","Apt 4","New York","NY","10001","US","John","Doe","123 Main St","Apt 4","New York","NY","10001","US","BioLogic Mini",1';
    } else if (importType === "customers") {
      csv =
        'Email,First Name,Last Name,Phone,Billing Address 1,Billing City,Billing State,Billing Postcode,Billing Country\njohn@example.com,John,Doe,+1234567890,123 Main St,New York,NY,10001,US';
    } else {
      csv =
        "email,product_name,status,amount,billing_interval,subscription_id,period_end\njohn@example.com,Biotica 800 Refill,active,29.99,month,WC-1234,2026-03-01";
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `woo_${importType}_template.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const previewRows = preview ? preview.rows.slice(0, 10) : [];
  const visibleHeaders = preview ? preview.headers.slice(0, 8) : [];

  return (
    <div className="space-y-6">
      {/* Import type tabs */}
      <Tabs value={importType} onValueChange={(v) => { setImportType(v as any); clearPreview(); }}>
        <TabsList>
          <TabsTrigger value="orders" className="gap-2">
            <Package className="w-4 h-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="customers" className="gap-2">
            <Users className="w-4 h-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Subscriptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-4">
          <p className="text-sm text-muted-foreground">
            Import orders exported from WooCommerce (WooCommerce → Orders → Export).
            The CSV should include order details, billing/shipping info, and line items.
            Customer accounts will be automatically created if they don't exist.
          </p>
        </TabsContent>
        <TabsContent value="customers" className="mt-4">
          <p className="text-sm text-muted-foreground">
            Import customer profiles from WooCommerce (WooCommerce → Customers → Export).
            This creates user accounts with profile information. Existing emails will be skipped.
          </p>
          <div className="mt-3">
            <Button
              onClick={() => handleStorageImport("customers", "wc-customers-2026-03-10.csv")}
              disabled={storageImporting || importing}
              variant="outline"
              className="gap-2"
            >
              {storageImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Importing customers from server...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Import Customers CSV (from server)
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              Imports the uploaded customer CSV directly from server storage.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="subscriptions" className="mt-4">
          <p className="text-sm text-muted-foreground">
            Import WooCommerce subscriptions for entitlement recognition.
            Supports <strong>CSV</strong> files or <strong>WordPress WXR XML</strong> exports
            (Tools → Export → Subscriptions). XML files are automatically detected.
          </p>
          <div className="mt-3">
            <Button
              onClick={() => handleStorageImport("subscriptions", "woo-subscriptions-2026-03-10.xml")}
              disabled={storageImporting || importing}
              variant="outline"
              className="gap-2"
            >
              {storageImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Importing from server...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Import WordPress XML (from server)
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              Imports the uploaded WXR export file directly from server storage (no browser upload needed).
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Upload controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Label
          htmlFor="woo-csv-upload"
          className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border border-border bg-muted hover:bg-accent transition text-sm font-medium"
        >
          <Upload className="w-4 h-4" />
          {fileName || (importType === "subscriptions" ? "Upload CSV or XML" : "Upload CSV")}
        </Label>
        <input
          id="woo-csv-upload"
          type="file"
          accept={importType === "subscriptions" ? ".csv,.xml" : ".csv"}
          className="hidden"
          onChange={handleFileUpload}
        />

        <Button variant="ghost" size="sm" onClick={downloadTemplate}>
          <Download className="w-4 h-4 mr-2" />
          Download Template
        </Button>

        {preview && (
          <Button variant="ghost" size="sm" onClick={clearPreview}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Preview table */}
      {preview && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              Preview — {preview.rows.length} row(s){" "}
              {preview.rows.length > 10 && "(showing first 10)"}
            </span>
            <span className="text-xs text-muted-foreground">
              {preview.headers.length > 8 && `(${preview.headers.length} columns, showing first 8)`}
            </span>
          </div>

          <div className="border border-border rounded-xl overflow-x-auto max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  {visibleHeaders.map((h, i) => (
                    <TableHead key={i} className="min-w-[120px] text-xs">
                      {h}
                    </TableHead>
                  ))}
                  {preview.headers.length > 8 && (
                    <TableHead className="text-xs text-muted-foreground">...</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewRows.map((row, ri) => (
                  <TableRow key={ri}>
                    <TableCell className="text-xs text-muted-foreground">{ri + 1}</TableCell>
                    {visibleHeaders.map((_, ci) => (
                      <TableCell key={ci} className="text-xs max-w-[200px] truncate">
                        {row[ci] || "—"}
                      </TableCell>
                    ))}
                    {preview.headers.length > 8 && (
                      <TableCell className="text-xs text-muted-foreground">...</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Import button */}
          <Button onClick={handleImport} disabled={importing} className="mt-2">
            {importing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Importing {importType}...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Import {preview.rows.length} {importType}
              </>
            )}
          </Button>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="rounded-xl border border-border p-4 space-y-2">
          <div className="flex items-center gap-4 flex-wrap">
            {results.success > 0 && (
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20 gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {results.success} imported
              </Badge>
            )}
            {(results.created_users ?? 0) > 0 && (
              <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 gap-1">
                <Users className="w-3 h-3" />
                {results.created_users} new users created
              </Badge>
            )}
            {results.skipped > 0 && (
              <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 gap-1">
                <AlertCircle className="w-3 h-3" />
                {results.skipped} skipped
              </Badge>
            )}
            {results.failed > 0 && (
              <Badge className="bg-red-500/10 text-red-600 border-red-500/20 gap-1">
                <AlertCircle className="w-3 h-3" />
                {results.failed} failed
              </Badge>
            )}
          </div>
          {results.errors.length > 0 && (
            <ul className="text-sm text-destructive space-y-1 mt-2 max-h-[200px] overflow-y-auto">
              {results.errors.map((err, i) => (
                <li key={i}>• {err}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
