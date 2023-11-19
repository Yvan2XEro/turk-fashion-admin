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
  EditProductFormType,
  editProductFormSchema,
} from "./edit-product-form";
import useEditProductForm from "./useEditProductForm";
import { Textarea } from "@/components/ui/textarea";
import { AppPopoverPicker } from "@/components/moleculs/AppPopoverPicker";
import AppImageField from "@/components/moleculs/AppImageField/AppImageField";
import { AppTagsInput } from "@/components/moleculs/AppTagsInput";
import useCollectionData from "@/hooks/useCollectionData";
import { collection, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Category, Filter, SubCategory, TagObj } from "@/types/models";

type TProps = {
  data?: EditProductFormType;
  uuid?: string;
  onSubmitSuccess: () => void;
};
export default function EditProductForm({
  data,
  onSubmitSuccess,
  uuid,
}: TProps) {
  const form = useForm<EditProductFormType>({
    resolver: zodResolver(editProductFormSchema),
    mode: "onChange",
    defaultValues: {
      ...data,
    },
  });

  const { data: categories } = useCollectionData<Category>({
    q: query(collection(db, "categories")),
  });

  const { data: subCategories } = useCollectionData<SubCategory>({
    q: query(collection(db, "subcategories")),
  });

  const { data: filters } = useCollectionData<Filter>({
    q: query(collection(db, "filters")),
  });

  const { data: tags } = useCollectionData<TagObj>({
    q: query(collection(db, "tags")),
  });

  const selectedCategoryUuid = form.watch("categoryUuid");
  const selectedSubCategoryUuid = form.watch("subCategoryUuid");

  const filtersToDisplay = useMemo(() => {
    const subCategoryObj = subCategories.find(
      (s) => s.uuid === selectedSubCategoryUuid
    );
    if (
      !filters ||
      !selectedSubCategoryUuid ||
      !subCategoryObj ||
      !subCategoryObj.filters
    )
      return [];

    return filters.filter((f) => subCategoryObj.filters.includes(f.uuid));
  }, [selectedSubCategoryUuid, filters]);

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
                    form.resetField("subCategoryUuid");
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subCategoryUuid"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Sub Category</FormLabel>
                <AppPopoverPicker
                  value={field.value}
                  options={subCategories
                    .filter((s) => s.categoryUuid === selectedCategoryUuid)
                    .map((c) => ({
                      label: c.name,
                      value: c.uuid,
                    }))}
                  onSelect={(value) => form.setValue("subCategoryUuid", value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {filtersToDisplay.map((filter) => (
            <FormField
              control={form.control}
              key={filter.uuid}
              name="filters"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{filter.label}:</FormLabel>
                  <AppPopoverPicker
                    value={field.value?.[filter.uuid]}
                    options={filter.values.map((val) => ({
                      label: val,
                      value: val,
                    }))}
                    onSelect={(value) =>
                      form.setValue("filters", {
                        ...field.value,
                        [filter.uuid]: value,
                      })
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
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
                  <Textarea rows={10} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <AppTagsInput
                    tags={field.value}
                    availableTags={tags.map((t) => t.label)}
                    onTagsChange={field.onChange}
                  />
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
