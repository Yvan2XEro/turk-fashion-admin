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
import useEditEditStockForm from "./useEditEditStockForm";
import { AppPopoverPicker } from "@/components/moleculs/AppPopoverPicker";
import { useQuery } from "react-query";
import { universalFetch } from "@/lib/api/universalfetch";
import { AppLoader } from "@/components/moleculs/AppLoader";
import { Stock, StockPayload, stockSchema } from "@/lib/api/stocks";
import { Product } from "@/lib/api/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

type TProps = {
  data?: Stock;
  id?: number;
  onSubmitSuccess: () => void;
};
export default function EditStockForm({ data, onSubmitSuccess, id }: TProps) {
  const form = useForm<StockPayload>({
    resolver: zodResolver(stockSchema),
    mode: "onChange",
    defaultValues: {
      ...data,
      isCurrent: !data ? true : data.isCurrent,
      product: !!data?.product ? data.product.id : undefined,
    },
  });

  const { onSubmit, isLoading } = useEditEditStockForm({
    onSubmitSuccess,
    id,
  });
  const { data: paginatedProducts } = useQuery({
    queryFn: () =>
      universalFetch<Product>({
        page: 1,
        limit: 100,
        path: "/products",
      }),
    queryKey: ["products"],
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Alert>
            <AlertDescription>
              Product and Quantity could not be changed
            </AlertDescription>
          </Alert>
          <FormField
            control={form.control}
            disabled={!!id}
            name="product"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Product</FormLabel>
                <AppPopoverPicker
                  value={field.value}
                  options={
                    paginatedProducts?.data.map((c) => ({
                      label: c.name,
                      value: c.id,
                    })) || []
                  }
                  onSelect={(value) => {
                    form.setValue("product", value);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            disabled={!!id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={!id}
            name="isCurrent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    value={!!field.value ? "true" : "false"}
                    disabled={!id}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is Current Stock</FormLabel>
                </div>
                {!id && (
                  <Label>
                    New item will be set as current stock for counting, you can
                    change it later
                  </Label>
                )}
              </FormItem>
            )}
          />
          {isLoading ? <AppLoader /> : <Button type="submit">Submit</Button>}
        </form>
      </Form>
    </div>
  );
}
