import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Car, BarChart3 } from "lucide-react";

const CallToAction: React.FC = () => {
  return (
    <section className="md:py-16 py-10 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of users who have already discovered the
              convenience, safety, and reliability of our platform.
            </p>
          </div>

          {/* User Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* For Riders */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Riders</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Book rides instantly, track in real-time, and enjoy safe,
                comfortable journeys.
              </p>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() =>
                  (window.location.href = "/auth/register?role=rider")
                }
              >
                Start Riding
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* For Drivers */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Drivers</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Earn money on your schedule with flexible driving opportunities
                and fair compensation.
              </p>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() =>
                  (window.location.href = "/auth/register?role=driver")
                }
              >
                Start Earning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* For Business */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Business</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Manage corporate travel with dedicated admin tools and
                comprehensive analytics.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = "/contact")}
              >
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main CTA */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Don't Wait, Start Today!
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Download our app or sign up now to experience the future of
              transportation. Your first ride is just a tap away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                onClick={() => (window.location.href = "/auth/register")}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3"
                onClick={() => (window.location.href = "/auth/login")}
              >
                Sign In
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 pt-6 border-t border-border/20">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>No Hidden Fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
