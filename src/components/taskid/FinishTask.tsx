"use client";

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
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  taskid: string;
};
function FinishTask({ taskid }: Props) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (values: { id: string }) => {
      const res = await axios.put("/api/admin/tasks/toggle", values);
      return res;
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
    onSuccess: (e) => {
      router.refresh();
      toast({
        title: "Task Updated",
        description: "Task Updated.",
      });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex-1 bg-base-100 border border-primary text-primary  rounded-xl hover:bg-primary hover:text-base-100 active:translate-y-1">
        Finish Task
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
            onClick={() => {
              mutation.mutate({ id: taskid });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default FinishTask;
