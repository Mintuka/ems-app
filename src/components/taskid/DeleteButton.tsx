"use client";

import { BsFillTrash3Fill } from "react-icons/bs";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type Props = {
  taskid: string;
};
function DeleteButton({ taskid }: Props) {
  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: async (values: string) => {
      const res = await axios.delete(`/api/admin/tasks/delete/?id=${values}`);
      return res;
    },
    onError: (error: any) => {
      toast({
        title: "Could not Delete Task",
        description: "Failed to delete task. pls try again.",
      });
    },
    onSuccess: (e) => {
      toast({
        title: "Task Deleted",
        description: "Task has been deleted.",
      });
      router.push("/dashboard/admin/tasks");
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-error/20 text-error font-bold hover:bg-error hover:text-base-100 flex gap-3 items-center px-5 py-3 rounded-md">
        <BsFillTrash3Fill /> <span>Delete</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to finish this task?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-error/20 text-error font-bold hover:bg-error hover:text-base-100 flex gap-3 items-center px-5 py-3 "
            onClick={() => {
              deleteMutation.mutate(taskid);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteButton;
