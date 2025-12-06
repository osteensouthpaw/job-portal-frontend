import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import React from "react";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Alert className="mb-4 border-destructive/50 bg-destructive/10">
      <AlertCircle className="size-5" />
      <AlertDescription className="ml-2">{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;
