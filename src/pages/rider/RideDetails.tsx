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
import { Badge } from "@/components/ui/badge";
import { useGetRideByIdQuery } from "@/redux/features/ride/ride.api";
import {
  ArrowLeft,
  DollarSign,
  Map,
  RulerIcon,
  UserCircle,
  MapPin,
  Clock,
  User,
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

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default";
    case "accepted":
      return "secondary";
    case "picked_up":
      return "secondary";
    case "in_transit":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

export default function RideDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetRideByIdQuery(id as string);

  const ride = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto px-4 py-8 max-w-7xl">
          <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <Skeleton className="h-96 w-full rounded-xl" />
              </div>
              <div className="xl:col-span-1">
                <Skeleton className="h-96 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !ride) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="mx-auto px-4 max-w-7xl">
          <Card className="border-destructive/50">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                <Map className="h-8 w-8 text-destructive" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Ride Not Found
                </h2>
                <p className="text-muted-foreground">
                  The ride details could not be retrieved. Please verify the
                  ride ID and try again.
                </p>
              </div>
              <Button
                onClick={() => navigate("/ride-history")}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Ride Details
            </h1>
            <p className="text-muted-foreground mt-1">
              Complete information about your ride
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Ride Information */}
          <Card className="xl:col-span-2 shadow-sm border-border/50">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-semibold">
                    Ride #{ride?._id?.slice(-8)}
                  </CardTitle>
                  <CardDescription className="text-base">
                    Trip details and information
                  </CardDescription>
                </div>
                <Badge
                  variant={getStatusVariant(ride.status)}
                  className="text-sm font-medium"
                >
                  {statusMap[ride.status]}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Location Details */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-muted">
                      <MapPin className="h-4 w-4 text-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-foreground">
                        Pickup Location
                      </p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {ride.pickupLocation.latitude},{" "}
                        {ride.pickupLocation.longitude}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 rounded-full bg-muted">
                        <MapPin className="h-4 w-4 text-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-foreground">
                          Drop-off Location
                        </p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {ride.dropOffLocation.latitude},{" "}
                          {ride.dropOffLocation.longitude}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Trip Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="p-2 rounded-full bg-background">
                    <DollarSign className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Fare
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      ${ride.fare.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="p-2 rounded-full bg-background">
                    <RulerIcon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Distance
                    </p>
                    <p className="text-sm text-muted-foreground">Coming soon</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver and Timeline */}
          <div className="xl:col-span-1 space-y-6">
            {/* Driver Information */}
            <Card className="shadow-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Driver Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ride.driver ? (
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-muted">
                      <UserCircle className="h-8 w-8 text-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {ride.driver.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {ride.driver.contactNo || ride.driver.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-3">
                    <div className="mx-auto p-3 rounded-full bg-muted w-fit">
                      <UserCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Waiting for driver assignment
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card className="shadow-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Status Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-6">
                  <div className="absolute left-4 top-4 bottom-4 w-px bg-border"></div>

                  {ride.statusHistory.map(
                    (history: RideStatusHistory, index: number) => (
                      <div
                        key={index}
                        className="relative flex items-start gap-4"
                      >
                        <div className="relative z-10">
                          <div
                            className={`h-3 w-3 rounded-full border-2 border-background ${getStatusColor(
                              history.status
                            )}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0 pb-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-foreground">
                              {statusMap[history.status]}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 font-mono">
                            {new Date(history.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
