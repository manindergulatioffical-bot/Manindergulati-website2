"use client";

import { useForm } from "react-hook-form";
import { useForm as useFormspree } from "@formspree/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    error: "Name is required",
  }),
  email: z.email({
    error: "Please enter a valid email address.",
  }),
  phone: z.string({
    error: "Phone number is required",
  }),
  subject: z.string().min(5, {
    error: "Subject must be at least 5 characters.",
  }),
  category: z.string().min(1, {
    error: "Please select a category.",
  }),
  message: z.string().min(10, {
    error: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function ContactForm() {
  const [state, handleSubmit] = useFormspree("xyzpblzj");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "general",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    await handleSubmit(data);

    if (state.succeeded) {
      toast.success("Message sent successfully");
      form.reset();
    }
    if (state.errors) {
      toast.error(
        "Message sent failed, please try again or contact us directly."
      );
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                  Full Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your full name"
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                  Email Address *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your phone number"
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                  Category *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className="bg-white"
                      defaultValue={field.value}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="product">Product Question</SelectItem>
                    <SelectItem value="order">Order Support</SelectItem>
                    <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                Subject *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="What is this regarding?"
                  className="bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                Message *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about your inquiry..."
                  className="resize-none bg-white"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={state.submitting}
        >
          {state.submitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}

export default ContactForm;
