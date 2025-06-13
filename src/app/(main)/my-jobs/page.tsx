import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./_components/Columns";
import jobPostService from "@/services/jobPost-service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MyJobsPage = async () => {
  const jobPosts = await jobPostService.jobPosts();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">My Jobs</CardTitle>
          <CardDescription>Manage your Job Listings Here</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={jobPosts} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyJobsPage;
