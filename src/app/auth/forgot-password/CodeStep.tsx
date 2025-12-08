// CodeStep.tsx
"use client";
import React, { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Key, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
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
import { ResetPasswordFormData } from "./page";

type Props = {
  form: UseFormReturn<ResetPasswordFormData>;
  isLoading: boolean;
  error: { message: string } | null;
  userEmail: string;
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  onResendCode: () => Promise<void>;
  onBack: () => void;
};

export default function CodeStep({
  form,
  isLoading,
  error,
  userEmail,
  onSubmit,
  onResendCode,
  onBack,
}: Props) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Lock className="h-5 w-5 text-green-600" />
          Reset Your Password
        </CardTitle>
        <CardDescription className="text-center">
          Enter the 6-digit code sent to {userEmail}
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
            <Label htmlFor="code">
              <Key className="h-4 w-4 inline mr-1" />
              Verification Code *
            </Label>
            <Input
              id="code"
              placeholder="000000"
              maxLength={6}
              {...form.register("code", {
                required: "Verification code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Code must be 6 digits",
                },
              })}
              className="mt-1 text-center tracking-widest text-lg"
              disabled={isLoading}
            />
            {form.formState.errors.code && (
              <p className="text-destructive text-xs mt-1">
                {form.formState.errors.code.message}
              </p>
            )}
            <div className="mt-2 text-center">
              <button
                type="button"
                onClick={onResendCode}
                className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                disabled={isLoading}
              >
                Didn't receive the code? Resend
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="newPassword">
              <Lock className="h-4 w-4 inline mr-1" />
              New Password *
            </Label>
            <div className="relative mt-1">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...form.register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {form.formState.errors.newPassword && (
              <p className="text-destructive text-xs mt-1">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">
              <Lock className="h-4 w-4 inline mr-1" />
              Confirm New Password *
            </Label>
            <div className="relative mt-1">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                {...form.register("confirmPassword", {
                  required: "Please confirm your password",
                })}
                className="pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-destructive text-xs mt-1">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-xs text-blue-900 dark:text-blue-300">
              Password must be at least 8 characters long and include a mix of
              letters, numbers, and symbols.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Resetting password...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="w-full gap-2"
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
