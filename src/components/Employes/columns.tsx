"use client";

import { Employee } from "@prisma/client";
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
import { EmployeeWith } from "./Table";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Employee = {
//   id: string;
//   firstName: string;
//   salary: number;
//   role: string;
//   email: string;
// };

export const columns: ColumnDef<EmployeeWith>[] = [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      if (!row.original.photo) {
        return (
          <Image
            src={"/defaultProfile.png"}
            alt="Employee photo"
            width={60}
            height={60}
            className="rounded-full"
          />
        );
      }
      return (
        <Image
          src={row.original.photo!}
          alt="Employee photo"
          width={60}
          height={60}
          className="rounded-full"
        />
      );
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = `${row.getValue("firstName")} ${row.original.lastName}`;

      return <div className="">{formatted}</div>;
    },
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "position",
    header: "Title",
  },
  {
    accessorKey: "name",
    header: "Team",
    cell: ({ row }) => {
      const formatted = `${
        row.original.Teams?.name ? row.original.Teams?.name : "No team"
      }`;

      return <div className="">{formatted}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
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
