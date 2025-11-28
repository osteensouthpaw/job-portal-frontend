"use client";
import { useAuth } from "@/app/AuthProvider";
import { UserType } from "@/services/auth-service";
import { redirect } from "next/navigation";
import { useState } from "react";
import { JobSeekerOnboarding, OnboardingData } from "./JobSeekerOnboarding";
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

  const onComplete = (data: OnboardingData) => {
    console.log({ data });
  };

  const renderStep = () => {
    if (step === 1)
      return <UserTypeSelection onSelect={handleUserTypeSelection} />;
    else if (step === 2)
      return userType === UserType.RECRUITER ? (
        <RecruiterForm />
      ) : (
        <JobSeekerOnboarding onComplete={(data) => onComplete(data)} />
      );
    else return null;
  };

  return (
    <>
      <div className="w-full">{renderStep()}</div>
    </>
  );
};

export default OnboadingForm;
