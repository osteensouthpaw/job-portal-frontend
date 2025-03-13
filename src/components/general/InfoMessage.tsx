import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import React from "react";
import { Alert, AlertDescription } from "../ui/alert";

const InfoMessage = ({ message }: { message: string }) => {
  return (
    <Alert variant="success">
      <AlertDescription>
        <div className="flex flex-row items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <p>{message}</p>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default InfoMessage;
