/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router";
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
import userIcon from "../../assets/images/user-icon.webp";
import { ModeToggle } from "./ModeToggler";
import { baseApi } from "@/redux/baseApi";

const navLinks = {
  unauthenticated: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  rider: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/rider", label: "Dashboard" },
  ],
  driver: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/driver", label: "Dashboard" },
  ],
  admin: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/admin", label: "Dashboard" },
  ],
};

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      dispatch(logoutAction());
      dispatch(baseApi.util.resetApiState());
      toast.success("Logged out successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Logout failed. Please try again.");
    }
  };

  // Determine which links to show based on user role
  const currentLinks = user
    ? navLinks[user.role as keyof typeof navLinks]
    : navLinks.unauthenticated;

  return (
    <header className="border-b py-2 px-4 md:px-6 sticky top-0 z-50 backdrop-blur-xl">
      <div className="flex h-16 max-w-7xl mx-auto items-center justify-between gap-4">
        {/* Left side: Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-primary hover:text-primary/90">
            <Logo />
          </Link>

          {/* Main navigation menu (desktop only) */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {currentLinks?.map((link, index) => (
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
          <ModeToggle />
          {user ? (
            // If user is logged in, show a dropdown menu
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative h-13 w-13 rounded-full">
                  <div className="flex h-13 w-13 items-center justify-center rounded-full">
                    <img src={userIcon} alt="" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
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
