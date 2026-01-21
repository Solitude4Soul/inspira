"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { doc } from "firebase/firestore";

import { useToast } from "@/hooks/use-toast";
import { useDoc, useFirestore, useMemoFirebase, setDocumentNonBlocking } from "@/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { PermissionErrorDisplay } from "@/components/admin/PermissionError";

const settingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required."),
  contactEmail: z.string().email("Please enter a valid email."),
  publicSignups: z.boolean(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const settingsDocRef = useMemoFirebase(
    () => (firestore ? doc(firestore, "website_configuration", "current") : null),
    [firestore]
  );
  
  const { data: currentSettings, isLoading: isLoadingSettings, error } = useDoc<SettingsFormData>(settingsDocRef);

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: "Inspira",
      contactEmail: "contact@inspira.com",
      publicSignups: true,
    },
  });

  useEffect(() => {
    if (currentSettings) {
      form.reset(currentSettings);
    }
  }, [currentSettings, form]);
  
  const onSubmit = (values: SettingsFormData) => {
    if (!settingsDocRef) return;
    
    setDocumentNonBlocking(settingsDocRef, values, { merge: true });
    
    toast({
      title: "Settings Saved!",
      description: "Your changes have been successfully saved.",
    });
  };

  if (isLoadingSettings) {
      return (
          <div className="space-y-6">
            <h1 className="font-headline text-3xl font-bold">Settings</h1>
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="flex items-center space-x-2 pt-2">
                        <Skeleton className="h-6 w-11 rounded-full" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-32" />
                </CardFooter>
            </Card>
        </div>
      )
  }

  if (error) {
    return (
        <div className="space-y-6">
            <h1 className="font-headline text-3xl font-bold">Settings</h1>
            <PermissionErrorDisplay />
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Settings</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage general site settings and configurations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="siteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Name</FormLabel>
                    <FormControl>
                      <Input {...field} id="site-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Public Contact Email</FormLabel>
                    <FormControl>
                      <Input {...field} id="contact-email" type="email" />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publicSignups"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 pt-2">
                    <FormControl>
                        <Switch 
                            id="public-signups"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <Label htmlFor="public-signups" className="!mt-0">
                        Allow public creator applications
                    </Label>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                 {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
