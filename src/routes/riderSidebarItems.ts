import Profile from "@/pages/Profile";
import RideHistory from "@/pages/rider/RideHistory";
import RideRequest from "@/pages/rider/RideRequest";
import type { ISidebarItem } from "@/types";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Profile",
        url: "/rider/profile",
        component: Profile,
      },
    ],
  },
  {
    title: "Ride Management",
    items: [
      {
        title: "Ride Request",
        url: "/rider/ride-request",
        component: RideRequest,
      },
      {
        title: "Ride History",
        url: "/rider/ride-history",
        component: RideHistory,
      },
    ],
  },
];
