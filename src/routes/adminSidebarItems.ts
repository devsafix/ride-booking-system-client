import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Profile",
        url: "/admin/profile",
        component: Profile,
      },
    ],
  },
  {
    title: "Admin Management",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Home,
      },
    ],
  },
];
