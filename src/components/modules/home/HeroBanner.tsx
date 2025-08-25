/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
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

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const HeroBanner: React.FC = () => {
  const { data: user, isLoading } = useGetMeQuery(undefined);
  const navigate = useNavigate();

  const driverObj = useRef(null);

  useEffect(() => {
    // Check if the user is not authenticated and has not seen the tour before
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!user && !hasSeenTour) {
      // Initialize the driver instance only once
      if (!driverObj.current) {
        driverObj.current = driver({
          showProgress: true,
          steps: [
            {
              element: "#get-started-button",
              popover: {
                title: "Get Started Here",
                description:
                  "Click here to login or create a new account and begin your journey.",
                side: "bottom",
                align: "center",
              },
            },

            {
              element: "#features-link",
              popover: {
                title: "Learn More About Our Features",
                description: "Explore what makes our platform great.",
                side: "right",
                align: "center",
              },
            },
            {
              element: "#faq-link",
              popover: {
                title: "Have Questions?",
                description: "Find answers to frequently asked questions.",
                side: "right",
                align: "center",
              },
            },
            {
              element: "#theme-toggler",
              popover: {
                title: "Toggle Dark/Light Mode",
                description:
                  "Change the website's theme for a better viewing experience.",
                side: "left",
                align: "center",
              },
            },
            {
              element: "#contact-link",
              popover: {
                title: "Contact With Us",
                description:
                  "Change the website's theme for a better viewing experience.",
                side: "left",
                align: "center",
              },
            },
          ],
        });
      }

      setTimeout(() => {
        if (driverObj.current) {
          (driverObj.current as any).drive();

          localStorage.setItem("hasSeenTour", "true");
        }
      }, 500);
    }
  }, [user]);

  const getContent = () => {
    const role = user?.data.role;
    switch (role) {
      case "admin":
        return {
          title: "Admin Dashboard Is Here",
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
          title: "Safe Drive & Earn Now",
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
          title: "Book Your Ride Now",
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
      navigate("/rider/ride-request");
    } else {
      navigate("/register");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 md:py-16 py-10">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-10">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              {content.title}
            </h1>

            {/* Subtitle */}
            <p className="text-md md:text-xl dark:text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {content.subtitle}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
              {content.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row xl:flex-col items-center lg:items-start xl:items-center space-y-2 lg:space-y-0 lg:space-x-3 xl:space-x-0 xl:space-y-2 p-3 rounded-xl border border-gray-800 hover:border-gray-600 transition"
                >
                  <feature.icon className="h-6 w-6" />
                  <span className="text-sm font-medium dark:text-muted-foreground">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mt-8">
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
                    id="get-started-button"
                    size="lg"
                    className="px-8 py-3 rounded-xl font-semibold border border-black"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://i.ibb.co.com/nqjJSf5N/riding-photo.webp"
                alt="Ride booking experience"
                className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />

              {/* Image Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Tracking</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Safe & Secure</span>
                </div>
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full border-t border-gray-800 md:mt-20 mt-12 pt-8">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-40 text-center">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm dark:text-muted-foreground">
                  Happy Riders
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">2K+</p>
                <p className="text-sm dark:text-muted-foreground">
                  Active Drivers
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-sm dark:text-muted-foreground">
                  Rides Completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
