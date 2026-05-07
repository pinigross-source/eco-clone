import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, Plus, Trash2, CheckCircle2, AlertCircle, Download } from "lucide-react";

interface SubscriberRow {
  email: string;
  product_name: string;
  status: string;
  amount: number | null;
  billing_interval: string;
  woo_subscription_id: string;
  current_period_end: string;
}

const EMPTY_ROW: SubscriberRow = {
  email: "",
  product_name: "",
  status: "active",
  amount: null,
  billing_interval: "month",
  woo_subscription_id: "",
  current_period_end: "",
};

export function WooSubscriberImportSection() {
  const [rows, setRows] = useState<SubscriberRow[]>([{ ...EMPTY_ROW }]);
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] } | null>(null);

  const addRow = () => setRows((prev) => [...prev, { ...EMPTY_ROW }]);

  const removeRow = (index: number) => {
    if (rows.length === 1) return;
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof SubscriberRow, value: string | number | null) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split("\n").filter((l) => l.trim());
        if (lines.length < 2) {
          toast.error("CSV must have a header row and at least one data row");
          return;
        }

        const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/['"]/g, ""));
        const emailIdx = headers.findIndex((h) => h.includes("email"));
        const productIdx = headers.findIndex((h) => h.includes("product"));
        const statusIdx = headers.findIndex((h) => h.includes("status"));
        const amountIdx = headers.findIndex((h) => h.includes("amount") || h.includes("price"));
        const intervalIdx = headers.findIndex((h) => h.includes("interval") || h.includes("billing"));
        const subIdIdx = headers.findIndex((h) => h.includes("subscription") && h.includes("id"));
        const endIdx = headers.findIndex((h) => h.includes("end") || h.includes("expir"));

        if (emailIdx === -1 || productIdx === -1) {
          toast.error("CSV must contain at least 'email' and 'product' columns");
          return;
        }

        const parsed: SubscriberRow[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(",").map((c) => c.trim().replace(/['"]/g, ""));
          if (!cols[emailIdx]) continue;
          parsed.push({
            email: cols[emailIdx],
            product_name: cols[productIdx] || "",
            status: statusIdx !== -1 ? cols[statusIdx] || "active" : "active",
            amount: amountIdx !== -1 && cols[amountIdx] ? parseFloat(cols[amountIdx]) : null,
            billing_interval: intervalIdx !== -1 ? cols[intervalIdx] || "month" : "month",
            woo_subscription_id: subIdIdx !== -1 ? cols[subIdIdx] || "" : "",
            current_period_end: endIdx !== -1 ? cols[endIdx] || "" : "",
          });
        }

        if (parsed.length === 0) {
          toast.error("No valid rows found in CSV");
          return;
        }

        setRows(parsed);
        toast.success(`Loaded ${parsed.length} subscriber(s) from CSV`);
      } catch {
        toast.error("Failed to parse CSV file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleImport = async () => {
    const valid = rows.filter((r) => r.email && r.product_name);
    if (valid.length === 0) {
      toast.error("Please add at least one subscriber with email and product name");
      return;
    }

    setImporting(true);
    setResults(null);

    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const row of valid) {
      const { error } = await (supabase as any).from("woo_subscriptions").upsert(
        {
          email: row.email.toLowerCase().trim(),
          product_name: row.product_name,
          status: row.status || "active",
          amount: row.amount ? Math.round(row.amount * 100) : null,
          billing_interval: row.billing_interval || "month",
          woo_subscription_id: row.woo_subscription_id || null,
          current_period_end: row.current_period_end || null,
        },
        { onConflict: "email,product_name", ignoreDuplicates: false }
      );

      if (error) {
        failed++;
        errors.push(`${row.email}: ${error.message}`);
      } else {
        success++;
      }
    }

    setResults({ success, failed, errors });
    setImporting(false);

    if (failed === 0) {
      toast.success(`Successfully imported ${success} subscriber(s)`);
    } else {
      toast.warning(`Imported ${success}, failed ${failed}`);
    }
  };

  const downloadTemplate = () => {
    const csv = "email,product_name,status,amount,billing_interval,subscription_id,period_end\njohn@example.com,Biotica 800 Refill,active,29.99,month,WC-1234,2026-03-01";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "woo_subscribers_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Upload / Template row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Label
          htmlFor="csv-upload"
          className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border border-border bg-muted hover:bg-accent transition text-sm font-medium"
        >
          <Upload className="w-4 h-4" />
          Upload CSV
        </Label>
        <input id="csv-upload" type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />

        <Button variant="ghost" size="sm" onClick={downloadTemplate}>
          <Download className="w-4 h-4 mr-2" />
          Download Template
        </Button>

        <span className="text-xs text-muted-foreground">
          CSV must include <strong>email</strong> and <strong>product_name</strong> columns.
        </span>
      </div>

      {/* Manual entry table */}
      <div className="border border-border rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Email *</TableHead>
              <TableHead className="min-w-[180px]">Product Name *</TableHead>
              <TableHead className="min-w-[110px]">Status</TableHead>
              <TableHead className="min-w-[100px]">Amount ($)</TableHead>
              <TableHead className="min-w-[110px]">Interval</TableHead>
              <TableHead className="min-w-[140px]">WC Sub ID</TableHead>
              <TableHead className="min-w-[140px]">Period End</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Input
                    placeholder="email@example.com"
                    value={row.email}
                    onChange={(e) => updateRow(i, "email", e.target.value)}
                    className="h-8 text-sm"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Biotica 800 Refill"
                    value={row.product_name}
                    onChange={(e) => updateRow(i, "product_name", e.target.value)}
                    className="h-8 text-sm"
                  />
                </TableCell>
                <TableCell>
                  <Select value={row.status} onValueChange={(v) => updateRow(i, "status", v)}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="29.99"
                    value={row.amount ?? ""}
                    onChange={(e) => updateRow(i, "amount", e.target.value ? parseFloat(e.target.value) : null)}
                    className="h-8 text-sm"
                  />
                </TableCell>
                <TableCell>
                  <Select value={row.billing_interval} onValueChange={(v) => updateRow(i, "billing_interval", v)}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="year">Yearly</SelectItem>
                      <SelectItem value="week">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="WC-1234"
                    value={row.woo_subscription_id}
                    onChange={(e) => updateRow(i, "woo_subscription_id", e.target.value)}
                    className="h-8 text-sm"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="date"
                    value={row.current_period_end}
                    onChange={(e) => updateRow(i, "current_period_end", e.target.value)}
                    className="h-8 text-sm"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeRow(i)}
                    disabled={rows.length === 1}
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Button variant="outline" size="sm" onClick={addRow}>
          <Plus className="w-4 h-4 mr-2" />
          Add Row
        </Button>

        <Button onClick={handleImport} disabled={importing}>
          {importing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Importing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Import {rows.filter((r) => r.email && r.product_name).length} Subscriber(s)
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      {results && (
        <div className="rounded-xl border border-border p-4 space-y-2">
          <div className="flex items-center gap-4">
            {results.success > 0 && (
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20 gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {results.success} imported
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
            <ul className="text-sm text-destructive space-y-1 mt-2">
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
