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

// Interface for earnings data
interface EarningsData {
  name: string;
  earnings: number;
  date?: string;
}

const EarningsDashboard = () => {
  const { data, isLoading } = useGetEarningsQuery(undefined);
  const [chartData, setChartData] = useState<EarningsData[]>([]);

  // Process the earnings data when it's available
  useEffect(() => {
    if (data?.data?.history) {
      // Process the history data to create chart data
      const processedData = processEarningsData(data.data.history);
      setChartData(processedData);
    }
  }, [data]);

  // Function to process earnings history into chart data
  const processEarningsData = (history: any[]): EarningsData[] => {
    if (!history || history.length === 0) return [];

    // Group earnings by day of week if we have date information
    // If we don't have dates, create a simple array of earnings
    if (history[0].date) {
      // Create a map for each day of week
      const dayMap: { [key: string]: number } = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
      };

      // Initialize earnings for each day
      const dailyEarnings: { [key: string]: number } = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
        Sun: 0,
      };

      // Sum earnings by day of week
      history.forEach((item) => {
        if (item.date && item.amount) {
          const date = new Date(item.date);
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
          });
          dailyEarnings[dayName] += item.amount;
        }
      });

      // Convert to array and sort by day of week
      return Object.entries(dailyEarnings)
        .map(([name, earnings]) => ({ name, earnings }))
        .sort((a, b) => dayMap[a.name] - dayMap[b.name]);
    } else {
      // If no date information, just use the earnings values directly
      return history.map((item, index) => ({
        name: `Day ${index + 1}`,
        earnings: item.amount || item.earnings || 0,
      }));
    }
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-foreground font-semibold">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Get the maximum value for gradient calculation
  const maxEarnings =
    chartData.length > 0
      ? Math.max(...chartData.map((item) => item.earnings))
      : 1; // Avoid division by zero

  if (isLoading) {
    return (
      <div>
        <div className="max-w-7xl mx-auto p-6">
          <div className="space-y-8">
            {/* Header Skeleton */}
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-4">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-4">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-4">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            </div>

            {/* Chart Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-80 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
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
            Track your daily earnings and performance
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${totalEarnings.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Daily Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${averageEarnings.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Best Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {highestDay ? `${highestDay.name}` : "N/A"}
              </div>
              {highestDay && (
                <p className="text-sm text-muted-foreground mt-1">
                  ${highestDay.earnings.toFixed(2)}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-4 h-4 bg-foreground rounded-sm"></div>
              Weekly Earnings Breakdown
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Your earnings performance throughout the week
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      className="text-muted-foreground text-xs"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      className="text-muted-foreground text-xs"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                    />
                    <Bar dataKey="earnings" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => {
                        const ratio = entry.earnings / maxEarnings;
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill="hsl(var(--foreground))"
                            opacity={0.6 + ratio * 0.4} // Dynamic opacity based on value
                          />
                        );
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground font-medium">
                      No earnings data available
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Complete some rides to see your earnings here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        {chartData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <p className="text-sm text-muted-foreground">
                Key metrics about your earnings
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Active Days This Week
                    </span>
                    <span className="font-medium">
                      {chartData.filter((day) => day.earnings > 0).length} /{" "}
                      {chartData.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Consistency Score
                    </span>
                    <span className="font-medium">
                      {Math.round(
                        (chartData.filter((day) => day.earnings > 0).length /
                          chartData.length) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Highest Single Day
                    </span>
                    <span className="font-medium">
                      $
                      {Math.max(...chartData.map((d) => d.earnings)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Total This Week
                    </span>
                    <span className="font-medium">
                      $
                      {chartData
                        .reduce((sum, day) => sum + day.earnings, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EarningsDashboard;
