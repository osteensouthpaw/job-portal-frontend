"use client";
import React, { useState } from "react";
import UserTypeSelection from "./UserTypeSelection";
import { UserType } from "../auth/register/RegisterForm";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { Card, CardContent } from "@/components/ui/card";
import RecruiterForm from "./RecruiterForm";
import JobSeekerForm from "./JobSeekerForm";

const OnboadingForm = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleUserTypeSelection = (userType: UserType) => {
    setStep(2);
    setUserType(userType);
  };

  const renderStep = () => {
    if (step == 1)
      return <UserTypeSelection onSelect={handleUserTypeSelection} />;
    else if (step == 2)
      return userType == UserType.RECRUITER ? (
        <RecruiterForm />
      ) : (
        <JobSeekerForm />
      );
    else return null;
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-10">
        <Image src={Logo} alt="JobMarshal Logo" width={50} height={50} />
        <span className="text-4xl font-bold">
          Job<span className="text-primary">Marshal</span>
        </span>
      </div>
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
};

export default OnboadingForm;
