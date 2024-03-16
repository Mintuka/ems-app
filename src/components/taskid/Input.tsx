"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { type } from "os";

const FormSchema = z.object({
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});
export interface FormValuesTaskComment extends z.infer<typeof FormSchema> {
  taskId: string;
  teamID: string;
}
type Props = {
  taskId: string;
  teamID: string;
};

export function InputForm({ taskId, teamID }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: FormValuesTaskComment) => {
      try {
        const res = await axios.post("/api/admin/tasks/createcomment", data);
        return res;
      } catch (error) {
        return error;
      }
    },
    onSuccess: (e) => {
      toast({
        title: "Comment created",
        description: "Comment created successfully",
      });
      form.reset();
      queryClient.invalidateQueries(["taskComments"]);
    },
    onError: (e) => {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate({ ...data, taskId, teamID });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full gap-5"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  className="border border-primary"
                  placeholder="Comment"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-base-100 border border-primary text-primary  rounded-xl hover:bg-primary hover:text-base-100 active:translate-y-1"
          type="submit"
        >
          Send Comment
        </Button>
      </form>
    </Form>
  );
}
