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
import useEditEditUserForm from "./useEditUserForm";
import { AppLoader } from "@/components/moleculs/AppLoader";
import { User, UserPayload, userSchema } from "@/lib/api/users";
import AppImageField from "@/components/moleculs/AppImageField/AppImageField";

type TProps = {
  data?: User;
  id?: number;
  onSubmitSuccess: () => void;
};
export default function EditUserForm({ data, onSubmitSuccess, id }: TProps) {
  const form = useForm<UserPayload>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      ...data,
    },
  });

  const { onSubmit, isLoading } = useEditEditUserForm({
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || undefined} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={!id}
            name="photo"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                <FormLabel>Photo</FormLabel>
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
