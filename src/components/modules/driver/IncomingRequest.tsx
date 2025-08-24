/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useAcceptRideMutation,
  useGetPendingRidesQuery,
  useRejectRideMutation,
} from "@/redux/features/drive/drive.api";
import { Bell, MapPin, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";

// Incoming Requests Component
const IncomingRequests = () => {
  const { data, isLoading } = useGetPendingRidesQuery(undefined, {
    pollingInterval: 5000,
  });

  const { data: userData } = useGetMeQuery(undefined);
  const isAvailable = userData?.data?.isAvailable;

  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();

  const handleAccept = async (rideId: string) => {
    try {
      await acceptRide(rideId).unwrap();
      toast.success("Ride accepted! Head to the pickup location.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to accept ride.");
    }
  };

  const handleReject = async (rideId: string) => {
    try {
      await rejectRide(rideId).unwrap();
      toast("Ride rejected.", { icon: "👋" });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject ride.");
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Incoming Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-muted border-t-foreground rounded-full animate-spin"></div>
            <span className="text-muted-foreground">
              Loading new requests...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data?.data || data.data.length === 0 || isAvailable === false) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Incoming Requests
            </div>
            <div onClick={handleRefresh}>
              <RefreshCw className="w-5 h-5 cursor-pointer" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {isAvailable === false
                ? "Your are offline. You need update your available status online"
                : "No pending ride requests at the moment."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Incoming Requests
          <Badge variant="secondary">{data.data.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.data.map((ride: any) => (
            <div key={ride._id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{ride.rider.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    New ride request
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${ride.fare || "N/A"}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">From:</span>
                  <span>
                    ({ride.pickupLocation.latitude},{" "}
                    {ride.pickupLocation.longitude})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">To:</span>
                  <span>
                    ({ride.dropOffLocation.latitude},{" "}
                    {ride.dropOffLocation.longitude})
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handleAccept(ride._id)}
                  className="flex-1"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleReject(ride._id)}
                  variant="outline"
                  className="flex-1"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomingRequests;
