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
import { TeamWith } from "./TableTeams";
import Link from "next/link";

export const columns: ColumnDef<TeamWith>[] = [
  {
    accessorKey: "name",
    header: "TeamName",
  },
  {
    accessorKey: "tasks",
    header: "Task",
    cell: ({ row }) => {
      const formatted = `${
        row.original.TeamTask?.length !== 0
          ? row.original.TeamTask
          : "No Tasks"
      }`;

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "TeamTask",
    header: "Deadline",
    cell: ({ row }) => {
      const formatted = `${
        // row.original.TeamTask.length !== 0
        //   ? new Date(row.original.TeamTask[0].deadline).toLocaleDateString()
        //   :
          "No Tasks"
      }`;

      return <div className="">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const teams = row.original;

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
                <Link href={`/dashboard/admin/teams/${teams.id}`}>
                  Go to Team page
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
