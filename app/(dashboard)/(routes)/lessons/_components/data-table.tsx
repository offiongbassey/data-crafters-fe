import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel,
  } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

export type LessonType = {
  id: number;
  topic: string;
  subject: string;
  grade: number;
  duration: number;
  content: LessonContent;
  created_at: string;
};

export type AssessmentType = {
    id: number;
    lesson_id: number;
    content: AssessmentContentType
}

type AssessmentContentType = {
    no_of_questions: number;
    questions: QuestionsType[];

}

type QuestionsType = {
    question: string;
    options: [];
    answer: string;
}

type LessonContent = {
        lesson_title: string,
        subject_and_grade: string,
        duration: string,
        lesson_objectives: [],
        instructional_materials: [],
        lesson_introduction: string,
        lesson_development: LessonDevelopment[],
        learner_activities: LessonActivity[],
        summary: string,
        extension_activity: string,
        teacher_reflection: string
}

type LessonDevelopment = {
    activity: string,
    details: string,
    time: string
}

type LessonActivity = {
    activity: string,
    details: string,
    time: string
}

interface DataTableProps<TData> {
  data: TData[];
}

export function DataTable({
    data,
}: DataTableProps<LessonType>) {

  const columns: ColumnDef<LessonType>[] = [
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
    },
    {
      accessorKey: 'duration',
      header: 'duration',
    },
    {
      accessorKey: 'created_at',
      header: 'Date',
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        const formattedDate = new Intl.DateTimeFormat('en-GB').format(date);
  
        return (
          <>
          {formattedDate}
          </>
        )
      }
    },
    {
        header: 'More',
        cell: ({ row }) => {
          return (
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <button
              onClick={() => {
                console.log("Viewing row:", row.original);
                // navigate to detail page or show modal
              }}
            >
              <Ellipsis />
            </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <Link href={`/lessons/${row.original.id}`}>
            <DropdownMenuItem>
                View Content
            </DropdownMenuItem>
          </Link>
          <Link href={`/assessments/${row.original.id}`}>
            <DropdownMenuItem>
                View Assessment
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
            
          );
        },
      }
    
  ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
      });

    return (
        <div>
        <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead className="w-[60px] p-2 border-r-2 border-[#e5e5e5]">
                  S/N
                </TableHead>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-5 pl-8">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="bg-white"
                  >
                    <TableCell className="font-medium p-3 border-r-2 border-[#e5e5e5]">
                      {index + 1}
                    </TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="cursor-pointer pl-8" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center w-full bg-white"
                  >
                    <div className="flex flex-col gap-4 w-full items-center justify-center py-20">
                      
                      <p>No lesson created yet.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
        </div>
    )
}

export default DataTable;