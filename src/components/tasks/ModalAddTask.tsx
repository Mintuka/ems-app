import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import fetchSearchTeamsResult from "@/lib/frontend/GetSearchTeams";
import { TaskAddForm } from "./TaskAddForm";
import { Teams } from "@prisma/client";

type Props = {
  trigger: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
};
function ModalAddTask({ trigger, setModal }: Props) {
  const teams = useQuery({
    queryKey: ["teams"],
    queryFn: async () => fetchSearchTeamsResult(),
    enabled: trigger,
  });

  return (
    <SheetContent className="bg-base-100 overflow-y-scroll">
      <SheetHeader>
        <SheetTitle>Add a Task to a Team</SheetTitle>
        <SheetDescription>
          Add a task and assigned it to a team
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col mt-10 gap-7">
        <TaskAddForm
          setModal={setModal}
          teams={teams.data as Teams[] | undefined}
        />
      </div>
    </SheetContent>
  );
}
export default ModalAddTask;
