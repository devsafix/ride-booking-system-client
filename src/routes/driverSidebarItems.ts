import Home from "@/pages/Home";
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
        title: "Bookings",
        url: "/driver/analytics",
        component: Home,
      },
    ],
  },
];
