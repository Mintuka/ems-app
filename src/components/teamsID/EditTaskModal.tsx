"use client";

import { TeamTask } from "@prisma/client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { EditTaskForm } from "./EditTaskForm";

type Props = {
  teamTask: TeamTask;
  isButton?: boolean;
};
function EditTaskModal({ teamTask, isButton }: Props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <Sheet
      onOpenChange={(modal) => {
        setShowModal(modal);
      }}
      open={showModal}
    >
      <SheetTrigger
        className={`${
          isButton
            ? "flex-1 bg-base-100 border border-primary text-primary  rounded-xl hover:bg-primary hover:text-base-100 active:translate-y-1 py-2"
            : ""
        }`}
      >
        {isButton ? (
          "Change Task"
        ) : (
          <HiPencil className="h-6 w-6 text-yellow-600 hover:text-yellow-400/50 active:translate-y-1" />
        )}
      </SheetTrigger>
      <SheetContent className="bg-base-100 overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
          <SheetDescription>Edit the task</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col mt-10 gap-7">
          <EditTaskForm setModal={setShowModal} teamTask={teamTask} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default EditTaskModal;
