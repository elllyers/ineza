"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ServiceRequests from "@/components/services/ServiceRequests";
import { Card } from "@/components/ui/card";
import { ListFilter, Loader2 } from "lucide-react";

interface RequestStats {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  cancelled: number;
  totalRevenue?: number;
  monthlyRevenue?: number;
}

export default function ServiceRequestsPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [stats, setStats] = useState<RequestStats>({
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/service-requests/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gray-950 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Service Requests</h1>
          <p className="text-gray-400">Manage and track service requests</p>
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-900 border border-gray-800 text-white rounded-md px-3 py-2"
          >
            <option value="all">All Requests</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <Button
            variant="outline"
            className="border-gray-800 hover:bg-gray-800"
          >
            <ListFilter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gray-900 border-gray-800 p-4">
          <div className="p-4 rounded-lg bg-gray-800/50">
            <div className="text-sm text-gray-400">Total Requests</div>
            <div className="text-2xl font-bold text-white mt-1">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                stats.total
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-4">
          <div className="p-4 rounded-lg bg-yellow-500/10">
            <div className="text-sm text-yellow-400">Pending</div>
            <div className="text-2xl font-bold text-white mt-1">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                stats.pending
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-4">
          <div className="p-4 rounded-lg bg-blue-500/10">
            <div className="text-sm text-blue-400">Processing</div>
            <div className="text-2xl font-bold text-white mt-1">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                stats.processing
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-4">
          <div className="p-4 rounded-lg bg-emerald-500/10">
            <div className="text-sm text-emerald-400">Completed</div>
            <div className="text-2xl font-bold text-white mt-1">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                stats.completed
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-4">
          <div className="p-4 rounded-lg bg-red-500/10">
            <div className="text-sm text-red-400">Cancelled</div>
            <div className="text-2xl font-bold text-white mt-1">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                stats.cancelled
              )}
            </div>
          </div>
        </Card>
      </div>

      <ServiceRequests
        status={filterStatus === "all" ? undefined : filterStatus}
      />
    </div>
  );
}
