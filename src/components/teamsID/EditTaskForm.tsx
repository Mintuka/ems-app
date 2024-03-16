"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Employee, TeamTask, Teams } from "@prisma/client";
import { Checkbox } from "../ui/checkbox";
import axios from "axios";

import { toast } from "../ui/use-toast";

import { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  task: z.string().min(2, {
    message: "Task must be at least 2 characters long.",
  }),
  description: z.string().optional(),
  deadLine: z.date(),
});
export type EditTaskForm = z.infer<typeof formSchema>;
export interface EditTaskFormType extends EditTaskForm {
  id: string;
}
type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
  teamTask: TeamTask;
};

export function EditTaskForm({ setModal, teamTask }: Props) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (values: EditTaskFormType) => {
      const res = await axios.post("/api/admin/tasks/edit", values);
      return res;
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
    onSuccess: (e) => {
      toast({
        title: "Task Edited",
        description: "Task has been edited successfully.",
      });
      router.refresh();
      setModal(false);
    },
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deadLine: teamTask.deadline,
      task: teamTask.task,
      description: teamTask.description ? teamTask.description : undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutation.mutate({ ...values, id: teamTask.id });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder="Create an EMS..." {...field} />
              </FormControl>
              <FormDescription>Edit Task name and description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadLine"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Dead Line</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    className="bg-base-100/90"
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date!);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full text-primary bg-base-100 border border-primary hover:bg-primary hover:text-base-100"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
