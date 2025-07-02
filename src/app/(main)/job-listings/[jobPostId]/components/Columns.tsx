"use client";
import { JobApplicationResponse } from "@/services/application-service";
import { JobPostResponse } from "@/services/jobPost-service";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const jobPostColumns: ColumnDef<JobPostResponse>[] = [
  {
    accessorKey: "jobTitle",
    header: "Job Title",
  },
  {
    accessorKey: "isOpen",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const formattedDate = new Date(row.getValue("createdAt")).toDateString();
      return <div className="text-base">{formattedDate}</div>;
    },
  },
];

export const jobApplicationColumns: ColumnDef<JobApplicationResponse>[] = [
  {
    accessorKey: "jobTitle",
    header: "Job Title",
    cell: ({ row }) => {
      const jobTitle = row.original.appliedPost.jobTitle;
      const jobPostId = row.original.appliedPost.id;
      return (
        <Link href={`/job-listings/${jobPostId}`} className="hover:underline">
          {jobTitle}
        </Link>
      );
    },
  },
  {
    accessorKey: "applicationStatus",
    header: "Status",
  },
  {
    accessorKey: "appliedDate",
    header: "Application Date",
    accessorFn: (row) => {
      const appliedDate = row.appliedDate;
      return new Date(appliedDate).toDateString();
    },
  },
  {
    accessorKey: "applicationDeadline",
    header: "Deadline",
    accessorFn: (row) => {
      const deadline = row.appliedPost.applicationDeadline;
      return new Date(deadline).toDateString();
    },
  },
];
