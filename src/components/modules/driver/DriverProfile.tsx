/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  useGetMeQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangePasswordForm } from "@/pages/Profile";

export const DriverProfile = () => {
  const { data, isLoading: isProfileLoading } = useGetMeQuery(undefined);
  const [formData, setFormData] = useState({
    name: "",
    vehicleType: "",
    contactNo: "",
  });

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.name || "",
        vehicleType: data.data.vehicleType || "",
        contactNo: data.data.contactNo || "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, vehicleType: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!data?.data?._id) {
        toast.error("User ID not found.");
        return;
      }
      await updateProfile({
        id: data.data._id,
        data: formData,
      }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  };

  if (isProfileLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Driver Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="mb-2" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="vehicleType">
                Vehicle Type
              </Label>
              <Select
                onValueChange={handleSelectChange}
                value={formData?.vehicleType}
              >
                <SelectTrigger id="vehicleType" className="w-full">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="bike">Bike</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2" htmlFor="contactNo">
                Contact Number
              </Label>
              <Input
                id="contactNo"
                name="contactNo"
                type="text"
                value={formData.contactNo}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* Assuming ChangePasswordForm is a separate component */}
      <ChangePasswordForm />
    </div>
  );
};
