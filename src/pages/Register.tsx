/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRegisterUserMutation } from "@/redux/features/auth/auth.api";
import {
  User,
  Mail,
  Lock,
  UserCheck,
  Loader2,
  Car,
  Users,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  role: z.enum(["rider", "driver"], {
    message: "Please select a role.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Register() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const res = await registerUser(values).unwrap();
      toast.success(res.message || "Registration successful!");
      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-stretch">
      <div className="max-w-7xl mx-auto flex w-full">
        {/* Left Section - Branding & Features */}
        <div className="hidden lg:flex flex-1 bg-muted/50 flex-col justify-between p-16">
          <div className="max-w-md">
            {/* Logo/Brand Section */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-foreground mb-6">
                <Car className="h-8 w-8 text-background" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Join Ridaa
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Connect with riders and drivers in your city. Start your journey
                with us today.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-background border border-border/50">
                  <Zap className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Quick & Easy
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Book rides or start driving in just a few taps
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-background border border-border/50">
                  <Shield className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Safe & Secure
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your safety is our priority with verified users
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-background border border-border/50">
                  <Users className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Community Driven
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Join thousands of satisfied riders and drivers
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Users
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">50K+</div>
                  <div className="text-sm text-muted-foreground">
                    Rides Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className="w-full flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
          <div className="w-full max-w-2xl">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted mb-4">
                <Car className="h-6 w-6 text-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Join RideShare
              </h2>
              <p className="text-muted-foreground mt-2">
                Create your account to get started
              </p>
            </div>

            <Card className="shadow-lg border-border/50">
              <CardHeader className="space-y-2 text-center pb-8">
                <CardTitle className="text-2xl font-bold">
                  Create Account
                </CardTitle>
                <CardDescription className="text-base">
                  Fill in your details to register
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Enter your full name"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password Field */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="password"
                                placeholder="Create a strong password"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Role Select */}
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            I want to join as
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <div className="relative">
                                <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                                <SelectTrigger className="pl-10">
                                  <SelectValue placeholder="Choose your role" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="rider">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  <span>Rider</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="driver">
                                <div className="flex items-center gap-2">
                                  <Car className="h-4 w-4" />
                                  <span>Driver</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full h-11 text-base font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-foreground hover:underline transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
