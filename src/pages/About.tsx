import React from "react";
import { MapPin, Users, Shield, Award, Heart, Zap, Globe } from "lucide-react";
import PageHeader from "@/components/PageHeader";

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  avatar: string;
  expertise: string[];
}

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Johnson",
    position: "CEO & Founder",
    bio: "Former transportation industry executive with 15+ years of experience in mobility solutions and urban planning.",
    avatar: "SJ",
    expertise: ["Strategic Planning", "Urban Mobility", "Business Development"],
  },
  {
    name: "Michael Chen",
    position: "CTO",
    bio: "Tech veteran specializing in scalable platforms and real-time systems. Previously led engineering at major ride-sharing platforms.",
    avatar: "MC",
    expertise: ["System Architecture", "Mobile Development", "AI/ML"],
  },
  {
    name: "Emily Rodriguez",
    position: "Head of Operations",
    bio: "Operations expert focused on driver experience and service quality. MBA from Stanford with logistics background.",
    avatar: "ER",
    expertise: [
      "Operations Management",
      "Quality Assurance",
      "Driver Relations",
    ],
  },
  {
    name: "David Kumar",
    position: "Head of Safety",
    bio: "Former law enforcement officer dedicated to creating the safest ride-sharing experience through innovative safety protocols.",
    avatar: "DK",
    expertise: ["Safety Protocols", "Risk Management", "Emergency Response"],
  },
  {
    name: "Lisa Thompson",
    position: "Head of Marketing",
    bio: "Digital marketing strategist with expertise in growth hacking and community building in the mobility sector.",
    avatar: "LT",
    expertise: ["Digital Marketing", "Community Growth", "Brand Strategy"],
  },
  {
    name: "James Wilson",
    position: "Head of Finance",
    bio: "Financial expert with experience in fintech and mobility startups. CPA with focus on sustainable business models.",
    avatar: "JW",
    expertise: [
      "Financial Planning",
      "Investment Strategy",
      "Cost Optimization",
    ],
  },
];

const companyStats: Stat[] = [
  {
    icon: Users,
    value: "12K+",
    label: "Active Users",
  },
  {
    icon: MapPin,
    value: "50+",
    label: "Cities Served",
  },
  {
    icon: Shield,
    value: "99.9%",
    label: "Safety Rating",
  },
  {
    icon: Award,
    value: "15+",
    label: "Industry Awards",
  },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Every feature we build prioritizes the safety and security of our riders and drivers. We never compromise on safety standards.",
  },
  {
    icon: Heart,
    title: "Community Focused",
    description:
      "We're building more than a platform – we're creating a community where everyone feels valued, respected, and supported.",
  },
  {
    icon: Zap,
    title: "Innovation Driven",
    description:
      "We constantly push boundaries with cutting-edge technology to make transportation more efficient, reliable, and accessible.",
  },
  {
    icon: Globe,
    title: "Sustainable Future",
    description:
      "Committed to reducing our environmental impact through smart routing, electric vehicle initiatives, and carbon offset programs.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title=" About Our Journey"
        subTitle="We're on a mission to revolutionize transportation by connecting
          communities, empowering drivers, and making every journey safe,
          reliable, and affordable."
      />

      {/* Company Story */}
      <section className="py-10 px-4 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2020, our ride-sharing platform was born from a
                  simple belief: transportation should be accessible, safe, and
                  fair for everyone. What started as a small team of passionate
                  engineers and transportation advocates has grown into a
                  trusted platform serving thousands of users daily.
                </p>
                <p>
                  We recognized that existing solutions often overlooked the
                  needs of both riders and drivers. Our platform was designed
                  from the ground up to prioritize user experience, fair
                  compensation, and community safety.
                </p>
                <p>
                  Today, we're proud to be a driver-centric platform that puts
                  people first. Every feature we develop, every policy we
                  implement, and every partnership we form is guided by our
                  commitment to building a better transportation ecosystem.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {companyStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mission & Vision</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Driving positive change in how people move through the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide safe, reliable, and affordable transportation
                solutions that empower communities and create economic
                opportunities for drivers while delivering exceptional
                experiences for riders.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the world's most trusted mobility platform, fostering
                connected communities where transportation is seamless,
                sustainable, and accessible to everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              The passionate individuals driving our mission forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-primary">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.position}</p>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {member.bio}
                </p>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Areas of Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Milestones */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Journey So Far</h2>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-4 bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                2020
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold">Company Founded</h4>
                <p className="text-sm text-muted-foreground">
                  Started with a vision to transform urban transportation
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                2021
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold">First 1,000 Rides</h4>
                <p className="text-sm text-muted-foreground">
                  Reached our first major milestone with growing user base
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                2022
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold">Multi-City Expansion</h4>
                <p className="text-sm text-muted-foreground">
                  Expanded operations to 10+ cities with enhanced safety
                  features
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                2023
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold">Innovation Award</h4>
                <p className="text-sm text-muted-foreground">
                  Recognized for outstanding contribution to sustainable
                  transportation
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                2024
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold">50,000+ Rides Completed</h4>
                <p className="text-sm text-muted-foreground">
                  Celebrating major milestone with continued focus on safety and
                  reliability
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're always looking for passionate individuals who share our vision
            of transforming transportation. Whether you're a potential team
            member, partner, or user, we'd love to connect.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors">
              View Open Positions
            </button>
            <button className="px-8 py-3 border border-border rounded-xl font-semibold hover:bg-accent transition-colors">
              Partner With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
