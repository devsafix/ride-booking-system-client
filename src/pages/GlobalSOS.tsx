/* eslint-disable @typescript-eslint/no-explicit-any */
import SOSButton from "@/components/SOSButton";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { useGetActiveRidesQuery } from "@/redux/features/drive/drive.api";

export default function GlobalSOS() {
  const { data: me } = useGetMeQuery(undefined);
  const { data: activeRideData } = useGetActiveRidesQuery(undefined, {
    pollingInterval: 10000,
  });

  if (!me?.data || !activeRideData?.data) return null;

  const userId = me.data._id;

  // Find ride where user is rider or driver
  const activeRide = activeRideData.data.find(
    (ride: any) => ride.rider?._id === userId || ride.driver === userId
  );

  if (!activeRide) return null;

  return (
    <SOSButton
      rideStatus={activeRide.status}
      emergencyContacts={me.data.emergencyContacts || []}
    />
  );
}
