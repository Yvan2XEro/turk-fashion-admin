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
import useEditProductForm from "./useEditCategoryForm";
import AppImageField from "@/components/moleculs/AppImageField/AppImageField";
import { CategoryPayload, categorySchema } from "@/lib/api/categories";
import { AppLoader } from "@/components/moleculs/AppLoader";

type TProps = {
  data?: CategoryPayload;
  id?: number;
  onSubmitSuccess: () => void;
};
export default function EditCategoryForm({
  data,
  onSubmitSuccess,
  id,
}: TProps) {
  const form = useForm<CategoryPayload>({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: {
      ...data,
    },
  });

  const { onSubmit, isLoading } = useEditProductForm({
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured Image</FormLabel>
                <FormControl>
                  <AppImageField
                    value={field.value}
                    onChange={field.onChange}
                    className="h-36 w-36"
                    dropzoneOptions={{
                      maxSize: 1 * 1024 * 1024,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? <AppLoader /> : <Button type="submit">Submit</Button>}
        </form>
      </Form>
    </div>
  );
}
