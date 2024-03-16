"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../Employes/DataTable";

import { Prisma } from "@prisma/client";
import { columns } from "./columnsTime";

export const timeWith = Prisma.validator<Prisma.timekeepingArgs>()({
  select: {
    id: true,

    timeIn: true,
    timeOut: true,
    employeeID: true,
    verified: true,
    employee: {
      select: {
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
      },
    },
  },
});
export type TimeWith = Prisma.timekeepingGetPayload<typeof timeWith>;
type Props = {};
function TableTime({}: Props) {
  const tableTime = useQuery({
    queryKey: ["timetracking"],
  });

  if (tableTime.isLoading) {
    return <div>Loading...</div>;
  }
  if (tableTime.isError) {
    return <div>Error</div>;
  }
  return (
    <div className=" bg-base-100 rounded-xl shadow-xl shadow-base-30">
      <DataTable columns={columns} data={tableTime.data as TimeWith[]} />
    </div>
  );
}
export default TableTime;
