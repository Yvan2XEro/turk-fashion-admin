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
import useEditSubCategoryForm from "./useEditSubCategoryForm";
import { AppPopoverPicker } from "@/components/moleculs/AppPopoverPicker";
import AppImageField from "@/components/moleculs/AppImageField/AppImageField";
import { MultiSelect } from "@/components/moleculs/MultiSelect";
import {
  SubCategory,
  SubCategoryPayload,
  subCategorySchema,
} from "@/lib/api/sub-categories";
import { useQuery } from "@tanstack/react-query";
import { universalFetch } from "@/lib/api/universalfetch";
import { Category } from "@/lib/api/categories";
import { Filter } from "@/lib/api/filters";
import { AppLoader } from "@/components/moleculs/AppLoader";

type TProps = {
  data?: SubCategory;
  id?: number;
  onSubmitSuccess: () => void;
};
export default function EditSubCategoryForm({
  data,
  onSubmitSuccess,
  id,
}: TProps) {
  const form = useForm<SubCategoryPayload>({
    resolver: zodResolver(subCategorySchema),
    mode: "onChange",
    defaultValues: {
      ...data,
      category: !!data?.category ? data.category.id : undefined,
      filters: !!data?.filters
        ? data.filters.map((filter: any) => filter.id)
        : undefined,
    },
  });

  const { onSubmit, isPending } = useEditSubCategoryForm({
    onSubmitSuccess,
    id,
  });
  const { data: paginatedCategorie } = useQuery({
    queryFn: () =>
      universalFetch<Category>({
        page: 1,
        limit: 100,
        path: "/categories",
      }),
    queryKey: ["categories"],
  });
  const { data: paginatedFilters } = useQuery({
    queryFn: () =>
      universalFetch<Filter>({
        page: 1,
        limit: 100,
        path: "/filters",
      }),
    queryKey: ["filters"],
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
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <AppPopoverPicker
                  value={field.value}
                  options={
                    paginatedCategorie?.data.map((c) => ({
                      label: c.name,
                      value: c.id,
                    })) || []
                  }
                  onSelect={(value) => {
                    form.setValue("category", value);
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
                    options={
                      paginatedFilters?.data.map((c) => ({
                        label: c.name,
                        id: c.id,
                      })) || []
                    }
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
