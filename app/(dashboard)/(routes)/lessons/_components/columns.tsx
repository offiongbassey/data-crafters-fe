"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LessonType } from "./data-table";

export const columns: ColumnDef<LessonType>[] = [
  {
    accessorKey: 'topic',
    header: 'Topic',
    cell: ({ row }) => {
      return (
      <p>{row.original.topic}</p>
    )
    },
  },
  {
    accessorKey: 'subject',
    header: 'Subject',
    cell: ({ row }) => {
      return (
      <p>{row.original.subject}</p>
      )
    }
  },
  {
    accessorKey: 'grade',
    header: 'Grade',
    cell: ({ row }) => {

      return (
        <>
        <p className="flex items-center gap-2"> {row.original.grade}</p>
        </>
      )
    }
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
  },
  {
    accessorKey: 'created_at',
    header: 'Date',
    // cell: ({ row }) => {
    //   const date = new Date(row.original.createdAt);
    //   const formattedDate = new Intl.DateTimeFormat('en-GB').format(date);

    //   return (
    //     <>
    //     {formattedDate}
    //     </>
    //   )
    // }
  }
  
];

