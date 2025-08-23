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
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-primary font-semibold">
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
      <Card className="bg-card border-border shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="pb-3">
          <Skeleton className="h-7 w-40" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <Skeleton className="h-5 w-32 mx-auto" />
            <Skeleton className="h-10 w-48 mx-auto" />
          </div>
          <div className="w-full h-64">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalEarnings = data?.data?.totalEarnings || 0;

  return (
    <Card className="bg-card border-border shadow-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-card-foreground">
          Your Earnings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Total Earnings
          </p>
          <p className="text-4xl font-bold text-primary">
            ${totalEarnings.toFixed(2)}
          </p>
        </div>
        <div className="w-full h-64">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
              >
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                />
                <Bar dataKey="earnings" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => {
                    const ratio = entry.earnings / maxEarnings;
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={`hsl(var(--primary))`}
                        opacity={0.7 + ratio * 0.3} // Dynamic opacity based on value
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
  );
};

export default EarningsDashboard;
