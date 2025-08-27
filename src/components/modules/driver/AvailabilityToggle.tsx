/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useUpdateAvailabilityMutation } from "@/redux/features/drive/drive.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Availability Toggle Component
const AvailabilityToggle = () => {
  const { data, isLoading: isMeLoading } = useGetMeQuery(undefined);
  const [updateAvailability, { isLoading: isUpdating }] =
    useUpdateAvailabilityMutation();
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // Set initial state based on user data
  useEffect(() => {
    if (data?.data) {
      setIsAvailable(data.data.isAvailable);
    }
  }, [data]);

  // Handle dropdown value change
  const handleToggle = async (value: string) => {
    const checked = value === "online";
    setIsAvailable(checked);

    try {
      await updateAvailability({ isAvailable: checked }).unwrap();
      toast.success(`You are now ${checked ? "online" : "offline"}.`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status.");
      setIsAvailable(!checked);
    }
  };

  if (isMeLoading || isAvailable === null) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-muted border-t-foreground rounded-full animate-spin"></div>
            <span className="text-muted-foreground">
              Loading availability...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Driver Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label
                htmlFor="availability-select"
                className="text-sm font-medium"
              >
                Current Status
              </Label>
              <p className="text-sm text-muted-foreground">
                Set yourself {isAvailable ? "online" : "offline"} to receive
                ride requests
              </p>
            </div>
            <Badge
              variant={isAvailable ? "default" : "secondary"}
              className="ml-4"
            >
              {isAvailable ? "Online" : "Offline"}
            </Badge>
          </div>
          <Select
            onValueChange={handleToggle}
            value={isAvailable ? "online" : "offline"}
            disabled={isUpdating}
          >
            <SelectTrigger id="availability-select">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Go Online</SelectItem>
              <SelectItem value="offline">Go Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityToggle;
