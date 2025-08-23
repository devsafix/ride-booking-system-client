import { useParams, useNavigate } from "react-router";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRideByIdQuery } from "@/redux/features/ride/ride.api";
import {
  ArrowLeft,
  DollarSign,
  Map,
  RulerIcon,
  UserCircle,
} from "lucide-react";

interface RideStatusHistory {
  status: string;
  timestamp: string;
}

const statusMap: { [key: string]: string } = {
  requested: "Requested",
  accepted: "Accepted",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  completed: "Completed",
  cancelled: "Cancelled",
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "accepted":
      return "bg-blue-500";
    case "picked_up":
      return "bg-purple-500";
    case "in_transit":
      return "bg-indigo-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

export default function RideDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetRideByIdQuery(id as string);

  const ride = data?.data;

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (isError || !ride) {
    return (
      <div className="p-6 text-center text-red-500">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>
          Ride details not found or an error occurred. Please check the ride ID.
        </p>
        <Button onClick={() => navigate("/ride-history")} className="mt-4">
          <ArrowLeft className="mr-2" /> Back to History
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-10 w-10" />
        </Button>
        <h1 className="text-3xl font-bold ml-4">Ride Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ride Information Card */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Ride #{ride?._id}</CardTitle>
            <CardDescription
              className={`font-semibold ${getStatusColor(ride.status).replace(
                "bg",
                "text"
              )}`}
            >
              Status: {statusMap[ride.status]}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Map className="text-lg text-red-500" />
              <div className="space-y-1">
                <p className="font-semibold">Pickup Location</p>
                <p className="text-sm text-gray-500">
                  {ride.pickupLocation.latitude},{" "}
                  {ride.pickupLocation.longitude}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Map className="text-lg text-green-500" />
              <div className="space-y-1">
                <p className="font-semibold">Drop-off Location</p>
                <p className="text-sm text-gray-500">
                  {ride.dropOffLocation.latitude},{" "}
                  {ride.dropOffLocation.longitude}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
              <DollarSign className="text-lg text-green-700" />
              <div className="space-y-1">
                <p className="font-semibold">Fare</p>
                <p className="text-sm text-gray-500">${ride.fare.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RulerIcon className="text-lg text-blue-500" />
              <div className="space-y-1">
                <p className="font-semibold">Distance</p>
                <p className="text-sm text-gray-500">
                  Distance estimation is a future feature.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver and Timeline Card */}
        <Card>
          <CardHeader>
            <CardTitle>Driver & Status Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {ride.driver && (
              <div className="flex items-center gap-4">
                <UserCircle className="text-4xl text-gray-400" />
                <div>
                  <h3 className="text-xl font-bold">{ride.driver.name}</h3>
                  <p className="text-sm text-gray-500">
                    {ride.driver.contactNo || ride.driver.email}
                  </p>
                </div>
              </div>
            )}
            {!ride.driver && (
              <p className="text-sm text-gray-500">
                A driver has not yet accepted this ride.
              </p>
            )}
            <Separator />
            {/* Status Timeline */}
            <div className="relative pl-6">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-gray-200" />
              {ride.statusHistory.map(
                (history: RideStatusHistory, index: number) => (
                  <div key={index} className="relative mb-4">
                    <div
                      className={`absolute -left-[14px] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full ${getStatusColor(
                        history.status
                      )}`}
                    />
                    <div className="flex flex-col pl-2">
                      <span className="font-semibold">
                        {statusMap[history.status]}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(history.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
