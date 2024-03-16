"use client";

import { Teams } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { taskWith } from "./Tabletasks";

export const columns: ColumnDef<taskWith>[] = [
  {
    accessorKey: "task",
    header: "Tasks",
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      const formatted = `${new Date(
        row.original.deadline
      ).toLocaleDateString()}`;

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "done",
    header: "Done",
    cell: ({ row }) => {
      const formatted = `${row.original.done ? "Yes" : "No"}`;

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "team",
    header: "Team",
    cell: ({ row }) => {
      const formatted = `${row.original.team.name}`;

      return (
        <div className="">
          <Link
            className="link link-primary link-hover"
            href={`/dashboard/admin/teams/${row.original.teamID}`}
          >
            {formatted}
          </Link>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const tasks = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className=" bg-base-100">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={`/dashboard/admin/tasks/${tasks.id}`}>
                  Go to Task page
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
