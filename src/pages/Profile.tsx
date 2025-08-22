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

// A reusable component for the password change feature
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
    <Card className="w-full max-w-lg mt-6">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="mb-2" htmlFor="oldPassword">
              Current Password
            </Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              value={passwords.oldPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="newPassword">
              New Password
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const Profile = () => {
  const { data, isLoading } = useGetMeQuery(undefined);

  if (isLoading) {
    return <div className="p-6">Loading....</div>;
  }

  if (!data) {
    return <div className="p-6">You must be logged in to view this page.</div>;
  }

  switch (data?.data?.role) {
    case "rider":
      return <RiderProfile />;
    case "driver":
      return <DriverProfile />;
    case "admin":
      return <AdminProfile />;
    default:
      return <div className="p-6">Unsupported user role.</div>;
  }
};

export default Profile;
