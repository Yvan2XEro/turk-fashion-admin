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
                    options={[]}
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
            name="lat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input placeholder="Latitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lng"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input placeholder="Longitude" {...field} />
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
