"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ErrorMessage from "@/components/general/ErrorMessage";
import InfoMessage from "@/components/general/InfoMessage";
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
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import authService from "@/services/auth-service";
import { AxiosError } from "axios";
import { useState, useTransition } from "react";
import { registerSchema } from "@/schemas/validationSchemas";

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  gender: Gender;
  userType: UserType;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum UserType {
  ADMIN = "ADMIN",
  JOB_SEEKER = "JOB_SEEKER",
  RECRUITER = "RECRUITER",
  PENDING = "PENDING",
}

export type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [errors, setError] = useState<string | string[] | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    startTransition(() => {
      authService
        .register(data)
        .then((res) =>
          setSuccess(
            "Successful! A verification link has been sent to your email"
          )
        )
        .catch((err: AxiosError) => {
          toast.error("Failed to submit the form. Please try again.");
          setError(err.response?.data.message);
        });
    });
    setError(undefined);
    setSuccess(undefined);
  };

  return (
    <div className="flex min-h-[60vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Create a new account by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
              noValidate
            >
              <fieldset disabled={isPending}>
                <div className="grid gap-4">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="name">Full Name</FormLabel>
                        <FormControl>
                          <Input id="name" placeholder="John Doe" {...field} />
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
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="johndoe@mail.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Field */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="phone">Phone Number</FormLabel>
                        <FormControl>
                          <PhoneInput {...field} defaultCountry="KE" />
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
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="password"
                            placeholder="******"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="confirmPassword">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="confirmPassword"
                            placeholder="********"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {errors && <ErrorMessage message={errors} />}
                  {success && <InfoMessage message={success} />}

                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </div>
              </fieldset>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
