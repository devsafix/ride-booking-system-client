import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { CircleUserRound } from "lucide-react";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import Logo from "@/assets/icons/logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetMeQuery(undefined);
  const userRole = userData?.data?.role;

  const data = {
    navMain: getSidebarItems(userRole),
  };

  return (
    <Sidebar
      {...props}
      className="bg-gray-950 dark:text-white border-r border-gray-800"
    >
      <SidebarHeader className="items-center p-4 border-b border-gray-800">
        <Link to={"/"}>
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto p-4">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="dark:text-gray-400 font-semibold mb-2 uppercase text-xs tracking-wide">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((menuItem) => (
                  <SidebarMenuItem
                    key={menuItem.title}
                    className="hover:bg-gray-800 rounded-md"
                  >
                    <SidebarMenuButton asChild>
                      <Link
                        to={menuItem.url}
                        className="flex items-center gap-3 p-2 font-medium"
                      >
                        <CircleUserRound className="h-5 w-5 dark:text-gray-400" />
                        {menuItem.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {/* Footer or User Info Section */}
      <div className="p-4 border-t border-gray-800 text-sm dark:text-gray-300">
        Logged in as:{" "}
        <span className="text-black dark:text-white font-semibold capitalize">
          {userRole}
        </span>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
