"use client";
import { JobPostResponse } from "@/services/jobPost-service";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<JobPostResponse>[] = [
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
