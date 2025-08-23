import React from "react";
import { MapPin, Car, CreditCard, Star } from "lucide-react";

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: MapPin,
    title: "Set Your Destination",
    description:
      "Enter your pickup location and destination. Our smart system will calculate the best route and fare estimate.",
  },
  {
    icon: Car,
    title: "Get Matched",
    description:
      "We connect you with nearby verified drivers in seconds. See their ratings, vehicle details, and estimated arrival time.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description:
      "Pay safely through our app with multiple payment options. No cash needed, automatic receipts included.",
  },
  {
    icon: Star,
    title: "Rate & Review",
    description:
      "Share your experience to help maintain our high-quality service standards and help other users make informed choices.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="md:py-16 py-10 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting a ride has never been easier. Follow these simple steps to
            book your next journey.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-8 w-full h-0.5 bg-border -translate-y-1/2" />
                )}

                <div className="bg-card border border-border rounded-lg p-6 h-full hover:shadow-lg transition-all duration-200 hover:scale-105">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
