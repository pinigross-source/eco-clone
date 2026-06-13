import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  RefreshCw,
  Search,
  Mail,
  Calendar,
  Tag,
  Gift,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import type { Json } from "@/integrations/supabase/types";

interface QuizLead {
  id: string;
  email: string;
  recommended_product: string;
  discount_code: string | null;
  email_sent: boolean | null;
  quiz_answers: Json | null;
  created_at: string;
}

export function QuizLeadsSection() {
  const [leads, setLeads] = useState<QuizLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("quiz_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching quiz leads:", error);
      toast.error("Failed to fetch quiz leads");
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

  const filteredLeads = leads.filter((lead) =>
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.recommended_product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: leads.length,
    emailSent: leads.filter((l) => l.email_sent).length,
    withDiscount: leads.filter((l) => l.discount_code).length,
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-muted/30">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Total Leads</span>
          </div>
          <span className="text-2xl font-bold">{stats.total}</span>
        </div>
        <div className="p-4 rounded-xl border bg-muted/30">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Emails Sent</span>
          </div>
          <span className="text-2xl font-bold">{stats.emailSent}</span>
        </div>
        <div className="p-4 rounded-xl border bg-muted/30">
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium">With Discount</span>
          </div>
          <span className="text-2xl font-bold">{stats.withDiscount}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by email or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={fetchLeads} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Table */}
      {filteredLeads.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No quiz leads found</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Recommended Product</TableHead>
                <TableHead>Discount Code</TableHead>
                <TableHead>Email Sent</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{lead.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="gap-1">
                      <Tag className="w-3 h-3" />
                      {lead.recommended_product}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {lead.discount_code ? (
                      <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 gap-1">
                        <Gift className="w-3 h-3" />
                        {lead.discount_code}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground"></span>
                    )}
                  </TableCell>
                  <TableCell>
                    {lead.email_sent ? (
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Sent
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 gap-1">
                        <XCircle className="w-3 h-3" />
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDate(lead.created_at)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
