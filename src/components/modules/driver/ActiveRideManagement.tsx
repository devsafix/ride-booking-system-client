/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  useGetAcceptedRidesQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/drive/drive.api";
import type { IRideStatus } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Navigation, User, Calendar, Clock } from "lucide-react";

// Define status options with corresponding colors
const statusOptions = {
  accepted: { label: "Accepted", color: "bg-blue-500" },
  picked_up: { label: "Picked Up", color: "bg-amber-500" },
  in_transit: { label: "In Transit", color: "bg-purple-500" },
  completed: { label: "Completed", color: "bg-green-500" },
};

const ActiveRideManagement = () => {
  const { data, isLoading: isFetching } = useGetAcceptedRidesQuery(undefined);
  const [updateRideStatus, { isLoading }] = useUpdateRideStatusMutation();

  const [activeRide, setActiveRide] = useState<any | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<IRideStatus>("accepted");

  // Set activeRide when data is fetched
  useEffect(() => {
    if (data?.data?.length > 0) {
      setActiveRide(data.data[0]); // take the first active ride
      setSelectedStatus(data.data[0].status as IRideStatus);
    }
  }, [data]);

  // Handle status update
  const handleStatusUpdate = async () => {
    if (!activeRide) return;
    try {
      await updateRideStatus({
        id: activeRide._id,
        status: selectedStatus,
      }).unwrap();

      setActiveRide((prev: any) => ({ ...prev, status: selectedStatus }));
      toast.success("Ride status updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status.");
    }
  };

  if (isFetching) {
    return (
      <Card className="bg-card border-border rounded-xl shadow-sm overflow-hidden">
        <CardHeader className="pb-3">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-6 w-24 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!activeRide) {
    return (
      <Card className="bg-card border-border rounded-xl shadow-sm overflow-hidden">
        <CardContent className="p-6 text-center">
          <div className="bg-muted rounded-full p-4 inline-flex items-center justify-center mb-4">
            <Navigation className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-card-foreground mb-2">
            No Active Rides
          </h3>
          <p className="text-muted-foreground">
            You don't have any active rides at the moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold text-card-foreground">
            Active Ride with {activeRide.rider?.name || "Passenger"}
          </CardTitle>
          <Badge
            className={`${statusOptions[activeRide.status as keyof typeof statusOptions]?.color} text-white border-0`}
          >
            {statusOptions[activeRide.status as keyof typeof statusOptions]?.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">From</p>
                <p className="font-medium text-card-foreground">
                  {activeRide.pickupLocation?.address || 
                    `(${activeRide.pickupLocation?.latitude ?? "N/A"}, ${activeRide.pickupLocation?.longitude ?? "N/A"})`}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">To</p>
                <p className="font-medium text-card-foreground">
                  {activeRide.dropOffLocation?.address || 
                    `(${activeRide.dropOffLocation?.latitude ?? "N/A"}, ${activeRide.dropOffLocation?.longitude ?? "N/A"})`}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {activeRide.rider && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rider</p>
                  <p className="font-medium text-card-foreground">{activeRide.rider.name}</p>
                </div>
              </div>
            )}
            
            {activeRide.scheduledAt && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                  <p className="font-medium text-card-foreground">
                    {new Date(activeRide.scheduledAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
            
            {activeRide.estimatedDuration && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Est. Duration</p>
                  <p className="font-medium text-card-foreground">{activeRide.estimatedDuration} mins</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as IRideStatus)}
            >
              <SelectTrigger className="w-full bg-muted/50 border-border">
                <SelectValue placeholder="Update status" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {Object.entries(statusOptions).map(([status, { label }]) => (
                  <SelectItem key={status} value={status}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleStatusUpdate}
              disabled={isLoading || selectedStatus === activeRide.status}
              className="w-full sm:w-auto transition-all duration-200"
            >
              {isLoading ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveRideManagement;