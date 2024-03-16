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
import fetchEmployesNoTeam from "@/lib/frontend/fetchEmployesNoTeam";
import { SelectForm } from "./FormAddEmployer";
import { Employee } from "@prisma/client";

type Props = {
  trigger: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  id: string;
};
function ModalTeamsID({ trigger, setModal, id }: Props) {
  const noteam = useQuery({
    queryKey: ["employenoTeam"],
    queryFn: async () => fetchEmployesNoTeam(),
    enabled: trigger,
  });

  return (
    <SheetContent className="bg-base-100 overflow-y-scroll">
      <SheetHeader>
        <SheetTitle>Add Employee to Team</SheetTitle>
        <SheetDescription>Add Employee to this Team.</SheetDescription>
      </SheetHeader>
      <div className="flex flex-col mt-10 gap-7">
        {noteam.isSuccess && (
          <SelectForm
            id={id}
            data={noteam.data as Employee[]}
            setModal={setModal}
          />
        )}
      </div>
    </SheetContent>
  );
}
export default ModalTeamsID;
