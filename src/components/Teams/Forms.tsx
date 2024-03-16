"use client";

import Link from "next/link";
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
import { Checkbox } from "../ui/checkbox";
import axios from "axios";
import { on } from "events";
import { toast } from "../ui/use-toast";
import { type } from "os";
import { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  teamName: z
    .string()
    .min(2, {
      message: "Team name must be at least 2 characters long.",
    })
    .max(12, {
      message: "Team name must be at most 12 characters long.",
    }),
  task: z
    .string()
    .min(2, {
      message: "Task must be at least 2 characters long.",
    })
    .optional(),
  members: z.array(z.string()),
  deadLine: z.date().optional(),
});
export type TeamSubmitType = z.infer<typeof formSchema>;
type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
};

export function CreateTeamForm({ setModal }: Props) {
  const noteam = useQuery({
    queryKey: ["employenoTeam"],
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: TeamSubmitType) => {
      const res = await axios.post("/api/admin/teams/create", values);
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
        title: "Team Created",
        description: "Team has been created successfully.",
      });
      setModal(false);
      queryClient.invalidateQueries(["teams"]);
      queryClient.refetchQueries(["employenoTeam"]);
      queryClient.invalidateQueries(["employee"]);
    },
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      deadLine: new Date(),
      task: undefined,
      members: [],
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
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Team Name" {...field} />
              </FormControl>
              <FormDescription>This is the name of your team.</FormDescription>
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
                Assign a task to your team. (Optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadLine"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Dead Line if you filled task</FormLabel>
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
        {(noteam.data as Employee[] | undefined) && (
          <FormField
            control={form.control}
            name="members"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Add Members</FormLabel>
                  <FormDescription>
                    Select the members you want to add to your team.
                    <div>(Only teamless employees are shown)</div>
                  </FormDescription>
                </div>
                <div className=" overflow-y-scroll max-h-40 border border-primary p-4 rounded-lg space-y-1">
                  {(noteam.data as Employee[]).map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="members"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row space-x-3 space-y-0 items-center hover:bg-base-200 p-2 rounded-lg"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value!, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-lg">
                              {`${item.firstName} ${item.lastName} - ${item.email}`}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
