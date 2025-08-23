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

    console.log(checked);

    try {
      await updateAvailability({ isAvailable: checked }).unwrap();
      toast.success(`You are now ${checked ? "online" : "offline"}.`);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to update status.");
      setIsAvailable(!checked);
    }
  };

  if (isMeLoading || isAvailable === null) {
    return (
      <div className="flex items-center space-x-2 p-4 border rounded-lg bg-slate-800 border-slate-700 text-slate-300">
        Loading availability...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start space-y-2 p-4 border rounded-lg bg-slate-800 border-slate-700">
      <Label
        htmlFor="availability-select"
        className="text-white text-sm font-semibold"
      >
        Set Availability
      </Label>
      <Select
        onValueChange={handleToggle}
        value={isAvailable ? "online" : "offline"}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-[180px] text-slate-300 bg-slate-700 border-slate-600">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 text-slate-300 border-slate-700">
          <SelectItem value="online">Online</SelectItem>
          <SelectItem value="offline">Offline</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AvailabilityToggle;
