"use client";
import React from "react";

import { AppSidebar } from "@/components/organism/AppSidebar";
import { AppToolbar } from "@/components/organism/AppToolbar";
import { cn } from "@/lib/utils";
import { Mulish } from "next/font/google";
import { useDarkMode } from "usehooks-ts";

const inter = Mulish({ subsets: ["latin"] });

export default function layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isDarkMode } = useDarkMode();

  return (
    <html lang="en" className={cn(isDarkMode ? "dark" : "")}>
      <body className={inter.className}>
        <div>
          <div className="flex ">
            {/* Sidebar For big screens */}
            <div className={cn("hidden lg:block sticky top-0")}>
              <AppSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div className="flex-auto">
              <AppToolbar isOpen={isOpen} setIsOpen={setIsOpen} />
              <main className="p-2">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
