import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Rider",
    avatar: "SJ",
    rating: 5,
    review:
      "This platform has completely changed how I commute. The drivers are professional, cars are clean, and the app is incredibly user-friendly. I feel safe every single ride.",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Driver Partner",
    avatar: "MC",
    rating: 5,
    review:
      "I've been driving for 2 years and the earning potential is great. The platform treats drivers fairly and the support team is always helpful.",
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Business Traveler",
    avatar: "ER",
    rating: 5,
    review:
      "As someone who travels frequently for work, reliability is crucial. This service never disappoints. Professional drivers, clean vehicles, and always on time.",
    location: "Chicago, IL",
  },
  {
    id: 4,
    name: "David Kumar",
    role: "Daily Commuter",
    avatar: "DK",
    rating: 4,
    review:
      "Cost-effective and convenient. The fare estimates are accurate and I love the real-time tracking feature. My go-to choice for daily work commute.",
    location: "San Francisco, CA",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Weekend User",
    avatar: "LT",
    rating: 5,
    review:
      "Perfect for weekend outings and events. The drivers know the city well and the payment process is seamless. Highly recommend to everyone.",
    location: "Miami, FL",
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "text-yellow-400 fill-current"
            : "text-muted-foreground/30"
        }`}
      />
    ));
  };

  return (
    <section className="md:py-16 py-10 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what riders and drivers have
            to say about their experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <div className="relative">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-20 shadow-lg">
              <Quote className="h-8 w-8 text-primary/30 mb-6" />

              <div className="mb-6">
                <p className="text-lg md:text-xl leading-relaxed text-foreground/90 italic">
                  "{testimonials[currentIndex].review}"
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role} •{" "}
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border-border shadow-lg hover:bg-accent"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border-border shadow-lg hover:bg-accent"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-2">4.9</div>
              <div className="text-sm text-muted-foreground">
                Average Rating
              </div>
              <div className="flex justify-center mt-2">{renderStars(5)}</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-2">25K+</div>
              <div className="text-sm text-muted-foreground">
                Happy Customers
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-muted-foreground">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
