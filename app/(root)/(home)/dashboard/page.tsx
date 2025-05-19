"use client";
import { Stats } from "@/components/dashboard/Stats";
import RevenueChart from "@/components/dashboard/RevenueChart";
import CustomerAnalytics from "@/components/dashboard/CustomerAnalytics";
import {
  CalendarIcon,
  Download,
  RefreshCcw,
  TrendingUp,
  Users,
  LineChart,
  Mail,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const Page = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedRange, setSelectedRange] = useState("month");

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="h-full bg-gray-950 p-6">
      <div className="mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Executive Dashboard
            </h1>
            <p className="text-gray-400">
              Real-time business intelligence and analytics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="gap-2 text-gray-300 border-gray-800"
              onClick={handleRefresh}
            >
              <RefreshCcw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              variant="outline"
              className="gap-2 text-gray-300 border-gray-800"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <select
              className="bg-gray-900 text-gray-300 px-4 py-2 rounded-lg border border-gray-800"
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        <Stats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <CustomerAnalytics />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-900/50 rounded-xl border border-gray-800 p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Key Insights
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h4 className="text-white font-medium">
                    Revenue Growth Trend
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Revenue is showing a consistent upward trend with a 15%
                    increase MoM. Key drivers include new product launches and
                    expanded market reach.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Customer Retention</h4>
                  <p className="text-gray-400 text-sm">
                    Customer retention rate has improved to 85%, indicating
                    strong product-market fit and effective customer success
                    strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-gray-300 border-gray-800"
              >
                <LineChart className="h-4 w-4 mr-2" />
                View Detailed Reports
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-gray-300 border-gray-800"
              >
                <Mail className="h-4 w-4 mr-2" />
                Schedule Report Delivery
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-gray-300 border-gray-800"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configure Alerts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
