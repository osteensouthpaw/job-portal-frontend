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
  content: T[];
  columns: ColumnDef<T>[];
  searchField: string;
}

const Table = <T,>({
  title,
  description,
  content,
  columns,
  searchField,
}: TableProps<T>) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable data={content} columns={columns} searchField={searchField} />
      </CardContent>
    </Card>
  );
};

export default Table;
