/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRequestRideMutation } from "@/redux/features/ride/ride.api";
import { MapPin, Navigation, Loader2, Car, Route } from "lucide-react";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationData {
  latitude: number;
  longitude: number;
}

interface FormState {
  pickupLocation: LocationData;
  dropOffLocation: LocationData;
}

const RideRequestForm = () => {
  const [formData, setFormData] = useState<FormState>({
    pickupLocation: { latitude: 0, longitude: 0 },
    dropOffLocation: { latitude: 0, longitude: 0 },
  });
  const [requestRide, { isLoading }] = useRequestRideMutation();

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    locationType: "pickupLocation" | "dropOffLocation"
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [locationType]: {
        ...prev[locationType],
        [name]: parseFloat(value),
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Check if all coordinates are filled
    if (
      formData.pickupLocation.latitude === 0 ||
      formData.pickupLocation.longitude === 0 ||
      formData.dropOffLocation.latitude === 0 ||
      formData.dropOffLocation.longitude === 0
    ) {
      toast.error("Please fill all location fields before requesting a ride.");
      return;
    }

    try {
      const res = await requestRide(formData).unwrap();
      toast.success(res.message || "Ride requested successfully!");
      navigate("/rider/ride-history");
      setFormData({
        pickupLocation: { latitude: 0, longitude: 0 },
        dropOffLocation: { latitude: 0, longitude: 0 },
      });
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to request ride. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto">
        <div>
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Request a Ride
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter your pickup and destination coordinates to book your ride
            </p>
          </div>

          <Card className="shadow-lg border-border/50">
            <CardHeader className="space-y-2 pb-8 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Route className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">
                    Trip Details
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    Your payment will calculate auto with fare
                  </CardDescription>
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bkash">Bkash</SelectItem>
                  <SelectItem value="nagad">Nagad</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>

            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Pickup Location Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30">
                      <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Pickup Location
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Where should we pick you up?
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
                    <div className="space-y-2">
                      <Label
                        htmlFor="pickup-lat"
                        className="text-sm font-medium"
                      >
                        Latitude
                      </Label>
                      <Input
                        id="pickup-lat"
                        name="latitude"
                        type="number"
                        step="any"
                        placeholder="e.g., 40.7128"
                        className="font-mono"
                        value={formData.pickupLocation.latitude}
                        onChange={(e) => handleChange(e, "pickupLocation")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="pickup-lon"
                        className="text-sm font-medium"
                      >
                        Longitude
                      </Label>
                      <Input
                        id="pickup-lon"
                        name="longitude"
                        type="number"
                        step="any"
                        placeholder="e.g., -74.0060"
                        className="font-mono"
                        value={formData.pickupLocation.longitude}
                        onChange={(e) => handleChange(e, "pickupLocation")}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Drop-off Location Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-rose-50 dark:bg-rose-950/30">
                      <Navigation className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Destination
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Where are you heading?
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
                    <div className="space-y-2">
                      <Label
                        htmlFor="dropoff-lat"
                        className="text-sm font-medium"
                      >
                        Latitude
                      </Label>
                      <Input
                        id="dropoff-lat"
                        name="latitude"
                        type="number"
                        step="any"
                        placeholder="e.g., 40.7589"
                        className="font-mono"
                        value={formData.dropOffLocation.latitude}
                        onChange={(e) => handleChange(e, "dropOffLocation")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="dropoff-lon"
                        className="text-sm font-medium"
                      >
                        Longitude
                      </Label>
                      <Input
                        id="dropoff-lon"
                        name="longitude"
                        type="number"
                        step="any"
                        placeholder="e.g., -73.9851"
                        className="font-mono"
                        value={formData.dropOffLocation.longitude}
                        onChange={(e) => handleChange(e, "dropOffLocation")}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Requesting Ride...
                      </>
                    ) : (
                      <>
                        <Car className="mr-2 h-5 w-5" />
                        Request Ride
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Need help finding coordinates? Use a mapping service to get
              precise location data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideRequestForm;
