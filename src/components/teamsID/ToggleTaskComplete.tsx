"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  taskid: string;
};
function ToggleTaskComplete({ taskid }: Props) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await axios.put(`/api/admin/tasks/toggle/`, { id: id });
        return res.data;
      } catch (error) {
        return error;
      }
    },
    onSuccess: (e) => {
      toast({
        title: "Task updated",
        description: `Task has been set to ${e.message}`,
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
    <AiFillCheckCircle
      onClick={() => {
        mutation.mutate(taskid);
      }}
      className="h-6 w-6 text-green-400 hover:text-green-400/50 active:translate-y-1"
    />
  );
}
export default ToggleTaskComplete;
