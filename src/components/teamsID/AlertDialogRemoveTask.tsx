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
import { IoIosRemoveCircle } from "react-icons/io";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  taskid: string;
};
function AlertDialogRemoveTask({ taskid }: Props) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const data = await axios.delete(`/api/admin/tasks/delete/?id=${id}`);
        return data.data;
      } catch (error) {
        return error;
      }
    },
    onSuccess: (e) => {
      toast({
        title: "Task Deleted",
        description: `Task has been deleted ${e.message}`,
      });

      router.refresh();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <IoIosRemoveCircle className="h-6 w-6 text-red-600 hover:text-red-600/50 active:translate-y-1" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutation.mutate(taskid);
            }}
            className="bg-error text-primary/80 hover:bg-base-100 hover:text-error hover:border-error hover:border uppercase"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default AlertDialogRemoveTask;
