"use client";
import React from "react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  onSwitchToLogin?: () => void;
};

export default function SuccessStep({ onSwitchToLogin }: Props) {
  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-foreground mb-2">Password Reset Successful!</h3>
            <p className="text-muted-foreground text-sm">
              Your password has been reset successfully. You can now sign in
              with your new password.
            </p>
          </div>
          <Button
            onClick={onSwitchToLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
