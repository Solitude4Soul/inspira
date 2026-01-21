"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { submitContactForm } from "./actions";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(1, "Please enter a subject."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  submissionType: z.enum(["brand", "creator"]),
});

type FormData = z.infer<typeof formSchema>;

function ContactForm({ type }: { type: "brand" | "creator" }) {
  const isBrand = type === "brand";
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: isBrand ? "Brand Partnership Inquiry" : "Creator Network Application",
      message: "",
      submissionType: type,
    },
  });

  const onSubmit = async (values: FormData) => {
    const result = await submitContactForm(values);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: result.error || "Sorry, we couldn't send your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="you@inspira.xyz" {...field} />
                </FormControl>
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
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder={isBrand ? "Campaign Details" : "About Your Content"} {...field} />
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
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    isBrand
                      ? "Tell us about your campaign goals..."
                      : "Tell us about yourself and your content..."
                  }
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}

export default function ContactPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") === "creator" ? "creator" : "brand";

  return (
    <div className="py-16 sm:py-24">
      <div className="container flex justify-center">
        <Tabs defaultValue={type} className="w-full max-w-xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="brand">I'm a Brand</TabsTrigger>
            <TabsTrigger value="creator">I'm a Creator</TabsTrigger>
          </TabsList>
          <TabsContent value="brand">
            <Card>
              <CardHeader>
                <CardTitle>Partner with Us</CardTitle>
                <CardDescription>
                  Let's create something amazing together. Fill out the form
                  below to get started.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm type="brand" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="creator">
            <Card>
              <CardHeader>
                <CardTitle>Join Our Network</CardTitle>
                <CardDescription>
                  Ready to connect with great brands? We'd love to learn more
                  about you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm type="creator" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
