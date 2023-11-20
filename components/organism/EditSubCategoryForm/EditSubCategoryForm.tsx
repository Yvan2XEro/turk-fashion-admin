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
  EditSubCategoryFormType,
  editSubCategoryFormSchema,
} from "./form-props";
import useEditSubCategoryForm from "./useEditSubCategoryForm";
import { AppPopoverPicker } from "@/components/moleculs/AppPopoverPicker";
import useCollectionData from "@/hooks/useCollectionData";
import { Category, Filter } from "@/types/models";
import { collection, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AppImageField from "@/components/moleculs/AppImageField/AppImageField";
import { MultiSelect } from "@/components/moleculs/MultiSelect";

type TProps = {
  data?: EditSubCategoryFormType;
  uuid?: string;
  onSubmitSuccess: () => void;
};
export default function EditSubCategoryForm({
  data,
  onSubmitSuccess,
  uuid,
}: TProps) {
  const form = useForm<EditSubCategoryFormType>({
    resolver: zodResolver(editSubCategoryFormSchema),
    mode: "onChange",
    defaultValues: {
      ...data,
    },
  });

  const { onSubmit } = useEditSubCategoryForm({
    onSubmitSuccess,
    uuid,
  });
  const { data: categories } = useCollectionData<Category>({
    q: query(collection(db, "categories")),
  });
  const { data: filters } = useCollectionData<Filter>({
    q: query(collection(db, "filters")),
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
                <FormLabel>Sub Category name</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Shoes, Sneakers" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryUuid"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <AppPopoverPicker
                  value={field.value}
                  options={categories.map((c) => ({
                    label: c.name,
                    value: c.uuid,
                  }))}
                  onSelect={(value) => {
                    form.setValue("categoryUuid", value);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category Image</FormLabel>
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
          <FormField
            control={form.control}
            name="filters"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filters</FormLabel>
                <FormControl>
                  <MultiSelect
                    value={field.value}
                    options={filters.map((c) => ({
                      label: c.label,
                      uuid: c.uuid,
                    }))}
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
