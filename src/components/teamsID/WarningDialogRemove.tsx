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
import { HiOutlineUserRemove } from "react-icons/hi";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
type Props = { id: string };
function WarningDialogRemove({ id }: Props) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: string) => {
      try {
        const data = await axios.delete(`/api/admin/teams/employee/?id=${id}`);
        return data.data;
      } catch (error) {
        return error;
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
    onSuccess: (e) => {
      toast({
        title: "Employee Removed",
        description: "Employed Removed from team.",
      });

      router.refresh();
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <HiOutlineUserRemove className=" text-error h-6 w-6" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-error text-primary/80 hover:bg-base-100 hover:text-error hover:border-error hover:border"
            onClick={() => {
              mutation.mutate(id);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default WarningDialogRemove;
