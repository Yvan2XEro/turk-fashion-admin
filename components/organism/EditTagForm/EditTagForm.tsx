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
import { EditTagFormType, editTagFormSchema } from "./form-props";
import useEditTagForm from "./useEditTagForm";

type TProps = {
  data?: EditTagFormType;
  uuid?: string;
  onSubmitSuccess: () => void;
};
export default function EditCategoryForm({
  data,
  onSubmitSuccess,
  uuid,
}: TProps) {
  const form = useForm<EditTagFormType>({
    resolver: zodResolver(editTagFormSchema),
    mode: "onChange",
    defaultValues: {
      ...data,
    },
  });

  const { onSubmit } = useEditTagForm({
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
