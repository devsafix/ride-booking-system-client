import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { driverSidebarItems } from "@/routes/driverSidebarItems";
import { riderSidebarItems } from "@/routes/riderSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminSidebarItems];
    case role.rider:
      return [...riderSidebarItems];
    case role.driver:
      return [...driverSidebarItems];
    default:
      return [];
  }
};
