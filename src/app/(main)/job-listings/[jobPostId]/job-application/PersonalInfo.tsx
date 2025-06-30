import { Label } from "@/components/ui/label";
import React from "react";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const PersonalInfo = ({ firstName, lastName, email, phone }: Props) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-muted-foreground">First Name</Label>
          <p>{firstName}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Last Name</Label>
          <p>{lastName}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Email</Label>
          <p>{email}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Phone</Label>
          <p>{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
