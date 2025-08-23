import React, { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Users,
  Car,
  Shield,
  CreditCard,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

interface Category {
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const categories: Category[] = [
  {
    name: "General",
    icon: HelpCircle,
    color: "text-gray-600",
    bgColor: "bg-gray-50 dark:bg-gray-950/20",
  },
  {
    name: "Riders",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    name: "Drivers",
    icon: Car,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    name: "Safety",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
  },
  {
    name: "Payment",
    icon: CreditCard,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    name: "Account",
    icon: Settings,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
  },
];

const faqs: FAQ[] = [
  // General Questions
  {
    id: 1,
    question: "How does the ride booking platform work?",
    answer:
      "Our platform connects riders with verified drivers through a simple mobile app. Riders request rides by entering their pickup and destination locations, get matched with nearby drivers, track their ride in real-time, and pay securely through the app. Drivers receive ride requests, can accept or decline, and earn money by completing trips.",
    category: "General",
    tags: ["platform", "how it works", "booking", "basic"],
  },
  {
    id: 2,
    question: "What cities and areas do you serve?",
    answer:
      "We currently operate in over 50 cities across major metropolitan areas. Our service area is constantly expanding. You can check availability in your area by downloading our app and entering your location. If we're not in your city yet, you can join our waitlist to be notified when we launch.",
    category: "General",
    tags: ["cities", "coverage", "availability", "expansion"],
  },
  {
    id: 3,
    question: "What are your operating hours?",
    answer:
      "Our platform operates 24/7, 365 days a year. However, driver availability may vary by location and time of day. You'll typically find more drivers available during peak hours (7-9 AM and 5-7 PM) and in busy areas. Late-night and early morning rides are available in most cities.",
    category: "General",
    tags: ["hours", "24/7", "availability", "schedule"],
  },

  // Rider Questions
  {
    id: 4,
    question: "How do I book a ride?",
    answer:
      "Booking a ride is simple: 1) Open the app and enter your pickup location, 2) Set your destination, 3) Choose your ride type, 4) Review the estimated fare, 5) Confirm your booking. You'll be matched with a nearby driver and can track their arrival in real-time.",
    category: "Riders",
    tags: ["booking", "how to", "steps", "ride request"],
  },
  {
    id: 5,
    question: "How is the fare calculated?",
    answer:
      "Fares are calculated based on several factors: base fare, time and distance of the trip, demand in your area (surge pricing during peak times), tolls, and any applicable taxes. You'll see an estimated fare before confirming your ride, and the final amount is charged after trip completion.",
    category: "Riders",
    tags: ["fare", "pricing", "calculation", "cost"],
  },
  {
    id: 6,
    question: "Can I schedule a ride in advance?",
    answer:
      "Yes! You can schedule rides up to 30 days in advance. When booking, select 'Schedule for later' and choose your preferred pickup time. We'll automatically find a driver 15-30 minutes before your scheduled time and send you notifications about your upcoming ride.",
    category: "Riders",
    tags: ["schedule", "advance booking", "future rides", "planning"],
  },
  {
    id: 7,
    question: "What if I need to cancel my ride?",
    answer:
      "You can cancel your ride anytime before the driver arrives. Cancellations are free within 2 minutes of booking. After 2 minutes, a small cancellation fee may apply. If the driver has already arrived at your pickup location, a cancellation fee will be charged to compensate the driver for their time.",
    category: "Riders",
    tags: ["cancel", "cancellation fee", "policy", "refund"],
  },
  {
    id: 8,
    question: "Can I add multiple stops to my trip?",
    answer:
      "Yes, you can add up to 3 additional stops to your trip. When booking, tap 'Add stop' and enter the addresses. Each stop has a maximum wait time of 3 minutes. Additional time and distance charges apply for multiple stops.",
    category: "Riders",
    tags: ["multiple stops", "additional stops", "wait time", "extra charges"],
  },

  // Driver Questions
  {
    id: 9,
    question: "How do I become a driver?",
    answer:
      "To become a driver: 1) Meet basic requirements (21+ years old, valid driver's license, eligible vehicle), 2) Complete our online application, 3) Upload required documents (license, insurance, vehicle registration), 4) Pass background and vehicle inspection, 5) Complete onboarding training. The process typically takes 3-7 business days.",
    category: "Drivers",
    tags: ["become driver", "requirements", "application", "signup"],
  },
  {
    id: 10,
    question: "What are the vehicle requirements?",
    answer:
      "Vehicle requirements: 4-door car, truck, or van; model year 2010 or newer; valid registration and insurance; passes vehicle inspection; clean interior and exterior; working air conditioning and heating; all safety features functional.",
    category: "Drivers",
    tags: [
      "vehicle requirements",
      "car eligibility",
      "inspection",
      "standards",
    ],
  },
  {
    id: 11,
    question: "How much can I earn as a driver?",
    answer:
      "Driver earnings vary based on location, hours driven, and demand. You keep 80% of each fare plus 100% of tips. During high-demand periods, surge pricing can increase your earnings significantly. Most drivers earn $15-25 per hour before expenses. You can track your earnings in real-time through the driver app.",
    category: "Drivers",
    tags: ["earnings", "income", "payment", "surge", "tips"],
  },
  {
    id: 12,
    question: "When and how do I get paid?",
    answer:
      "You're paid weekly, every Tuesday, for rides completed the previous Monday through Sunday. Payments are deposited directly to your bank account or debit card. You can also cash out instantly (up to 5 times per day) for a small fee of $0.50 per transaction.",
    category: "Drivers",
    tags: ["payment", "weekly pay", "instant cash out", "deposit"],
  },
  {
    id: 13,
    question: "Can I choose which rides to accept?",
    answer:
      "Yes, you have full control over which ride requests to accept. You'll see the pickup location, destination, estimated fare, and trip duration before deciding. However, maintaining a high acceptance rate helps you receive more ride requests and may qualify you for bonus incentives.",
    category: "Drivers",
    tags: ["accept rides", "decline", "acceptance rate", "choice"],
  },

  // Safety Questions
  {
    id: 14,
    question: "How do you ensure rider and driver safety?",
    answer:
      "Safety is our top priority. We implement: comprehensive background checks for all drivers, real-time ride tracking and sharing, 24/7 emergency support, in-app emergency button, driver and rider rating systems, vehicle inspections, insurance coverage during rides, and GPS tracking of all trips.",
    category: "Safety",
    tags: ["safety", "security", "background check", "emergency"],
  },
  {
    id: 15,
    question: "What should I do in case of an emergency?",
    answer:
      "In case of emergency: 1) Use the emergency button in the app to call 911 immediately, 2) Share your live location with emergency contacts, 3) Contact our 24/7 safety team through the app, 4) If possible, share trip details with trusted contacts. Our safety team will assist with the situation and coordinate with local authorities if needed.",
    category: "Safety",
    tags: ["emergency", "911", "safety button", "help"],
  },
  {
    id: 16,
    question: "How do you verify drivers?",
    answer:
      "All drivers undergo: multi-state criminal background check, driving record review, Social Security number verification, identity verification, vehicle inspection, insurance verification, and ongoing monitoring. We also check for any disqualifying criminal offenses or driving violations.",
    category: "Safety",
    tags: [
      "driver verification",
      "background check",
      "screening",
      "validation",
    ],
  },

  // Payment Questions
  {
    id: 17,
    question: "What payment methods do you accept?",
    answer:
      "We accept: credit cards (Visa, MasterCard, American Express, Discover), debit cards, PayPal, Apple Pay, Google Pay, and cash (in select cities). You can add multiple payment methods to your account and choose your preferred option for each ride.",
    category: "Payment",
    tags: ["payment methods", "credit card", "cash", "digital wallet"],
  },
  {
    id: 18,
    question: "When am I charged for my ride?",
    answer:
      "You're charged immediately after your ride is completed. For scheduled rides, we may pre-authorize your payment method, but the actual charge occurs after trip completion. You'll receive an email receipt within minutes of completing your ride.",
    category: "Payment",
    tags: ["when charged", "billing", "receipt", "completion"],
  },
  {
    id: 19,
    question: "Can I add a tip for my driver?",
    answer:
      "Yes! You can tip your driver through the app after completing your ride. Tip options include preset amounts (15%, 20%, 25%) or custom amounts. You can also tip in cash. 100% of tips go directly to your driver, and tips can be added up to 30 days after your ride.",
    category: "Payment",
    tags: ["tip", "gratuity", "driver tip", "custom amount"],
  },

  // Account Questions
  {
    id: 20,
    question: "How do I create an account?",
    answer:
      "Creating an account is easy: 1) Download our app, 2) Enter your phone number, 3) Verify with SMS code, 4) Add your name and email, 5) Set up a payment method, 6) Add a profile photo (optional). You can also sign up using Google or Facebook for faster registration.",
    category: "Account",
    tags: ["create account", "signup", "registration", "profile"],
  },
  {
    id: 21,
    question: "How do I update my profile information?",
    answer:
      "To update your profile: go to Settings in the app menu, select 'Account', and edit your information (name, email, phone number, payment methods). Some changes may require verification. Profile photos can be updated anytime, and you can manage multiple payment methods.",
    category: "Account",
    tags: ["update profile", "edit info", "settings", "change details"],
  },
  {
    id: 22,
    question: "How do I delete my account?",
    answer:
      "To delete your account: go to Settings > Account > Delete Account. You'll need to complete any outstanding rides first. Account deletion is permanent and removes all your ride history, payment methods, and personal data. You can also temporarily deactivate your account if you prefer.",
    category: "Account",
    tags: ["delete account", "deactivate", "remove", "permanent"],
  },
];

export default function Faq() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || faq.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Group FAQs by category for display
  const groupedFAQs = useMemo(() => {
    const groups: { [key: string]: FAQ[] } = {};
    filteredFAQs.forEach((faq) => {
      if (!groups[faq.category]) {
        groups[faq.category] = [];
      }
      groups[faq.category].push(faq);
    });
    return groups;
  }, [filteredFAQs]);

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getCategoryInfo = (categoryName: string) => {
    return categories.find((cat) => cat.name === categoryName) || categories[0];
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Frequently Asked Questions"
        subTitle="Find answers to common questions about our ride booking platform"
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for questions, keywords, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              All Categories ({faqs.length})
            </button>
            {categories.map((category) => {
              const count = faqs.filter(
                (faq) => faq.category === category.name
              ).length;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === category.name
                      ? `${category.bgColor} ${category.color}`
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  {category.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6 text-sm text-muted-foreground">
            Found {filteredFAQs.length} result
            {filteredFAQs.length !== 1 ? "s" : ""} for "{searchQuery}"
          </div>
        )}

        {/* FAQ Items */}
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No questions found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse different categories.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedFAQs).map(([categoryName, categoryFAQs]) => {
              const categoryInfo = getCategoryInfo(categoryName);
              return (
                <div key={categoryName}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${categoryInfo.bgColor}`}
                    >
                      <categoryInfo.icon
                        className={`h-4 w-4 ${categoryInfo.color}`}
                      />
                    </div>
                    <h2 className="text-xl font-semibold">{categoryName}</h2>
                    <span className="text-sm text-muted-foreground">
                      ({categoryFAQs.length})
                    </span>
                  </div>

                  {/* FAQ Items */}
                  <div className="space-y-3 mb-8">
                    {categoryFAQs.map((faq) => (
                      <div
                        key={faq.id}
                        className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
                      >
                        <button
                          onClick={() => toggleExpanded(faq.id)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                        >
                          <h3 className="font-medium pr-4">{faq.question}</h3>
                          {expandedItems.has(faq.id) ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                          )}
                        </button>

                        {expandedItems.has(faq.id) && (
                          <div className="px-6 pb-4 border-t border-border/50">
                            <div className="pt-4">
                              <p className="text-muted-foreground leading-relaxed mb-4">
                                {faq.answer}
                              </p>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2">
                                {faq.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Still Need Help */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 text-center border border-primary/20">
          <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-4">Still Need Help?</h3>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Our support team is here
            to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={"/contact"}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
