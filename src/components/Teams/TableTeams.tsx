"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../Employes/DataTable";

import fetchSearchResult from "@/lib/frontend/GetSearchEmploye";
import { Prisma, Teams } from "@prisma/client";
import { columns } from "./columnsTeams";
export const teamWith = Prisma.validator<Prisma.TeamsArgs>()({
  include: {
    TeamTask: true,
  },
});
export type TeamWith = Prisma.TeamsGetPayload<typeof teamWith>;
type Props = {};
function Table({}: Props) {
  const Teams = useQuery({
    queryKey: ["teams"],
  });
  if (Teams.isLoading) {
    return <div>Loading...</div>;
  }
  if (Teams.isError) {
    return <div>Error</div>;
  }
  console.log(Teams.data);
  return (
    <div className=" bg-base-100 rounded-xl shadow-xl shadow-base-30">
      <DataTable columns={columns} data={Teams.data as TeamWith[]} />
    </div>
  );
}
export default Table;
