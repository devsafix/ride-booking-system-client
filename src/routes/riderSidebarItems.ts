import Profile from "@/pages/Profile";
import RideRequest from "@/pages/rider/RideRequest";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const RideHistory = lazy(() => import("@/pages/rider/RideHistory"));

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Update Profile",
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
