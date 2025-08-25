import Loader from "@/assets/icons/loader/Loader";
import SOSButton from "@/components/SOSButton";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { useGetActiveRidesQuery } from "@/redux/features/drive/drive.api";

export default function GlobalSOS() {
  const { data: me } = useGetMeQuery(undefined);
  const { data: activeRideData } = useGetActiveRidesQuery(undefined, {
    pollingInterval: 10000,
  });

  // if no user or no active ride -> don't show
  if (!me?.data || !activeRideData?.data) return <Loader />;

  const rideStatus = activeRideData?.data[0]?.status;

  return (
    <SOSButton
      rideStatus={rideStatus}
      emergencyContacts={me?.data?.emergencyContacts || []}
    />
  );
}
