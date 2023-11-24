import { useToast } from "@/components/ui/use-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function AppQueryCliantProvider({
  children,
}: PropsWithChildren) {
  const { toast } = useToast();
  const [_, setIsUnauthorized] = useLocalStorage("is-unauthorized", false);
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            mutations: {
              onSuccess: () => {
                toast({
                  title: "Success!",
                });
              },
              onError: (error: any) => {
                if (error.status === 401) setIsUnauthorized(true);
              },
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>
  );
}
