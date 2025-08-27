import SOSButton from "@/components/SOSButton";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { useGetActiveRidesQuery } from "@/redux/features/drive/drive.api";

export default function GlobalSOS() {
  const { data: me } = useGetMeQuery(undefined);
  const { data: activeRideData } = useGetActiveRidesQuery(undefined, {
    pollingInterval: 10000,
  });

  if (!me?.data || !activeRideData?.data) return null;

  const userId = me?.data._id;
  const activeRide = activeRideData?.data[0];
  const rideStatus = activeRide?.status;

  // Check if logged-in user is either the rider or driver
  const isAuthorized =
    activeRide?.rider?._id === userId || activeRide?.driver === userId;

  if (!isAuthorized) return null;

  return (
    <SOSButton
      rideStatus={rideStatus}
      emergencyContacts={me?.data?.emergencyContacts || []}
    />
  );
}
