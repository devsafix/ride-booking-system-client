import PageHeader from "@/components/PageHeader";
import {
  MapPin,
  Shield,
  Clock,
  Star,
  Users,
  Car,
  BarChart3,
  Settings,
  CreditCard,
  Bell,
  Route,
  Zap,
  MessageCircle,
  Navigation,
  Smartphone,
  AlertCircle,
  TrendingUp,
  Filter,
  Search,
  UserCheck,
} from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  benefits: string[];
}

interface FeatureCategory {
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  features: Feature[];
}

const featureCategories: FeatureCategory[] = [
  {
    title: "Rider Features",
    subtitle: "Everything you need for a perfect ride experience",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    features: [
      {
        icon: MapPin,
        title: "Smart Ride Booking",
        description:
          "Effortless pickup and destination selection with intelligent address suggestions",
        benefits: [
          "Auto-complete address suggestions",
          "Saved location shortcuts",
          "Real-time fare estimation",
          "Multiple stop support",
        ],
      },
      {
        icon: Navigation,
        title: "Live Ride Tracking",
        description:
          "Real-time GPS tracking with detailed driver information and ETA updates",
        benefits: [
          "Live driver location on map",
          "Accurate arrival predictions",
          "Driver details and rating",
          "Share trip with contacts",
        ],
      },
      {
        icon: Clock,
        title: "Comprehensive Ride History",
        description:
          "Complete record of all your rides with advanced search and filtering",
        benefits: [
          "Paginated ride history",
          "Search by date/destination",
          "Fare range filtering",
          "Download trip receipts",
        ],
      },
      {
        icon: Route,
        title: "Detailed Ride Timeline",
        description:
          "Step-by-step journey tracking with timestamps and route visualization",
        benefits: [
          "Interactive route maps",
          "Pickup/dropoff timestamps",
          "Driver information display",
          "Real-time status updates",
        ],
      },
      {
        icon: CreditCard,
        title: "Flexible Payment Options",
        description: "Multiple secure payment methods with transparent pricing",
        benefits: [
          "Credit/debit card support",
          "Digital wallet integration",
          "Cash payment option",
          "Automatic receipt generation",
        ],
      },
      {
        icon: AlertCircle,
        title: "Emergency SOS System",
        description:
          "Advanced safety features with emergency contacts and location sharing",
        benefits: [
          "One-tap emergency calling",
          "Live location sharing",
          "Pre-set emergency contacts",
          "Automatic safety notifications",
        ],
      },
    ],
  },
  {
    title: "Driver Features",
    subtitle: "Professional tools to maximize your earning potential",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    features: [
      {
        icon: Zap,
        title: "Smart Availability Control",
        description:
          "Easy online/offline toggle with intelligent ride request management",
        benefits: [
          "One-tap online/offline switch",
          "Custom availability hours",
          "Break mode functionality",
          "Automatic offline scheduling",
        ],
      },
      {
        icon: Bell,
        title: "Intelligent Ride Requests",
        description:
          "Advanced request system with detailed trip information before acceptance",
        benefits: [
          "Detailed pickup/destination info",
          "Fare amount preview",
          "Estimated trip duration",
          "Accept/reject with reasons",
        ],
      },
      {
        icon: Settings,
        title: "Active Ride Management",
        description: "Complete control over ride status with real-time updates",
        benefits: [
          "Status progression tracking",
          "Customer communication tools",
          "Navigation integration",
          "Trip completion confirmation",
        ],
      },
      {
        icon: TrendingUp,
        title: "Advanced Earnings Dashboard",
        description:
          "Comprehensive financial overview with detailed analytics and insights",
        benefits: [
          "Daily/weekly/monthly breakdown",
          "Interactive charts and graphs",
          "Trip-by-trip earnings detail",
          "Tax document generation",
        ],
      },
      {
        icon: Car,
        title: "Vehicle Profile Management",
        description:
          "Complete vehicle information system with documentation tracking",
        benefits: [
          "Vehicle details and photos",
          "Insurance document upload",
          "Maintenance reminders",
          "Inspection status tracking",
        ],
      },
      {
        icon: Star,
        title: "Performance Analytics",
        description:
          "Detailed insights into your driving performance and customer satisfaction",
        benefits: [
          "Rating and review analysis",
          "Trip completion statistics",
          "Customer feedback insights",
          "Performance improvement tips",
        ],
      },
    ],
  },
  {
    title: "Admin Features",
    subtitle: "Powerful management tools for platform oversight and growth",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    features: [
      {
        icon: Users,
        title: "Comprehensive User Management",
        description:
          "Complete control over rider and driver accounts with advanced filtering",
        benefits: [
          "User search and filtering",
          "Account status management",
          "Bulk operations support",
          "User verification tools",
        ],
      },
      {
        icon: UserCheck,
        title: "Driver Approval System",
        description:
          "Streamlined driver onboarding with document verification and background checks",
        benefits: [
          "Document review workflow",
          "Background check integration",
          "Approval/rejection tracking",
          "Communication templates",
        ],
      },
      {
        icon: BarChart3,
        title: "Advanced Analytics Dashboard",
        description:
          "Real-time platform insights with customizable reports and data visualization",
        benefits: [
          "Revenue trend analysis",
          "User growth metrics",
          "Driver performance insights",
          "Custom report generation",
        ],
      },
      {
        icon: Search,
        title: "Intelligent Ride Oversight",
        description:
          "Complete ride monitoring system with advanced search and filtering capabilities",
        benefits: [
          "Real-time ride monitoring",
          "Multi-parameter filtering",
          "Dispute resolution tools",
          "Quality assurance metrics",
        ],
      },
      {
        icon: Filter,
        title: "Advanced Search & Filtering",
        description:
          "Powerful search tools across all platform data with custom filter combinations",
        benefits: [
          "Multi-field search capability",
          "Date range filtering",
          "Status-based filtering",
          "Export filtered results",
        ],
      },
      {
        icon: Shield,
        title: "Security & Compliance",
        description:
          "Comprehensive security management with audit trails and compliance reporting",
        benefits: [
          "Activity audit logs",
          "Compliance reporting",
          "Security alert system",
          "Data protection tools",
        ],
      },
    ],
  },
];

