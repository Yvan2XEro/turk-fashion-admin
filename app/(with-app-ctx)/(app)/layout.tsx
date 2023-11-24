"use client";
import React from "react";

import { AppSidebar } from "@/components/organism/AppSidebar";
import { AppToolbar } from "@/components/organism/AppToolbar";
import { cn } from "@/lib/utils";
import useRestoreSessionToken from "@/hooks/restore-session-token";
import useUpdateSessionInterval from "@/hooks/update-session-interval";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  useRestoreSessionToken();
  useUpdateSessionInterval();
  return (
    <div className="flex ">
      {/* Sidebar For big screens */}
      <div className={cn("hidden lg:block sticky top-0")}>
        <AppSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="flex-auto">
        <AppToolbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="p-2">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
