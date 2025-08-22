/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useChangePasswordMutation,
  useUpdateUserProfileMutation,
} from "@/redux/features/auth/auth.api";
import { selectCurrentUser } from "@/redux/features/auth/auth.slice";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// A reusable component for the password change feature
const ChangePasswordForm = () => {
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

const RiderProfile = () => {
  const user = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    contactNo: user?.contactNo || "",
  });
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ id: user?._id as string, data: formData }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Rider Profile</CardTitle>
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

const DriverProfile = () => {
  const user = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    contactNo: user?.contactNo || "",
  });
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ id: user?._id as string, data: formData }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  };

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

const AdminProfile = () => {
  const user = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    contactNo: user?.contactNo || "",
  });
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ id: user?._id as string, data: formData }).unwrap();
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

const Profile = () => {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <div className="p-6">You must be logged in to view this page.</div>;
  }

  switch (user.role) {
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
