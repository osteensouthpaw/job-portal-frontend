import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Deadline from "./Deadline";

const JobDescriptionCard = () => {
  return (
    <Card className="shadow-none border-0 p-3 relative">
      <div className="hidden absolute -top-28 right-0 lg:block">
        <Deadline />
      </div>

      <CardHeader>
        <CardTitle className="font-semibold text-lg">Description</CardTitle>
      </CardHeader>
      <CardContent>
        Details Job Description: We are looking for a passionate Java Developer
        (Fresher) to join our team in Chennai. The ideal candidate should have a
        strong understanding of Java programming and a keen interest in software
        development. Key Responsibilities: Develop, test, and maintain
        Java-based applications. Write clean, efficient, and well-structured
        code. Collaborate with the development team to design and implement new
        features.
      </CardContent>
    </Card>
  );
};

export default JobDescriptionCard;
