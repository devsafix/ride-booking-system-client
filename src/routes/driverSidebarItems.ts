import ActiveRideManagement from "@/components/modules/driver/ActiveRideManagement";
import AvailabilityToggle from "@/components/modules/driver/AvailabilityToggle";
import EarningsDashboard from "@/components/modules/driver/EarningsDashboard";
import IncomingRequests from "@/components/modules/driver/IncomingRequest";
import RideHistory from "@/components/modules/driver/RideHistory";
import Profile from "@/pages/Profile";
import type { ISidebarItem } from "@/types";

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Profile",
        url: "/driver/profile",
        component: Profile,
      },
    ],
  },
  {
    title: "Driver Management",
    items: [
      {
        title: "Availability Status",
        url: "/driver/availability-status",
        component: AvailabilityToggle,
      },
      {
        title: "Incoming Request",
        url: "/driver/incoming-request",
        component: IncomingRequests,
      },
      {
        title: "Active Rides",
        url: "/driver/active-rides",
        component: ActiveRideManagement,
      },
      {
        title: "Earnings",
        url: "/driver/earnings",
        component: EarningsDashboard,
      },
      {
        title: "Ride History",
        url: "/driver/ride-history",
        component: RideHistory,
      },
    ],
  },
];
