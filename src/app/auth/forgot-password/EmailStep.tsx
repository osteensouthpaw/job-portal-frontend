// EmailStep.tsx
"use client";
import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { Mail, ArrowRight, ArrowLeft, Key } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ForgotPasswordFormData } from "./page";

type Props = {
  form: UseFormReturn<ForgotPasswordFormData>;
  isLoading: boolean;
  error: { message: string } | null;
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  onSwitchToLogin?: () => void;
};

export default function EmailStep({
  form,
  isLoading,
  error,
  onSubmit,
  onSwitchToLogin,
}: Props) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Key className="h-5 w-5 text-green-600" />
          Forgot Password
        </CardTitle>
        <CardDescription className="text-center">
          We'll send you a verification code to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4 border-destructive/50 bg-destructive/10">
            <AlertDescription className="ml-2 text-destructive">
              {error.message}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">
              <Mail className="h-4 w-4 inline mr-1" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...form.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              disabled={isLoading}
            />
            {form.formState.errors.email && (
              <p className="text-destructive text-xs mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending code...
              </>
            ) : (
              <>
                Send Reset Code
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onSwitchToLogin}
            className="w-full gap-2"
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
