"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { z } from "zod";
import { useState } from "react";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  bio: z.string().max(160).optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

const UpdateNameForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
    },
  });

  async function onSubmit(values: ProfileFormData) {
    setIsSubmitting(true);
    setSuccess(false);
    // TODO: API call to update user
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1000);
  }

  const firstName = form.watch("firstName");
  const lastName = form.watch("lastName");

  return (
    <Card className="shadow-none border-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarFallback>
              {firstName?.[0]?.toUpperCase() ?? "U"}
              {lastName?.[0]?.toUpperCase() ?? ""}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">
              {firstName || "First"} {lastName || "Last"}
            </div>
            <div className="text-xs text-muted-foreground">Profile Preview</div>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us something about yourself..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            {success && (
              <div className="text-green-600 text-sm mt-2">
                Profile updated successfully!
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateNameForm;
