import EarningsDashboard from "@/pages/driver/EarningsDashboard";
import RideHistory from "@/pages/driver/RideHistory";
import ManageRides from "@/pages/driver/ManageRides";
import Profile from "@/pages/Profile";
import type { ISidebarItem } from "@/types";

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Update Profile",
        url: "/driver/profile",
        component: Profile,
      },
    ],
  },
  {
    title: "Driver Management",
    items: [
      {
        title: "Manage Rides",
        url: "/driver/manage-rides",
        component: ManageRides,
      },
      {
        title: "Ride History",
        url: "/driver/ride-history",
        component: RideHistory,
      },
      {
        title: "Earnings",
        url: "/driver/earnings",
        component: EarningsDashboard,
      },
    ],
  },
];
