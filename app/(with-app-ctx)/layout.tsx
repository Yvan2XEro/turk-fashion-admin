"use client";
import Providers from "@/contexts/Providers";
import React from "react";

import { Mulish } from "next/font/google";
import { useDarkMode } from "usehooks-ts";
import { cn } from "@/lib/utils";
const inter = Mulish({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkMode();
  return (
    <html lang="en" className={cn(isDarkMode ? "dark" : "")}>
      <body className={inter.className}>
        <div>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
