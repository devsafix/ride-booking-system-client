import React from "react";
import { Shield, Clock, DollarSign, MapPin, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "All drivers are verified with background checks. Real-time ride tracking and 24/7 emergency support.",
  },
  {
    icon: Clock,
    title: "Always Available",
    description:
      "Book rides anytime, anywhere. Our drivers operate 24/7 to ensure you're never stranded.",
  },
  {
    icon: DollarSign,
    title: "Fair Pricing",
    description:
      "Transparent pricing with no hidden fees. Multiple payment options with automatic fare calculation.",
  },
  {
    icon: MapPin,
    title: "Real-time Tracking",
    description:
      "Track your driver's location in real-time. Share your trip details with friends and family.",
  },
  {
    icon: Users,
    title: "Trusted Community",
    description:
      "Join a community of verified riders and drivers. Rate and review system ensures quality service.",
  },
  {
    icon: Zap,
    title: "Quick Booking",
    description:
      "Book a ride in under 30 seconds. Smart matching algorithm connects you with nearby drivers instantly.",
  },
];

const ServiceHighlights: React.FC = () => {
  return (
    <section className="md:py-16 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with our premium ride booking service
            designed for your comfort and convenience.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="mb-4">
                  <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center mb-4 transition-colors duration-200">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Experience the Future of Transportation?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Join thousands of satisfied customers who trust our platform for
                their daily commute and special journeys.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={"/register"}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started Today
                  </Button>
                </Link>
                <Link to={"/features"}>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
