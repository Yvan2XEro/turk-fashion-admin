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
import React, { useMemo, useState } from "react";
import useEditProductForm from "./useEditProductForm";
import { Textarea } from "@/components/ui/textarea";
import { AppPopoverPicker } from "@/components/moleculs/AppPopoverPicker";
import AppImageField from "@/components/moleculs/AppImageField/AppImageField";
import { AppTagsInput2 } from "@/components/moleculs/AppTagsInput";
import { Product, ProductPayload, productSchema } from "@/lib/api/products";
import { universalFetch } from "@/lib/api/universalfetch";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/lib/api/categories";
import { Filter } from "@/lib/api/filters";
import { SubCategory } from "@/lib/api/sub-categories";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppLoader } from "@/components/moleculs/AppLoader";

type TProps = {
  data?: Product;
  id?: number;
  onSubmitSuccess: () => void;
};
export default function EditProductForm({ data, onSubmitSuccess, id }: TProps) {
  const form = useForm<ProductPayload>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      ...data,
      subCategory: !!data?.subCategory?.id ? data.subCategory.id : undefined,
    },
  });

  const { data: paginatedCategories } = useQuery({
    queryFn: () =>
      universalFetch<Category>({
        page: 1,
        limit: 100,
        path: "/categories",
      }),
    queryKey: ["categories"],
  });

  const { data: paginatedSubCategories } = useQuery({
    queryFn: () =>
      universalFetch<SubCategory>({
        page: 1,
        limit: 100,
        path: "/sub-categories",
      }),
    queryKey: ["sub-categories"],
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

  const [selectedCategoryid, setSelectedCategoryId] = useState<
    number | undefined
  >(data?.subCategory.category.id);

  const selectedSubCategoryid = form.watch("subCategory");
  const filtersToDisplay = useMemo(() => {
    if (!selectedSubCategoryid || !paginatedSubCategories?.data) return [];
    return (
      paginatedSubCategories?.data.find((s) => s.id === selectedSubCategoryid)
        ?.filters || []
    );
  }, [selectedSubCategoryid, paginatedSubCategories?.data]);

  const { onSubmit, isPending } = useEditProductForm({
    onSubmitSuccess,
    id,
  });
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          onChange={() => field.onChange("active")}
                          value="inactive"
                        >
                          Inactive
                        </SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row md:items-center md:gap-1 space-y-8 md:space-y-0">
            <FormItem className="flex flex-col flex-auto">
              <FormLabel>Category</FormLabel>
              <AppPopoverPicker
                value={selectedCategoryid}
                options={
                  paginatedCategories?.data.map((c) => ({
                    label: c.name,
                    value: c.id,
                  })) || []
                }
                onSelect={(value) => {
                  setSelectedCategoryId(value);
                  form.resetField("subCategory");
                }}
              />
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="subCategory"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-auto">
                  <FormLabel>Sub Category</FormLabel>
                  <AppPopoverPicker
                    value={field.value}
                    options={
                      paginatedSubCategories?.data
                        .filter((s) => s.category.id === selectedCategoryid)
                        .map((c) => ({
                          label: c.name,
                          value: c.id,
                        })) || []
                    }
                    onSelect={(value) => {
                      form.setValue("subCategory", value);
                      form.resetField("filtersValues");
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
          {filtersToDisplay?.map((filter) => (
            <FormField
              control={form.control}
              key={filter.id}
              name="filtersValues"
              render={({ field }) => {
                const value = field.value?.find(
                  ({ name }) => name === filter.name
                );
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>{filter.name}:</FormLabel>
                    <AppPopoverPicker
                      value={!!value ? value.value : undefined}
                      options={filter.values.map((val) => ({
                        label: val,
                        value: val,
                      }))}
                      onSelect={(value) =>
                        form.setValue("filtersValues", [
                          ...[...(field.value || [])],
                          { name: filter.name, value },
                        ])
                      }
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
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
                  <AppTagsInput2
                    tags={field.value || []}
                    onTagsChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={
                      field.value ||
                      form
                        .watch("name")
                        ?.toLowerCase()
                        .replace(/ /g, "-")
                        .replace(/[^\w-]+/g, "")
                    }
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
          {isPending ? <AppLoader /> : <Button type="submit">Submit</Button>}
        </form>
      </Form>
    </div>
  );
}
