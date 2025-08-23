/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useGetMyRidesQuery } from "@/redux/features/drive/drive.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const RideHistory = () => {
  const [filters, setFilters] = useState({
    status: "",
    minFare: "",
    maxFare: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, refetch } = useGetMyRidesQuery({
    role: "driver",
    ...filters,
  });

  // Extract rides data from the nested structure
  const ridesData = data?.data?.data || [];
  const metaData = data?.data?.meta || { total: 0 };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      minFare: "",
      maxFare: "",
      page: 1,
      limit: 10,
    });
  };

  const totalPages = Math.ceil((metaData.total || 0) / filters.limit);

  // Status badge variants
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      case "in_progress":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="bg-card border-border rounded-xl shadow-sm overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl font-semibold text-card-foreground">
            Ride History
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleClearFilters}
              variant="outline"
              size="sm"
              className="border-border"
            >
              Clear Filters
            </Button>
            <Button
              onClick={() => refetch()}
              size="sm"
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Apply
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted/30 rounded-lg border border-border">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Status
            </label>
            <Input
              name="status"
              placeholder="e.g. completed"
              value={filters.status}
              onChange={handleFilterChange}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Min Fare
            </label>
            <Input
              name="minFare"
              placeholder="Min Fare"
              type="number"
              value={filters.minFare}
              onChange={handleFilterChange}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Max Fare
            </label>
            <Input
              name="maxFare"
              placeholder="Max Fare"
              type="number"
              value={filters.maxFare}
              onChange={handleFilterChange}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Results per page
            </label>
            <Input
              name="limit"
              placeholder="Results per page"
              type="number"
              value={filters.limit}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  limit: parseInt(e.target.value) || 10,
                  page: 1,
                })
              }
              className="bg-background border-border"
            />
          </div>
        </div>

        {/* Ride Table */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold text-foreground">
                    Rider
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Pickup Location
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Drop-off Location
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-foreground text-right">
                    Fare
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ridesData.length > 0 ? (
                  ridesData.map((ride: any) => (
                    <TableRow key={ride._id} className="border-border">
                      <TableCell className="font-medium">
                        {ride.rider?.name || "Unknown Rider"}
                      </TableCell>
                      <TableCell>
                        {ride.pickupLocation?.address ||
                          `(${ride.pickupLocation?.latitude}, ${ride.pickupLocation?.longitude})` ||
                          "N/A"}
                      </TableCell>
                      <TableCell>
                        {ride.dropOffLocation?.address ||
                          `(${ride.dropOffLocation?.latitude}, ${ride.dropOffLocation?.longitude})` ||
                          "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(ride.status)}>
                          {ride.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${ride.fare?.toFixed(2) || "0.00"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Search className="h-8 w-8 mb-2" />
                        <p>No rides found.</p>
                        <p className="text-sm">Try adjusting your filters.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {(filters.page - 1) * filters.limit + 1} to{" "}
              {Math.min(filters.page * filters.limit, metaData.total)} of{" "}
              {metaData.total} results
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page <= 1}
                variant="outline"
                size="sm"
                className="border-border flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      variant={filters.page === pageNum ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && <span className="px-2">...</span>}
              </div>
              <Button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page >= totalPages}
                variant="outline"
                size="sm"
                className="border-border flex items-center gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RideHistory;
