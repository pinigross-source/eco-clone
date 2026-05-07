import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Loader2,
  RefreshCw,
  Search,
  Mail,
  Calendar,
  MessageSquare,
  User,
  Eye,
  CheckCircle2,
  Clock,
  Archive,
} from "lucide-react";

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  new: {
    label: "New",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    icon: <Mail className="w-3 h-3" />,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    icon: <Clock className="w-3 h-3" />,
  },
  resolved: {
    label: "Resolved",
    color: "bg-green-500/10 text-green-600 border-green-500/20",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  archived: {
    label: "Archived",
    color: "bg-gray-500/10 text-gray-600 border-gray-500/20",
    icon: <Archive className="w-3 h-3" />,
  },
};

export function ContactInquiriesSection() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error("Error fetching contact inquiries:", error);
      toast.error("Failed to fetch contact inquiries");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("contact_inquiries")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Status updated to ${statusConfig[newStatus]?.label || newStatus}`);
      fetchInquiries();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
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

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    inProgress: inquiries.filter((i) => i.status === "in_progress").length,
    resolved: inquiries.filter((i) => i.status === "resolved").length,
  };

  const getStatusConfig = (status: string) => {
    return statusConfig[status] || statusConfig.new;
  };

  const openDetails = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    setDetailsOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "all" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => setStatusFilter("all")}
        >
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Total</span>
          </div>
          <span className="text-2xl font-bold">{stats.total}</span>
        </div>
        <div
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "new" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => setStatusFilter(statusFilter === "new" ? "all" : "new")}
        >
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">New</span>
          </div>
          <span className="text-2xl font-bold">{stats.new}</span>
        </div>
        <div
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "in_progress" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => setStatusFilter(statusFilter === "in_progress" ? "all" : "in_progress")}
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium">In Progress</span>
          </div>
          <span className="text-2xl font-bold">{stats.inProgress}</span>
        </div>
        <div
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "resolved" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => setStatusFilter(statusFilter === "resolved" ? "all" : "resolved")}
        >
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Resolved</span>
          </div>
          <span className="text-2xl font-bold">{stats.resolved}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={fetchInquiries} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Inquiries List */}
      {filteredInquiries.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No contact inquiries found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredInquiries.map((inquiry) => {
            const status = getStatusConfig(inquiry.status);
            return (
              <div
                key={inquiry.id}
                className="border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold truncate">{inquiry.subject}</span>
                      <Badge className={`${status.color} gap-1`}>
                        {status.icon}
                        {status.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {inquiry.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {inquiry.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(inquiry.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {inquiry.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Select
                      value={inquiry.status}
                      onValueChange={(value) => updateStatus(inquiry.id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm" onClick={() => openDetails(inquiry)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Contact Inquiry Details
            </DialogTitle>
            <DialogDescription>
              Submitted on {selectedInquiry && formatDate(selectedInquiry.created_at)}
            </DialogDescription>
          </DialogHeader>

          {selectedInquiry && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{selectedInquiry.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="font-medium">
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-primary hover:underline"
                    >
                      {selectedInquiry.email}
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Subject</label>
                <p className="font-medium">{selectedInquiry.subject}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <div className="mt-1 p-4 bg-muted/50 rounded-lg whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <Select
                  value={selectedInquiry.status}
                  onValueChange={(value) => {
                    updateStatus(selectedInquiry.id, value);
                    setSelectedInquiry({ ...selectedInquiry, status: value });
                  }}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  asChild
                  className="ml-auto"
                >
                  <a href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Reply via Email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
