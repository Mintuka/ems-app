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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Employee } from "@prisma/client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  employee: z.string().nonempty({ message: "Please select an employee" }),
});

type Props = {
  id: string;
  data: Employee[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};
type FormValues = z.infer<typeof FormSchema>;

export interface SelectFormProps extends FormValues {
  id: string;
}

export function SelectForm({ id, data, setModal }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: SelectFormProps) => {
      const res = await axios.post("/api/admin/teams/addemployee", values);
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
        description: "Employed Added Successfully.",
      });
      setModal(false);
      queryClient.refetchQueries(["employenoTeam"]);
      router.refresh();
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate({ ...data, id });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="employee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Employe to Add" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  {data.map((employe) => {
                    return (
                      <SelectItem
                        key={employe.id}
                        className="w-full"
                        value={employe.id}
                      >{`${employe.firstName} ${employe.lastName} - ${employe.email}`}</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>
                You can add an employe to this team.
              </FormDescription>
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
