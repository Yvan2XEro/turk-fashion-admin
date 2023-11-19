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
import {
  EditCategoryFormType,
  editCategoryFormSchema,
} from "./edit-category-form";
import useEditProductForm from "./useEditCategoryForm";
import { Textarea } from "@/components/ui/textarea";
import { AppPopoverPicker } from "@/components/moleculs/AppPopoverPicker";
import AppImageField from "@/components/moleculs/AppImageField/AppImageField";
import { AppTagsInput } from "@/components/moleculs/AppTagsInput";
import useCollectionData from "@/hooks/useCollectionData";
import { collection, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Category, Filter, SubCategory, TagObj } from "@/types/models";

type TProps = {
  data?: EditCategoryFormType;
  uuid?: string;
  onSubmitSuccess: () => void;
};
export default function EditCategoryForm({
  data,
  onSubmitSuccess,
  uuid,
}: TProps) {
  const form = useForm<EditCategoryFormType>({
    resolver: zodResolver(editCategoryFormSchema),
    mode: "onChange",
    defaultValues: {
      ...data,
    },
  });

  const { onSubmit } = useEditProductForm({
    onSubmitSuccess,
    uuid,
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
