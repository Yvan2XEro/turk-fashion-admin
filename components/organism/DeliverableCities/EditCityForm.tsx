import { City, CityPayload, citySchema } from "@/lib/api/cities";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import useEditCityForm from "./useEditCityForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppPopoverPicker } from "@/components/moleculs/AppPopoverPicker";
import { AppLoader } from "@/components/moleculs/AppLoader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import countries from "./countrie";

type TProps = {
  data?: City;
  id?: number;
  onSubmitSuccess: () => void;
};
export default function EditCityForm({ onSubmitSuccess, data, id }: TProps) {
  const form = useForm<CityPayload>({
    resolver: zodResolver(citySchema),
    mode: "onChange",
    defaultValues: {
      ...data,
    },
  });

  const { onSubmit, isLoading } = useEditCityForm({
    onSubmitSuccess,
    id,
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-auto">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <AppPopoverPicker
                    value={field.value}
                    options={countries.map((c) => ({
                      label: c.name,
                      value: c.name,
                    }))}
                    onSelect={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3 md:flex-row">
            <FormField
              control={form.control}
              name="lat"
              render={({ field }) => (
                <FormItem className="flex-auto">
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input placeholder="Latitude" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lng"
              render={({ field }) => (
                <FormItem className="flex-auto">
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input placeholder="Longitude" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="shippingFee"
            render={({ field }) => (
              <FormItem className="flex-auto">
                <FormLabel>Shipping Fee</FormLabel>
                <FormControl>
                  <Input placeholder="Shipping Fee" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is active</FormLabel>
                </div>
              </FormItem>
            )}
          />
          {isLoading ? <AppLoader /> : <Button type="submit">Submit</Button>}
        </form>
      </Form>
    </div>
  );
}
