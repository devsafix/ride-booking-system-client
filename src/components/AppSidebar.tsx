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
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import Logo from "@/assets/icons/logo";
import { User, ChevronRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetMeQuery(undefined);
  const userRole = userData?.data?.role;

  const data = {
    navMain: getSidebarItems(userRole),
  };

  return (
    <Sidebar {...props} className="bg-background border-r border-border">
      {/* Elegant Header with Logo */}
      <SidebarHeader className="border-b border-border p-6">
        <Link to="/" className="flex items-center justify-center">
          <div className="relative p-3 rounded-2xl">
            <Logo />
          </div>
        </Link>
        <Link
          to="/"
          className="text-center mt-3 border border-foreground flex items-center gap-2 justify-center"
        >
          <ArrowLeft className="h-5 w-5" />
          <h2 className="text-sm font-bold text-foreground tracking-wide">
            BACK HOME
          </h2>
        </Link>
      </SidebarHeader>

      {/* Stylish Navigation Content */}
      <SidebarContent className="flex-1 overflow-y-auto py-8 bg-gradient-to-b from-background via-background to-muted/10">
        <div className="space-y-6 px-4">
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title} className="space-y-4">
              <SidebarGroupLabel className="px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                {item.title}
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {item.items.map((menuItem) => (
                    <SidebarMenuItem key={menuItem.title}>
                      <SidebarMenuButton
                        asChild
                        className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-muted hover:shadow-sm data-[state=open]:bg-muted/80 data-[state=open]:shadow-sm"
                      >
                        <Link
                          to={menuItem.url}
                          className="flex items-center justify-between p-4 w-full font-medium text-foreground/70 hover:text-foreground transition-all duration-200"
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <span className="truncate text-sm">
                              {menuItem.title}
                            </span>
                          </div>

                          <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />

                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>

      {/* Attractive User Profile Footer */}
      <div className="border-t border-border bg-gradient-to-r from-muted/20 to-muted/10 p-4">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
          {/* User Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-muted to-muted/50 border-2 border-background shadow-sm flex items-center justify-center">
              <User className="h-5 w-5 text-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background flex items-center justify-center animate-pulse"></div>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-bold text-foreground truncate">
                {userData?.data?.name || "User"}
              </p>
              <Badge
                variant="secondary"
                className="text-xs px-2 py-0.5 font-semibold rounded-md bg-muted/80 text-foreground"
              >
                {userRole}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {userData?.data?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      <SidebarRail />
    </Sidebar>
  );
}
