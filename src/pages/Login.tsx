/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useLoginUserMutation } from "@/redux/features/auth/auth.api";
import { setCredentials } from "@/redux/features/auth/auth.slice";
import {
  Mail,
  Lock,
  Loader2,
  Car,
  ArrowRight,
  Shield,
  Clock,
  MapPin,
  CheckCircle,
} from "lucide-react";

// Zod schema for form validation
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const res = await loginUser(values).unwrap();
      dispatch(
        setCredentials({ user: res.data.user, token: res.data.accessToken })
      );
      toast.success(res.message || "Login successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Login failed. Please check your credentials."
      );
      if (error?.data?.message === "The user has been blocked") {
        navigate("/account-status");
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-stretch">
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
                Welcome Back
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Sign in to your account and continue your journey with us.
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-background border border-border/50">
                  <Clock className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    24/7 Available
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Book rides anytime, anywhere in your city
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-background border border-border/50">
                  <Shield className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Secure & Reliable
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your data is protected with industry-standard security
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-background border border-border/50">
                  <MapPin className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Real-time Tracking
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Track your ride in real-time for peace of mind
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-foreground" />
                <span className="font-medium text-foreground">
                  Trusted by thousands
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    99.9%
                  </div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">4.8★</div>
                  <div className="text-sm text-muted-foreground">
                    Average Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted mb-4">
                <Car className="h-6 w-6 text-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Welcome Back
              </h2>
              <p className="text-muted-foreground mt-2">
                Sign in to your account
              </p>
            </div>

            <Card className="shadow-lg border-border/50">
              <CardHeader className="space-y-2 text-center pb-8">
                <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                <CardDescription className="text-base">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
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
                                placeholder="Enter your password"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
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
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>

                {/* Register Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-foreground hover:underline transition-colors"
                    >
                      Create one here
                    </Link>
                  </p>
                </div>

                {/* Additional Help */}
                <div className="mt-4 text-center">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Security Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Shield className="h-3 w-3" />
                Your information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
