import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listEmailLogs, type EmailLogRow } from "@/lib/emailLog.functions";

const RANGES = [
  { label: "Last 24h", hours: 24 },
  { label: "Last 7 days", hours: 24 * 7 },
  { label: "Last 30 days", hours: 24 * 30 },
];

const PAGE_SIZE = 50;

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "delivered"
      ? "bg-emerald-600 text-white"
      : status === "sent"
        ? "bg-emerald-100 text-emerald-800"
        : status === "failed" || status === "dlq" || status === "bounced"
          ? "bg-red-100 text-red-800"
          : status === "complained" || status === "suppressed" || status === "delayed"
            ? "bg-amber-100 text-amber-800"
            : "bg-muted text-muted-foreground";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tone}`}>
      {status}
    </span>
  );
}

export default function EmailLogPage() {
  const [rangeHours, setRangeHours] = useState(24 * 7);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [template, setTemplate] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(0);

  const sinceIso = useMemo(() => {
    if (customStart) return new Date(customStart).toISOString();
    return new Date(Date.now() - rangeHours * 3600_000).toISOString();
  }, [rangeHours, customStart]);

  const fetchLogs = useServerFn(listEmailLogs);
  const { data, isLoading, error } = useQuery({
    queryKey: ["email-logs", sinceIso],
    queryFn: () => fetchLogs({ data: { sinceIso } }),
  });

  const rows: EmailLogRow[] = useMemo(() => {
    let list = data ?? [];
    if (customEnd) {
      const end = new Date(customEnd).getTime();
      list = list.filter((r) => new Date(r.created_at).getTime() <= end);
    }
    if (template !== "all") list = list.filter((r) => r.template_name === template);
    if (status !== "all") list = list.filter((r) => r.status === status);
    return list;
  }, [data, template, status, customEnd]);

  const templates = useMemo(
    () => Array.from(new Set((data ?? []).map((r) => r.template_name))).sort(),
    [data],
  );

  const stats = useMemo(() => {
    const base = data ?? [];
    const scoped = template === "all" ? base : base.filter((r) => r.template_name === template);
    return {
      total: scoped.length,
      sent: scoped.filter((r) => r.status === "sent").length,
      delivered: scoped.filter((r) => r.status === "delivered").length,
      failed: scoped.filter((r) => ["failed", "dlq", "bounced"].includes(r.status)).length,
      complained: scoped.filter((r) => ["complained", "suppressed"].includes(r.status)).length,
    };
  }, [data, template]);

  const pageRows = rows.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-foreground">Email delivery log</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Every email sent by the site, with the provider response recorded for each attempt.
      </p>

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <div className="flex gap-2">
          {RANGES.map((r) => (
            <button
              key={r.hours}
              onClick={() => {
                setRangeHours(r.hours);
                setCustomStart("");
                setCustomEnd("");
                setPage(0);
              }}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                !customStart && rangeHours === r.hours
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <label className="text-xs text-muted-foreground">
          From
          <input
            type="date"
            value={customStart}
            onChange={(e) => {
              setCustomStart(e.target.value);
              setPage(0);
            }}
            className="ml-2 rounded-md border bg-background px-2 py-1 text-sm text-foreground"
          />
        </label>
        <label className="text-xs text-muted-foreground">
          To
          <input
            type="date"
            value={customEnd}
            onChange={(e) => {
              setCustomEnd(e.target.value);
              setPage(0);
            }}
            className="ml-2 rounded-md border bg-background px-2 py-1 text-sm text-foreground"
          />
        </label>
        <select
          value={template}
          onChange={(e) => {
            setTemplate(e.target.value);
            setPage(0);
          }}
          className="rounded-md border bg-background px-2 py-1.5 text-sm text-foreground"
        >
          <option value="all">All templates</option>
          {templates.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(0);
          }}
          className="rounded-md border bg-background px-2 py-1.5 text-sm text-foreground"
        >
          <option value="all">All statuses</option>
          <option value="sent">Sent</option>
          <option value="delivered">Delivered</option>
          <option value="bounced">Bounced</option>
          <option value="complained">Spam complaint</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending</option>
          <option value="suppressed">Suppressed</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total emails", value: stats.total },
          { label: "Delivered", value: stats.delivered },
          { label: "Failed / bounced", value: stats.failed },
          { label: "Complaints", value: stats.complained },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-2xl font-semibold text-foreground">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Template</th>
              <th className="px-3 py-2">Recipient</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Provider</th>
              <th className="px-3 py-2">Sent at</th>
              <th className="px-3 py-2">Error</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                  Loading…
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-red-600">
                  {(error as Error).message}
                </td>
              </tr>
            )}
            {!isLoading && !error && pageRows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                  No emails in this range.
                </td>
              </tr>
            )}
            {pageRows.map((r) => (
              <tr key={r.id} className="border-t align-top">
                <td className="px-3 py-2 text-foreground">{r.template_name}</td>
                <td className="px-3 py-2 text-foreground">{r.recipient_email}</td>
                <td className="px-3 py-2">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-3 py-2 text-muted-foreground">
                  {r.provider_status_code ?? "—"}
                </td>
                <td className="px-3 py-2 text-muted-foreground">
                  {new Date(r.created_at).toLocaleString()}
                </td>
                <td className="max-w-xs px-3 py-2 text-xs text-red-700">
                  {r.error_message ?? ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="mt-4 flex items-center gap-3 text-sm">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-md border px-3 py-1.5 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-muted-foreground">
            Page {page + 1} of {pages}
          </span>
          <button
            disabled={page + 1 >= pages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-md border px-3 py-1.5 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
