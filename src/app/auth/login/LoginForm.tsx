"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ErrorMessage from "@/components/general/ErrorMessage";
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
import Link from "next/link";
import apiClient from "@/services/api-client";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<AxiosError>();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    startTransition(() => {
      apiClient
        .post("/auth/login", data, {
          withCredentials: true,
        })
        .then((res) => router.push("/"))
        .catch((err) => setError(err));
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              {/* Email Field */}
              <FormField
                disabled={isPending}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                disabled={isPending}
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <ErrorMessage message="Invalid email or password" />}

              {/* Login Button */}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </Button>

              {/* Google Login Button */}
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>

              {/* Signup Link */}
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
