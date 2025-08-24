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
import { MapPin, Navigation, User, Calendar, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";

// Define status options with corresponding colors
const statusOptions = {
  accepted: { label: "Accepted", variant: "secondary" as const },
  picked_up: { label: "Picked Up", variant: "secondary" as const },
  in_transit: { label: "In Transit", variant: "secondary" as const },
  completed: { label: "Completed", variant: "default" as const },
};

// Active Ride Management Component
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

    console.log(selectedStatus);
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Active Ride
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-muted border-t-foreground rounded-full animate-spin"></div>
            <span className="text-muted-foreground">
              Loading active rides...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!activeRide) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Active Ride
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Navigation className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              No active rides at the moment.
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Accept a ride request to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Active Ride with {activeRide.rider?.name || "Passenger"}
          </CardTitle>
          <Badge
            variant={
              statusOptions[activeRide.status as keyof typeof statusOptions]
                ?.variant || "secondary"
            }
          >
            {statusOptions[activeRide.status as keyof typeof statusOptions]
              ?.label || activeRide.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pickup Location
                </p>
                <p className="font-medium">
                  {activeRide.pickupLocation?.address ||
                    `(${activeRide.pickupLocation?.latitude ?? "N/A"}, ${
                      activeRide.pickupLocation?.longitude ?? "N/A"
                    })`}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Drop-off Location
                </p>
                <p className="font-medium">
                  {activeRide.dropOffLocation?.address ||
                    `(${activeRide.dropOffLocation?.latitude ?? "N/A"}, ${
                      activeRide.dropOffLocation?.longitude ?? "N/A"
                    })`}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {activeRide.rider && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Rider
                  </p>
                  <p className="font-medium">{activeRide.rider.name}</p>
                </div>
              </div>
            )}

            {activeRide.scheduledAt && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Scheduled
                  </p>
                  <p className="font-medium">
                    {new Date(activeRide.scheduledAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {activeRide.estimatedDuration && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Est. Duration
                  </p>
                  <p className="font-medium">
                    {activeRide.estimatedDuration} mins
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t space-y-4">
          <div>
            <Label className="text-sm font-medium">Update Ride Status</Label>
            <p className="text-sm text-muted-foreground">
              Change the current status of this ride
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as IRideStatus)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Update status" />
              </SelectTrigger>
              <SelectContent>
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
              className="sm:w-auto"
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
