import Home from "@/pages/Home";
import type { ISidebarItem } from "@/types";

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Bookings",
        url: "/driver/analytics",
        component: Home,
      },
    ],
  },
];
