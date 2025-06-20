import React from "react";
import JobApplicationForm from "../_components/JobApplicationForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const JobApplicationPage = () => {
  return (
    <Card>
      <CardHeader className="md:text-center">
        <CardTitle>Job Application Form</CardTitle>
        <CardDescription>
          Please fill out the form below to apply for the job.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <JobApplicationForm />
      </CardContent>
    </Card>
  );
};

export default JobApplicationPage;
