/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangePasswordForm } from "@/pages/Profile";
import React, { useState } from "react";
import {
  useGetMeQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AdminProfile = () => {
  const { data } = useGetMeQuery(undefined);
  const [formData, setFormData] = useState({
    name: data?.data.name || "",
    email: data?.data.email || "",
    contactNo: data?.data.contactNo || "",
  });
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        id: data?.data._id as string,
        data: formData,
      }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
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
              <Label className="mb-2" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                disabled
              />
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ChangePasswordForm />
    </div>
  );
};
