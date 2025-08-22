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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoginUserMutation } from "@/redux/features/auth/auth.api";
import { setCredentials } from "@/redux/features/auth/auth.slice";

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

      // Redirect based on the user's role
      switch (res.data.user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "rider":
          navigate("/rider/dashboard");
          break;
        case "driver":
          navigate("/driver/dashboard");
          break;
        default:
          navigate("/");
          break;
      }
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
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] py-8">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="underline">
              Register here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
