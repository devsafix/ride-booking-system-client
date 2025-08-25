/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetRideReportQuery } from "@/redux/features/admin/admin.api";
import type { IRideReport } from "@/types";
import { Notebook } from "lucide-react";

const RideOversight = () => {
  const { data, isLoading, isError } = useGetRideReportQuery(undefined);
  const report = (data as any)?.data as IRideReport | undefined;

  // State for filtering
  const [driverFilter, setDriverFilter] = useState("");
  const [riderFilter, setRiderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter rides based on state
  const filteredRides = (report?.detailedRides || []).filter((ride: any) => {
    const driverName = ride.driver?.name?.toLowerCase() || "";
    const riderName = ride.rider?.name?.toLowerCase() || "";
    const rideStatus = ride.status.toLowerCase();

    const matchesDriver = driverName.includes(driverFilter.toLowerCase());
    const matchesRider = riderName.includes(riderFilter.toLowerCase());
    const matchesStatus = statusFilter === "all" || rideStatus === statusFilter;

    return matchesDriver && matchesRider && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-muted border-t-foreground rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading ride data...</p>
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
                Failed to fetch ride data
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

  const { overview } = report || {};

  return (
    <div className="p-6 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Notebook className="h-8 w-8 text-foreground" />
            <h1 className="text-3xl font-bold text-foreground">
              Ride Oversight
            </h1>
          </div>
          <p className="text-muted-foreground">
            Monitor and manage all ride activities
          </p>
        </div>

        {/* Overview Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Rides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {overview?.totalRides || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {overview?.completedRides || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cancelled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {overview?.cancelledRides || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {overview?.totalEarnings?.toFixed(2) || "0.00"} TK
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Driver Name</label>
                <Input
                  placeholder="Search by driver name..."
                  value={driverFilter}
                  onChange={(e) => setDriverFilter(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rider Name</label>
                <Input
                  placeholder="Search by rider name..."
                  value={riderFilter}
                  onChange={(e) => setRiderFilter(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Rides Table */}
        <Card>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ride ID</TableHead>
                    <TableHead>Rider</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Fare</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRides.length > 0 ? (
                    filteredRides.map((ride: any) => (
                      <TableRow key={ride._id}>
                        <TableCell className="font-mono text-sm">
                          {ride._id.substring(0, 8)}...
                        </TableCell>
                        <TableCell>{ride.rider?.name || "N/A"}</TableCell>
                        <TableCell>{ride.driver?.name || "N/A"}</TableCell>
                        <TableCell className="font-semibold">
                          ${ride.fare?.toFixed(2) || "0.00"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              ride.status === "COMPLETED"
                                ? "default"
                                : ride.status === "CANCELLED"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {ride.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(ride.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex flex-col items-center space-y-2">
                          <p className="text-muted-foreground">
                            No rides found
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Try adjusting your filters
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RideOversight;
