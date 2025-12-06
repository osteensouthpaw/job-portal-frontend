"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/schemas/validationSchemas";
import { register, UserType } from "@/services/auth-service";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Chrome,
  Eye,
  EyeOff,
  Linkedin,
  Lock,
  Mail,
  Phone,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ErrorMessage from "./ErrorMessage";
import { ApiError, useAuth } from "@/app/AuthProvider";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

export type SignupFormData = z.infer<typeof registerSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser, setToken } = useAuth();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: UserType.JOB_SEEKER,
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    mode: "onChange",
  });

  const password = form.watch("password");

  // Simulate API call with different error scenarios
  const handleSignup = form.handleSubmit(async (data) => {
    if (!data.agreeToTerms) {
      toast.error("Please agree to the Terms and Conditions");
      return;
    }
    setIsLoading(true);
    await register(data)
      .then(({ data }) => {
        setUser(data.userResponse);
        setToken(data.token);
        toast.success("Account created successfully! Welcome aboard.");
        router.push("/onboarding");
      })
      .catch((err: AxiosError<ApiError>) =>
        setError(err.response?.data.message)
      )
      .finally(() => setIsLoading(false));
  });

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(`Signing up with ${provider}...`);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-foreground mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">
            Join our platform and start your journey today
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Choose your role and fill in your details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Role Selection */}
              <div>
                <Label className="mb-3 block">I am a *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Controller
                    name="role"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <button
                          type="button"
                          onClick={() => field.onChange(UserType.JOB_SEEKER)}
                          className={`relative flex items-start gap-3 p-4 border-2 rounded-lg transition-all ${
                            field.value === UserType.JOB_SEEKER
                              ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                              : "border-muted hover:border-green-300"
                          }`}
                          disabled={isLoading}
                        >
                          <div
                            className={`mt-0.5 p-2 rounded-lg ${
                              field.value === UserType.JOB_SEEKER
                                ? "bg-green-600"
                                : "bg-muted"
                            }`}
                          >
                            <User
                              className={`h-5 w-5 ${
                                field.value === UserType.JOB_SEEKER
                                  ? "text-white"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </div>
                          <div className="text-left flex-1">
                            <p className="text-sm text-foreground mb-1">
                              Job Seeker
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Looking for job opportunities
                            </p>
                          </div>
                          {field.value === UserType.JOB_SEEKER && (
                            <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-green-600" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => field.onChange(UserType.RECRUITER)}
                          className={`relative flex items-start gap-3 p-4 border-2 rounded-lg transition-all ${
                            field.value === UserType.RECRUITER
                              ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                              : "border-muted hover:border-green-300"
                          }`}
                          disabled={isLoading}
                        >
                          <div
                            className={`mt-0.5 p-2 rounded-lg ${
                              field.value === UserType.RECRUITER
                                ? "bg-green-600"
                                : "bg-muted"
                            }`}
                          >
                            <Users
                              className={`h-5 w-5 ${
                                field.value === UserType.RECRUITER
                                  ? "text-white"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </div>
                          <div className="text-left flex-1">
                            <p className="text-sm text-foreground mb-1">
                              Recruiter
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Hiring talented candidates
                            </p>
                          </div>
                          {field.value === UserType.RECRUITER && (
                            <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-green-600" />
                          )}
                        </button>
                      </>
                    )}
                  />
                </div>
              </div>
              {error && <ErrorMessage message={error} />}
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="fullName">
                    <User className="h-4 w-4 inline mr-1" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    {...form.register("name", {
                      required: "Full name is required",
                      // minLength: {
                      //   value: 2,
                      //   message: "Name must be at least 2 characters",
                      // },
                    })}
                    className="mt-1"
                    disabled={isLoading}
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-xs mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

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
                    })}
                    className="mt-1"
                    disabled={isLoading}
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    {...form.register("phone", {
                      required: "Phone is required",
                    })}
                    className="mt-1"
                    disabled={isLoading}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-destructive text-xs mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">
                    <Lock className="h-4 w-4 inline mr-1" />
                    Password *
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      {...form.register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      className={`pr-10`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-destructive text-xs mt-1">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">
                    <Lock className="h-4 w-4 inline mr-1" />
                    Confirm Password *
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...form.register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      className="pr-10"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={form.watch("agreeToTerms")}
                  onCheckedChange={(checked) =>
                    form.setValue("agreeToTerms", checked as boolean)
                  }
                  disabled={isLoading}
                  className="mt-1"
                />
                <Label
                  htmlFor="agreeToTerms"
                  className="text-sm cursor-pointer leading-relaxed"
                >
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 underline"
                  >
                    Terms and Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 underline"
                  >
                    Privacy Policy
                  </button>
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>
            {/* Social Signup */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignup("Google")}
                disabled={isLoading}
                className="gap-2"
              >
                <Chrome className="h-4 w-4" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignup("LinkedIn")}
                disabled={isLoading}
                className="gap-2"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
            </div>
            {/* Login Link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <button
                type="button"
                onClick={() => router.push("/auth/login")}
                className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
