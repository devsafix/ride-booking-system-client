/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useLogoutUserMutation } from "@/redux/features/auth/auth.api";
import {
  logout as logoutAction,
  selectCurrentUser,
} from "@/redux/features/auth/auth.slice";
import Logo from "@/assets/icons/logo";

const navLinks = {
  unauthenticated: [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
  ],
  rider: [
    { href: "/", label: "Home" },
    { href: "/rider/dashboard", label: "Dashboard" },
    { href: "/rider/book-ride", label: "Book a Ride" },
    { href: "/rider/history", label: "Ride History" },
  ],
  driver: [
    { href: "/", label: "Home" },
    { href: "/driver/dashboard", label: "Dashboard" },
    { href: "/driver/trips", label: "My Trips" },
    { href: "/driver/earnings", label: "Earnings" },
  ],
  admin: [
    { href: "/", label: "Home" },
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/users", label: "Manage Users" },
    { href: "/admin/analytics", label: "Analytics" },
  ],
};

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      dispatch(logoutAction());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message || "Logout failed. Please try again.");
    }
  };

  // Determine which links to show based on user role
  const currentLinks = user
    ? navLinks[user.role as keyof typeof navLinks]
    : navLinks.unauthenticated;

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side: Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-primary hover:text-primary/90">
            <Logo />
          </Link>

          {/* Main navigation menu (desktop only) */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {currentLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.href}
                      className={cn(
                        "text-muted-foreground hover:text-primary py-1.5 font-medium",
                        "text-sm"
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side: Auth buttons or User dropdown */}
        <div className="flex items-center gap-2">
          {user ? (
            // If user is logged in, show a dropdown menu
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // If user is not logged in, show login/register buttons
            <>
              <Button asChild variant="ghost" size="sm" className="text-sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
