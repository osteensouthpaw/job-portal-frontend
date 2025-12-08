"use client";
import { Briefcase } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CodeStep from "./CodeStep";
import EmailStep from "./EmailStep";
import SuccessStep from "./SuccessStep";

import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  resetPassword,
  UpdateUserPasswordRequest,
} from "@/services/auth-service";
import { ApiError } from "@/app/AuthProvider";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "code" | "success">("email");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const emailForm = useForm<ForgotPasswordFormData>({
    defaultValues: { email: "" },
    mode: "onChange",
  });
  const resetForm = useForm<ResetPasswordFormData>({
    defaultValues: { code: "", newPassword: "", confirmPassword: "" },
    mode: "onChange",
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) =>
      forgotPassword(email).then((res) => res.data),
    onError: (error: AxiosError<ApiError>) => {
      console.error("Forgot password error:", error.response?.data);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (request: UpdateUserPasswordRequest) =>
      resetPassword(request).then((res) => res.data),
    onError: (error: AxiosError<ApiError>) => {
      console.error("Reset password error:", error.response?.data);
    },
  });

  const handleSendCode = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPasswordMutation.mutateAsync(data.email);
      setUserEmail(data.email);
      toast.success("Reset code sent! Check your email.");
      setStep("code");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to send reset code. Please try again.";
      toast.error(message);
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result: UpdateUserPasswordRequest = {
      password: data.newPassword,
      confirmPassword: data.confirmPassword,
      passwordToken: data.code,
    };

    try {
      await resetPasswordMutation.mutateAsync(result);
      toast.success("Password reset successful!");
      setStep("success");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to reset password. Please try again.";
      toast.error(message);
    }
  };

  const handleResendCode = async () => {
    try {
      await forgotPasswordMutation.mutateAsync(userEmail);
      toast.success("Verification code resent!");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to resend code. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-foreground mb-2">
            {step === "success" ? "All Set!" : "Reset Password"}
          </h1>
          <p className="text-muted-foreground">
            {step === "email" && "Enter your email to receive a reset code"}
            {step === "code" && "Enter the code sent to your email"}
            {step === "success" && "Your password has been reset successfully"}
          </p>
        </div>
        {step === "email" && (
          <EmailStep
            form={emailForm}
            isLoading={forgotPasswordMutation.isPending}
            error={
              forgotPasswordMutation.error
                ? {
                    message:
                      forgotPasswordMutation.error.response?.data?.message ||
                      "An error occurred",
                  }
                : null
            }
            onSubmit={handleSendCode}
            onSwitchToLogin={() => router.push("/auth/login")}
          />
        )}
        {step === "code" && (
          <CodeStep
            form={resetForm}
            isLoading={
              resetPasswordMutation.isPending ||
              forgotPasswordMutation.isPending
            }
            error={
              resetPasswordMutation.error
                ? {
                    message:
                      resetPasswordMutation.error.response?.data?.message ||
                      "An error occurred",
                  }
                : null
            }
            userEmail={userEmail}
            onSubmit={handleResetPassword}
            onResendCode={handleResendCode}
            onBack={() => {
              setStep("email");
              resetForm.reset();
            }}
          />
        )}

        {step === "success" && (
          <SuccessStep onSwitchToLogin={() => router.push("/auth/login")} />
        )}
        {step !== "success" && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-3">
            <p className="text-xs text-muted-foreground text-center">
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@jobboard.com"
                className="text-green-600 hover:text-green-700 dark:text-green-400"
              >
                support@jobboard.com
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
