"use client";

import { useAuth } from "@/app/AuthProvider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/services/user-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  bio: z.string().max(160).optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

const UpdateNameForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, setUser } = useAuth();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  });

  if (!user) {
    return (
      <div className="text-red-500">
        You must be logged in to update your profile.
      </div>
    );
  }

  async function onSubmit(values: ProfileFormData) {
    setIsSubmitting(true);
    updateUser({
      firstName: values.firstName,
      lastName: values.lastName,
      imageUrl: user!.imageUrl,
    })
      .then((res) => {
        setUser(res.data);
        toast.success("Profile updated successfully!");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof AxiosError) {
          setSuccess(false);
          toast.error(`"An error occured":${err.response?.data.message}`);
        }
      })
      .finally(() => setIsSubmitting(false));
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
              defaultValue={user.firstName}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              defaultValue={user.lastName}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
