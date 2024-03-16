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
import { Employee, Teams } from "@prisma/client";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  id: z.string(),
  task: z.string().min(2, {
    message: "Task must be at least 2 characters long.",
  }),
  description: z.string(),

  deadLine: z.date().optional(),
});
export type TaskSubmitType = z.infer<typeof formSchema>;
type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
  teams: Teams[] | undefined;
};

export function TaskAddForm({ setModal, teams }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: TaskSubmitType) => {
      const res = await axios.post("/api/admin/teams/addtask", values);
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
        title: "Task Created",
        description: "Task has been created.",
      });
      setModal(false);

      queryClient.invalidateQueries(["tasks"]);
    },
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      description: undefined,
      deadLine: new Date(),
      task: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <Select
                onValueChange={(e) => {
                  field.onChange(e);
                }}
                defaultValue={field.value}
                {...field}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Team" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teams &&
                    teams.map((team) => {
                      return (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder="Create an EMS..." {...field} />
              </FormControl>
              <FormDescription>
                Task to be completed by the team
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
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
