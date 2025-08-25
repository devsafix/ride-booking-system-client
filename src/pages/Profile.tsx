/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useChangePasswordMutation,
  useGetMeQuery,
} from "@/redux/features/auth/auth.api";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { RiderProfile } from "@/components/modules/rider/RiderProfile";
import { DriverProfile } from "@/components/modules/driver/DriverProfile";
import { AdminProfile } from "@/components/modules/admin/AdminProfile";
import Loader from "@/assets/icons/loader/Loader";

export const ChangePasswordForm = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }
    try {
      await changePassword(passwords).unwrap();
      toast.success("Password changed successfully!");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <p className="text-sm text-muted-foreground">
          Update your account password for better security
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Current Password</Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              value={passwords.oldPassword}
              onChange={handleChange}
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={handleChange}
              placeholder="Enter new password (min. 8 characters)"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Main Profile Component
const Profile = () => {
  const { data, isLoading } = useGetMeQuery(undefined);

  if (isLoading) {
    <Loader />;
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground">
                You must be logged in to view this page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  switch (data?.data?.role) {
    case "rider":
      return <RiderProfile />;
    case "driver":
      return <DriverProfile />;
    case "admin":
      return <AdminProfile />;
    default:
      return (
        <div className="flex justify-center items-center min-h-screen">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground">Unsupported user role.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
  }
};

export default Profile;
