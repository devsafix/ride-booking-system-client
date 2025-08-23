import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { Mail, Phone, MapPin } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Zod schema for form validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must not be longer than 50 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(500, {
      message: "Message must not be longer than 500 characters.",
    }),
});

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Simulated form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Simulate success
    toast.success("Your message has been sent successfully!");
    console.log("Form submitted with data:", values);

    // Reset the form after successful submission
    form.reset();
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4">
      {/* Page Header Component */}
      <PageHeader
        title="Contact Us"
        subTitle="Have a question or a project in mind? We'd love to hear from you."
      />

      {/* Main Content Container with two columns for larger screens */}
      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 lg:gap-12">
        {/* Left Column: Contact Details */}
        <div className="lg:w-1/2 flex flex-col justify-center items-start space-y-6">
          <h2 className="text-4xl font-bold  mb-4">Get in Touch</h2>
          <p className="text-lg  max-w-lg">
            Whether you have a question, need support, or want to collaborate,
            we're here to help. Fill out the form or reach out to us using the
            details below.
          </p>

          <ul className="space-y-4 ">
            {/* Email */}
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 " />
              <span>contact@yourcompany.com</span>
            </li>
            {/* Phone */}
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 " />
              <span>+1 (123) 456-7890</span>
            </li>
            {/* Address */}
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5  mt-1" />
              <span>
                123 Professional Ave, Suite 400
                <br />
                Business City, BC 90210
                <br />
                USA
              </span>
            </li>
          </ul>
        </div>

        {/* Right Column: Contact Form Card */}
        <Card className="lg:w-1/2 max-w-2xl bg-mute/40 border-border shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold ">
              Send us a message
            </CardTitle>
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
                      <FormLabel className="">Your Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          className="bg-mute/40 border-border  "
                          {...field}
                        />
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
                      <FormLabel className="">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@email.com"
                          type="email"
                          className="bg-mute/40 border-border  "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message here..."
                          className="bg-mute/40 border-border   min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
