"use client";
import { useState } from "react";
import { Sheet, SheetTrigger } from "../ui/sheet";
import ModalTaskID from "./ModalTask";

type Props = {
  id: string;
};
function AddTaskBtn({ id }: Props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <Sheet
      onOpenChange={(modal) => {
        setShowModal(modal);
      }}
      open={showModal}
    >
      <SheetTrigger className="flex px-4 py-2 justify-center  bg-base-100 border border-primary text-primary  rounded-xl hover:bg-primary hover:text-base-100 active:translate-y-1">
        Add Task
      </SheetTrigger>
      <ModalTaskID setModal={setShowModal} trigger={showModal} id={id} />
    </Sheet>
  );
}
export default AddTaskBtn;
