import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Loader2,
  RefreshCw,
  UserPlus,
  Trash2,
  Shield,
  KeyRound,
  ScrollText,
} from "lucide-react";

interface ActivityLog {
  id: string;
  admin_id: string;
  admin_email: string;
  action: string;
  target_user_id: string | null;
  target_user_email: string | null;
  details: Record<string, unknown>;
  created_at: string;
}

const actionConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  user_created: {
    label: "User Created",
    icon: <UserPlus className="w-4 h-4" />,
    color: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  user_deleted: {
    label: "User Deleted",
    icon: <Trash2 className="w-4 h-4" />,
    color: "bg-red-500/10 text-red-600 border-red-500/20",
  },
  roles_updated: {
    label: "Roles Updated",
    icon: <Shield className="w-4 h-4" />,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  password_reset: {
    label: "Password Reset",
    icon: <KeyRound className="w-4 h-4" />,
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  },
};

export function ActivityLogsSection() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke("manage-users", {
        body: { action: "get_activity_logs", limit: 100 },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setLogs(data || []);
    } catch (error: any) {
      console.error("Error fetching logs:", error);
      toast.error(error.message || "Failed to fetch activity logs");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionInfo = (action: string) =>
    actionConfig[action] || {
      label: action,
      icon: <ScrollText className="w-4 h-4" />,
      color: "bg-muted text-muted-foreground",
    };

  const renderDetails = (log: ActivityLog) => {
    const details = log.details;
    if (!details || Object.keys(details).length === 0) return null;

    if (log.action === "roles_updated") {
      const oldRoles = (details.old_roles as string[]) || [];
      const newRoles = (details.new_roles as string[]) || [];
      return (
        <span className="text-xs text-muted-foreground">
          {oldRoles.length ? oldRoles.join(", ") : "none"} → {newRoles.length ? newRoles.join(", ") : "none"}
        </span>
      );
    }

    if (log.action === "user_created" && details.assigned_role) {
      return (
        <span className="text-xs text-muted-foreground">
          Role: {details.assigned_role as string}
        </span>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-12">
          <ScrollText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No activity logs yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => {
            const info = getActionInfo(log.action);
            return (
              <div
                key={log.id}
                className="border border-border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              >
                <Badge className={`${info.color} gap-1 w-fit shrink-0`}>
                  {info.icon}
                  {info.label}
                </Badge>
                <div className="flex-1 min-w-0 text-sm">
                  <span className="font-medium">{log.admin_email}</span>
                  {log.target_user_email && (
                    <>
                      <span className="text-muted-foreground"> → </span>
                      <span className="font-medium">{log.target_user_email}</span>
                    </>
                  )}
                  {renderDetails(log) && (
                    <span className="ml-2">{renderDetails(log)}</span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatDate(log.created_at)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
