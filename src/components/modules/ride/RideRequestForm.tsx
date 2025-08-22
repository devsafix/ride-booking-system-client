/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { toast } from "react-hot-toast";

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRequestRideMutation } from "@/redux/features/ride/ride.api";

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
    try {
      const res = await requestRide(formData).unwrap();
      toast.success(res.message || "Ride requested successfully!");
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
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Request a Ride</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Pickup Location */}
              <div className="space-y-2">
                <Label htmlFor="pickup-lat">Pickup Location (Latitude)</Label>
                <Input
                  id="pickup-lat"
                  name="latitude"
                  type="number"
                  step="any"
                  value={formData.pickupLocation.latitude}
                  onChange={(e) => handleChange(e, "pickupLocation")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickup-lon">Pickup Location (Longitude)</Label>
                <Input
                  id="pickup-lon"
                  name="longitude"
                  type="number"
                  step="any"
                  value={formData.pickupLocation.longitude}
                  onChange={(e) => handleChange(e, "pickupLocation")}
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* Drop-off Location */}
              <div className="space-y-2">
                <Label htmlFor="dropoff-lat">
                  Drop-off Location (Latitude)
                </Label>
                <Input
                  id="dropoff-lat"
                  name="latitude"
                  type="number"
                  step="any"
                  value={formData.dropOffLocation.latitude}
                  onChange={(e) => handleChange(e, "dropOffLocation")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoff-lon">
                  Drop-off Location (Longitude)
                </Label>
                <Input
                  id="dropoff-lon"
                  name="longitude"
                  type="number"
                  step="any"
                  value={formData.dropOffLocation.longitude}
                  onChange={(e) => handleChange(e, "dropOffLocation")}
                />
              </div>
            </div>

            <div className="rounded-md border p-4 text-center text-sm text-gray-500">
              <p>
                Fare estimation and payment method selection will be available
                here once a ride is requested and a driver is found.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Requesting..." : "Request Ride"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RideRequestForm;
