import { useToast } from "@/components/ui/use-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { PropsWithChildren, useState } from "react";

export default function AppQueryCliantProvider({
  children,
}: PropsWithChildren) {
  const { toast } = useToast();
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
                toast({
                  title: "Error",
                  description: error.message,
                });
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
