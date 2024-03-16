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
import { CreateTeamForm } from "./Forms";

type Props = {
  trigger: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
};
function ModalTeams({ trigger, setModal }: Props) {
  const noteam = useQuery({
    queryKey: ["employenoTeam"],
    queryFn: async () => fetchEmployesNoTeam(),
    enabled: trigger,
  });

  return (
    <SheetContent className="bg-base-100 overflow-y-scroll">
      <SheetHeader>
        <SheetTitle>Create an Team</SheetTitle>
        <SheetDescription>
          Create an team and add members to it.
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col mt-10 gap-7">
        <CreateTeamForm setModal={setModal} />
      </div>
    </SheetContent>
  );
}
export default ModalTeams;
