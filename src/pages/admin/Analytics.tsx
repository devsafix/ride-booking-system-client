/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { format, parseISO } from "date-fns";
import type { IRide } from "@/types";
import { ChartArea } from "lucide-react";
import { useGetRideReportQuery } from "@/redux/features/admin/admin.api";

const getCssVarColor = (variable: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

// Helper function to process data for charts
const processRideData = (rides: IRide[]) => {
  const rideVolumeMap = new Map<string, number>();
  const revenueTrendMap = new Map<string, number>();
  const driverActivityMap = new Map<string, { name: string; rides: number }>();

  rides.forEach((ride) => {
    const rideDate = format(parseISO(ride.createdAt), "MM/dd/yy");
    rideVolumeMap.set(rideDate, (rideVolumeMap.get(rideDate) || 0) + 1);

    if (ride.status === "COMPLETED") {
      revenueTrendMap.set(
        rideDate,
        (revenueTrendMap.get(rideDate) || 0) + (ride.fare || 0)
      );
    }

    if (ride.driver && ride.status === "COMPLETED") {
      const driverId = ride.driver._id;
      driverActivityMap.set(driverId, {
        name: ride.driver.name,
        rides: (driverActivityMap.get(driverId)?.rides || 0) + 1,
      });
    }
  });

  const rideVolumeData = Array.from(rideVolumeMap, ([date, count]) => ({
    date,
    rides: count,
  }));

  const revenueData = Array.from(revenueTrendMap, ([date, revenue]) => ({
    date,
    revenue: revenue,
  }));

  const driverActivityData = Array.from(driverActivityMap.values()).sort(
    (a, b) => b.rides - a.rides
  );

  return { rideVolumeData, revenueData, driverActivityData };
};

const Analytics = () => {
  const { data, isLoading, isError } = useGetRideReportQuery(undefined);
  const rides = (data as any)?.data?.detailedRides || [];

  const { rideVolumeData, revenueData, driverActivityData } =
    processRideData(rides);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-muted border-t-foreground rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-destructive font-medium">
                Failed to fetch analytics data
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Please try refreshing the page
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const primaryColor = getCssVarColor("--primary");
  const cardColor = getCssVarColor("--card");
  const borderColor = getCssVarColor("--border");
  const foregroundColor = getCssVarColor("--foreground");
  const mutedForeground = getCssVarColor("--muted-foreground");
  const backgroundColor = getCssVarColor("--background");

  return (
    <div className="p-6 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <ChartArea className="h-8 w-8 text-foreground" />
            <h1 className="text-3xl font-bold text-foreground">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive insights into ride performance and trends
          </p>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Ride Volume Chart */}
          <Card className="col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <div className="w-4 h-4 bg-foreground rounded-sm"></div>
                Ride Volume by Date
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Daily ride count over time
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] text-white">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={rideVolumeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="date"
                      className="text-muted-foreground text-xs"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      className="text-muted-foreground text-xs"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: foregroundColor,
                        border: `1px solid ${foregroundColor}`,
                        borderRadius: "6px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      itemStyle={{ color: backgroundColor }}
                      labelStyle={{ color: mutedForeground }}
                    />
                    <Bar
                      dataKey="rides"
                      fill={primaryColor}
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Trends Chart */}
          <Card className="col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <div className="w-4 h-4 bg-foreground rounded-sm"></div>
                Revenue Trends
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Daily revenue from completed rides
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="date"
                      className="text-muted-foreground text-xs"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      className="text-muted-foreground text-xs"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: cardColor,
                        border: `1px solid ${borderColor}`,
                        borderRadius: "6px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      itemStyle={{ color: foregroundColor }}
                      labelStyle={{ color: mutedForeground }}
                      formatter={(value: any) => [
                        `$${value.toFixed(2)}`,
                        "Revenue",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke={primaryColor}
                      strokeWidth={2}
                      dot={{
                        fill: primaryColor,
                        strokeWidth: 0,
                        r: 3,
                      }}
                      activeDot={{ r: 5, fill: primaryColor }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Driver Activity Chart */}
          <Card className="col-span-1 xl:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <div className="w-4 h-4 bg-foreground rounded-sm"></div>
                Top Driver Activity
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Most active drivers by completed rides
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={driverActivityData.slice(0, 5)}
                    layout="horizontal"
                    margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                  >
                    <XAxis
                      type="number"
                      className="text-muted-foreground text-xs"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      className="text-muted-foreground text-xs"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: cardColor,
                        border: `1px solid ${borderColor}`,
                        borderRadius: "6px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      itemStyle={{ color: foregroundColor }}
                      labelStyle={{ color: mutedForeground }}
                      formatter={(value: any) => [value, "Completed Rides"]}
                    />
                    <Bar
                      dataKey="rides"
                      fill={primaryColor}
                      radius={[0, 2, 2, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {rideVolumeData.length}
                </div>
                <p className="text-sm text-muted-foreground">Active Days</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  $
                  {revenueData
                    .reduce((sum, item) => sum + item.revenue, 0)
                    .toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {driverActivityData.length}
                </div>
                <p className="text-sm text-muted-foreground">Active Drivers</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
