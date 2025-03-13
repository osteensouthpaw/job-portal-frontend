import { AlertCircle } from "lucide-react";
import React from "react";
import { Alert, AlertDescription } from "../ui/alert";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        <div className="flex flex-row items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <p>{message}</p>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;
