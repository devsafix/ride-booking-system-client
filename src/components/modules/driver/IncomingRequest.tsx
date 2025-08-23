/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useAcceptRideMutation,
  useGetPendingRidesQuery,
  useRejectRideMutation,
} from "@/redux/features/drive/drive.api";

const IncomingRequests = () => {
  const { data, isLoading } = useGetPendingRidesQuery(undefined, {
    pollingInterval: 5000, 
  });

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

  if (isLoading) {
    return <div>Loading new requests...</div>;
  }

  if (data?.data?.length === 0) {
    return (
      <Card className="bg-mute/40 border-border p-4">
        <p>No pending ride requests at the moment.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Incoming Requests</h2>
      {data?.data?.map((ride: any) => (
        <Card key={ride._id} className="bg-mute/40 border-border shadow-md">
          <CardHeader>
            <CardTitle>{ride.rider.name}</CardTitle>
            <CardDescription className="text-gray-400">
              {`From (${ride.pickupLocation.latitude}, ${ride.pickupLocation.longitude}) 
   to (${ride.dropOffLocation.latitude}, ${ride.dropOffLocation.longitude})`}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-lg font-bold text-white">
              ${ride.fare || "N/A"}
            </p>
            <div className="space-x-2">
              <Button
                onClick={() => handleAccept(ride?._id)}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Accept
              </Button>
              <Button onClick={() => handleReject(ride?._id)} variant="outline">
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IncomingRequests;
