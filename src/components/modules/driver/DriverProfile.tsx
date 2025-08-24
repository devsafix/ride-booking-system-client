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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-muted border-t-foreground rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Driver Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your driver account and vehicle information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <p className="text-sm text-muted-foreground">
              Update your personal and vehicle details
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select
                  onValueChange={handleSelectChange}
                  value={formData?.vehicleType}
                >
                  <SelectTrigger id="vehicleType">
                    <SelectValue placeholder="Select your vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="bike">Bike</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNo">Contact Number</Label>
                <Input
                  id="contactNo"
                  name="contactNo"
                  type="text"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                />
              </div>

              <Button type="submit" disabled={isUpdating} className="w-full">
                {isUpdating ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Change Password */}
        <ChangePasswordForm />
      </div>
    </div>
  );
};
