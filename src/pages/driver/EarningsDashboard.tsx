/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetEarningsQuery } from "@/redux/features/drive/drive.api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface EarningsData {
  name: string;
  earnings: number;
  date?: string;
}

const EarningsDashboard = () => {
  const { data, isLoading } = useGetEarningsQuery(undefined);
  const [chartData, setChartData] = useState<EarningsData[]>([]);
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily");

  useEffect(() => {
    if (data?.data?.history) {
      setChartData(processEarningsData(data.data.history, view));
    }
  }, [data, view]);

  // Function to group earnings
  const processEarningsData = (
    history: any[],
    mode: "daily" | "weekly" | "monthly"
  ): EarningsData[] => {
    if (!history || history.length === 0) return [];

    const earningsMap: Record<string, number> = {};

    history.forEach((item) => {
      if (!item.date || typeof item.fare !== "number") return;
      const dateObj = new Date(item.date);
      let key = "";

      if (mode === "daily") {
        key = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
      } else if (mode === "weekly") {
        const firstDayOfYear = new Date(dateObj.getFullYear(), 0, 1);
        const pastDaysOfYear =
          (dateObj.getTime() - firstDayOfYear.getTime()) / 86400000;
        const weekNum = Math.ceil(
          (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
        );
        key = `Week ${weekNum}`;
      } else if (mode === "monthly") {
        key = dateObj.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      }

      earningsMap[key] = (earningsMap[key] || 0) + item.fare;
    });

    return Object.entries(earningsMap).map(([name, earnings]) => ({
      name,
      earnings,
    }));
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-foreground font-semibold">
            TK {payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const maxEarnings =
    chartData.length > 0
      ? Math.max(...chartData.map((item) => item.earnings))
      : 1;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-4" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  const totalEarnings = data?.data?.totalEarnings || 0;
  const averageEarnings =
    chartData.length > 0
      ? chartData.reduce((sum, item) => sum + item.earnings, 0) /
        chartData.length
      : 0;
  const highestDay =
    chartData.length > 0
      ? chartData.reduce((max, item) =>
          item.earnings > max.earnings ? item : max
        )
      : null;

  return (
    <div>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Earnings Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your earnings performance
          </p>
        </div>

        {/* View Selector */}
        <div className="flex gap-3">
          {["daily", "weekly", "monthly"].map((type) => (
            <button
              key={type}
              onClick={() => setView(type as any)}
              className={`px-3 py-1 rounded ${
                view === type ? "bg-foreground text-background" : "bg-muted"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                TK {totalEarnings.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                TK {averageEarnings.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Best Period</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {highestDay ? highestDay.name : "N/A"}
              </div>
              {highestDay && (
                <p className="text-sm text-muted-foreground mt-1">
                  TK {highestDay.earnings.toFixed(2)}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{view} Earnings Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="earnings" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => {
                        const ratio = entry.earnings / maxEarnings;
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill="hsl(var(--foreground))"
                            opacity={0.6 + ratio * 0.4}
                          />
                        );
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No earnings data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EarningsDashboard;
