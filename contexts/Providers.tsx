import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import AppQueryCliantProvider from "./AppQueryCliantProvider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <AppQueryCliantProvider>
      <SessionProvider>{children}</SessionProvider>;
    </AppQueryCliantProvider>
  );
}
