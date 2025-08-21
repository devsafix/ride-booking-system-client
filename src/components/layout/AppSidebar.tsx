import {
  CreditCardIcon,
  HomeIcon,
  MessageSquareIcon,
  UserIcon,
  HistoryIcon,
  LineChartIcon,
  CarIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { SidebarContent } from "@/components/ui/sidebar";
import Logo from "@/assets/icons/logo";
import { selectCurrentUser } from "@/redux/features/auth/auth.slice";

// Define a type for your navigation links
interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

// Map of links for each user role
const navLinks: { [key: string]: NavLink[] } = {
  rider: [
    { href: "/rider/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/rider/book-ride", label: "Book a Ride", icon: CarIcon },
    { href: "/rider/history", label: "Ride History", icon: HistoryIcon },
    { href: "/rider/payments", label: "Payments", icon: CreditCardIcon },
    { href: "/rider/profile", label: "Profile", icon: UserIcon },
  ],
  driver: [
    { href: "/driver/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/driver/trips", label: "My Trips", icon: CarIcon },
    { href: "/driver/earnings", label: "Earnings", icon: LineChartIcon },
    { href: "/driver/messages", label: "Messages", icon: MessageSquareIcon },
    { href: "/driver/profile", label: "Profile", icon: UserIcon },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/admin/users", label: "Manage Users", icon: UserIcon },
    { href: "/admin/analytics", label: "Analytics", icon: LineChartIcon },
    { href: "/admin/rides", label: "Manage Rides", icon: CarIcon },
  ],
};

export function AppSidebar() {
  const user = useSelector(selectCurrentUser);
  const links = user ? navLinks[user.role] : [];

  return (
    <SidebarContent className="flex flex-col">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <Link to="/" className="text-primary hover:text-primary/90">
          <Logo />
        </Link>
      </div>
      <div className="p-2 space-y-1">
        {links.map((link) => (
          <Button
            key={link.href}
            variant="ghost"
            asChild
            className="w-full justify-start text-base"
          >
            <Link to={link.href}>
              <link.icon className="mr-2 h-4 w-4" />
              {link.label}
            </Link>
          </Button>
        ))}
      </div>
    </SidebarContent>
  );
}
