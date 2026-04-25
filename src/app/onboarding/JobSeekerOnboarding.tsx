"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  GraduationCap,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import CertificationStep from "./steps/CertificationStep";
import EducationStep from "./steps/EducationStep";
import ExperienceStep from "./steps/ExperienceStep";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import SkillsStep from "./steps/SkillsStep";

interface OnboardingProps {
  onComplete: () => void;
  jobSeekerId: number;
}

export default function JobSeekerOnboarding({
  onComplete,
  jobSeekerId,
}: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: "personal",
      title: "Personal Information",
      description: "Let's start with the basics",
      icon: User,
    },
    {
      id: "experience",
      title: "Work Experience",
      description: "Tell us about your career journey",
      icon: Briefcase,
    },
    {
      id: "education",
      title: "Education",
      description: "Your educational background",
      icon: GraduationCap,
    },
    {
      id: "skills",
      title: "Skills",
      description: "What are you good at?",
      icon: Award,
    },
    {
      id: "certifications",
      title: "Certifications",
      description: "Your professional certifications",
      icon: CheckCircle2,
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep onNext={handleNext} />;
      case 1:
        return (
          <ExperienceStep
            jobSeekerId={jobSeekerId}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        );
      case 2:
        return (
          <EducationStep
            jobSeekerId={jobSeekerId}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        );
      case 3:
        return (
          <SkillsStep
            jobSeekerId={jobSeekerId}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        );
      case 4:
        return (
          <CertificationStep
            jobSeekerId={jobSeekerId}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        );
      default:
        return null;
    }
  };

  const currentStepInfo = steps[currentStep];
  const StepIcon = currentStepInfo.icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-foreground mb-2">Welcome to Your Job Board</h1>
          <p className="text-muted-foreground">
            Let's set up your profile to help you find the perfect job
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-green-600 dark:text-green-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mb-8 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={step.id}
                className={`flex flex-col items-center gap-2 min-w-[80px] ${
                  isActive ? "opacity-100" : "opacity-50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted
                      ? "bg-green-600 dark:bg-green-500"
                      : isActive
                      ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-600 dark:border-green-400"
                      : "bg-muted"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  ) : (
                    <Icon
                      className={`h-6 w-6 ${
                        isActive
                          ? "text-green-600 dark:text-green-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  )}
                </div>
                <span className="text-xs text-center hidden sm:block">
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <StepIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle>{currentStepInfo.title}</CardTitle>
                <CardDescription>{currentStepInfo.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>

              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button variant="ghost" onClick={handleSkip}>
                    Skip
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
