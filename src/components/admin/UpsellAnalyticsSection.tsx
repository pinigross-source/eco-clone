import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, Eye, CheckCircle, XCircle, DollarSign, RefreshCw, BarChart3, LineChart } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";

interface UpsellAnalyticsData {
  event_type: string;
  device_name: string;
  subscription_name: string | null;
  subscription_price: number | null;
  device_price: number | null;
  created_at: string;
}

interface DeviceMetrics {
  deviceName: string;
  impressions: number;
  accepted: number;
  skipped: number;
  conversionRate: number;
  revenue: number;
}

interface DailyMetrics {
  date: string;
  displayDate: string;
  impressions: number;
  accepted: number;
  skipped: number;
  conversionRate: number;
  revenue: number;
}

export const UpsellAnalyticsSection = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UpsellAnalyticsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: analytics, error } = await supabase
        .from('upsell_analytics')
        .select('event_type, device_name, subscription_name, subscription_price, device_price, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(analytics || []);
    } catch (err: any) {
      console.error('Error fetching upsell analytics:', err);
      setError(err.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate overall metrics
  const totalImpressions = data.filter(e => e.event_type === 'impression').length;
  const totalAccepted = data.filter(e => e.event_type === 'accepted').length;
  const totalSkipped = data.filter(e => e.event_type === 'skipped').length;
  const overallConversionRate = totalImpressions > 0 ? ((totalAccepted / totalImpressions) * 100) : 0;
  const totalRevenue = data
    .filter(e => e.event_type === 'accepted')
    .reduce((sum, e) => sum + (e.subscription_price || 0), 0);

  // Calculate daily metrics for charts
  const dailyMetrics: DailyMetrics[] = useMemo(() => {
    const dailyMap = new Map<string, { impressions: number; accepted: number; skipped: number; revenue: number }>();
    
    // Get last 14 days
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      dailyMap.set(dateKey, { impressions: 0, accepted: 0, skipped: 0, revenue: 0 });
    }

    // Aggregate data by day
    data.forEach(event => {
      const dateKey = event.created_at.split('T')[0];
      if (dailyMap.has(dateKey)) {
        const dayData = dailyMap.get(dateKey)!;
        if (event.event_type === 'impression') dayData.impressions++;
        if (event.event_type === 'accepted') {
          dayData.accepted++;
          dayData.revenue += event.subscription_price || 0;
        }
        if (event.event_type === 'skipped') dayData.skipped++;
      }
    });

    return Array.from(dailyMap.entries()).map(([date, metrics]) => ({
      date,
      displayDate: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      impressions: metrics.impressions,
      accepted: metrics.accepted,
      skipped: metrics.skipped,
      conversionRate: metrics.impressions > 0 ? (metrics.accepted / metrics.impressions) * 100 : 0,
      revenue: metrics.revenue / 100, // Convert to dollars for chart
    }));
  }, [data]);

  // Calculate per-device metrics
  const deviceMetrics: DeviceMetrics[] = useMemo(() => {
    const devices = [...new Set(data.map(e => e.device_name))];
    return devices.map(deviceName => {
      const deviceData = data.filter(e => e.device_name === deviceName);
      const impressions = deviceData.filter(e => e.event_type === 'impression').length;
      const accepted = deviceData.filter(e => e.event_type === 'accepted').length;
      const skipped = deviceData.filter(e => e.event_type === 'skipped').length;
      const revenue = deviceData
        .filter(e => e.event_type === 'accepted')
        .reduce((sum, e) => sum + (e.subscription_price || 0), 0);

      return {
        deviceName,
        impressions,
        accepted,
        skipped,
        conversionRate: impressions > 0 ? (accepted / impressions) * 100 : 0,
        revenue,
      };
    }).sort((a, b) => b.impressions - a.impressions);
  }, [data]);

  // Get recent events (last 10)
  const recentEvents = data.slice(0, 10);

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Revenue' ? `$${entry.value.toFixed(2)}` : 
                entry.name === 'Conversion %' ? `${entry.value.toFixed(1)}%` : entry.value}
            </p>
          ))}
        </div>
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

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={fetchData} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Subscription Upsell Analytics</h2>
          <p className="text-sm text-muted-foreground">Track upsell modal performance and conversion rates</p>
        </div>
        <Button variant="outline" onClick={fetchData} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Impressions</span>
          </div>
          <span className="text-3xl font-bold">{totalImpressions}</span>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Accepted</span>
          </div>
          <span className="text-3xl font-bold">{totalAccepted}</span>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Skipped</span>
          </div>
          <span className="text-3xl font-bold">{totalSkipped}</span>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Conversion</span>
          </div>
          <span className="text-3xl font-bold">{overallConversionRate.toFixed(1)}%</span>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Revenue</span>
          </div>
          <span className="text-3xl font-bold">{formatPrice(totalRevenue)}</span>
        </Card>
      </div>

      {/* Trends Chart */}
      {data.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <LineChart className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Conversion Trends (Last 14 Days)</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyMetrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAccepted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSkipped" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="displayDate" 
                  tick={{ fontSize: 12 }} 
                  className="text-muted-foreground"
                />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="impressions"
                  name="Impressions"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorImpressions)"
                />
                <Area
                  type="monotone"
                  dataKey="accepted"
                  name="Accepted"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAccepted)"
                />
                <Area
                  type="monotone"
                  dataKey="skipped"
                  name="Skipped"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSkipped)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Conversion Rate & Revenue Chart */}
      {data.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-lg">Daily Conversion Rate</h3>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyMetrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="displayDate" 
                    tick={{ fontSize: 10 }} 
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    className="text-muted-foreground"
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="conversionRate"
                    name="Conversion %"
                    fill="#a855f7"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Daily Revenue</h3>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyMetrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="displayDate" 
                    tick={{ fontSize: 10 }} 
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    className="text-muted-foreground"
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="revenue"
                    name="Revenue"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* Per-Device Breakdown */}
      {deviceMetrics.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Performance by Device</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Device</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Impressions</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Accepted</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Skipped</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Conversion</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {deviceMetrics.map((device, i) => (
                  <tr key={device.deviceName} className={i < deviceMetrics.length - 1 ? 'border-b border-border/50' : ''}>
                    <td className="py-3 px-4 font-medium">{device.deviceName}</td>
                    <td className="py-3 px-4 text-center">{device.impressions}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-green-600 font-medium">{device.accepted}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-red-600">{device.skipped}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge 
                        variant="outline" 
                        className={device.conversionRate >= 20 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : device.conversionRate >= 10 
                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }
                      >
                        {device.conversionRate.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-emerald-600">
                      {formatPrice(device.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Recent Events */}
      {recentEvents.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Recent Events</h3>
          <div className="space-y-3">
            {recentEvents.map((event, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    event.event_type === 'impression' 
                      ? 'bg-blue-500/10' 
                      : event.event_type === 'accepted' 
                        ? 'bg-green-500/10' 
                        : 'bg-red-500/10'
                  }`}>
                    {event.event_type === 'impression' && <Eye className="w-4 h-4 text-blue-600" />}
                    {event.event_type === 'accepted' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {event.event_type === 'skipped' && <XCircle className="w-4 h-4 text-red-600" />}
                  </div>
                  <div>
                    <span className="font-medium capitalize">{event.event_type}</span>
                    <span className="text-muted-foreground"> - </span>
                    <span>{event.device_name}</span>
                    {event.subscription_name && event.event_type === 'accepted' && (
                      <span className="text-primary text-sm ml-2">+ {event.subscription_name}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">{formatDate(event.created_at)}</span>
                  {event.event_type === 'accepted' && event.subscription_price && (
                    <p className="text-sm font-medium text-emerald-600">{formatPrice(event.subscription_price)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {data.length === 0 && (
        <Card className="p-12 text-center">
          <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">No Data Yet</h3>
          <p className="text-muted-foreground">Upsell analytics will appear here once users interact with the subscription upsell modal.</p>
        </Card>
      )}
    </div>
  );
};
