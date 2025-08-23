import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Car,
  Users,
  BarChart3,
  MapPin,
  Shield,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import Loader from "@/assets/icons/loader/Loader";

const HeroBanner: React.FC = () => {
  const { data: user, isLoading } = useGetMeQuery(undefined);
  const navigate = useNavigate();

  const getContent = () => {
    const role = user?.data.role;
    switch (role) {
      case "admin":
        return {
          title: "Admin Dashboard",
          subtitle:
            "Manage your ride booking platform with comprehensive analytics and user management tools",
          cta: "Go to Dashboard",
          features: [
            { icon: BarChart3, text: "Advanced analytics" },
            { icon: Users, text: "User management" },
            { icon: Shield, text: "Platform security" },
          ],
        };

      case "driver":
        return {
          title: "Drive & Earn",
          subtitle:
            "Start earning today with flexible driving opportunities. Your schedule, your income.",
          cta: "Start Driving",
          features: [
            { icon: Car, text: "Flexible schedule" },
            { icon: BarChart3, text: "Track earnings" },
            { icon: MapPin, text: "Optimal routes" },
          ],
        };

      case "rider":
        return {
          title: "Book Your Ride",
          subtitle:
            "Safe, reliable, and affordable rides at your fingertips. Get where you need to go.",
          cta: "Book Now",
          features: [
            { icon: MapPin, text: "Live tracking" },
            { icon: Shield, text: "Verified drivers" },
            { icon: Clock, text: "Quick booking" },
          ],
        };

      default:
        return {
          title: "Your Ride, Your Way",
          subtitle:
            "Join thousands of riders and drivers in our trusted platform. Safe, reliable, and always available.",
          cta: "Get Started",
          features: [
            { icon: MapPin, text: "Real-time tracking" },
            { icon: Shield, text: "Safe & secure" },
            { icon: Clock, text: "24/7 service" },
          ],
        };
    }
  };

  const content = getContent();

  const handleCTAClick = () => {
    const role = user?.data.role;

    if (role === "admin") {
      navigate("/admin/profile");
    } else if (role === "driver") {
      navigate("/driver/profile");
    } else if (role === "rider") {
      navigate("/rider/profile");
    } else {
      navigate("/register");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-5xl text-center space-y-10">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl dark:text-muted-foreground font-extrabold leading-tight tracking-tight">
          {content.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {content.subtitle}
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          {content.features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 p-6 rounded-xl border border-gray-800 hover:border-gray-600 transition"
            >
              <feature.icon className="h-6 w-6" />
              <span className="text-sm font-medium dark:text-muted-foreground">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button
            size="lg"
            onClick={handleCTAClick}
            className="px-8 py-3 rounded-xl font-semibold"
          >
            {content.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {!user && (
            <Link to={"/login"}>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 rounded-xl font-semibold border border-black"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 pt-8 border-t border-gray-800">
          <div>
            <p className="text-3xl font-bold">10K+</p>
            <p className="text-sm dark:text-muted-foreground">Happy Riders</p>
          </div>
          <div>
            <p className="text-3xl font-bold">2K+</p>
            <p className="text-sm dark:text-muted-foreground">Active Drivers</p>
          </div>
          <div>
            <p className="text-3xl font-bold">50K+</p>
            <p className="text-sm dark:text-muted-foreground">
              Rides Completed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
