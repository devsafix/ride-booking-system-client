import RideRequest from "@/pages/rider/RideRequest";
import type { ISidebarItem } from "@/types";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Ride Management",
    items: [
      {
        title: "Ride Request",
        url: "/rider/ride-request",
        component: RideRequest,
      },
    ],
  },
];
