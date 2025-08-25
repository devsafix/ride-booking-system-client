import SOSButton from "@/components/SOSButton";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { useGetActiveRidesQuery } from "@/redux/features/drive/drive.api";

export default function GlobalSOS() {
  const { data: me } = useGetMeQuery(undefined);
  const { data: activeRideData } = useGetActiveRidesQuery(undefined, {
    pollingInterval: 10000,
  });

  // if no user or no active ride -> don't show
  if (!me?.data || !activeRideData?.data) return null;

  console.log(activeRideData.data[0].status);

  const rideStatus = activeRideData.data[0].status;

  return (
    <SOSButton
      rideStatus={rideStatus}
      emergencyContacts={me.data.emergencyContacts || []}
    />
  );
}
