import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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

export type SkillType = {
  id: number;
  title: string;
  description: string;
  level: string;
  total_sections: number;
  category: string;
  estimated_duration: string;
  thumbnail_url: string;
  created_at: string;
  sections: SectionType[];
  test: TestType;
  progress_record: ProgressRecordType;
};

type SectionType = {
    id: number;
    order: number;
    title: string;
    content: string;
    video_url: string;
    resource_url: string;
    completed: boolean;
    duration: string;
    quiz_included: boolean;
}

export type TestType = {
    id: number;
    status: string;
    total_questions: number;
    time_limit: number;
    attempts: number;
    questions: QuestionType[]
    score: number;
}

type QuestionType = {
    id: number;
    question: string;
    options: object;
    correct_answer: string;
    explanation: string;
    difficulty: string;
    user_answer: string;
}

type ProgressRecordType = {
    id: number;
    completed_sections: number;
    progress: number;
    completed: boolean;
    score: number;
    started_at: string;
    completed_at: string;
    last_accessed_section_id: string;
}

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

interface DataTableProps<TData> {
  data: TData[];
}

export function DataTable({
    data,
}: DataTableProps<SkillType>) {

  const columns: ColumnDef<SkillType>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => {
        return (
        <p>{row.original.title}</p>
      )
      },
    },
    
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'estimated_duration',
      header: 'Duration',
      cell: ({ row }) => {
        const duration = row.original.estimated_duration;
        return (
          <>
          {duration}
          </>
        )
      }
    },
    {
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original?.progress_record?.completed;
          
          return (
          <p className={`${status ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-500"} py-1 text-xs text-center`}>{status ? "Completed": "Pending"}</p>
          )
        }
      },
      {
        header: 'Progress',
        cell: ({ row }) => {
          const progress = row.original?.progress_record?.progress;
          
          return (
          <p>%{progress}</p>
          )
        }
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
            >
              <Ellipsis />
            </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <Link href={`/skills/${row.original.id}`}>
            <DropdownMenuItem>
                View
            </DropdownMenuItem>
          </Link>
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
                      
                      <p>No skill created yet.</p>
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