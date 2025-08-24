import Profile from "@/pages/Profile";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const RideOversight = lazy(() => import("@/pages/admin/RideOversight"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Update Profile",
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
        component: Analytics,
      },
      {
        title: "Ride Oversight",
        url: "/admin/ride-oversight",
        component: RideOversight,
      },
      {
        title: "User Management",
        url: "/admin/user-management",
        component: UserManagement,
      },
    ],
  },
];
