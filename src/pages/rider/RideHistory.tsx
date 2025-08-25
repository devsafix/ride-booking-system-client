/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetMyRidesQuery } from "@/redux/features/ride/ride.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Filter, WifiSync } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useCancelRideMutation } from "@/redux/features/drive/drive.api";

interface Ride {
  _id: string;
  status: string;
  fare: number;
  createdAt: string;
  pickupLocation: { latitude: number; longitude: number };
  dropOffLocation: { latitude: number; longitude: number };
}

export default function RideHistory() {
  const navigate = useNavigate();
  const [cancelRide] = useCancelRideMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "",
    minFare: "",
    maxFare: "",
    startDate: "",
    endDate: "",
  });

  const { data, isLoading, isError, refetch } = useGetMyRidesQuery({
    page: currentPage,
    limit: 10 as number,
    status: filters.status,
    minFare: filters.minFare ? Number(filters.minFare) : undefined,
    maxFare: filters.maxFare ? Number(filters.maxFare) : undefined,
    startDate: filters.startDate,
    endDate: filters.endDate,
  });

  const rides = data?.data?.data || [];
  const meta = data?.data?.data || {};
  const totalPages = Math.ceil(meta.total / meta.limit) || 1;

  const handleFilterChange = (key: string, value: string) => {
    if (value === "all") {
      setFilters((prev) => ({ ...prev, status: "" }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }

    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      minFare: "",
      maxFare: "",
      startDate: "",
      endDate: "",
    });
    setCurrentPage(1);
  };

  const handleViewDetails = (rideId: string) => {
    navigate(`/ride-details/${rideId}`);
  };

  const handleCancel = async (rideId: string) => {
    try {
      await cancelRide(rideId).unwrap();
      toast.success("Ride canceled successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to accept ride.");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">Ride History</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>There was an error fetching your ride history. Please try again.</p>
        <Button onClick={() => refetch()} className="mt-4">
          <WifiSync className="mr-2" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Ride History</h2>

        {/* Filters Section */}
        <div className="bg-muted/40 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="text-gray-500" />
            <h3 className="font-semibold text-lg">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <Label className="mb-2" htmlFor="status">
                Status
              </Label>
              <Select
                onValueChange={(value) => handleFilterChange("status", value)}
                value={filters.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="requested">Requested</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fare Range Filter */}
            <div className="flex gap-2">
              <div>
                <Label className="mb-2" htmlFor="minFare">
                  Min Fare
                </Label>
                <Input
                  type="number"
                  id="minFare"
                  value={filters.minFare}
                  onChange={(e) =>
                    handleFilterChange("minFare", e.target.value)
                  }
                  placeholder="Min"
                />
              </div>
              <div>
                <Label className="mb-2" htmlFor="maxFare">
                  Max Fare
                </Label>
                <Input
                  type="number"
                  id="maxFare"
                  value={filters.maxFare}
                  onChange={(e) =>
                    handleFilterChange("maxFare", e.target.value)
                  }
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="flex md:flex-row flex-col gap-2">
              <div>
                <Label className="mb-2" htmlFor="startDate">
                  Start Date
                </Label>
                <Input
                  type="date"
                  id="startDate"
                  value={filters.startDate}
                  onChange={(e) =>
                    handleFilterChange("startDate", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="mb-2" htmlFor="endDate">
                  End Date
                </Label>
                <Input
                  type="date"
                  id="endDate"
                  value={filters.endDate}
                  onChange={(e) =>
                    handleFilterChange("endDate", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="self-end">
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Ride History Table */}
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ride ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fare</TableHead>
                <TableHead>Pickup Location</TableHead>
                <TableHead>Drop-off Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Cancel Ride</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rides.length > 0 ? (
                rides.map((ride: Ride) => (
                  <TableRow key={ride._id}>
                    <TableCell className="font-medium">
                      {ride._id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        ride.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : ride.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                      >
                        {ride.status.charAt(0).toUpperCase() +
                          ride.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{ride.fare.toFixed(2)} TK</TableCell>
                    <TableCell>
                      {ride.pickupLocation.latitude},{" "}
                      {ride.pickupLocation.longitude}
                    </TableCell>
                    <TableCell>
                      {ride.dropOffLocation.latitude},{" "}
                      {ride.dropOffLocation.longitude}
                    </TableCell>
                    <TableCell>
                      {new Date(ride.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(ride._id)}
                      >
                        <Eye className="text-gray-500" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      {ride?.status === "requested" ? (
                        <Button
                          onClick={() => handleCancel(ride._id)}
                          className="cursor-pointer"
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button disabled>Cancel</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    No rides found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
