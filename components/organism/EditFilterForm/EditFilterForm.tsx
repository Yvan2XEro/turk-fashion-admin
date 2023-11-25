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
import React from "react";
import useEditFilterForm from "./useEditFilterForm";
import { AppTagsInput2 } from "@/components/moleculs/AppTagsInput";
import { FilterPayload, filterSchema } from "@/lib/api/filters";
import { AppLoader } from "@/components/moleculs/AppLoader";

type TProps = {
  data?: FilterPayload;
  id?: number;
  onSubmitSuccess: () => void;
};
export default function EditCategoryForm({
  data,
  onSubmitSuccess,
  id,
}: TProps) {
  const form = useForm<FilterPayload>({
    resolver: zodResolver(filterSchema),
    mode: "onChange",
    defaultValues: {
      ...data,
    },
  });

  const { onSubmit, isPending } = useEditFilterForm({
    onSubmitSuccess,
    id,
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
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

          {isPending ? <AppLoader /> : <Button type="submit">Submit</Button>}
        </form>
      </Form>
    </div>
  );
}