const platformFeatures = [
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "Bank-level encryption and security protocols protect all user data and transactions.",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Compatibility",
    description:
      "Seamless experience across iOS, Android, and web platforms with real-time synchronization.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Round-the-clock service with dedicated support team and automated systems.",
  },
  {
    icon: MessageCircle,
    title: "Real-Time Communication",
    description:
      "In-app messaging, notifications, and communication tools for all user types.",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Built for Everyone"
        subTitle="Our comprehensive platform delivers tailored experiences for every
              user type, ensuring optimal functionality and satisfaction across
              all touch points."
      />

      {/* Platform Overview */}
      <section className="pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      {featureCategories.map((category, categoryIndex) => (
        <section
          key={categoryIndex}
          className={`py-16 px-4 ${
            categoryIndex % 2 === 1 ? "bg-muted/30" : ""
          }`}
        >
          <div className="max-w-6xl mx-auto">
            {/* Category Header */}
            <div className="text-center mb-12">
              <div
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${category.bgColor} ${category.color} mb-4`}
              >
                {category.title}
              </div>
              <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {category.subtitle}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1 h-1 bg-primary rounded-full mt-2 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Technical Specifications */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technical Excellence</h2>
            <p className="text-lg text-muted-foreground">
              Built with cutting-edge technology for optimal performance and
              reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Performance & Reliability
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 shrink-0" />
                  <span>99.9% uptime guarantee with redundant systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 shrink-0" />
                  <span>Sub-second response times for critical operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 shrink-0" />
                  <span>Auto-scaling infrastructure for peak demand</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 shrink-0" />
                  <span>
                    Real-time data synchronization across all platforms
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Security & Privacy</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 shrink-0" />
                  <span>End-to-end encryption for all sensitive data</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 shrink-0" />
                  <span>GDPR and CCPA compliant data handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 shrink-0" />
                  <span>Multi-factor authentication support</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 shrink-0" />
                  <span>Regular security audits and penetration testing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
