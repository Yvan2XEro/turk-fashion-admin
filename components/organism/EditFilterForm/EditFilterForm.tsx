import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { EditFilterFormType, editFilterFormSchema } from "./edit-filter-form";
import useEditFilterForm from "./useEditFilterForm";
import { AppTagsInput2 } from "@/components/moleculs/AppTagsInput";

type TProps = {
  data?: EditFilterFormType;
  uuid?: string;
  onSubmitSuccess: () => void;
};
export default function EditCategoryForm({
  data,
  onSubmitSuccess,
  uuid,
}: TProps) {
  const form = useForm<EditFilterFormType>({
    resolver: zodResolver(editFilterFormSchema),
    mode: "onChange",
    defaultValues: {
      ...data,
    },
  });

  const { onSubmit } = useEditFilterForm({
    onSubmitSuccess,
    uuid,
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filter name</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Size, Color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="values"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Values</FormLabel>
                <FormControl>
                  <AppTagsInput2
                    tags={field.value || []}
                    onTagsChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
