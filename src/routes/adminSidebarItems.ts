import UserManagement from "@/pages/admin/UserManagement";
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
        title: "User Management",
        url: "/admin/user-management",
        component: UserManagement,
      },
    ],
  },
];
