"use client";
import { useAuth } from "@/app/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import { UserType } from "../../auth/register/RegisterForm";
import JobSeekerForm from "./JobSeekerForm";
import RecruiterForm from "./RecruiterForm";
import UserTypeSelection from "./UserTypeSelection";

const OnboadingForm = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const { user } = useAuth();

  if (user === null) return redirect("/auth/login");
  if (user.userType !== UserType.PENDING) return redirect("/job-listings");

  const handleUserTypeSelection = (userType: UserType) => {
    setStep(2);
    setUserType(userType);
  };

  const renderStep = () => {
    if (step === 1)
      return <UserTypeSelection onSelect={handleUserTypeSelection} />;
    else if (step === 2)
      return userType === UserType.RECRUITER ? (
        <RecruiterForm />
      ) : (
        <JobSeekerForm />
      );
    else return null;
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-10">
        <Image src={Logo} alt="JobMega Logo" width={50} height={50} />
        <span className="text-4xl font-bold">
          Job<span className="text-primary">Mega</span>
        </span>
      </div>
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
};

export default OnboadingForm;
