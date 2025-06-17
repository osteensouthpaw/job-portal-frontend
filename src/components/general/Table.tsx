import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DataTable } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface TableProps<T> {
  title: string;
  description: string;
  content: any[];
  columns: ColumnDef<T>[];
}

const Table = ({ title, description, content, columns }: TableProps<any>) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable data={content} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default Table;
